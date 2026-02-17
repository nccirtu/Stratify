<?php

namespace App\Services;

use App\Ai\Agents\BusinessPlanAgent;
use App\Models\BusinessPlan;
use App\Models\BusinessPlanSection;

class BusinessPlanSectionGenerator
{
    protected const MAX_COST_EUR = 2.0;

    protected array $sections = [
        ['type' => 'executive_summary', 'title' => 'Zusammenfassung', 'order' => 1, 'web_search' => false],
        ['type' => 'swot_analysis', 'title' => 'SWOT-Analyse', 'order' => 2, 'web_search' => false],
        ['type' => 'business_model', 'title' => 'Geschäftsmodell', 'order' => 3, 'web_search' => false],
        ['type' => 'viability_analysis', 'title' => 'Machbarkeitsanalyse', 'order' => 4, 'web_search' => true],
        ['type' => 'industry_overview', 'title' => 'Branchenübersicht', 'order' => 5, 'web_search' => true],
        ['type' => 'target_audience', 'title' => 'Zielgruppe', 'order' => 6, 'web_search' => false],
        ['type' => 'market_size_trends', 'title' => 'Marktgröße & Trends', 'order' => 7, 'web_search' => true],
        ['type' => 'competitor_analysis', 'title' => 'Wettbewerbsanalyse', 'order' => 8, 'web_search' => true],
        ['type' => 'core_offerings', 'title' => 'Kernangebot', 'order' => 9, 'web_search' => false],
        ['type' => 'expansion_opportunities', 'title' => 'Expansionsmöglichkeiten', 'order' => 10, 'web_search' => true],
        ['type' => 'secondary_offerings', 'title' => 'Zusatzangebote', 'order' => 11, 'web_search' => false],
        ['type' => 'customer_service', 'title' => 'Kundenservice', 'order' => 12, 'web_search' => false],
        ['type' => 'marketing_overview', 'title' => 'Marketingübersicht', 'order' => 13, 'web_search' => false],
        ['type' => 'branding_identity', 'title' => 'Marke & Identität', 'order' => 14, 'web_search' => false],
        ['type' => 'customer_retention', 'title' => 'Kundenbindung', 'order' => 15, 'web_search' => false],
        ['type' => 'social_media', 'title' => 'Social Media', 'order' => 16, 'web_search' => false],
        ['type' => 'seo_content', 'title' => 'SEO-Inhalte', 'order' => 17, 'web_search' => false],
        ['type' => 'digital_marketing', 'title' => 'Digitales Marketing', 'order' => 18, 'web_search' => false],
        ['type' => 'community_engagement', 'title' => 'Community-Engagement', 'order' => 19, 'web_search' => false],
        ['type' => 'revenue', 'title' => 'Einnahmen', 'order' => 20, 'web_search' => false],
        ['type' => 'expenses', 'title' => 'Ausgaben', 'order' => 21, 'web_search' => false],
        ['type' => 'financing', 'title' => 'Finanzierung', 'order' => 22, 'web_search' => false],
        ['type' => 'dividends', 'title' => 'Dividenden', 'order' => 23, 'web_search' => false],
        ['type' => 'taxes', 'title' => 'Steuern', 'order' => 24, 'web_search' => false],
        ['type' => 'profit_loss', 'title' => 'Gewinn & Verlust', 'order' => 25, 'web_search' => false],
        ['type' => 'balance_sheet', 'title' => 'Bilanz', 'order' => 26, 'web_search' => false],
        ['type' => 'funding_plan', 'title' => 'Finanzierungsplan', 'order' => 27, 'web_search' => false],
        ['type' => 'team_roles', 'title' => 'Team & Rollen', 'order' => 28, 'web_search' => false],
        ['type' => 'operations_plan', 'title' => 'Betriebsplan', 'order' => 29, 'web_search' => false],
        ['type' => 'risk_analysis', 'title' => 'Risikoanalyse', 'order' => 30, 'web_search' => false],
        ['type' => 'pre_launch', 'title' => 'Vor dem Start', 'order' => 31, 'web_search' => false],
        ['type' => 'post_launch', 'title' => 'Nach dem Start', 'order' => 32, 'web_search' => false],
        ['type' => 'five_year_plan', 'title' => '5-Jahres-Plan', 'order' => 33, 'web_search' => false],
    ];

