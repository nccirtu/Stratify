import React from 'react';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

interface StepThreeProps {
    data: {
        period_from: string;
        period_until: string;
    };
    setData: (key: string, value: string) => void;
    errors: Partial<Record<string, string>>;
}

export default function StepThree({ data, setData, errors }: StepThreeProps) {
    return (
        <div className="grid gap-6">
            <Field>
                <FieldLabel htmlFor="period_from">Period From</FieldLabel>
                <Input
                    id="period_from"
                    name="period_from"
                    type="date"
                    value={data.period_from}
                    onChange={(e) => setData('period_from', e.target.value)}
                    required
                />
                <FieldDescription>The start date of the planning period.</FieldDescription>
                <FieldError>{errors.period_from}</FieldError>
            </Field>

            <Field>
                <FieldLabel htmlFor="period_until">Period Until</FieldLabel>
                <Input
                    id="period_until"
                    name="period_until"
                    type="date"
                    value={data.period_until}
                    onChange={(e) => setData('period_until', e.target.value)}
                    required
                />
                <FieldDescription>The end date of the planning period.</FieldDescription>
                <FieldError>{errors.period_until}</FieldError>
            </Field>
        </div>
    );
}
