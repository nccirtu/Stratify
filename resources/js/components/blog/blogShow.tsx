import { App } from '@/wayfinder/types';

import { Badge } from '@/components/ui/badge';

type BlogShowProps = {
    blogPost: App.Models.Post;
    categories: Record<string, string>;
    categoryColors: Record<string, string>;
};

export default function BlogShowComponent({
    blogPost,
    categories,
    categoryColors,
}: BlogShowProps) {
    // Falls content als ein langer String mit Absätzen gespeichert ist,
    // können wir ihn an Zeilenumbrüchen trennen, um ihn in Absätzen zu rendern.
    const paragraphs = blogPost.content ? blogPost.content.split('\n') : [];

    return (
        <article className="mx-auto max-w-4xl space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Badge
                        className={`rounded-full border-0 text-sm shadow-none ${blogPost.category ? (categoryColors[blogPost.category] ?? 'bg-primary/10 text-primary') : 'bg-primary/10 text-primary'}`}
                    >
                        {blogPost.category
                            ? (categories[blogPost.category] ??
                              blogPost.category)
                            : ''}
                    </Badge>
                    <time className="text-sm text-muted-foreground">
                        {blogPost.created_at
                            ? new Date(blogPost.created_at).toLocaleDateString()
                            : ''}
                    </time>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                    {blogPost.title}
                </h1>

                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                        {blogPost.author}
                    </span>
                </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted">
                <img
                    src={blogPost.image_url ?? '/assets/images/newsPlatzhalter.jpg'}
                    alt={blogPost.image_alt || blogPost.title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src = '/assets/images/newsPlatzhalter.jpg';
                    }}
                />
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
                {paragraphs.length > 0 ? (
                    paragraphs.map((paragraph, index) => (
                        <p
                            key={index}
                            className="mb-6 leading-relaxed text-muted-foreground"
                        >
                            {paragraph}
                        </p>
                    ))
                ) : (
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                        {blogPost.description}
                    </p>
                )}
            </div>
        </article>
    );
}
