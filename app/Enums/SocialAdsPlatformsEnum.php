<?php

namespace App\Enums;

enum SocialAdsPlatformsEnum: string
{
    case Meta = 'meta';
    case TikTok = 'tiktok';
    case LinkedIn = 'linkedin';
    case Pinterest = 'pinterest';
    case X = 'x';

    public function label(): string
    {
        return match ($this) {
            self::Meta => 'Meta (Facebook/Instagram)',
            self::TikTok => 'TikTok',
            self::LinkedIn => 'LinkedIn',
            self::Pinterest => 'Pinterest',
            self::X => 'X (Twitter)',
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
