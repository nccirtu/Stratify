<?php

namespace App\Notifications;

use App\Models\BusinessPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class BusinessPlanGenerationStarted extends Notification
{
    use Queueable;

    public function __construct(
        public BusinessPlan $businessPlan
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase(object $notifiable): array
    {
        return [
            'title' => 'Businessplan wird erstellt',
            'body' => "Ihr Businessplan \"{$this->businessPlan->name}\" wird gerade mit KI generiert. Dies kann einige Minuten dauern.",
            'business_plan_id' => $this->businessPlan->id,
            'icon' => 'heroicon-o-sparkles',
            'color' => 'warning',
        ];
    }
}
