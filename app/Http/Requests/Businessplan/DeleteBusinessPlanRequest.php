<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class DeleteBusinessPlanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [];
    }
}
