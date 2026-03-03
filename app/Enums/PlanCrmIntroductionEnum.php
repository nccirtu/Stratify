<?php

namespace App\Enums;

enum PlanCrmIntroductionEnum: string
{
    case Ja = 'ja';
    case Nein = 'nein';
    case NochUnklar = 'noch_unklar';

    public function label(): string
    {
        return match ($this) {
            self::Ja => 'Ja',
            self::Nein => 'Nein',
            self::NochUnklar => 'Noch unklar',
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
