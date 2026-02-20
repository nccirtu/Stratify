<?php

namespace App\Enums;

enum TargetMarketEnum: string
{
    case Wachsend = 'wachsend';
    case Reif = 'reif';
    case Schrumpfend = 'schrumpfend';
    case Neu = 'neu';

    public function label(): string
    {
        return match ($this) {
            self::Wachsend => 'Wachsender Markt',
            self::Reif => 'Reifer Markt',
            self::Schrumpfend => 'Schrumpfender Markt',
            self::Neu => 'Neuer Markt',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Wachsend => 'Die Nachfrage steigt kontinuierlich, neue Kunden kommen hinzu und das Marktvolumen nimmt zu.',
            self::Reif => 'Der Markt ist etabliert und stabil, wächst jedoch nur noch langsam oder stagniert.',
            self::Schrumpfend => 'Die Nachfrage nimmt ab, Anbieter verlassen den Markt oder Umsätze gehen zurück.',
            self::Neu => 'Der Markt entsteht gerade erst oder existiert in dieser Form noch kaum.',
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
