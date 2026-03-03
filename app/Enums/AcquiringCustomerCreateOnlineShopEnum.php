<?php

namespace App\Enums;

enum AcquiringCustomerCreateOnlineShopEnum: string
{
    case SelbstBaukasten = 'selbst_baukasten';
    case Freelancer = 'freelancer';
    case Agentur = 'agentur';

    public function label(): string
    {
        return match ($this) {
            self::SelbstBaukasten => 'Selbst (Baukasten)',
            self::Freelancer => 'Freelancer',
            self::Agentur => 'Agentur',
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
