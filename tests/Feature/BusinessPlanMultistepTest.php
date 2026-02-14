<?php

use App\Models\BusinessPlan;
use App\Models\Company;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

it('can store step one and redirects to step two', function () {
    $user = User::factory()->create();
    actingAs($user);

    $response = $this->post(route('businessplan.step-one.store'), [
        'name' => 'My Test Plan',
        'slug' => 'my-test-plan',
        'description' => 'Test description',
        'status' => 'draft',
    ]);

    $businessPlan = BusinessPlan::first();

    expect($businessPlan)->not->toBeNull();
    expect($businessPlan->name)->toBe('My Test Plan');
    $response->assertRedirect(route('businessplan.edit', [$businessPlan->id, 'step' => 2]));
});

it('can store step two and redirects to step three', function () {
    $user = User::factory()->create();
    actingAs($user);

    $company = Company::factory()->create(['user_id' => $user->id]);
    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id, 'company_id' => $company->id]);

    $response = $this->post(route('businessplan.step-two.store', $businessPlan->id), [
        'company_id' => $company->id,
    ]);

    $response->assertRedirect(route('businessplan.edit', [$businessPlan->id, 'step' => 3]));
});

it('can store step three and redirects to index', function () {
    $user = User::factory()->create();
    actingAs($user);

    $company = Company::factory()->create(['user_id' => $user->id]);
    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id, 'company_id' => $company->id]);

    $response = $this->post(route('businessplan.step-three.store', $businessPlan->id), [
        'period_from' => '2026-01-01',
        'period_until' => '2026-12-31',
    ]);

    $response->assertRedirect(route('businessplan.index'));

    $businessPlan->refresh();
    expect($businessPlan->period_from->format('Y-m-d'))->toBe('2026-01-01');
});
