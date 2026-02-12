<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tax extends Model
{
    protected $guarded = [];

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

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
