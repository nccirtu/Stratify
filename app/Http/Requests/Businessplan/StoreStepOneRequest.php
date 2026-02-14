<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class StoreStepOneRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:business_plans,slug,'.$this->business_plan?->id],
            'description' => ['nullable', 'string'],
            'status' => ['required', 'string', 'in:draft,in_progress,completed'],
        ];
    }
}
