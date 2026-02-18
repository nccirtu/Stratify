<?php

namespace Database\Factories;

use App\Enums\PostCategoryEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    public function definition(): array
    {
        $title = fake()->sentence(6);

        return [
            'title' => $title,
            'slug' => Str::slug($title).'-'.fake()->unique()->randomNumber(5),
            'description' => fake()->paragraph(),
            'content' => fake()->paragraphs(4, true),
            'image_url' => null,
            'image_alt' => fake()->sentence(4),
            'category' => fake()->randomElement(PostCategoryEnum::cases())->value,
            'author' => fake()->name(),
            'is_active' => true,
        ];
    }
}
