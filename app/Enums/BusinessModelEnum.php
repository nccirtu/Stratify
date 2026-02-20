<?php

namespace App\Enums;

enum BusinessModelEnum: string
{
    case ProductSales = 'product_sales';
    case Services = 'services';
    case Marketplace = 'marketplace';
    case AboModel = 'abo_model';
    case LicenseModel = 'license_model';
    case Franchise = 'franchise';

    public function label(): string
    {
        return match ($this) {
            self::ProductSales => 'Produktverkauf',
            self::Services => 'Dienstleistung',
            self::Marketplace => 'Plattform/Marktplatz',
            self::AboModel => 'Abo-Modell',
            self::LicenseModel => 'Lizenzmodell',
            self::Franchise => 'Franchise',
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
