import * as React from 'react';
import { Check, ChevronDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';

interface MultiSelectContextValue {
    values: string[];
    onValuesChange: (values: string[]) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}

const MultiSelectContext = React.createContext<MultiSelectContextValue>({
    values: [],
    onValuesChange: () => {},
    open: false,
    setOpen: () => {},
});

interface MultiSelectProps {
    values: string[];
    onValuesChange: (values: string[]) => void;
    children: React.ReactNode;
}

function MultiSelect({ values, onValuesChange, children }: MultiSelectProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <MultiSelectContext.Provider
            value={{ values, onValuesChange, open, setOpen }}
        >
            <Popover open={open} onOpenChange={setOpen}>
                {children}
            </Popover>
        </MultiSelectContext.Provider>
    );
}

interface MultiSelectTriggerProps {
    children: React.ReactNode;
    className?: string;
}

function MultiSelectTrigger({
    children,
    className,
}: MultiSelectTriggerProps) {
    const { open } = React.useContext(MultiSelectContext);

    return (
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={cn(
                    'w-full justify-between font-normal h-auto min-h-9 py-1.5',
                    className,
                )}
            >
                {children}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
        </PopoverTrigger>
    );
}

function MultiSelectValue({ placeholder }: { placeholder?: string }) {
    const { values, onValuesChange } = React.useContext(MultiSelectContext);

    if (values.length === 0) {
        return (
            <span className="text-muted-foreground">
                {placeholder ?? 'Wähle eine oder mehrere Optionen'}
            </span>
        );
    }

    return (
        <div className="flex flex-wrap gap-1">
            {values.map((value) => (
                <Badge
                    key={value}
                    variant="secondary"
                    className="text-xs cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        onValuesChange(values.filter((v) => v !== value));
                    }}
                >
                    {value}
                    <X className="ml-1 h-3 w-3" />
                </Badge>
            ))}
        </div>
    );
}

function MultiSelectContent({ children }: { children: React.ReactNode }) {
    return (
        <PopoverContent className="w-full min-w-[var(--radix-popover-trigger-width)] p-1">
            <div className="max-h-60 overflow-y-auto">{children}</div>
        </PopoverContent>
    );
}

interface MultiSelectItemProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
    children: React.ReactNode;
}

const MultiSelectItem = React.forwardRef<HTMLDivElement, MultiSelectItemProps>(
    ({ value, children, className, onClick, ...props }, ref) => {
        const { values, onValuesChange } =
            React.useContext(MultiSelectContext);
        const isSelected = values.includes(value);

        const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
            if (isSelected) {
                onValuesChange(values.filter((v) => v !== value));
            } else {
                onValuesChange([...values, value]);
            }
            onClick?.(e);
        };

        return (
            <div
                ref={ref}
                role="option"
                aria-selected={isSelected}
                onClick={handleSelect}
                className={cn(
                    'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors',
                    'hover:bg-accent hover:text-accent-foreground',
                    isSelected && 'bg-accent/50',
                    className,
                )}
                {...props}
            >
                <div
                    className={cn(
                        'flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                        isSelected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-input',
                    )}
                >
                    {isSelected && <Check className="h-3 w-3" />}
                </div>
                {children}
            </div>
        );
    },
);
MultiSelectItem.displayName = 'MultiSelectItem';

export {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
};
