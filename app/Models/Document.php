<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    protected $guarded = [];

    protected $casts = [
        'user_id' => 'integer',
        'business_plan_id' => 'integer',
        'type' => 'string',
        'name' => 'string',
        'path' => 'string',
        'slug' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
