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

export default function Step7Market({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;

    return (
        <FieldSet>
            <FieldLegend>Markt und Wettbewerb</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihren Zielmarkt und die aktuelle Marktlage.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>
                        In welchem Markt sind Sie hauptsächlich tätig?
                    </FieldLabel>
                    <MultiSelect
                        values={data.client_type ?? []}
                        onValuesChange={(v) => setData({ client_type: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.clientTypes.map((opt) => (
                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.client_type && (
                        <FieldError>{errors.client_type}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        Wie würden Sie die aktuelle Entwicklung Ihres
                        Zielmarktes einschätzen?
                    </FieldLabel>
                    <RadioGroup
                        value={data.target_market || ''}
                        onValueChange={(v) => setData({ target_market: v })}
                        aria-invalid={!!errors.target_market}
                    >
                        {enumOptions.targetMarkets.map((opt) => (
                            <Tooltip key={opt.value}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`target_market_${opt.value}`}
                                        />
                                        <Label htmlFor={`target_market_${opt.value}`}>
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
                    {errors.target_market && (
                        <FieldError>{errors.target_market}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
