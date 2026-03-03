<?php

namespace App\Enums;

enum ExistingSalesStructureEnum: string
{
    case VertriebsleitfadenVorhanden = 'vertriebsleitfaden_vorhanden';
    case KundendatenbankVorhanden = 'kundendatenbank_vorhanden';
    case CrmSystemEingerichtet = 'crm_system_eingerichtet';
    case AngebotsvorlagenVorhanden = 'angebotsvorlagen_vorhanden';
    case VerguetungsmodellDefiniert = 'verguetungsmodell_definiert';
    case GeschultesPersonalVerfuegbar = 'geschultes_personal_verfuegbar';
    case NochKeineStruktur = 'noch_keine_struktur';

    public function label(): string
    {
        return match ($this) {
            self::VertriebsleitfadenVorhanden => 'Vertriebsleitfaden / Skript vorhanden',
            self::KundendatenbankVorhanden => 'Kundendatenbank vorhanden',
            self::CrmSystemEingerichtet => 'CRM-System eingerichtet',
            self::AngebotsvorlagenVorhanden => 'Angebots- & Vertragsvorlagen vorhanden',
            self::VerguetungsmodellDefiniert => 'Vergütungsmodell definiert',
            self::GeschultesPersonalVerfuegbar => 'Geschultes Personal verfügbar',
            self::NochKeineStruktur => 'Noch keine Vertriebsstruktur vorhanden',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::VerguetungsmodellDefiniert => 'Relevant, wenn Mitarbeiter oder externe Vertriebsagentur eingesetzt werden',
            self::GeschultesPersonalVerfuegbar => 'Relevant, wenn Mitarbeiter oder externe Vertriebsagentur eingesetzt werden',
            self::NochKeineStruktur => 'Relevant, wenn Mitarbeiter oder externe Vertriebsagentur eingesetzt werden',
            default => '',
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
