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
import { Textarea } from '@/components/ui/textarea';
import type { WizardStepProps } from './types';

export default function Step5TargetMarket({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Zielgruppe & Markt</FieldLegend>
            <FieldDescription>
                Definieren Sie Ihre Zielgruppe und den Markt.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="target_customers">
                        Zielkunden
                    </FieldLabel>
                    <Textarea
                        id="target_customers"
                        value={data.target_customers || ''}
                        onChange={(e) =>
                            setData({ target_customers: e.target.value })
                        }
                        rows={4}
                        placeholder="Wer sind Ihre Zielkunden?"
                        aria-invalid={!!errors.target_customers}
                    />
                    {errors.target_customers && (
                        <FieldError>{errors.target_customers}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="customer_problems">
                        Kundenprobleme
                    </FieldLabel>
                    <Textarea
                        id="customer_problems"
                        value={data.customer_problems || ''}
                        onChange={(e) =>
                            setData({ customer_problems: e.target.value })
                        }
                        rows={4}
                        placeholder="Welche Probleme lösen Sie?"
                        aria-invalid={!!errors.customer_problems}
                    />
                    {errors.customer_problems && (
                        <FieldError>{errors.customer_problems}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="location">Standort</FieldLabel>
                    <Input
                        id="location"
                        value={data.location || ''}
                        onChange={(e) => setData({ location: e.target.value })}
                        placeholder="Standort des Unternehmens"
                        autoComplete="off"
                        aria-invalid={!!errors.location}
                    />
                    {errors.location && (
                        <FieldError>{errors.location}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
