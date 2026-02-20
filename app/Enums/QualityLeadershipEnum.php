<?php

namespace App\Enums;

enum QualityLeadershipEnum: string
{
    case Certification = 'certification';
    case Reference = 'reference';
    case TestSeal = 'test_seal';
    case ExpertStatus = 'expert_status';

    public function label(): string
    {
        return match ($this) {
            self::Certification => 'Zertifizierungen',
            self::Reference => 'Referenzen',
            self::TestSeal => 'Testsiegel',
            self::ExpertStatus => 'Expertenstatus',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Certification => 'Offizielle Qualitätsnachweise oder geprüfte Standards.',
            self::Reference => 'Positive Rückmeldungen oder bekannte Kunden, die für Ihre Qualität sprechen.',
            self::TestSeal => 'Auszeichnungen oder Prüfsiegel von unabhängigen Stellen.',
            self::ExpertStatus => 'Anerkennung als Spezialist oder Fachautorität in Ihrem Bereich.',
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
