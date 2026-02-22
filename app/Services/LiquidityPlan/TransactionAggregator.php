<?php

namespace App\Services\LiquidityPlan;

use App\Models\BusinessPlan;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionAggregator
{
    public function __construct(
        protected BusinessPlan $businessPlan,
        protected ViewContext $context
    ) {}

    /**
     * Returns aggregated transaction amounts per liquidity account and column key.
     *
     * @return array<int, array<int, float>> [liquidity_account_id][col_key] = total_amount
     */
    public function aggregate(): array
    {
        [$start, $end] = $this->context->dateRange();

        // Clamp date range to the business plan's period boundaries
        $periodFrom = $this->businessPlan->period_from;
        $periodUntil = $this->businessPlan->period_until;

        if ($periodFrom && $periodFrom->toDateString() > $start) {
            $start = $periodFrom->toDateString();
        }

        if ($periodUntil && $periodUntil->toDateString() < $end) {
            $end = $periodUntil->toDateString();
        }

        $query = DB::table('transactions')
            ->join('transaction_categories', 'transactions.category_id', '=', 'transaction_categories.id')
            ->where('transactions.business_plan_id', $this->businessPlan->id)
            ->whereNotNull('transaction_categories.liquidity_account_id')
            // Use date() to normalize datetime values before comparison (avoids '2025-01-05 00:00:00' > '2025-01-05')
            ->whereRaw('date(transactions.date) BETWEEN ? AND ?', [$start, $end])
            ->where('transactions.is_active', true);

        // Month view: SQLite's strftime('%W') does NOT produce ISO 8601 week numbers.
        // Fetch individual rows and group by ISO week in PHP via Carbon.
        if ($this->context->view === ViewContext::MONTH) {
            $rows = $query->select(
                'transaction_categories.liquidity_account_id',
                'transactions.date',
                'transactions.total_amount'
            )->get();

            $result = [];

            foreach ($rows as $row) {
                $isoWeek = (int) Carbon::parse($row->date)->format('W');
                $accountId = (int) $row->liquidity_account_id;
                $result[$accountId][$isoWeek] = ($result[$accountId][$isoWeek] ?? 0.0) + (float) $row->total_amount;
            }

            return $result;
        }

        // Year / week view: SQL-level aggregation is correct for %m and %w.
        $rows = $query->select(
            'transaction_categories.liquidity_account_id',
            DB::raw($this->context->sqlDateKey().' as col_key'),
            DB::raw('SUM(transactions.total_amount) as total')
        )
            ->groupBy('transaction_categories.liquidity_account_id', DB::raw($this->context->sqlDateKey()))
            ->get();

        $result = [];

        foreach ($rows as $row) {
            $key = $this->context->normalizeKey((int) $row->col_key);
            $result[(int) $row->liquidity_account_id][$key] = (float) $row->total;
        }

        return $result;
    }
}
