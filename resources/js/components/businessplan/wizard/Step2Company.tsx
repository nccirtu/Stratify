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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { WizardStepProps } from './types';

export default function Step2Company({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    return (
        <FieldSet>
            <FieldLegend>Unternehmen & Branche</FieldLegend>
            <FieldDescription>
                Wählen Sie ein bestehendes Unternehmen oder erstellen Sie ein
                neues.
            </FieldDescription>
            <FieldGroup>
                <Field orientation="horizontal">
                    <Switch
                        id="create_new_company"
                        checked={data.create_new_company}
                        onCheckedChange={(checked) =>
                            setData({ create_new_company: checked })
                        }
                    />
                    <FieldLabel htmlFor="create_new_company">
                        Neues Unternehmen erstellen
                    </FieldLabel>
                </Field>

                {data.create_new_company ? (
                    <Field>
                        <FieldLabel htmlFor="new_company_name">
                            Unternehmensname
                        </FieldLabel>
                        <Input
                            id="new_company_name"
                            value={data.new_company_name || ''}
                            onChange={(e) =>
                                setData({ new_company_name: e.target.value })
                            }
                            autoComplete="off"
                            aria-invalid={!!errors.new_company_name}
                        />
                        {errors.new_company_name && (
                            <FieldError>{errors.new_company_name}</FieldError>
                        )}
                    </Field>
                ) : (
                    <Field>
                        <FieldLabel htmlFor="company_id">
                            Unternehmen
                        </FieldLabel>
                        <Select
                            value={String(data.company_id || '')}
                            onValueChange={(value) =>
                                setData({ company_id: value })
                            }
                        >
                            <SelectTrigger
                                id="company_id"
                                aria-invalid={!!errors.company_id}
                            >
                                <SelectValue placeholder="Unternehmen auswählen" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.companies.map((company) => (
                                    <SelectItem
                                        key={company.value}
                                        value={company.value}
                                    >
                                        {company.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.company_id && (
                            <FieldError>{errors.company_id}</FieldError>
                        )}
                    </Field>
                )}

                <Field>
                    <FieldLabel htmlFor="branch_id">Branche</FieldLabel>
                    <Select
                        value={String(data.branch_id || '')}
                        onValueChange={(value) => setData({ branch_id: value })}
                    >
                        <SelectTrigger
                            id="branch_id"
                            aria-invalid={!!errors.branch_id}
                        >
                            <SelectValue placeholder="Branche auswählen (optional)" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.branches.map((branch) => (
                                <SelectItem
                                    key={branch.value}
                                    value={branch.value}
                                >
                                    {branch.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.branch_id && (
                        <FieldError>{errors.branch_id}</FieldError>
                    )}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
