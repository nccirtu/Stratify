import { Head } from '@inertiajs/react';

import { create as createBusinessPlan } from '@/actions/App/Http/Controllers/BusinessPlanController';
import CreateBusinessplanForm from '@/components/forms/businessplan/createBusinessplan';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Businessplan erstellen',
        href: createBusinessPlan.url(),
    },
];

export default function CreateBusinessPlanPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <CreateBusinessplanForm />
                </div>
            </div>
        </AppLayout>
    );
}
