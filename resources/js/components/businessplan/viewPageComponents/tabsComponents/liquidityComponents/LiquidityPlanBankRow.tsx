import { LiquidityBankAccount } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanBankRowProps {
    bank: LiquidityBankAccount;
}

export default function LiquidityPlanBankRow({ bank }: LiquidityPlanBankRowProps) {
    return (
        <tr className="border-b hover:bg-muted/30 transition-colors">
            <td className="px-4 py-1.5 text-sm text-muted-foreground pl-8">{bank.name}</td>
            {bank.months.map((amount, index) => (
                <td
                    key={index}
                    className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground"
                >
                    {formatter.format(amount)}
                </td>
            ))}
            <td className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground">—</td>
        </tr>
    );
}
