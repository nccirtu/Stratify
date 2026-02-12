import { Form } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/businessplans';

export default function CreateBusinessplanForm() {
    return (
        <Form
            {...store.form()}
            resetOnSuccess={['title', 'description']}
            className="flex flex-col gap-6"
        >
            {({ processing, errors }) => (
                <>
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name des Businessplan</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                tabIndex={1}
                                placeholder="Mein erster Businessplan"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="description">Beschreibung</Label>
                            </div>
                            <Textarea
                                id="description"
                                name="description"
                                required
                                tabIndex={2}
                                placeholder="description"
                            />
                            <InputError message={errors.description} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={4}
                            disabled={processing}
                            data-test="login-button"
                        >
                            {processing && <Spinner />}
                            Businessplan erstellen
                        </Button>
                    </div>

                </>
            )}
        </Form>
    );
}
