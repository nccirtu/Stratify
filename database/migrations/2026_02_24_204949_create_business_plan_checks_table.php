<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_plan_checks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_plan_id')->constrained('business_plans')->cascadeOnDelete();
            $table->unsignedTinyInteger('check_group');
            $table->string('check_key');
            $table->string('check_label');
            $table->string('status')->default('pending'); // pending|running|success|warning|error
            $table->text('result')->nullable();
            $table->unsignedTinyInteger('score')->nullable();
            $table->timestamp('checked_at')->nullable();
            $table->timestamps();

            $table->unique(['business_plan_id', 'check_key']);
            $table->index(['business_plan_id', 'check_group']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_plan_checks');
    }
};
