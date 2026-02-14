<?php

namespace App\Actions\BusinessPlan;

use App\Models\BusinessPlan;

class UpsertBusinessPlanStepThree
{
    public function handle(BusinessPlan $businessPlan, array $data): BusinessPlan
    {
        $businessPlan->update($data);

        return $businessPlan;
    }
}
