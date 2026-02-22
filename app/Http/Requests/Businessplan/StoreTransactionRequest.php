<?php

namespace App\Http\Requests\Businessplan;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransactionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'amount' => 'required|numeric|min:0',
            'quantity' => 'nullable|integer|min:1',
            'date' => 'nullable|date',
            'category_id' => 'required|exists:transaction_categories,id',
            'currency_id' => 'required|exists:currencies,id',
            'tax_id' => 'required|exists:taxes,id',
            'catalog_item_id' => 'nullable|exists:catalog_items,id',
            'payment_method' => 'nullable|string|max:255',
            'type' => 'required|in:income,expense',
            'is_recurring' => 'nullable|boolean',
            'frequency' => 'nullable|required_if:is_recurring,true|string|in:daily,weekly,monthly,quarterly,yearly',
            'day_of_month' => 'nullable|integer|min:1|max:31',
            'start_date' => 'nullable|required_if:is_recurring,true|date',
            'end_date' => 'nullable|date',
        ];
    }
}
