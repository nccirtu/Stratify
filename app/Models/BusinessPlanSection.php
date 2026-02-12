<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessPlanSection extends Model
{
    protected $guarded = [];

    protected $casts = [
        'business_plan_id' => 'integer',
        'user_prompt' => 'string',
        'title' => 'string',
        'text' => 'string',
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
