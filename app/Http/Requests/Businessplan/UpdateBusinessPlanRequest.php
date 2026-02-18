<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBusinessPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            // Step 1: General
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:business_plans,slug,'.$this->route('businessplan')->id,
            'description' => 'nullable|string',

            // Step 2: Company
            'create_new_company' => 'boolean',
            'company_id' => 'nullable|exists:companies,id|required_if:create_new_company,false',
            'branch_id' => 'nullable|exists:branches,id',
            // New Company Fields
            'new_company_name' => 'nullable|string|max:255|required_if:create_new_company,true',
            // Add other necessary company fields if needed

            // Step 3: Period
            'period_from' => 'nullable|date',
            'period_until' => 'nullable|date|after_or_equal:period_from',

            // Step 4: Business idea
            'business_idea' => 'nullable|string',
            'currency_id' => 'nullable|exists:currencies,id',
            'language' => 'nullable|string|max:10',

            // Step 5: Target & Market
            'target_customers' => 'nullable|string',
            'customer_problems' => 'nullable|string',
            'location' => 'nullable|string|max:255',

            // Step 6: Solution & Offer
            'solution_description' => 'nullable|string',
            'competitive_advantage' => 'nullable|string',
            'pricing_strategy' => 'nullable|string',

            // Step 7: Competition
            'competitors' => 'nullable|string',

            // Step 8: Team & Resources
            'team_members' => 'nullable|string',
            'initial_investment' => 'nullable|numeric|min:0',

            // Step 9: Marketing & Sales
            'marketing_channels' => 'nullable|string',
            'revenue_model' => 'nullable|string',

            // Step 10: Planning & Risks
            'milestones' => 'nullable|string',
            'risks' => 'nullable|string',

            // Step 11: Income transactions
            'income_transactions' => 'nullable|array',
            'income_transactions.*.catalog_item_id' => 'nullable|exists:catalog_items,id',
            'income_transactions.*.name' => 'required|string|max:255',
            'income_transactions.*.amount' => 'required|numeric|min:0',
            'income_transactions.*.category_id' => 'nullable|exists:transaction_categories,id',
            'income_transactions.*.currency_id' => 'required|exists:currencies,id',
            'income_transactions.*.tax_id' => 'required|exists:taxes,id',
            'income_transactions.*.date' => 'nullable|date',
            'income_transactions.*.payment_method' => 'required|string|max:255',
            'income_transactions.*.description' => 'nullable|string',
            'income_transactions.*.is_recurring' => 'boolean',
            'income_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'income_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'income_transactions.*.start_date' => 'nullable|date',
            'income_transactions.*.end_date' => 'nullable|date',

            // Step 12: Expense transactions
            'expense_transactions' => 'nullable|array',
            'expense_transactions.*.catalog_item_id' => 'nullable|exists:catalog_items,id',
            'expense_transactions.*.name' => 'required|string|max:255',
            'expense_transactions.*.amount' => 'required|numeric|min:0',
            'expense_transactions.*.category_id' => 'nullable|exists:transaction_categories,id',
            'expense_transactions.*.currency_id' => 'required|exists:currencies,id',
            'expense_transactions.*.tax_id' => 'required|exists:taxes,id',
            'expense_transactions.*.date' => 'nullable|date',
            'expense_transactions.*.payment_method' => 'required|string|max:255',
            'expense_transactions.*.description' => 'nullable|string',
            'expense_transactions.*.is_recurring' => 'boolean',
            'expense_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'expense_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'expense_transactions.*.start_date' => 'nullable|date',
            'expense_transactions.*.end_date' => 'nullable|date',
        ];
    }
}