    protected float $totalCost = 0.0;

    public function __construct(
        protected BusinessPlan $businessPlan
    ) {}

    public function generateAllSections(): array
    {
        $generatedSections = [];
        $this->totalCost = 0.0;

        foreach ($this->sections as $sectionConfig) {
            if ($this->totalCost >= self::MAX_COST_EUR) {
                break;
            }

            $section = $this->generateSection(
                $sectionConfig['type'],
                $sectionConfig['title'],
                $sectionConfig['order'],
                $sectionConfig['web_search']
            );

            if ($section) {
                $generatedSections[] = $section;
            }
        }

        return $generatedSections;
    }

    public function generateSection(
        string $sectionType,
        string $title,
        int $order,
        bool $useWebSearch = false
    ): ?BusinessPlanSection {
        if ($this->totalCost >= self::MAX_COST_EUR) {
            return null;
        }

        $agent = new BusinessPlanAgent(
            businessPlan: $this->businessPlan,
            sectionType: $sectionType,
            sectionTitle: $title,
            useWebSearch: $useWebSearch
        );

        $prompt = $this->buildSectionPrompt($sectionType, $title);

        try {
            $response = $agent->prompt($prompt);
            $text = $response->text;

            $this->totalCost += $this->estimateCost($response);

            return $this->businessPlan->businessPlanSections()->updateOrCreate(
                [
                    'section_type' => $sectionType,
                ],
                [
                    'title' => $title,
                    'text' => $text,
                    'order_index' => $order,
                    'ai_generated' => true,
                    'generation_prompt' => $prompt,
                    'is_active' => true,
                ]
            );
        } catch (\Exception $e) {
            report($e);

            return null;
        }
    }

