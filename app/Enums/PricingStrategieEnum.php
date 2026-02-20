<?php

namespace App\Enums;

enum PricingStrategieEnum: string
{
    case Premium = 'premium';
    case Mittelpreis = 'mittelpreis';
    case Discount = 'discount';
    case Freemium = 'freemium';
    case Nutzungsbasiert = 'nutzungsbasiert';
    case Subscription = 'subscription';

    public function label(): string
    {
        return match ($this) {
            self::Premium => 'Premium',
            self::Mittelpreis => 'Mittelpreis',
            self::Discount => 'Discount',
            self::Freemium => 'Freemium',
            self::Nutzungsbasiert => 'Nutzungsbasiert',
            self::Subscription => 'Subscription',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Premium => 'Hohe Preise für exklusive Qualität oder Marke.',
            self::Mittelpreis => 'Ausgewogenes Preis-Leistungs-Verhältnis im mittleren Segment.',
            self::Discount => 'Besonders günstige Preise als zentrales Verkaufsargument.',
            self::Freemium => 'Basisversion kostenlos, erweiterte Funktionen kostenpflichtig.',
            self::Nutzungsbasiert => 'Abrechnung nach tatsächlichem Verbrauch oder Nutzung.',
            self::Subscription => 'Regelmäßige Zahlung (z. B. monatlich) für dauerhaften Zugang.',
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
