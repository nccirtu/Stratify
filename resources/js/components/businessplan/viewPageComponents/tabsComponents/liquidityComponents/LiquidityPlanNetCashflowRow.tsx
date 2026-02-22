import { LiquidityRow } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanNetCashflowRowProps {
    row: LiquidityRow;
}

export default function LiquidityPlanNetCashflowRow({ row }: LiquidityPlanNetCashflowRowProps) {
    return (
        <tr className="border-b border-t bg-blue-50 dark:bg-blue-950/30">
            <td className="px-4 py-2 text-sm font-semibold text-blue-800 dark:text-blue-200">{row.label}</td>
            {row.months.map((amount, index) => (
                <td
                    key={index}
                    className={`px-2 py-2 text-right text-sm tabular-nums font-semibold ${
                        amount < 0
                            ? 'text-destructive'
                            : amount === 0
                              ? 'text-muted-foreground'
                              : 'text-blue-700 dark:text-blue-300'
                    }`}
                >
                    {formatter.format(amount)}
                </td>
            ))}
            <td
                className={`px-2 py-2 text-right text-sm tabular-nums font-bold ${
                    row.total < 0
                        ? 'text-destructive'
                        : row.total === 0
                          ? 'text-muted-foreground'
                          : 'text-blue-700 dark:text-blue-300'
                }`}
            >
                {formatter.format(row.total)}
            </td>
        </tr>
    );
}
