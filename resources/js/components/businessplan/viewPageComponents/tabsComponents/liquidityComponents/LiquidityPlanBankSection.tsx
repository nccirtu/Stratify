import { LiquidityBankAccount } from '@/types/liquidity';

const formatter = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

interface LiquidityPlanBankSectionProps {
    bank: LiquidityBankAccount;
}

function AmountCell({ amount, highlight }: { amount: number; highlight?: boolean }) {
    const colorClass = highlight
        ? amount < 0
            ? 'text-destructive font-semibold'
            : 'text-green-700 dark:text-green-400 font-semibold'
        : 'text-muted-foreground';

    return <td className={`px-2 py-1.5 text-right text-sm tabular-nums ${colorClass}`}>{formatter.format(amount)}</td>;
}

export default function LiquidityPlanBankSection({ bank }: LiquidityPlanBankSectionProps) {
    return (
        <>
            {/* IST-Kontostand row */}
            <tr className="border-b hover:bg-muted/30 transition-colors">
                <td className="px-4 py-1.5 text-sm pl-8 text-foreground">{bank.name} (IST-Kontostand)</td>
                {bank.ist_months.map((amount, index) => (
                    <AmountCell key={index} amount={amount} />
                ))}
                <td className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground">—</td>
            </tr>

            {/* Dispo-Rahmen row – only shown if dispo_limit > 0 */}
            {bank.dispo_limit > 0 && (
                <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-1.5 text-sm pl-8 text-muted-foreground italic">Dispo-Rahmen</td>
                    {bank.dispo_months.map((amount, index) => (
                        <td key={index} className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground italic">
                            {formatter.format(amount)}
                        </td>
                    ))}
                    <td className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground italic">—</td>
                </tr>
            )}

            {/* Verfügbar gesamt row – only shown if dispo_limit > 0 */}
            {bank.dispo_limit > 0 && (
                <tr className="border-b hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-1.5 text-sm pl-8 font-medium text-foreground">Verfügbar gesamt (inkl. Dispo)</td>
                    {bank.available_months.map((amount, index) => (
                        <AmountCell key={index} amount={amount} highlight />
                    ))}
                    <td className="px-2 py-1.5 text-right text-sm tabular-nums text-muted-foreground">—</td>
                </tr>
            )}
        </>
    );
}
