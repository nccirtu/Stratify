<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'is_active',
        'description',
        'type',
    ];

    protected $casts = [
      'name' => 'string',
      'slug' => 'string',
      'is_active' => 'boolean',
      'description' => 'string',
      'type' => 'string',
    ];
}
