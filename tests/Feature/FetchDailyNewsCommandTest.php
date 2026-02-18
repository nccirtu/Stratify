<?php

use App\Ai\Agents\NewsScraperAgent;
use App\Enums\PostCategoryEnum;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

/** @return string JSON with two fake posts */
function fakeTwoPostsJson(): string
{
    return json_encode([
        [
            'title' => 'Startup-Boom im DACH-Raum: Neue Rekorde in 2026',
            'description' => 'Gründungen erreichen neues Rekordhoch in Deutschland, Österreich und der Schweiz.',
            'content' => 'Der Startup-Boom im DACH-Raum setzt sich fort. Neue Zahlen belegen den Trend.',
            'image_alt' => 'Startup-Gründer beim Arbeiten',
        ],
        [
            'title' => 'KI-Tools revolutionieren die Selbstständigkeit',
            'description' => 'Neue KI-Anwendungen erleichtern den Alltag von Selbstständigen erheblich.',
            'content' => 'Künstliche Intelligenz verändert die Arbeitswelt der Selbstständigen nachhaltig.',
            'image_alt' => 'KI-Technologie am Arbeitsplatz',
        ],
    ]);
}

beforeEach(function (): void {
    // Return the same two-post JSON for every category prompt
    NewsScraperAgent::fake(fn () => fakeTwoPostsJson());
});

it('creates inactive posts for all categories', function (): void {
    $categoryCount = count(PostCategoryEnum::cases());

    $this->artisan('news:fetch-daily')->assertSuccessful();

    expect(Post::where('is_active', false)->count())
        ->toBe($categoryCount * 2);
});

it('creates posts with correct attributes', function (): void {
    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();

    $post = Post::where('is_active', false)->first();

    expect($post)->not->toBeNull()
        ->and($post->category)->toBe(PostCategoryEnum::STARTUPS)
        ->and($post->author)->toBe('Stratify Redaktion')
        ->and($post->is_active)->toBeFalse()
        ->and($post->image_url)->toBeNull()
        ->and($post->title)->not->toBeEmpty()
        ->and($post->slug)->not->toBeEmpty();
});

it('creates posts with unique slugs when run twice', function (): void {
    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();
    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();

    $slugs = Post::where('is_active', false)->pluck('slug');

    expect($slugs->count())->toBe($slugs->unique()->count());
});

it('handles unknown --category option gracefully', function (): void {
    $this->artisan('news:fetch-daily', ['--category' => 'nonexistent'])->assertSuccessful();

    expect(Post::where('is_active', false)->count())->toBe(0);
});

it('skips unparseable AI responses without crashing', function (): void {
    NewsScraperAgent::fake(fn () => 'This is not valid JSON at all.');

    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();

    expect(Post::where('is_active', false)->count())->toBe(0);
});

it('skips entries without a title', function (): void {
    NewsScraperAgent::fake(fn () => json_encode([
        ['title' => '', 'description' => 'No title here', 'content' => 'Content'],
        ['title' => 'Valid post', 'description' => 'Fine', 'content' => 'Content', 'image_alt' => 'Alt'],
    ]));

    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();

    expect(Post::where('is_active', false)->count())->toBe(1);
});

it('does not affect existing active posts', function (): void {
    $existingPost = Post::factory()->create(['is_active' => true]);

    $this->artisan('news:fetch-daily', ['--category' => 'startups'])->assertSuccessful();

    expect($existingPost->fresh()->is_active)->toBeTrue();
});
