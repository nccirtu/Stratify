'use client';

import { Pie, PieChart } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from '@/components/ui/chart';
import { LiquidityChartCategory } from '@/types/liquidity';

const CHART_COLORS = [
    'var(--color-blue-500)',
    'var(--color-emerald-500)',
    'var(--color-amber-500)',
    'var(--color-rose-500)',
    'var(--color-violet-500)',
    'var(--color-cyan-500)',
    'var(--color-orange-500)',
    'var(--color-pink-500)',
];

interface ChartPieSeparatorNoneProps {
    title: string;
    description?: string;
    data: LiquidityChartCategory[];
}

export function ChartPieSeparatorNone({
    title,
    description,
    data,
}: ChartPieSeparatorNoneProps) {
    const chartData = data.map((item, i) => ({
        category: item.category,
        value: item.value,
        fill: CHART_COLORS[i % CHART_COLORS.length],
    }));

    const chartConfig = Object.fromEntries(
        data.map((item, i) => [
            item.category,
            {
                label: item.category,
                color: CHART_COLORS[i % CHART_COLORS.length],
            },
        ]),
    ) satisfies ChartConfig;

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {chartData.length === 0 ? (
                    <div className="flex aspect-square max-h-[250px] items-center justify-center mx-auto text-sm text-muted-foreground">
                        Keine Daten vorhanden
                    </div>
                ) : (
                    <div className="flex items-start gap-4">
                        <ChartContainer
                            config={chartConfig}
                            className="h-[220px] w-[220px] shrink-0"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="category"
                                    stroke="0"
                                />
                            </PieChart>
                        </ChartContainer>
                        <div className="flex flex-col gap-2">
                            {chartData.map((item) => (
                                <div key={item.category} className="flex items-center gap-2 text-sm">
                                    <div
                                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                                        style={{ backgroundColor: item.fill }}
                                    />
                                    <span className="text-muted-foreground">{item.category}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
