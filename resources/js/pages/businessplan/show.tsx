import { Head } from '@inertiajs/react';

import ViewPageTabs from '@/components/businessplan/viewPageComponents/viewPageTabs';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { LiquidityPlanData } from '@/types/liquidity';
import { App } from '@/wayfinder/types';

const breadcrumbs: BreadcrumbItem[] = [];

interface BusinessPlanShowProps {
    businessPlan: App.Models.BusinessPlan;
    catalogItems: App.Models.CatalogItem[];
    liquidityPlan: LiquidityPlanData;
}

export default function BusinessplanShow({ businessPlan, catalogItems, liquidityPlan }: BusinessPlanShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <ViewPageTabs
                        catalogItems={catalogItems ?? []}
                        transactions={businessPlan.transactions ?? []}
                        liquidityPlan={liquidityPlan}
                        employees={businessPlan.employees ?? []}
                        loans={businessPlan.loans ?? []}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
