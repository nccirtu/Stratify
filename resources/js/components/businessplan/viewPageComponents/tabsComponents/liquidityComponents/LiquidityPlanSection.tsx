import { LiquiditySection } from '@/types/liquidity';
import LiquidityPlanRow from './LiquidityPlanRow';
import LiquidityPlanSummaryRow from './LiquidityPlanSummaryRow';

const sectionVariants: Record<string, 'income' | 'expense' | 'neutral'> = {
    income: 'income',
    investment: 'expense',
    operational: 'expense',
    financing: 'expense',
};

interface LiquidityPlanSectionProps {
    section: LiquiditySection;
}

export default function LiquidityPlanSection({ section }: LiquidityPlanSectionProps) {
    const summaryVariant = sectionVariants[section.key] ?? 'neutral';

    return (
        <>
            <tr className="bg-muted/40">
                <td
                    colSpan={99}
                    className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                >
                    {section.label}
                </td>
            </tr>
            {section.rows.map((row) => (
                <LiquidityPlanRow key={row.account_id ?? row.label} row={row} />
            ))}
            <LiquidityPlanSummaryRow row={section.summary} variant={summaryVariant} />
            <tr className="h-1">
                <td colSpan={99} />
            </tr>
        </>
    );
}
