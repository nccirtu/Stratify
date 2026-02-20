import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@nccirtu/tablefy';
import {
    TransactionData,
    createTransactionSchema,
} from './tabsComponents/incomes/tableSchema';
import EditFormOverview from './tabsComponents/overview/editFormOverview';
import { App } from '@/wayfinder/types';

export default function ViewPageTabs({
    transactions, catalogItems,
}: {
    transactions: TransactionData[]; catalogItems: App.Models.CatalogItem[];
}) {
    const { columns, config } = createTransactionSchema();

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
