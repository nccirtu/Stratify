'use client';

import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts';

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

const chartConfig = {
    value: {
        label: 'Nettocashflow',
    },
} satisfies ChartConfig;

interface ChartBarNegativeProps {
    periods: string[];
    values: number[];
    title?: string;
    description?: string;
}

export function ChartBarNegative({
    periods,
    values,
    title = 'Nettocashflow',
    description,
}: ChartBarNegativeProps) {
    const chartData = periods.map((period, i) => ({
        period,
        value: values[i] ?? 0,
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent hideLabel hideIndicator />
                            }
                        />
                        <Bar dataKey="value">
                            <LabelList
                                position="top"
                                dataKey="period"
                                fillOpacity={1}
                            />
                            {chartData.map((item) => (
                                <Cell
                                    key={item.period}
                                    fill={
                                        item.value >= 0
                                            ? 'var(--color-green-500)'
                                            : 'var(--color-red-500)'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
