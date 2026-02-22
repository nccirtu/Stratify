<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BankAccount>
 */
class BankAccountFactory extends Factory
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
            'name' => fake()->company().' Bank',
            'order_index' => fake()->numberBetween(0, 10),
        ];
    }
}
