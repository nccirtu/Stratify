export interface LiquidityRow {
    account_id: number | null;
    label: string;
    months: number[];
    total: number;
}

export interface LiquiditySection {
    key: string;
    label: string;
    rows: LiquidityRow[];
    summary: LiquidityRow;
}

export interface LiquidityBankAccount {
    name: string;
    dispo_limit: number;
    ist_months: number[];
    dispo_months: number[];
    available_months: number[];
}

export interface LiquidityPlanData {
    view: 'year' | 'week';
    year: number;
    iso_week: number | null;
    available_years: number[];
    columns: string[];
    opening_balance: number;
    sections: LiquiditySection[];
    net_cashflow: LiquidityRow;
    saldo: LiquidityRow;
    bank_accounts: LiquidityBankAccount[];
}
