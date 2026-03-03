<?php

namespace App\Enums;

enum ShippingOrganizationEnum: string
{
    case EigenerVersand = 'eigener_versand';
    case FulfillmentDienstleister = 'fulfillment_dienstleister';
    case NochOffen = 'noch_offen';

    public function label(): string
    {
        return match ($this) {
            self::EigenerVersand => 'Eigener Versand',
            self::FulfillmentDienstleister => 'Fulfillment-Dienstleister',
            self::NochOffen => 'Noch offen',
        };
    }

    public function getTooltip(): string
    {
        return '';
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label(), 'tooltip' => $case->getTooltip()],
            self::cases()
        );
    }
}
