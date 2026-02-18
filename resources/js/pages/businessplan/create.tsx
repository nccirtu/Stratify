import { Head } from '@inertiajs/react';

import CreateBusinessPlanStepOne from '@/components/businessplan/form/CreateBusinessPlanStepOne';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [];

export default function CreateBusinessPlanPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Businessplan erstellen" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <CreateBusinessPlanStepOne />
            </div>
        </AppLayout>
    );
}
