<?php

namespace App\Models;

use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessPlan extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
        'company_id',
        'branch_id',
        'user_id',
        'status',
        'period_from',
        'period_until',
    ];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'description' => 'string',
        'is_active' => 'boolean',
        'company_id' => 'integer',
        'branch_id' => 'integer',
        'user_id' => 'integer',
        'status' => StatusEnum::class,
        'period_from' => 'date',
        'period_until' => 'date',
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

}
