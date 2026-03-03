<?php

namespace App\Enums;

enum MarketingExperienceEnum: string
{
    case Ja = 'ja';
    case Teilweise = 'teilweise';
    case Nein = 'nein';

    public function label(): string
    {
        return match ($this) {
            self::Ja => 'Ja',
            self::Teilweise => 'Teilweise',
            self::Nein => 'Nein',
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
