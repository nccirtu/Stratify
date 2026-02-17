<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Founder extends Model
{
    protected $fillable = [
        'name',
        'gender',
        'year_of_birth',
        'job_title',
        'qualification',
        'branch_knowledge',
        'leadership_skills',
        'area_of_responsibility',
        'equity_percentage',
        'salary_expectation',
    ];

    public function businessPlan()
    {
        return $this->belongsTo(BusinessPlan::class);
    }

}
