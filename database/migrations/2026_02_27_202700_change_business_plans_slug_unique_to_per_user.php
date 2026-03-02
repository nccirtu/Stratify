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
            $table->dropUnique('business_plans_slug_unique');
            $table->unique(['user_id', 'slug'], 'business_plans_user_slug_unique');
        });
    }

    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropUnique('business_plans_user_slug_unique');
            $table->unique('slug', 'business_plans_slug_unique');
        });
    }
};
