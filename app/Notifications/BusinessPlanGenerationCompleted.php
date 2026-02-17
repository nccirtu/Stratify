<?php

namespace App\Notifications;

use App\Filament\Resources\BusinessPlanResource;
use App\Models\BusinessPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class BusinessPlanGenerationCompleted extends Notification
{
    use Queueable;

    public function __construct(
        public BusinessPlan $businessPlan,
        public int $sectionsGenerated = 0
    ) {}

    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $url = BusinessPlanResource::getUrl('edit', ['record' => $this->businessPlan]);

        return (new MailMessage)
            ->subject('Ihr Businessplan ist fertig!')
            ->greeting("Hallo {$notifiable->name}!")
            ->line("Ihr Businessplan \"{$this->businessPlan->name}\" wurde erfolgreich erstellt.")
            ->line("{$this->sectionsGenerated} Abschnitte wurden mit KI generiert.")
            ->action('Businessplan ansehen', $url)
            ->line('Vielen Dank, dass Sie unsere Anwendung nutzen!');
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'Businessplan fertiggestellt',
            'body' => "Ihr Businessplan \"{$this->businessPlan->name}\" wurde erfolgreich erstellt. {$this->sectionsGenerated} Abschnitte wurden generiert.",
            'business_plan_id' => $this->businessPlan->id,
            'icon' => 'heroicon-o-check-circle',
            'color' => 'success',
            'actions' => [
                [
                    'name' => 'view',
                    'label' => 'Ansehen',
                    'url' => BusinessPlanResource::getUrl('edit', ['record' => $this->businessPlan]),
                ],
            ],
        ];
    }
}
