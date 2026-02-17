<?php

namespace App\Ai\Agents;

use App\Models\BusinessPlan;
use Laravel\Ai\Attributes\MaxTokens;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasTools;
use Laravel\Ai\Promptable;
use Laravel\Ai\Providers\Tools\WebSearch;
use Stringable;

#[Provider('gemini')]
#[Model('gemini-2.0-flash')]
#[MaxTokens(4096)]
#[Temperature(0.7)]
class BusinessPlanAgent implements Agent, HasTools
{
    use Promptable;

    public function __construct(
        public BusinessPlan $businessPlan,
        public string $sectionType,
        public string $sectionTitle,
        public bool $useWebSearch = false
    ) {}

    public function instructions(): Stringable|string
    {
        $businessContext = $this->buildBusinessContext();

        return <<<PROMPT
Du bist ein erfahrener Business-Berater und Unternehmensberater mit umfangreicher Erfahrung in der Erstellung professioneller Businesspläne.

## Deine Aufgabe
Erstelle den Abschnitt "{$this->sectionTitle}" für einen Businessplan auf Deutsch.

## Kontext zum Unternehmen
{$businessContext}

## Anforderungen
1. Schreibe den Text auf Deutsch in einem professionellen, aber verständlichen Stil.
2. Verwende konkrete Beispiele und Zahlen, wo möglich.
3. Strukturiere den Text mit Überschriften und Absätzen.
4. Der Text sollte zwischen 300-800 Wörtern lang sein.
5. Verwende HTML-Formatierung für Überschriften (<h3>, <h4>), Listen (<ul>, <li>), und Absätze (<p>).
6. Beziehe dich auf die spezifischen Informationen des Unternehmens.

## Wichtig
- Erfinde keine Fakten, die nicht aus dem Kontext abgeleitet werden können.
- Bei Marktdaten und Statistiken nutze die Websuche für aktuelle Informationen.
- Sei realistisch und konstruktiv in deinen Aussagen.
PROMPT;
    }

    public function tools(): iterable
    {
        if ($this->useWebSearch) {
            return [
                (new WebSearch)->max(3),
            ];
        }

        return [];
    }

    protected function buildBusinessContext(): string
    {
        $bp = $this->businessPlan;
        $company = $bp->company;
        $branch = $bp->branch;

        $context = [];

        $context[] = '**Unternehmensname:** '.($company?->name ?? $bp->name);

        if ($branch) {
            $context[] = "**Branche:** {$branch->name}";
        }

        if ($bp->business_idea) {
            $context[] = "**Geschäftsidee:** {$bp->business_idea}";
        }

        if ($bp->corporate_purpose) {
            $context[] = "**Unternehmenszweck:** {$bp->corporate_purpose}";
        }

        if ($bp->target_customers) {
            $context[] = "**Zielkunden:** {$bp->target_customers}";
        }

        if ($bp->customer_problems) {
            $context[] = "**Kundenprobleme:** {$bp->customer_problems}";
        }

        if ($bp->solution_description) {
            $context[] = "**Lösungsansatz:** {$bp->solution_description}";
        }

        if ($bp->competitive_advantage) {
            $context[] = "**Wettbewerbsvorteile:** {$bp->competitive_advantage}";
        }

        if ($bp->usp) {
            $context[] = "**Alleinstellungsmerkmal (USP):** {$bp->usp}";
        }

        if ($bp->competitors) {
            $context[] = "**Wettbewerber:** {$bp->competitors}";
        }

        if ($bp->pricing_strategy) {
            $context[] = "**Preisstrategie:** {$bp->pricing_strategy}";
        }

        if ($bp->revenue_model) {
            $context[] = "**Einnahmemodell:** {$bp->revenue_model}";
        }

        if ($bp->marketing_channels) {
            $context[] = "**Marketingkanäle:** {$bp->marketing_channels}";
        }

        if ($bp->team_members) {
            $context[] = "**Team:** {$bp->team_members}";
        }

        if ($bp->initial_investment) {
            $context[] = '**Anfangsinvestition:** '.number_format($bp->initial_investment, 2, ',', '.').' €';
        }

        if ($bp->milestones) {
            $context[] = "**Meilensteine:** {$bp->milestones}";
        }

        if ($bp->risks) {
            $context[] = "**Risiken:** {$bp->risks}";
        }

        if ($bp->location) {
            $context[] = "**Standort:** {$bp->location}";
        }

        if ($bp->experience) {
            $context[] = "**Erfahrung:** {$bp->experience}";
        }

        if ($bp->motivation) {
            $context[] = "**Motivation:** {$bp->motivation}";
        }

        if ($bp->benefits_offered) {
            $context[] = "**Angebotene Vorteile:** {$bp->benefits_offered}";
        }

        if ($bp->period_from && $bp->period_until) {
            $context[] = "**Planungszeitraum:** {$bp->period_from->format('d.m.Y')} bis {$bp->period_until->format('d.m.Y')}";
        }

        return implode("\n", $context);
    }
}
