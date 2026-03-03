<?php

namespace App\Enums;

enum DirectSalesResponsibilityEnum: string
{
    case Gruender = 'gruender';
    case Mitarbeiter = 'mitarbeiter';
    case ExterneVertriebsagentur = 'externe_vertriebsagentur';

    public function label(): string
    {
        return match ($this) {
            self::Gruender => 'Gründer',
            self::Mitarbeiter => 'Mitarbeiter',
            self::ExterneVertriebsagentur => 'Externe Vertriebsagentur',
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
