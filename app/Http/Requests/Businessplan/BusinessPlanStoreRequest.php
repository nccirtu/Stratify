<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class BusinessPlanStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:2', 'max:255'],
            'description' => ['nullable', 'string', 'max:65535'],
            'market_analysis' => ['nullable', 'string', 'max:65535'],
            'financial_plan' => ['nullable', 'string', 'max:65535'],
            'marketing_strategy' => ['nullable', 'string', 'max:65535'],
        ];
    }
}
