<?php

use App\Enums\GenerationStatusEnum;
use App\Enums\StatusEnum;
use App\Jobs\GenerateBusinessPlanSectionsJob;
use App\Models\BusinessPlan;
use App\Models\BusinessPlanSection;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;

use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

// Generate endpoint

it('dispatches generation job and sets status to in_progress', function () {
    Queue::fake();

    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->postJson(route('businessplan.generate', $businessPlan));

    $response->assertSuccessful();
    $response->assertJson(['success' => true]);

    $businessPlan->refresh();
    expect($businessPlan->status)->toBe(StatusEnum::IN_PROGRESS);
    expect($businessPlan->generation_status)->toBe(GenerationStatusEnum::PENDING);

    Queue::assertPushed(GenerateBusinessPlanSectionsJob::class);
});

it('rejects generation for another user business plan', function () {
    Queue::fake();

    $owner = User::factory()->create();
    $other = User::factory()->create();
    $businessPlan = BusinessPlan::factory()->create(['user_id' => $owner->id]);

    actingAs($other);
    $response = $this->postJson(route('businessplan.generate', $businessPlan));

    $response->assertForbidden();
    Queue::assertNothingPushed();
});

// Section store

it('can create a custom section', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->postJson(route('businessplan.sections.store', $businessPlan), [
        'title' => 'Mein eigener Abschnitt',
        'text' => 'Inhalt des Abschnitts.',
    ]);

    $response->assertSuccessful();
    $response->assertJsonPath('section.title', 'Mein eigener Abschnitt');
    $response->assertJsonPath('section.ai_generated', false);

    expect(BusinessPlanSection::where('business_plan_id', $businessPlan->id)->count())->toBe(1);
});

it('validates section title is required on store', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);

    $response = $this->postJson(route('businessplan.sections.store', $businessPlan), [
        'text' => 'Kein Titel',
    ]);

    $response->assertUnprocessable();
    $response->assertJsonValidationErrors(['title']);
});

// Section update

it('can update a section title and text', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);
    $section = BusinessPlanSection::create([
        'business_plan_id' => $businessPlan->id,
        'title' => 'Alt',
        'text' => 'Alter Text',
        'order_index' => 1,
        'is_active' => true,
        'ai_generated' => false,
        'section_type' => 'custom',
    ]);

    $response = $this->putJson(
        route('businessplan.sections.update', [$businessPlan, $section]),
        ['title' => 'Neu', 'text' => 'Neuer Text'],
    );

    $response->assertSuccessful();

    $section->refresh();
    expect($section->title)->toBe('Neu');
    expect($section->text)->toBe('Neuer Text');
});

// Section destroy

it('can delete a custom section', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);
    $section = BusinessPlanSection::create([
        'business_plan_id' => $businessPlan->id,
        'title' => 'Custom',
        'text' => 'Text',
        'order_index' => 1,
        'is_active' => true,
        'ai_generated' => false,
        'section_type' => 'custom',
    ]);

    $response = $this->deleteJson(
        route('businessplan.sections.destroy', [$businessPlan, $section]),
    );

    $response->assertSuccessful();
    expect(BusinessPlanSection::find($section->id))->toBeNull();
});

it('cannot delete an ai-generated section', function () {
    $user = User::factory()->create();
    actingAs($user);

    $businessPlan = BusinessPlan::factory()->create(['user_id' => $user->id]);
    $section = BusinessPlanSection::create([
        'business_plan_id' => $businessPlan->id,
        'title' => 'KI Abschnitt',
        'text' => 'KI Text',
        'order_index' => 1,
        'is_active' => true,
        'ai_generated' => true,
        'section_type' => 'executive_summary',
    ]);

    $response = $this->deleteJson(
        route('businessplan.sections.destroy', [$businessPlan, $section]),
    );

    $response->assertForbidden();
    expect(BusinessPlanSection::find($section->id))->not->toBeNull();
});
