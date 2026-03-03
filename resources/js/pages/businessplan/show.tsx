import { Head } from '@inertiajs/react';

import ViewPageTabs from '@/components/businessplan/viewPageComponents/viewPageTabs';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { LiquidityPlanData } from '@/types/liquidity';
import { show as pdfShow } from '@/wayfinder/App/Http/Controllers/BusinessPlanPdfController';
import { App } from '@/wayfinder/types';
import { dashboard } from '@/routes';
import businessplan from '@/wayfinder/routes/businessplan';
import { FileText } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Businesspläne',
        href: businessplan.index().url,
    },
];

interface SelectOption {
    value: string;
    label: string;
    data?: Record<string, unknown>;
}

interface BusinessPlanSection {
    id: number;
    title: string;
    text: string | null;
    ai_generated: boolean;
    section_type: string;
    order_index: number;
}

interface BusinessPlanShowProps {
    businessPlan: App.Models.BusinessPlan;
    businessPlanSections: BusinessPlanSection[];
    catalogItems: App.Models.CatalogItem[];
    liquidityPlan: LiquidityPlanData;
    currencies: SelectOption[];
    taxes: SelectOption[];
    incomeCategories: SelectOption[];
    expenseCategories: SelectOption[];
    incomeCatalogItems: SelectOption[];
    expenseCatalogItems: SelectOption[];
}

export default function BusinessplanShow({
    businessPlan,
    businessPlanSections,
    catalogItems,
    liquidityPlan,
    currencies,
    taxes,
    incomeCategories,
    expenseCategories,
    incomeCatalogItems,
    expenseCatalogItems,
}: BusinessPlanShowProps) {
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
                        businessPlanId={businessPlan.id}
                        businessPlanSections={businessPlanSections ?? []}
                        generationStatus={(businessPlan as any).generation_status}
                        currencies={currencies}
                        taxes={taxes}
                        incomeCategories={incomeCategories}
                        expenseCategories={expenseCategories}
                        incomeCatalogItems={incomeCatalogItems}
                        expenseCatalogItems={expenseCatalogItems}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
