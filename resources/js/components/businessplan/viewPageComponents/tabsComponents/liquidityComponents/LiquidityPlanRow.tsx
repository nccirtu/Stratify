import { LiquidityRow } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanRowProps {
    row: LiquidityRow;
}

export default function LiquidityPlanRow({ row }: LiquidityPlanRowProps) {
    return (
        <tr className="border-b hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 text-sm text-foreground">{row.label}</td>
            {row.months.map((amount, index) => (
                <td
                    key={index}
                    className="px-2 py-1.5 text-right text-sm tabular-nums text-foreground"
                >
                    {formatter.format(amount)}
                </td>
            ))}
            <td className="px-2 py-1.5 text-right text-sm tabular-nums font-medium text-foreground">
                {formatter.format(row.total)}
            </td>
        </tr>
    );
}
