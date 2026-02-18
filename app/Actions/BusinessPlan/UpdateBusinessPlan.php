<?php

namespace App\Actions\BusinessPlan;

use App\Enums\StatusEnum;
use App\Enums\TypeEnum;
use App\Models\BusinessPlan;
use App\Models\Company;
use App\Models\RecurringTemplate;
use App\Models\Transaction;
use Illuminate\Support\Str;

class UpdateBusinessPlan
{
    public function handle(BusinessPlan $businessPlan, array $data): BusinessPlan
    {
        // Handle "Create New Company"
        if (isset($data['create_new_company']) && $data['create_new_company']) {
            $company = Company::create([
                'name' => $data['new_company_name'],
                'user_id' => auth()->id(),
                // Add default fields if necessary (email, etc.) - assuming basic creation for now
            ]);
            $data['company_id'] = $company->id;
        }

        // Update main business plan attributes
        $businessPlan->update($data);

        // Handle Income Transactions
        if (isset($data['income_transactions'])) {
            // Delete existing incomes if fully replacing? Or update?
            // The original controller seemed to append.
            // But since this is a "save step", usually we replace the whole list or sync.
            // Let's assume replace for simplicity or match the original behavior if possible.
            // Original controller used `storeTransactions` which did `Transaction::create`.
            // If we re-save step 11 multiple times, we'd duplicate transactions.
            // We should probably delete existing ones of that type for this plan first.
            $businessPlan->transactions()->where('type', TypeEnum::INCOME->value)->delete();
            $this->storeTransactions($businessPlan, $data['income_transactions'], TypeEnum::INCOME);
        }

        // Handle Expense Transactions
        if (isset($data['expense_transactions'])) {
            $businessPlan->transactions()->where('type', TypeEnum::EXPENSE->value)->delete();
            $this->storeTransactions($businessPlan, $data['expense_transactions'], TypeEnum::EXPENSE);
        }

        return $businessPlan;
    }

    private function storeTransactions(BusinessPlan $businessPlan, array $transactions, TypeEnum $type): void
    {
        foreach ($transactions as $txData) {
            $recurringTemplateId = null;

            if (! empty($txData['is_recurring'])) {
                $template = RecurringTemplate::create([
                    'business_plan_id' => $businessPlan->id,
                    'amount' => $txData['amount'],
                    'frequency' => $txData['frequency'],
                    'day_of_month' => $txData['day_of_month'] ?? 1,
                    'start_date' => $txData['start_date'],
                    'end_date' => $txData['end_date'] ?? null,
                    'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                ]);
                $recurringTemplateId = $template->id;
            }

            Transaction::create([
                'business_plan_id' => $businessPlan->id,
                'name' => $txData['name'],
                'slug' => Str::slug($txData['name']),
                'description' => $txData['description'] ?? null,
                'amount' => $txData['amount'],
                'total_amount' => $txData['amount'],
                'category_id' => $txData['category_id'],
                'currency_id' => $txData['currency_id'],
                'tax_id' => $txData['tax_id'],
                'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                'recurring_template_id' => $recurringTemplateId,
                'type' => $type->value,
                'status' => StatusEnum::DRAFT->value,
                'date' => $txData['date'] ?? now(),
                'is_forecast' => true,
                'is_active' => true,
                'is_recurring' => ! empty($txData['is_recurring']),
                'payment_method' => $txData['payment_method'],
            ]);
        }
    }
}
