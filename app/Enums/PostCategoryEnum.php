<?php

namespace App\Enums;

enum PostCategoryEnum: string
{
    case STARTUPS = 'startups';
    case FUNDING = 'funding';
    case STRATEGY = 'strategy';
    case MARKETING = 'marketing';
    case TECHNOLOGY = 'technology';
    case LEGAL = 'legal';
    case MINDSET = 'mindset';
    case NETWORKING = 'networking';
    case LEADERSHIP = 'leadership';
    case SALES = 'sales';
    case GROWTH = 'growth';
    case CASE_STUDIES = 'case-studies';
    case LESSONS = 'lessons';
    case LIFESTYLE = 'lifestyle';
    case GUIDES = 'guides';

    public static function label(): array
    {
        return [
            self::STARTUPS->value => __('Gründung & Geschäftsideen'),
            self::FUNDING->value => __('Finanzierung & Fördermittel'),
            self::STRATEGY->value => __('Businessplanung & Strategie'),
            self::MARKETING->value => __('Marketing & Branding'),
            self::TECHNOLOGY->value => __('Digitalisierung & Tools'),
            self::LEGAL->value => __('⚖Recht, Steuern & Bürokratie'),
            self::MINDSET->value => __('Mindset, Motivation & Produktivität'),
            self::NETWORKING->value => __('Networking & Kooperationen'),
            self::LEADERSHIP->value => __('Teamaufbau & Führung'),
            self::SALES->value => __('Vertrieb & Kundenakquise'),
            self::GROWTH->value => __('Skalierung & Wachstum'),
            self::CASE_STUDIES->value => __('Praxisbeispiele & Erfolgsstories'),
            self::LESSONS->value => __('Fehler vermeiden & Learnings'),
            self::LIFESTYLE->value => __('Selbstständigkeit im Alltag'),
            self::GUIDES->value => __('Wissen, Guides & How-tos'),
        ];
    }

    public static function colors(): array
    {
        return [
            self::STARTUPS->value => 'bg-blue-100 text-blue-800',
            self::FUNDING->value => 'bg-green-100 text-green-800',
            self::STRATEGY->value => 'bg-yellow-100 text-yellow-800',
            self::MARKETING->value => 'bg-pink-100 text-pink-800',
            self::TECHNOLOGY->value => 'bg-purple-100 text-purple-800',
            self::LEGAL->value => 'bg-gray-100 text-gray-800',
            self::MINDSET->value => 'bg-red-100 text-red-800',
            self::NETWORKING->value => 'bg-indigo-100 text-indigo-800',
            self::LEADERSHIP->value => 'bg-teal-100 text-teal-800',
            self::SALES->value => 'bg-orange-100 text-orange-800',
            self::GROWTH->value => 'bg-cyan-100 text-cyan-800',
            self::CASE_STUDIES->value => 'bg-lime-100 text-lime-800',
            self::LESSONS->value => 'bg-violet-100 text-violet-800',
            self::LIFESTYLE->value => 'bg-fuchsia-100 text-fuchsia-800',
            self::GUIDES->value => 'bg-slate-100 text-slate-800',
        ];
    }
}
