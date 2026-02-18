import { Head, usePage } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type PaginatedData } from '@/types';
import { App } from '@/wayfinder/types';
import { CardTitle } from '@/components/ui/card';
import Blog from '@/components/blog/blogComponent';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];



export default function Dashboard({
    greeting,
    blogPosts,
    postCategories,
    postCategoryColors,
}: {
    greeting: string;
    blogPosts: PaginatedData<App.Models.Post>;
    postCategories: Record<string, string>;
    postCategoryColors: Record<string, string>;
}) {
    const user = usePage().props.auth.user;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl md:min-h-min">
                    <CardTitle className="text-md">
                        {greeting}, {user?.name || ''} 👋
                    </CardTitle>
                    <Blog
                        blogPosts={blogPosts}
                        categories={postCategories}
                        categoryColors={postCategoryColors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
