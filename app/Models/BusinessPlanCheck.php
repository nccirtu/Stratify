<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessPlanCheck extends Model
{
    protected $guarded = [];

    public function casts(): array
    {
        return [
            'check_group' => 'integer',
            'score' => 'integer',
            'checked_at' => 'datetime',
        ];
    }

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
