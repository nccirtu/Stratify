import { useCallback, useMemo } from 'react';

import { FormRenderer } from '@nccirtu/tablefy/forms';
import { useInertiaForm } from '@nccirtu/tablefy/inertia';

import {
    buildBusinessPlanSchema,
    slugify,
    type BusinessPlanFormData,
    type SchemaOptions,
    type TransactionItem,
} from '@/components/businessplan/form/schema';
import { store as storeBusinessPlan } from '@/wayfinder/routes/businessplan';

type SelectOption = { value: string; label: string; data?: Record<string, unknown> };

export default function CreateBusinessplanForm(props: SchemaOptions) {
    const schema = useMemo(() => buildBusinessPlanSchema(props), [props]);

    const { data, errors, onChange, onSubmit, processing } = useInertiaForm<BusinessPlanFormData>({
        schema,
        url: storeBusinessPlan().url,
        method: 'post',
    });

    const handleChange = useCallback(
        (field: keyof BusinessPlanFormData, value: unknown) => {
            onChange(field, value);

            // Auto-generate slug from name
            if (field === 'name' && typeof value === 'string') {
                onChange('slug', slugify(value));
            }

            // Auto-fill from catalog item in income_transactions
            if (field === 'income_transactions' && Array.isArray(value)) {
                autoFillCatalogItems(value, data.income_transactions, props.incomeCatalogItems, (updated) =>
                    onChange('income_transactions', updated),
                );
            }

            // Auto-fill from catalog item in expense_transactions
            if (field === 'expense_transactions' && Array.isArray(value)) {
                autoFillCatalogItems(value, data.expense_transactions, props.expenseCatalogItems, (updated) =>
                    onChange('expense_transactions', updated),
                );
            }
        },
        [onChange, data, props.incomeCatalogItems, props.expenseCatalogItems],
    );

    return (
        <FormRenderer
            schema={schema}
            data={data}
            errors={errors}
            onChange={handleChange}
            onSubmit={onSubmit}
            processing={processing}
        />
    );
}

function autoFillCatalogItems(
    items: TransactionItem[],
    prevItems: TransactionItem[] | undefined,
    catalogOptions: SelectOption[],
    setItems: (items: TransactionItem[]) => void,
) {
    let changed = false;
    const updated = items.map((item, index) => {
        const prev = prevItems?.[index];
        if (item.catalog_item_id && item.catalog_item_id !== prev?.catalog_item_id) {
            const catalogItem = catalogOptions.find((c) => c.value === item.catalog_item_id);
            if (catalogItem?.data) {
                changed = true;
                return {
                    ...item,
                    name: String(catalogItem.data.name ?? item.name),
                    description: String(catalogItem.data.description ?? item.description),
                    amount: String(catalogItem.data.default_amount ?? item.amount),
                    category_id: String(catalogItem.data.transaction_category_id ?? item.category_id),
                    currency_id: String(catalogItem.data.currency_id ?? item.currency_id),
                    tax_id: String(catalogItem.data.tax_id ?? item.tax_id),
                };
            }
        }
        return item;
    });
    if (changed) {
        setItems(updated);
    }
}
