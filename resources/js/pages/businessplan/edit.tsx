import { Head } from '@inertiajs/react';
import React from 'react';

import BusinessPlanMultistepForm from '@/components/forms/businessplan/multistep-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface BusinessPlan {
    id: number;
    name: string;
    slug: string;
    description: string;
    status: string;
    company_id: number;
    branch_id: number | null;
    period_from: string;
    period_until: string;
}

interface Props {
    businessPlan: BusinessPlan;
    step: number;
    companies: { id: number; name: string }[];
    branches: { id: number; name: string }[];
}

export default function EditBusinessPlanPage({ businessPlan, step, companies, branches }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Businessplans',
            href: route('businessplan.index'),
        },
        {
            title: `Edit ${businessPlan.name}`,
            href: route('businessplan.edit', businessPlan.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${businessPlan.name} - Step ${step}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <BusinessPlanMultistepForm
                        businessPlan={businessPlan}
                        step={step}
                        companies={companies}
                        branches={branches}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
