import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    ChevronDown,
    ChevronUp,
    Loader2,
    Pencil,
    Plus,
    Sparkles,
    Trash2,
    X,
} from 'lucide-react';
import { useState } from 'react';

interface BusinessPlanSection {
    id: number;
    title: string;
    text: string | null;
    ai_generated: boolean;
    section_type: string;
    order_index: number;
}

interface AnalyticsTabProps {
    businessPlanId: number;
    sections: BusinessPlanSection[];
    generationStatus: string | null;
}

function getXsrfToken(): string {
    const raw = document.cookie
        .split('; ')
        .find((row) => row.startsWith('XSRF-TOKEN='))
        ?.split('=')
        .slice(1)
        .join('=');

    return raw ? decodeURIComponent(raw) : '';
}

function SectionCard({
    section,
    businessPlanId,
    onDelete,
}: {
    section: BusinessPlanSection;
    businessPlanId: number;
    onDelete: (id: number) => void;
}) {
    const [title, setTitle] = useState(section.title);
    const [text, setText] = useState(section.text ?? '');
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        await fetch(`/businessplans/${businessPlanId}/sections/${section.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getXsrfToken(),
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
            body: JSON.stringify({ title, text }),
        });
        setSaving(false);
        setSaved(true);
        setEditing(false);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDelete = async () => {
        setDeleting(true);
        const res = await fetch(
            `/businessplans/${businessPlanId}/sections/${section.id}`,
            {
                method: 'DELETE',
                headers: {
                    'X-XSRF-TOKEN': getXsrfToken(),
                    'X-Requested-With': 'XMLHttpRequest',
                    Accept: 'application/json',
                },
            },
        );
        if (res.ok) {
            onDelete(section.id);
        }
        setDeleting(false);
    };

    return (
        <Collapsible open={open} onOpenChange={setOpen}>
            <Card className="bg-white">
                <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer pb-3 select-none">
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex min-w-0 flex-1 items-center gap-2">
                                {section.ai_generated && (
                                    <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                                )}
                                <span className="truncate font-semibold">
                                    {title}
                                </span>
                            </div>
                            <div
                                className="flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {saved && (
                                    <span className="text-xs text-green-600">
                                        Gespeichert
                                    </span>
                                )}
                                {!section.ai_generated && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={handleDelete}
                                        disabled={deleting}
                                        className="text-destructive hover:text-destructive"
                                    >
                                        {deleting ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Trash2 className="h-3.5 w-3.5" />
                                        )}
                                    </Button>
                                )}
                                {open ? (
                                    <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
                                ) : (
                                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                                )}
                            </div>
                        </div>
                    </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                    <CardContent className="pt-0">
                        {editing ? (
                            <div className="space-y-3">
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Titel"
                                    className="font-medium"
                                />
                                <Textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    rows={10}
                                    className="resize-y font-mono text-sm"
                                    placeholder="Inhalt des Abschnitts (HTML erlaubt)…"
                                />
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={handleSave}
                                        disabled={saving}
                                    >
                                        {saving ? (
                                            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                                        ) : null}
                                        Speichern
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setEditing(false)}
                                    >
                                        <X className="mr-1.5 h-3.5 w-3.5" />
                                        Abbrechen
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {text ? (
                                    <div
                                        className="prose prose-sm max-w-none text-foreground [&_h3]:text-base [&_h3]:font-semibold [&_h4]:text-sm [&_h4]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">
                                        Kein Inhalt vorhanden.
                                    </p>
                                )}
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditing(true)}
                                >
                                    <Pencil className="mr-1.5 h-3.5 w-3.5" />
                                    Bearbeiten
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

function AddSectionForm({
    businessPlanId,
    onAdded,
}: {
    businessPlanId: number;
    onAdded: (section: BusinessPlanSection) => void;
}) {
    const [title, setTitle] = useState('');
    const [saving, setSaving] = useState(false);

    const handleAdd = async () => {
        if (!title.trim()) {
            return;
        }
        setSaving(true);
        const res = await fetch(`/businessplans/${businessPlanId}/sections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getXsrfToken(),
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
            body: JSON.stringify({ title: title.trim(), text: '' }),
        });
        if (res.ok) {
            const data = await res.json();
            onAdded(data.section);
            setTitle('');
        }
        setSaving(false);
    };

    return (
        <div className="flex gap-2">
            <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titel des neuen Abschnitts…"
                onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            />
            <Button onClick={handleAdd} disabled={saving || !title.trim()}>
                {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Plus className="h-4 w-4" />
                )}
                Hinzufügen
            </Button>
        </div>
    );
}

export default function AnalyticsTab({
    businessPlanId,
    sections: initialSections,
    generationStatus,
}: AnalyticsTabProps) {
    const [sections, setSections] =
        useState<BusinessPlanSection[]>(initialSections);

    const isGenerating =
        generationStatus === 'pending' || generationStatus === 'generating';

    const handleDelete = (id: number) => {
        setSections((prev) => prev.filter((s) => s.id !== id));
    };

    const handleAdded = (section: BusinessPlanSection) => {
        setSections((prev) => [...prev, section]);
    };

    if (isGenerating) {
        return (
            <Card className="bg-white">
                <CardContent className="flex flex-col items-center justify-center gap-4 py-16">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                        <Loader2 className="h-7 w-7 animate-spin text-primary" />
                    </div>
                    <div className="text-center">
                        <p className="font-medium">
                            KI generiert deinen Businessplan…
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Das kann einige Minuten dauern. Du wirst per E-Mail
                            benachrichtigt, sobald alles fertig ist.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (sections.length === 0) {
        return (
            <div className="space-y-4">
                <Card className="bg-white">
                    <CardContent className="flex flex-col items-center justify-center gap-3 py-16">
                        <Sparkles className="h-10 w-10 text-muted-foreground/40" />
                        <div className="text-center">
                            <p className="font-medium">Noch keine Abschnitte</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Schließe den Wizard ab, um KI-Abschnitte zu
                                generieren, oder füge eigene hinzu.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <Label className="mb-2 block text-sm font-medium">
                        Eigenen Abschnitt hinzufügen
                    </Label>
                    <AddSectionForm
                        businessPlanId={businessPlanId}
                        onAdded={handleAdded}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {sections.map((section) => (
                <SectionCard
                    key={section.id}
                    section={section}
                    businessPlanId={businessPlanId}
                    onDelete={handleDelete}
                />
            ))}

            <Card className="border-dashed bg-transparent">
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                        Eigenen Abschnitt hinzufügen
                    </CardTitle>
                    <CardDescription>
                        Ergänze den Businessplan mit einem eigenen Abschnitt.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AddSectionForm
                        businessPlanId={businessPlanId}
                        onAdded={handleAdded}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
