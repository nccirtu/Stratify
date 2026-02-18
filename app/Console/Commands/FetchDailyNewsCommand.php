<?php

namespace App\Console\Commands;

use App\Ai\Agents\NewsScraperAgent;
use App\Enums\PostCategoryEnum;
use App\Models\Post;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

class FetchDailyNewsCommand extends Command
{
    protected $signature = 'news:fetch-daily
                            {--category= : Only fetch news for a specific category value}';

    protected $description = 'Fetch daily news from the internet for all post categories and save them as inactive posts';

    public function handle(): int
    {
        $categories = $this->categoriesToProcess();
        $labels = PostCategoryEnum::label();

        $this->info(sprintf('Starting daily news fetch for %d categories...', count($categories)));

        $totalCreated = 0;

        foreach ($categories as $category) {
            $label = $labels[$category->value] ?? $category->value;
            $this->line("  → Fetching: {$label}");

            try {
                $agent = new NewsScraperAgent(
                    category: $category,
                    categoryLabel: $label,
                );

                $response = $agent->prompt(
                    "Recherchiere jetzt aktuelle News für die Kategorie \"{$label}\" im DACH-Raum und gib das JSON-Array zurück."
                );

                $posts = $this->parsePostsFromResponse($response->text);

                foreach ($posts as $postData) {
                    $this->createPost($postData, $category);
                    $totalCreated++;
                }

                $this->info(sprintf('    ✓ %d post(s) created', count($posts)));
            } catch (\Exception $e) {
                $this->error("    ✗ Failed: {$e->getMessage()}");
                report($e);
            }
        }

        $this->info(sprintf('Daily news fetch completed. Total posts created: %d', $totalCreated));

        return self::SUCCESS;
    }

    /**
     * @return PostCategoryEnum[]
     */
    protected function categoriesToProcess(): array
    {
        $filter = $this->option('category');

        if ($filter) {
            $category = PostCategoryEnum::tryFrom($filter);

            if (! $category) {
                $this->error("Unknown category: {$filter}");

                return [];
            }

            return [$category];
        }

        return PostCategoryEnum::cases();
    }

    /**
     * @return array<int, array<string, string>>
     */
    protected function parsePostsFromResponse(string $text): array
    {
        $text = trim($text);

        // Strip markdown code fences if present
        $text = preg_replace('/^```(?:json)?\n?/m', '', $text);
        $text = preg_replace('/\n?```$/m', '', $text);
        $text = trim($text);

        $data = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE || ! is_array($data)) {
            $this->warn('    Could not parse JSON response.');

            return [];
        }

        return array_values(array_filter($data, fn ($item) => is_array($item) && ! empty($item['title'])));
    }

    /**
     * @param  array<string, string>  $data
     */
    protected function createPost(array $data, PostCategoryEnum $category): void
    {
        $title = trim($data['title'] ?? '');

        if (! $title) {
            return;
        }

        Post::create([
            'title' => $title,
            'slug' => $this->generateUniqueSlug($title),
            'description' => trim($data['description'] ?? ''),
            'content' => trim($data['content'] ?? ''),
            'image_url' => null,
            'image_alt' => trim($data['image_alt'] ?? $title),
            'category' => $category->value,
            'author' => 'Stratify Redaktion',
            'is_active' => false,
        ]);
    }

    protected function generateUniqueSlug(string $title): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $counter = 1;

        while (Post::where('slug', $slug)->exists()) {
            $slug = $base.'-'.$counter++;
        }

        return $slug;
    }
}
