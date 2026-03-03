import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus, Sparkles, Trash2 } from 'lucide-react';
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

function getCsrfToken(): string {
    return (
        document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')
            ?.content ?? ''
    );
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
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        await fetch(`/businessplans/${businessPlanId}/sections/${section.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
            body: JSON.stringify({ title, text }),
        });
        setSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    const handleDelete = async () => {
        setDeleting(true);
        const res = await fetch(
            `/businessplans/${businessPlanId}/sections/${section.id}`,
            {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': getCsrfToken(),
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
        <Card className="bg-white">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-1 items-center gap-2">
                        {section.ai_generated && (
                            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                        )}
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="h-8 border-0 bg-transparent px-0 text-base font-semibold shadow-none focus-visible:ring-0"
                            placeholder="Titel"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant={saved ? 'default' : 'secondary'}
                            onClick={handleSave}
                            disabled={saving}
                        >
                            {saving ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : saved ? (
                                'Gespeichert'
                            ) : (
                                'Speichern'
                            )}
                        </Button>
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
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={6}
                    className="resize-y text-sm"
                    placeholder="Inhalt des Abschnitts…"
                />
            </CardContent>
        </Card>
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
        if (!title.trim()) return;
        setSaving(true);
        const res = await fetch(`/businessplans/${businessPlanId}/sections`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': getCsrfToken(),
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
        <div className="space-y-4">
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
