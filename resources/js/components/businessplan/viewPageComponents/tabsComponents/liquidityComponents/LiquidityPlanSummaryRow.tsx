import { LiquidityRow } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanSummaryRowProps {
    row: LiquidityRow;
    variant?: 'income' | 'expense' | 'neutral';
}

const variantClasses: Record<string, string> = {
    income: 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200',
    expense: 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200',
    neutral: 'bg-muted/60 text-foreground',
};

export default function LiquidityPlanSummaryRow({ row, variant = 'neutral' }: LiquidityPlanSummaryRowProps) {
    const classes = variantClasses[variant];

    return (
        <tr className={`border-b border-t ${classes}`}>
            <td className="px-4 py-2 text-sm font-semibold">{row.label}</td>
            {row.months.map((amount, index) => (
                <td key={index} className="px-2 py-2 text-right text-sm tabular-nums font-semibold">
                    {formatter.format(amount)}
                </td>
            ))}
            <td className="px-2 py-2 text-right text-sm tabular-nums font-bold">
                {formatter.format(row.total)}
            </td>
        </tr>
    );
}
