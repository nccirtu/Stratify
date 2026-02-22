import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiquidityPlanData } from '@/types/liquidity';
import { App } from '@/wayfinder/types';
import { DataTable } from '@nccirtu/tablefy';
import LiquidityPlanTable from './tabsComponents/liquidityComponents/LiquidityPlanTable';
import {
    TransactionData,
    createTransactionSchema,
} from './tabsComponents/incomes/tableSchema';
import { createEmployeeSchema } from './tabsComponents/employees/tableSchema';
import { createLoanSchema } from './tabsComponents/loans/tableSchema';
import EditFormOverview from './tabsComponents/overview/editFormOverview';

export default function ViewPageTabs({
    transactions,
    catalogItems,
    liquidityPlan,
    employees,
    loans,
}: {
    transactions: TransactionData[];
    catalogItems: App.Models.CatalogItem[];
    liquidityPlan: LiquidityPlanData;
    employees: App.Models.Employee[];
    loans: App.Models.Loan[];
}) {
    const { columns, config } = createTransactionSchema();
    const { columns: employeeColumns, config: employeeConfig } = createEmployeeSchema();
    const { columns: loanColumns, config: loanConfig } = createLoanSchema();

    const incomes = transactions.filter(
        (transaction) => transaction.type === 'income',
    );
    const expenses = transactions.filter(
        (transaction) => transaction.type === 'expense',
    );

    return (
        <Tabs defaultValue="overview">
            <TabsList>
                <TabsTrigger value="overview">Übersicht</TabsTrigger>
                <TabsTrigger value="incomes">Einnahmen</TabsTrigger>
                <TabsTrigger value="expenses">Ausgaben</TabsTrigger>
                <TabsTrigger value="employees">Mitarbeiter</TabsTrigger>
                <TabsTrigger value="loans">Darlehen</TabsTrigger>
                <TabsTrigger value="liquidityPlan">Liquiditätsplan</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle>Übersicht</CardTitle>
                        <CardDescription>
                            Bearbeite die Übersicht deines Businessplans.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <EditFormOverview />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="incomes">
                <Card className={'bg-white'}>
                    <CardHeader>
                        <CardTitle>Einkommen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={incomes}
                            config={config}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="expenses">
                <Card className={'bg-white'}>
                    <CardHeader>
                        <CardTitle>Ausgaben</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        <DataTable
                            columns={columns}
                            data={expenses}
                            config={config}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="employees">
                <Card className={'bg-white'}>
                    <CardHeader>
                        <CardTitle>Mitarbeiter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={employeeColumns}
                            data={employees}
                            config={employeeConfig}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="loans">
                <Card className={'bg-white'}>
                    <CardHeader>
                        <CardTitle>Darlehen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={loanColumns}
                            data={loans}
                            config={loanConfig}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="liquidityPlan">
                <Card className={'bg-white'}>
                    <CardHeader>
                        <CardTitle>Liquiditätsplan</CardTitle>
                        <CardDescription>
                            Übersicht aller Ein- und Auszahlungen im Planungszeitraum.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <LiquidityPlanTable data={liquidityPlan} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="analytics">
                <Card>
                    <CardHeader>
                        <CardTitle>Bereiche</CardTitle>
                        <CardDescription>
                            Manage your account preferences and options.
                            Customize your experience to fit your needs.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                        Configure notifications, security, and themes.
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
