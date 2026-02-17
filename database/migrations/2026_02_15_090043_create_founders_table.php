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
        Schema::create('founders', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string('gender')->nullable();
            $table->string('year_of_birth')->nullable();
            $table->string('job_title')->nullable();
            $table->text('qualification')->nullable();
            $table->text('branch_knowledge')->nullable();
            $table->text('leadership_skills')->nullable();
            $table->text('area_of_responsibility')->nullable();
            $table->decimal('equity_percentage', 5, 2)->nullable();
            $table->decimal('salary_expectation', 10, 2)->nullable();
            $table->foreignId('business_plan_id')->nullable()->constrained('businessplans')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('founders');
    }
};
