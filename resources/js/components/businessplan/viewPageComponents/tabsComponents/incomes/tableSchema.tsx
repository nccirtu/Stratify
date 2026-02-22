import {
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { App } from '@/wayfinder/types';
import { router } from '@inertiajs/react';
import {
    ActionsColumn,
    DateColumn,
    EmptyStateBuilder,
    EnumColumn,
    NumberColumn,
    TableSchema,
    TextColumn,
} from '@nccirtu/tablefy';
import TransactionCreateForm from '@/components/businessplan/viewPageComponents/tabsComponents/transactions/TransactionCreateForm';

export type TransactionData = App.Models.Transaction;

interface SelectOption {
    value: string;
    label: string;
    data?: Record<string, unknown>;
}

interface CreateTransactionSchemaOptions {
    type?: 'income' | 'expense';
    businessPlanId?: number;
    categories?: SelectOption[];
    catalogItems?: SelectOption[];
    currencies?: SelectOption[];
    taxes?: SelectOption[];
}

export const createTransactionSchema = (
    options: CreateTransactionSchemaOptions = {},
) => {
    const {
        type = 'income',
        businessPlanId,
        categories = [],
        catalogItems = [],
        currencies = [],
        taxes = [],
    } = options;

    let schema = TableSchema.make<TransactionData>()
        .headerActions([
            ...(businessPlanId
                ? [
                      {
                          render: () => (
                              <TransactionCreateForm
                                  businessPlanId={businessPlanId}
                                  type={type}
                                  categories={categories}
                                  catalogItems={catalogItems}
                                  currencies={currencies}
                                  taxes={taxes}
                              />
                          ),
                      },
                  ]
                : []),
        ])
        .emptyState(
            EmptyStateBuilder.make()
                .imageUrl(
                    '/assets/images/spotly_grafiken_models/Meine-Rechnungen.png',
                )
                .title('Noch keine Einträge vorhanden')
                .description('Erstelle deinen ersten Eintrag, um loszulegen.')
                .build(),
        )
        .searchEmptyState(
            EmptyStateBuilder.make()
                .imageUrl(
                    '/assets/images/spotly_grafiken_models/Meine-Rechnungen.png',
                )
                .title('Keine Einträge gefunden')
                .description(
                    'Deine Suche ergab keine Treffer. Versuche andere Suchbegriffe.',
                )
                .build(),
        )
        .searchable({ placeholder: 'Suchen' })
        .paginated({ pageSize: 10 })
        .sortable({ id: 'createdAt', desc: true })
        .bordered(false)
        .hoverable()
        .columnVisibility();

    // Name
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

    // Quantity
    schema = schema.columns(
        NumberColumn.make<TransactionData>('quantity')
            .label('Anzahl')
            .sortable()
            .visibilityLabel('Anzahl')
            .visibleByDefault(true),
    );

    // Unit Amount (Einzelbetrag)
    schema = schema.columns(
        NumberColumn.make<TransactionData>('amount')
            .label('Einzelbetrag')
            .sortable()
            .money('EUR')
            .visibilityLabel('Einzelbetrag')
            .visibleByDefault(true),
    );

    // Total Amount (Gesamt)
    schema = schema.columns(
        NumberColumn.make<TransactionData>('total_amount')
            .label('Gesamt')
            .sortable()
            .money('EUR')
            .visibilityLabel('Gesamt')
            .visibleByDefault(true),
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
