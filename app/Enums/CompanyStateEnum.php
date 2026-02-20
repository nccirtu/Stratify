<?php

namespace App\Enums;

enum CompanyStateEnum: string
{
    case New = 'new';
    case Existing = 'existing';
    case Succession = 'succession';

    public function label(): string
    {
        return match ($this) {
            self::New => 'Neugründung',
            self::Existing => 'Bestehendes Unternehmen',
            self::Succession => 'Unternehmensnachfolge',
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
