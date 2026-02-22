<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Loan extends Model
{
    /** @use HasFactory<\Database\Factories\LoanFactory> */
    use HasFactory;

    protected $guarded = [];

    public function casts(): array
    {
        return [
            'loan_amount' => 'decimal:2',
            'interest_rate' => 'decimal:4',
            'monthly_installment' => 'decimal:2',
            'start_date' => 'date',
            'end_date' => 'date',
            'business_plan_id' => 'integer',
            'payment_day' => 'integer',
        ];
    }

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
