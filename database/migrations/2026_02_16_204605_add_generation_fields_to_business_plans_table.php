<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            // Reverse Engineering Fragen - Zielgruppe & Markt
            $table->text('target_customers')->nullable();
            $table->text('customer_problems')->nullable();
            $table->string('location')->nullable();

            // Reverse Engineering Fragen - Lösung & Angebot
            $table->text('solution_description')->nullable();
            $table->text('competitive_advantage')->nullable();
            $table->text('pricing_strategy')->nullable();

            // Reverse Engineering Fragen - Wettbewerb
            $table->text('competitors')->nullable();

            // Reverse Engineering Fragen - Team & Ressourcen
            $table->text('team_members')->nullable();
            $table->decimal('initial_investment', 15, 2)->nullable();

            // Reverse Engineering Fragen - Marketing & Vertrieb
            $table->text('marketing_channels')->nullable();
            $table->text('revenue_model')->nullable();

            // Reverse Engineering Fragen - Planung
            $table->text('milestones')->nullable();
            $table->text('risks')->nullable();

            // Generation Status
            $table->string('generation_status')->default('pending');
            $table->timestamp('generation_started_at')->nullable();
            $table->timestamp('generation_completed_at')->nullable();
            $table->decimal('generation_cost', 10, 6)->default(0);
            $table->text('generation_error')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropColumn([
                'target_customers',
                'customer_problems',
                'location',
                'solution_description',
                'competitive_advantage',
                'pricing_strategy',
                'competitors',
                'team_members',
                'initial_investment',
                'marketing_channels',
                'revenue_model',
                'milestones',
                'risks',
                'generation_status',
                'generation_started_at',
                'generation_completed_at',
                'generation_cost',
                'generation_error',
            ]);
        });
    }
};
