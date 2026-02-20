<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            // Remove old foreign key and column
            $table->dropForeign(['company_id']);
            $table->dropColumn([
                'company_id',
                'business_idea',
                'currency',
                'language',
                'foundation_type',
                'plan_recipient',
                'corporate_purpose',
                'benefits_offered',
                'inspiration',
                'experience',
                'motivation',
                'target_customers',
                'location',
                'solution_description',
                'competitive_advantage',
                'pricing_strategy',
                'competitors',
                'team_members',
                'initial_investment',
                'marketing_channels',
                'revenue_model',
                'milestones',
                'risks',
            ]);

            // Add new columns
            $table->string('company_state')->nullable()->after('description');
            $table->date('handover_date')->nullable()->after('company_state');
            $table->date('existing_date')->nullable()->after('handover_date');
            $table->boolean('is_headquarter')->nullable()->after('existing_date');
            $table->string('company_name')->nullable()->after('is_headquarter');
            $table->text('company_description')->nullable()->after('company_name');
            $table->string('address')->nullable()->after('company_description');
            $table->string('zip_code')->nullable()->after('address');
            $table->string('city')->nullable()->after('zip_code');
            $table->string('state')->nullable()->after('city');
            $table->string('country')->nullable()->after('state');
            $table->string('expected_headquarters')->nullable()->after('country');
            $table->string('email')->nullable()->after('expected_headquarters');
            $table->string('phone')->nullable()->after('email');
            $table->string('website')->nullable()->after('phone');
            $table->string('logo')->nullable()->after('website');
            $table->string('businessplan_target')->nullable()->after('logo');
            $table->text('capital_usage')->nullable()->after('businessplan_target');
            $table->string('business_activities')->nullable()->after('capital_usage');
            $table->decimal('last_year_revenue', 10, 2)->nullable()->after('business_activities');
            $table->text('business_model')->nullable()->after('last_year_revenue');
            $table->string('inovation_level')->nullable()->after('business_model');
            $table->text('price_leadership')->nullable()->after('inovation_level');
            $table->text('quality_leadership')->nullable()->after('price_leadership');
            $table->text('specialist_leadership')->nullable()->after('quality_leadership');
            $table->text('technology_leadership')->nullable()->after('specialist_leadership');
            $table->text('exclusive_leadership')->nullable()->after('technology_leadership');
            $table->text('community_leadership')->nullable()->after('exclusive_leadership');
            $table->text('usp_text')->nullable()->after('community_leadership');
            $table->string('scalable')->nullable()->after('usp_text');
        });
    }

    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropColumn([
                'company_state', 'handover_date', 'existing_date', 'is_headquarter',
                'company_name', 'company_description', 'address', 'zip_code', 'city',
                'state', 'country', 'expected_headquarters', 'email', 'phone', 'website',
                'logo', 'businessplan_target', 'capital_usage', 'business_activities',
                'last_year_revenue', 'business_model', 'inovation_level',
                'price_leadership', 'quality_leadership', 'specialist_leadership',
                'technology_leadership', 'exclusive_leadership', 'community_leadership',
                'usp_text', 'scalable',
            ]);

            $table->unsignedBigInteger('company_id')->nullable()->after('branch_id');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            $table->text('business_idea')->nullable();
            $table->string('currency')->nullable();
            $table->string('language')->nullable();
            $table->string('foundation_type')->nullable();
            $table->string('plan_recipient')->nullable();
            $table->text('corporate_purpose')->nullable();
            $table->text('benefits_offered')->nullable();
            $table->text('inspiration')->nullable();
            $table->text('experience')->nullable();
            $table->text('motivation')->nullable();
            $table->text('target_customers')->nullable();
            $table->string('location')->nullable();
            $table->text('solution_description')->nullable();
            $table->text('competitive_advantage')->nullable();
            $table->text('pricing_strategy')->nullable();
            $table->text('competitors')->nullable();
            $table->text('team_members')->nullable();
            $table->decimal('initial_investment', 15, 2)->nullable();
            $table->text('marketing_channels')->nullable();
            $table->text('revenue_model')->nullable();
            $table->text('milestones')->nullable();
            $table->text('risks')->nullable();
        });
    }
};
