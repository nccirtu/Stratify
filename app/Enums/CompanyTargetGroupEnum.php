<?php

namespace App\Enums;

enum CompanyTargetGroupEnum: string
{
    case Startups = 'startups';
    case Kmu = 'kmu';
    case Mittelstand = 'mittelstand';
    case Konzerne = 'konzerne';

    public function label(): string
    {
        return match ($this) {
            self::Startups => 'Startups',
            self::Kmu => 'KMU',
            self::Mittelstand => 'Mittelstand',
            self::Konzerne => 'Konzerne / Großunternehmen',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Startups => 'Junge, wachstumsorientierte Unternehmen in der Aufbauphase.',
            self::Kmu => 'Kleine und mittlere Unternehmen mit begrenzter Mitarbeiteranzahl und regionaler oder nationaler Ausrichtung.',
            self::Mittelstand => 'Wirtschaftlich starke, häufig inhabergeführte Unternehmen mit stabiler Marktposition.',
            self::Konzerne => 'Große, oft international tätige Unternehmen mit komplexen Entscheidungsstrukturen.',
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
