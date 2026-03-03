<?php

namespace App\Enums;

enum SalesCompensationModelEnum: string
{
    case Fixgehalt = 'fixgehalt';
    case Provision = 'provision';
    case Kombination = 'kombination';

    public function label(): string
    {
        return match ($this) {
            self::Fixgehalt => 'Fixgehalt',
            self::Provision => 'Provision',
            self::Kombination => 'Kombination',
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
