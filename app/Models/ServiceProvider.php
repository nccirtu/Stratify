<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceProvider extends Model
{
    protected $fillable = [
        'name',
        'purpose_of_service',
        'service_description',
        'monthly_cost',
    ];

    public function businessPlan()
    {
        return $this->belongsTo(BusinessPlan::class);
    }
}
