<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $guarded = [
    ];

    protected $casts = [
        'name' => 'string',
        'code' => 'string',
        'symbol' => 'string',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
