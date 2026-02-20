<?php

namespace App\Enums;

enum ClientTypeEnum: string
{
    case B2B = 'b2b';
    case B2C = 'b2c';
    case D2C = 'd2c';
    case B2G = 'b2g';

    public function label(): string
    {
        return match ($this) {
            self::B2B => 'B2B (Business-to-Business)',
            self::B2C => 'B2C (Business-to-Customer)',
            self::D2C => 'D2C (Direct-to-Customer)',
            self::B2G => 'B2G (Business-to-Government)',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::B2B => 'Ihre Kunden sind Unternehmen oder Organisationen.',
            self::B2C => 'Sie verkaufen direkt an Endverbraucher oder Privatkunden.',
            self::D2C => 'Sie verkaufen ohne Zwischenhändler direkt an Endkunden (z. B. Onlineshop).',
            self::B2G => 'Sie arbeiten mit öffentlichen Einrichtungen oder staatlichen Institutionen zusammen.',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label(), 'tooltip' => $case->getTooltip()],
            self::cases()
        );
    }
}
