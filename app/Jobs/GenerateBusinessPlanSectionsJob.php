<?php

namespace App\Jobs;

use App\Enums\GenerationStatusEnum;
use App\Filament\Resources\BusinessPlanResource;
use App\Mail\BusinessPlanCompletedMail;
use App\Models\BusinessPlan;
use App\Services\BusinessPlanSectionGenerator;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;
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
            'generation_status' => GenerationStatusEnum::GENERATING,
            'generation_started_at' => now(),
        ]);

        $user = $this->businessPlan->user;

        Notification::make()
            ->title('Businessplan wird erstellt')
            ->body("Ihr Businessplan \"{$this->businessPlan->name}\" wird gerade mit KI generiert. Dies kann einige Minuten dauern.")
            ->icon('heroicon-o-sparkles')
            ->warning()
            ->sendToDatabase($user);

        try {
            $generator = new BusinessPlanSectionGenerator($this->businessPlan);
            $generatedSections = $generator->generateAllSections();
            $totalCost = $generator->getTotalCost();

            $this->businessPlan->update([
                'generation_status' => GenerationStatusEnum::COMPLETED,
                'generation_completed_at' => now(),
                'generation_cost' => $totalCost,
            ]);

            Notification::make()
                ->title('Businessplan fertiggestellt')
                ->body("Ihr Businessplan \"{$this->businessPlan->name}\" wurde erfolgreich erstellt. ".count($generatedSections).' Abschnitte wurden generiert.')
                ->icon('heroicon-o-check-circle')
                ->success()
                ->actions([
                    Action::make('view')
                        ->label('Ansehen')
                        ->url(BusinessPlanResource::getUrl('edit', ['record' => $this->businessPlan]))
                        ->markAsRead(),
                ])
                ->sendToDatabase($user);

            Mail::to($user)->send(new BusinessPlanCompletedMail(
                businessPlan: $this->businessPlan,
                sectionCount: count($generatedSections),
            ));

        } catch (Throwable $e) {
            $this->businessPlan->update([
                'generation_status' => GenerationStatusEnum::FAILED,
                'generation_completed_at' => now(),
                'generation_error' => $e->getMessage(),
            ]);

            Notification::make()
                ->title('Fehler bei Businessplan-Generierung')
                ->body("Bei der Erstellung Ihres Businessplans \"{$this->businessPlan->name}\" ist ein Fehler aufgetreten.")
                ->icon('heroicon-o-exclamation-circle')
                ->danger()
                ->sendToDatabase($user);

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

        Notification::make()
            ->title('Fehler bei Businessplan-Generierung')
            ->body("Bei der Erstellung Ihres Businessplans \"{$this->businessPlan->name}\" ist ein Fehler aufgetreten.")
            ->icon('heroicon-o-exclamation-circle')
            ->danger()
            ->sendToDatabase($this->businessPlan->user);
    }
}
