<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $employees = DB::table('employees')->get();

        Schema::disableForeignKeyConstraints();
        Schema::drop('employees');

        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->integer('number_of_employees')->default(1);
            $table->text('qualification')->nullable();
            $table->text('experience')->nullable();
            $table->text('area_of_responsibility')->nullable();
            $table->decimal('working_hours_per_week', 5, 2)->nullable();
            $table->date('date_of_hire')->nullable();
            $table->decimal('salary', 10, 2)->nullable();
            $table->integer('payment_day')->default(1);
            $table->foreignId('business_plan_id')->nullable()->constrained('business_plans')->nullOnDelete();
            $table->timestamps();
        });

        foreach ($employees as $employee) {
            DB::table('employees')->insert((array) $employee);
        }

        Schema::enableForeignKeyConstraints();
    }

    public function down(): void
    {
        $employees = DB::table('employees')->get();

        Schema::disableForeignKeyConstraints();
        Schema::drop('employees');

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
            $table->integer('payment_day')->default(1);
            $table->foreignId('business_plan_id')->nullable()->constrained('businessplans')->nullOnDelete();
            $table->timestamps();
        });

        foreach ($employees as $employee) {
            DB::table('employees')->insert((array) $employee);
        }

        Schema::enableForeignKeyConstraints();
    }
};
