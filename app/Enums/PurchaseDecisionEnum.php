<?php

namespace App\Enums;

enum PurchaseDecisionEnum: string
{
    case Preis = 'preis';
    case Qualitaet = 'qualitaet';
    case Marke = 'marke';
    case Empfehlung = 'empfehlung';
    case Emotion = 'emotion';
    case Bequemlichkeit = 'bequemlichkeit';
    case Sicherheit = 'sicherheit';
    case Nachhaltigkeit = 'nachhaltigkeit';

    public function label(): string
    {
        return match ($this) {
            self::Preis => 'Preis',
            self::Qualitaet => 'Qualität',
            self::Marke => 'Marke',
            self::Empfehlung => 'Empfehlung',
            self::Emotion => 'Emotion',
            self::Bequemlichkeit => 'Bequemlichkeit',
            self::Sicherheit => 'Sicherheit',
            self::Nachhaltigkeit => 'Nachhaltigkeit',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Preis => 'Das Angebot wird primär wegen eines günstigen Preises gewählt.',
            self::Qualitaet => 'Die hohe Qualität ist der ausschlaggebende Kaufgrund.',
            self::Marke => 'Das Vertrauen in die Marke beeinflusst die Entscheidung maßgeblich.',
            self::Empfehlung => 'Weiterempfehlungen von Bekannten oder Experten sind entscheidend.',
            self::Emotion => 'Gefühle und persönliche Werte spielen die zentrale Rolle.',
            self::Bequemlichkeit => 'Einfachheit und Komfort sind die wichtigsten Kauftreiber.',
            self::Sicherheit => 'Vertrauen und Risikovermeidung stehen im Vordergrund.',
            self::Nachhaltigkeit => 'Ökologische oder soziale Verantwortung beeinflusst den Kauf.',
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
