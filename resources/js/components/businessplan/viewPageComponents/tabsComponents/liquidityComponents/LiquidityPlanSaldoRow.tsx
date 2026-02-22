import { LiquidityRow } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanSaldoRowProps {
    row: LiquidityRow;
}

export default function LiquidityPlanSaldoRow({ row }: LiquidityPlanSaldoRowProps) {
    return (
        <tr className="border-b-2 bg-primary/10 dark:bg-primary/20">
            <td className="px-4 py-2.5 text-sm font-bold text-primary">{row.label}</td>
            {row.months.map((amount, index) => (
                <td
                    key={index}
                    className={`px-2 py-2.5 text-right text-sm tabular-nums font-bold ${
                        amount < 0 ? 'text-destructive' : 'text-primary'
                    }`}
                >
                    {formatter.format(amount)}
                </td>
            ))}
            <td
                className={`px-2 py-2.5 text-right text-sm tabular-nums font-bold ${
                    row.total < 0 ? 'text-destructive' : 'text-primary'
                }`}
            >
                {formatter.format(row.total)}
            </td>
        </tr>
    );
}
