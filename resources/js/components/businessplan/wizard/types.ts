export interface BusinessPlanFormData {
    name: string;
    slug: string;
    description: string;
    // Company Step
    company_id: string;
    create_new_company: boolean;
    new_company_name: string;
    branch_id: string;
    // Step 3
    period_from: string;
    period_until: string;
    // Step 4
    business_idea: string;
    currency_id: string;
    language: string;
    // Step 5
    target_customers: string;
    customer_problems: string;
    location: string;
    // Step 6
    solution_description: string;
    competitive_advantage: string;
    pricing_strategy: string;
    // Step 7
    competitors: string;
    // Step 8
    team_members: string;
    initial_investment: string;
    // Step 9
    marketing_channels: string;
    revenue_model: string;
    // Step 10
    milestones: string;
    risks: string;
    // Step 11 & 12
    income_transactions: TransactionItem[];
    expense_transactions: TransactionItem[];
}

export interface TransactionItem {
    id?: string; // Optional for new items
    catalog_item_id: string;
    name: string;
    description: string;
    amount: string;
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

export type SelectOption = {
    value: string;
    label: string;
    data?: Record<string, unknown>;
};

export interface WizardStepProps {
    data: BusinessPlanFormData;
    setData: (data: Partial<BusinessPlanFormData>) => void;
    errors: Record<string, string>;
    options: {
        branches: SelectOption[];
        companies: SelectOption[];
        currencies: SelectOption[];
        taxes: SelectOption[];
        incomeCategories: SelectOption[];
        expenseCategories: SelectOption[];
        incomeCatalogItems: SelectOption[];
        expenseCatalogItems: SelectOption[];
    };
}
