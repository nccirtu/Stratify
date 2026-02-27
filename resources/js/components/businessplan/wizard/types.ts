export interface BusinessPlanFormData {
    // Step 1 – Stammdaten
    name: string;
    slug: string;
    description: string;
    // Step 2 – Unternehmensdaten
    company_state: string;
    handover_date: string;
    existing_date: string;
    is_headquarter: string; // 'true' | 'false' for ToggleGroup
    company_name: string;
    branch_id: string;
    company_description: string;
    address: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    expected_headquarters: string;
    email: string;
    phone: string;
    website: string;
    logo: File | null;
    // Step 3 – Vorhaben
    businessplan_target: string;
    capital_usage: string[];
    period_from: string;
    period_until: string;
    // Step 4 – Details
    business_activities: string;
    last_year_revenue: string;
    business_model: string[];
    customer_problems: string;
    // Step 5 – USP & Skalierung
    inovation_level: string;
    usp: string[];
    price_leadership: string[];
    quality_leadership: string[];
    specialist_leadership: string[];
    technology_leadership: string[];
    exclusive_leadership: string[];
    community_leadership: string[];
    usp_text: string;
    scalable: string;
    // Step 6 – Produkte und Dienstleistungen
    offer_type: string[];
    development_state: string;
    property_rights: string[];
    details_property_rights: string;
    pricing_stategie: string;
    // Step 7 – Markt und Wettbewerb
    client_type: string[];
    target_market: string;
    // Step 8 – Zielgruppe
    purchase_decision: string[];
    age_group: string;
    life_situation: string;
    information_target_group: string[];
    company_target_group: string[];
    public_tenders: string;
    channels: string[];
    // Step 9 & 10 – Transaktionen
    income_transactions: TransactionItem[];
    expense_transactions: TransactionItem[];
    // Step 11 – Mitarbeiter
    employees: EmployeeItem[];
    // Step 12 – Darlehen
    loans: LoanItem[];
}

export interface TransactionItem {
    id?: string;
    catalog_item_id: string;
    name: string;
    description: string;
    amount: string;
    quantity: string;
    category_id: string;
    currency_id: string;
    tax_id: string;
    date: string;
    payment_method: string;
    is_recurring: boolean;
    frequency: string;
    day_of_month: string;
    start_date: string;
    end_date: string;
    type?: 'income' | 'expense';
}

export interface EmployeeItem {
    id?: string;
    job_title: string;
    number_of_employees: string;
    salary: string;
    date_of_hire: string;
    payment_day: string;
    working_hours_per_week: string;
    qualification: string;
    area_of_responsibility: string;
}

export interface LoanItem {
    id?: string;
    name: string;
    description: string;
    loan_amount: string;
    interest_rate: string;
    monthly_installment: string;
    start_date: string;
    end_date: string;
    payment_day: string;
}

export type SelectOption = {
    value: string;
    label: string;
    tooltip?: string;
    data?: Record<string, unknown>;
};

export interface EnumOptions {
    companyStates: SelectOption[];
    businessplanTargets: SelectOption[];
    capitalUsages: SelectOption[];
    businessActivities: SelectOption[];
    businessModels: SelectOption[];
    inovationLevels: SelectOption[];
    usps: SelectOption[];
    priceLeaderships: SelectOption[];
    qualityLeaderships: SelectOption[];
    specialistLeaderships: SelectOption[];
    technologyLeaderships: SelectOption[];
    exclusiveLeaderships: SelectOption[];
    communityLeaderships: SelectOption[];
    scalableCapabilities: SelectOption[];
    offerTypes: SelectOption[];
    developmentStates: SelectOption[];
    propertyRights: SelectOption[];
    pricingStrategies: SelectOption[];
    clientTypes: SelectOption[];
    targetMarkets: SelectOption[];
    purchaseDecisions: SelectOption[];
    ageGroups: SelectOption[];
    lifeSituations: SelectOption[];
    informationTargetGroups: SelectOption[];
    companyTargetGroups: SelectOption[];
    publicTenders: SelectOption[];
    channels: SelectOption[];
}

export interface WizardStepProps {
    data: BusinessPlanFormData;
    setData: (data: Partial<BusinessPlanFormData>) => void;
    errors: Record<string, string>;
    options: {
        branches: SelectOption[];
        currencies: SelectOption[];
        taxes: SelectOption[];
        incomeCategories: SelectOption[];
        expenseCategories: SelectOption[];
        incomeCatalogItems: SelectOption[];
        expenseCatalogItems: SelectOption[];
        enumOptions: EnumOptions;
    };
    businessPlanId?: number | null;
}
