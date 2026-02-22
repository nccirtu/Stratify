<?php

namespace App\Services\LiquidityPlan;

use App\Models\BusinessPlan;
use Illuminate\Support\Facades\DB;

class IstBalanceCalculator
{
    public function __construct(
        protected BusinessPlan $businessPlan,
        protected ViewContext $context,
    ) {}

    /**
     * Calculates the running IST balance per column from actual (non-forecast) transactions.
     * IST = opening_balance + cumulative (income − expense) of is_forecast=false transactions.
     *
     * @return array<int, float> [columnKey => running_ist_balance]
     */
    public function calculate(): array
    {
        $openingBalance = (float) ($this->businessPlan->liquidity_opening_balance ?? 0);
        [$start, $end] = $this->context->dateRange();

        // Sum all actual transactions BEFORE the current period window → carry-over balance
        $carryOver = (float) DB::table('transactions')
            ->where('business_plan_id', $this->businessPlan->id)
            ->where('is_forecast', false)
            ->where('is_active', true)
            ->where('date', '<', $start)
            ->selectRaw("SUM(CASE WHEN type = 'income' THEN total_amount ELSE -total_amount END) as net")
            ->value('net');

        $startingBalance = $openingBalance + $carryOver;

        // Aggregate net cash flow per column key within the current period
        $rows = DB::table('transactions')
            ->where('business_plan_id', $this->businessPlan->id)
            ->where('is_forecast', false)
            ->where('is_active', true)
            ->whereBetween('date', [$start, $end])
            ->selectRaw(
                $this->context->sqlDateKey().' as col_key,
                SUM(CASE WHEN type = \'income\' THEN total_amount ELSE -total_amount END) as net'
            )
            ->groupByRaw($this->context->sqlDateKey())
            ->get();

        $netByKey = [];
        foreach ($rows as $row) {
            $key = $this->context->normalizeKey((int) $row->col_key);
            $netByKey[$key] = (float) $row->net;
        }

        // Build running balance across all column keys
        $result = [];
        $running = $startingBalance;

        foreach ($this->context->columnKeys() as $key) {
            $running += $netByKey[$key] ?? 0.0;
            $result[$key] = round($running, 2);
        }

        return $result;
    }
}
