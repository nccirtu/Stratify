<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BankAccount extends Model
{
    /** @use HasFactory<\Database\Factories\BankAccountFactory> */
    use HasFactory;

    protected $guarded = [];

    public function casts(): array
    {
        return [
            'order_index' => 'integer',
            'business_plan_id' => 'integer',
            'dispo_limit' => 'decimal:2',
        ];
    }

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }

    public function balances(): HasMany
    {
        return $this->hasMany(BankAccountBalance::class);
    }
}
