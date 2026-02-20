import { router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Step1General from '../wizard/Step1General';
import Step2Company from '../wizard/Step2Company';
import Step3Vorhaben from '../wizard/Step3Period';
import Step4Details from '../wizard/Step4BusinessIdea';
import Step5Usp from '../wizard/Step5TargetMarket';
import Step6Products from '../wizard/Step6Products';
import Step7Market from '../wizard/Step7Market';
import Step8TargetGroup from '../wizard/Step8TargetGroup';
import Step9Income from '../wizard/Step9Income';
import Step10Expenses from '../wizard/Step10Expenses';
import type {
    BusinessPlanFormData,
    EnumOptions,
    SelectOption,
    WizardStepProps,
} from '../wizard/types';

const STEPS = [
    { label: 'Stammdaten', component: Step1General },
    { label: 'Unternehmensdaten', component: Step2Company },
    { label: 'Vorhaben', component: Step3Vorhaben },
    { label: 'Details', component: Step4Details },
    { label: 'USP & Skalierung', component: Step5Usp },
    { label: 'Produkte & DL', component: Step6Products },
    { label: 'Markt', component: Step7Market },
    { label: 'Zielgruppe', component: Step8TargetGroup },
    { label: 'Einnahmen', component: Step9Income },
    { label: 'Ausgaben', component: Step10Expenses },
] as const;

export interface WizardOptions {
    branches: SelectOption[];
    currencies: SelectOption[];
    taxes: SelectOption[];
    incomeCategories: SelectOption[];
    expenseCategories: SelectOption[];
    incomeCatalogItems: SelectOption[];
    expenseCatalogItems: SelectOption[];
    enumOptions: EnumOptions;
}

export interface CreateBusinessPlanWizardProps {
    businessPlan?: any;
    initialStep?: number;
    options: WizardOptions;
}

const defaultFormData: BusinessPlanFormData = {
    // Step 1
    name: '',
    slug: '',
    description: '',
    // Step 2
    company_state: '',
    handover_date: '',
    existing_date: '',
    is_headquarter: '',
    company_name: '',
    branch_id: '',
    company_description: '',
    address: '',
    zip_code: '',
    city: '',
    state: '',
    country: '',
    expected_headquarters: '',
    email: '',
    phone: '',
    website: '',
    logo: null,
    // Step 3
    businessplan_target: '',
    capital_usage: [],
    period_from: '',
    period_until: '',
    // Step 4
    business_activities: '',
    last_year_revenue: '',
    business_model: [],
    customer_problems: '',
    // Step 5
    inovation_level: '',
    usp: [],
    price_leadership: [],
    quality_leadership: [],
    specialist_leadership: [],
    technology_leadership: [],
    exclusive_leadership: [],
    community_leadership: [],
    usp_text: '',
    scalable: '',
    // Step 6 – Produkte und Dienstleistungen
    offer_type: [],
    development_state: '',
    property_rights: [],
    details_property_rights: '',
    pricing_stategie: '',
    // Step 7 – Markt und Wettbewerb
    client_type: [],
    target_market: '',
    // Step 8 – Zielgruppe
    purchase_decision: [],
    age_group: '',
    life_situation: '',
    information_target_group: [],
    company_target_group: [],
    public_tenders: '',
    channels: [],
    // Step 9 & 10
    income_transactions: [],
    expense_transactions: [],
};

function buildInitialData(businessPlan?: any): BusinessPlanFormData {
    if (!businessPlan) {
        return { ...defaultFormData };
    }

    return {
        ...defaultFormData,
        ...businessPlan,
        branch_id: businessPlan.branch_id ? String(businessPlan.branch_id) : '',
        is_headquarter:
            businessPlan.is_headquarter === true
                ? 'true'
                : businessPlan.is_headquarter === false
                  ? 'false'
                  : '',
        capital_usage: Array.isArray(businessPlan.capital_usage)
            ? businessPlan.capital_usage
            : [],
        business_model: Array.isArray(businessPlan.business_model)
            ? businessPlan.business_model
            : [],
        usp: Array.isArray(businessPlan.usp) ? businessPlan.usp : [],
        price_leadership: Array.isArray(businessPlan.price_leadership)
            ? businessPlan.price_leadership
            : [],
        quality_leadership: Array.isArray(businessPlan.quality_leadership)
            ? businessPlan.quality_leadership
            : [],
        specialist_leadership: Array.isArray(businessPlan.specialist_leadership)
            ? businessPlan.specialist_leadership
            : [],
        technology_leadership: Array.isArray(businessPlan.technology_leadership)
            ? businessPlan.technology_leadership
            : [],
        exclusive_leadership: Array.isArray(businessPlan.exclusive_leadership)
            ? businessPlan.exclusive_leadership
            : [],
        community_leadership: Array.isArray(businessPlan.community_leadership)
            ? businessPlan.community_leadership
            : [],
        logo: null,
        offer_type: Array.isArray(businessPlan.offer_type) ? businessPlan.offer_type : [],
        property_rights: Array.isArray(businessPlan.property_rights) ? businessPlan.property_rights : [],
        client_type: Array.isArray(businessPlan.client_type) ? businessPlan.client_type : [],
        purchase_decision: Array.isArray(businessPlan.purchase_decision) ? businessPlan.purchase_decision : [],
        information_target_group: Array.isArray(businessPlan.information_target_group) ? businessPlan.information_target_group : [],
        company_target_group: Array.isArray(businessPlan.company_target_group) ? businessPlan.company_target_group : [],
        channels: Array.isArray(businessPlan.channels) ? businessPlan.channels : [],
        income_transactions:
            businessPlan.transactions?.filter(
                (t: any) => t.type === 'income',
            ) || [],
        expense_transactions:
            businessPlan.transactions?.filter(
                (t: any) => t.type === 'expense',
            ) || [],
    };
}

function getCsrfToken(): string {
    return (
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? ''
    );
}

export default function CreateBusinessPlanWizard({
    businessPlan,
    initialStep = 0,
    options,
}: CreateBusinessPlanWizardProps) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [data, setData] = useState<BusinessPlanFormData>(() =>
        buildInitialData(businessPlan),
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);
    const [businessPlanId, setBusinessPlanId] = useState<number | null>(
        businessPlan?.id ?? null,
    );
    const [savedSteps, setSavedSteps] = useState<Set<number>>(() => {
        if (!businessPlan?.id) {
            return new Set();
        }
        const set = new Set<number>();
        for (let i = 0; i < initialStep; i++) {
            set.add(i);
        }
        return set;
    });

    const handleSetData = useCallback(
        (patch: Partial<BusinessPlanFormData>) => {
            setData((prev) => ({ ...prev, ...patch }));
        },
        [],
    );

    const saveStep = async (stepIndex: number): Promise<boolean> => {
        setProcessing(true);
        setErrors({});

        try {
            const stepNumber = stepIndex + 1;
            const csrfToken = getCsrfToken();

            // Step 1 on a new plan → POST to create
            if (stepIndex === 0 && !businessPlanId) {
                const response = await fetch('/businessplans', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: JSON.stringify({
                        name: data.name,
                        slug: data.slug,
                        description: data.description,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setBusinessPlanId(result.businessPlan.id);
                    setSavedSteps((prev) => new Set(prev).add(stepIndex));
                    setProcessing(false);
                    return true;
                }

                if (response.status === 422) {
                    const errorData = await response.json();
                    setErrors(errorData.errors ?? {});
                }
                setProcessing(false);
                return false;
            }

            const id = businessPlanId;
            if (!id) {
                setProcessing(false);
                return false;
            }

            // Step 2 may contain a logo file → use FormData
            if (stepIndex === 1 && data.logo instanceof File) {
                const formData = new FormData();
                formData.append('step', String(stepNumber));
                formData.append('_method', 'PUT');

                const step2Fields = [
                    'company_state',
                    'handover_date',
                    'existing_date',
                    'is_headquarter',
                    'company_name',
                    'branch_id',
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
                ] as const;

                step2Fields.forEach((key) => {
                    const value = data[key];
                    if (value !== undefined && value !== null) {
                        formData.append(key, String(value));
                    }
                });

                formData.append('logo', data.logo);

                const response = await fetch(
                    `/businessplans/${id}/save-step`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'X-CSRF-TOKEN': csrfToken,
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        body: formData,
                    },
                );

                if (response.ok) {
                    setSavedSteps((prev) => new Set(prev).add(stepIndex));
                    setProcessing(false);
                    return true;
                }

                if (response.status === 422) {
                    const errorData = await response.json();
                    setErrors(errorData.errors ?? {});
                }
                setProcessing(false);
                return false;
            }

            // All other steps → JSON
            const response = await fetch(`/businessplans/${id}/save-step`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({ ...data, step: stepNumber }),
            });

            if (response.ok) {
                setSavedSteps((prev) => new Set(prev).add(stepIndex));
                setProcessing(false);
                return true;
            }

            if (response.status === 422) {
                const errorData = await response.json();
                setErrors(errorData.errors ?? {});
            }
            setProcessing(false);
            return false;
        } catch {
            setProcessing(false);
            return false;
        }
    };

    const handleNext = async () => {
        const success = await saveStep(currentStep);
        if (success && currentStep < STEPS.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setErrors({});
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleFinish = async () => {
        const success = await saveStep(currentStep);
        if (success && businessPlanId) {
            router.visit(`/businessplans/${businessPlanId}`);
        }
    };

    const handleStepClick = (index: number) => {
        if (
            index <= currentStep ||
            savedSteps.has(index) ||
            savedSteps.has(index - 1)
        ) {
            setErrors({});
            setCurrentStep(index);
        }
    };

    const StepComponent = STEPS[currentStep].component;
    const isLastStep = currentStep === STEPS.length - 1;
    const isFirstStep = currentStep === 0;

    const stepProps: WizardStepProps = {
        data,
        setData: handleSetData,
        errors,
        options,
    };

    return (
        <div className="flex min-h-[600px] flex-col lg:flex-row">
            {/* Step sidebar */}
            <nav className="bg-muted/30 p-4 lg:w-56 lg:border-b-0">
                <ol className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-x-visible">
                    {STEPS.map((step, index) => {
                        const isCurrent = index === currentStep;
                        const isSaved = savedSteps.has(index);
                        const isAccessible =
                            index <= currentStep ||
                            isSaved ||
                            savedSteps.has(index - 1);

                        return (
                            <li key={index}>
                                <button
                                    type="button"
                                    onClick={() => handleStepClick(index)}
                                    disabled={!isAccessible}
                                    className={cn(
                                        'flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors',
                                        isCurrent &&
                                            'bg-primary text-primary-foreground',
                                        !isCurrent &&
                                            isSaved &&
                                            'text-muted-foreground hover:bg-muted',
                                        !isCurrent &&
                                            !isSaved &&
                                            isAccessible &&
                                            'text-foreground hover:bg-muted',
                                        !isAccessible &&
                                            'cursor-not-allowed text-muted-foreground/50',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-medium',
                                            isCurrent &&
                                                'bg-primary-foreground text-primary',
                                            !isCurrent &&
                                                isSaved &&
                                                'bg-primary/20 text-primary',
                                            !isCurrent &&
                                                !isSaved &&
                                                'bg-muted text-muted-foreground',
                                        )}
                                    >
                                        {isSaved && !isCurrent ? (
                                            <Check className="h-3.5 w-3.5" />
                                        ) : (
                                            index + 1
                                        )}
                                    </span>
                                    <span className="hidden whitespace-nowrap lg:inline">
                                        {step.label}
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Step content */}
            <div className="flex flex-1 flex-col">
                <div className="flex-1 p-6">
                    <StepComponent {...stepProps} />
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between px-4 pb-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={isFirstStep || processing}
                    >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Zurück
                    </Button>

                    <span className="text-sm text-muted-foreground">
                        Schritt {currentStep + 1} von {STEPS.length}
                    </span>

                    {isLastStep ? (
                        <Button
                            type="button"
                            onClick={handleFinish}
                            disabled={processing}
                        >
                            {processing && (
                                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            )}
                            Fertigstellen
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleNext}
                            disabled={processing}
                        >
                            {processing && (
                                <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                            )}
                            Weiter
                            <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
