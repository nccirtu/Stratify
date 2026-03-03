<?php

use App\Models\BusinessPlan;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

// Step 13 – Kundenakquise & Vertrieb

it('can save step 13 (kundenakquise) with online shop channel', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 13,
        'acquiring_customers' => ['online_shop', 'direktvertrieb'],
        'acquiring_customers_online_shop' => ['domain_registriert', 'tracking_eingerichtet'],
        'acquiring_customers_create_online_shop' => 'agentur',
        'payment_methods' => ['paypal', 'kreditkarte'],
        'shipping_organization' => 'eigener_versand',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->acquiring_customers)->toBe(['online_shop', 'direktvertrieb']);
    expect($businessPlan->acquiring_customers_online_shop)->toBe(['domain_registriert', 'tracking_eingerichtet']);
    expect($businessPlan->acquiring_customers_create_online_shop)->toBe('agentur');
    expect($businessPlan->payment_methods)->toBe(['paypal', 'kreditkarte']);
    expect($businessPlan->shipping_organization)->toBe('eigener_versand');
});

it('can save step 13 with direktvertrieb fields', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 13,
        'acquiring_customers' => ['direktvertrieb'],
        'direct_sales_responsibility' => ['gruender', 'mitarbeiter'],
        'existing_sales_structure' => ['crm_system_eingerichtet', 'verguetungsmodell_definiert', 'geschultes_personal_verfuegbar'],
        'direct_sales_staff_count' => 3,
        'sales_compensation_model' => 'kombination',
        'plan_crm_introduction' => 'ja',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->direct_sales_responsibility)->toBe(['gruender', 'mitarbeiter']);
    expect($businessPlan->existing_sales_structure)->toBe(['crm_system_eingerichtet', 'verguetungsmodell_definiert', 'geschultes_personal_verfuegbar']);
    expect($businessPlan->direct_sales_staff_count)->toBe(3);
    expect($businessPlan->sales_compensation_model)->toBe('kombination');
});

it('can save step 13 with aussendienst fields', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 13,
        'acquiring_customers' => ['aussendienst'],
        'field_service_infrastructure' => ['aussendienstmitarbeiter_eingestellt', 'fahrzeuge_vorhanden'],
        'field_service_staff_planned_count' => 5,
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->field_service_infrastructure)->toBe(['aussendienstmitarbeiter_eingestellt', 'fahrzeuge_vorhanden']);
    expect($businessPlan->field_service_staff_planned_count)->toBe(5);
});

it('validates step 13 integer fields', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 13,
        'direct_sales_staff_count' => 'not-a-number',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['direct_sales_staff_count']);
});

// Step 14 – Marketing

it('can save step 14 (marketing) with all fields', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 14,
        'marketing_channels' => ['seo', 'social_ads', 'newsletter'],
        'social_ads_platforms' => ['meta', 'tiktok'],
        'marketing_experience' => 'teilweise',
        'marketing_responsibility' => ['gruender', 'agentur'],
        'marketing_infrastructure' => ['website', 'tracking_eingerichtet'],
        'marketing_budget_monthly' => '500_bis_2000',
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->marketing_channels)->toBe(['seo', 'social_ads', 'newsletter']);
    expect($businessPlan->social_ads_platforms)->toBe(['meta', 'tiktok']);
    expect($businessPlan->marketing_experience)->toBe('teilweise');
    expect($businessPlan->marketing_responsibility)->toBe(['gruender', 'agentur']);
    expect($businessPlan->marketing_infrastructure)->toBe(['website', 'tracking_eingerichtet']);
    expect($businessPlan->marketing_budget_monthly)->toBe('500_bis_2000');
});

it('can save step 14 with nullable fields', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 14,
        'marketing_channels' => ['seo'],
        // social_ads_platforms omitted since no 'social_ads' channel selected
    ]);

    $response->assertSuccessful();

    $businessPlan->refresh();
    expect($businessPlan->marketing_channels)->toBe(['seo']);
    expect($businessPlan->social_ads_platforms)->toBeNull();
});

it('validates step 14 arrays contain strings', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->putJson(route('businessplan.save-step', $businessPlan), [
        'step' => 14,
        'marketing_channels' => [['nested' => 'array']],
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['marketing_channels.0']);
});

// Enum options appear in controller response

it('enum options for steps 13 and 14 are present in create page', function () {
    $user = User::factory()->create();
    actingAs($user);

    $response = $this->get(route('businessplan.create'));

    $response->assertSuccessful();
    $response->assertInertia(
        fn ($page) => $page
            ->has('enumOptions.acquiringCustomers')
            ->has('enumOptions.marketingChannels')
            ->has('enumOptions.socialAdsPlatforms')
            ->has('enumOptions.marketingBudgets')
    );
});
