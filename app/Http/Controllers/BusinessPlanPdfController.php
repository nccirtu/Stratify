<?php

namespace App\Http\Controllers;

use App\Models\BusinessPlan;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Str;
use Illuminate\View\View;
use Spatie\Browsershot\Browsershot;

class BusinessPlanPdfController extends Controller
{
    public function show(Request $request, BusinessPlan $businessPlan): View
    {
        abort_unless(
            $businessPlan->user_id === auth()->id(),
            403,
            'Sie haben keinen Zugriff auf diesen Businessplan.'
        );

        $sections = $businessPlan->businessPlanSections()
            ->where('is_active', true)
            ->orderBy('order_index')
            ->get();

        $groupedSections = $this->groupSectionsByCategory($sections);

        return view('business-plan.pdf-book', [
            'businessPlan' => $businessPlan,
            'sections' => $sections,
            'groupedSections' => $groupedSections,
        ]);
    }

    public function download(Request $request, BusinessPlan $businessPlan): Response
    {
        abort_unless(
            $businessPlan->user_id === auth()->id(),
            403,
            'Sie haben keinen Zugriff auf diesen Businessplan.'
        );

        $sections = $businessPlan->businessPlanSections()
            ->where('is_active', true)
            ->orderBy('order_index')
            ->get();

        $groupedSections = $this->groupSectionsByCategory($sections);

        $html = view('business-plan.pdf-book', [
            'businessPlan' => $businessPlan,
            'sections' => $sections,
            'groupedSections' => $groupedSections,
            'isPdfDownload' => true,
        ])->render();

        $pdf = Browsershot::html($html)
            ->setChromePath('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
            ->setNodeBinary('/opt/homebrew/opt/node@22/bin/node')
            ->setNpmBinary('/opt/homebrew/opt/node@22/bin/npm')
            ->showBackground()
            ->emulateMedia('print')
            ->format('A4')
            ->margins(15, 15, 15, 15)
            ->waitUntilNetworkIdle()
            ->pdf();

        $filename = Str::slug($businessPlan->name).'-businessplan.pdf';

        return response($pdf)
            ->header('Content-Type', 'application/pdf')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }

    protected function groupSectionsByCategory($sections): array
    {
        $categories = [
            'Zusammenfassung' => ['executive_summary', 'swot_analysis', 'business_model', 'viability_analysis'],
            'Marktanalyse' => ['industry_overview', 'target_audience', 'market_size_trends', 'competitor_analysis'],
            'Produkte & Services' => ['core_offerings', 'expansion_opportunities', 'secondary_offerings', 'customer_service'],
            'Marketing' => ['marketing_overview', 'branding_identity', 'customer_retention', 'social_media', 'seo_content', 'digital_marketing', 'community_engagement'],
            'Finanzen' => ['revenue', 'expenses', 'financing', 'dividends', 'taxes', 'profit_loss', 'balance_sheet', 'funding_plan'],
            'Organisation' => ['team_roles', 'operations_plan', 'risk_analysis'],
            'Planung' => ['pre_launch', 'post_launch', 'five_year_plan'],
        ];

        $grouped = [];

        foreach ($categories as $categoryName => $sectionTypes) {
            $categorySections = $sections->filter(function ($section) use ($sectionTypes) {
                return in_array($section->section_type, $sectionTypes);
            });

            if ($categorySections->isNotEmpty()) {
                $grouped[$categoryName] = $categorySections;
            }
        }

        return $grouped;
    }
}
