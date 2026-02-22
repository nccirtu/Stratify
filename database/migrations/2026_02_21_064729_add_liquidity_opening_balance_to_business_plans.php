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
            $table->decimal('liquidity_opening_balance', 15, 2)->default(0)->after('period_until');
        });
    }

    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropColumn('liquidity_opening_balance');
        });
    }
};
