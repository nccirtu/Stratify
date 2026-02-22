<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_title',
        'number_of_employees',
        'qualification',
        'experience',
        'area_of_responsibility',
        'working_hours_per_week',
        'date_of_hire',
        'payment_day',
        'salary',
        'business_plan_id',
    ];

    protected $casts = [
        'date_of_hire' => 'date',
        'salary' => 'decimal:2',
        'working_hours_per_week' => 'decimal:2',
        'number_of_employees' => 'integer',
        'payment_day' => 'integer',
    ];

    public function businessPlan(): BelongsTo
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
