<?php

namespace App\Models;

use App\Enums\CatalogTypeEnum;
use App\Enums\TypeEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CatalogItem extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'description' => 'string',
        'type' => TypeEnum::class,
        'company_id' => 'integer',
        'user_id' => 'integer',
        'currency_id' => 'integer',
        'tax_id' => 'integer',
        'branch_id' => 'integer',
        'transaction_category_id' => 'integer',
        'catalog_type' => CatalogTypeEnum::class,
        'is_active' => 'boolean',
        'default_amount' => 'decimal',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branches::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function tax(): BelongsTo
    {
        return $this->belongsTo(Tax::class);
    }

    public function currency(): BelongsTo
    {
        return $this->belongsTo(Currency::class);
    }

    public function transactionCategory(): BelongsTo
    {
        return $this->belongsTo(TransactionCategory::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }
}
