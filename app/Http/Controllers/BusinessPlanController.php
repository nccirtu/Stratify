<?php

namespace App\Http\Controllers;

use App\Actions\BusinessPlan\CreateBusinessPlan;
use App\Actions\BusinessPlan\DeleteBusinessPlan;
use App\Actions\BusinessPlan\UpdateBusinessPlan;
use App\Enums\TypeEnum;
use App\Http\Requests\Businessplan\CreateBusinessPlanRequest;
use App\Http\Requests\Businessplan\UpdateBusinessPlanRequest;
use App\Models\Branches;
use App\Models\BusinessPlan;
use App\Models\CatalogItem;
use App\Models\Company;
use App\Models\Currency;
use App\Models\Tax;
use App\Models\TransactionCategory;
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
            'companies' => Company::where('user_id', auth()->id())->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'currencies' => Currency::all()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->code]),
            'taxes' => Tax::where('is_active', true)->get()->map(fn ($t) => ['value' => (string) $t->id, 'label' => $t->name]),
            'incomeCategories' => TransactionCategory::where('type', TypeEnum::INCOME->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'expenseCategories' => TransactionCategory::where('type', TypeEnum::EXPENSE->value)->where('is_active', true)->get()->map(fn ($c) => ['value' => (string) $c->id, 'label' => $c->name]),
            'incomeCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::INCOME)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
            'expenseCatalogItems' => CatalogItem::where('user_id', auth()->id())->where('type', TypeEnum::EXPENSE)->where('is_active', true)->get()->map(fn ($i) => ['value' => (string) $i->id, 'label' => $i->name, 'data' => $i->only('name', 'description', 'default_amount', 'transaction_category_id', 'currency_id', 'tax_id')]),
        ]);
    }

    public function store(CreateBusinessPlanRequest $request, CreateBusinessPlan $action): RedirectResponse
    {
        $businessPlan = $action->handle($request->validated());

        return redirect()->route('businessplan.edit', ['businessplan' => $businessPlan->id, 'step' => 2])
            ->with('success', 'Draft created.');
    }

    public function edit(BusinessPlan $businessPlan, Request $request): Response
    {
        $step = $request->query('step', 1);
        $businessPlan->load('transactions');

        return Inertia::render('businessplan/edit', [
            'businessPlan' => $businessPlan,
            'step' => (int) $step,
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

    public function update(UpdateBusinessPlanRequest $request, BusinessPlan $businessPlan, UpdateBusinessPlan $action): RedirectResponse
    {
        $action->handle($businessPlan, $request->validated());

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
}
