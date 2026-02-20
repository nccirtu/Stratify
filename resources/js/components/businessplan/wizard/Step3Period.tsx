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
import type { WizardStepProps } from './types';

export default function Step3Vorhaben({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;

    return (
        <FieldSet>
            <FieldLegend>Dein Vorhaben</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihr Ziel und den Planungszeitraum.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="businessplan_target">
                        Was ist dein Ziel mit dem Businessplan?
                    </FieldLabel>
                    <Select
                        value={data.businessplan_target || ''}
                        onValueChange={(v) =>
                            setData({ businessplan_target: v })
                        }
                    >
                        <SelectTrigger id="businessplan_target">
                            <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {enumOptions.businessplanTargets.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.businessplan_target && (
                        <FieldError>{errors.businessplan_target}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Wofür benötigst du Kapital?</FieldLabel>
                    <MultiSelect
                        values={data.capital_usage ?? []}
                        onValuesChange={(v) => setData({ capital_usage: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.capitalUsages.map((opt) => (
                                <MultiSelectItem
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </MultiSelectItem>
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.capital_usage && (
                        <FieldError>{errors.capital_usage}</FieldError>
                    )}
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="period_from">
                            Planungszeitraum von
                        </FieldLabel>
                        <Input
                            id="period_from"
                            type="date"
                            value={data.period_from || ''}
                            onChange={(e) =>
                                setData({ period_from: e.target.value })
                            }
                            aria-invalid={!!errors.period_from}
                        />
                        {errors.period_from && (
                            <FieldError>{errors.period_from}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="period_until">
                            Planungszeitraum bis
                        </FieldLabel>
                        <Input
                            id="period_until"
                            type="date"
                            value={data.period_until || ''}
                            onChange={(e) =>
                                setData({ period_until: e.target.value })
                            }
                            aria-invalid={!!errors.period_until}
                        />
                        {errors.period_until && (
                            <FieldError>{errors.period_until}</FieldError>
                        )}
                    </Field>
                </div>
            </FieldGroup>
        </FieldSet>
    );
}
