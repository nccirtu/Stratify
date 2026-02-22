<?php

namespace App\Services\LiquidityPlan;

use App\Models\BusinessPlan;
use Carbon\Carbon;

class EmployeeCostAggregator
{
    public function __construct(
        protected BusinessPlan $businessPlan,
        protected ViewContext $context
    ) {}

    /**
     * Returns personnel costs (employees + founders) per column key.
     *
     * @return array<int, float> [col_key => total_cost]
     */
    public function aggregate(): array
    {
        $result = array_fill_keys($this->context->columnKeys(), 0.0);

        $this->addEmployeeCosts($result);
        $this->addFounderCosts($result);

        return $result;
    }

    /**
     * @param  array<int, float>  $result
     */
    private function addEmployeeCosts(array &$result): void
    {
        foreach ($this->businessPlan->employees as $employee) {
            if (! $employee->salary || ! $employee->date_of_hire) {
                continue;
            }

            $monthlyCost = (float) $employee->salary * max(1, (int) $employee->number_of_employees);
            $hireDate = $employee->date_of_hire instanceof Carbon
                ? $employee->date_of_hire
                : Carbon::parse($employee->date_of_hire);

            $paymentDay = (int) ($employee->payment_day ?? 1);
            match ($this->context->view) {
                ViewContext::YEAR => $this->distributeYearly($result, $monthlyCost, $hireDate),
                ViewContext::MONTH => $this->distributeMonthly($result, $monthlyCost, $hireDate, $paymentDay),
                ViewContext::WEEK => $this->distributeWeekly($result, $monthlyCost, $hireDate, $paymentDay),
            };
        }
    }

    /**
     * @param  array<int, float>  $result
     */
    private function addFounderCosts(array &$result): void
    {
        foreach ($this->businessPlan->founders as $founder) {
            if (! $founder->salary_expectation) {
                continue;
            }

            $monthlyCost = (float) $founder->salary_expectation;
            $colCount = count($this->context->columnKeys());
            $periodFrom = $this->businessPlan->period_from;
            $periodUntil = $this->businessPlan->period_until;

            [$viewStart, $viewEnd] = $this->context->dateRange();

            // Clamp view boundaries to plan period
            $effectiveStart = $periodFrom ? max($viewStart, $periodFrom->toDateString()) : $viewStart;
            $effectiveEnd = $periodUntil ? min($viewEnd, $periodUntil->toDateString()) : $viewEnd;

            if ($effectiveStart > $effectiveEnd) {
                continue;
            }

            foreach ($this->context->columnKeys() as $key) {
                $result[$key] += match ($this->context->view) {
                    ViewContext::WEEK => $monthlyCost / 30,
                    ViewContext::MONTH => $monthlyCost / $colCount,
                    default => $monthlyCost,
                };
            }
        }
    }

    /**
     * Year view: one entry per month (1–12), starting from the hire month.
     *
     * @param  array<int, float>  $result
     */
    private function distributeYearly(array &$result, float $monthlyCost, Carbon $hireDate): void
    {
        $hireYear = $hireDate->year;
        $hireMonth = $hireDate->month;
        $year = $this->context->year;

        foreach ($this->context->columnKeys() as $month) {
            if ($hireYear > $year) {
                continue;
            }

            if ($hireYear === $year && $month < $hireMonth) {
                continue;
            }

            $result[$month] += $monthlyCost;
        }
    }

    /**
     * Month view: full cost placed in the ISO week that contains the payment_day.
     *
     * @param  array<int, float>  $result
     */
    private function distributeMonthly(array &$result, float $monthlyCost, Carbon $hireDate, int $paymentDay): void
    {
        $year = $this->context->year;
        $month = $this->context->month ?? (int) now()->format('m');

        $monthEnd = Carbon::create($year, $month, 1)->endOfMonth();
        if ($hireDate->gt($monthEnd)) {
            return;
        }

        $payDay = min($paymentDay, $monthEnd->day);
        $payDate = Carbon::create($year, $month, $payDay);

        $periodFrom = $this->businessPlan->period_from;
        $periodUntil = $this->businessPlan->period_until;

        if ($periodFrom && $payDate->lt($periodFrom)) {
            return;
        }

        if ($periodUntil && $payDate->gt($periodUntil)) {
            return;
        }

        $isoWeek = (int) $payDate->format('W');

        if (isset($result[$isoWeek])) {
            $result[$isoWeek] += $monthlyCost;
        }
    }

    /**
     * Week view: full monthly cost placed on the day the payment_day falls within the week.
     *
     * @param  array<int, float>  $result
     */
    private function distributeWeekly(array &$result, float $monthlyCost, Carbon $hireDate, int $paymentDay): void
    {
        [$weekStartStr, $weekEndStr] = $this->context->dateRange();
        $weekStart = Carbon::parse($weekStartStr);
        $weekEnd = Carbon::parse($weekEndStr);

        if ($hireDate->gt($weekEnd)) {
            return;
        }

        $periodFrom = $this->businessPlan->period_from;
        $periodUntil = $this->businessPlan->period_until;

        // A week can span two months — check both
        foreach ([$weekStart, $weekEnd] as $ref) {
            $payDay = min($paymentDay, $ref->daysInMonth);
            $payDate = Carbon::create($ref->year, $ref->month, $payDay);

            if ($payDate->between($weekStart, $weekEnd)) {
                // Exclude pay dates outside the plan's active period
                if ($periodFrom && $payDate->lt($periodFrom)) {
                    break;
                }

                if ($periodUntil && $payDate->gt($periodUntil)) {
                    break;
                }

                $dayKey = $payDate->dayOfWeekIso; // 1=Mon..7=Sun
                if (isset($result[$dayKey])) {
                    $result[$dayKey] += $monthlyCost;
                }
                break;
            }
        }
    }
}
