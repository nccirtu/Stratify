<?php

namespace App\Enums;

enum DevelopmentStateEnum: string
{
    case Idee = 'idee';
    case Prototyp = 'prototyp';
    case Mvp = 'mvp';
    case Marktreif = 'marktreif';
    case BereitsAmMarkt = 'bereits_am_markt';

    public function label(): string
    {
        return match ($this) {
            self::Idee => 'Idee',
            self::Prototyp => 'Prototyp',
            self::Mvp => 'MVP',
            self::Marktreif => 'Marktreif',
            self::BereitsAmMarkt => 'Bereits am Markt',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Idee => 'Das Angebot existiert noch als Konzept und wurde noch nicht umgesetzt.',
            self::Prototyp => 'Es gibt einen ersten funktionsfähigen Entwurf, der noch nicht marktreif ist.',
            self::Mvp => 'Ein Minimum Viable Product mit den wichtigsten Kernfunktionen wurde entwickelt.',
            self::Marktreif => 'Das Angebot ist vollständig entwickelt und bereit für den Markt.',
            self::BereitsAmMarkt => 'Das Angebot wird aktiv verkauft und hat zahlende Kunden.',
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
