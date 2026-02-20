<?php

namespace App\Enums;

enum PriceLeadershipEnum: string
{
    case ScaleEffect = 'scale_effect';
    case Automation = 'automation';
    case DirectSales = 'direct_sales';
    case LowFixedCosts = 'low_fixed_costs';

    public function label(): string
    {
        return match ($this) {
            self::ScaleEffect => 'Skaleneffekte',
            self::Automation => 'Automatisierung',
            self::DirectSales => 'Direktvertrieb',
            self::LowFixedCosts => 'Niedrige Fixkosten',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::ScaleEffect => 'Sie produzieren oder verkaufen große Mengen und können dadurch Kosten sparen.',
            self::Automation => 'Sie nutzen Maschinen oder Software, um Prozesse günstiger und schneller zu machen.',
            self::DirectSales => 'Sie verkaufen ohne Zwischenhändler direkt an den Kunden.',
            self::LowFixedCosts => 'Ihre laufenden Kosten (z. B. Miete, Personal) sind besonders gering.',
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
