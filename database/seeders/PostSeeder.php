<?php

namespace Database\Seeders;

use App\Enums\PostCategoryEnum;
use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            PostCategoryEnum::STARTUPS,
            PostCategoryEnum::FUNDING,
            PostCategoryEnum::STRATEGY,
            PostCategoryEnum::MARKETING,
        ];

        $posts = [
            [
                'title' => 'Erfolgreich Gründen: Der ultimative Guide für Startups',
                'category' => PostCategoryEnum::STARTUPS,
                'description' => 'Erfahre, wie du deine Geschäftsidee validierst und dein Unternehmen erfolgreich an den Start bringst.',
            ],
            [
                'title' => 'Businessplan schreiben leicht gemacht',
                'category' => PostCategoryEnum::STRATEGY,
                'description' => 'Ein solider Businessplan ist das Fundament deines Erfolgs. Wir zeigen dir Schritt für Schritt, wie es geht.',
            ],
            [
                'title' => 'Finanzierungsmöglichkeiten für Gründer',
                'category' => PostCategoryEnum::FUNDING,
                'description' => 'Von Bootstrapping bis Venture Capital – finde die passende Finanzierung für dein Vorhaben.',
            ],
            [
                'title' => 'Content Marketing Strategien 2026',
                'category' => PostCategoryEnum::MARKETING,
                'description' => 'So baust du dir eine starke Marke auf und erreichst deine Zielgruppe effektiv.',
            ],
            [
                'title' => 'Die 5 häufigsten Fehler bei der Startup-Gründung',
                'category' => PostCategoryEnum::STARTUPS,
                'description' => 'Vermeide diese Stolpersteine, um dein Unternehmen schneller zum Wachstum zu führen.',
            ],
            [
                'title' => 'Fördermittel vom Staat: So nutzt du sie richtig',
                'category' => PostCategoryEnum::FUNDING,
                'description' => 'Es gibt zahlreiche Förderprogramme. Wir geben dir einen Überblick über die wichtigsten Optionen.',
            ],
            [
                'title' => 'Lean Startup Methode in der Praxis',
                'category' => PostCategoryEnum::STRATEGY,
                'description' => 'Schnell lernen, schnell anpassen: Wie du mit minimalem Aufwand maximalen Output generierst.',
            ],
            [
                'title' => 'SEO für Startups: Sichtbarkeit ohne Budget',
                'category' => PostCategoryEnum::MARKETING,
                'description' => 'Wie du organisch bei Google rankst und nachhaltig Besucher auf deine Website ziehst.',
            ],
            [
                'title' => 'Networking für Gründer: Kontakte knüpfen',
                'category' => PostCategoryEnum::STARTUPS,
                'description' => 'Ein starkes Netzwerk ist Gold wert. Tipps für effektives Networking in der Startup-Szene.',
            ],
            [
                'title' => 'Social Media Advertising für B2B',
                'category' => PostCategoryEnum::MARKETING,
                'description' => 'Nutze LinkedIn und Co., um gezielt Entscheidungsträger anzusprechen und Leads zu generieren.',
            ],
        ];

        foreach ($posts as $postData) {
            Post::create([
                'title' => $postData['title'],
                'slug' => Str::slug($postData['title']),
                'description' => $postData['description'],
                'category' => $postData['category'],
                'author' => 'Gladys Slawina Cirtu',
                'image_url' => 'https://images.unsplash.com/photo-1'.fake()->regexify('[0-9]{9}').'?auto=format&fit=crop&q=80&w=800',
                'image_alt' => $postData['title'],
                'content' => fake()->paragraphs(5, true),
            ]);
        }
    }
}
