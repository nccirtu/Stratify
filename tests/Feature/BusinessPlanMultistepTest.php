<?php

use App\Models\BusinessPlan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it('can create a business plan (step 1) via POST', function () {
    $user = User::factory()->create();
    actingAs($user);

    $response = $this->postJson(route('businessplan.store'), [
        'name' => 'My Test Plan',
        'slug' => 'my-test-plan',
        'description' => 'Test description',
    ]);

    $response->assertSuccessful();

    $businessPlan = BusinessPlan::first();
    expect($businessPlan)->not->toBeNull();
    expect($businessPlan->name)->toBe('My Test Plan');
    expect($businessPlan->slug)->toBe('my-test-plan');
});

it('validates required fields for step 1', function () {
    $user = User::factory()->create();
    actingAs($user);

    $response = $this->postJson(route('businessplan.store'), []);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['name', 'slug']);
});

it('can save step 2 (company data) via save-step route', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 2,
        'company_state' => 'new',
        'company_name' => 'Acme GmbH',
        'email' => 'info@acme.de',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->company_name)->toBe('Acme GmbH');
    expect($businessPlan->email)->toBe('info@acme.de');
});

it('can save step 3 (vorhaben) via save-step route', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 3,
        'businessplan_target' => 'credit',
        'capital_usage' => ['marketing', 'employees'],
        'period_from' => '2026-01-01',
        'period_until' => '2026-12-31',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->period_from->format('Y-m-d'))->toBe('2026-01-01');
    expect($businessPlan->capital_usage)->toBe(['marketing', 'employees']);
});

it('can save step 4 (business details) via save-step route', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 4,
        'business_activities' => 'first_sales',
        'last_year_revenue' => 50000,
        'business_model' => ['product_sales', 'services'],
        'customer_problems' => 'Customers struggle with X.',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->customer_problems)->toBe('Customers struggle with X.');
    expect($businessPlan->business_model)->toBe(['product_sales', 'services']);
});

it('can save step 5 (usp) via save-step route', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 5,
        'inovation_level' => 'classic',
        'usp' => ['price_leadership', 'quality_leadership'],
        'price_leadership' => ['automation'],
        'quality_leadership' => ['certification'],
        'usp_text' => 'We are the best.',
        'scalable' => 'national',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->usp)->toBe(['price_leadership', 'quality_leadership']);
    expect($businessPlan->inovation_level)->toBe('classic');
});
