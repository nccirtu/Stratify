import { Head } from '@inertiajs/react';

import EmptyBusinessplanList from '@/components/custom-components/businessplan/empty-businessplan-list';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Inertia } from '@/wayfinder/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];



export default function Dashboard({businessplans}: {businessplan: Inertia.Pages.Dashboard}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    {/* Der eigentliche Listen-Content */}
                    <div className="p-4">
                        {businessplans.length > 0 ? (
                            <PlaceholderPattern />
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
