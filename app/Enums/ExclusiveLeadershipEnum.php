<?php

namespace App\Enums;

enum ExclusiveLeadershipEnum: string
{
    case Supplier = 'supplier';
    case RawMaterials = 'raw_materials';
    case Community = 'community';
    case Relationships = 'relationships';
    case Platforms = 'platforms';

    public function label(): string
    {
        return match ($this) {
            self::Supplier => 'Lieferanten',
            self::RawMaterials => 'Rohstoffe',
            self::Community => 'Community',
            self::Relationships => 'Partnerschaften',
            self::Platforms => 'Plattformen',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Supplier => 'Sie arbeiten mit besonderen oder bevorzugten Zulieferern.',
            self::RawMaterials => 'Sie verfügen über seltene oder besonders günstige Materialien.',
            self::Community => 'Sie haben Zugang zu einer festen Zielgruppe oder starken Nutzerbasis.',
            self::Relationships => 'Strategische Kooperationen verschaffen Ihnen Vorteile.',
            self::Platforms => 'Sie haben besondere Vertriebs- oder Marktzugänge (z. B. exklusive Plattform-Deals).',
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
