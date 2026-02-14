import { Head } from '@inertiajs/react';
import React from 'react';

import BusinessPlanMultistepForm from '@/components/forms/businessplan/multistep-form';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

import { create as createBusinessPlan } from '@/wayfinder/routes/businessplan';

interface Props {
    companies: { id: number; name: string }[];
    branches: { id: number; name: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Businessplan erstellen',
        href: createBusinessPlan().url,
    },
];

export default function CreateBusinessPlanPage({ companies, branches }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Business Plan erstellen" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <BusinessPlanMultistepForm
                        step={1}
                        companies={companies}
                        branches={branches}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
