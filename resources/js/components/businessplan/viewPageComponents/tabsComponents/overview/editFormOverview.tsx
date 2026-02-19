import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function EditFormOverview() {
    return (
        <FieldSet className="w-full max-w-xs">
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Businessplan Name</FieldLabel>
                    <Input id="name" type="text" placeholder="Max Leiter" />
                </Field>
                <Field>
                    <FieldLabel htmlFor="description">
                        Businessplan Beschreibung
                    </FieldLabel>
                    <Input
                        id="description"
                        type="text"
                        placeholder="Beschreibung des Businessplans"
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
