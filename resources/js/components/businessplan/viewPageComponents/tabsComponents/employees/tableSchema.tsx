import {
    DateColumn,
    EmptyStateBuilder,
    NumberColumn,
    TableSchema,
    TextColumn,
} from '@nccirtu/tablefy';
import { App } from '@/wayfinder/types';

export type EmployeeData = App.Models.Employee;

export const createEmployeeSchema = () => {
    let schema = TableSchema.make<EmployeeData>()
        .emptyState(
            EmptyStateBuilder.make()
                .title('Noch keine Mitarbeiter vorhanden')
                .description(
                    'Füge Mitarbeiter im Wizard hinzu, um sie hier zu sehen.',
                )
                .build(),
        )
        .searchEmptyState(
            EmptyStateBuilder.make()
                .title('Keine Mitarbeiter gefunden')
                .description(
                    'Deine Suche ergab keine Treffer. Versuche andere Suchbegriffe.',
                )
                .build(),
        )
        .searchable({ placeholder: 'Mitarbeiter suchen' })
        .paginated({ pageSize: 10 })
        .sortable({ id: 'job_title', desc: false })
        .bordered(false)
        .hoverable()
        .columnVisibility();

    schema = schema.columns(
        TextColumn.make<EmployeeData>('job_title')
            .label('Stelle')
            .sortable()
            .visibilityLabel('Stelle')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<EmployeeData>('number_of_employees')
            .label('Anzahl')
            .sortable()
            .visibilityLabel('Anzahl')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<EmployeeData>('salary')
            .label('Gehalt (€/Monat)')
            .sortable()
            .money('EUR')
            .visibilityLabel('Gehalt')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        DateColumn.make<EmployeeData>('date_of_hire')
            .label('Einstellungsdatum')
            .sortable()
            .visibilityLabel('Einstellungsdatum')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        NumberColumn.make<EmployeeData>('payment_day')
            .label('Zahltag')
            .sortable()
            .visibilityLabel('Zahltag')
            .visibleByDefault(true),
    );

    schema = schema.columns(
        TextColumn.make<EmployeeData>('qualification')
            .label('Qualifikation')
            .visibilityLabel('Qualifikation')
            .visibleByDefault(false),
    );

    return schema.build();
};
