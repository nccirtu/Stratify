<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    protected $fillable = [
        'job_title',
        'number_of_employees',
        'qualification',
        'experience',
        'area_of_responsibility',
        'working_hours_per_week',
        'date_of_hire',
        'salary',
        'business_plan_id',
    ];

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
