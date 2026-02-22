import { LiquidityPlanData } from '@/types/liquidity';
import LiquidityPlanBankSection from './LiquidityPlanBankSection';
import LiquidityPlanHeader from './LiquidityPlanHeader';
import LiquidityPlanNetCashflowRow from './LiquidityPlanNetCashflowRow';
import LiquidityPlanSaldoRow from './LiquidityPlanSaldoRow';
import LiquidityPlanSection from './LiquidityPlanSection';
import LiquidityViewSelector from './LiquidityViewSelector';

interface LiquidityPlanTableProps {
    data: LiquidityPlanData;
}

export default function LiquidityPlanTable({ data }: LiquidityPlanTableProps) {
    const hasBankAccounts = data.bank_accounts.length > 0;

    const totalLabel = data.view === 'year' ? 'Jahressumme' : 'Wochensumme';

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                    Anfangssaldo:{' '}
                    <span className="font-medium text-foreground">
                        {new Intl.NumberFormat('de-DE', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }).format(data.opening_balance)}{' '}
                        €
                    </span>
                </div>
                <LiquidityViewSelector data={data} />
            </div>

            <div className="overflow-x-auto rounded-md border">
                <table className="w-full text-sm">
                    <LiquidityPlanHeader columns={data.columns} totalLabel={totalLabel} />
                    <tbody>
                        {data.sections.map((section) => (
                            <LiquidityPlanSection key={section.key} section={section} />
                        ))}

                        <LiquidityPlanNetCashflowRow row={data.net_cashflow} />
                        <LiquidityPlanSaldoRow row={data.saldo} />

                        {hasBankAccounts && (
                            <>
                                <tr className="bg-muted/40">
                                    <td
                                        colSpan={data.columns.length + 2}
                                        className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground"
                                    >
                                        Stand Kontokorrent Konto (IST-Stände)
                                    </td>
                                </tr>
                                {data.bank_accounts.map((bank, index) => (
                                    <LiquidityPlanBankSection key={index} bank={bank} />
                                ))}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
