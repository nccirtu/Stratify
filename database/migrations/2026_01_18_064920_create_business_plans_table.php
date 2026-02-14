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
        Schema::create('business_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('company_id')->constrained('companies')->cascadeOnDelete();
            $table->foreignId('branch_id')->nullable()->constrained('branches')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('status');
            $table->date('period_from');
            $table->date('period_until');
            $table->text('business_idea')->nullable();
            $table->string('currency')->nullable();
            $table->string('language')->nullable();
            $table->string('foundation_type')->nullable();
            $table->string('plan_recipient')->nullable();
            $table->text('corporate_purpose')->nullable();
            $table->text('benefits_offered')->nullable();
            $table->text('inspiration')->nullable();
            $table->text('experience')->nullable();
            $table->text('motivation')->nullable();
             $table->text('usp')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_plans');
    }
};
