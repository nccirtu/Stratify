import { Head } from '@inertiajs/react';

import CreateBusinessPlanWizard, {
    type WizardOptions,
} from '@/components/businessplan/form/CreateBusinessPlanWizard';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import businessplan from '@/wayfinder/routes/businessplan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Businesspläne',
        href: businessplan.index().url,
    },
    {
        title: 'Businessplan erstellen',
        href: businessplan.create().url,
    },
];

export default function CreateBusinessPlanPage(props: WizardOptions) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Businessplan erstellen" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl md:min-h-min dark:border-sidebar-border">
                    <CreateBusinessPlanWizard options={props} />
                </div>
            </div>
        </AppLayout>
    );
}
