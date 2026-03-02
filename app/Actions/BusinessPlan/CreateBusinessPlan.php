<?php

namespace App\Actions\BusinessPlan;

use App\Models\BusinessPlan;
use Illuminate\Support\Facades\Auth;

class CreateBusinessPlan
{
    public function handle(array $data): BusinessPlan
    {
        $userId = Auth::id();
        $data['slug'] = $this->resolveUniqueSlug($data['slug'], $userId);

        return BusinessPlan::create(array_merge($data, [
            'user_id' => $userId,
            'status' => 'draft',
        ]));
    }

    private function resolveUniqueSlug(string $slug, int $userId): string
    {
        $base = $slug;
        $counter = 2;

        while (BusinessPlan::where('user_id', $userId)->where('slug', $slug)->exists()) {
            $slug = $base.'-'.$counter++;
        }

        return $slug;
    }
}
