<?php

namespace App\Enums;

enum InovationLevelEnum: string
{
    case Classic = 'classic';
    case BetterVersion = 'better_version';
    case DisruptivModel = 'disruptiv_model';
    case TechInnovation = 'tech_innovation';

    public function label(): string
    {
        return match ($this) {
            self::Classic => 'Klassisches Geschäftsmodell',
            self::BetterVersion => 'Verbesserte Version bestehender Lösung',
            self::DisruptivModel => 'Disruptives Modell',
            self::TechInnovation => 'Technologische Innovation',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Classic => 'Ein bekanntes Geschäftsmodell, das es so oder ähnlich schon gibt – z. B. ein Café, eine Agentur oder ein Handwerksbetrieb.',
            self::BetterVersion => 'Es gibt das Angebot bereits am Markt, aber Sie machen es besser – zum Beispiel schneller, günstiger oder einfacher für Kunden.',
            self::DisruptivModel => 'Ihr Geschäftsmodell stellt den Markt auf den Kopf und verändert, wie Dinge bisher gemacht wurden.',
            self::TechInnovation => 'Ihr Unternehmen basiert auf einer neuen oder deutlich verbesserten Technologie, die es so bisher noch nicht gab.',
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
