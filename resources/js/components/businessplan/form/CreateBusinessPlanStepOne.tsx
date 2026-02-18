import {
    FormRenderer,
    FormSchema,
    Textarea,
    TextInput,
} from '@nccirtu/tablefy/forms';
import { useInertiaForm } from '@nccirtu/tablefy/inertia';
import { useMemo } from 'react';

import { store as storeBusinessPlan } from '@/wayfinder/routes/businessplan';

export interface CreateBusinessPlanFormData {
    name: string;
    slug: string;
    description: string;
}

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

export default function CreateBusinessPlanStepOne() {
    const schema = useMemo(
        () =>
            FormSchema.make<CreateBusinessPlanFormData>()
                .title('Businessplan erstellen')
                .columns(1)
                .fields(
                    TextInput.make<CreateBusinessPlanFormData>('name')
                        .label('Name')
                        .required()
                        .placeholder('Name des Businessplans')
                        .maxLength(255),
                    TextInput.make<CreateBusinessPlanFormData>('slug')
                        .label('Slug')
                        .required()
                        .placeholder('wird-automatisch-generiert')
                        .maxLength(255),
                    Textarea.make<CreateBusinessPlanFormData>('description')
                        .label('Beschreibung')
                        .rows(3)
                        .columnSpan(1),
                )
                .actions((a) => a.submit({ label: 'Erstellen & Weiter' }))
                .build(),
        [],
    );

    const { data, errors, onChange, onSubmit, processing } =
        useInertiaForm<CreateBusinessPlanFormData>({
            schema,
            url: storeBusinessPlan().url,
            method: 'post',
        });

    const handleChange = (
        field: keyof CreateBusinessPlanFormData,
        value: any,
    ) => {
        onChange(field, value);
        if (field === 'name' && typeof value === 'string') {
            onChange('slug', slugify(value));
        }
    };

    return (
        <FormRenderer
            schema={schema}
            data={data}
            errors={errors}
            onChange={handleChange}
            onSubmit={onSubmit}
            processing={processing}
        />
    );
}
