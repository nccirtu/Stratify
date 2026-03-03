<?php

namespace App\Enums;

enum MarketingChannelsEnum: string
{
    case Seo = 'seo';
    case GoogleAds = 'google_ads';
    case SocialAds = 'social_ads';
    case Influencer = 'influencer';
    case Pr = 'pr';
    case Events = 'events';
    case Kaltakquise = 'kaltakquise';
    case Newsletter = 'newsletter';
    case ContentMarketing = 'content_marketing';

    public function label(): string
    {
        return match ($this) {
            self::Seo => 'SEO',
            self::GoogleAds => 'Google Ads',
            self::SocialAds => 'Social Ads',
            self::Influencer => 'Influencer',
            self::Pr => 'PR',
            self::Events => 'Events',
            self::Kaltakquise => 'Kaltakquise',
            self::Newsletter => 'Newsletter',
            self::ContentMarketing => 'Content-Marketing',
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
