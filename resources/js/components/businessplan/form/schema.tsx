import {
    FormSchema,
    TextInput,
    Textarea,
    Select,
    DatePicker,
    Toggle,
    Repeater,
    WizardStep,
} from '@nccirtu/tablefy/forms';

type SelectOption = { value: string; label: string; data?: Record<string, unknown> };

export interface BusinessPlanFormData {
    name: string;
    slug: string;
    description: string;
    company_id: string;
    branch_id: string;
    period_from: string;
    period_until: string;
    business_idea: string;
    currency_id: string;
    language: string;
    target_customers: string;
    customer_problems: string;
    location: string;
    solution_description: string;
    competitive_advantage: string;
    pricing_strategy: string;
    competitors: string;
    team_members: string;
    initial_investment: string;
    marketing_channels: string;
    revenue_model: string;
    milestones: string;
    risks: string;
    income_transactions: TransactionItem[];
    expense_transactions: TransactionItem[];
}

export interface TransactionItem {
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
}

export interface SchemaOptions {
    branches: SelectOption[];
    companies: SelectOption[];
    currencies: SelectOption[];
    taxes: SelectOption[];
    incomeCategories: SelectOption[];
    expenseCategories: SelectOption[];
    incomeCatalogItems: SelectOption[];
    expenseCatalogItems: SelectOption[];
}

const paymentMethods: SelectOption[] = [
    { value: 'bank_transfer', label: 'Überweisung' },
    { value: 'cash', label: 'Bar' },
    { value: 'credit_card', label: 'Kreditkarte' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'other', label: 'Sonstige' },
];

const frequencies: SelectOption[] = [
    { value: 'daily', label: 'Täglich' },
    { value: 'weekly', label: 'Wöchentlich' },
    { value: 'monthly', label: 'Monatlich' },
    { value: 'quarterly', label: 'Vierteljährlich' },
    { value: 'yearly', label: 'Jährlich' },
];

const languages: SelectOption[] = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
];

function buildTransactionRepeaterFields(
    catalogItems: SelectOption[],
    categories: SelectOption[],
    currencies: SelectOption[],
    taxes: SelectOption[],
) {
    return [
        Select.make<TransactionItem>('catalog_item_id')
            .label('Katalogartikel')
            .options(catalogItems)
            .searchable()
            .clearable()
            .placeholder('Aus Katalog wählen...'),
        TextInput.make<TransactionItem>('name').label('Name').required().maxLength(255),
        Textarea.make<TransactionItem>('description').label('Beschreibung').rows(2),
        TextInput.make<TransactionItem>('amount').label('Betrag').number().required().prefix('€'),
        Select.make<TransactionItem>('category_id')
            .label('Kategorie')
            .options(categories)
            .searchable()
            .placeholder('Kategorie wählen'),
        Select.make<TransactionItem>('currency_id').label('Währung').options(currencies).required().searchable(),
        Select.make<TransactionItem>('tax_id').label('Steuer').options(taxes).required().searchable(),
        DatePicker.make<TransactionItem>('date').label('Datum'),
        Select.make<TransactionItem>('payment_method')
            .label('Zahlungsmethode')
            .options(paymentMethods)
            .required(),
        Toggle.make<TransactionItem>('is_recurring').label('Wiederkehrend'),
        Select.make<TransactionItem>('frequency')
            .label('Häufigkeit')
            .options(frequencies)
            .dependsOn('is_recurring', (v) => v === true, 'show'),
        TextInput.make<TransactionItem>('day_of_month')
            .label('Tag im Monat')
            .number()
            .placeholder('1-31')
            .dependsOn('is_recurring', (v) => v === true, 'show'),
        DatePicker.make<TransactionItem>('start_date')
            .label('Startdatum')
            .dependsOn('is_recurring', (v) => v === true, 'show'),
        DatePicker.make<TransactionItem>('end_date')
            .label('Enddatum')
            .dependsOn('is_recurring', (v) => v === true, 'show'),
    ] as const;
}