    protected function buildSectionPrompt(string $sectionType, string $title): string
    {
        $prompts = [
            'executive_summary' => 'Erstelle eine prägnante Zusammenfassung des gesamten Businessplans. Fasse die wichtigsten Punkte zusammen: Geschäftsidee, Zielmarkt, Wettbewerbsvorteile, Finanzprognosen und Team.',
            'swot_analysis' => 'Führe eine detaillierte SWOT-Analyse durch: Stärken (Strengths), Schwächen (Weaknesses), Chancen (Opportunities) und Risiken (Threats) des Unternehmens.',
            'business_model' => 'Beschreibe das Geschäftsmodell im Detail: Wie wird Wert geschaffen, wie werden Kunden erreicht und wie wird Geld verdient?',
            'viability_analysis' => 'Analysiere die Machbarkeit des Geschäftskonzepts. Berücksichtige Marktpotenzial, technische Umsetzbarkeit und finanzielle Realisierbarkeit.',
            'industry_overview' => 'Gib einen umfassenden Überblick über die Branche: aktuelle Trends, Marktgröße, Wachstumsprognosen und wichtige Akteure.',
            'target_audience' => 'Beschreibe die Zielgruppe detailliert: Demografie, Psychografie, Bedürfnisse, Kaufverhalten und wie das Unternehmen diese anspricht.',
            'market_size_trends' => 'Analysiere Marktgröße und Trends: TAM, SAM, SOM, Wachstumsraten und zukünftige Entwicklungen.',
            'competitor_analysis' => 'Führe eine detaillierte Wettbewerbsanalyse durch: Hauptkonkurrenten, deren Stärken/Schwächen, Marktpositionierung und Differenzierungsmöglichkeiten.',
            'core_offerings' => 'Beschreibe das Kernangebot: Hauptprodukte oder -dienstleistungen, deren Nutzen und wie sie Kundenprobleme lösen.',
            'expansion_opportunities' => 'Identifiziere Expansionsmöglichkeiten: neue Märkte, Produkterweiterungen, geografische Expansion und strategische Partnerschaften.',
            'secondary_offerings' => 'Beschreibe Zusatzangebote und ergänzende Produkte/Dienstleistungen, die das Hauptangebot unterstützen.',
            'customer_service' => 'Erläutere die Kundenservice-Strategie: Support-Kanäle, Service-Level, Beschwerdemanagement und Kundenzufriedenheit.',
            'marketing_overview' => 'Gib einen Überblick über die Marketingstrategie: Positionierung, Botschaften, Kanäle und Budget.',
            'branding_identity' => 'Beschreibe Marke und Identität: Markenwerte, visuelles Erscheinungsbild, Tonalität und Markenversprechen.',
            'customer_retention' => 'Erläutere Strategien zur Kundenbindung: Loyalty-Programme, Wiederholungskäufe und langfristige Kundenbeziehungen.',
            'social_media' => 'Beschreibe die Social-Media-Strategie: Plattformen, Content-Typen, Posting-Frequenz und Engagement-Strategien.',
            'seo_content' => 'Erläutere die SEO- und Content-Strategie: Keywords, Content-Typen, Optimierungsmaßnahmen und organisches Wachstum.',
            'digital_marketing' => 'Beschreibe die digitale Marketingstrategie: Paid Advertising, E-Mail-Marketing, Performance-Marketing und Conversion-Optimierung.',
            'community_engagement' => 'Erläutere Community-Engagement-Strategien: Aufbau einer Community, Events, User-Generated-Content und Markenbotschafter.',
            'revenue' => 'Analysiere die Einnahmenstruktur: Einnahmequellen, Preismodelle, prognostizierte Umsätze und Wachstumspotenzial.',
            'expenses' => 'Beschreibe die Kostenstruktur: Fixkosten, variable Kosten, Investitionen und Kostenoptimierungsmöglichkeiten.',
            'financing' => 'Erläutere Finanzierungsoptionen: Eigenkapital, Fremdkapital, Fördermittel und Investorensuche.',
            'dividends' => 'Beschreibe die Dividendenpolitik: Ausschüttungsstrategie, Gewinnverwendung und Rücklagenbildung.',
            'taxes' => 'Analysiere steuerliche Aspekte: relevante Steuerarten, Steueroptimierung und steuerliche Pflichten.',
            'profit_loss' => 'Erstelle eine Gewinn- und Verlustprognose: erwartete Einnahmen, Kosten und Gewinnentwicklung über mehrere Jahre.',
            'balance_sheet' => 'Beschreibe die erwartete Bilanzstruktur: Aktiva, Passiva und wichtige Bilanzkennzahlen.',
            'funding_plan' => 'Erläutere den Finanzierungsplan: Kapitalbedarf, Finanzierungsrunden und Mittelverwendung.',
            'team_roles' => 'Beschreibe das Team: Schlüsselpersonen, Kompetenzen, Rollen und offene Positionen.',
            'operations_plan' => 'Erläutere den Betriebsplan: Prozesse, Lieferkette, Qualitätssicherung und operative Meilensteine.',
            'risk_analysis' => 'Führe eine Risikoanalyse durch: identifizierte Risiken, Eintrittswahrscheinlichkeit, Auswirkungen und Gegenmaßnahmen.',
            'pre_launch' => 'Beschreibe die Pre-Launch-Phase: Vorbereitungen, Tests, Marketing-Vorbereitung und Meilensteine vor dem Start.',
            'post_launch' => 'Erläutere die Post-Launch-Strategie: erste 90 Tage, Kundenakquise, Feedback-Sammlung und Anpassungen.',
            'five_year_plan' => 'Erstelle einen 5-Jahres-Plan: Wachstumsziele, Meilensteine, strategische Initiativen und Vision für die Zukunft.',
        ];

        return $prompts[$sectionType] ?? "Erstelle den Abschnitt '{$title}' für diesen Businessplan.";
    }

    protected function estimateCost($response): float
    {
        $inputTokens = $response->usage->promptTokens ?? 0;
        $outputTokens = $response->usage->completionTokens ?? 0;

        // Gemini 2.0 Flash pricing
        $inputCostPer1M = 0.075;
        $outputCostPer1M = 0.30;

        return ($inputTokens / 1_000_000 * $inputCostPer1M) +
               ($outputTokens / 1_000_000 * $outputCostPer1M);
    }

    public function getTotalCost(): float
    {
        return $this->totalCost;
    }

    public function getSections(): array
    {
        return $this->sections;
    }

    public function getSectionCount(): int
    {
        return count($this->sections);
    }
}
