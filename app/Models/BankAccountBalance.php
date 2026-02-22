<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BankAccountBalance extends Model
{
    protected $guarded = [];

    public function casts(): array
    {
        return [
            'balance' => 'decimal:2',
            'month' => 'integer',
            'year' => 'integer',
            'bank_account_id' => 'integer',
        ];
    }

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }
}
