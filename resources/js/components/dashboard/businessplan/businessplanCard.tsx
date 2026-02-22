import { Link } from '@inertiajs/react';
import { CalendarDays, FileText, Lock, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { App } from '@/wayfinder/types';
import {
    edit as editBusinessPlan,
    show as showBusinessPlan,
} from '@/wayfinder/routes/businessplan';

const TOTAL_STEPS = 12;

function formatDate(dateStr: string | null | undefined): string | null {
    if (!dateStr) {
        return null;
    }
    return new Date(dateStr).toLocaleDateString('de-DE', {
        month: 'short',
        year: 'numeric',
    });
}

function CardInner({
    businessplan,
}: {
    businessplan: App.Models.BusinessPlan;
}) {
    const progress = Math.round(
        ((businessplan.current_step ?? 1) / TOTAL_STEPS) * 100,
    );
    const periodFrom = formatDate(businessplan.period_from as string);
    const periodUntil = formatDate(businessplan.period_until as string);
    const isDraft = businessplan.status === 'draft';
    const isInProgress = businessplan.status === 'in_progress';
    const isCompleted = businessplan.status === 'completed';

    return (
        <div
            className={`group relative flex h-56 flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-200 ${
                !isInProgress
                    ? 'hover:shadow-md hover:-translate-y-0.5 cursor-pointer'
                    : 'cursor-default'
            }`}
        >
            {/* Colored top bar */}
            <div
                className={`h-1 w-full ${
                    isCompleted
                        ? 'bg-primary'
                        : isInProgress
                          ? 'bg-amber-400'
                          : 'bg-primary/30'
                }`}
            />

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

            <div className="flex flex-1 flex-col gap-3 p-4">
                {/* Header: Logo + Name + Creator */}
                <div className="flex items-start gap-3">
                    {businessplan.logo ? (
                        <img
                            src={`/storage/${businessplan.logo}`}
                            alt={businessplan.name}
                            className="h-11 w-11 shrink-0 rounded-lg object-cover ring-1 ring-border"
                        />
                    ) : (
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                            <FileText className="h-5 w-5 text-primary" />
                        </div>
                    )}
                    <div className="min-w-0 flex-1 pt-0.5">
                        <p className="truncate text-sm font-semibold leading-snug text-foreground">
                            {businessplan.name}
                        </p>
                        {businessplan.user && (
                            <p className="truncate text-xs text-muted-foreground">
                                {(businessplan.user as any).name}
                            </p>
                        )}
                    </div>
                    {isCompleted && (
                        <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                    )}
                </div>

                {/* Period */}
                {(periodFrom || periodUntil) && (
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                        <span>
                            {periodFrom ?? '–'} – {periodUntil ?? '–'}
                        </span>
                    </div>
                )}

                <div className="mt-auto flex flex-col gap-2">
                    {/* Progress bar — only for draft */}
                    {isDraft && (
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>
                                    Schritt {businessplan.current_step ?? 1} von{' '}
                                    {TOTAL_STEPS}
                                </span>
                                <span>{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                        </div>
                    )}

                    {/* Status badge */}
                    <div>
                        <Badge
                            variant={
                                isCompleted
                                    ? 'default'
                                    : isInProgress
                                      ? 'secondary'
                                      : 'outline'
                            }
                            className={
                                isInProgress
                                    ? 'border-amber-200 bg-amber-100 text-amber-700'
                                    : ''
                            }
                        >
                            {isCompleted
                                ? 'Abgeschlossen'
                                : isInProgress
                                  ? 'Wird generiert'
                                  : 'Entwurf'}
                        </Badge>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function BusinessPlanCard({
    businessplan,
}: {
    businessplan: App.Models.BusinessPlan;
}) {
    if (businessplan.status === 'in_progress') {
        return <CardInner businessplan={businessplan} />;
    }

    const href =
        businessplan.status === 'completed'
            ? showBusinessPlan(businessplan.id).url
            : editBusinessPlan(businessplan.id).url;

    return (
        <Link href={href}>
            <CardInner businessplan={businessplan} />
        </Link>
    );
}
