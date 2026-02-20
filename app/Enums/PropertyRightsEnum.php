<?php

namespace App\Enums;

enum PropertyRightsEnum: string
{
    case Patent = 'patent';
    case Marke = 'marke';
    case Designschutz = 'designschutz';
    case Keine = 'keine';

    public function label(): string
    {
        return match ($this) {
            self::Patent => 'Patent',
            self::Marke => 'Marke',
            self::Designschutz => 'Designschutz',
            self::Keine => 'Keine',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Patent => 'Rechtlicher Schutz einer Erfindung für einen bestimmten Zeitraum.',
            self::Marke => 'Schutz eines Namens, Logos oder Zeichens als Marke.',
            self::Designschutz => 'Schutz des äußeren Erscheinungsbildes eines Produkts.',
            self::Keine => 'Es bestehen derzeit keine eingetragenen Schutzrechte.',
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
