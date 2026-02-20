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
        $businessPlanId = $this->route('businessplan')->id;

        return [
            // Step 1: Stammdaten
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|max:255|unique:business_plans,slug,'.$businessPlanId,
            'description' => 'nullable|string',

            // Step 2: Unternehmensdaten
            'company_state' => 'nullable|string|in:new,existing,succession',
            'handover_date' => 'nullable|date',
            'existing_date' => 'nullable|date',
            'is_headquarter' => 'nullable|boolean',
            'company_name' => 'nullable|string|max:255',
            'branch_id' => 'nullable|exists:branches,id',
            'company_description' => 'nullable|string',
            'address' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'country' => 'nullable|string|max:255',
            'expected_headquarters' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|string|max:255',
            'logo' => 'nullable|file|image|max:5120',

            // Step 3: Vorhaben
            'businessplan_target' => 'nullable|string|max:100',
            'capital_usage' => 'nullable|array',
            'capital_usage.*' => 'string',
            'period_from' => 'nullable|date',
            'period_until' => 'nullable|date|after_or_equal:period_from',

            // Step 4: Details
            'business_activities' => 'nullable|string|max:100',
            'last_year_revenue' => 'nullable|numeric|min:0',
            'business_model' => 'nullable|array',
            'business_model.*' => 'string',
            'customer_problems' => 'nullable|string',

            // Step 5: USP & Skalierung
            'inovation_level' => 'nullable|string|max:100',
            'usp' => 'nullable|array',
            'usp.*' => 'string',
            'price_leadership' => 'nullable|array',
            'price_leadership.*' => 'string',
            'quality_leadership' => 'nullable|array',
            'quality_leadership.*' => 'string',
            'specialist_leadership' => 'nullable|array',
            'specialist_leadership.*' => 'string',
            'technology_leadership' => 'nullable|array',
            'technology_leadership.*' => 'string',
            'exclusive_leadership' => 'nullable|array',
            'exclusive_leadership.*' => 'string',
            'community_leadership' => 'nullable|array',
            'community_leadership.*' => 'string',
            'usp_text' => 'nullable|string',
            'scalable' => 'nullable|string|max:100',

            // Step 6: Income transactions
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

            // Step 7: Expense transactions
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
