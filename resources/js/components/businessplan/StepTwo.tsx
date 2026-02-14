import React from 'react';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StepTwoProps {
    data: {
        company_id: number | string;
        branch_id: number | string;
    };
    setData: (key: string, value: string | number) => void;
    errors: Partial<Record<string, string>>;
    companies: { id: number; name: string }[];
    branches: { id: number; name: string }[];
}

export default function StepTwo({ data, setData, errors, companies, branches }: StepTwoProps) {
    return (
        <div className="grid gap-6">
            <Field>
                <FieldLabel htmlFor="company_id">Company</FieldLabel>
                <Select value={data.company_id?.toString() || ''} onValueChange={(val) => setData('company_id', val)}>
                    <SelectTrigger id="company_id">
                        <SelectValue placeholder="Select company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FieldDescription>Select the company this plan belongs to.</FieldDescription>
                <FieldError>{errors.company_id}</FieldError>
            </Field>

            <Field>
                <FieldLabel htmlFor="branch_id">Branch (Optional)</FieldLabel>
                <Select value={data.branch_id?.toString() || ''} onValueChange={(val) => setData('branch_id', val)}>
                    <SelectTrigger id="branch_id">
                        <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                        {branches.map((b) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                                {b.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <FieldDescription>Optionally assign this plan to a specific branch.</FieldDescription>
                <FieldError>{errors.branch_id}</FieldError>
            </Field>
        </div>
    );
}
