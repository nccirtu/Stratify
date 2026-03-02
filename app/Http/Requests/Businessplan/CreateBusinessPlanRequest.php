<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
            'slug' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                Rule::unique('business_plans', 'slug')->where('user_id', $this->user()->id),
            ],
            'description' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.regex' => 'Der Slug darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten.',
            'slug.unique' => 'Du hast bereits einen Businessplan mit diesem Slug. Bitte wähle einen anderen Namen.',
        ];
    }
}
