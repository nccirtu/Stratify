import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';

interface LiquidityYearSelectorProps {
    currentYear: number;
    availableYears: number[];
}

export default function LiquidityYearSelector({ currentYear, availableYears }: LiquidityYearSelectorProps) {
    function handleYearChange(year: string) {
        router.visit(window.location.pathname, {
            data: { year },
            preserveScroll: true,
            preserveState: false,
        });
    }

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Jahr:</span>
            <Select value={String(currentYear)} onValueChange={handleYearChange}>
                <SelectTrigger className="w-28">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {availableYears.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
