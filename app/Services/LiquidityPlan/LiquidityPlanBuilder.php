<?php

namespace App\Services\LiquidityPlan;

use App\Enums\LiquiditySectionEnum;
use App\Models\BusinessPlan;
use App\Models\LiquidityAccount;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LiquidityPlanBuilder
{
    public function __construct(
        protected BusinessPlan $businessPlan,
        protected ViewContext $context
    ) {}

    /**
     * Builds the complete liquidity plan data structure.
     *
     * @return array{
     *   view: string,
     *   year: int,
     *   month: int|null,
     *   iso_week: int|null,
     *   available_years: int[],
     *   available_weeks: int[],
     *   columns: string[],
     *   opening_balance: float,
     *   sections: array,
     *   net_cashflow: array,
     *   saldo: array,
     *   bank_accounts: array,
     * }
     */
    public function build(): array
    {
        $transactionData = (new TransactionAggregator($this->businessPlan, $this->context))->aggregate();
        $employeeData = (new EmployeeCostAggregator($this->businessPlan, $this->context))->aggregate();
        $loanData = (new LoanAggregator($this->businessPlan, $this->context))->aggregate();

        $accounts = LiquidityAccount::where('is_active', true)
            ->orderBy('order_index')
            ->get()
            ->groupBy(fn (LiquidityAccount $a) => $a->section->value);

        $sections = [];
        $incomeSummary = array_fill_keys($this->context->columnKeys(), 0.0);
        $expenseSummary = array_fill_keys($this->context->columnKeys(), 0.0);

        foreach (LiquiditySectionEnum::cases() as $section) {
            $sectionAccounts = $accounts->get($section->value, collect());
            $rows = [];
            $sectionMonthlyTotals = array_fill_keys($this->context->columnKeys(), 0.0);

            foreach ($sectionAccounts as $account) {
                $monthlyAmounts = $this->resolveMonthlyAmounts($account, $transactionData, $employeeData, $loanData);
                $row = $this->buildRow($account->name, $account->id, $monthlyAmounts);
                $rows[] = $row;

                foreach ($this->context->columnKeys() as $key) {
                    $sectionMonthlyTotals[$key] += $monthlyAmounts[$key] ?? 0.0;
                }
            }

            $summaryLabel = $this->getSummaryLabel($section);
            $summary = $this->buildRow($summaryLabel, null, $sectionMonthlyTotals);

            if ($section === LiquiditySectionEnum::Income) {
                $incomeSummary = $sectionMonthlyTotals;
            } else {
                foreach ($this->context->columnKeys() as $key) {
                    $expenseSummary[$key] += $sectionMonthlyTotals[$key];
                }
            }

            $sections[] = [
                'key' => $section->value,
                'label' => $section->label(),
                'rows' => $rows,
                'summary' => $summary,
            ];
        }

        $openingBalance = $this->computePeriodOpeningBalance();
        $injectionKey = $this->computeOpeningBalanceKey();

        if ($injectionKey !== null) {
            $saldoValues = (new LiquiditySaldoCalculator)->calculate(
                0.0,
                $this->context->columnKeys(),
                $incomeSummary,
                $expenseSummary,
                $openingBalance,
                $injectionKey
            );
        } else {
            $saldoValues = (new LiquiditySaldoCalculator)->calculate(
                $openingBalance,
                $this->context->columnKeys(),
                $incomeSummary,
                $expenseSummary
            );
        }

        return [
            'view' => $this->context->view,
            'year' => $this->context->year,
            'iso_week' => $this->context->isoWeek,
            'available_years' => $this->availableYears(),
            'columns' => $this->context->columnLabels(),
            'opening_balance' => round($openingBalance, 2),
            'sections' => $sections,
            'net_cashflow' => $this->buildNetCashflowRow($incomeSummary, $expenseSummary),
            'saldo' => $this->buildSaldoRow($saldoValues),
            'bank_accounts' => $this->buildBankAccounts(),
            'chart_income_by_category' => $this->buildCategoryBreakdown('income'),
            'chart_expense_by_category' => $this->buildCategoryBreakdown('expense'),
        ];
    }

    /**
     * @param  array<int, array<int, float>>  $transactionData
     * @param  array<int, float>  $employeeData
     * @param  array{interest: array<int, float>, repayment: array<int, float>}  $loanData
     * @return array<int, float>
     */
    private function resolveMonthlyAmounts(
        LiquidityAccount $account,
        array $transactionData,
        array $employeeData,
        array $loanData
    ): array {
        return match ($account->source) {
            'employee' => $employeeData,
            'loan_interest' => $loanData['interest'],
            'loan_repayment' => $loanData['repayment'],
            default => $transactionData[$account->id] ?? array_fill_keys($this->context->columnKeys(), 0.0),
        };
    }

    /**
     * @param  array<int, float>  $monthlyAmounts
     * @return array{account_id: int|null, label: string, months: float[], total: float}
     */
    private function buildRow(string $label, ?int $accountId, array $monthlyAmounts): array
    {
        $months = [];
        $total = 0.0;

        foreach ($this->context->columnKeys() as $key) {
            $value = round($monthlyAmounts[$key] ?? 0.0, 2);
            $months[] = $value;
            $total += $value;
        }

        return [
            'account_id' => $accountId,
            'label' => $label,
            'months' => $months,
            'total' => round($total, 2),
        ];
    }

    /**
     * @param  array<int, float>  $incomeSummary
     * @param  array<int, float>  $expenseSummary
     * @return array{account_id: null, label: string, months: float[], total: float}
     */
    private function buildNetCashflowRow(array $incomeSummary, array $expenseSummary): array
    {
        $netByKey = [];

        foreach ($this->context->columnKeys() as $key) {
            $netByKey[$key] = ($incomeSummary[$key] ?? 0.0) - ($expenseSummary[$key] ?? 0.0);
        }

        return $this->buildRow('Nettocashflow (Einnahmen − Ausgaben)', null, $netByKey);
    }

    /**
     * Builds the saldo (running balance) row.
     * Unlike regular rows whose "total" is the column sum, the saldo total is
     * the end-of-period balance (last column value), since each column already
     * represents the cumulative balance up to that point.
     *
     * @param  array<int, float>  $saldoValues
     * @return array{account_id: null, label: string, months: float[], total: float}
     */
    private function buildSaldoRow(array $saldoValues): array
    {
        $row = $this->buildRow('Liquidität Unter-/Überdeckung', null, $saldoValues);
        $row['total'] = ! empty($row['months']) ? end($row['months']) : 0.0;

        return $row;
    }

    private function getSummaryLabel(LiquiditySectionEnum $section): string
    {
        return match ($section) {
            LiquiditySectionEnum::Income => 'Summe Liquiditätszugang',
            LiquiditySectionEnum::Investment => 'Summe Investitionsausgaben',
            LiquiditySectionEnum::Operational => 'Summe betriebliche Kosten',
            LiquiditySectionEnum::Financing => 'Summe Liquiditätsabgang',
        };
    }

    /**
     * Computes the net cashflow per column key for a given ViewContext across all
     * liquidity accounts (transactions + employees + loans).
     * Income sections add positively, all other sections subtract.
     *
     * @return array<int, float> [col_key => net]
     */
    private function netCashflowByKey(ViewContext $ctx): array
    {
        $transactionData = (new TransactionAggregator($this->businessPlan, $ctx))->aggregate();
        $employeeData = (new EmployeeCostAggregator($this->businessPlan, $ctx))->aggregate();
        $loanData = (new LoanAggregator($this->businessPlan, $ctx))->aggregate();

        $accounts = LiquidityAccount::where('is_active', true)->get();
        $net = array_fill_keys($ctx->columnKeys(), 0.0);

        foreach ($accounts as $account) {
            $amounts = match ($account->source) {
                'employee' => $employeeData,
                'loan_interest' => $loanData['interest'],
                'loan_repayment' => $loanData['repayment'],
                default => $transactionData[$account->id] ?? array_fill_keys($ctx->columnKeys(), 0.0),
            };

            $isIncome = $account->section === LiquiditySectionEnum::Income;

            foreach ($ctx->columnKeys() as $key) {
                $amount = $amounts[$key] ?? 0.0;
                $net[$key] += $isIncome ? $amount : -$amount;
            }
        }

        return $net;
    }

    /**
     * Returns the correct starting balance for the currently viewed period.
     *
     * The opening balance represents the cash on hand at the plan's period_from.
     * For sub-year views (month/week) we accumulate the net cashflow of all
     * complete prior periods within the plan's scope.
     *
     * - Year view : liquidity_opening_balance (unchanged)
     * - Week view : opening_balance + cumulative net of plan months before the
     *               week's month + cumulative net of ISO weeks in that month
     *               that come before the current week.
     *               Edge case: KW 1 starts on Dec 30 of the previous year —
     *               weekStart->year ≠ contextYear, so no carry-over is applied.
     */
    private function computePeriodOpeningBalance(): float
    {
        $base = (float) ($this->businessPlan->liquidity_opening_balance ?? 0);

        // Effective plan start — carry-over only covers periods from here on
        $periodFrom = $this->businessPlan->period_from; // Carbon|null
        $planYear = $periodFrom?->year ?? $this->context->year;
        $planMonth = $periodFrom?->month ?? 1;

        if ($this->context->view === ViewContext::YEAR) {
            return $base;
        }

        // ── Week view ──────────────────────────────────────────────────────────
        // Use context->year, NOT weekStart->year.
        // KW 1 of 2025 starts on 2024-12-30: weekStart->year=2024, but the
        // plan context is 2025. Carrying over 2024 months would be wrong.
        $contextYear = $this->context->year;
        [$weekStartStr] = $this->context->dateRange();
        $weekStart = Carbon::parse($weekStartStr);

        // If the week physically starts in a different year (KW 1 edge case),
        // there are no prior plan periods in contextYear → return base as-is.
        if ($weekStart->year !== $contextYear) {
            return $base;
        }

        $weekMonth = $weekStart->month;
        $balance = $base;

        // Step 1: complete months before the week's month, within plan scope
        $startM = ($contextYear === $planYear) ? $planMonth : 1;

        if ($weekMonth > $startM) {
            $yearCtx = new ViewContext(ViewContext::YEAR, $contextYear);
            $yearNet = $this->netCashflowByKey($yearCtx);

            for ($m = $startM; $m < $weekMonth; $m++) {
                $balance += $yearNet[$m] ?? 0.0;
            }
        }

        // Step 2: ISO weeks within the week's month that precede the current week
        $monthCtx = new ViewContext(ViewContext::MONTH, $contextYear, $weekMonth);
        $monthNet = $this->netCashflowByKey($monthCtx);
        $currentIsoWeek = $this->context->isoWeek ?? 1;

        foreach ($monthCtx->columnKeys() as $isoWeek) {
            if ($isoWeek >= $currentIsoWeek) {
                break;
            }

            $balance += $monthNet[$isoWeek] ?? 0.0;
        }

        return $balance;
    }

    /**
     * Returns the column key where the opening balance (Saldo Vortrag) should
     * first be injected, based on the plan's period_from.
     *
     * Returns null when:
     * - No period_from is set → opening balance applies from the very first column.
     * - The period_from falls before the current view window → opening balance
     *   was already carried over via computePeriodOpeningBalance() and applies
     *   from the first column.
     *
     * Returns an int column key when period_from falls inside the current view
     * window, so the opening balance must be injected at that exact position:
     * - Year view : month number (1–12)
     * - Week view : ISO weekday (1 = Mon … 7 = Sun)
     */
    private function computeOpeningBalanceKey(): ?int
    {
        $periodFrom = $this->businessPlan->period_from; // Carbon|null

        if ($periodFrom === null) {
            return null;
        }

        $columnKeys = $this->context->columnKeys();

        if ($this->context->view === ViewContext::YEAR) {
            // Only inject within the current year; prior years use carry-over.
            if ($periodFrom->year !== $this->context->year) {
                return null;
            }

            $key = $periodFrom->month;

            return in_array($key, $columnKeys, true) ? $key : null;
        }

        // Week view
        [$weekStartStr, $weekEndStr] = $this->context->dateRange();
        $weekStart = Carbon::parse($weekStartStr);
        $weekEnd = Carbon::parse($weekEndStr);

        // period_from before this week → carry-over already applied; no injection needed
        if ($periodFrom->lt($weekStart)) {
            return null;
        }

        // period_from after this week → no opening balance here
        if ($periodFrom->gt($weekEnd)) {
            return null;
        }

        // period_from falls within this week → inject on its weekday (ISO: 1=Mon … 7=Sun)
        $key = $periodFrom->dayOfWeekIso;

        return in_array($key, $columnKeys, true) ? $key : ($columnKeys[0] ?? null);
    }

    /**
     * Returns summed transaction amounts grouped by category name for the current period.
     *
     * @return array<int, array{category: string, value: float}>
     */
    private function buildCategoryBreakdown(string $type): array
    {
        [$start, $end] = $this->context->dateRange();

        $periodFrom = $this->businessPlan->period_from;
        $periodUntil = $this->businessPlan->period_until;

        if ($periodFrom && $periodFrom->toDateString() > $start) {
            $start = $periodFrom->toDateString();
        }

        if ($periodUntil && $periodUntil->toDateString() < $end) {
            $end = $periodUntil->toDateString();
        }

        return DB::table('transactions')
            ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
            ->where('transactions.business_plan_id', $this->businessPlan->id)
            ->where('transaction_categories.type', $type)
            ->where('transactions.is_active', true)
            ->whereRaw('date(transactions.date) BETWEEN ? AND ?', [$start, $end])
            ->select(
                'transaction_categories.name as category',
                DB::raw('SUM(transactions.total_amount) as value')
            )
            ->groupBy('transaction_categories.name')
            ->orderByDesc('value')
            ->get()
            ->map(fn ($row) => [
                'category' => $row->category,
                'value' => round((float) $row->value, 2),
            ])
            ->values()
            ->toArray();
    }

    /**
     * @return int[]
     */
    private function availableYears(): array
    {
        $from = $this->businessPlan->period_from?->year ?? now()->year;
        $until = $this->businessPlan->period_until?->year ?? $from;

        return range($from, $until);
    }

    /**
     * @return array<int, array{name: string, dispo_limit: float, ist_months: float[], dispo_months: float[], available_months: float[]}>
     */
    private function buildBankAccounts(): array
    {
        $result = [];
        $istByColumn = (new IstBalanceCalculator($this->businessPlan, $this->context))->calculate();

        foreach ($this->businessPlan->bankAccounts as $bankAccount) {
            $dispo = (float) $bankAccount->dispo_limit;
            $istMonths = [];
            $dispoMonths = [];
            $availableMonths = [];

            foreach ($this->context->columnKeys() as $key) {
                $ist = $istByColumn[$key] ?? 0.0;
                $istMonths[] = round($ist, 2);
                $dispoMonths[] = round($dispo, 2);
                $availableMonths[] = round($ist + $dispo, 2);
            }

            $result[] = [
                'name' => $bankAccount->name,
                'dispo_limit' => $dispo,
                'ist_months' => $istMonths,
                'dispo_months' => $dispoMonths,
                'available_months' => $availableMonths,
            ];
        }

        return $result;
    }
}
