<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class SaveWizardStepRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
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
            'create_new_company' => 'boolean',
            'company_id' => 'nullable|exists:companies,id',
            'new_company_name' => 'nullable|string|max:255|required_if:create_new_company,true',
            'branch_id' => 'nullable|required_if:create_new_company,true|exists:branches,id',
        ];
    }

    private function step3Rules(): array
    {
        return [
            'period_from' => 'nullable|date',
            'period_until' => 'nullable|date|after_or_equal:period_from',
        ];
    }

    private function step4Rules(): array
    {
        return [
            'business_idea' => 'nullable|string',
            'currency_id' => 'nullable|exists:currencies,id',
            'language' => 'nullable|string|max:10',
        ];
    }

    private function step5Rules(): array
    {
        return [
            'target_customers' => 'nullable|string',
            'customer_problems' => 'nullable|string',
            'location' => 'nullable|string|max:255',
        ];
    }

    private function step6Rules(): array
    {
        return [
            'solution_description' => 'nullable|string',
            'competitive_advantage' => 'nullable|string',
            'pricing_strategy' => 'nullable|string',
        ];
    }

    private function step7Rules(): array
    {
        return [
            'competitors' => 'nullable|string',
        ];
    }

    private function step8Rules(): array
    {
        return [
            'team_members' => 'nullable|string',
            'initial_investment' => 'nullable|numeric|min:0',
        ];
    }

    private function step9Rules(): array
    {
        return [
            'marketing_channels' => 'nullable|string',
            'revenue_model' => 'nullable|string',
        ];
    }

    private function step10Rules(): array
    {
        return [
            'milestones' => 'nullable|string',
            'risks' => 'nullable|string',
        ];
    }

    private function step11Rules(): array
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
            'income_transactions.*.is_recurring' => 'boolean',
            'income_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'income_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'income_transactions.*.start_date' => 'nullable|date',
            'income_transactions.*.end_date' => 'nullable|date',
        ];
    }

    private function step12Rules(): array
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
            'expense_transactions.*.is_recurring' => 'boolean',
            'expense_transactions.*.frequency' => 'nullable|string|in:daily,weekly,monthly,quarterly,yearly',
            'expense_transactions.*.day_of_month' => 'nullable|integer|min:1|max:31',
            'expense_transactions.*.start_date' => 'nullable|date',
            'expense_transactions.*.end_date' => 'nullable|date',
        ];
    }
}
