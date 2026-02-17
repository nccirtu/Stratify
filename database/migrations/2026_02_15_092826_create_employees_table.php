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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->integer('number_of_employees');
            $table->text('qualification')->nullable();
            $table->text('experience')->nullable();
            $table->text('area_of_responsibility')->nullable();
            $table->decimal('working_hours_per_week', 5, 2)->nullable();
            $table->date('date_of_hire')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->foreignId('business_plan_id')->nullable()->constrained('businessplans')->nullOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
