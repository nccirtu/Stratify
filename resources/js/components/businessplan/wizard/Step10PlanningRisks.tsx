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

export default function Step10PlanningRisks({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Planung & Risiken</FieldLegend>
            <FieldDescription>
                Definieren Sie Meilensteine und identifizieren Sie potenzielle
                Risiken.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="milestones">Meilensteine</FieldLabel>
                    <Textarea
                        id="milestones"
                        value={data.milestones || ''}
                        onChange={(e) =>
                            setData({ milestones: e.target.value })
                        }
                        rows={4}
                        placeholder="Welche Meilensteine planen Sie?"
                        aria-invalid={!!errors.milestones}
                    />
                    {errors.milestones && (
                        <FieldError>{errors.milestones}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="risks">Risiken</FieldLabel>
                    <Textarea
                        id="risks"
                        value={data.risks || ''}
                        onChange={(e) => setData({ risks: e.target.value })}
                        rows={4}
                        placeholder="Welche Risiken sehen Sie?"
                        aria-invalid={!!errors.risks}
                    />
                    {errors.risks && (
                        <FieldError>{errors.risks}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
