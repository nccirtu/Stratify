<?php

namespace App\Ai\Agents;

use App\Models\BusinessPlan;
use Laravel\Ai\Attributes\MaxTokens;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Attributes\Temperature;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Promptable;
use Stringable;

#[Provider('gemini')]
#[Model('gemini-2.0-flash')]
#[MaxTokens(512)]
#[Temperature(0.2)]
class BusinessPlanCheckAgent implements Agent
{
    use Promptable;

    public function __construct(
        public BusinessPlan $businessPlan,
        public int $checkGroup,
        public string $checkKey,
        public string $checkLabel,
    ) {}

    public function instructions(): Stringable|string
    {
        $context = $this->buildContext();
        $question = $this->getCheckQuestion();

        return <<<PROMPT
Du bist ein erfahrener Business-Berater und überprüfst Businesspläne auf Konsistenz, Vollständigkeit und Plausibilität.

## Businessplan-Kontext
{$context}

## Aufgabe
Überprüfe folgenden Aspekt des Businessplans:
"{$question}"

## WICHTIG: Antwortformat
Antworte AUSSCHLIESSLICH mit folgendem JSON-Objekt (kein Markdown, kein Codeblock, nur reines JSON):
{"status":"success","result":"Deine Analyse auf Deutsch (2-3 Sätze)","score":8}

Bewertungsschema:
- "success" (score 7-10): Anforderung vollständig und überzeugend erfüllt
- "warning" (score 4-6): Teilweise erfüllt, Verbesserungen empfehlenswert
- "error" (score 1-3): Unvollständig, fehlend oder widersprüchlich
PROMPT;
    }

    public function getCheckQuestion(): string
    {
        return match ($this->checkKey) {
            // Group 1 – Grundlagen
            'grunddaten_vollstaendigkeit' => 'Sind alle grundlegenden Stammdaten vollständig ausgefüllt (Name, Beschreibung, Planungszeitraum)?',
            'unternehmensdaten_konsistenz' => 'Sind die Unternehmensdaten vollständig und konsistent (Firmenname, Adresse, Kontaktdaten, Branche)?',
            'planungszeitraum_plausibel' => 'Ist der gewählte Planungszeitraum für einen Businessplan sinnvoll und realistisch?',
            'geschaeftsidee_klarheit' => 'Ist die Geschäftsidee und das Tätigkeitsfeld klar und verständlich beschrieben?',
            // Group 2 – Strategie & Markt
            'usp_ueberzeugend' => 'Ist das Alleinstellungsmerkmal (USP) des Unternehmens klar, überzeugend und differenzierend gegenüber Wettbewerbern?',
            'produktbeschreibung_vollstaendig' => 'Sind die angebotenen Produkte oder Dienstleistungen vollständig und plausibel beschrieben?',
            'marktanalyse_plausibel' => 'Ist die Markt- und Wettbewerbssituation nachvollziehbar und realistisch beschrieben?',
            'zielgruppe_definiert' => 'Ist die Zielgruppe konkret und vollständig definiert (Alter, Lebenssituation, Entscheidungsverhalten)?',
            'vertriebskanaele_konsistent' => 'Sind die gewählten Vertriebskanäle konsistent mit der Zielgruppe und dem Angebot?',
            // Group 3 – Finanzen & Personal
            'einnahmen_realistisch' => 'Sind die geplanten Einnahmen realistisch und mit dem Geschäftsmodell konsistent?',
            'ausgaben_vollstaendig' => 'Sind die geplanten Ausgaben vollständig und plausibel im Verhältnis zum Geschäftsmodell?',
            'personalplanung_plausibel' => 'Ist die Personalplanung (Mitarbeiter, Gehälter) realistisch und zum Geschäftsmodell passend?',
            'finanzplanung_ausgeglichen' => 'Ist die Finanzplanung insgesamt ausgeglichen und weist der Plan auf Zahlungsfähigkeit hin?',
            'gesamtbewertung' => 'Wie ist der Businessplan insgesamt zu bewerten? Gibt es kritische Lücken oder besonders starke Bereiche?',
            // Group 4 – Vertrieb & Marketing
            'vertriebsstrategie_plausibel' => 'Ist die gewählte Vertriebsstrategie (Kundenakquise, Vertriebskanäle, Verantwortlichkeiten) plausibel und zum Geschäftsmodell passend?',
            'marketingkanaele_konsistent' => 'Sind die gewählten Marketingkanäle und -maßnahmen konsistent mit der Zielgruppe, dem Angebot und dem Budget?',
            'marketingbudget_realistisch' => 'Ist das geplante Marketingbudget realistisch im Verhältnis zu den Einnahmezielen und der gewählten Strategie?',
            default => "Überprüfe den Aspekt: {$this->checkLabel}",
        };
    }

