import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import type { WizardStepProps } from './types';

export default function Step9Marketing({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Marketing & Vertrieb</FieldLegend>
            <FieldDescription>
                Wie erreichen Sie Ihre Kunden und wie verdienen Sie Geld?
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="marketing_channels">
                        Marketingkanäle
                    </FieldLabel>
                    <Textarea
                        id="marketing_channels"
                        value={data.marketing_channels || ''}
                        onChange={(e) =>
                            setData({ marketing_channels: e.target.value })
                        }
                        rows={4}
                        placeholder="Über welche Kanäle erreichen Sie Ihre Kunden?"
                        aria-invalid={!!errors.marketing_channels}
                    />
                    {errors.marketing_channels && (
                        <FieldError>{errors.marketing_channels}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="revenue_model">
                        Erlösmodell
                    </FieldLabel>
                    <Textarea
                        id="revenue_model"
                        value={data.revenue_model || ''}
                        onChange={(e) =>
                            setData({ revenue_model: e.target.value })
                        }
                        rows={4}
                        placeholder="Wie generieren Sie Umsatz?"
                        aria-invalid={!!errors.revenue_model}
                    />
                    {errors.revenue_model && (
                        <FieldError>{errors.revenue_model}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
