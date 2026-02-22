<?php

namespace App\Services\LiquidityPlan;

class LiquiditySaldoCalculator
{
    /**
     * Calculates the running liquidity balance per column key.
     *
     * When $injectionKey is provided the opening balance starts at 0 and the
     * $injectionBalance is added the moment the iteration reaches $injectionKey.
     * This allows the opening balance (Saldo Vortrag) to appear precisely at
     * the column that matches the plan's period_from (day/week/month-exact).
     *
     * @param  int[]  $columnKeys
     * @param  array<int, float>  $incomeSummary  [col_key => total_income]
     * @param  array<int, float>  $expenseSummary  [col_key => total_expense]
     * @return array<int, float> [col_key => saldo]
     */
    public function calculate(
        float $openingBalance,
        array $columnKeys,
        array $incomeSummary,
        array $expenseSummary,
        float $injectionBalance = 0.0,
        ?int $injectionKey = null
    ): array {
        $saldo = [];
        $previous = $injectionKey === null ? $openingBalance : 0.0;
        $injected = $injectionKey === null;

        foreach ($columnKeys as $key) {
            if (! $injected && $key >= $injectionKey) {
                $previous += $injectionBalance;
                $injected = true;
            }

            // Only accumulate income/expense from the injection key onward.
            // Columns before period_from are pre-plan and must not affect the saldo.
            if ($injected) {
                $income = $incomeSummary[$key] ?? 0.0;
                $expense = $expenseSummary[$key] ?? 0.0;
                $previous = $previous + $income - $expense;
            }

            $saldo[$key] = round($previous, 2);
        }

        return $saldo;
    }
}
