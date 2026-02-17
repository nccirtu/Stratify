<?php

namespace App\Http\Controllers;

use App\Actions\BusinessPlan\UpsertBusinessPlanStepOne;
use App\Actions\BusinessPlan\UpsertBusinessPlanStepThree;
use App\Actions\BusinessPlan\UpsertBusinessPlanStepTwo;
use App\Http\Requests\Businessplan\StoreBusinessPlanRequest;
use App\Http\Requests\Businessplan\StoreStepOneRequest;
use App\Http\Requests\Businessplan\StoreStepThreeRequest;
use App\Http\Requests\Businessplan\StoreStepTwoRequest;
use App\Enums\StatusEnum;
use App\Enums\TypeEnum;
use Illuminate\Support\Str;
use App\Models\Branches;
use App\Models\BusinessPlan;
use App\Models\CatalogItem;
use App\Models\Company;
use App\Models\Currency;
use App\Models\Tax;
use App\Models\RecurringTemplate;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessPlanController extends Controller
{
    public function __construct(
        protected UpsertBusinessPlanStepOne $upsertStepOne,
        protected UpsertBusinessPlanStepTwo $upsertStepTwo,
        protected UpsertBusinessPlanStepThree $upsertStepThree
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $businessplans = BusinessPlan::with(['user', 'notes.user'])
            ->where('user_id', auth()->id())
            ->paginate(15);

        return Inertia::render('businessplan/index', [
            'businessplans' => $businessplans,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('businessplan/create', [
            'branches' => Branches::all()->map(fn ($b) => ['value' => (string) $b->id, 'label' => $b->name]),
            'companies' => Company::where('user_id', auth()->id())->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'currencies' => Currency::all()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->code]),
            'taxes' => Tax::where('is_active', true)->get()->map(fn ($t) => ['value' => (string) $t->id, 'label' => $t->name]),
            'incomeCategories' => TransactionCategory::where('type', TypeEnum::INCOME->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'expenseCategories' => TransactionCategory::where('type', TypeEnum::EXPENSE->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'incomeCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::INCOME)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'expenseCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::EXPENSE)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
        ]);
    }

    /**
     * Store a new business plan (single-submit from wizard).
     */
    public function store(StoreBusinessPlanRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $businessPlan = BusinessPlan::create([
            'name' => $data['name'],
            'slug' => $data['slug'],
            'description' => $data['description'] ?? null,
            'company_id' => $data['company_id'],
            'branch_id' => $data['branch_id'] ?? null,
            'user_id' => auth()->id(),
            'status' => StatusEnum::DRAFT,
            'period_from' => $data['period_from'] ?? null,
            'period_until' => $data['period_until'] ?? null,
            'business_idea' => $data['business_idea'] ?? null,
            'currency' => $data['currency_id'] ?? null,
            'language' => $data['language'] ?? null,
            'target_customers' => $data['target_customers'] ?? null,
            'customer_problems' => $data['customer_problems'] ?? null,
            'location' => $data['location'] ?? null,
            'solution_description' => $data['solution_description'] ?? null,
            'competitive_advantage' => $data['competitive_advantage'] ?? null,
            'pricing_strategy' => $data['pricing_strategy'] ?? null,
            'competitors' => $data['competitors'] ?? null,
            'team_members' => $data['team_members'] ?? null,
            'initial_investment' => $data['initial_investment'] ?? null,
            'marketing_channels' => $data['marketing_channels'] ?? null,
            'revenue_model' => $data['revenue_model'] ?? null,
            'milestones' => $data['milestones'] ?? null,
            'risks' => $data['risks'] ?? null,
        ]);

        $this->storeTransactions($businessPlan, $data['income_transactions'] ?? [], TypeEnum::INCOME);
        $this->storeTransactions($businessPlan, $data['expense_transactions'] ?? [], TypeEnum::EXPENSE);

        return redirect()->route('businessplan.index')
            ->with('success', 'Business Plan created.');
    }

    private function storeTransactions(BusinessPlan $businessPlan, array $transactions, TypeEnum $type): void
    {
        foreach ($transactions as $txData) {
            $recurringTemplateId = null;

            if (!empty($txData['is_recurring'])) {
                $template = RecurringTemplate::create([
                    'business_plan_id' => $businessPlan->id,
                    'amount' => $txData['amount'],
                    'frequency' => $txData['frequency'],
                    'day_of_month' => $txData['day_of_month'] ?? 1,
                    'start_date' => $txData['start_date'],
                    'end_date' => $txData['end_date'] ?? null,
                    'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                ]);
                $recurringTemplateId = $template->id;
            }

            Transaction::create([
                'business_plan_id' => $businessPlan->id,
                'name' => $txData['name'],
                'slug' => Str::slug($txData['name']),
                'description' => $txData['description'] ?? null,
                'amount' => $txData['amount'],
                'total_amount' => $txData['amount'],
                'category_id' => $txData['category_id'],
                'currency_id' => $txData['currency_id'],
                'tax_id' => $txData['tax_id'],
                'catalog_item_id' => $txData['catalog_item_id'] ?? null,
                'recurring_template_id' => $recurringTemplateId,
                'type' => $type->value,
                'status' => StatusEnum::DRAFT->value,
                'date' => $txData['date'] ?? now(),
                'is_forecast' => true,
                'is_active' => true,
                'is_recurring' => !empty($txData['is_recurring']),
                'payment_method' => $txData['payment_method'],
            ]);
        }
    }

    /**
     * Store step one.
     */
    public function storeStepOne(StoreStepOneRequest $request): RedirectResponse
    {
        $businessPlan = $this->upsertStepOne->handle($request->validated());

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 2])
            ->with('success', 'Step 1 saved.');
    }

    /**
     * Store step two.
     */
    public function storeStepTwo(StoreStepTwoRequest $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $this->upsertStepTwo->handle($businessPlan, $request->validated());

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 3])
            ->with('success', 'Step 2 saved.');
    }

    /**
     * Store step three.
     */
    public function storeStepThree(StoreStepThreeRequest $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $this->upsertStepThree->handle($businessPlan, $request->validated());

        return redirect()->route('businessplan.index')
            ->with('success', 'Business Plan completed.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Inertia::render('businessplan/show');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BusinessPlan $businessPlan, Request $request): Response
    {
        $step = $request->query('step', 1);

        return Inertia::render('businessplan/edit', [
            'businessPlan' => $businessPlan,
            'step' => (int) $step,
            'branches' => Branches::all(),
            'companies' => Company::where('user_id', auth()->id())->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, BusinessPlan $businessPlan): RedirectResponse
    {
        $step = $request->input('step', 1);

        if ($step == 1) {
            $data = app(StoreStepOneRequest::class)->validated();
            $this->upsertStepOne->handle($data, $businessPlan);
        } elseif ($step == 2) {
            $data = app(StoreStepTwoRequest::class)->validated();
            $this->upsertStepTwo->handle($businessPlan, $data);
        } elseif ($step == 3) {
            $data = app(StoreStepThreeRequest::class)->validated();
            $this->upsertStepThree->handle($businessPlan, $data);
        }

        return back()->with('success', "Step $step updated.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
