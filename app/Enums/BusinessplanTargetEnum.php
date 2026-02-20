<?php

namespace App\Enums;

enum BusinessplanTargetEnum: string
{
    case Financial = 'financial';
    case Investorengewinnung = 'investorengewinnung';
    case Credit = 'credit';
    case InternStrategy = 'intern_strategy';
    case Funding = 'funding';

    public function label(): string
    {
        return match ($this) {
            self::Financial => 'Finanzierung',
            self::Investorengewinnung => 'Investorengewinnung',
            self::Credit => 'Bankdarlehen',
            self::InternStrategy => 'Interne Strategie',
            self::Funding => 'Fördermittel',
        };
    }

    public static function options(): array
    {
        return array_map(
            fn (self $case) => ['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
