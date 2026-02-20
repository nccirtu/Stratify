<?php

namespace App\Enums;

enum CommunityLeadershipEnum: string
{
    case UnderThousand = 'under_thousand';
    case ThousandToTenThousand = 'thousand_to_ten_thousand';
    case TenToHundredThousand = 'ten_to_hundred_thousand';
    case OverHundredThousand = 'over_hundred_thousand';

    public function label(): string
    {
        return match ($this) {
            self::UnderThousand => 'Unter 1.000 Follower',
            self::ThousandToTenThousand => '1.000–10.000 Follower',
            self::TenToHundredThousand => '10.000–100.000 Follower',
            self::OverHundredThousand => 'Über 100.000 Follower',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::UnderThousand => 'Erste kleine Community vorhanden.',
            self::ThousandToTenThousand => 'Wachsende und aktive Zielgruppe.',
            self::TenToHundredThousand => 'Starke Sichtbarkeit im Markt.',
            self::OverHundredThousand => 'Große Reichweite mit erheblichem Marketingpotenzial.',
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
