<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            // Step 6: Produkte und Dienstleistungen
            $table->text('offer_type')->nullable()->after('scalable');
            $table->string('development_state')->nullable()->after('offer_type');
            $table->text('property_rights')->nullable()->after('development_state');
            $table->text('details_property_rights')->nullable()->after('property_rights');
            $table->string('pricing_stategie')->nullable()->after('details_property_rights');

            // Step 7: Markt und Wettbewerb
            $table->text('client_type')->nullable()->after('pricing_stategie');
            $table->string('target_market')->nullable()->after('client_type');

            // Step 8: Zielgruppe
            $table->text('purchase_decision')->nullable()->after('target_market');
            $table->string('age_group')->nullable()->after('purchase_decision');
            $table->string('life_situation')->nullable()->after('age_group');
            $table->text('information_target_group')->nullable()->after('life_situation');
            $table->text('company_target_group')->nullable()->after('information_target_group');
            $table->string('public_tenders')->nullable()->after('company_target_group');
            $table->text('channels')->nullable()->after('public_tenders');
        });
    }

    public function down(): void
    {
        Schema::table('business_plans', function (Blueprint $table) {
            $table->dropColumn([
                'offer_type',
                'development_state',
                'property_rights',
                'details_property_rights',
                'pricing_stategie',
                'client_type',
                'target_market',
                'purchase_decision',
                'age_group',
                'life_situation',
                'information_target_group',
                'company_target_group',
                'public_tenders',
                'channels',
            ]);
        });
    }
};
