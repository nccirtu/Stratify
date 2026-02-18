import { App } from '@/wayfinder/types';
import { ArrowRightIcon, CalendarDaysIcon, Loader2 } from 'lucide-react';
import { InfiniteScroll } from '@inertiajs/react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type PaginatedData } from '@/types';

type BlogProps = {
    blogPosts: PaginatedData<App.Models.Post>;
    categories: Record<string, string>;
    categoryColors: Record<string, string>;
};

const BlogGrid = ({
    posts,
    categories,
    categoryColors,
}: {
    posts: App.Models.Post[] | PaginatedData<App.Models.Post>;
    categories: Record<string, string>;
    categoryColors: Record<string, string>;
}) => {
    const postArray = Array.isArray(posts) ? posts : posts.data;

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postArray.map((post, index) => (
                <Card
                    key={index}
                    className="group h-full overflow-hidden shadow-none transition-all duration-300"
                >
                    <CardContent className="space-y-3.5">
                        <div className={'flex items-center justify-end'}>
                            <a href={`/blog/category/${post.category}`}>
                                <Badge
                                    className={`rounded-full border-0 text-sm shadow-none ${post.category ? (categoryColors[post.category] ?? 'bg-primary/10 text-primary') : 'bg-primary/10 text-primary'}`}
                                >
                                    {post.category
                                        ? (categories[post.category] ??
                                          post.category)
                                        : ''}
                                </Badge>
                            </a>
                        </div>
                        <div className="mb-6 overflow-hidden rounded-lg sm:mb-12">
                            <a href={`/blog/${post.slug}`}>
                                <img
                                    src={
                                        post.image_url ??
                                        '/assets/images/newsPlatzhalter.jpg'
                                    }
                                    alt={post.image_alt ?? ''}
                                    className="h-59.5 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </a>
                        </div>
                        <div className="flex items-center justify-between gap-1.5">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <CalendarDaysIcon className="size-6" />
                                <span>
                                    {post.created_at
                                        ? new Date(
                                              post.created_at,
                                          ).toLocaleDateString()
                                        : ''}
                                </span>
                            </div>
                        </div>
                        <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
                            <a href={`/blog/${post.slug}`}>{post.title}</a>
                        </h3>
                        <p className="line-clamp-2 text-muted-foreground">
                            {post.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                                {post.author}
                            </span>
                            <Button
                                size="icon"
                                variant="outline"
                                className="group-hover:border-primary group-hover:bg-primary! group-hover:text-primary-foreground hover:border-primary hover:bg-primary! hover:text-primary-foreground"
                                asChild
                            >
                                <a href={`/blog/${post.slug}`}>
                                    <ArrowRightIcon className="size-4 -rotate-45" />
                                    <span className="sr-only">
                                        Read more: {post.title}
                                    </span>
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const Blog = ({ blogPosts, categories, categoryColors }: BlogProps) => {
    const usedCategoryKeys = new Set<string>(
        blogPosts.data
            .map((post) => post.category as string)
            .filter(Boolean),
    );

    const categoryEntries = Object.entries(categories).filter(([key]) =>
        usedCategoryKeys.has(key),
    );

    return (
        <section className="py-0 sm:py-16 lg:py-8">
            <div className="mx-auto max-w-7xl space-y-8 lg:space-y-16">
                {/* Header */}
                <div className="space-y-4">
                    <p className="text-sm">Ressourcen & Wissen</p>

                    <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">
                        Dein Navigator für die Selbstständigkeit.
                    </h2>

                    <p className="text-lg text-muted-foreground md:text-xl">
                        Experten-Guides zu Recht, Marketing und Vertrieb. Alles,
                        was du brauchst, um aus deiner Idee ein profitables
                        Unternehmen zu machen.
                    </p>
                </div>

                {/* Tabs and Search */}
                <Tabs defaultValue="All" className="gap-8 lg:gap-16">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <ScrollArea className="w-full rounded-lg bg-muted sm:w-auto">
                            <TabsList className="h-auto gap-1">
                                <TabsTrigger
                                    value="All"
                                    className="cursor-pointer rounded-lg px-4 text-base hover:bg-primary/10"
                                >
                                    All
                                </TabsTrigger>
                                {categoryEntries.map(([value, label]) => (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="cursor-pointer rounded-lg px-4 text-base hover:bg-primary/10"
                                    >
                                        {label}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>

                    {/* All Posts Tab */}
                    <TabsContent value="All">
                        <InfiniteScroll
                            data="blogPosts"
                            loading={() => (
                                <div className="flex justify-center p-8">
                                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                </div>
                            )}
                        >
                            <BlogGrid
                                posts={blogPosts}
                                categories={categories}
                                categoryColors={categoryColors}
                            />
                        </InfiniteScroll>
                    </TabsContent>

                    {/* Category-specific Tabs */}
                    {categoryEntries.map(([value]) => (
                        <TabsContent key={value} value={value}>
                            <BlogGrid
                                posts={blogPosts.data.filter(
                                    (post) =>
                                        (post.category as string) === value,
                                )}
                                categories={categories}
                                categoryColors={categoryColors}
                            />
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
};

export default Blog;
