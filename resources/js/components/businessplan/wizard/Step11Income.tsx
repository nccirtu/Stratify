import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, Trash2 } from 'lucide-react';
import type { TransactionItem, WizardStepProps } from './types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const emptyTransaction: TransactionItem = {
    catalog_item_id: '',
    name: '',
    description: '',
    amount: '',
    quantity: '1',
    category_id: '',
    currency_id: '',
    tax_id: '',
    date: '',
    payment_method: '',
    is_recurring: false,
    frequency: '',
    day_of_month: '',
    start_date: '',
    end_date: '',
    type: 'income',
};

const frequencies = [
    { value: 'daily', label: 'Täglich' },
    { value: 'weekly', label: 'Wöchentlich' },
    { value: 'monthly', label: 'Monatlich' },
    { value: 'quarterly', label: 'Quartalsweise' },
    { value: 'yearly', label: 'Jährlich' },
];

export default function Step11Income({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const items = data.income_transactions || [];
    const [openItems, setOpenItems] = React.useState<boolean[]>(() =>
        items.map(() => false),
    );

    const setItemOpen = (index: number, open: boolean) => {
        setOpenItems((prev) => prev.map((v, i) => (i === index ? open : v)));
    };

    const updateItem = (index: number, patch: Partial<TransactionItem>) => {
        const updated = items.map((item, i) =>
            i === index ? { ...item, ...patch } : item,
        );
        setData({ income_transactions: updated });
    };

    const addItem = () => {
        setData({ income_transactions: [...items, { ...emptyTransaction }] });
        setOpenItems((prev) => [...prev, false]);
    };

    const removeItem = (index: number) => {
        setData({ income_transactions: items.filter((_, i) => i !== index) });
        setOpenItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCatalogChange = (index: number, catalogItemId: string) => {
        const catalog = options.incomeCatalogItems.find(
            (c) => c.value === catalogItemId,
        );
        const catalogData = catalog?.data as Record<string, any> | undefined;
        updateItem(index, {
            catalog_item_id: catalogItemId,
            name: catalogData?.name || '',
            description: catalogData?.description || '',
            amount: catalogData?.default_amount
                ? String(catalogData.default_amount)
                : '',
            category_id: catalogData?.transaction_category_id
                ? String(catalogData.transaction_category_id)
                : '',
            currency_id: catalogData?.currency_id
                ? String(catalogData.currency_id)
                : '',
            tax_id: catalogData?.tax_id ? String(catalogData.tax_id) : '',
        });
    };

    return (
        <Card>
            <CardContent>
                <FieldSet>
                    <FieldLegend>Einnahmen</FieldLegend>
                    <FieldDescription>
                        Erfassen Sie Ihre geplanten Einnahmen.
                    </FieldDescription>

                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <Collapsible
                                key={index}
                                open={openItems[index]}
                                onOpenChange={(open) =>
                                    setItemOpen(index, open)
                                }
                                className="rounded-lg border"
                            >
                                <div className="flex items-center justify-between px-4 py-3">
                                    <CollapsibleTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex flex-1 items-center gap-2 text-left text-sm font-medium"
                                        >
                                            <ChevronDown
                                                className={cn(
                                                    'h-4 w-4 shrink-0 transition-transform duration-200',
                                                    openItems[index] &&
                                                        'rotate-180',
                                                )}
                                            />
                                            {item.name
                                                ? item.name
                                                : `Einnahme ${index + 1}`}
                                        </button>
                                    </CollapsibleTrigger>
                                    {item.quantity && item.amount && (
                                        <div className="px-2 text-sm text-muted-foreground">
                                            Gesamt:{' '}
                                            <span className="font-semibold text-foreground">
                                                {(
                                                    (parseFloat(
                                                        item.quantity,
                                                    ) || 1) *
                                                    (parseFloat(item.amount) ||
                                                        0)
                                                ).toLocaleString('de-DE', {
                                                    style: 'currency',
                                                    currency: 'EUR',
                                                })}
                                            </span>{' '}
                                            ({item.quantity} ×{' '}
                                            {parseFloat(
                                                item.amount || '0',
                                            ).toLocaleString('de-DE', {
                                                style: 'currency',
                                                currency: 'EUR',
                                            })}
                                            )
                                        </div>
                                    )}
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <CollapsibleContent>
                                    <div className="border-t px-4 pt-3 pb-4">
                                        <FieldGroup>
                                            <Field>
                                                <FieldLabel>
                                                    Katalogvorlage
                                                </FieldLabel>
                                                <Select
                                                    value={
                                                        item.catalog_item_id ||
                                                        ''
                                                    }
                                                    onValueChange={(v) =>
                                                        handleCatalogChange(
                                                            index,
                                                            v,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Vorlage wählen (optional)" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {options.incomeCatalogItems.map(
                                                            (c) => (
                                                                <SelectItem
                                                                    key={
                                                                        c.value
                                                                    }
                                                                    value={
                                                                        c.value
                                                                    }
                                                                >
                                                                    {c.label}
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </Field>

                                            <Field>
                                                <FieldLabel>Name</FieldLabel>
                                                <Input
                                                    value={item.name}
                                                    onChange={(e) =>
                                                        updateItem(index, {
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                    aria-invalid={
                                                        !!errors[
                                                            `income_transactions.${index}.name`
                                                        ]
                                                    }
                                                />
                                                {errors[
                                                    `income_transactions.${index}.name`
                                                ] && (
                                                    <FieldError>
                                                        {
                                                            errors[
                                                                `income_transactions.${index}.name`
                                                            ]
                                                        }
                                                    </FieldError>
                                                )}
                                            </Field>

                                            <Field>
                                                <FieldLabel>
                                                    Beschreibung
                                                </FieldLabel>
                                                <Textarea
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        updateItem(index, {
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={2}
                                                />
                                            </Field>

                                            <div className="grid grid-cols-3 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Anzahl
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        value={item.quantity}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                quantity:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Betrag (Einzeln)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        value={item.amount}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                amount: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `income_transactions.${index}.amount`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `income_transactions.${index}.amount`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `income_transactions.${index}.amount`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Datum
                                                    </FieldLabel>
                                                    <Input
                                                        type="date"
                                                        value={item.date}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                date: e.target
                                                                    .value,
                                                            })
                                                        }
                                                    />
                                                </Field>
                                            </div>
                                            {item.quantity && item.amount && (
                                                <div className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">
                                                    Gesamt:{' '}
                                                    <span className="font-semibold text-foreground">
                                                        {(
                                                            (parseFloat(
                                                                item.quantity,
                                                            ) || 1) *
                                                            (parseFloat(
                                                                item.amount,
                                                            ) || 0)
                                                        ).toLocaleString(
                                                            'de-DE',
                                                            {
                                                                style: 'currency',
                                                                currency: 'EUR',
                                                            },
                                                        )}
                                                    </span>{' '}
                                                    ({item.quantity} ×{' '}
                                                    {parseFloat(
                                                        item.amount || '0',
                                                    ).toLocaleString('de-DE', {
                                                        style: 'currency',
                                                        currency: 'EUR',
                                                    })}
                                                    )
                                                </div>
                                            )}

                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Kategorie
                                                    </FieldLabel>
                                                    <Select
                                                        value={
                                                            item.category_id ||
                                                            ''
                                                        }
                                                        onValueChange={(v) =>
                                                            updateItem(index, {
                                                                category_id: v,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Kategorie" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {options.incomeCategories.map(
                                                                (c) => (
                                                                    <SelectItem
                                                                        key={
                                                                            c.value
                                                                        }
                                                                        value={
                                                                            c.value
                                                                        }
                                                                    >
                                                                        {
                                                                            c.label
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Währung
                                                    </FieldLabel>
                                                    <Select
                                                        value={
                                                            item.currency_id ||
                                                            ''
                                                        }
                                                        onValueChange={(v) =>
                                                            updateItem(index, {
                                                                currency_id: v,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Währung" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {options.currencies.map(
                                                                (c) => (
                                                                    <SelectItem
                                                                        key={
                                                                            c.value
                                                                        }
                                                                        value={
                                                                            c.value
                                                                        }
                                                                    >
                                                                        {
                                                                            c.label
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Steuer
                                                    </FieldLabel>
                                                    <Select
                                                        value={
                                                            item.tax_id || ''
                                                        }
                                                        onValueChange={(v) =>
                                                            updateItem(index, {
                                                                tax_id: v,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Steuer" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {options.taxes.map(
                                                                (t) => (
                                                                    <SelectItem
                                                                        key={
                                                                            t.value
                                                                        }
                                                                        value={
                                                                            t.value
                                                                        }
                                                                    >
                                                                        {
                                                                            t.label
                                                                        }
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Zahlungsmethode
                                                    </FieldLabel>
                                                    <Input
                                                        value={
                                                            item.payment_method
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                payment_method:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder="z.B. Überweisung"
                                                        aria-invalid={
                                                            !!errors[
                                                                `income_transactions.${index}.payment_method`
                                                            ]
                                                        }
                                                    />
                                                </Field>
                                            </div>

                                            <Field orientation="horizontal">
                                                <Switch
                                                    checked={item.is_recurring}
                                                    onCheckedChange={(
                                                        checked,
                                                    ) =>
                                                        updateItem(index, {
                                                            is_recurring:
                                                                checked,
                                                        })
                                                    }
                                                />
                                                <FieldLabel>
                                                    Wiederkehrend
                                                </FieldLabel>
                                            </Field>

                                            {item.is_recurring && (
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Field>
                                                        <FieldLabel>
                                                            Frequenz
                                                        </FieldLabel>
                                                        <Select
                                                            value={
                                                                item.frequency ||
                                                                ''
                                                            }
                                                            onValueChange={(
                                                                v,
                                                            ) =>
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        frequency:
                                                                            v,
                                                                    },
                                                                )
                                                            }
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Frequenz" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {frequencies.map(
                                                                    (f) => (
                                                                        <SelectItem
                                                                            key={
                                                                                f.value
                                                                            }
                                                                            value={
                                                                                f.value
                                                                            }
                                                                        >
                                                                            {
                                                                                f.label
                                                                            }
                                                                        </SelectItem>
                                                                    ),
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </Field>

                                                    <Field>
                                                        <FieldLabel>
                                                            Tag im Monat
                                                        </FieldLabel>
                                                        <Input
                                                            type="number"
                                                            min={1}
                                                            max={31}
                                                            value={
                                                                item.day_of_month
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        day_of_month:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Field>

                                                    <Field>
                                                        <FieldLabel>
                                                            Startdatum
                                                        </FieldLabel>
                                                        <Input
                                                            type="date"
                                                            value={
                                                                item.start_date
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        start_date:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Field>

                                                    <Field>
                                                        <FieldLabel>
                                                            Enddatum
                                                        </FieldLabel>
                                                        <Input
                                                            type="date"
                                                            value={
                                                                item.end_date
                                                            }
                                                            onChange={(e) =>
                                                                updateItem(
                                                                    index,
                                                                    {
                                                                        end_date:
                                                                            e
                                                                                .target
                                                                                .value,
                                                                    },
                                                                )
                                                            }
                                                        />
                                                    </Field>
                                                </div>
                                            )}
                                        </FieldGroup>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                        >
                            Einnahme hinzufügen
                        </Button>
                    </div>
                </FieldSet>
            </CardContent>
        </Card>
    );
}
