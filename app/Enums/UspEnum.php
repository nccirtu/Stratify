<?php

namespace App\Enums;

enum UspEnum: string
{
    case PriceLeadership = 'price_leadership';
    case QualityLeadership = 'quality_leadership';
    case SpecialistLeadership = 'specialist_leadership';
    case TechnologyLeadership = 'technology_leadership';
    case ExclusiveLeadership = 'exclusive_leadership';
    case CommunityLeadership = 'community_leadership';

    public function label(): string
    {
        return match ($this) {
            self::PriceLeadership => 'Preisführerschaft',
            self::QualityLeadership => 'Qualitätsführerschaft',
            self::SpecialistLeadership => 'Spezialisierung',
            self::TechnologyLeadership => 'Technologievorsprung',
            self::ExclusiveLeadership => 'Exklusiver Zugang',
            self::CommunityLeadership => 'Marke/Community',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::PriceLeadership => 'Sie bieten Ihr Produkt oder Ihre Dienstleistung günstiger an als Ihre Wettbewerber.',
            self::QualityLeadership => 'Sie bieten eine besonders hohe Qualität, die über dem Marktdurchschnitt liegt.',
            self::SpecialistLeadership => 'Sie konzentrieren sich bewusst auf einen bestimmten Bereich oder eine klar definierte Zielgruppe.',
            self::TechnologyLeadership => 'Sie verfügen über eine technische Lösung, die moderner oder leistungsfähiger ist als die der Konkurrenz.',
            self::ExclusiveLeadership => 'Sie haben Zugang zu Ressourcen oder Partnern, die andere nicht oder nur schwer bekommen.',
            self::CommunityLeadership => 'Ihr Unternehmen besitzt bereits eine erkennbare Marke oder eine treue Anhängerschaft.',
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
