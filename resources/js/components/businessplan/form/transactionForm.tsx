import { Form } from '@inertiajs/react';
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { App } from '@/wayfinder/types';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';

interface TransactionFormProps {
    catalogItems: App.Models.CatalogItem[];
    transactionsCategories: App.Models.TransactionCategory[];
    currencies: App.Models.Currency[];
    taxes: App.Models.Tax[];
}


export default function TransactionForm({catalogItems, transactionsCategories, currencies, taxes}: TransactionFormProps) {
    return (
        <Form>
            <FieldGroup>
                {/* Template Selection */}
                <Field>
                    <FieldLabel htmlFor="checkout-7j9-catalog-item-1a2">
                        Vorlage wählen (wenn benötigt oder vorhanden)
                    </FieldLabel>
                    <Select defaultValue="">
                        <SelectTrigger id="checkout-7j9-catalog-item-1a2">
                            <SelectValue placeholder="Vorlage auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {catalogItems?.length > 0 ? (
                                    catalogItems.map((catalogItem) => (
                                        <SelectItem
                                            value={String(catalogItem.id)}
                                            key={catalogItem.id}
                                        >
                                            {catalogItem.name}
                                        </SelectItem>
                                    ))
                                ) : (
                                    <SelectItem value="none" disabled>
                                        Keine Vorlagen gefunden
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </Field>

                <FieldSet>
                    <FieldLegend>Details</FieldLegend>
                    <FieldDescription>
                        Gib hier die Details deiner Transaktion ein, um sie
                        genau zu beschreiben
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input
                                id="name"
                                placeholder="Verkaufsprodukt XYZ"
                                required
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="description">
                                Beschreibung
                            </FieldLabel>
                            <Textarea
                                id="description"
                                placeholder="Beschreibung der Einnahme oder Ausgabe"
                                className="resize-none"
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="transactionsCategories">
                                Kategorie wählen
                            </FieldLabel>
                            <Select defaultValue="">
                                <SelectTrigger id="transactionsCategories">
                                    <SelectValue placeholder="Kategorie wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {transactionsCategories?.length > 0 ? (
                                            transactionsCategories.map(
                                                (transactionsCategory) => (
                                                    <SelectItem
                                                        value={String(
                                                            transactionsCategory.id,
                                                        )}
                                                        key={
                                                            transactionsCategory.id
                                                        }
                                                    >
                                                        {
                                                            transactionsCategory.name
                                                        }
                                                    </SelectItem>
                                                ),
                                            )
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                Keine Kategorie gefunden
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </FieldSet>
                <FieldSeparator />
                <FieldSet>
                    <div className="grid grid-cols-3 gap-4">
                        <Field>
                            <FieldLabel htmlFor="default_amount">
                                Standardbetrag
                            </FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <InputGroupText>€</InputGroupText>
                                </InputGroupAddon>
                                <InputGroupInput placeholder="0.00" />
                                <InputGroupAddon align="inline-end">
                                    <InputGroupText>EUR</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="currency">
                                Währung wählen
                            </FieldLabel>
                            <Select defaultValue="">
                                <SelectTrigger id="currency">
                                    <SelectValue placeholder="wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {currencies.length > 0 ? (
                                            currencies.map((currency) => (
                                                <SelectItem
                                                    value={String(currency.id)}
                                                    key={currency.id}
                                                >
                                                    {currency.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                Keine Währung gefunden
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="tax">Steuer wählen</FieldLabel>
                            <Select defaultValue="">
                                <SelectTrigger id="tax">
                                    <SelectValue placeholder="wählen" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {taxes.length > 0 ? (
                                            taxes.map((tax) => (
                                                <SelectItem
                                                    value={String(tax.id)}
                                                    key={tax.id}
                                                >
                                                    {tax.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                Keine Steuer gefunden
                                            </SelectItem>
                                        )}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                    <Field orientation="horizontal">
                        <Checkbox id="isRecurring" name="isRecurring" />
                        <Label htmlFor="isRecurring">
                            Wiederkehrende Transaktion
                        </Label>
                    </Field>
                </FieldSet>
                <FieldSet>
                    <FieldLegend>Wiederkehrende Transaktion</FieldLegend>
                    <FieldDescription>
                        Gib hier den Turnus der wiederkehrenden Transaktion an, damit sie automatisch in deinem Businessplan berücksichtigt wird. Zum Beispiel monatlich, vierteljährlich oder jährlich.
                    </FieldDescription>
                    <FieldGroup>

                    </FieldGroup>
                </FieldSet>
                <Field orientation="horizontal">
                    <Button type="submit">Submit</Button>
                    <Button variant="outline" type="button">
                        Cancel
                    </Button>
                </Field>
            </FieldGroup>
        </Form>
    );
}
