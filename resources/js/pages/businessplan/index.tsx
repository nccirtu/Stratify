import { App } from '@/wayfinder/types';
import { Head } from '@inertiajs/react';
import BusinessplanGridView from '@/components/dashboard/businessplan/businessplanGridView';
import EmptyBusinessplanList from '@/components/dashboard/businessplan/empty-businessplan-list';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

interface PaginatedBusinessPlans {
    data: App.Models.BusinessPlan[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

const breadcrumbs: BreadcrumbItem[] = [];

export default function Businessplan({businessplans }: { businessplans: PaginatedBusinessPlans }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <div className="py-4">
                        {businessplans.data.length > 0 ? (
                            <BusinessplanGridView
                                businessplans={businessplans.data}
                                branches={[]}
                                companies={[]}
                                currencies={[]}
                                taxes={[]}
                                incomeCategories={[]}
                                expenseCategories={[]}
                                incomeCatalogItems={[]}
                                expenseCatalogItems={[]}
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
