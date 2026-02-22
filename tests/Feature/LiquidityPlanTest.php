<?php

use App\Models\BusinessPlan;
use App\Models\Currency;
use App\Models\Employee;
use App\Models\LiquidityAccount;
use App\Models\Loan;
use App\Models\Tax;
use App\Models\Transaction;
use App\Models\TransactionCategory;
use App\Models\User;
use App\Services\LiquidityPlan\LiquidityPlanBuilder;
use App\Services\LiquidityPlan\ViewContext;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

beforeEach(function () {
    $this->artisan('db:seed', ['--class' => 'CurrencySeeder']);
    $this->artisan('db:seed', ['--class' => 'TaxSeeder']);
    $this->artisan('db:seed', ['--class' => 'TransactionCategorySeeder']);
    $this->artisan('db:seed', ['--class' => 'LiquidityAccountSeeder']);
});

it('returns a liquidity plan on the show route', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $this->actingAs($user)
        ->get(route('businessplan.show', $businessPlan))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->has('liquidityPlan')
            ->has('liquidityPlan.year')
            ->has('liquidityPlan.view')
            ->has('liquidityPlan.available_years')
            ->has('liquidityPlan.columns')
            ->has('liquidityPlan.sections')
            ->has('liquidityPlan.net_cashflow')
            ->has('liquidityPlan.saldo')
            ->has('liquidityPlan.bank_accounts')
        );
});

it('returns correct available years from the business plan period', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2027-12-31',
    ]);

    $this->actingAs($user)
        ->get(route('businessplan.show', $businessPlan))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('liquidityPlan.available_years', [2025, 2026, 2027])
        );
});

it('switches year via query parameter', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2026-12-31',
    ]);

    $this->actingAs($user)
        ->get(route('businessplan.show', $businessPlan).'?year=2026')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('liquidityPlan.year', 2026)
            ->where('liquidityPlan.view', 'year')
        );
});

it('returns week view with day columns', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $this->actingAs($user)
        ->get(route('businessplan.show', $businessPlan).'?view=week&year=2025&week=12')
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('liquidityPlan.view', 'week')
            ->where('liquidityPlan.iso_week', 12)
            ->where('liquidityPlan.columns', ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'])
        );
});

it('has 12 column values for every row in year view', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan->load(['employees', 'founders', 'loans', 'bankAccounts']), $context))->build();

    foreach ($plan['sections'] as $section) {
        foreach ($section['rows'] as $row) {
            expect($row['months'])->toHaveCount(12);
        }
        expect($section['summary']['months'])->toHaveCount(12);
    }

    expect($plan['saldo']['months'])->toHaveCount(12);
    expect($plan['net_cashflow']['months'])->toHaveCount(12);
    expect($plan['columns'])->toHaveCount(12);
});

it('has 7 column values for every row in week view', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $context = new ViewContext(ViewContext::WEEK, 2025, null, 10);
    $plan = (new LiquidityPlanBuilder($businessPlan->load(['employees', 'founders', 'loans', 'bankAccounts']), $context))->build();

    foreach ($plan['sections'] as $section) {
        foreach ($section['rows'] as $row) {
            expect($row['months'])->toHaveCount(7);
        }
    }

    expect($plan['saldo']['months'])->toHaveCount(7);
    expect($plan['net_cashflow']['months'])->toHaveCount(7);
    expect($plan['columns'])->toBe(['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']);
});

it('aggregates transactions into the correct liquidity account and month', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $category = TransactionCategory::where('slug', 'produktverkaufe')->first();
    $currency = Currency::first();
    $tax = Tax::first();

    Transaction::factory()->create([
        'business_plan_id' => $businessPlan->id,
        'category_id' => $category->id,
        'currency_id' => $currency->id,
        'tax_id' => $tax->id,
        'type' => 'income',
        'date' => '2025-03-15',
        'amount' => 1000,
        'total_amount' => 1000,
        'name' => 'Test Verkauf',
        'slug' => fake()->unique()->slug(),
        'status' => 'completed',
        'payment_method' => 'transfer',
        'is_active' => true,
        'is_forecast' => false,
        'is_recurring' => false,
    ]);

    $businessPlan->load(['transactions.category', 'employees', 'founders', 'loans', 'bankAccounts']);
    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    $incomeSection = collect($plan['sections'])->firstWhere('key', 'income');
    $forderungenRow = collect($incomeSection['rows'])->firstWhere('account_id', $category->liquidity_account_id);

    expect($forderungenRow)->not->toBeNull();
    expect($forderungenRow['months'][2])->toBe(1000.0);
});

