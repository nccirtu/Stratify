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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('business_plan_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('transaction_categories');
            $table->foreignId('currency_id')->constrained();
            $table->foreignId('tax_id')->constrained();
            $table->foreignId('recurring_template_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('catalog_item_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->longText('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->decimal('total_amount', 15, 2);
            $table->string('status');
            $table->string('type');
            $table->date('date');
            $table->date('date_overdue')->nullable();
            $table->timestamp('paid_at')->nullable();
            $table->boolean('is_forecast')->default(false);
            $table->boolean('is_active')->default(true);
            $table->boolean('is_recurring')->default(false);
            $table->string('payment_method');
            $table->string('reference_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
