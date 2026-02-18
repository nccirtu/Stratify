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

export default function Step6SolutionOffer({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Lösung & Angebot</FieldLegend>
            <FieldDescription>
                Beschreiben Sie Ihr Angebot und wie es sich vom Wettbewerb
                abhebt.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="solution_description">
                        Lösungsbeschreibung
                    </FieldLabel>
                    <Textarea
                        id="solution_description"
                        value={data.solution_description || ''}
                        onChange={(e) =>
                            setData({ solution_description: e.target.value })
                        }
                        rows={4}
                        placeholder="Wie lösen Sie das Problem?"
                        aria-invalid={!!errors.solution_description}
                    />
                    {errors.solution_description && (
                        <FieldError>{errors.solution_description}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="competitive_advantage">
                        Wettbewerbsvorteil
                    </FieldLabel>
                    <Textarea
                        id="competitive_advantage"
                        value={data.competitive_advantage || ''}
                        onChange={(e) =>
                            setData({ competitive_advantage: e.target.value })
                        }
                        rows={4}
                        placeholder="Was unterscheidet Sie von der Konkurrenz?"
                        aria-invalid={!!errors.competitive_advantage}
                    />
                    {errors.competitive_advantage && (
                        <FieldError>{errors.competitive_advantage}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="pricing_strategy">
                        Preisstrategie
                    </FieldLabel>
                    <Textarea
                        id="pricing_strategy"
                        value={data.pricing_strategy || ''}
                        onChange={(e) =>
                            setData({ pricing_strategy: e.target.value })
                        }
                        rows={3}
                        placeholder="Wie gestalten Sie Ihre Preise?"
                        aria-invalid={!!errors.pricing_strategy}
                    />
                    {errors.pricing_strategy && (
                        <FieldError>{errors.pricing_strategy}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
