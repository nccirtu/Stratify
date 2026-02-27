<?php

namespace App\Http\Controllers;

use App\Ai\Agents\BusinessPlanCheckAgent;
use App\Models\BusinessPlan;
use App\Models\BusinessPlanCheck;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BusinessPlanCheckController extends Controller
{
    /**
     * Check definitions grouped by group number.
     *
     * @var array<int, array<string, string>>
     */
    private const CHECKS = [
        1 => [
            'grunddaten_vollstaendigkeit' => 'Grunddaten vollständig',
            'unternehmensdaten_konsistenz' => 'Unternehmensdaten konsistent',
            'planungszeitraum_plausibel' => 'Planungszeitraum plausibel',
            'geschaeftsidee_klarheit' => 'Geschäftsidee klar definiert',
        ],
        2 => [
            'usp_ueberzeugend' => 'USP überzeugend',
            'produktbeschreibung_vollstaendig' => 'Produktbeschreibung vollständig',
            'marktanalyse_plausibel' => 'Marktanalyse plausibel',
            'zielgruppe_definiert' => 'Zielgruppe vollständig definiert',
            'vertriebskanaele_konsistent' => 'Vertriebskanäle konsistent',
        ],
        3 => [
            'einnahmen_realistisch' => 'Einnahmenprognose realistisch',
            'ausgaben_vollstaendig' => 'Ausgabenstruktur vollständig',
            'personalplanung_plausibel' => 'Personalplanung plausibel',
            'finanzplanung_ausgeglichen' => 'Finanzplanung ausgeglichen',
            'gesamtbewertung' => 'Gesamtbewertung',
        ],
    ];

    /**
     * Return all persisted check results for a business plan.
     */
    public function index(BusinessPlan $businessPlan): JsonResponse
    {
        $checks = BusinessPlanCheck::where('business_plan_id', $businessPlan->id)
            ->orderBy('check_group')
            ->get()
            ->groupBy('check_group')
            ->map(fn ($group) => $group->keyBy('check_key'))
            ->toArray();

        return response()->json(['checks' => $checks]);
    }

    /**
     * Run all checks for the given group via Server-Sent Events.
     */
    public function stream(BusinessPlan $businessPlan, int $group): StreamedResponse
    {
        $checksForGroup = self::CHECKS[$group] ?? [];

        $businessPlan->load(['branch', 'transactions', 'employees', 'loans']);

        return response()->stream(function () use ($businessPlan, $group, $checksForGroup) {
            set_time_limit(0);
            ignore_user_abort(true);

            // Initialise/reset all checks for this group to pending
            foreach ($checksForGroup as $checkKey => $checkLabel) {
                BusinessPlanCheck::updateOrCreate(
                    ['business_plan_id' => $businessPlan->id, 'check_key' => $checkKey],
                    ['check_group' => $group, 'check_label' => $checkLabel, 'status' => 'pending', 'result' => null, 'score' => null, 'checked_at' => null],
                );
            }

            foreach ($checksForGroup as $checkKey => $checkLabel) {
                // Emit start event
                $this->sendEvent(['type' => 'check_start', 'check_key' => $checkKey, 'check_label' => $checkLabel]);

                // Mark as running in DB
                BusinessPlanCheck::where('business_plan_id', $businessPlan->id)
                    ->where('check_key', $checkKey)
                    ->update(['status' => 'running']);

                try {
                    $agent = new BusinessPlanCheckAgent($businessPlan, $group, $checkKey, $checkLabel);
                    $responseText = (string) $agent->prompt('Führe die Prüfung durch und antworte im JSON-Format.');

                    // Strip markdown code fences if present
                    $responseText = preg_replace('/^```(?:json)?\s*/m', '', $responseText);
                    $responseText = preg_replace('/\s*```$/m', '', $responseText);
                    $responseText = trim($responseText);

                    $parsed = json_decode($responseText, true);

                    $status = in_array($parsed['status'] ?? '', ['success', 'warning', 'error'])
                        ? $parsed['status']
                        : 'warning';
                    $result = $parsed['result'] ?? $responseText;
                    $score = isset($parsed['score']) ? max(1, min(10, (int) $parsed['score'])) : null;

                    BusinessPlanCheck::where('business_plan_id', $businessPlan->id)
                        ->where('check_key', $checkKey)
                        ->update(['status' => $status, 'result' => $result, 'score' => $score, 'checked_at' => now()]);

                    $this->sendEvent(['type' => 'check_done', 'check_key' => $checkKey, 'status' => $status, 'result' => $result, 'score' => $score]);
                } catch (\Throwable $e) {
                    BusinessPlanCheck::where('business_plan_id', $businessPlan->id)
                        ->where('check_key', $checkKey)
                        ->update(['status' => 'error', 'result' => 'Fehler bei der Überprüfung.', 'checked_at' => now()]);

                    $this->sendEvent(['type' => 'check_done', 'check_key' => $checkKey, 'status' => 'error', 'result' => 'Fehler bei der Überprüfung: '.$e->getMessage()]);
                }
            }

            $this->sendEvent(['type' => 'group_done', 'group' => $group]);
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'X-Accel-Buffering' => 'no',
            'Cache-Control' => 'no-cache, no-store',
            'Connection' => 'keep-alive',
        ]);
    }

    /**
     * Emit a single SSE data event.
     */
    private function sendEvent(array $data): void
    {
        echo 'data: '.json_encode($data)."\n\n";

        if (ob_get_level() > 0) {
            ob_flush();
        }

        flush();
    }
}
