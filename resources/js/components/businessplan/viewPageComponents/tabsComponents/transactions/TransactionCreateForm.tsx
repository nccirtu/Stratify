import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { storeTransaction } from '@/wayfinder/App/Http/Controllers/BusinessPlanController';
import React from 'react';

interface SelectOption {
    value: string;
    label: string;
    data?: Record<string, unknown>;
}

interface TransactionCreateFormProps {
    businessPlanId: number;
    type: 'income' | 'expense';
    categories: SelectOption[];
    catalogItems: SelectOption[];
    currencies: SelectOption[];
    taxes: SelectOption[];
}

const frequencies = [
    { value: 'daily', label: 'Täglich' },
    { value: 'weekly', label: 'Wöchentlich' },
    { value: 'monthly', label: 'Monatlich' },
    { value: 'quarterly', label: 'Quartalsweise' },
    { value: 'yearly', label: 'Jährlich' },
];

export default function TransactionCreateForm({
    businessPlanId,
    type,
    categories,
    catalogItems,
    currencies,
    taxes,
}: TransactionCreateFormProps) {
    const [open, setOpen] = React.useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        amount: '',
        quantity: '1',
        date: '',
        category_id: '',
        currency_id: '',
        tax_id: '',
        catalog_item_id: '',
        payment_method: '',
        type,
        is_recurring: false as boolean,
        frequency: '',
        day_of_month: '',
        start_date: '',
        end_date: '',
    });

    const handleCatalogChange = (catalogItemId: string) => {
        const catalog = catalogItems.find((c) => c.value === catalogItemId);
        const catalogData = catalog?.data as Record<string, unknown> | undefined;
        setData({
            ...data,
            catalog_item_id: catalogItemId,
            name: (catalogData?.name as string) || data.name,
            description: (catalogData?.description as string) || data.description,
            amount: catalogData?.default_amount ? String(catalogData.default_amount) : data.amount,
            category_id: catalogData?.transaction_category_id ? String(catalogData.transaction_category_id) : data.category_id,
            currency_id: catalogData?.currency_id ? String(catalogData.currency_id) : data.currency_id,
            tax_id: catalogData?.tax_id ? String(catalogData.tax_id) : data.tax_id,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(storeTransaction.url(businessPlanId), {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const buttonLabel = type === 'income' ? 'Einnahme hinzufügen' : 'Ausgabe hinzufügen';
    const legendLabel = type === 'income' ? 'Neue Einnahme' : 'Neue Ausgabe';
    const descriptionLabel =
        type === 'income'
            ? 'Erfassen Sie eine neue Einnahme für diesen Businessplan.'
            : 'Erfassen Sie eine neue Ausgabe für diesen Businessplan.';

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{legendLabel}</DialogTitle>
                    <DialogDescription>{descriptionLabel}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <FieldSet>
                        <FieldGroup>
                            {catalogItems.length > 0 && (
                                <Field>
                                    <FieldLabel>Katalogvorlage</FieldLabel>
                                    <Select
                                        value={data.catalog_item_id}
                                        onValueChange={handleCatalogChange}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Vorlage wählen (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {catalogItems.map((c) => (
                                                <SelectItem key={c.value} value={c.value}>
                                                    {c.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </Field>
                            )}

                            <Field>
                                <FieldLabel>Name *</FieldLabel>
                                <Input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    aria-invalid={!!errors.name}
                                />
                                {errors.name && <FieldError>{errors.name}</FieldError>}
                            </Field>

                            <Field>
                                <FieldLabel>Beschreibung</FieldLabel>
                                <Textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={2}
                                />
                            </Field>

                            <div className="grid grid-cols-3 gap-4">
                                <Field>
                                    <FieldLabel>Anzahl</FieldLabel>
                                    <Input
                                        type="number"
                                        min={1}
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Betrag (Einzeln) *</FieldLabel>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        aria-invalid={!!errors.amount}
                                    />
                                    {errors.amount && <FieldError>{errors.amount}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel>Datum</FieldLabel>
                                    <Input
                                        type="date"
                                        value={data.date}
                                        onChange={(e) => setData('date', e.target.value)}
                                    />
                                </Field>
                            </div>

                            {data.quantity && data.amount && (
                                <div className="rounded-md bg-secondary px-3 py-2 text-sm text-muted-foreground">
                                    Gesamt:{' '}
                                    <span className="font-semibold text-foreground">
                                        {(
                                            (parseFloat(data.quantity) || 1) *
                                            (parseFloat(data.amount) || 0)
                                        ).toLocaleString('de-DE', {
                                            style: 'currency',
                                            currency: 'EUR',
                                        })}
                                    </span>
                                    {' '}({data.quantity} ×{' '}
                                    {parseFloat(data.amount || '0').toLocaleString('de-DE', {
                                        style: 'currency',
                                        currency: 'EUR',
                                    })}
                                    )
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>Kategorie *</FieldLabel>
                                    <Select
                                        value={data.category_id}
                                        onValueChange={(v) => setData('category_id', v)}
                                    >
                                        <SelectTrigger aria-invalid={!!errors.category_id}>
                                            <SelectValue placeholder="Kategorie" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((c) => (
                                                <SelectItem key={c.value} value={c.value}>
                                                    {c.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <FieldError>{errors.category_id}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel>Währung *</FieldLabel>
                                    <Select
                                        value={data.currency_id}
                                        onValueChange={(v) => setData('currency_id', v)}
                                    >
                                        <SelectTrigger aria-invalid={!!errors.currency_id}>
                                            <SelectValue placeholder="Währung" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currencies.map((c) => (
                                                <SelectItem key={c.value} value={c.value}>
                                                    {c.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.currency_id && <FieldError>{errors.currency_id}</FieldError>}
                                </Field>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel>Steuer *</FieldLabel>
                                    <Select
                                        value={data.tax_id}
                                        onValueChange={(v) => setData('tax_id', v)}
                                    >
                                        <SelectTrigger aria-invalid={!!errors.tax_id}>
                                            <SelectValue placeholder="Steuer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {taxes.map((t) => (
                                                <SelectItem key={t.value} value={t.value}>
                                                    {t.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.tax_id && <FieldError>{errors.tax_id}</FieldError>}
                                </Field>

                                <Field>
                                    <FieldLabel>Zahlungsmethode</FieldLabel>
                                    <Input
                                        value={data.payment_method}
                                        onChange={(e) => setData('payment_method', e.target.value)}
                                        placeholder="z.B. Überweisung"
                                    />
                                </Field>
                            </div>

                            <Field orientation="horizontal">
                                <Switch
                                    checked={data.is_recurring}
                                    onCheckedChange={(checked) => setData('is_recurring', checked)}
                                />
                                <FieldLabel>Wiederkehrend</FieldLabel>
                            </Field>

                            {data.is_recurring && (
                                <div className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel>Frequenz</FieldLabel>
                                        <Select
                                            value={data.frequency}
                                            onValueChange={(v) => setData('frequency', v)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Frequenz" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {frequencies.map((f) => (
                                                    <SelectItem key={f.value} value={f.value}>
                                                        {f.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.frequency && <FieldError>{errors.frequency}</FieldError>}
                                    </Field>

                                    <Field>
                                        <FieldLabel>Tag im Monat</FieldLabel>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={31}
                                            value={data.day_of_month}
                                            onChange={(e) => setData('day_of_month', e.target.value)}
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel>Startdatum</FieldLabel>
                                        <Input
                                            type="date"
                                            value={data.start_date}
                                            onChange={(e) => setData('start_date', e.target.value)}
                                        />
                                        {errors.start_date && <FieldError>{errors.start_date}</FieldError>}
                                    </Field>

                                    <Field>
                                        <FieldLabel>Enddatum</FieldLabel>
                                        <Input
                                            type="date"
                                            value={data.end_date}
                                            onChange={(e) => setData('end_date', e.target.value)}
                                        />
                                    </Field>
                                </div>
                            )}
                        </FieldGroup>
                    </FieldSet>

                    <div className="mt-6 flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Abbrechen
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Speichern...' : 'Speichern'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
