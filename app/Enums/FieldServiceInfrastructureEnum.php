<?php

namespace App\Enums;

enum FieldServiceInfrastructureEnum: string
{
    case AussendienstmitarbeiterEingestellt = 'aussendienstmitarbeiter_eingestellt';
    case FahrzeugeVorhanden = 'fahrzeuge_vorhanden';
    case ReisekostenbudgetGeplant = 'reisekostenbudget_geplant';
    case CrmSystemMobilNutzbar = 'crm_system_mobil_nutzbar';
    case VertragsunterlagenVorbereitet = 'vertragsunterlagen_vorbereitet';
    case VertriebszieleDefiniert = 'vertriebsziele_definiert';
    case NochNichtsVorhanden = 'noch_nichts_vorhanden';

    public function label(): string
    {
        return match ($this) {
            self::AussendienstmitarbeiterEingestellt => 'Außendienstmitarbeiter eingestellt',
            self::FahrzeugeVorhanden => 'Fahrzeuge vorhanden',
            self::ReisekostenbudgetGeplant => 'Reisekostenbudget geplant',
            self::CrmSystemMobilNutzbar => 'CRM-System mobil nutzbar',
            self::VertragsunterlagenVorbereitet => 'Vertrags- & Angebotsunterlagen vorbereitet',
            self::VertriebszieleDefiniert => 'Vertriebsziele definiert',
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
