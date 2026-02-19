import { router } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import Step10PlanningRisks from '../wizard/Step10PlanningRisks';
import Step11Income from '../wizard/Step11Income';
import Step12Expenses from '../wizard/Step12Expenses';
import Step1General from '../wizard/Step1General';
import Step2Company from '../wizard/Step2Company';
import Step3Period from '../wizard/Step3Period';
import Step4BusinessIdea from '../wizard/Step4BusinessIdea';
import Step5TargetMarket from '../wizard/Step5TargetMarket';
import Step6SolutionOffer from '../wizard/Step6SolutionOffer';
import Step7Competitors from '../wizard/Step7Competitors';
import Step8TeamResources from '../wizard/Step8TeamResources';
import Step9Marketing from '../wizard/Step9Marketing';
import type {
    BusinessPlanFormData,
    SelectOption,
    WizardStepProps,
} from '../wizard/types';

const STEPS = [
    { label: 'Allgemein', component: Step1General },
    { label: 'Unternehmen', component: Step2Company },
    { label: 'Zeitraum', component: Step3Period },
    { label: 'Geschäftsidee', component: Step4BusinessIdea },
    { label: 'Zielgruppe & Markt', component: Step5TargetMarket },
    { label: 'Lösung & Angebot', component: Step6SolutionOffer },
    { label: 'Wettbewerb', component: Step7Competitors },
    { label: 'Team & Ressourcen', component: Step8TeamResources },
    { label: 'Marketing & Vertrieb', component: Step9Marketing },
    { label: 'Planung & Risiken', component: Step10PlanningRisks },
    { label: 'Einnahmen', component: Step11Income },
    { label: 'Ausgaben', component: Step12Expenses },
] as const;

export interface WizardOptions {
    branches: SelectOption[];
    companies: SelectOption[];
    currencies: SelectOption[];
    taxes: SelectOption[];
    incomeCategories: SelectOption[];
    expenseCategories: SelectOption[];
    incomeCatalogItems: SelectOption[];
    expenseCatalogItems: SelectOption[];
}

export interface CreateBusinessPlanWizardProps {
    businessPlan?: any;
    initialStep?: number;
    options: WizardOptions;
}

const defaultFormData: BusinessPlanFormData = {
    name: '',
    slug: '',
    description: '',
    company_id: '',
    create_new_company: false,
    new_company_name: '',
    branch_id: '',
    period_from: '',
    period_until: '',
    business_idea: '',
    currency_id: '',
    language: '',
    target_customers: '',
    customer_problems: '',
    location: '',
    solution_description: '',
    competitive_advantage: '',
    pricing_strategy: '',
    competitors: '',
    team_members: '',
    initial_investment: '',
    marketing_channels: '',
    revenue_model: '',
    milestones: '',
    risks: '',
    income_transactions: [],
    expense_transactions: [],
};

function buildInitialData(businessPlan?: any): BusinessPlanFormData {
    if (!businessPlan) return { ...defaultFormData };

    return {
        ...defaultFormData,
        ...businessPlan,
        company_id: businessPlan.company_id
            ? String(businessPlan.company_id)
            : '',
        branch_id: businessPlan.branch_id ? String(businessPlan.branch_id) : '',
        currency_id: businessPlan.currency ? String(businessPlan.currency) : '',
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
        if (!businessPlan?.id) return new Set();
        // Mark steps up to initialStep as saved when editing
        const set = new Set<number>();
        for (let i = 0; i < initialStep; i++) set.add(i);
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
            const stepNumber = stepIndex + 1; // 1-based for API
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

            // All other steps (or step 1 when editing) → PUT to save-step
            const id = businessPlanId;
            if (!id) {
                setProcessing(false);
                return false;
            }

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
        // Allow clicking on already-saved steps or the next available step
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
            <nav className="bg-muted/30 p-4 lg:w-64 lg:border-b-0">
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
                <div className="flex items-center justify-between px-4">
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
