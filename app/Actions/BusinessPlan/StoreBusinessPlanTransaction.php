<?php

namespace App\Actions\BusinessPlan;

use App\Enums\StatusEnum;
use App\Enums\TypeEnum;
use App\Models\BusinessPlan;
use App\Models\RecurringTemplate;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Support\Str;

class StoreBusinessPlanTransaction
{
    public function handle(BusinessPlan $businessPlan, array $txData): void
    {
        $type = TypeEnum::from($txData['type']);
        $quantity = max(1, (int) ($txData['quantity'] ?? 1));
        $amount = (float) $txData['amount'];
        $totalAmount = $quantity * $amount;

        if (! empty($txData['is_recurring'])) {
            $template = RecurringTemplate::create([
                'business_plan_id' => $businessPlan->id,
                'amount' => $amount,
                'frequency' => $txData['frequency'],
                'day_of_month' => $txData['day_of_month'] ?? 1,
                'start_date' => $txData['start_date'],
                'end_date' => $txData['end_date'] ?? null,
                'catalog_item_id' => $txData['catalog_item_id'] ?? null,
            ]);

            $occurrences = $this->expandRecurringDates($txData, $businessPlan);

            foreach ($occurrences as $date) {
                Transaction::create([
                    'business_plan_id' => $businessPlan->id,
                    'name' => $txData['name'],
                    'slug' => Str::slug($txData['name']).'-'.$date.'-'.Str::random(4),
                    'description' => $txData['description'] ?? null,
                    'amount' => $amount,
                    'quantity' => $quantity,
                    'total_amount' => $totalAmount,
                    'category_id' => $txData['category_id'],
                    'currency_id' => $txData['currency_id'],
                    'tax_id' => $txData['tax_id'],
                    'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                    'recurring_template_id' => $template->id,
                    'type' => $type->value,
                    'status' => StatusEnum::DRAFT->value,
                    'date' => $date,
                    'is_forecast' => true,
                    'is_active' => true,
                    'is_recurring' => true,
                    'payment_method' => $txData['payment_method'] ?? null,
                ]);
            }
        } else {
            Transaction::create([
                'business_plan_id' => $businessPlan->id,
                'name' => $txData['name'],
                'slug' => Str::slug($txData['name']).'-'.Str::random(8),
                'description' => $txData['description'] ?? null,
                'amount' => $amount,
                'quantity' => $quantity,
                'total_amount' => $totalAmount,
                'category_id' => $txData['category_id'],
                'currency_id' => $txData['currency_id'],
                'tax_id' => $txData['tax_id'],
                'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                'recurring_template_id' => null,
                'type' => $type->value,
                'status' => StatusEnum::DRAFT->value,
                'date' => $txData['date'] ?? now(),
                'is_forecast' => true,
                'is_active' => true,
                'is_recurring' => false,
                'payment_method' => $txData['payment_method'] ?? null,
            ]);
        }
    }

    /**
     * Expands recurring config into individual occurrence dates,
     * clamped to the business plan's period boundaries.
     *
     * @return string[]
     */
    private function expandRecurringDates(array $txData, BusinessPlan $businessPlan): array
    {
        $frequency = $txData['frequency'] ?? 'monthly';
        $dayOfMonth = max(1, (int) ($txData['day_of_month'] ?? 1));
        $startDate = Carbon::parse($txData['start_date'] ?? now())->startOfDay();
        $endDate = ! empty($txData['end_date']) ? Carbon::parse($txData['end_date'])->startOfDay() : null;

        if ($businessPlan->period_from && $businessPlan->period_from->gt($startDate)) {
            $startDate = $businessPlan->period_from->copy()->startOfDay();
        }

        if ($businessPlan->period_until) {
            if ($endDate === null || $businessPlan->period_until->lt($endDate)) {
                $endDate = $businessPlan->period_until->copy()->startOfDay();
            }
        }

        if ($endDate === null) {
            return [$startDate->toDateString()];
        }

        $dates = [];

        switch ($frequency) {
            case 'daily':
                $current = $startDate->copy();
                while ($current->lte($endDate)) {
                    $dates[] = $current->toDateString();
                    $current->addDay();
                }
                break;

            case 'weekly':
                $current = $startDate->copy();
                while ($current->lte($endDate)) {
                    $dates[] = $current->toDateString();
                    $current->addWeek();
                }
                break;

            case 'monthly':
                $current = Carbon::create($startDate->year, $startDate->month, min($dayOfMonth, $startDate->daysInMonth))->startOfDay();
                if ($current->lt($startDate)) {
                    $current->addMonthNoOverflow();
                    $current->setDay(min($dayOfMonth, $current->daysInMonth));
                }
                while ($current->lte($endDate)) {
                    $dates[] = $current->toDateString();
                    $current->addMonthNoOverflow();
                    $current->setDay(min($dayOfMonth, $current->daysInMonth));
                }
                break;

            case 'quarterly':
                $current = Carbon::create($startDate->year, $startDate->month, min($dayOfMonth, $startDate->daysInMonth))->startOfDay();
                if ($current->lt($startDate)) {
                    $current->addMonthsNoOverflow(3);
                    $current->setDay(min($dayOfMonth, $current->daysInMonth));
                }
                while ($current->lte($endDate)) {
                    $dates[] = $current->toDateString();
                    $current->addMonthsNoOverflow(3);
                    $current->setDay(min($dayOfMonth, $current->daysInMonth));
                }
                break;

            case 'yearly':
                $current = Carbon::create($startDate->year, $startDate->month, min($dayOfMonth, $startDate->daysInMonth))->startOfDay();
                if ($current->lt($startDate)) {
                    $current->addYearNoOverflow();
                }
                while ($current->lte($endDate)) {
                    $dates[] = $current->toDateString();
                    $current->addYearNoOverflow();
                }
                break;
        }

        return $dates;
    }
}
