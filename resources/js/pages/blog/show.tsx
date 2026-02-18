import { Head } from '@inertiajs/react';

import BlogShowComponent from '@/components/blog/blogShow';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { App } from '@/wayfinder/types';

export default function BlogShow({
    blogPost,
    postCategories,
    postCategoryColors,
}: {
    blogPost: App.Models.Post;
    postCategories: Record<string, string>;
    postCategoryColors: Record<string, string>;
}) {
    const breadcrumbs: BreadcrumbItem[] = [];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={blogPost.title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-screen flex-1 overflow-hidden rounded-xl bg-background p-4 md:min-h-min md:p-8">
                    <BlogShowComponent
                        blogPost={blogPost}
                        categories={postCategories}
                        categoryColors={postCategoryColors}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
