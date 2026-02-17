<?php

namespace App\Notifications;

use App\Filament\Resources\BusinessPlanResource;
use App\Models\BusinessPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BusinessPlanGenerationFailed extends Notification
{
    use Queueable;

    public function __construct(
        public BusinessPlan $businessPlan,
        public string $errorMessage = ''
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = BusinessPlanResource::getUrl('edit', ['record' => $this->businessPlan]);

        return (new MailMessage)
            ->subject('Fehler bei der Businessplan-Generierung')
            ->greeting("Hallo {$notifiable->name}!")
            ->line("Bei der Erstellung Ihres Businessplans \"{$this->businessPlan->name}\" ist leider ein Fehler aufgetreten.")
            ->line("Fehler: {$this->errorMessage}")
            ->action('Businessplan bearbeiten', $url)
            ->line('Bitte versuchen Sie es erneut oder kontaktieren Sie unseren Support.');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'Fehler bei Businessplan-Generierung',
            'body' => "Bei der Erstellung Ihres Businessplans \"{$this->businessPlan->name}\" ist ein Fehler aufgetreten: {$this->errorMessage}",
            'business_plan_id' => $this->businessPlan->id,
            'icon' => 'heroicon-o-exclamation-circle',
            'color' => 'danger',
        ];
    }
}
