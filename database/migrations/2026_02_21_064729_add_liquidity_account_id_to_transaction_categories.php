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
        Schema::table('transaction_categories', function (Blueprint $table) {
            $table->foreignId('liquidity_account_id')
                ->nullable()
                ->after('type')
                ->constrained('liquidity_accounts')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('transaction_categories', function (Blueprint $table) {
            $table->dropForeignIdFor(\App\Models\LiquidityAccount::class);
            $table->dropColumn('liquidity_account_id');
        });
    }
};
