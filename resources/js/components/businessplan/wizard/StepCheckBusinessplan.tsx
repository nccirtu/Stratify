import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AlertCircle, AlertTriangle, CheckCircle2, Loader2, Lock, Play, RefreshCw } from 'lucide-react';
import React from 'react';
import type { WizardStepProps } from './types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

type CheckStatus = 'pending' | 'running' | 'success' | 'warning' | 'error';

interface CheckItem {
    check_key: string;
    check_label: string;
    status: CheckStatus;
    result: string | null;
    score: number | null;
}

interface GroupDef {
    groupNumber: number;
    label: string;
    description: string;
    checks: CheckItem[];
}

const GROUP_DEFINITIONS: Omit<GroupDef, 'checks'>[] = [
    {
        groupNumber: 1,
        label: 'Stamm- & Unternehmensdaten',
        description: 'Schritte 1–4: Stammdaten, Unternehmensdaten, Vorhaben, Details',
    },
    {
        groupNumber: 2,
        label: 'Strategie & Markt',
        description: 'Schritte 5–8: USP, Produkte, Markt, Zielgruppe',
    },
    {
        groupNumber: 3,
        label: 'Finanzplanung',
        description: 'Schritte 9–12: Einnahmen, Ausgaben, Mitarbeiter, Darlehen',
    },
];

const CHECKS_PER_GROUP: Record<number, { key: string; label: string }[]> = {
    1: [
        { key: 'grunddaten_vollstaendigkeit', label: 'Grunddaten vollständig' },
        { key: 'unternehmensdaten_konsistenz', label: 'Unternehmensdaten konsistent' },
        { key: 'planungszeitraum_plausibel', label: 'Planungszeitraum plausibel' },
        { key: 'geschaeftsidee_klarheit', label: 'Geschäftsidee klar definiert' },
    ],
    2: [
        { key: 'usp_ueberzeugend', label: 'USP überzeugend' },
        { key: 'produktbeschreibung_vollstaendig', label: 'Produktbeschreibung vollständig' },
        { key: 'marktanalyse_plausibel', label: 'Marktanalyse plausibel' },
        { key: 'zielgruppe_definiert', label: 'Zielgruppe vollständig definiert' },
        { key: 'vertriebskanaele_konsistent', label: 'Vertriebskanäle konsistent' },
    ],
    3: [
        { key: 'einnahmen_realistisch', label: 'Einnahmenprognose realistisch' },
        { key: 'ausgaben_vollstaendig', label: 'Ausgabenstruktur vollständig' },
        { key: 'personalplanung_plausibel', label: 'Personalplanung plausibel' },
        { key: 'finanzplanung_ausgeglichen', label: 'Finanzplanung ausgeglichen' },
        { key: 'gesamtbewertung', label: 'Gesamtbewertung' },
    ],
};

function buildInitialGroups(): GroupDef[] {
    return GROUP_DEFINITIONS.map((g) => ({
        ...g,
        checks: CHECKS_PER_GROUP[g.groupNumber].map((c) => ({
            check_key: c.key,
            check_label: c.label,
            status: 'pending' as CheckStatus,
            result: null,
            score: null,
        })),
    }));
}

function isGroupDone(group: GroupDef): boolean {
    return group.checks.every((c) => c.status === 'success' || c.status === 'warning' || c.status === 'error');
}

function isGroupRunning(group: GroupDef): boolean {
    return group.checks.some((c) => c.status === 'running');
}

function groupScore(group: GroupDef): number | null {
    const scored = group.checks.filter((c) => c.score !== null);
    if (scored.length === 0) {
        return null;
    }
    const avg = scored.reduce((sum, c) => sum + (c.score ?? 0), 0) / scored.length;
    return Math.round(avg);
}

function CheckIcon({ status }: { status: CheckStatus }) {
    switch (status) {
        case 'success':
            return <CheckCircle2 className="size-4 shrink-0 text-green-500" />;
        case 'warning':
            return <AlertTriangle className="size-4 shrink-0 text-yellow-500" />;
        case 'error':
            return <AlertCircle className="size-4 shrink-0 text-red-500" />;
        case 'running':
            return <Loader2 className="size-4 shrink-0 animate-spin text-blue-500" />;
        default:
            return <div className="size-4 shrink-0 rounded-full border-2 border-muted-foreground/30" />;
    }
}

