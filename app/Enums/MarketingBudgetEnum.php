<?php

namespace App\Enums;

enum MarketingBudgetEnum: string
{
    case UnterFuenfhundert = 'unter_500';
    case FuenfhundertBisZweitausend = '500_bis_2000';
    case ZweitausendBisZehntausend = '2000_bis_10000';
    case UeberZehntausend = 'ueber_10000';

    public function label(): string
    {
        return match ($this) {
            self::UnterFuenfhundert => '< 500 €',
            self::FuenfhundertBisZweitausend => '500–2.000 €',
            self::ZweitausendBisZehntausend => '2.000–10.000 €',
            self::UeberZehntausend => '> 10.000 €',
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
