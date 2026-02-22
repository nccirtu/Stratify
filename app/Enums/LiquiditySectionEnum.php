<?php

namespace App\Enums;

enum LiquiditySectionEnum: string
{
    case Income = 'income';
    case Investment = 'investment';
    case Operational = 'operational';
    case Financing = 'financing';

    public function label(): string
    {
        return match ($this) {
            self::Income => 'Einzahlungen',
            self::Investment => 'Investitionsausgaben',
            self::Operational => 'Betriebliche Kosten',
            self::Financing => 'Finanzierungen',
        };
    }
}
