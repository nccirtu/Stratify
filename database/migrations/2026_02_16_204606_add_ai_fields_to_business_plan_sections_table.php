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
        Schema::table('business_plan_sections', function (Blueprint $table) {
            $table->string('section_type')->nullable()->after('title');
            $table->boolean('ai_generated')->default(false)->after('section_type');
            $table->text('generation_prompt')->nullable()->after('ai_generated');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('business_plan_sections', function (Blueprint $table) {
            $table->dropColumn([
                'section_type',
                'ai_generated',
                'generation_prompt',
            ]);
        });
    }
};
