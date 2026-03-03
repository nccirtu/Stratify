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
import { Card, CardContent } from '@/components/ui/card';
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

export default function Step14Marketing({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;

    const marketingChannels = data.marketing_channels ?? [];
    const hasSocialAds = marketingChannels.includes('social_ads');

    return (
        <Card>
            <CardContent>
                <FieldSet>
                    <FieldLegend>Marketing</FieldLegend>
                    <FieldDescription>
                        Beschreiben Sie Ihre Marketingstrategie, Kanäle und Budget.
                    </FieldDescription>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Welche Marketingkanäle möchten Sie nutzen?</FieldLabel>
                            <MultiSelect
                                values={marketingChannels}
                                onValuesChange={(v) => setData({ marketing_channels: v })}
                            >
                                <MultiSelectTrigger>
                                    <MultiSelectValue placeholder="Optionen wählen" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    {enumOptions.marketingChannels.map((opt) => (
                                        <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                    ))}
                                </MultiSelectContent>
                            </MultiSelect>
                            {errors.marketing_channels && (
                                <FieldError>{errors.marketing_channels}</FieldError>
                            )}
                        </Field>

                        {hasSocialAds && (
                            <Field>
                                <FieldLabel>Auf welchen Plattformen planen Sie Social Ads?</FieldLabel>
                                <MultiSelect
                                    values={data.social_ads_platforms ?? []}
                                    onValuesChange={(v) => setData({ social_ads_platforms: v })}
                                >
                                    <MultiSelectTrigger>
                                        <MultiSelectValue placeholder="Optionen wählen" />
                                    </MultiSelectTrigger>
                                    <MultiSelectContent>
                                        {enumOptions.socialAdsPlatforms.map((opt) => (
                                            <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                        ))}
                                    </MultiSelectContent>
                                </MultiSelect>
                                {errors.social_ads_platforms && (
                                    <FieldError>{errors.social_ads_platforms}</FieldError>
                                )}
                            </Field>
                        )}

                        <Field>
                            <FieldLabel>
                                Haben Sie bereits Erfahrung im gewählten Marketingkanal?
                            </FieldLabel>
                            <RadioGroup
                                value={data.marketing_experience || ''}
                                onValueChange={(v) => setData({ marketing_experience: v })}
                                aria-invalid={!!errors.marketing_experience}
                            >
                                {enumOptions.marketingExperiences.map((opt) => (
                                    <div key={opt.value} className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`marketing_experience_${opt.value}`}
                                        />
                                        <Label htmlFor={`marketing_experience_${opt.value}`}>
                                            {opt.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {errors.marketing_experience && (
                                <FieldError>{errors.marketing_experience}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Wer übernimmt das Marketing?</FieldLabel>
                            <MultiSelect
                                values={data.marketing_responsibility ?? []}
                                onValuesChange={(v) => setData({ marketing_responsibility: v })}
                            >
                                <MultiSelectTrigger>
                                    <MultiSelectValue placeholder="Optionen wählen" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    {enumOptions.marketingResponsibilities.map((opt) => (
                                        <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                    ))}
                                </MultiSelectContent>
                            </MultiSelect>
                            {errors.marketing_responsibility && (
                                <FieldError>{errors.marketing_responsibility}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Ist Marketing-Infrastruktur vorhanden?</FieldLabel>
                            <MultiSelect
                                values={data.marketing_infrastructure ?? []}
                                onValuesChange={(v) => setData({ marketing_infrastructure: v })}
                            >
                                <MultiSelectTrigger>
                                    <MultiSelectValue placeholder="Optionen wählen" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    {enumOptions.marketingInfrastructures.map((opt) => (
                                        <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                    ))}
                                </MultiSelectContent>
                            </MultiSelect>
                            {errors.marketing_infrastructure && (
                                <FieldError>{errors.marketing_infrastructure}</FieldError>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel>Monatliches Marketingbudget</FieldLabel>
                            <RadioGroup
                                value={data.marketing_budget_monthly || ''}
                                onValueChange={(v) => setData({ marketing_budget_monthly: v })}
                                aria-invalid={!!errors.marketing_budget_monthly}
                            >
                                {enumOptions.marketingBudgets.map((opt) => (
                                    <div key={opt.value} className="flex items-center gap-2">
                                        <RadioGroupItem
                                            value={opt.value}
                                            id={`marketing_budget_${opt.value}`}
                                        />
                                        <Label htmlFor={`marketing_budget_${opt.value}`}>
                                            {opt.label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                            {errors.marketing_budget_monthly && (
                                <FieldError>{errors.marketing_budget_monthly}</FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                </FieldSet>
            </CardContent>
        </Card>
    );
}
