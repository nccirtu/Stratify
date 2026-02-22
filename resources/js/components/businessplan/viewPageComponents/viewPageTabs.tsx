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
import { ChartBarNegative } from './charts/chartBarNegative';
import { ChartPieSeparatorNone } from './charts/chartPieSeparatorNone';
import LiquidityViewSelector from './tabsComponents/liquidityComponents/LiquidityViewSelector';

interface SelectOption {
    value: string;
    label: string;
    data?: Record<string, unknown>;
}

export default function ViewPageTabs({
    transactions,
    liquidityPlan,
    employees,
    loans,
    businessPlanId,
    currencies = [],
    taxes = [],
    incomeCategories = [],
    expenseCategories = [],
    incomeCatalogItems = [],
    expenseCatalogItems = [],
}: {
    transactions: TransactionData[];
    catalogItems: App.Models.CatalogItem[];
    liquidityPlan: LiquidityPlanData;
    employees: App.Models.Employee[];
    loans: App.Models.Loan[];
    businessPlanId?: number;
    currencies?: SelectOption[];
    taxes?: SelectOption[];
    incomeCategories?: SelectOption[];
    expenseCategories?: SelectOption[];
    incomeCatalogItems?: SelectOption[];
    expenseCatalogItems?: SelectOption[];
}) {
    const { columns: incomeColumns, config: incomeConfig } = createTransactionSchema({
        type: 'income',
        businessPlanId,
        categories: incomeCategories,
        catalogItems: incomeCatalogItems,
        currencies,
        taxes,
    });

    const { columns: expenseColumns, config: expenseConfig } = createTransactionSchema({
        type: 'expense',
        businessPlanId,
        categories: expenseCategories,
        catalogItems: expenseCatalogItems,
        currencies,
        taxes,
    });

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
                <div className="mb-4 flex justify-end">
                    <LiquidityViewSelector data={liquidityPlan} />
                </div>
                <div className="mb-4 grid grid-cols-3 gap-4">
                    <ChartBarNegative
                        periods={liquidityPlan.columns}
                        values={liquidityPlan.net_cashflow.months}
                        title="Nettocashflow"
                        description={`Liquiditätsplan ${liquidityPlan.year}`}
                    />
                    <ChartPieSeparatorNone
                        title="Einnahmen nach Kategorie"
                        data={liquidityPlan.chart_income_by_category}
                    />
                    <ChartPieSeparatorNone
                        title="Ausgaben nach Kategorie"
                        data={liquidityPlan.chart_expense_by_category}
                    />
                </div>
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
                            columns={incomeColumns}
                            data={incomes}
                            config={incomeConfig}
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
                            columns={expenseColumns}
                            data={expenses}
                            config={expenseConfig}
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
                            Übersicht aller Ein- und Auszahlungen im
                            Planungszeitraum.
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
