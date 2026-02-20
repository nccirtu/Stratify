import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { SelectOption, WizardStepProps } from './types';

function TooltipMultiSelectItem({ opt }: { opt: SelectOption }) {
    if (!opt.tooltip) {
        return <MultiSelectItem value={opt.value}>{opt.label}</MultiSelectItem>;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <MultiSelectItem value={opt.value}>{opt.label}</MultiSelectItem>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-64">
                {opt.tooltip}
            </TooltipContent>
        </Tooltip>
    );
}

export default function Step6Products({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;
    const showDetailsPropertyRights =
        data.property_rights.length > 0 &&
        !data.property_rights.every((v) => v === 'keine');

    return (
        <FieldSet>
            <FieldLegend>Produkte und Dienstleistungen</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihr Angebot, den Entwicklungsstand und Ihre
                Preisstrategie.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>
                        Welche Art des Angebots haben Sie?
                    </FieldLabel>
                    <MultiSelect
                        values={data.offer_type ?? []}
                        onValuesChange={(v) => setData({ offer_type: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.offerTypes.map((opt) => (
                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.offer_type && (
                        <FieldError>{errors.offer_type}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        Wie ist der aktuelle Entwicklungsstand Ihres Angebots?
                    </FieldLabel>
                    <RadioGroup
                        value={data.development_state || ''}
                        onValueChange={(v) => setData({ development_state: v })}
                        aria-invalid={!!errors.development_state}
                    >
                        {enumOptions.developmentStates.map((opt) => (
                            <Tooltip key={opt.value}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`dev_state_${opt.value}`}
                                        />
                                        <Label htmlFor={`dev_state_${opt.value}`}>
                                            {opt.label}
                                        </Label>
                                    </div>
                                </TooltipTrigger>
                                {opt.tooltip && (
                                    <TooltipContent side="right" className="max-w-64">
                                        {opt.tooltip}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        ))}
                    </RadioGroup>
                    {errors.development_state && (
                        <FieldError>{errors.development_state}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Sind Schutzrechte vorhanden?</FieldLabel>
                    <MultiSelect
                        values={data.property_rights ?? []}
                        onValuesChange={(v) => setData({ property_rights: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.propertyRights.map((opt) => (
                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.property_rights && (
                        <FieldError>{errors.property_rights}</FieldError>
                    )}
                </Field>

                {showDetailsPropertyRights && (
                    <Field>
                        <FieldLabel htmlFor="details_property_rights">
                            Erläutern Sie Details zu Ihren Schutzrechten
                        </FieldLabel>
                        <Textarea
                            id="details_property_rights"
                            value={data.details_property_rights || ''}
                            onChange={(e) =>
                                setData({ details_property_rights: e.target.value })
                            }
                            rows={3}
                            placeholder="z. B. Patentanmeldung läuft seit 2024, Registrierung in DE und EU..."
                            aria-invalid={!!errors.details_property_rights}
                        />
                        {errors.details_property_rights && (
                            <FieldError>{errors.details_property_rights}</FieldError>
                        )}
                    </Field>
                )}

                <Field>
                    <FieldLabel>Welche Preisstrategie verfolgen Sie?</FieldLabel>
                    <RadioGroup
                        value={data.pricing_stategie || ''}
                        onValueChange={(v) => setData({ pricing_stategie: v })}
                        aria-invalid={!!errors.pricing_stategie}
                    >
                        {enumOptions.pricingStrategies.map((opt) => (
                            <Tooltip key={opt.value}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`pricing_${opt.value}`}
                                        />
                                        <Label htmlFor={`pricing_${opt.value}`}>
                                            {opt.label}
                                        </Label>
                                    </div>
                                </TooltipTrigger>
                                {opt.tooltip && (
                                    <TooltipContent side="right" className="max-w-64">
                                        {opt.tooltip}
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        ))}
                    </RadioGroup>
                    {errors.pricing_stategie && (
                        <FieldError>{errors.pricing_stategie}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