function GroupStatusBadge({ group }: { group: GroupDef }) {
    const score = groupScore(group);

    if (isGroupDone(group)) {
        const hasError = group.checks.some((c) => c.status === 'error');
        const hasWarning = group.checks.some((c) => c.status === 'warning');
        const variant = hasError ? 'destructive' : hasWarning ? 'secondary' : 'secondary';
        const color = hasError ? 'text-red-600' : hasWarning ? 'text-yellow-600' : 'text-green-600';
        return (
            <Badge variant={variant} className={cn('ml-auto mr-2', color)}>
                {score !== null ? `Ø ${score}/10` : 'Fertig'}
            </Badge>
        );
    }

    return null;
}

export default function StepCheckBusinessplan({ businessPlanId }: WizardStepProps) {
    const [groups, setGroups] = React.useState<GroupDef[]>(buildInitialGroups);
    const [openAccordion, setOpenAccordion] = React.useState<string>('group-1');
    const eventSourceRef = React.useRef<EventSource | null>(null);

    // Load persisted checks on mount
    React.useEffect(() => {
        if (!businessPlanId) {
            return;
        }

        fetch(`/businessplans/${businessPlanId}/checks`)
            .then((res) => res.json())
            .then((data: { checks: Record<string, Record<string, { check_key: string; check_label: string; status: CheckStatus; result: string | null; score: number | null }>> }) => {
                if (!data.checks) {
                    return;
                }
                setGroups((prev) =>
                    prev.map((group) => {
                        const groupData = data.checks[group.groupNumber];
                        if (!groupData) {
                            return group;
                        }
                        return {
                            ...group,
                            checks: group.checks.map((check) => {
                                const persisted = groupData[check.check_key];
                                if (!persisted) {
                                    return check;
                                }
                                return {
                                    ...check,
                                    status: persisted.status,
                                    result: persisted.result,
                                    score: persisted.score,
                                };
                            }),
                        };
                    }),
                );
            })
            .catch(() => {
                // silently ignore load errors
            });
    }, [businessPlanId]);

    // Cleanup EventSource on unmount
    React.useEffect(() => {
        return () => {
            eventSourceRef.current?.close();
        };
    }, []);

    const startGroupChecks = (groupIndex: number) => {
        if (!businessPlanId) {
            return;
        }

        eventSourceRef.current?.close();

        const groupNumber = GROUP_DEFINITIONS[groupIndex].groupNumber;

        // Reset checks to pending in local state
        setGroups((prev) =>
            prev.map((g, i) => {
                if (i !== groupIndex) {
                    return g;
                }
                return {
                    ...g,
                    checks: g.checks.map((c) => ({ ...c, status: 'pending' as CheckStatus, result: null, score: null })),
                };
            }),
        );

        const es = new EventSource(`/businessplans/${businessPlanId}/checks/${groupNumber}/stream`);
        eventSourceRef.current = es;

        es.onmessage = (event) => {
            const payload = JSON.parse(event.data as string) as {
                type: string;
                check_key?: string;
                check_label?: string;
                status?: CheckStatus;
                result?: string;
                score?: number;
                group?: number;
            };

            if (payload.type === 'check_start') {
                setGroups((prev) =>
                    prev.map((g, i) => {
                        if (i !== groupIndex) {
                            return g;
                        }
                        return {
                            ...g,
                            checks: g.checks.map((c) =>
                                c.check_key === payload.check_key ? { ...c, status: 'running' as CheckStatus } : c,
                            ),
                        };
                    }),
                );
            } else if (payload.type === 'check_done') {
                setGroups((prev) =>
                    prev.map((g, i) => {
                        if (i !== groupIndex) {
                            return g;
                        }
                        return {
                            ...g,
                            checks: g.checks.map((c) =>
                                c.check_key === payload.check_key
                                    ? {
                                          ...c,
                                          status: payload.status ?? 'error',
                                          result: payload.result ?? null,
                                          score: payload.score ?? null,
                                      }
                                    : c,
                            ),
                        };
                    }),
                );
            } else if (payload.type === 'group_done') {
                es.close();
                eventSourceRef.current = null;
                // Auto-open next accordion
                const nextIndex = groupIndex + 1;
                if (nextIndex < GROUP_DEFINITIONS.length) {
                    setOpenAccordion(`group-${GROUP_DEFINITIONS[nextIndex].groupNumber}`);
                }
            }
        };

        es.onerror = () => {
            es.close();
            eventSourceRef.current = null;
            setGroups((prev) =>
                prev.map((g, i) => {
                    if (i !== groupIndex) {
                        return g;
                    }
                    return {
                        ...g,
                        checks: g.checks.map((c) =>
                            c.status === 'running' || c.status === 'pending'
                                ? { ...c, status: 'error' as CheckStatus, result: 'Verbindungsfehler.' }
                                : c,
                        ),
                    };
                }),
            );
        };
    };

    if (!businessPlanId) {
        return (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200">
                Bitte speichere den Businessplan zuerst, bevor die KI-Überprüfung gestartet werden kann.
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>KI-Überprüfung</CardTitle>
                <CardDescription>
                    Lass deinen Businessplan von der KI auf Vollständigkeit,
                    Konsistenz und Plausibilität prüfen. Starte jede Gruppe
                    nacheinander.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Accordion
                    type="single"
                    collapsible
                    value={openAccordion}
                    onValueChange={(val) => setOpenAccordion(val)}
                >
                    {groups.map((group, groupIndex) => {
                        const previousGroupDone =
                            groupIndex === 0 ||
                            isGroupDone(groups[groupIndex - 1]);
                        const isLocked = !previousGroupDone;
                        const isDone = isGroupDone(group);
                        const isRunning = isGroupRunning(group);
                        const accordionValue = `group-${group.groupNumber}`;

                        return (
                            <AccordionItem
                                key={group.groupNumber}
                                value={accordionValue}
                                className={cn(isLocked && 'opacity-60')}
                                disabled={isLocked}
                            >
                                <div className="flex items-center gap-2 pr-4">
                                    <AccordionTrigger className="flex-1 gap-3 hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            {isLocked ? (
                                                <Lock className="size-4 shrink-0 text-muted-foreground" />
                                            ) : (
                                                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                                                    {group.groupNumber}
                                                </span>
                                            )}
                                            <div className="text-left">
                                                <div className="text-sm font-medium">
                                                    {group.label}
                                                </div>
                                                <div className="text-xs font-normal text-muted-foreground">
                                                    {group.description}
                                                </div>
                                            </div>
                                        </div>
                                        <GroupStatusBadge group={group} />
                                    </AccordionTrigger>

                                    {/* Start / Re-run button — must be OUTSIDE AccordionTrigger to avoid button-in-button */}
                                    <Button
                                        size="sm"
                                        variant={isDone ? 'outline' : 'default'}
                                        disabled={isRunning || isLocked}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            startGroupChecks(groupIndex);
                                        }}
                                        className="shrink-0 gap-1.5"
                                    >
                                        {isRunning ? (
                                            <>
                                                <Loader2 className="size-3.5 animate-spin" />
                                                Läuft…
                                            </>
                                        ) : isDone ? (
                                            <>
                                                <RefreshCw className="size-3.5" />
                                                Erneut prüfen
                                            </>
                                        ) : (
                                            <>
                                                <Play className="size-3.5" />
                                                Überprüfung starten
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <AccordionContent className="space-y-3 pb-4">
                                    {/* Check list */}
                                    <div className="space-y-2">
                                        {group.checks.map((check) => (
                                            <div
                                                key={check.check_key}
                                                className="rounded-md border bg-muted/30 p-3 transition-colors"
                                            >
                                                <div className="flex items-start gap-2">
                                                    <CheckIcon
                                                        status={check.status}
                                                    />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium">
                                                                {
                                                                    check.check_label
                                                                }
                                                            </span>
                                                            {check.score !==
                                                                null && (
                                                                <Badge
                                                                    variant="outline"
                                                                    className={cn(
                                                                        'text-xs',
                                                                        check.score >=
                                                                            8 &&
                                                                            'border-green-500 text-green-600',
                                                                        check.score >=
                                                                            5 &&
                                                                            check.score <
                                                                                8 &&
                                                                            'border-yellow-500 text-yellow-600',
                                                                        check.score <
                                                                            5 &&
                                                                            'border-red-500 text-red-600',
                                                                    )}
                                                                >
                                                                    {
                                                                        check.score
                                                                    }
                                                                    /10
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        {check.result &&
                                                            check.status !==
                                                                'running' && (
                                                                <p className="mt-1 text-xs text-muted-foreground">
                                                                    {
                                                                        check.result
                                                                    }
                                                                </p>
                                                            )}
                                                        {check.status ===
                                                            'running' && (
                                                            <p className="mt-1 text-xs text-muted-foreground">
                                                                Wird analysiert…
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
            </CardContent>
        </Card>
    );
}
