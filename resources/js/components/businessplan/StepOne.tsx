import React from 'react';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface StepOneProps {
    data: {
        name: string;
        slug: string;
        status: string;
        description: string;
    };
    setData: (key: string, value: string | number | boolean | null) => void;
    errors: Partial<Record<string, string>>;
}

export default function StepOne({ data, setData, errors }: StepOneProps) {
    return (
        <div className="grid gap-6">
            <Field>
                <FieldLabel htmlFor="name">Plan Name</FieldLabel>
                <Input
                    id="name"
                    name="name"
                    value={data?.name || ''}
                    onChange={(e) => {
                        const val = e.target.value;
                        setData('name', val);
                        setData('slug', val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''));
                    }}
                    required
                    autoFocus
                />
                <FieldDescription>The display name for your business plan.</FieldDescription>
                <FieldError>{errors.name}</FieldError>
            </Field>

            <Field>
                <FieldLabel htmlFor="slug">Slug</FieldLabel>
                <Input id="slug" name="slug" value={data?.slug || ''} onChange={(e) => setData('slug', e.target.value)} required />
                <FieldDescription>The URL-friendly version of the name.</FieldDescription>
                <FieldError>{errors.slug}</FieldError>
            </Field>

            <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select value={data?.status || 'draft'} onValueChange={(val) => setData('status', val)}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>
                <FieldDescription>The current stage of this business plan.</FieldDescription>
                <FieldError>{errors.status}</FieldError>
            </Field>

            <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                    id="description"
                    name="description"
                    value={data?.description || ''}
                    onChange={(e) => setData('description', e.target.value)}
                    rows={4}
                />
                <FieldDescription>A brief summary of what this plan covers.</FieldDescription>
                <FieldError>{errors.description}</FieldError>
            </Field>
        </div>
    );
}
