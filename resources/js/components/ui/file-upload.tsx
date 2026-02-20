import * as React from 'react';
import { Upload, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
    value?: File | null;
    onChange: (file: File | null) => void;
    accept?: string;
    maxSize?: number;
    placeholder?: string;
    className?: string;
}

export function FileUpload({
    value,
    onChange,
    accept,
    maxSize,
    placeholder = 'Datei auswählen',
    className,
}: FileUploadProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (value && value instanceof File) {
            if (value.type.startsWith('image/')) {
                const url = URL.createObjectURL(value);
                setPreviewUrl(url);
                return () => URL.revokeObjectURL(url);
            }
        } else {
            setPreviewUrl(null);
        }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setError(null);

        if (file && maxSize && file.size > maxSize) {
            setError(
                `Die Datei ist zu groß. Maximal ${Math.round(maxSize / 1024 / 1024)} MB erlaubt.`,
            );
            return;
        }

        onChange(file);
    };

    const handleRemove = () => {
        onChange(null);
        setError(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={cn('space-y-2', className)}>
            <div
                className={cn(
                    'flex items-center gap-3 rounded-md border border-dashed p-3 transition-colors',
                    'hover:border-primary/50 hover:bg-muted/30 cursor-pointer',
                )}
                onClick={() => inputRef.current?.click()}
            >
                {previewUrl ? (
                    <img
                        src={previewUrl}
                        alt="Vorschau"
                        className="h-12 w-12 rounded object-cover shrink-0"
                    />
                ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-muted shrink-0">
                        <Upload className="h-5 w-5 text-muted-foreground" />
                    </div>
                )}

                <div className="flex-1 min-w-0">
                    {value ? (
                        <p className="text-sm font-medium truncate">{value.name}</p>
                    ) : (
                        <p className="text-sm text-muted-foreground">{placeholder}</p>
                    )}
                    {accept && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {accept.split(',').join(', ')}
                        </p>
                    )}
                </div>

                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="shrink-0"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleChange}
                className="hidden"
            />

            {error && (
                <p className="text-sm text-destructive">{error}</p>
            )}
        </div>
    );
}
