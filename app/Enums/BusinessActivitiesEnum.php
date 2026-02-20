<?php

namespace App\Enums;

enum BusinessActivitiesEnum: string
{
    case NoRevenue = 'no_revenue';
    case FirstSales = 'first_sales';
    case PilotCustomer = 'pilot_customer';

    public function label(): string
    {
        return match ($this) {
            self::NoRevenue => 'Noch keine Umsätze',
            self::FirstSales => 'Erste Umsätze',
            self::PilotCustomer => 'Pilotkunden vorhanden',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
