<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    protected $fillable = [
        'user_id',
        'is_active',
        'slug',
        'name',
        'description',
        'address',
        'zip_code',
        'city',
        'state',
        'country',
        'email',
        'phone',
        'website',
    ];


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
