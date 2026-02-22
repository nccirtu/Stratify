import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { useExpandable } from '@/hooks/use-expandable';
import {
    edit as editBusinessPlan,
    show as showBusinessPlan,
} from '@/wayfinder/routes/businessplan';
import { App } from '@/wayfinder/types';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
    CalendarDays,
    Clock,
    FileText,
    Lock,
    Sparkles,
} from 'lucide-react';
import { useEffect, useRef } from 'react';

const TOTAL_STEPS = 12;

const STATUS_CONFIG = {
    draft: { label: 'Entwurf', className: 'bg-secondary text-secondary-foreground' },
    in_progress: { label: 'Wird generiert', className: 'bg-amber-100 text-amber-700 border-amber-200' },
    completed: { label: 'Abgeschlossen', className: 'bg-green-100 text-green-700 border-green-200' },
} as const;

function formatDate(dateStr: string | null | undefined): string | null {
    if (!dateStr) {
        return null;
    }
    return new Date(dateStr).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}

function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
}

export function BusinessPlanExpandableCard({
    businessplan,
}: {
    businessplan: App.Models.BusinessPlan;
}) {
    const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
    const contentRef = useRef<HTMLDivElement>(null);

    const status = businessplan.status as string;
    const isInProgress = status === 'in_progress';
    const isDraft = status === 'draft';
    const isCompleted = status === 'completed';

    const progress = Math.round(
        ((businessplan.current_step ?? 1) / TOTAL_STEPS) * 100,
    );
    const statusConfig =
        STATUS_CONFIG[status as keyof typeof STATUS_CONFIG] ??
        STATUS_CONFIG.draft;
    const userName = (businessplan.user as any)?.name ?? '';
    const periodFrom = formatDate(businessplan.period_from as string);
    const periodUntil = formatDate(businessplan.period_until as string);
    const updatedAt = formatDate((businessplan as any).updated_at as string);

    useEffect(() => {
        if (contentRef.current) {
            animatedHeight.set(
                isExpanded ? contentRef.current.scrollHeight : 0,
            );
        }
    }, [isExpanded, animatedHeight]);

    const actionHref = isCompleted
        ? showBusinessPlan(businessplan.id).url
        : editBusinessPlan(businessplan.id).url;

    const actionLabel = isCompleted ? 'Plan ansehen' : 'Weiterbearbeiten';

    return (
        <Card
            className={`relative w-full bg-white transition-all duration-300 hover:shadow-lg ${
                !isInProgress ? 'cursor-pointer' : 'cursor-default'
            }`}
            onClick={!isInProgress ? toggleExpand : undefined}
        >
            {/* Lock overlay for in_progress */}
            {isInProgress && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl bg-background/75 backdrop-blur-[2px]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                        <Lock className="h-5 w-5 text-amber-600" />
                    </div>
                    <p className="text-sm font-medium text-foreground/80">
                        KI generiert den Plan…
                    </p>
                </div>
            )}

            <CardHeader className="space-y-2">
                <div className="flex w-full items-start justify-between gap-3">
                    <div className="min-w-0 flex-1 space-y-2">
                        <Badge
                            variant="secondary"
                            className={statusConfig.className}
                        >
                            {statusConfig.label}
                        </Badge>
                        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
                            {businessplan.name}
                        </h3>
                    </div>
                    {businessplan.logo ? (
                        <img
                            src={`/storage/${businessplan.logo}`}
                            alt={businessplan.name}
                            className="h-11 w-11 shrink-0 rounded-lg object-cover ring-1 ring-border"
                        />
                    ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            {isCompleted ? (
                                <Sparkles className="h-5 w-5 text-primary" />
                            ) : (
                                <FileText className="h-5 w-5 text-primary" />
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {/* Progress bar — only for draft */}
                    {isDraft && (
                        <div className="space-y-1.5">
                            <div className="flex justify-between text-sm text-muted-foreground">
                                <span>
                                    Schritt {businessplan.current_step ?? 1} von{' '}
                                    {TOTAL_STEPS}
                                </span>
                                <span>{progress}%</span>
                            </div>
                            <ProgressBar value={progress} className="h-2" />
                        </div>
                    )}

                    {/* Expandable section */}
                    <motion.div
                        style={{ height: animatedHeight }}
                        transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                        }}
                        className="overflow-hidden"
                    >
                        <div ref={contentRef}>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="space-y-4 pt-2"
                                    >
                                        {/* Period */}
                                        {(periodFrom || periodUntil) && (
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <CalendarDays className="h-4 w-4 shrink-0" />
                                                <span>
                                                    {periodFrom ?? '–'} –{' '}
                                                    {periodUntil ?? '–'}
                                                </span>
                                            </div>
                                        )}

                                        {/* Creator */}
                                        {userName && (
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-7 w-7 border-2 border-background shadow-sm">
                                                    <AvatarFallback className="text-xs">
                                                        {getInitials(userName)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm text-muted-foreground">
                                                    {userName}
                                                </span>
                                            </div>
                                        )}

                                        {/* Description */}
                                        {businessplan.description && (
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {businessplan.description}
                                            </p>
                                        )}

                                        {/* Action button */}
                                        {!isInProgress && (
                                            <Link
                                                href={actionHref}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <Button
                                                    className="w-full"
                                                    variant={
                                                        isCompleted
                                                            ? 'default'
                                                            : 'secondary'
                                                    }
                                                >
                                                    {actionLabel}
                                                </Button>
                                            </Link>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
                    {updatedAt ? (
                        <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{updatedAt}</span>
                        </div>
                    ) : (
                        <span />
                    )}
                    <span>
                        {isCompleted ? '✓ Fertig' : `${progress}% abgeschlossen`}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
}