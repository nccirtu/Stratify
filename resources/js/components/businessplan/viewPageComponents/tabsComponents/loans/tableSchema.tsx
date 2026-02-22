import {
    DateColumn,
    EmptyStateBuilder,
    NumberColumn,
    TableSchema,
    TextColumn,
} from '@nccirtu/tablefy';
import { App } from '@/wayfinder/types';

export type LoanData = App.Models.Loan;

export const createLoanSchema = () => {
    let schema = TableSchema.make<LoanData>()
        .emptyState(
            EmptyStateBuilder.make()
                .title('Noch keine Darlehen vorhanden')
                .description(
                    'Füge Darlehen im Wizard hinzu, um sie hier zu sehen.',
                )
                .build(),
        )
        .searchEmptyState(
            EmptyStateBuilder.make()
                .title('Keine Darlehen gefunden')
                .description(
                    'Deine Suche ergab keine Treffer. Versuche andere Suchbegriffe.',
                )
                .build(),
        )
        .searchable({ placeholder: 'Darlehen suchen' })
        .paginated({ pageSize: 10 })
        .sortable({ id: 'name', desc: false })
        .bordered(false)
        .hoverable()
        .columnVisibility();

    schema = schema.columns(
        TextColumn.make<LoanData>('name')
            .label('Bezeichnung')
            .sortable()
            .visibilityLabel('Bezeichnung')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<LoanData>('loan_amount')
            .label('Darlehensbetrag')
            .sortable()
            .money('EUR')
            .visibilityLabel('Darlehensbetrag')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<LoanData>('interest_rate')
            .label('Zinssatz (% p.a.)')
            .sortable()
            .visibilityLabel('Zinssatz')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<LoanData>('monthly_installment')
            .label('Monatliche Rate')
            .sortable()
            .money('EUR')
            .visibilityLabel('Monatliche Rate')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        DateColumn.make<LoanData>('start_date')
            .label('Startdatum')
            .sortable()
            .visibilityLabel('Startdatum')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        DateColumn.make<LoanData>('end_date')
            .label('Enddatum')
            .sortable()
            .visibilityLabel('Enddatum')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<LoanData>('payment_day')
            .label('Zahltag')
            .sortable()
            .visibilityLabel('Zahltag')
            .visibleByDefault(true),
    );

    return schema.build();
};
