<?php

namespace App\Enums;

enum MarketingResponsibilityEnum: string
{
    case Gruender = 'gruender';
    case Mitarbeiter = 'mitarbeiter';
    case Agentur = 'agentur';
    case Freelancer = 'freelancer';

    public function label(): string
    {
        return match ($this) {
            self::Gruender => 'Gründer',
            self::Mitarbeiter => 'Mitarbeiter',
            self::Agentur => 'Agentur',
            self::Freelancer => 'Freelancer',
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
