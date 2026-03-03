<?php

namespace App\Enums;

enum PaymentMethodsEnum: string
{
    case PayPal = 'paypal';
    case Kreditkarte = 'kreditkarte';
    case Sofortueberweisung = 'sofortueberweisung';
    case Klarna = 'klarna';
    case NochUnklar = 'noch_unklar';

    public function label(): string
    {
        return match ($this) {
            self::PayPal => 'PayPal',
            self::Kreditkarte => 'Kreditkarte',
            self::Sofortueberweisung => 'Sofortüberweisung',
            self::Klarna => 'Klarna',
            self::NochUnklar => 'Noch unklar',
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
