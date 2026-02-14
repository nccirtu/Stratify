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
            $table->foreignId('company_id')->nullable()->change();
            $table->string('status')->nullable()->change();
            $table->date('period_from')->nullable()->change();
            $table->date('period_until')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->foreignId('company_id')->nullable(false)->change();
            $table->string('status')->nullable(false)->change();
            $table->date('period_from')->nullable(false)->change();
            $table->date('period_until')->nullable(false)->change();
        });
    }
};
