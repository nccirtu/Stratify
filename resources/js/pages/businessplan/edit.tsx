import { Head } from '@inertiajs/react';

import CreateBusinessPlanWizard, {
    type WizardOptions,
} from '@/components/businessplan/form/CreateBusinessPlanWizard';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import {
    index as businessPlanIndex,
    edit as editBusinessPlan,
} from '@/wayfinder/routes/businessplan';

interface EditPageProps extends WizardOptions {
    businessPlan: any;
    step: number;
}

export default function EditBusinessPlanPage(props: EditPageProps) {
    const { businessPlan, step, ...options } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Businessplans',
            href: businessPlanIndex().url,
        },
    ];

    if (businessPlan?.id) {
        breadcrumbs.push({
            title: `Bearbeiten: ${businessPlan.name}`,
            href: editBusinessPlan(businessPlan.id).url,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head
                title={`Bearbeiten: ${businessPlan?.name ?? 'Businessplan'}`}
            />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <CreateBusinessPlanWizard
                        businessPlan={businessPlan}
                        initialStep={Math.max(0, (step ?? 1) - 1)}
                        options={options}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
