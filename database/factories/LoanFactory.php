<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Loan>
 */
class LoanFactory extends Factory
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
            'name' => fake()->company(),
            'loan_amount' => fake()->randomFloat(2, 10000, 500000),
            'interest_rate' => fake()->randomFloat(4, 0.01, 0.15),
            'monthly_installment' => fake()->randomFloat(2, 100, 5000),
            'start_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'end_date' => fake()->optional()->dateTimeBetween('now', '+5 years'),
            'description' => fake()->optional()->sentence(),
            'payment_day' => fake()->numberBetween(1, 28),
        ];
    }
}
