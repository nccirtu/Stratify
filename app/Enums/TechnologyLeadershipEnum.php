<?php

namespace App\Enums;

enum TechnologyLeadershipEnum: string
{
    case SelfDevelopment = 'self_development';
    case Patent = 'patent';
    case ProprietaryData = 'proprietary_data';
    case AiModels = 'ai_models';

    public function label(): string
    {
        return match ($this) {
            self::SelfDevelopment => 'Eigenentwicklung',
            self::Patent => 'Patent',
            self::ProprietaryData => 'Proprietäre Daten',
            self::AiModels => 'KI-Modelle',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::SelfDevelopment => 'Die Technologie wurde von Ihnen selbst entwickelt.',
            self::Patent => 'Ihre Technologie ist rechtlich geschützt.',
            self::ProprietaryData => 'Sie besitzen exklusive Daten, die andere nicht haben.',
            self::AiModels => 'Sie nutzen künstliche Intelligenz, die einen klaren Wettbewerbsvorteil schafft.',
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
