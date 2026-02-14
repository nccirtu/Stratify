import { Head } from '@inertiajs/react';

import BusinessplanGridView from '@/components/custom-components/businessplan/businessplanGridView';
import EmptyBusinessplanList from '@/components/custom-components/businessplan/empty-businessplan-list';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { App } from '@/wayfinder/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface PaginatedBusinessPlans {
    data: App.Models.BusinessPlan[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export default function Dashboard({
    businessplans,
}: {
    businessplans: PaginatedBusinessPlans;
}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* Der eigentliche Listen-Content */}
                    <div className="p-4">
                        {businessplans.data.length > 0 ? (
                            <BusinessplanGridView
                                businessplans={businessplans.data}
                            />
                        ) : (
                            /* Overlay wird angezeigt, wenn Liste leer ist */
                            <EmptyBusinessplanList />
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
