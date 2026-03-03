<?php

namespace App\Http\Controllers;

use App\Models\BusinessPlan;
use App\Models\BusinessPlanSection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BusinessPlanSectionController extends Controller
{
    public function store(Request $request, BusinessPlan $businessPlan): JsonResponse
    {
        abort_if($businessPlan->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'text' => ['nullable', 'string'],
        ]);

        $maxOrder = $businessPlan->businessPlanSections()->max('order_index') ?? 0;

        $section = $businessPlan->businessPlanSections()->create([
            'title' => $validated['title'],
            'text' => $validated['text'] ?? '',
            'order_index' => $maxOrder + 1,
            'is_active' => true,
            'ai_generated' => false,
            'section_type' => 'custom',
        ]);

        return response()->json(['section' => $section]);
    }

    public function update(Request $request, BusinessPlan $businessPlan, BusinessPlanSection $section): JsonResponse
    {
        abort_if($businessPlan->user_id !== auth()->id(), 403);

        $validated = $request->validate([
            'title' => ['sometimes', 'string', 'max:255'],
            'text' => ['sometimes', 'nullable', 'string'],
        ]);

        $section->update($validated);

        return response()->json(['section' => $section->fresh()]);
    }

    public function destroy(BusinessPlan $businessPlan, BusinessPlanSection $section): JsonResponse
    {
        abort_if($businessPlan->user_id !== auth()->id(), 403);
        abort_if($section->ai_generated, 403, 'KI-generierte Abschnitte können nicht gelöscht werden.');

        $section->delete();

        return response()->json(['success' => true]);
    }
}
