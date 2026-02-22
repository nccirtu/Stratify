<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TransactionCategory extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'is_active' => 'boolean',
        'description' => 'string',
        'type' => 'string',
        'liquidity_account_id' => 'integer',
    ];

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function liquidityAccount(): BelongsTo
    {
        return $this->belongsTo(LiquidityAccount::class);
    }
}
