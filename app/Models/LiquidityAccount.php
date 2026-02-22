<?php

namespace App\Models;

use App\Enums\LiquiditySectionEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LiquidityAccount extends Model
{
    protected $guarded = [];

    public function casts(): array
    {
        return [
            'section' => LiquiditySectionEnum::class,
            'is_active' => 'boolean',
            'order_index' => 'integer',
        ];
    }

    public function transactionCategories(): HasMany
    {
        return $this->hasMany(TransactionCategory::class);
    }
}
