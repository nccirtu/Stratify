<?php

namespace App\Services\LiquidityPlan;

use App\Models\BusinessPlan;
use Carbon\Carbon;

class LoanAggregator
{
    public function __construct(
        protected BusinessPlan $businessPlan,
        protected ViewContext $context
    ) {}

    /**
     * Returns interest and repayment amounts per column key for active loans.
     *
     * @return array{interest: array<int, float>, repayment: array<int, float>}
     */
    public function aggregate(): array
    {
        $interest = array_fill_keys($this->context->columnKeys(), 0.0);
        $repayment = array_fill_keys($this->context->columnKeys(), 0.0);

        foreach ($this->businessPlan->loans as $loan) {
            $startDate = $loan->start_date instanceof Carbon
                ? $loan->start_date
                : Carbon::parse($loan->start_date);
            $endDate = $loan->end_date
                ? ($loan->end_date instanceof Carbon ? $loan->end_date : Carbon::parse($loan->end_date))
                : null;

            $monthlyInterest = (float) $loan->loan_amount * ((float) $loan->interest_rate / 12);
            $monthlyRepayment = (float) $loan->monthly_installment;

            $paymentDay = (int) ($loan->payment_day ?? 1);
            match ($this->context->view) {
                ViewContext::YEAR => $this->distributeYearly($interest, $repayment, $monthlyInterest, $monthlyRepayment, $startDate, $endDate),
                ViewContext::MONTH => $this->distributeMonthly($interest, $repayment, $monthlyInterest, $monthlyRepayment, $startDate, $endDate, $paymentDay),
                ViewContext::WEEK => $this->distributeWeekly($interest, $repayment, $monthlyInterest, $monthlyRepayment, $startDate, $endDate, $paymentDay),
            };
        }

        return ['interest' => $interest, 'repayment' => $repayment];
    }

    /**
     * @param  array<int, float>  $interest
     * @param  array<int, float>  $repayment
     */
    private function distributeYearly(array &$interest, array &$repayment, float $monthlyInterest, float $monthlyRepayment, Carbon $startDate, ?Carbon $endDate): void
    {
        $year = $this->context->year;

        if ($startDate->year > $year || ($endDate && $endDate->year < $year)) {
            return;
        }

        foreach ($this->context->columnKeys() as $month) {
            if ($startDate->year === $year && $month < $startDate->month) {
                continue;
            }

            if ($endDate && $endDate->year === $year && $month > $endDate->month) {
                continue;
            }

            $interest[$month] += $monthlyInterest;
            $repayment[$month] += $monthlyRepayment;
        }
    }

    /**
     * Month view: full cost placed in the ISO week that contains the payment_day.
     *
     * @param  array<int, float>  $interest
     * @param  array<int, float>  $repayment
     */
    private function distributeMonthly(array &$interest, array &$repayment, float $monthlyInterest, float $monthlyRepayment, Carbon $startDate, ?Carbon $endDate, int $paymentDay): void
    {
        $year = $this->context->year;
        $month = $this->context->month ?? (int) now()->format('m');
        $monthEnd = Carbon::create($year, $month, 1)->endOfMonth();

        [$periodStart, $periodEnd] = $this->context->dateRange();
        $periodEndDate = Carbon::parse($periodEnd);

        if ($startDate->gt($periodEndDate) || ($endDate && $endDate->lt(Carbon::parse($periodStart)))) {
            return;
        }

        $payDay = min($paymentDay, $monthEnd->day);
        $payDate = Carbon::create($year, $month, $payDay);

        $planFrom = $this->businessPlan->period_from;
        $planUntil = $this->businessPlan->period_until;

        if ($planFrom && $payDate->lt($planFrom)) {
            return;
        }

        if ($planUntil && $payDate->gt($planUntil)) {
            return;
        }

        $isoWeek = (int) $payDate->format('W');

        if (isset($interest[$isoWeek])) {
            $interest[$isoWeek] += $monthlyInterest;
            $repayment[$isoWeek] += $monthlyRepayment;
        }
    }

    /**
     * Week view: full monthly cost placed on the day the payment_day falls within the week.
     *
     * @param  array<int, float>  $interest
     * @param  array<int, float>  $repayment
     */
    private function distributeWeekly(array &$interest, array &$repayment, float $monthlyInterest, float $monthlyRepayment, Carbon $startDate, ?Carbon $endDate, int $paymentDay): void
    {
        [$weekStartStr, $weekEndStr] = $this->context->dateRange();
        $weekStart = Carbon::parse($weekStartStr);
        $weekEnd = Carbon::parse($weekEndStr);

        if ($startDate->gt($weekEnd) || ($endDate && $endDate->lt($weekStart))) {
            return;
        }

        $planFrom = $this->businessPlan->period_from;
        $planUntil = $this->businessPlan->period_until;

        // A week can span two months — check both
        foreach ([$weekStart, $weekEnd] as $ref) {
            $payDay = min($paymentDay, $ref->daysInMonth);
            $payDate = Carbon::create($ref->year, $ref->month, $payDay);

            if ($payDate->between($weekStart, $weekEnd)) {
                // Exclude pay dates outside the plan's active period
                if ($planFrom && $payDate->lt($planFrom)) {
                    break;
                }

                if ($planUntil && $payDate->gt($planUntil)) {
                    break;
                }

                $dayKey = $payDate->dayOfWeekIso; // 1=Mon..7=Sun
                if (isset($interest[$dayKey])) {
                    $interest[$dayKey] += $monthlyInterest;
                    $repayment[$dayKey] += $monthlyRepayment;
                }
                break;
            }
        }
    }
}
