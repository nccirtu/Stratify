<?php

namespace App\Enums;

enum PublicTenderEnum: string
{
    case JaRegelmaessig = 'ja_regelmaessig';
    case Teilweise = 'teilweise';
    case Nein = 'nein';

    public function label(): string
    {
        return match ($this) {
            self::JaRegelmaessig => 'Ja, regelmäßig',
            self::Teilweise => 'Teilweise',
            self::Nein => 'Nein',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::JaRegelmaessig => 'Aufträge werden überwiegend über öffentliche Ausschreibungen vergeben.',
            self::Teilweise => 'Manche Aufträge laufen über Ausschreibungen, andere werden direkt vergeben.',
            self::Nein => 'Aufträge werden nicht über öffentliche Ausschreibungen vergeben.',
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
