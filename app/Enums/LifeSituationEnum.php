<?php

namespace App\Enums;

enum LifeSituationEnum: string
{
    case Studierend = 'studierend';
    case Berufstaetig = 'berufstaetig';
    case Fuehrungskraft = 'fuehrungskraft';
    case Familie = 'familie';
    case Ruhestand = 'ruhestand';

    public function label(): string
    {
        return match ($this) {
            self::Studierend => 'Studierend / Berufseinsteiger',
            self::Berufstaetig => 'Berufstätig',
            self::Fuehrungskraft => 'Führungskraft / Selbständig',
            self::Familie => 'Familie mit Kinder',
            self::Ruhestand => 'Ruhestand',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Studierend => 'Personen am Beginn ihrer Berufskarriere mit begrenztem Budget.',
            self::Berufstaetig => 'Aktiv erwerbstätige Personen im mittleren Lebensabschnitt.',
            self::Fuehrungskraft => 'Entscheidungsträger mit hoher Kaufkraft und wenig Zeit.',
            self::Familie => 'Eltern mit Kindern, familiäre Bedürfnisse im Vordergrund.',
            self::Ruhestand => 'Personen im Rentenalter mit Zeit und stabilen Einkünften.',
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
