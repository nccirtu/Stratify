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

export default function Step8TeamResources({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Team & Ressourcen</FieldLegend>
            <FieldDescription>
                Wer ist in Ihrem Team und welche Mittel benötigen Sie?
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="team_members">
                        Teammitglieder
                    </FieldLabel>
                    <Textarea
                        id="team_members"
                        value={data.team_members || ''}
                        onChange={(e) =>
                            setData({ team_members: e.target.value })
                        }
                        rows={4}
                        placeholder="Wer ist in Ihrem Team?"
                        aria-invalid={!!errors.team_members}
                    />
                    {errors.team_members && (
                        <FieldError>{errors.team_members}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="initial_investment">
                        Anfangsinvestition (€)
                    </FieldLabel>
                    <Input
                        id="initial_investment"
                        type="number"
                        value={data.initial_investment || ''}
                        onChange={(e) =>
                            setData({ initial_investment: e.target.value })
                        }
                        placeholder="0.00"
                        aria-invalid={!!errors.initial_investment}
                    />
                    {errors.initial_investment && (
                        <FieldError>{errors.initial_investment}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
