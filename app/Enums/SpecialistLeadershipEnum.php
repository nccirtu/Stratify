<?php

namespace App\Enums;

enum SpecialistLeadershipEnum: string
{
    case Niche = 'niche';
    case Branch = 'branch';
    case Region = 'region';
    case CustomerSegment = 'customer_segment';

    public function label(): string
    {
        return match ($this) {
            self::Niche => 'Nische',
            self::Branch => 'Branche',
            self::Region => 'Region',
            self::CustomerSegment => 'Kundensegment',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Niche => 'Ein sehr spezielles Marktsegment mit wenig Wettbewerb.',
            self::Branch => 'Sie bedienen gezielt eine bestimmte Industrie oder Wirtschaftsbranche.',
            self::Region => 'Sie sind auf ein bestimmtes geografisches Gebiet spezialisiert.',
            self::CustomerSegment => 'Sie richten sich an eine klar definierte Kundengruppe (z. B. Startups, Senioren, KMU).',
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
