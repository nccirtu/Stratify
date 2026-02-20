import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { WizardStepProps } from './types';

export default function Step4Details({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;
    const showLastYearRevenue =
        data.business_activities === 'first_sales' ||
        data.business_activities === 'pilot_customer';

    return (
        <FieldSet>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihre aktuelle Geschäftssituation und das
                Geschäftsmodell.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>
                        Welches Geschäftsmodell verfolgen Sie?
                    </FieldLabel>
                    <MultiSelect
                        values={data.business_model ?? []}
                        onValuesChange={(v) => setData({ business_model: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.businessModels.map((opt) => (
                                <MultiSelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.business_model && (
                        <FieldError>{errors.business_model}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="customer_problems">
                        Welches Problem lösen Sie?
                    </FieldLabel>
                    <Textarea
                        id="customer_problems"
                        value={data.customer_problems || ''}
                        onChange={(e) =>
                            setData({ customer_problems: e.target.value })
                        }
                        rows={4}
                        placeholder="Unsere Schrauben lassen sich einfacher verbauen und werden umweltschonender hergestellt..."
                        aria-invalid={!!errors.customer_problems}
                    />
                    {errors.customer_problems && (
                        <FieldError>{errors.customer_problems}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="business_activities">
                        Werden Umsätze bereits erwirtschaftet?
                    </FieldLabel>
                    <Select
                        value={data.business_activities || ''}
                        onValueChange={(v) =>
                            setData({ business_activities: v })
                        }
                    >
                        <SelectTrigger id="business_activities">
                            <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {enumOptions.businessActivities.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.business_activities && (
                        <FieldError>{errors.business_activities}</FieldError>
                    )}
                </Field>

                {showLastYearRevenue && (
                    <Field>
                        <FieldLabel htmlFor="last_year_revenue">
                            Jahresumsatz letztes Jahr (€)
                        </FieldLabel>
                        <Input
                            id="last_year_revenue"
                            type="number"
                            min="0"
                            step="0.01"
                            value={data.last_year_revenue || ''}
                            onChange={(e) =>
                                setData({ last_year_revenue: e.target.value })
                            }
                            placeholder="0.00"
                            aria-invalid={!!errors.last_year_revenue}
                        />
                        {errors.last_year_revenue && (
                            <FieldError>{errors.last_year_revenue}</FieldError>
                        )}
                    </Field>
                )}
            </FieldGroup>
        </FieldSet>
    );
}
