<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            // Step 13 – Kundenakquise & Vertrieb
            $table->json('acquiring_customers')->nullable()->after('channels');
            $table->json('acquiring_customers_online_shop')->nullable()->after('acquiring_customers');
            $table->string('acquiring_customers_create_online_shop')->nullable()->after('acquiring_customers_online_shop');
            $table->json('payment_methods')->nullable()->after('acquiring_customers_create_online_shop');
            $table->string('shipping_organization')->nullable()->after('payment_methods');
            $table->json('direct_sales_responsibility')->nullable()->after('shipping_organization');
            $table->json('existing_sales_structure')->nullable()->after('direct_sales_responsibility');
            $table->integer('direct_sales_staff_count')->nullable()->after('existing_sales_structure');
            $table->string('sales_compensation_model')->nullable()->after('direct_sales_staff_count');
            $table->string('plan_crm_introduction')->nullable()->after('sales_compensation_model');
            $table->json('field_service_infrastructure')->nullable()->after('plan_crm_introduction');
            $table->integer('field_service_staff_planned_count')->nullable()->after('field_service_infrastructure');
            // Step 14 – Marketing
            $table->json('marketing_channels')->nullable()->after('field_service_staff_planned_count');
            $table->json('social_ads_platforms')->nullable()->after('marketing_channels');
            $table->string('marketing_experience')->nullable()->after('social_ads_platforms');
            $table->json('marketing_responsibility')->nullable()->after('marketing_experience');
            $table->json('marketing_infrastructure')->nullable()->after('marketing_responsibility');
            $table->string('marketing_budget_monthly')->nullable()->after('marketing_infrastructure');
        });
    }

    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropColumn([
                'acquiring_customers',
                'acquiring_customers_online_shop',
                'acquiring_customers_create_online_shop',
                'payment_methods',
                'shipping_organization',
                'direct_sales_responsibility',
                'existing_sales_structure',
                'direct_sales_staff_count',
                'sales_compensation_model',
                'plan_crm_introduction',
                'field_service_infrastructure',
                'field_service_staff_planned_count',
                'marketing_channels',
                'social_ads_platforms',
                'marketing_experience',
                'marketing_responsibility',
                'marketing_infrastructure',
                'marketing_budget_monthly',
            ]);
        });
    }
};
