<?php

namespace App\Enums;

enum MarketingInfrastructureEnum: string
{
    case Website = 'website';
    case Crm = 'crm';
    case NewsletterSystem = 'newsletter_system';
    case TrackingEingerichtet = 'tracking_eingerichtet';
    case NichtsVorhanden = 'nichts_vorhanden';

    public function label(): string
    {
        return match ($this) {
            self::Website => 'Website',
            self::Crm => 'CRM',
            self::NewsletterSystem => 'Newsletter-System',
            self::TrackingEingerichtet => 'Tracking eingerichtet',
            self::NichtsVorhanden => 'Nichts vorhanden',
        };
    }

    public function getTooltip(): string
    {
        return '';
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label(), 'tooltip' => $case->getTooltip()],
            self::cases()
        );
    }
}
