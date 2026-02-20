<?php

namespace App\Enums;

enum ChannelsEnum: string
{
    case EigenerOnlineShop = 'eigener_online_shop';
    case SocialMedia = 'social_media';
    case EigeneApp = 'eigene_app';
    case Direktvertrieb = 'direktvertrieb';
    case PopUpStores = 'popup_stores';

    public function label(): string
    {
        return match ($this) {
            self::EigenerOnlineShop => 'Eigener Online-Shop',
            self::SocialMedia => 'Social-Media (z. B. Instagram/TikTok Shop)',
            self::EigeneApp => 'Eigene App',
            self::Direktvertrieb => 'Direktvertrieb (z. B. Außendienst)',
            self::PopUpStores => 'Pop-Up-Stores / Events',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::EigenerOnlineShop => 'Verkauf über einen eigenen Web-Shop ohne Plattform-Abhängigkeit.',
            self::SocialMedia => 'Direkter Verkauf über Social-Media-Plattformen mit Shop-Funktion.',
            self::EigeneApp => 'Vertrieb über eine eigens entwickelte Smartphone-App.',
            self::Direktvertrieb => 'Persönlicher Verkauf durch den Außendienst oder Verkaufsgespräche.',
            self::PopUpStores => 'Temporäre Verkaufsflächen oder Messeauftritte für direkten Kundenkontakt.',
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
