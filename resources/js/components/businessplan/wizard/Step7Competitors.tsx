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

export default function Step7Competitors({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Wettbewerb</FieldLegend>
            <FieldDescription>
                Analysieren Sie Ihre Wettbewerber.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="competitors">Wettbewerber</FieldLabel>
                    <Textarea
                        id="competitors"
                        value={data.competitors || ''}
                        onChange={(e) =>
                            setData({ competitors: e.target.value })
                        }
                        rows={5}
                        placeholder="Wer sind Ihre Wettbewerber?"
                        aria-invalid={!!errors.competitors}
                    />
                    {errors.competitors && (
                        <FieldError>{errors.competitors}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
