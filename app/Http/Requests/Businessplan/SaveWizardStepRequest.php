<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class SaveWizardStepRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if ($this->has('is_headquarter') && in_array($this->is_headquarter, ['true', 'false'], true)) {
            $this->merge([
                'is_headquarter' => $this->is_headquarter === 'true',
            ]);
        }
    }

    public function rules(): array
    {
        $step = (int) $this->input('step', 1);

        return match ($step) {
            1 => $this->step1Rules(),
            2 => $this->step2Rules(),
            3 => $this->step3Rules(),
            4 => $this->step4Rules(),
            5 => $this->step5Rules(),
            6 => $this->step6Rules(),
            7 => $this->step7Rules(),
            8 => $this->step8Rules(),
            9 => $this->step9Rules(),
            10 => $this->step10Rules(),
            11 => $this->step11Rules(),
            12 => $this->step12Rules(),
            default => [],
        };
    }

    private function step1Rules(): array
    {
        $businessPlanId = $this->route('businessPlan')?->id;
        $uniqueSlug = $businessPlanId
            ? 'unique:business_plans,slug,'.$businessPlanId
            : 'unique:business_plans,slug';

        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|'.$uniqueSlug,
            'description' => 'nullable|string',
        ];
    }

    private function step2Rules(): array
    {
        return [
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
        ];
    }

    private function step3Rules(): array
    {
        return [
            'businessplan_target' => 'nullable|string|max:100',
            'capital_usage' => 'nullable|array',
            'capital_usage.*' => 'string',
            'period_from' => 'nullable|date',
            'period_until' => 'nullable|date|after_or_equal:period_from',
        ];
    }

    private function step4Rules(): array
    {
        return [
            'business_activities' => 'nullable|string|max:100',
            'last_year_revenue' => 'nullable|numeric|min:0',
            'business_model' => 'nullable|array',
            'business_model.*' => 'string',
            'customer_problems' => 'nullable|string',
        ];
    }

    private function step5Rules(): array
    {
        return [
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
        ];
    }

    private function step6Rules(): array
    {
        return [
            'offer_type' => 'nullable|array',
            'offer_type.*' => 'string',
            'development_state' => 'nullable|string|max:100',
            'property_rights' => 'nullable|array',
            'property_rights.*' => 'string',
            'details_property_rights' => 'nullable|string',
            'pricing_stategie' => 'nullable|string|max:100',
        ];
    }

    private function step7Rules(): array
    {
        return [
            'client_type' => 'nullable|array',
            'client_type.*' => 'string',
            'target_market' => 'nullable|string|max:100',
        ];
    }

    private function step8Rules(): array
    {
        return [
            'purchase_decision' => 'nullable|array',
            'purchase_decision.*' => 'string',
            'age_group' => 'nullable|string|max:100',
            'life_situation' => 'nullable|string|max:100',
            'information_target_group' => 'nullable|array',
            'information_target_group.*' => 'string',
            'company_target_group' => 'nullable|array',
            'company_target_group.*' => 'string',
            'public_tenders' => 'nullable|string|max:100',
            'channels' => 'nullable|array',
            'channels.*' => 'string',
        ];
    }

    private function step9Rules(): array
    {
        return [
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
            'income_transactions.*.quantity' => 'nullable|integer|min:1',
            'income_transactions.*.is_recurring' => 'boolean',
            'income_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'income_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'income_transactions.*.start_date' => 'nullable|date',
            'income_transactions.*.end_date' => 'nullable|date',
        ];
    }

    private function step10Rules(): array
    {
        return [
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
            'expense_transactions.*.quantity' => 'nullable|integer|min:1',
            'expense_transactions.*.is_recurring' => 'boolean',
            'expense_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'expense_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'expense_transactions.*.start_date' => 'nullable|date',
            'expense_transactions.*.end_date' => 'nullable|date',
        ];
    }

    private function step11Rules(): array
    {
        return [
            'employees' => 'nullable|array',
            'employees.*.job_title' => 'required|string|max:255',
            'employees.*.number_of_employees' => 'required|integer|min:1',
            'employees.*.salary' => 'required|numeric|min:0',
            'employees.*.date_of_hire' => 'required|date',
            'employees.*.payment_day' => 'nullable|integer|min:1|max:31',
            'employees.*.working_hours_per_week' => 'nullable|numeric|min:0',
            'employees.*.qualification' => 'nullable|string|max:255',
            'employees.*.area_of_responsibility' => 'nullable|string',
        ];
    }

    private function step12Rules(): array
    {
        return [
            'loans' => 'nullable|array',
            'loans.*.name' => 'required|string|max:255',
            'loans.*.loan_amount' => 'required|numeric|min:0',
            'loans.*.interest_rate' => 'required|numeric|min:0',
            'loans.*.monthly_installment' => 'required|numeric|min:0',
            'loans.*.start_date' => 'required|date',
            'loans.*.end_date' => 'nullable|date',
            'loans.*.payment_day' => 'nullable|integer|min:1|max:31',
            'loans.*.description' => 'nullable|string',
        ];
    }
}
