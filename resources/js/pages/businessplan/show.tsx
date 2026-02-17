import { Head } from '@inertiajs/react';

import ViewPageTabs from '@/components/businessplan/viewPageComponents/viewPageTabs';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Businessplan',
        href: '/businessplan',
    },
    {
        title: 'Anzeigen',
        href: '',
    },
];

export default function BusinessplanShow() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <ViewPageTabs />
                </div>
            </div>
        </AppLayout>
    );
}
