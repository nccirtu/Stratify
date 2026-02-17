import { Form } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/wayfinder/routes/businessplan';

export default function QuickCreateBusinessplanForm() {
    return (
        <Form action={store().url} method="post" resetOnSuccess={['name', 'description']} className="flex flex-col gap-6">
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6">
                        <Field>
                            <FieldLabel htmlFor="name">Name des Businessplan</FieldLabel>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                tabIndex={1}
                                placeholder="Mein erster Businessplan"
                            />
                            <FieldDescription>Geben Sie einen aussagekräftigen Namen für Ihren Businessplan ein.</FieldDescription>
                            <FieldError>{errors.name}</FieldError>
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="description">Beschreibung</FieldLabel>
                            <Textarea id="description" name="description" required tabIndex={2} placeholder="Beschreibung" />
                            <FieldDescription>Beschreiben Sie kurz das Ziel Ihres Businessplans.</FieldDescription>
                            <FieldError>{errors.description}</FieldError>
                        </Field>

                        <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                            {processing && <Spinner />}
                            Businessplan erstellen
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
