<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
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
            'job_title' => fake()->jobTitle(),
            'number_of_employees' => fake()->numberBetween(1, 5),
            'salary' => fake()->randomFloat(2, 2000, 8000),
            'date_of_hire' => fake()->dateTimeBetween('-2 years', 'now'),
            'working_hours_per_week' => 40,
            'payment_day' => 1,
        ];
    }
}
