import { Button } from '@/components/ui/button';
import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import {
    ActionsColumn,
    DateColumn,
    EmptyStateBuilder,
    EnumColumn,
    NumberColumn,
    TableSchema,
    TextColumn,
} from '@nccirtu/tablefy';
import { Download, Plus } from 'lucide-react';

export type TransactionData = App.Data.TransactionData;

export const createTransactionSchema = (
    options: CreateTransactionSchemaOptions = {},
) => {
    let schema = TableSchema.make<TransactionData>()
        .headerActions([
            {
                render: () => (
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Exportieren
                    </Button>
                ),
            },
            {
                render: () => (
                    <Button asChild>
                        <Link
                            href="/transactions/create"
                            className="flex items-center space-x-2"
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Neue Transaktion erstellen
                        </Link>
                    </Button>
                ),
            },
        ])
        .emptyState(
            EmptyStateBuilder.make()
                .imageUrl(
                    '/assets/images/spotly_grafiken_models/Meine-Rechnungen.png',
                )
                .title('Noch keine Rechnungen vorhanden')
                .description('Erstelle deine erste Rechnung, um loszulegen.')
                .build(),
        )
        .searchEmptyState(
            EmptyStateBuilder.make()
                .imageUrl(
                    '/assets/images/spotly_grafiken_models/Meine-Rechnungen.png',
                )
                .title('Keine Rechnungen gefunden')
                .description(
                    'Deine Suche ergab keine Treffer. Versuche andere Suchbegriffe.',
                )
                .build(),
        )
        .searchable({ placeholder: 'Rechnung suchen' })
        .paginated({ pageSize: 10 })
        .sortable({ id: 'createdAt', desc: true })
        .bordered(false)
        .hoverable()
        .columnVisibility();

    // Transaction Number
    schema = schema.columns(
        TextColumn.make<TransactionData>('name')
            .label('Name')
            .sortable()
            .visibilityLabel('Name')
            .visibleByDefault(true),
    );

    // Date
    schema = schema.columns(
        DateColumn.make<TransactionData>('date')
            .label('Datum')
            .sortable()
            .visibilityLabel('Datum')
            .visibleByDefault(true),
    );

    // Overdue Date
    schema = schema.columns(
        DateColumn.make<TransactionData>('date_overdue')
            .label('Überfällig am')
            .sortable()
            .visibilityLabel('Überfällig am')
            .visibleByDefault(true),
    );

    // Total Amount (Netto)
    schema = schema.columns(
        NumberColumn.make<TransactionData>('amount')
            .label('Betrag')
            .sortable()
            .money('EUR')
            .visibilityLabel('Betrag')
            .visibleByDefault(true),
    );

    // Total Amount with Tax (Brutto)
    schema = schema.columns(
        NumberColumn.make<TransactionData>('total_amount')
            .label('Betrag Brutto')
            .sortable()
            .money('EUR')
            .visibilityLabel('Betrag Brutto')
            .visibleByDefault(false),
    );

    // Status
    schema = schema.columns(
        EnumColumn.make<TransactionData>('status')
            .label('Status')
            .sortable()
            .searchable()
            .visibilityLabel('Status')
            .visibleByDefault(true)
            .options([
                { value: 'validated', label: 'Freigegeben', color: 'success' },
                {
                    value: 'pending',
                    label: 'Wartet auf Freigabe',
                    color: 'warning',
                },
                { value: 'cancelled', label: 'Storniert', color: 'secondary' },
            ]),
    );

    // Payment Status
    schema = schema.columns(
        EnumColumn.make<BillData>('paymentStatus')
            .label('Zahlungsstatus')
            .sortable()
            .searchable()
            .visibilityLabel('Zahlungsstatus')
            .visibleByDefault(true)
            .options([
                { value: 'open_payment', label: 'Offen', color: 'warning' },
                {
                    value: 'partially_paid',
                    label: 'Teilweise bezahlt',
                    color: 'info',
                },
                { value: 'paid', label: 'Bezahlt', color: 'success' },
                { value: 'overdue', label: 'Überfällig', color: 'destructive' },
            ]),
    );

    // Actions
    schema = schema.columns(
        ActionsColumn.make<TransactionData>()
            .label('Aktionen')
            .action({
                render: (transaction: TransactionData) => (
                    <>
                        <DropdownMenuItem
                            onSelect={() =>
                                router.visit(
                                    `/transactions/${transaction.id}/edit`,
                                )
                            }
                        >
                            Transaktion bearbeiten
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                ),
            }),
    );

    return schema.build();
};
