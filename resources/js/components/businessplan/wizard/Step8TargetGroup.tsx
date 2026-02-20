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

export default function Step8TargetGroup({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;
    const clientType = data.client_type ?? [];
    const isB2C = clientType.includes('b2c');
    const isB2B = clientType.includes('b2b');
    const isB2G = clientType.includes('b2g');
    const isD2C = clientType.includes('d2c');

    return (
        <FieldSet>
            <FieldLegend>Zielgruppe</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihre Zielgruppe und deren Kaufverhalten.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>
                        Kaufentscheidung erfolgt hauptsächlich über:
                    </FieldLabel>
                    <MultiSelect
                        values={data.purchase_decision ?? []}
                        onValuesChange={(v) => setData({ purchase_decision: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.purchaseDecisions.map((opt) => (
                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.purchase_decision && (
                        <FieldError>{errors.purchase_decision}</FieldError>
                    )}
                </Field>

                {isB2C && (
                    <>
                        <Field>
                            <FieldLabel>
                                Zu welcher Altersgruppe gehört Ihr Zielkunde?
                            </FieldLabel>
                            <RadioGroup
                                value={data.age_group || ''}
                                onValueChange={(v) => setData({ age_group: v })}
                                aria-invalid={!!errors.age_group}
                            >
                                {enumOptions.ageGroups.map((opt) => (
                                    <Tooltip key={opt.value}>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    value={opt.value}
                                                    id={`age_group_${opt.value}`}
                                                />
                                                <Label htmlFor={`age_group_${opt.value}`}>
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
                            {errors.age_group && (
                                <FieldError>{errors.age_group}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>
                                In welcher Lebenssituation ist Ihr Zielkunde?
                            </FieldLabel>
                            <RadioGroup
                                value={data.life_situation || ''}
                                onValueChange={(v) =>
                                    setData({ life_situation: v })
                                }
                                aria-invalid={!!errors.life_situation}
                            >
                                {enumOptions.lifeSituations.map((opt) => (
                                    <Tooltip key={opt.value}>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem
                                                    value={opt.value}
                                                    id={`life_situation_${opt.value}`}
                                                />
                                                <Label
                                                    htmlFor={`life_situation_${opt.value}`}
                                                >
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
                            {errors.life_situation && (
                                <FieldError>{errors.life_situation}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>
                                Wo informiert sich Ihre Zielgruppe?
                            </FieldLabel>
                            <MultiSelect
                                values={data.information_target_group ?? []}
                                onValuesChange={(v) =>
                                    setData({ information_target_group: v })
                                }
                            >
                                <MultiSelectTrigger>
                                    <MultiSelectValue placeholder="Optionen wählen" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    {enumOptions.informationTargetGroups.map((opt) => (
                                        <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                    ))}
                                </MultiSelectContent>
                            </MultiSelect>
                            {errors.information_target_group && (
                                <FieldError>
                                    {errors.information_target_group}
                                </FieldError>
                            )}
                        </Field>
                    </>
                )}

                {isB2B && (
                    <Field>
                        <FieldLabel>
                            Welche Art von Unternehmen gehört zu Ihrer
                            Hauptzielgruppe?
                        </FieldLabel>
                        <MultiSelect
                            values={data.company_target_group ?? []}
                            onValuesChange={(v) =>
                                setData({ company_target_group: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.companyTargetGroups.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                        {errors.company_target_group && (
                            <FieldError>{errors.company_target_group}</FieldError>
                        )}
                    </Field>
                )}

                {isB2G && (
                    <Field>
                        <FieldLabel>
                            Erfolgt die Auftragsvergabe über öffentliche
                            Ausschreibungen?
                        </FieldLabel>
                        <RadioGroup
                            value={data.public_tenders || ''}
                            onValueChange={(v) => setData({ public_tenders: v })}
                            aria-invalid={!!errors.public_tenders}
                        >
                            {enumOptions.publicTenders.map((opt) => (
                                <Tooltip key={opt.value}>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-2">
                                            <RadioGroupItem
                                                value={opt.value}
                                                id={`public_tenders_${opt.value}`}
                                            />
                                            <Label
                                                htmlFor={`public_tenders_${opt.value}`}
                                            >
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
                        {errors.public_tenders && (
                            <FieldError>{errors.public_tenders}</FieldError>
                        )}
                    </Field>
                )}

                {isD2C && (
                    <Field>
                        <FieldLabel>
                            Über welche Kanäle verkaufen Sie direkt?
                        </FieldLabel>
                        <MultiSelect
                            values={data.channels ?? []}
                            onValuesChange={(v) => setData({ channels: v })}
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.channels.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                        {errors.channels && (
                            <FieldError>{errors.channels}</FieldError>
                        )}
                    </Field>
                )}
            </FieldGroup>
        </FieldSet>
    );
}
