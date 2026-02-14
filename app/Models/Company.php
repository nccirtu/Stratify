<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'user_id' => 'integer',
        'is_active' => 'boolean',
        'slug' => 'string',
        'name' => 'string',
        'description' => 'string',
        'address' => 'string',
        'zip_code' => 'string',
        'city' => 'string',
        'state' => 'string',
        'country' => 'string',
        'email' => 'string',
        'phone' => 'string',
        'website' => 'string',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function branches(): HasMany
    {
        return $this->hasMany(Branches::class);
    }
}
