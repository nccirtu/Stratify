import { router } from '@inertiajs/react';
import {
    DatePicker,
    FormRenderer,
    FormSchema,
    Repeater,
    Select,
    Textarea,
    TextInput,
    Toggle,
    WizardStep,
} from '@nccirtu/tablefy/forms';
import { useInertiaForm } from '@nccirtu/tablefy/inertia';
import { useCallback, useEffect, useMemo } from 'react';

import { update as updateBusinessPlan } from '@/wayfinder/routes/businessplan';
import { App } from '@/wayfinder/types';

// ... (SelectOption, TransactionItem types - same as before)
type SelectOption = {
    value: string;
    label: string;
    data?: Record<string, unknown>;
};

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

export interface EditWizardOptions {
    branches: SelectOption[];
    companies: SelectOption[];
    currencies: SelectOption[];
    taxes: SelectOption[];
    incomeCategories: SelectOption[];
    expenseCategories: SelectOption[];
    incomeCatalogItems: SelectOption[];
    expenseCatalogItems: SelectOption[];
    businessPlan: App.Models.BusinessPlan; // Required
    step: number; // Required
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
        TextInput.make<TransactionItem>('name')
            .label('Name')
            .required()
            .maxLength(255),
        Textarea.make<TransactionItem>('description')
            .label('Beschreibung')
            .rows(2),
        TextInput.make<TransactionItem>('amount')
            .label('Betrag')
            .number()
            .required()
            .prefix('€'),
        Select.make<TransactionItem>('category_id')
            .label('Kategorie')
            .options(categories)
            .searchable()
            .placeholder('Kategorie wählen'),
        Select.make<TransactionItem>('currency_id')
            .label('Währung')
            .options(currencies)
            .required()
            .searchable(),
        Select.make<TransactionItem>('tax_id')
            .label('Steuer')
            .options(taxes)
            .required()
            .searchable(),
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

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(
            /[äöüß]/g,
            (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] || c,
        )
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function EditBusinessPlanWizard(props: EditWizardOptions) {
    const { businessPlan, step } = props;

    // Initial Data
    const initialData = useMemo(() => {
        return {
            ...businessPlan,
            income_transactions:
                businessPlan.transactions?.filter(
                    (t: any) => t.type === 'income',
                ) || [],
            expense_transactions:
                businessPlan.transactions?.filter(
                    (t: any) => t.type === 'expense',
                ) || [],
            create_new_company: false,
            new_company_name: '',
        } as unknown as BusinessPlanFormData;
    }, [businessPlan]);

    // Handle "Save and Continue" logic
    const handleBeforeNext = useCallback(
        (stepIndex: number, data: BusinessPlanFormData) => {
            return new Promise<boolean>((resolve) => {
                const currentStep = stepIndex + 1; // 1-based

                router.put(
                    updateBusinessPlan(businessPlan.id).url,
                    {
                        ...data,
                        current_step: currentStep,
                    } as any,
                    {
                        preserveState: true,
                        preserveScroll: true,
                        onSuccess: () => resolve(true),
                        onError: () => resolve(false),
                    },
                );
            });
        },
        [businessPlan.id],
    );

    const schema = useMemo(
        () =>
            FormSchema.make<BusinessPlanFormData>()
                .title(`Businessplan bearbeiten: ${businessPlan.name}`)
                .columns(1)
                .fields(
                    // Step 1: Allgemein
                    TextInput.make<BusinessPlanFormData>('name')
                        .label('Name')
                        .required()
                        .maxLength(255),
                    TextInput.make<BusinessPlanFormData>('slug')
                        .label('Slug')
                        .required()
                        .maxLength(255),
                    Textarea.make<BusinessPlanFormData>('description')
                        .label('Beschreibung')
                        .rows(3),

                    // Step 2: Unternehmen
                    Toggle.make<BusinessPlanFormData>('create_new_company')
                        .label('Neues Unternehmen erstellen')
                        .helperText(
                            'Aktivieren Sie dies, um ein neues Unternehmen anzulegen.',
                        ),

                    Select.make<BusinessPlanFormData>('company_id')
                        .label('Unternehmen')
                        .options(props.companies)
                        .required()
                        .searchable()
                        .placeholder('Unternehmen auswählen')
                        .dependsOn('create_new_company', (v) => !v, 'show'),

                    TextInput.make<BusinessPlanFormData>('new_company_name')
                        .label('Unternehmensname')
                        .required()
                        .dependsOn(
                            'create_new_company',
                            (v) => v === true,
                            'show',
                        ),

                    Select.make<BusinessPlanFormData>('branch_id')
                        .label('Branche')
                        .options(props.branches)
                        .searchable()
                        .clearable()
                        .placeholder('Branche auswählen (optional)'),

                    // Step 3: Zeitraum
                    DatePicker.make<BusinessPlanFormData>('period_from').label(
                        'Von',
                    ),
                    DatePicker.make<BusinessPlanFormData>('period_until').label(
                        'Bis',
                    ),

                    // Step 4: Geschäftsidee
                    Textarea.make<BusinessPlanFormData>('business_idea')
                        .label('Geschäftsidee')
                        .rows(5)
                        .columnSpan(2),
                    Select.make<BusinessPlanFormData>('currency_id')
                        .label('Währung')
                        .options(props.currencies)
                        .searchable(),
                    Select.make<BusinessPlanFormData>('language')
                        .label('Sprache')
                        .options(languages),

                    // Step 5: Zielgruppe & Markt
                    Textarea.make<BusinessPlanFormData>('target_customers')
                        .label('Zielkunden')
                        .rows(4)
                        .columnSpan(2),
                    Textarea.make<BusinessPlanFormData>('customer_problems')
                        .label('Kundenprobleme')
                        .rows(4)
                        .columnSpan(2),
                    TextInput.make<BusinessPlanFormData>('location')
                        .label('Standort')
                        .maxLength(255)
                        .columnSpan(2),

                    // Step 6: Lösung & Angebot
                    Textarea.make<BusinessPlanFormData>('solution_description')
                        .label('Lösungsbeschreibung')
                        .rows(4)
                        .columnSpan(2),
                    Textarea.make<BusinessPlanFormData>('competitive_advantage')
                        .label('Wettbewerbsvorteil')
                        .rows(4)
                        .columnSpan(2),
                    Textarea.make<BusinessPlanFormData>('pricing_strategy')
                        .label('Preisstrategie')
                        .rows(3)
                        .columnSpan(2),

                    // Step 7: Wettbewerb
                    Textarea.make<BusinessPlanFormData>('competitors')
                        .label('Wettbewerber')
                        .rows(5)
                        .columnSpan(2),

                    // Step 8: Team & Ressourcen
                    Textarea.make<BusinessPlanFormData>('team_members')
                        .label('Teammitglieder')
                        .rows(4)
                        .columnSpan(2),
                    TextInput.make<BusinessPlanFormData>('initial_investment')
                        .label('Anfangsinvestition')
                        .number()
                        .prefix('€'),

                    // Step 9: Marketing & Vertrieb
                    Textarea.make<BusinessPlanFormData>('marketing_channels')
                        .label('Marketingkanäle')
                        .rows(4)
                        .columnSpan(2),
                    Textarea.make<BusinessPlanFormData>('revenue_model')
                        .label('Erlösmodell')
                        .rows(4)
                        .columnSpan(2),

                    // Step 10: Planung & Risiken
                    Textarea.make<BusinessPlanFormData>('milestones')
                        .label('Meilensteine')
                        .rows(4)
                        .columnSpan(2),
                    Textarea.make<BusinessPlanFormData>('risks')
                        .label('Risiken')
                        .rows(4)
                        .columnSpan(2),

                    // Step 11: Einnahmen
                    Repeater.make<BusinessPlanFormData>('income_transactions')
                        .label('Einnahmen')
                        .fields(
                            ...buildTransactionRepeaterFields(
                                props.incomeCatalogItems,
                                props.incomeCategories,
                                props.currencies,
                                props.taxes,
                            ),
                        )
                        .addLabel('Einnahme hinzufügen')
                        .collapsible()
                        .columnSpan(2),

                    // Step 12: Ausgaben
                    Repeater.make<BusinessPlanFormData>('expense_transactions')
                        .label('Ausgaben')
                        .fields(
                            ...buildTransactionRepeaterFields(
                                props.expenseCatalogItems,
                                props.expenseCategories,
                                props.currencies,
                                props.taxes,
                            ),
                        )
                        .addLabel('Ausgabe hinzufügen')
                        .collapsible()
                        .columnSpan(2),
                )
                .wizard(
                    WizardStep.make<BusinessPlanFormData>('Allgemein')
                        .fields(['name', 'slug', 'description'])
                        .canProceed((d) => !!d.name && !!d.slug)
                        .beforeNext((d) => handleBeforeNext(0, d)),

                    WizardStep.make<BusinessPlanFormData>('Unternehmen')
                        .fields([
                            'create_new_company',
                            'company_id',
                            'new_company_name',
                            'branch_id',
                        ])
                        .canProceed((d) =>
                            d.create_new_company
                                ? !!d.new_company_name
                                : !!d.company_id,
                        )
                        .beforeNext((d) => handleBeforeNext(1, d)),

                    WizardStep.make<BusinessPlanFormData>('Zeitraum')
                        .fields(['period_from', 'period_until'])
                        .beforeNext((d) => handleBeforeNext(2, d)),

                    WizardStep.make<BusinessPlanFormData>('Geschäftsidee')
                        .fields(['business_idea', 'currency_id', 'language'])
                        .beforeNext((d) => handleBeforeNext(3, d)),

                    WizardStep.make<BusinessPlanFormData>('Zielgruppe & Markt')
                        .fields([
                            'target_customers',
                            'customer_problems',
                            'location',
                        ])
                        .beforeNext((d) => handleBeforeNext(4, d)),

                    WizardStep.make<BusinessPlanFormData>('Lösung & Angebot')
                        .fields([
                            'solution_description',
                            'competitive_advantage',
                            'pricing_strategy',
                        ])
                        .beforeNext((d) => handleBeforeNext(5, d)),

                    WizardStep.make<BusinessPlanFormData>('Wettbewerb')
                        .fields(['competitors'])
                        .beforeNext((d) => handleBeforeNext(6, d)),

                    WizardStep.make<BusinessPlanFormData>('Team & Ressourcen')
                        .fields(['team_members', 'initial_investment'])
                        .beforeNext((d) => handleBeforeNext(7, d)),

                    WizardStep.make<BusinessPlanFormData>(
                        'Marketing & Vertrieb',
                    )
                        .fields(['marketing_channels', 'revenue_model'])
                        .beforeNext((d) => handleBeforeNext(8, d)),

                    WizardStep.make<BusinessPlanFormData>('Planung & Risiken')
                        .fields(['milestones', 'risks'])
                        .beforeNext((d) => handleBeforeNext(9, d)),

                    WizardStep.make<BusinessPlanFormData>('Einnahmen')
                        .fields(['income_transactions'])
                        .beforeNext((d) => handleBeforeNext(10, d)),

                    WizardStep.make<BusinessPlanFormData>('Ausgaben').fields([
                        'expense_transactions',
                    ]),
                    // Last step
                )
                .actions((a) => a.submit({ label: 'Fertigstellen' }))
                .build(),
        [props, businessPlan, languages, handleBeforeNext],
    );

    // Manual data management since we need to inject initialData imperatively
    const { data, setData, errors, onChange, onSubmit, processing } =
        useInertiaForm<BusinessPlanFormData>({
            schema,
            url: updateBusinessPlan(businessPlan.id).url,
            method: 'put',
        });

    useEffect(() => {
        if (initialData) {
            // @ts-ignore
            setData(initialData);
        }
    }, [initialData]);

    const handleChange = (field: keyof BusinessPlanFormData, value: any) => {
        onChange(field, value);

        if (field === 'name' && typeof value === 'string') {
            onChange('slug', slugify(value));
        }

        if (field === 'income_transactions' && Array.isArray(value)) {
            autoFillCatalogItems(
                value,
                data.income_transactions,
                props.incomeCatalogItems,
                (updated) => onChange('income_transactions', updated),
            );
        }

        if (field === 'expense_transactions' && Array.isArray(value)) {
            autoFillCatalogItems(
                value,
                data.expense_transactions,
                props.expenseCatalogItems,
                (updated) => onChange('expense_transactions', updated),
            );
        }
    };

    return (
        <FormRenderer
            schema={schema}
            data={data}
            errors={errors}
            onChange={handleChange}
            onSubmit={onSubmit}
            processing={processing}
            // @ts-ignore
            defaultStep={step - 1}
        />
    );
}

function autoFillCatalogItems(
    items: TransactionItem[],
    prevItems: TransactionItem[] | undefined,
    catalogOptions: SelectOption[],
    setItems: (items: TransactionItem[]) => void,
) {
    let changed = false;
    const updated = items.map((item, index) => {
        const prev = prevItems?.[index];
        if (
            item.catalog_item_id &&
            item.catalog_item_id !== prev?.catalog_item_id
        ) {
            const catalogItem = catalogOptions.find(
                (c) => c.value === item.catalog_item_id,
            );
            if (catalogItem?.data) {
                changed = true;
                return {
                    ...item,
                    name: String(catalogItem.data.name ?? item.name),
                    description: String(
                        catalogItem.data.description ?? item.description,
                    ),
                    amount: String(
                        catalogItem.data.default_amount ?? item.amount,
                    ),
                    category_id: String(
                        catalogItem.data.transaction_category_id ??
                            item.category_id,
                    ),
                    currency_id: String(
                        catalogItem.data.currency_id ?? item.currency_id,
                    ),
                    tax_id: String(catalogItem.data.tax_id ?? item.tax_id),
                };
            }
        }
        return item;
    });
    if (changed) {
        setItems(updated);
    }
}
