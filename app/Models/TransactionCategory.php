<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionCategory extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'string',
        'slug' => 'string',
        'is_active' => 'boolean',
        'description' => 'string',
        'type' => 'string',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
