<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'business_plan_id' => \App\Models\BusinessPlan::factory(),
            'category_id' => \App\Models\TransactionCategory::factory(),
            'name' => fake()->sentence(3),
            'slug' => fake()->unique()->slug(),
            'amount' => fake()->randomFloat(2, 10, 10000),
            'total_amount' => fake()->randomFloat(2, 10, 10000),
            'type' => fake()->randomElement(['income', 'expense']),
            'status' => 'completed',
            'date' => fake()->dateTimeBetween('-1 year', 'now'),
            'payment_method' => 'transfer',
            'is_active' => true,
            'is_forecast' => false,
            'is_recurring' => false,
        ];
    }
}
