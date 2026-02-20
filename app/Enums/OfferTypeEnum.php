<?php

namespace App\Enums;

enum OfferTypeEnum: string
{
    case PhysischesProdukt = 'physisches_produkt';
    case DigitaleSoftware = 'digitale_software';
    case MobileApp = 'mobile_app';
    case Beratung = 'beratung';
    case ServiceVorOrt = 'service_vor_ort';
    case OnlineService = 'online_service';

    public function label(): string
    {
        return match ($this) {
            self::PhysischesProdukt => 'Physisches Produkt',
            self::DigitaleSoftware => 'Digitale Software',
            self::MobileApp => 'Mobile App',
            self::Beratung => 'Beratung',
            self::ServiceVorOrt => 'Service vor Ort',
            self::OnlineService => 'Online-Service',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::PhysischesProdukt => 'Ein greifbares Produkt, das produziert, gelagert und versandt wird.',
            self::DigitaleSoftware => 'Eine Software, die digital vertrieben und genutzt wird.',
            self::MobileApp => 'Eine Anwendung für Smartphones oder Tablets.',
            self::Beratung => 'Wissensbasierte Dienstleistung durch persönliche oder digitale Beratung.',
            self::ServiceVorOrt => 'Dienstleistung, die direkt beim Kunden vor Ort erbracht wird.',
            self::OnlineService => 'Dienstleistung, die vollständig digital und ortsunabhängig angeboten wird.',
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
