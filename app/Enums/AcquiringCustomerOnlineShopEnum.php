<?php

namespace App\Enums;

enum AcquiringCustomerOnlineShopEnum: string
{
    case DomainRegistriert = 'domain_registriert';
    case ShopSystemEingerichtet = 'shop_system_eingerichtet';
    case ZahlungsanbieterAngebunden = 'zahlungsanbieter_angebunden';
    case RechtstexteIntegriert = 'rechtstexte_integriert';
    case TrackingEingerichtet = 'tracking_eingerichtet';
    case SeoGrundoptimierung = 'seo_grundoptimierung';
    case ProduktdatenGepflegt = 'produktdaten_gepflegt';
    case VersandstrukturDefiniert = 'versandstruktur_definiert';
    case KundenserviceProzessDefiniert = 'kundenservice_prozess_definiert';
    case NochNichtsVorhanden = 'noch_nichts_vorhanden';

    public function label(): string
    {
        return match ($this) {
            self::DomainRegistriert => 'Domain registriert',
            self::ShopSystemEingerichtet => 'Website / Shop-System technisch eingerichtet',
            self::ZahlungsanbieterAngebunden => 'Zahlungsanbieter (z. B. Stripe, PayPal) angebunden',
            self::RechtstexteIntegriert => 'Rechtstexte (AGB, Datenschutz, Impressum) integriert',
            self::TrackingEingerichtet => 'Tracking & Analyse (z. B. Google Analytics) eingerichtet',
            self::SeoGrundoptimierung => 'SEO-Grundoptimierung erfolgt',
            self::ProduktdatenGepflegt => 'Produktdaten vollständig gepflegt',
            self::VersandstrukturDefiniert => 'Versand- und Logistikstruktur definiert',
            self::KundenserviceProzessDefiniert => 'Kundenservice-Prozess definiert',
            self::NochNichtsVorhanden => 'Noch nichts vorhanden',
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
