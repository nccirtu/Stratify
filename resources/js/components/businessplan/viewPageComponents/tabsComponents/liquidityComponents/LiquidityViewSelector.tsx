import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LiquidityPlanData } from '@/types/liquidity';
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LiquidityViewSelectorProps {
    data: LiquidityPlanData;
}

export default function LiquidityViewSelector({ data }: LiquidityViewSelectorProps) {
    function navigate(params: Record<string, string | number>) {
        router.visit(window.location.pathname, {
            data: params,
            preserveScroll: true,
            preserveState: true,
        });
    }

    function handleViewChange(view: string) {
        if (!view) return;
        const params: Record<string, string | number> = { view, year: data.year };
        if (view === 'week') {
            params.week = data.iso_week ?? 1;
        }
        navigate(params);
    }

    function handleYearChange(year: string) {
        navigate({ view: data.view, year });
    }

    function handleWeekChange(week: string) {
        navigate({ view: 'week', year: data.year, week });
    }

    function handleWeekPrev() {
        const currentWeek = data.iso_week ?? 1;
        if (currentWeek > 1) {
            navigate({ view: 'week', year: data.year, week: currentWeek - 1 });
        } else {
            navigate({ view: 'week', year: data.year - 1, week: 52 });
        }
    }

    function handleWeekNext() {
        const currentWeek = data.iso_week ?? 1;
        navigate({ view: 'week', year: data.year, week: currentWeek + 1 });
    }

    const currentWeek = data.iso_week ?? 1;

    return (
        <div className="flex flex-wrap items-center gap-3">
            <ToggleGroup type="single" variant="outline" value={data.view} onValueChange={handleViewChange}>
                <ToggleGroupItem value="year">Jahr</ToggleGroupItem>
                <ToggleGroupItem value="week">Woche</ToggleGroupItem>
            </ToggleGroup>

            <Select value={String(data.year)} onValueChange={handleYearChange}>
                <SelectTrigger className="w-28">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {data.available_years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                            {year}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {data.view === 'week' && (
                <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" onClick={handleWeekPrev} className="h-9 w-9">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Select value={String(currentWeek)} onValueChange={handleWeekChange}>
                        <SelectTrigger className="w-28">
                            <SelectValue placeholder="KW wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from({ length: 53 }, (_, i) => i + 1).map((week) => (
                                <SelectItem key={week} value={String(week)}>
                                    KW {week}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={handleWeekNext} className="h-9 w-9">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
