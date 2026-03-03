<?php

namespace App\Jobs;

use App\Enums\GenerationStatusEnum;
use App\Enums\StatusEnum;
use App\Models\BusinessPlan;
use App\Notifications\BusinessPlanGenerationCompleted;
use App\Notifications\BusinessPlanGenerationFailed;
use App\Notifications\BusinessPlanGenerationStarted;
use App\Services\BusinessPlanSectionGenerator;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Throwable;

class GenerateBusinessPlanSectionsJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 600;

    public function __construct(
        public BusinessPlan $businessPlan
    ) {}

    public function handle(): void
    {
        $this->businessPlan->update([
            'status' => StatusEnum::IN_PROGRESS,
            'generation_status' => GenerationStatusEnum::GENERATING,
            'generation_started_at' => now(),
        ]);

        $user = $this->businessPlan->user;
        $user->notify(new BusinessPlanGenerationStarted($this->businessPlan));

        try {
            $generator = new BusinessPlanSectionGenerator($this->businessPlan);
            $generatedSections = $generator->generateAllSections();
            $totalCost = $generator->getTotalCost();

            $this->businessPlan->update([
                'status' => StatusEnum::COMPLETED,
                'generation_status' => GenerationStatusEnum::COMPLETED,
                'generation_completed_at' => now(),
                'generation_cost' => $totalCost,
            ]);

            $user->notify(new BusinessPlanGenerationCompleted(
                businessPlan: $this->businessPlan,
                sectionsGenerated: count($generatedSections),
            ));
        } catch (Throwable $e) {
            $this->businessPlan->update([
                'generation_status' => GenerationStatusEnum::FAILED,
                'generation_completed_at' => now(),
                'generation_error' => $e->getMessage(),
            ]);

            $user->notify(new BusinessPlanGenerationFailed(
                businessPlan: $this->businessPlan,
                errorMessage: $e->getMessage(),
            ));

            report($e);
        }
    }

    public function failed(Throwable $exception): void
    {
        $this->businessPlan->update([
            'generation_status' => GenerationStatusEnum::FAILED,
            'generation_completed_at' => now(),
            'generation_error' => $exception->getMessage(),
        ]);

        $this->businessPlan->user->notify(new BusinessPlanGenerationFailed(
            businessPlan: $this->businessPlan,
            errorMessage: $exception->getMessage(),
        ));
    }
}
