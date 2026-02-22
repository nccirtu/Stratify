<?php

namespace App\Actions\BusinessPlan;

use App\Enums\StatusEnum;
use App\Enums\TypeEnum;
use App\Models\BusinessPlan;
use App\Models\Employee;
use App\Models\Loan;
use App\Models\RecurringTemplate;
use App\Models\Transaction;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;

class UpdateBusinessPlan
{
    public function handle(BusinessPlan $businessPlan, array $data): BusinessPlan
    {
        // Extract relations before stripping non-column keys
        $incomeTransactions = $data['income_transactions'] ?? null;
        $expenseTransactions = $data['expense_transactions'] ?? null;
        $employees = $data['employees'] ?? null;
        $loans = $data['loans'] ?? null;

        // Handle logo file upload
        if (isset($data['logo']) && $data['logo'] instanceof UploadedFile) {
            $path = $data['logo']->store('logos', 'public');
            $data['logo'] = $path;
        }

        // Strip non-column keys before updating
        unset($data['income_transactions'], $data['expense_transactions'], $data['employees'], $data['loans'], $data['step']);

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

        // Handle Employees
        if (is_array($employees)) {
            $businessPlan->employees()->delete();
            $this->storeEmployees($businessPlan, $employees);
        }

        // Handle Loans
        if (is_array($loans)) {
            $businessPlan->loans()->delete();
            $this->storeLoans($businessPlan, $loans);
        }

        return $businessPlan;
    }

    private function storeEmployees(BusinessPlan $businessPlan, array $employees): void
    {
        foreach ($employees as $employeeData) {
            Employee::create([
                'business_plan_id' => $businessPlan->id,
                'job_title' => $employeeData['job_title'],
                'number_of_employees' => $employeeData['number_of_employees'] ?? 1,
                'salary' => $employeeData['salary'],
                'date_of_hire' => $employeeData['date_of_hire'],
                'payment_day' => $employeeData['payment_day'] ?? 1,
                'working_hours_per_week' => $employeeData['working_hours_per_week'] ?? null,
                'qualification' => $employeeData['qualification'] ?? null,
                'area_of_responsibility' => $employeeData['area_of_responsibility'] ?? null,
            ]);
        }
    }

    private function storeLoans(BusinessPlan $businessPlan, array $loans): void
    {
        foreach ($loans as $loanData) {
            Loan::create([
                'business_plan_id' => $businessPlan->id,
                'name' => $loanData['name'],
                'loan_amount' => $loanData['loan_amount'],
                'interest_rate' => $loanData['interest_rate'],
                'monthly_installment' => $loanData['monthly_installment'],
                'start_date' => $loanData['start_date'],
                'end_date' => $loanData['end_date'] ?? null,
                'payment_day' => $loanData['payment_day'] ?? 1,
                'description' => $loanData['description'] ?? null,
            ]);
        }
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
