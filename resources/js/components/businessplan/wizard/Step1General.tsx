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

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(
            /[äöüß]/g,
            (c) => ({ ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' })[c] || c,
        )
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export default function Step1General({
    data,
    setData,
    errors,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Allgemeine Informationen</FieldLegend>
            <FieldDescription>
                Geben Sie die grundlegenden Details für Ihren Businessplan ein.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input
                        id="name"
                        value={data.name || ''}
                        onChange={(e) => {
                            setData({
                                name: e.target.value,
                                slug: slugify(e.target.value),
                            });
                        }}
                        autoComplete="off"
                        aria-invalid={!!errors.name}
                    />
                    {errors.name && <FieldError>{errors.name}</FieldError>}
                </Field>

                <Field>
                    <FieldLabel htmlFor="slug">Slug</FieldLabel>
                    <Input
                        id="slug"
                        value={data.slug || ''}
                        onChange={(e) => setData({ slug: e.target.value })}
                        autoComplete="off"
                        aria-invalid={!!errors.slug}
                    />
                    <FieldDescription>
                        Wird automatisch aus dem Namen generiert.
                    </FieldDescription>
                    {errors.slug && <FieldError>{errors.slug}</FieldError>}
                </Field>

                <Field>
                    <FieldLabel htmlFor="description">Beschreibung</FieldLabel>
                    <Textarea
                        id="description"
                        value={data.description || ''}
                        onChange={(e) =>
                            setData({ description: e.target.value })
                        }
                        rows={3}
                        aria-invalid={!!errors.description}
                    />
                    {errors.description && (
                        <FieldError>{errors.description}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
