<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class CreateBusinessPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:business_plans,slug',
            'description' => 'nullable|string',
        ];
    }
}
