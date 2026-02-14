import { Head } from '@inertiajs/react';

import BusinessPlanMultistepForm from '@/components/forms/businessplan/multistep-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {
    index as businessPlanIndex,
    edit as editBusinessPlan,
} from '@/wayfinder/routes/businessplan';
import { App } from '@/wayfinder/types';

interface Props {
    businessPlan?: App.Models.BusinessPlan;
    step: number;
    companies: { id: number; name: string }[];
    branches: { id: number; name: string }[];
}

export default function EditBusinessPlanPage({
    businessPlan,
    step,
    companies,
    branches,
}: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Businessplans',
            href: businessPlanIndex().url,
        },
    ];

    if (businessPlan?.id) {
        breadcrumbs.push({
            title: `Edit ${businessPlan.name}`,
            href: editBusinessPlan(businessPlan.id).url,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`${businessPlan ? `Edit ${businessPlan.name}` : 'Create Business Plan'} - Step ${step}`}
            />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
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
