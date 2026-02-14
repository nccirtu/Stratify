<?php

namespace App\Actions\BusinessPlan;

use App\Models\BusinessPlan;
use Illuminate\Support\Facades\Auth;

class UpsertBusinessPlanStepOne
{
    public function handle(array $data, ?BusinessPlan $businessPlan = null): BusinessPlan
    {
        if ($businessPlan) {
            $businessPlan->update($data);

            return $businessPlan;
        }

        return BusinessPlan::create(array_merge($data, [
            'user_id' => Auth::id(),
        ]));
    }
}
