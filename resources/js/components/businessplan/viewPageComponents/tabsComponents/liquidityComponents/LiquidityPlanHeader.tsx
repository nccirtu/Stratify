interface LiquidityPlanHeaderProps {
    columns: string[];
    totalLabel?: string;
}

export default function LiquidityPlanHeader({ columns, totalLabel = 'Summe' }: LiquidityPlanHeaderProps) {
    return (
        <thead>
            <tr className="border-b bg-muted/50">
                <th className="w-64 px-4 py-2 text-left text-sm font-semibold text-muted-foreground">Position</th>
                {columns.map((col) => (
                    <th key={col} className="min-w-20 px-2 py-2 text-right text-sm font-semibold text-muted-foreground">
                        {col}
                    </th>
                ))}
                <th className="min-w-24 px-2 py-2 text-right text-sm font-semibold text-muted-foreground">
                    {totalLabel}
                </th>
            </tr>
        </thead>
    );
}
