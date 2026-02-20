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
        return (
            <MultiSelectItem value={opt.value}>{opt.label}</MultiSelectItem>
        );
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

export default function Step5Usp({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;
    const selectedUsps = data.usp ?? [];

    return (
        <FieldSet>
            <FieldLegend>USP &amp; Skalierung</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihre Alleinstellungsmerkmale und das
                Wachstumspotenzial.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel>
                        Wie hoch ist der Innovationsgrad deines Geschäfts?
                    </FieldLabel>
                    <RadioGroup
                        value={data.inovation_level || ''}
                        onValueChange={(v) => setData({ inovation_level: v })}
                        aria-invalid={!!errors.inovation_level}
                    >
                        {enumOptions.inovationLevels.map((opt) => (
                            <Tooltip key={opt.value}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`inovation_${opt.value}`}
                                        />
                                        <Label htmlFor={`inovation_${opt.value}`}>
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
                    {errors.inovation_level && (
                        <FieldError>{errors.inovation_level}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        Welche Alleinstellungsmerkmale (USPs) sind vorhanden?
                    </FieldLabel>
                    <MultiSelect
                        values={selectedUsps}
                        onValuesChange={(v) => setData({ usp: v })}
                    >
                        <MultiSelectTrigger>
                            <MultiSelectValue placeholder="Optionen wählen" />
                        </MultiSelectTrigger>
                        <MultiSelectContent>
                            {enumOptions.usps.map((opt) => (
                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                            ))}
                        </MultiSelectContent>
                    </MultiSelect>
                    {errors.usp && <FieldError>{errors.usp}</FieldError>}
                </Field>

                {selectedUsps.includes('price_leadership') && (
                    <Field>
                        <FieldLabel>
                            Wie erreichen Sie die Preisführerschaft?
                        </FieldLabel>
                        <MultiSelect
                            values={data.price_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ price_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.priceLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                {selectedUsps.includes('quality_leadership') && (
                    <Field>
                        <FieldLabel>
                            Wie erreichen Sie die Qualitätsführerschaft?
                        </FieldLabel>
                        <MultiSelect
                            values={data.quality_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ quality_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.qualityLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                {selectedUsps.includes('specialist_leadership') && (
                    <Field>
                        <FieldLabel>
                            Wie erreichen Sie die Spezialisierung?
                        </FieldLabel>
                        <MultiSelect
                            values={data.specialist_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ specialist_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.specialistLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                {selectedUsps.includes('technology_leadership') && (
                    <Field>
                        <FieldLabel>
                            Wie erreichen Sie den Technologievorsprung?
                        </FieldLabel>
                        <MultiSelect
                            values={data.technology_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ technology_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.technologyLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                {selectedUsps.includes('exclusive_leadership') && (
                    <Field>
                        <FieldLabel>
                            Zu was haben Sie exklusiven Zugang?
                        </FieldLabel>
                        <MultiSelect
                            values={data.exclusive_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ exclusive_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.exclusiveLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                {selectedUsps.includes('community_leadership') && (
                    <Field>
                        <FieldLabel>
                            Welche Reichweite haben Sie mit Ihrer Marke und
                            Community?
                        </FieldLabel>
                        <MultiSelect
                            values={data.community_leadership ?? []}
                            onValuesChange={(v) =>
                                setData({ community_leadership: v })
                            }
                        >
                            <MultiSelectTrigger>
                                <MultiSelectValue placeholder="Optionen wählen" />
                            </MultiSelectTrigger>
                            <MultiSelectContent>
                                {enumOptions.communityLeaderships.map((opt) => (
                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                ))}
                            </MultiSelectContent>
                        </MultiSelect>
                    </Field>
                )}

                <Field>
                    <FieldLabel htmlFor="usp_text">
                        Beschreiben Sie einige Details zu Ihren ausgewählten
                        Alleinstellungsmerkmalen
                    </FieldLabel>
                    <Textarea
                        id="usp_text"
                        value={data.usp_text || ''}
                        onChange={(e) => setData({ usp_text: e.target.value })}
                        rows={4}
                        placeholder="Unser Alleinstellungsmerkmal liegt in der hochprezisen Fertigung spezialisierter Schraubenlösungen für Industrieller Anwendungen. Durch den Einsatz modernster CNC-Fertigungstechnologien und automatisierter Qualitätskontrollen erreichen wir eine besonders gute Qualität."
                        aria-invalid={!!errors.usp_text}
                    />
                    {errors.usp_text && (
                        <FieldError>{errors.usp_text}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>
                        Wie schnell kann Ihr Modell wachsen?
                    </FieldLabel>
                    <RadioGroup
                        value={data.scalable || ''}
                        onValueChange={(v) => setData({ scalable: v })}
                        aria-invalid={!!errors.scalable}
                    >
                        {enumOptions.scalableCapabilities.map((opt) => (
                            <Tooltip key={opt.value}>
                                <TooltipTrigger asChild>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`scalable_${opt.value}`}
                                        />
                                        <Label htmlFor={`scalable_${opt.value}`}>
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
                    {errors.scalable && (
                        <FieldError>{errors.scalable}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
