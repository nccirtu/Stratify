<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branches extends Model
{
    protected $fillable = [
        'company_id',
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
      'company_id' => 'integer',
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

    public function company(): HasMany
    {
        return $this->belongsTo(Company::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
