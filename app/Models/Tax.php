<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'is_active',
        'description',
        'country_code',
        'code',
        'rate',
        'reverse_charge',
        'applies_to',
        'valid_from',
        'valid_to',
        'is_inclusive',
    ];

    protected $casts = [
        'name' => 'string',
        'applies_to' => 'string',
        'is_inclusive' => 'boolean',
        'valid_from' => 'date',
        'valid_to' => 'date',
        'rate' => 'decimal',
        'reverse_charge' => 'boolean',
        'is_active' => 'boolean',
        'country_code' => 'string',
        'code' => 'string',
        'description' => 'string',
        'slug' => 'string',
    ];
}
