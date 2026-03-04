import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { show as pdfShow } from '@/wayfinder/App/Http/Controllers/BusinessPlanPdfController';
import { Check } from 'lucide-react';
import { useState } from 'react';

interface Layout {
    id: string;
    label: string;
    description: string;
    preview: React.ReactNode;
}

const LAYOUTS: Layout[] = [
    {
        id: 'klassisch',
        label: 'Klassisch',
        description: 'Professionell & zeitlos',
        preview: (
            <div className="flex h-full overflow-hidden rounded">
                <div className="w-1/3 bg-[#1e293b]" />
                <div className="flex flex-1 flex-col gap-1.5 bg-white p-2">
                    <div className="h-1.5 w-3/4 rounded bg-[#1e293b]" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-5/6 rounded bg-gray-200" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-gray-300" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                </div>
            </div>
        ),
    },
    {
        id: 'modern',
        label: 'Modern',
        description: 'Dynamisch & innovativ',
        preview: (
            <div className="flex h-full overflow-hidden rounded">
                <div className="w-1/3 bg-[#6d28d9]" />
                <div className="flex flex-1 flex-col gap-1.5 bg-[#f5f3ff] p-2">
                    <div className="h-1.5 w-3/4 rounded bg-[#6d28d9]" />
                    <div className="h-1 w-full rounded bg-[#ddd6fe]" />
                    <div className="h-1 w-5/6 rounded bg-[#ddd6fe]" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-[#c4b5fd]" />
                    <div className="h-1 w-full rounded bg-[#ddd6fe]" />
                </div>
            </div>
        ),
    },
    {
        id: 'minimal',
        label: 'Minimal',
        description: 'Klar & schlicht',
        preview: (
            <div className="flex h-full flex-col overflow-hidden rounded border border-gray-200 bg-white">
                <div className="border-b border-black bg-white p-2">
                    <div className="h-1.5 w-1/2 rounded bg-black" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 p-2">
                    <div className="h-1 w-3/4 rounded bg-gray-800" />
                    <div className="h-1 w-full rounded bg-gray-300" />
                    <div className="h-1 w-5/6 rounded bg-gray-300" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-gray-400" />
                </div>
            </div>
        ),
    },
    {
        id: 'executive',
        label: 'Executive',
        description: 'Exklusiv & repräsentativ',
        preview: (
            <div className="flex h-full overflow-hidden rounded">
                <div className="w-1/3 bg-[#0a0a0a]">
                    <div className="m-1.5 h-1 rounded bg-[#b8960c]" />
                </div>
                <div className="flex flex-1 flex-col gap-1.5 bg-[#fafaf8] p-2">
                    <div className="h-1.5 w-3/4 rounded bg-[#0a0a0a]" />
                    <div className="h-0.5 w-1/4 rounded bg-[#b8960c]" />
                    <div className="h-1 w-full rounded bg-gray-200" />
                    <div className="h-1 w-5/6 rounded bg-gray-200" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-gray-300" />
                </div>
            </div>
        ),
    },
    {
        id: 'natur',
        label: 'Natur',
        description: 'Nachhaltig & organisch',
        preview: (
            <div className="flex h-full overflow-hidden rounded">
                <div className="w-1/3 bg-[#2d5016]" />
                <div className="flex flex-1 flex-col gap-1.5 bg-[#f7faf3] p-2">
                    <div className="h-1.5 w-3/4 rounded bg-[#2d5016]" />
                    <div className="h-1 w-full rounded bg-[#c6dab0]" />
                    <div className="h-1 w-5/6 rounded bg-[#c6dab0]" />
                    <div className="mt-1 h-1 w-2/3 rounded bg-[#a8c78a]" />
                    <div className="h-1 w-full rounded bg-[#c6dab0]" />
                </div>
            </div>
        ),
    },
];

interface PrintLayoutModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    businessPlanId: number;
}

export default function PrintLayoutModal({
    open,
    onOpenChange,
    businessPlanId,
}: PrintLayoutModalProps) {
    const [selected, setSelected] = useState('klassisch');

    const handleOpen = () => {
        const url = pdfShow(businessPlanId, {
            query: { layout: selected },
        }).url;
        window.open(url, '_blank', 'noopener,noreferrer');
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Layout auswählen</DialogTitle>
                    <DialogDescription>
                        Wähle ein Design für deinen Businessplan-Ausdruck.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {LAYOUTS.map((layout) => {
                        const isSelected = selected === layout.id;
                        return (
                            <button
                                key={layout.id}
                                type="button"
                                onClick={() => setSelected(layout.id)}
                                className={`group relative flex flex-col gap-2 rounded-lg border-2 p-1 text-left transition-all focus:outline-none ${
                                    isSelected
                                        ? 'border-primary shadow-sm'
                                        : 'border-border hover:border-muted-foreground/40'
                                }`}
                            >
                                {/* Preview thumbnail */}
                                <div className="h-24 w-full overflow-hidden rounded-sm bg-gray-100">
                                    {layout.preview}
                                </div>

                                {/* Label */}
                                <div className="px-1 pb-1">
                                    <p className="text-sm font-medium leading-tight">
                                        {layout.label}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {layout.description}
                                    </p>
                                </div>

                                {/* Selected checkmark */}
                                {isSelected && (
                                    <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                                        <Check className="h-3 w-3 text-primary-foreground" />
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Abbrechen
                    </Button>
                    <Button onClick={handleOpen}>PDF öffnen</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
