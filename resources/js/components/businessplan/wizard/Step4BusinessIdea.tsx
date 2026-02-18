import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { WizardStepProps } from './types';

const languages = [
    { value: 'de', label: 'Deutsch' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'it', label: 'Italiano' },
];

export default function Step4BusinessIdea({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Geschäftsidee</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihre Geschäftsidee und wählen Sie die Währung
                und Sprache.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="business_idea">
                        Geschäftsidee
                    </FieldLabel>
                    <Textarea
                        id="business_idea"
                        value={data.business_idea || ''}
                        onChange={(e) =>
                            setData({ business_idea: e.target.value })
                        }
                        rows={5}
                        placeholder="Beschreiben Sie Ihre Geschäftsidee..."
                        aria-invalid={!!errors.business_idea}
                    />
                    {errors.business_idea && (
                        <FieldError>{errors.business_idea}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="currency_id">Währung</FieldLabel>
                    <Select
                        value={String(data.currency_id || '')}
                        onValueChange={(value) =>
                            setData({ currency_id: value })
                        }
                    >
                        <SelectTrigger
                            id="currency_id"
                            aria-invalid={!!errors.currency_id}
                        >
                            <SelectValue placeholder="Währung auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.currencies.map((currency) => (
                                <SelectItem
                                    key={currency.value}
                                    value={currency.value}
                                >
                                    {currency.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.currency_id && (
                        <FieldError>{errors.currency_id}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="language">Sprache</FieldLabel>
                    <Select
                        value={data.language || ''}
                        onValueChange={(value) => setData({ language: value })}
                    >
                        <SelectTrigger
                            id="language"
                            aria-invalid={!!errors.language}
                        >
                            <SelectValue placeholder="Sprache auswählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                                <SelectItem key={lang.value} value={lang.value}>
                                    {lang.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.language && (
                        <FieldError>{errors.language}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
