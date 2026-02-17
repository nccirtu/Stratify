<?php

namespace App\Mail;

use App\Filament\Resources\BusinessPlanResource;
use App\Models\BusinessPlan;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BusinessPlanCompletedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public BusinessPlan $businessPlan,
        public int $sectionCount,
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "Ihr Businessplan \"{$this->businessPlan->name}\" ist fertig",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.business-plan-completed',
            with: [
                'businessPlanName' => $this->businessPlan->name,
                'sectionCount' => $this->sectionCount,
                'url' => BusinessPlanResource::getUrl('edit', ['record' => $this->businessPlan]),
            ],
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
