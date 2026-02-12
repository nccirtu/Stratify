<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RecurringTemplate extends Model
{
    protected $guarded = [];

    protected $casts = [
        'business_plan_id' => 'integer',
        'amount' => 'decimal:2',
        'frequency' => 'string',
        'day_of_month' => 'integer',
        'start_date' => 'date',
        'end_date' => 'date',
        'catalog_item_id' => 'integer',
    ];

    public function catalogItem(): BelongsTo
    {
        return $this->belongsTo(CatalogItem::class);
    }

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
