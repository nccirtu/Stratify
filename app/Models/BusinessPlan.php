<?php

namespace App\Models;

use App\Enums\CompanyStateEnum;
use App\Enums\StatusEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BusinessPlan extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'is_active',
        'branch_id',
        'user_id',
        'status',
        'company_state',
        'handover_date',
        'existing_date',
        'is_headquarter',
        'company_name',
        'company_description',
        'address',
        'zip_code',
        'city',
        'state',
        'country',
        'expected_headquarters',
        'email',
        'phone',
        'website',
        'logo',
        'businessplan_target',
        'capital_usage',
        'period_from',
        'period_until',
        'business_activities',
        'last_year_revenue',
        'business_model',
        'customer_problems',
        'inovation_level',
        'usp',
        'price_leadership',
        'quality_leadership',
        'specialist_leadership',
        'technology_leadership',
        'exclusive_leadership',
        'community_leadership',
        'usp_text',
        'scalable',
        // Step 6: Produkte und Dienstleistungen
        'offer_type',
        'development_state',
        'property_rights',
        'details_property_rights',
        'pricing_stategie',
        // Step 7: Markt und Wettbewerb
        'client_type',
        'target_market',
        // Step 8: Zielgruppe
        'purchase_decision',
        'age_group',
        'life_situation',
        'information_target_group',
        'company_target_group',
        'public_tenders',
        'channels',
    ];

    public function casts(): array
    {
        return [
            'name' => 'string',
            'slug' => 'string',
            'description' => 'string',
            'is_active' => 'boolean',
            'is_headquarter' => 'boolean',
            'branch_id' => 'integer',
            'user_id' => 'integer',
            'status' => StatusEnum::class,
            'company_state' => CompanyStateEnum::class,
            'period_from' => 'date',
            'period_until' => 'date',
            'last_year_revenue' => 'decimal:2',
            'capital_usage' => 'array',
            'business_model' => 'array',
            'usp' => 'array',
            'price_leadership' => 'array',
            'quality_leadership' => 'array',
            'specialist_leadership' => 'array',
            'technology_leadership' => 'array',
            'exclusive_leadership' => 'array',
            'community_leadership' => 'array',
            'offer_type' => 'array',
            'property_rights' => 'array',
            'client_type' => 'array',
            'purchase_decision' => 'array',
            'information_target_group' => 'array',
            'company_target_group' => 'array',
            'channels' => 'array',
        ];
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branches::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessPlanSections(): HasMany
    {
        return $this->hasMany(BusinessPlanSection::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function founders(): HasMany
    {
        return $this->hasMany(Founder::class);
    }

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }

    public function serviceProviders(): HasMany
    {
        return $this->hasMany(ServiceProvider::class);
    }
}
