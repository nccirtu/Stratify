<?php

namespace App\Enums;

enum ScalableCapabilityEnum: string
{
    case Local = 'local';
    case National = 'national';
    case International = 'international';
    case Digital = 'digital';

    public function label(): string
    {
        return match ($this) {
            self::Local => 'Lokal begrenzt',
            self::National => 'National skalierbar',
            self::International => 'International skalierbar',
            self::Digital => 'Digital global',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Local => 'Ihr Modell ist auf eine bestimmte Region oder Stadt begrenzt.',
            self::National => 'Ihr Modell lässt sich auf das gesamte Land ausweiten.',
            self::International => 'Ihr Modell kann auch im Ausland erfolgreich eingesetzt werden.',
            self::Digital => 'Ihr Modell ist ortsunabhängig und weltweit skalierbar.',
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