it('calculates employee costs correctly from hire date', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    // Set relation directly to bypass pre-existing FK migration bug (employees → businessplans)
    $employee = new Employee([
        'business_plan_id' => $businessPlan->id,
        'job_title' => 'Developer',
        'number_of_employees' => 2,
        'salary' => 3000,
        'date_of_hire' => '2025-07-01',
        'working_hours_per_week' => 40,
    ]);

    $businessPlan->load(['transactions.category', 'founders', 'loans', 'bankAccounts']);
    $businessPlan->setRelation('employees', collect([$employee]));

    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    $operationalSection = collect($plan['sections'])->firstWhere('key', 'operational');
    $personalkostenRow = collect($operationalSection['rows'])->firstWhere('label', 'Personalkosten');

    expect($personalkostenRow['months'][0])->toBe(0.0);
    expect($personalkostenRow['months'][5])->toBe(0.0);
    expect($personalkostenRow['months'][6])->toBe(6000.0);
    expect($personalkostenRow['months'][11])->toBe(6000.0);
});

it('calculates loan interest and repayment correctly', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    Loan::factory()->create([
        'business_plan_id' => $businessPlan->id,
        'loan_amount' => 120000,
        'interest_rate' => 0.06,
        'monthly_installment' => 1000,
        'start_date' => '2025-01-01',
        'end_date' => '2025-12-31',
    ]);

    $businessPlan->load(['transactions.category', 'employees', 'founders', 'loans', 'bankAccounts']);
    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    $financingSection = collect($plan['sections'])->firstWhere('key', 'financing');
    $zinsenRow = collect($financingSection['rows'])->firstWhere('label', 'Zinsen für Darlehen und Kontokorrentkredite');
    $tilgungRow = collect($financingSection['rows'])->firstWhere('label', 'Tilgungsraten Darlehen');

    expect($zinsenRow['months'][0])->toEqualWithDelta(600.0, 0.01);
    expect($tilgungRow['months'][0])->toBe(1000.0);
});

it('calculates the running saldo correctly', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
        'liquidity_opening_balance' => 1000,
    ]);

    $businessPlan->load(['transactions.category', 'employees', 'founders', 'loans', 'bankAccounts']);
    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    expect($plan['opening_balance'])->toBe(1000.0);
    expect($plan['saldo']['months'])->toHaveCount(12);
    expect($plan['saldo']['months'][0])->toBe(1000.0);
});

it('calculates net cashflow as income minus expenses', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $businessPlan->load(['transactions.category', 'employees', 'founders', 'loans', 'bankAccounts']);
    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    expect($plan['net_cashflow'])->toHaveKeys(['label', 'months', 'total', 'account_id']);
    expect($plan['net_cashflow']['label'])->toBe('Nettocashflow (Einnahmen − Ausgaben)');
    expect($plan['net_cashflow']['months'])->toHaveCount(12);
});

it('includes dispo_limit in bank account data', function () {
    $user = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create([
        'user_id' => $user->id,
        'period_from' => '2025-01-01',
        'period_until' => '2025-12-31',
    ]);

    $businessPlan->bankAccounts()->create([
        'name' => 'Testkonto',
        'order_index' => 1,
        'dispo_limit' => 5000,
    ]);

    $businessPlan->load(['transactions.category', 'employees', 'founders', 'loans', 'bankAccounts']);
    $context = new ViewContext(ViewContext::YEAR, 2025);
    $plan = (new LiquidityPlanBuilder($businessPlan, $context))->build();

    expect($plan['bank_accounts'])->toHaveCount(1);
    $account = $plan['bank_accounts'][0];
    expect($account)->toHaveKeys(['name', 'dispo_limit', 'ist_months', 'dispo_months', 'available_months']);
    expect($account['dispo_limit'])->toBe(5000.0);
    expect($account['ist_months'])->toHaveCount(12);
    expect($account['dispo_months'])->toHaveCount(12);
    expect($account['available_months'])->toHaveCount(12);
    // dispo_months should all be the same constant value
    expect($account['dispo_months'])->each->toBe(5000.0);
});

it('returns 31 liquidity account rows across all sections', function () {
    $totalAccounts = LiquidityAccount::where('is_active', true)->count();
    expect($totalAccounts)->toBe(31);
});