    protected function buildContext(): string
    {
        $bp = $this->businessPlan;
        $context = [];

        $context[] = '**Name:** '.($bp->name ?? 'Nicht angegeben');

        if ($bp->description) {
            $context[] = "**Beschreibung:** {$bp->description}";
        }

        if ($bp->company_name) {
            $context[] = "**Firmenname:** {$bp->company_name}";
        }

        if ($bp->company_description) {
            $context[] = "**Unternehmensbeschreibung:** {$bp->company_description}";
        }

        if ($bp->branch) {
            $context[] = "**Branche:** {$bp->branch->name}";
        }

        if ($bp->period_from && $bp->period_until) {
            $context[] = "**Planungszeitraum:** {$bp->period_from->format('d.m.Y')} bis {$bp->period_until->format('d.m.Y')}";
        }

        if ($bp->businessplan_target) {
            $context[] = "**Ziel des Businessplans:** {$bp->businessplan_target}";
        }

        if ($bp->business_activities) {
            $context[] = "**Geschäftstätigkeiten:** {$bp->business_activities}";
        }

        if ($bp->customer_problems) {
            $context[] = "**Kundenprobleme:** {$bp->customer_problems}";
        }

        if ($bp->usp_text) {
            $context[] = "**USP-Beschreibung:** {$bp->usp_text}";
        }

        if ($bp->usp && is_array($bp->usp)) {
            $context[] = '**USP-Kategorien:** '.implode(', ', $bp->usp);
        }

        if ($bp->pricing_stategie) {
            $context[] = "**Preisstrategie:** {$bp->pricing_stategie}";
        }

        if ($bp->target_market) {
            $context[] = "**Zielmarkt:** {$bp->target_market}";
        }

        if ($bp->age_group) {
            $context[] = "**Altersgruppe:** {$bp->age_group}";
        }

        if ($bp->life_situation) {
            $context[] = "**Lebenssituation:** {$bp->life_situation}";
        }

        if ($bp->channels && is_array($bp->channels)) {
            $context[] = '**Vertriebskanäle:** '.implode(', ', $bp->channels);
        }

        // Step 13 – Kundenakquise & Vertrieb
        if ($bp->acquiring_customers && is_array($bp->acquiring_customers)) {
            $context[] = '**Kundenakquise-Kanäle:** '.implode(', ', $bp->acquiring_customers);
        }

        if ($bp->acquiring_customers_online_shop && is_array($bp->acquiring_customers_online_shop)) {
            $context[] = '**Online-Shop Infrastruktur:** '.implode(', ', $bp->acquiring_customers_online_shop);
        }

        if ($bp->acquiring_customers_create_online_shop) {
            $context[] = "**Online-Shop Erstellung geplant via:** {$bp->acquiring_customers_create_online_shop}";
        }

        if ($bp->payment_methods && is_array($bp->payment_methods)) {
            $context[] = '**Zahlungsmethoden:** '.implode(', ', $bp->payment_methods);
        }

        if ($bp->shipping_organization) {
            $context[] = "**Versandorganisation:** {$bp->shipping_organization}";
        }

        if ($bp->direct_sales_responsibility && is_array($bp->direct_sales_responsibility)) {
            $context[] = '**Direktvertrieb-Verantwortliche:** '.implode(', ', $bp->direct_sales_responsibility);
        }

        if ($bp->existing_sales_structure && is_array($bp->existing_sales_structure)) {
            $context[] = '**Vorhandene Vertriebsstruktur:** '.implode(', ', $bp->existing_sales_structure);
        }

        if ($bp->direct_sales_staff_count) {
            $context[] = "**Direktvertrieb-Mitarbeiter:** {$bp->direct_sales_staff_count}";
        }

        if ($bp->sales_compensation_model) {
            $context[] = "**Vergütungsmodell Vertrieb:** {$bp->sales_compensation_model}";
        }

        if ($bp->plan_crm_introduction) {
            $context[] = "**CRM-Einführung geplant:** {$bp->plan_crm_introduction}";
        }

        if ($bp->field_service_infrastructure && is_array($bp->field_service_infrastructure)) {
            $context[] = '**Außendienst-Infrastruktur:** '.implode(', ', $bp->field_service_infrastructure);
        }

        if ($bp->field_service_staff_planned_count) {
            $context[] = "**Außendienstmitarbeiter geplant:** {$bp->field_service_staff_planned_count}";
        }

        // Step 14 – Marketing
        if ($bp->marketing_channels && is_array($bp->marketing_channels)) {
            $context[] = '**Marketingkanäle:** '.implode(', ', $bp->marketing_channels);
        }

        if ($bp->social_ads_platforms && is_array($bp->social_ads_platforms)) {
            $context[] = '**Social Ads Plattformen:** '.implode(', ', $bp->social_ads_platforms);
        }

        if ($bp->marketing_experience) {
            $context[] = "**Marketingerfahrung:** {$bp->marketing_experience}";
        }

        if ($bp->marketing_responsibility && is_array($bp->marketing_responsibility)) {
            $context[] = '**Marketing-Verantwortliche:** '.implode(', ', $bp->marketing_responsibility);
        }

        if ($bp->marketing_infrastructure && is_array($bp->marketing_infrastructure)) {
            $context[] = '**Marketing-Infrastruktur:** '.implode(', ', $bp->marketing_infrastructure);
        }

        if ($bp->marketing_budget_monthly) {
            $context[] = "**Monatliches Marketingbudget:** {$bp->marketing_budget_monthly}";
        }

        if ($bp->address || $bp->city) {
            $address = implode(', ', array_filter([$bp->address, $bp->zip_code, $bp->city, $bp->country]));
            $context[] = "**Adresse:** {$address}";
        }

        // Financial summary
        $incomeCount = $bp->transactions?->where('type', 'income')->count() ?? 0;
        $expenseCount = $bp->transactions?->where('type', 'expense')->count() ?? 0;
        $employeeCount = $bp->employees?->count() ?? 0;
        $loanCount = $bp->loans?->count() ?? 0;

        if ($incomeCount > 0 || $expenseCount > 0) {
            $context[] = "**Finanzplanung:** {$incomeCount} Einnahmenpositionen, {$expenseCount} Ausgabenpositionen";
        }

        if ($employeeCount > 0) {
            $context[] = "**Personal:** {$employeeCount} Mitarbeiterpositionen geplant";
        }

        if ($loanCount > 0) {
            $context[] = "**Darlehen:** {$loanCount} Darlehen geplant";
        }

        return implode("\n", $context) ?: 'Noch keine Daten vorhanden.';
    }
}
