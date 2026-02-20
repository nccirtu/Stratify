<?php

namespace App\Enums;

enum InformationTargetGroupEnum: string
{
    case Google = 'google';
    case SocialMedia = 'social_media';
    case Influencer = 'influencer';
    case Vergleichsportale = 'vergleichsportale';
    case Empfehlungen = 'empfehlungen';
    case Fachmedien = 'fachmedien';

    public function label(): string
    {
        return match ($this) {
            self::Google => 'Google / Suchmaschinen',
            self::SocialMedia => 'Social Media',
            self::Influencer => 'Influencer',
            self::Vergleichsportale => 'Vergleichsportale',
            self::Empfehlungen => 'Empfehlungen',
            self::Fachmedien => 'Fachmedien',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Google => 'Informationssuche über Suchmaschinen wie Google oder Bing.',
            self::SocialMedia => 'Entdeckung über Plattformen wie Instagram, LinkedIn oder TikTok.',
            self::Influencer => 'Empfehlungen durch Meinungsführer in der jeweiligen Nische.',
            self::Vergleichsportale => 'Preisvergleiche und Bewertungen auf Portalen wie Check24.',
            self::Empfehlungen => 'Mundpropaganda und persönliche Weiterempfehlungen.',
            self::Fachmedien => 'Branchen-Publikationen, Fachzeitschriften oder Newsletter.',
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
