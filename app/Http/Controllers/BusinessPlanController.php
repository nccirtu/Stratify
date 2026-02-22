<?php

namespace App\Http\Controllers;

use App\Actions\BusinessPlan\CreateBusinessPlan;
use App\Actions\BusinessPlan\DeleteBusinessPlan;
use App\Actions\BusinessPlan\UpdateBusinessPlan;
use App\Enums\AgeGroupEnum;
use App\Enums\BusinessActivitiesEnum;
use App\Enums\BusinessModelEnum;
use App\Enums\BusinessplanTargetEnum;
use App\Enums\CapitalUsageEnum;
use App\Enums\ChannelsEnum;
use App\Enums\ClientTypeEnum;
use App\Enums\CommunityLeadershipEnum;
use App\Enums\CompanyStateEnum;
use App\Enums\CompanyTargetGroupEnum;
use App\Enums\DevelopmentStateEnum;
use App\Enums\ExclusiveLeadershipEnum;
use App\Enums\InformationTargetGroupEnum;
use App\Enums\InovationLevelEnum;
use App\Enums\LifeSituationEnum;
use App\Enums\OfferTypeEnum;
use App\Enums\PriceLeadershipEnum;
use App\Enums\PricingStrategieEnum;
use App\Enums\PropertyRightsEnum;
use App\Enums\PublicTenderEnum;
use App\Enums\PurchaseDecisionEnum;
use App\Enums\QualityLeadershipEnum;
use App\Enums\ScalableCapabilityEnum;
use App\Enums\SpecialistLeadershipEnum;
use App\Enums\TargetMarketEnum;
use App\Enums\TechnologyLeadershipEnum;
use App\Enums\TypeEnum;
use App\Enums\UspEnum;
use App\Http\Requests\Businessplan\CreateBusinessPlanRequest;
use App\Http\Requests\Businessplan\SaveWizardStepRequest;
use App\Http\Requests\Businessplan\UpdateBusinessPlanRequest;
use App\Models\Branches;
use App\Models\BusinessPlan;
use App\Models\CatalogItem;
use App\Models\Currency;
use App\Models\Tax;
use App\Models\TransactionCategory;
use App\Services\LiquidityPlan\LiquidityPlanBuilder;
use App\Services\LiquidityPlan\ViewContext;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessPlanController extends Controller
{
    public function index(): Response
    {
        $businessplans = BusinessPlan::with(['user', 'notes.user'])
            ->where('user_id', auth()->id())
            ->orderBy('updated_at', 'desc')
            ->paginate(15);

        return Inertia::render('businessplan/index', [
            'businessplans' => $businessplans,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('businessplan/create', [
            'branches' => Branches::all()->map(fn ($b) => ['value' => (string) $b->id, 'label' => $b->name]),
            'currencies' => Currency::all()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->code]),
            'taxes' => Tax::where('is_active', true)->get()->map(fn ($t) => ['value' => (string) $t->id, 'label' => $t->name]),
            'incomeCategories' => TransactionCategory::where('type', TypeEnum::INCOME->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'expenseCategories' => TransactionCategory::where('type', TypeEnum::EXPENSE->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'incomeCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::INCOME)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'expenseCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::EXPENSE)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'enumOptions' => $this->enumOptions(),
        ]);
    }

    public function store(CreateBusinessPlanRequest $request, CreateBusinessPlan $action): JsonResponse|RedirectResponse
    {
        $businessPlan = $action->handle($request->validated());

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Draft erstellt.',
                'businessPlan' => $businessPlan,
            ]);
        }

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 2])
            ->with('success', 'Draft created.');
    }

    public function saveStep(SaveWizardStepRequest $request, BusinessPlan $businessPlan, UpdateBusinessPlan $action): JsonResponse
    {
        $validated = $request->validated();
        $step = (int) $request->input('step', 1);

        $action->handle($businessPlan, $validated);

        return response()->json([
            'success' => true,
            'message' => 'Schritt '.$step.' gespeichert.',
            'step' => $step,
        ]);
    }

    public function show(BusinessPlan $businessPlan, Request $request): Response
    {
        $catalogItems = CatalogItem::where('user_id', auth()->id())->get()->keyBy('id');
        $businessPlan->load([
            'transactions.category',
            'businessPlanSections',
            'branch',
            'employees',
            'founders',
            'loans',
            'bankAccounts',
        ]);

        $view = in_array($request->query('view'), [ViewContext::YEAR, ViewContext::WEEK], true)
            ? $request->query('view')
            : ViewContext::YEAR;
        $year = (int) $request->query('year', $businessPlan->period_from?->year ?? now()->year);
        // Default week to 1 so frontend and backend always agree on the initial week
        $isoWeek = $view === ViewContext::WEEK ? (int) $request->query('week', 1) : null;

        $context = new ViewContext($view, $year, null, $isoWeek);
        $liquidityPlan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

        return Inertia::render('businessplan/show', [
            'catalogItems' => $catalogItems,
            'businessPlan' => $businessPlan,
            'liquidityPlan' => $liquidityPlan,
        ]);
    }

    public function edit(BusinessPlan $businessPlan, Request $request): Response
    {
        $step = $request->query('step', 1);
        $businessPlan->load(['transactions', 'employees', 'loans']);

        return Inertia::render('businessplan/edit', [
            'businessPlan' => $businessPlan,
            'step' => (int) $step,
            'branches' => Branches::all()->map(fn ($b) => ['value' => (string) $b->id, 'label' => $b->name]),
            'currencies' => Currency::all()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->code]),
            'taxes' => Tax::where('is_active', true)->get()->map(fn ($t) => ['value' => (string) $t->id, 'label' => $t->name]),
            'incomeCategories' => TransactionCategory::where('type', TypeEnum::INCOME->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'expenseCategories' => TransactionCategory::where('type', TypeEnum::EXPENSE->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'incomeCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::INCOME)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'expenseCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::EXPENSE)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'enumOptions' => $this->enumOptions(),
        ]);
    }

    public function update(UpdateBusinessPlanRequest $request, BusinessPlan $businessPlan, UpdateBusinessPlan $action): JsonResponse|RedirectResponse
    {
        $validated = $request->validated();
        $action->handle($businessPlan, $validated);

        if ($request->wantsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Gespeichert.',
            ]);
        }

        $currentStep = $request->input('current_step', 1);
        $nextStep = $currentStep + 1;

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => $nextStep])
            ->with('success', 'Saved.');
    }

    public function destroy(BusinessPlan $businessPlan, DeleteBusinessPlan $action): RedirectResponse
    {
        $action->handle($businessPlan);

        return redirect()->route('businessplan.index')
            ->with('success', 'Business Plan deleted.');
    }

    private function enumOptions(): array
    {
        return [
            'companyStates' => CompanyStateEnum::options(),
            'businessplanTargets' => BusinessplanTargetEnum::options(),
            'capitalUsages' => CapitalUsageEnum::options(),
            'businessActivities' => BusinessActivitiesEnum::options(),
            'businessModels' => BusinessModelEnum::options(),
            'inovationLevels' => InovationLevelEnum::options(),
            'usps' => UspEnum::options(),
            'priceLeaderships' => PriceLeadershipEnum::options(),
            'qualityLeaderships' => QualityLeadershipEnum::options(),
            'specialistLeaderships' => SpecialistLeadershipEnum::options(),
            'technologyLeaderships' => TechnologyLeadershipEnum::options(),
            'exclusiveLeaderships' => ExclusiveLeadershipEnum::options(),
            'communityLeaderships' => CommunityLeadershipEnum::options(),
            'scalableCapabilities' => ScalableCapabilityEnum::options(),
            'offerTypes' => OfferTypeEnum::options(),
            'developmentStates' => DevelopmentStateEnum::options(),
            'propertyRights' => PropertyRightsEnum::options(),
            'pricingStrategies' => PricingStrategieEnum::options(),
            'clientTypes' => ClientTypeEnum::options(),
            'targetMarkets' => TargetMarketEnum::options(),
            'purchaseDecisions' => PurchaseDecisionEnum::options(),
            'ageGroups' => AgeGroupEnum::options(),
            'lifeSituations' => LifeSituationEnum::options(),
            'informationTargetGroups' => InformationTargetGroupEnum::options(),
            'companyTargetGroups' => CompanyTargetGroupEnum::options(),
            'publicTenders' => PublicTenderEnum::options(),
            'channels' => ChannelsEnum::options(),
        ];
    }
}
