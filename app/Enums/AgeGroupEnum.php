<?php

namespace App\Enums;

enum AgeGroupEnum: string
{
    case Unter25 = 'unter_25';
    case Jahre25bis35 = '25_35';
    case Jahre36bis50 = '36_50';
    case Ab50 = '50_plus';

    public function label(): string
    {
        return match ($this) {
            self::Unter25 => 'Unter 25 Jahre',
            self::Jahre25bis35 => '25–35 Jahre',
            self::Jahre36bis50 => '36–50 Jahre',
            self::Ab50 => '50+ Jahre',
        };
    }

    public function getTooltip(): string
    {
        return match ($this) {
            self::Unter25 => 'Junge Erwachsene, digital affin, oft preissensibel.',
            self::Jahre25bis35 => 'Berufseinsteiger und Young Professionals mit Kaufkraft.',
            self::Jahre36bis50 => 'Etablierte Berufstätige mit hoher Kaufkraft und Markentreue.',
            self::Ab50 => 'Erfahrene Konsumenten mit Fokus auf Qualität und Verlässlichkeit.',
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
