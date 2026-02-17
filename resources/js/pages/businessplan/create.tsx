import { Head } from '@inertiajs/react';

import CreateBusinessplanForm from '@/components/forms/businessplan/createBusinessplan';
import type { SchemaOptions } from '@/components/businessplan/form/schema';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { create as createBusinessPlan, index as indexBusinessPlan } from '@/wayfinder/routes/businessplan';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Businesspläne',
        href: indexBusinessPlan().url,
    },
    {
        title: 'Erstellen',
        href: createBusinessPlan().url,
    },
];

export default function CreateBusinessPlanPage(props: SchemaOptions) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Businessplan erstellen" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CreateBusinessplanForm {...props} />
            </div>
        </AppLayout>
    );
}
