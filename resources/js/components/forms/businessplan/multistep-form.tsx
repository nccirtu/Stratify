import { Form } from '@inertiajs/react';
import { Check } from 'lucide-react';
import React from 'react';

import StepOne from '@/components/businessplan/StepOne';
import StepThree from '@/components/businessplan/StepThree';
import StepTwo from '@/components/businessplan/StepTwo';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import { update as updateBusinessPlan } from '@/wayfinder/routes/businessplan';
import { store as storeStepOne } from '@/wayfinder/routes/businessplan/step-one';
import { store as storeStepThree } from '@/wayfinder/routes/businessplan/step-three';
import { store as storeStepTwo } from '@/wayfinder/routes/businessplan/step-two';
import { App } from '@/wayfinder/types';

interface Props {
    businessPlan?: App.Models.BusinessPlan;
    step: number;
    companies: { id: number; name: string }[];
    branches: { id: number; name: string }[];
}

export default function BusinessPlanMultistepForm({ businessPlan, step: initialStep, companies, branches }: Props) {
    const steps = [
        { id: 1, name: 'Basic Information' },
        { id: 2, name: 'Company & Branch' },
        { id: 3, name: 'Planning Period' },
    ];

    const getAction = () => {
        if (!businessPlan) {
            if (initialStep === 1) {
                return storeStepOne().url;
            } else if (initialStep === 2) {
                return storeStepTwo(businessPlan?.id ?? 0).url;
            } else if (initialStep === 3) {
                return storeStepThree(businessPlan?.id ?? 0).url;
            }
        }
        return updateBusinessPlan(businessPlan?.id ?? 0).url;
    };

    const getMethod = () => {
        if (!businessPlan) {
            return 'post';
        }
        return 'patch';
    };

    return (
        <div className="flex flex-col gap-8 p-6">
            {/* Step Progress */}
            <nav aria-label="Progress">
                <ol role="list" className="flex items-center justify-center gap-4">
                    {steps.map((s, index) => (
                        <li key={s.name} className="flex items-center gap-2">
                            <div
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border-2',
                                    initialStep > s.id
                                        ? 'bg-primary border-primary text-primary-foreground'
                                        : initialStep === s.id
                                          ? 'border-primary text-primary'
                                          : 'border-muted text-muted-foreground',
                                )}
                            >
                                {initialStep > s.id ? <Check className="h-5 w-5" /> : <span>{s.id}</span>}
                            </div>
                            <span className={cn('text-sm font-medium', initialStep === s.id ? 'text-primary' : 'text-muted-foreground')}>
                                {s.name}
                            </span>
                            {index !== steps.length - 1 && <div className="mx-2 h-px w-8 bg-muted" />}
                        </li>
                    ))}
                </ol>
            </nav>

            <Form
                action={getAction()}
                method={getMethod()}
                initialValues={{
                    name: businessPlan?.name || '',
                    slug: businessPlan?.slug || '',
                    description: businessPlan?.description || '',
                    status: businessPlan?.status || 'draft',
                    company_id: businessPlan?.company_id || '',
                    branch_id: businessPlan?.branch_id || '',
                    period_from: businessPlan?.period_from || '',
                    period_until: businessPlan?.period_until || '',
                    step: initialStep,
                }}
                className="mx-auto w-full max-w-2xl space-y-6"
            >
                {({ data, setData, errors, processing }) => (
                    <>
                        {initialStep === 1 && <StepOne data={data} setData={setData} errors={errors} />}

                        {initialStep === 2 && (
                            <StepTwo data={data} setData={setData} errors={errors} companies={companies} branches={branches} />
                        )}

                        {initialStep === 3 && <StepThree data={data} setData={setData} errors={errors} />}

                        <div className="flex justify-end gap-4">
                            {initialStep > 1 && (
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Back
                                </Button>
                            )}
                            <Button type="submit" disabled={processing}>
                                {processing && <Spinner className="mr-2" />}
                                {initialStep === 3 ? 'Complete' : 'Save & Next'}
                            </Button>
                        </div>
                    </>
                )}
            </Form>
        </div>
    );
}