export function buildBusinessPlanSchema(options: SchemaOptions) {
    return FormSchema.make<BusinessPlanFormData>()
        .title('Businessplan erstellen')
        .columns(2)
        .fields(
            // Step 1: Allgemein
            TextInput.make<BusinessPlanFormData>('name')
                .label('Name')
                .required()
                .placeholder('Name des Businessplans')
                .maxLength(255),
            TextInput.make<BusinessPlanFormData>('slug')
                .label('Slug')
                .required()
                .placeholder('wird-automatisch-generiert')
                .maxLength(255),
            Textarea.make<BusinessPlanFormData>('description')
                .label('Beschreibung')
                .rows(3)
                .columnSpan(2),

            // Step 2: Unternehmen
            Select.make<BusinessPlanFormData>('company_id')
                .label('Unternehmen')
                .options(options.companies)
                .required()
                .searchable()
                .placeholder('Unternehmen auswählen'),
            Select.make<BusinessPlanFormData>('branch_id')
                .label('Filiale')
                .options(options.branches)
                .searchable()
                .clearable()
                .placeholder('Filiale auswählen (optional)'),

            // Step 3: Zeitraum
            DatePicker.make<BusinessPlanFormData>('period_from').label('Von').placeholder('Startdatum'),
            DatePicker.make<BusinessPlanFormData>('period_until').label('Bis').placeholder('Enddatum'),

            // Step 4: Geschäftsidee
            Textarea.make<BusinessPlanFormData>('business_idea')
                .label('Geschäftsidee')
                .rows(5)
                .placeholder('Beschreiben Sie Ihre Geschäftsidee...')
                .columnSpan(2),
            Select.make<BusinessPlanFormData>('currency_id')
                .label('Währung')
                .options(options.currencies)
                .searchable()
                .placeholder('Währung auswählen'),
            Select.make<BusinessPlanFormData>('language')
                .label('Sprache')
                .options(languages)
                .placeholder('Sprache auswählen'),

            // Step 5: Zielgruppe & Markt
            Textarea.make<BusinessPlanFormData>('target_customers')
                .label('Zielkunden')
                .rows(4)
                .placeholder('Wer sind Ihre Zielkunden?')
                .columnSpan(2),
            Textarea.make<BusinessPlanFormData>('customer_problems')
                .label('Kundenprobleme')
                .rows(4)
                .placeholder('Welche Probleme lösen Sie?')
                .columnSpan(2),
            TextInput.make<BusinessPlanFormData>('location')
                .label('Standort')
                .placeholder('Standort des Unternehmens')
                .maxLength(255)
                .columnSpan(2),

            // Step 6: Lösung & Angebot
            Textarea.make<BusinessPlanFormData>('solution_description')
                .label('Lösungsbeschreibung')
                .rows(4)
                .placeholder('Wie lösen Sie das Problem?')
                .columnSpan(2),
            Textarea.make<BusinessPlanFormData>('competitive_advantage')
                .label('Wettbewerbsvorteil')
                .rows(4)
                .placeholder('Was unterscheidet Sie von der Konkurrenz?')
                .columnSpan(2),
            Textarea.make<BusinessPlanFormData>('pricing_strategy')
                .label('Preisstrategie')
                .rows(3)
                .placeholder('Wie gestalten Sie Ihre Preise?')
                .columnSpan(2),

            // Step 7: Wettbewerb
            Textarea.make<BusinessPlanFormData>('competitors')
                .label('Wettbewerber')
                .rows(5)
                .placeholder('Wer sind Ihre Wettbewerber?')
                .columnSpan(2),

            // Step 8: Team & Ressourcen
            Textarea.make<BusinessPlanFormData>('team_members')
                .label('Teammitglieder')
                .rows(4)
                .placeholder('Wer ist in Ihrem Team?')
                .columnSpan(2),
            TextInput.make<BusinessPlanFormData>('initial_investment')
                .label('Anfangsinvestition')
                .number()
                .prefix('€')
                .placeholder('0.00'),

            // Step 9: Marketing & Vertrieb
            Textarea.make<BusinessPlanFormData>('marketing_channels')
                .label('Marketingkanäle')
                .rows(4)
                .placeholder('Welche Kanäle nutzen Sie?')
                .columnSpan(2),
            Textarea.make<BusinessPlanFormData>('revenue_model')
                .label('Erlösmodell')
                .rows(4)
                .placeholder('Wie verdienen Sie Geld?')
                .columnSpan(2),

            // Step 10: Planung & Risiken
            Textarea.make<BusinessPlanFormData>('milestones')
                .label('Meilensteine')
                .rows(4)
                .placeholder('Welche Meilensteine planen Sie?')
                .columnSpan(2),
            Textarea.make<BusinessPlanFormData>('risks')
                .label('Risiken')
                .rows(4)
                .placeholder('Welche Risiken sehen Sie?')
                .columnSpan(2),

            // Step 11: Einnahmen
            Repeater.make<BusinessPlanFormData>('income_transactions')
                .label('Einnahmen')
                .fields(
                    ...buildTransactionRepeaterFields(
                        options.incomeCatalogItems,
                        options.incomeCategories,
                        options.currencies,
                        options.taxes,
                    ),
                )
                .addLabel('Einnahme hinzufügen')
                .columnSpan(2),

            // Step 12: Ausgaben
            Repeater.make<BusinessPlanFormData>('expense_transactions')
                .label('Ausgaben')
                .fields(
                    ...buildTransactionRepeaterFields(
                        options.expenseCatalogItems,
                        options.expenseCategories,
                        options.currencies,
                        options.taxes,
                    ),
                )
                .addLabel('Ausgabe hinzufügen')
                .columnSpan(2),
        )
        .wizard(
            WizardStep.make<BusinessPlanFormData>('Allgemein')
                .description('Grundlegende Informationen')
                .fields(['name', 'slug', 'description'])
                .canProceed((d) => !!d.name && !!d.slug),

            WizardStep.make<BusinessPlanFormData>('Unternehmen')
                .description('Unternehmen & Filiale')
                .fields(['company_id', 'branch_id'])
                .canProceed((d) => !!d.company_id),

            WizardStep.make<BusinessPlanFormData>('Zeitraum')
                .description('Planungszeitraum')
                .fields(['period_from', 'period_until']),

            WizardStep.make<BusinessPlanFormData>('Geschäftsidee')
                .description('Ihre Geschäftsidee')
                .fields(['business_idea', 'currency_id', 'language']),

            WizardStep.make<BusinessPlanFormData>('Zielgruppe & Markt')
                .description('Zielkunden und Markt')
                .fields(['target_customers', 'customer_problems', 'location']),

            WizardStep.make<BusinessPlanFormData>('Lösung & Angebot')
                .description('Ihr Lösungsangebot')
                .fields(['solution_description', 'competitive_advantage', 'pricing_strategy']),

            WizardStep.make<BusinessPlanFormData>('Wettbewerb')
                .description('Wettbewerbsanalyse')
                .fields(['competitors']),

            WizardStep.make<BusinessPlanFormData>('Team & Ressourcen')
                .description('Team und Investitionen')
                .fields(['team_members', 'initial_investment']),

            WizardStep.make<BusinessPlanFormData>('Marketing & Vertrieb')
                .description('Marketing und Vertrieb')
                .fields(['marketing_channels', 'revenue_model']),

            WizardStep.make<BusinessPlanFormData>('Planung & Risiken')
                .description('Meilensteine und Risiken')
                .fields(['milestones', 'risks']),

            WizardStep.make<BusinessPlanFormData>('Einnahmen')
                .description('Geplante Einnahmen')
                .fields(['income_transactions']),

            WizardStep.make<BusinessPlanFormData>('Ausgaben')
                .description('Geplante Ausgaben')
                .fields(['expense_transactions']),
        )
        .build();
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[äöüß]/g, (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] || c)
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}
