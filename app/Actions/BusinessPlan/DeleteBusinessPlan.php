<?php

namespace App\Actions\BusinessPlan;

use App\Models\BusinessPlan;

class DeleteBusinessPlan
{
    public function handle(BusinessPlan $businessPlan): bool
    {
        return $businessPlan->delete();
    }
}
