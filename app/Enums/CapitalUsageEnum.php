<?php

namespace App\Enums;

enum CapitalUsageEnum: string
{
    case ProductDevelopment = 'product_development';
    case Employees = 'employees';
    case Marketing = 'marketing';
    case OperatingResources = 'operating_resources';
    case Growth = 'growth';
    case Reorientation = 'reorientation';
    case EfficiencyImprovement = 'efficiency_improvement';
    case Internationalization = 'internationalization';

    public function label(): string
    {
        return match ($this) {
            self::ProductDevelopment => 'Produktentwicklung',
            self::Employees => 'Personal',
            self::Marketing => 'Marketing',
            self::OperatingResources => 'Betriebsmittel',
            self::Growth => 'Wachstum',
            self::Reorientation => 'Neuausrichtung',
            self::EfficiencyImprovement => 'Effizienzsteigerung',
            self::Internationalization => 'Internationalisierung',
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
