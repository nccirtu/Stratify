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
import type { WizardStepProps } from './types';

export default function Step3Period({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Zeitraum</FieldLegend>
            <FieldDescription>
                Legen Sie den Planungszeitraum fest.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="period_from">Von</FieldLabel>
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
                    <FieldLabel htmlFor="period_until">Bis</FieldLabel>
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
            </FieldGroup>
        </FieldSet>
    );
}
