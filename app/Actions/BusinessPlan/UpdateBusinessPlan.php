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
                'slug' => Str::slug($data['new_company_name']),
                'user_id' => auth()->id(),
                'branch_id' => $data['branch_id'],
                'address' => '',
                'zip_code' => '',
                'city' => '',
                'state' => '',
                'country' => '',
            ]);
            $data['company_id'] = $company->id;
        }

        // Extract transactions before stripping non-column keys
        $incomeTransactions = $data['income_transactions'] ?? null;
        $expenseTransactions = $data['expense_transactions'] ?? null;

        // Strip non-column keys before updating
        unset($data['create_new_company'], $data['new_company_name'], $data['income_transactions'], $data['expense_transactions'], $data['step']);

        // Update main business plan attributes
        $businessPlan->update($data);

        // Handle Income Transactions
        if (is_array($incomeTransactions)) {
            $businessPlan->transactions()->where('type', TypeEnum::INCOME->value)->delete();
            $this->storeTransactions($businessPlan, $incomeTransactions, TypeEnum::INCOME);
        }

        // Handle Expense Transactions
        if (is_array($expenseTransactions)) {
            $businessPlan->transactions()->where('type', TypeEnum::EXPENSE->value)->delete();
            $this->storeTransactions($businessPlan, $expenseTransactions, TypeEnum::EXPENSE);
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
