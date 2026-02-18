<?php

namespace App\Actions\BusinessPlan;

use App\Models\BusinessPlan;
use Illuminate\Support\Facades\Auth;

class CreateBusinessPlan
{
    public function handle(array $data): BusinessPlan
    {
        return BusinessPlan::create(array_merge($data, [
            'user_id' => Auth::id(),
            'status' => 'draft',
        ]));
    }
}
