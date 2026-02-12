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
        Schema::create('business_plan_sections', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_plan_id')->constrained('business_plans')->cascadeOnDelete();
            $table->text('user_prompt')->nullable();
            $table->string('title');
            $table->text('text')->nullable();
            $table->integer('order_index')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_plan_sections');
    }
};
