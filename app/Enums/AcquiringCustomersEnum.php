<?php

namespace App\Enums;

enum AcquiringCustomersEnum: string
{
    case OnlineShop = 'online_shop';
    case Direktvertrieb = 'direktvertrieb';
    case Aussendienst = 'aussendienst';
    case PartnerReseller = 'partner_reseller';
    case Plattformen = 'plattformen';
    case SocialMediaDirektverkauf = 'social_media_direktverkauf';
    case Beratungsgespraeche = 'beratungsgespraeche';
    case StationaeresGeschaeft = 'stationaeres_geschaeft';

    public function label(): string
    {
        return match ($this) {
            self::OnlineShop => 'Online-Shop (eigene Website)',
            self::Direktvertrieb => 'Direktvertrieb (telefonisch / persönlich)',
            self::Aussendienst => 'Außendienst',
            self::PartnerReseller => 'Partner / Reseller',
            self::Plattformen => 'Plattformen (Amazon, Etsy etc.)',
            self::SocialMediaDirektverkauf => 'Social Media Direktverkauf',
            self::Beratungsgespraeche => 'Beratungsgespräche / Terminmodell',
            self::StationaeresGeschaeft => 'Stationäres Geschäft',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::OnlineShop => 'Sie verkaufen über eine eigene Website – mit Warenkorb, Bezahlung und direkter Bestellung durch den Kunden',
            self::Direktvertrieb => 'Sie gewinnen Kunden aktiv durch persönliche Gespräche, Telefonate oder direkte Ansprache',
            self::Aussendienst => 'Mitarbeiter besuchen Kunden vor Ort, z. B. bei Unternehmen oder im Handel.',
            self::PartnerReseller => 'Andere Unternehmen verkaufen Ihr Produkt oder Ihre Dienstleistung für Sie weiter',
            self::Plattformen => 'Sie verkaufen über bestehende Online-Marktplätze und nutzen deren Reichweite.',
            self::SocialMediaDirektverkauf => 'Sie verkaufen direkt über soziale Netzwerke, z. B. über Instagram, TikTok oder Facebook',
            self::Beratungsgespraeche => 'Kunden buchen Gespräche oder Termine, bevor sie Ihr Angebot kaufen (z. B. Coaching, Agentur, Dienstleistung)',
            self::StationaeresGeschaeft => 'Sie verkaufen vor Ort in einem Laden, Büro oder einer Praxis',
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
