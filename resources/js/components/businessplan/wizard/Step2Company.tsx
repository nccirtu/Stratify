import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { FileUpload } from '@/components/ui/file-upload';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { WizardStepProps } from './types';

export default function Step2Company({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;
    const showHandoverDate =
        data.company_state === 'new' || data.company_state === 'succession';
    const showExistingDate = data.company_state === 'existing';
    const showIsHeadquarter = data.company_state === 'new';
    const showAddressFields =
        data.company_state === 'existing' ||
        data.company_state === 'succession' ||
        data.is_headquarter === 'true';
    const showExpectedHeadquarters = data.is_headquarter === 'false';

    return (
        <FieldSet>
            <FieldLegend>Unternehmensdaten</FieldLegend>
            <FieldDescription>
                Erfassen Sie die grundlegenden Informationen zu Ihrem Unternehmen.
            </FieldDescription>
            <FieldGroup>
                <Field>
                    <FieldLabel htmlFor="company_state">
                        Unternehmensstatus
                    </FieldLabel>
                    <Select
                        value={data.company_state || ''}
                        onValueChange={(v) => setData({ company_state: v })}
                    >
                        <SelectTrigger id="company_state">
                            <SelectValue placeholder="Bitte wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {enumOptions.companyStates.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.company_state && (
                        <FieldError>{errors.company_state}</FieldError>
                    )}
                </Field>

                {showHandoverDate && (
                    <Field>
                        <FieldLabel htmlFor="handover_date">
                            Geplanter Startzeitraum
                        </FieldLabel>
                        <Input
                            id="handover_date"
                            type="date"
                            value={data.handover_date || ''}
                            onChange={(e) =>
                                setData({ handover_date: e.target.value })
                            }
                            aria-invalid={!!errors.handover_date}
                        />
                        {errors.handover_date && (
                            <FieldError>{errors.handover_date}</FieldError>
                        )}
                    </Field>
                )}

                {showExistingDate && (
                    <Field>
                        <FieldLabel htmlFor="existing_date">
                            Seit wann besteht das Unternehmen?
                        </FieldLabel>
                        <Input
                            id="existing_date"
                            type="date"
                            value={data.existing_date || ''}
                            onChange={(e) =>
                                setData({ existing_date: e.target.value })
                            }
                            aria-invalid={!!errors.existing_date}
                        />
                        {errors.existing_date && (
                            <FieldError>{errors.existing_date}</FieldError>
                        )}
                    </Field>
                )}

                {showIsHeadquarter && (
                    <Field>
                        <FieldLabel>
                            Ist schon bekannt wo das Unternehmen seinen Sitz haben
                            wird?
                        </FieldLabel>
                        <ToggleGroup
                            type="single"
                            variant="outline"
                            value={data.is_headquarter || ''}
                            onValueChange={(v) =>
                                setData({ is_headquarter: v })
                            }
                            className="justify-start"
                        >
                            <ToggleGroupItem value="true">Ja</ToggleGroupItem>
                            <ToggleGroupItem value="false">Nein</ToggleGroupItem>
                        </ToggleGroup>
                        {errors.is_headquarter && (
                            <FieldError>{errors.is_headquarter}</FieldError>
                        )}
                    </Field>
                )}

                <Field>
                    <FieldLabel htmlFor="company_name">
                        Name des Unternehmens
                    </FieldLabel>
                    <Input
                        id="company_name"
                        value={data.company_name || ''}
                        onChange={(e) =>
                            setData({ company_name: e.target.value })
                        }
                        placeholder="Mustermann GmbH"
                        aria-invalid={!!errors.company_name}
                    />
                    {errors.company_name && (
                        <FieldError>{errors.company_name}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="branch_id">Branche</FieldLabel>
                    <Select
                        value={data.branch_id || ''}
                        onValueChange={(v) => setData({ branch_id: v })}
                    >
                        <SelectTrigger id="branch_id">
                            <SelectValue placeholder="Branche wählen" />
                        </SelectTrigger>
                        <SelectContent>
                            {options.branches.map((b) => (
                                <SelectItem key={b.value} value={b.value}>
                                    {b.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.branch_id && (
                        <FieldError>{errors.branch_id}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel htmlFor="company_description">
                        Kurzbeschreibung des Geschäftsmodells
                    </FieldLabel>
                    <Textarea
                        id="company_description"
                        value={data.company_description || ''}
                        onChange={(e) =>
                            setData({ company_description: e.target.value })
                        }
                        placeholder="Fertigung von Schrauben"
                        rows={3}
                        aria-invalid={!!errors.company_description}
                    />
                    {errors.company_description && (
                        <FieldError>{errors.company_description}</FieldError>
                    )}
                </Field>

                {showAddressFields && (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="address">
                                    Adresse
                                </FieldLabel>
                                <Input
                                    id="address"
                                    value={data.address || ''}
                                    onChange={(e) =>
                                        setData({ address: e.target.value })
                                    }
                                    placeholder="Musterstr. 7"
                                    aria-invalid={!!errors.address}
                                />
                                {errors.address && (
                                    <FieldError>{errors.address}</FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="zip_code">PLZ</FieldLabel>
                                <Input
                                    id="zip_code"
                                    value={data.zip_code || ''}
                                    onChange={(e) =>
                                        setData({ zip_code: e.target.value })
                                    }
                                    placeholder="77777"
                                    aria-invalid={!!errors.zip_code}
                                />
                                {errors.zip_code && (
                                    <FieldError>{errors.zip_code}</FieldError>
                                )}
                            </Field>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Field>
                                <FieldLabel htmlFor="city">Stadt</FieldLabel>
                                <Input
                                    id="city"
                                    value={data.city || ''}
                                    onChange={(e) =>
                                        setData({ city: e.target.value })
                                    }
                                    placeholder="Musterstadt"
                                    aria-invalid={!!errors.city}
                                />
                                {errors.city && (
                                    <FieldError>{errors.city}</FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="state">
                                    Bundesland
                                </FieldLabel>
                                <Input
                                    id="state"
                                    value={data.state || ''}
                                    onChange={(e) =>
                                        setData({ state: e.target.value })
                                    }
                                    placeholder="Baden-Württemberg"
                                    aria-invalid={!!errors.state}
                                />
                                {errors.state && (
                                    <FieldError>{errors.state}</FieldError>
                                )}
                            </Field>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="country">Land</FieldLabel>
                            <Input
                                id="country"
                                value={data.country || ''}
                                onChange={(e) =>
                                    setData({ country: e.target.value })
                                }
                                placeholder="Deutschland"
                                aria-invalid={!!errors.country}
                            />
                            {errors.country && (
                                <FieldError>{errors.country}</FieldError>
                            )}
                        </Field>
                    </>
                )}

                {showExpectedHeadquarters && (
                    <Field>
                        <FieldLabel htmlFor="expected_headquarters">
                            Wo wäre voraussichtlich der Sitz des Unternehmens?
                        </FieldLabel>
                        <Input
                            id="expected_headquarters"
                            value={data.expected_headquarters || ''}
                            onChange={(e) =>
                                setData({
                                    expected_headquarters: e.target.value,
                                })
                            }
                            placeholder="z.B. Stadtzentrum Stuttgart"
                            aria-invalid={!!errors.expected_headquarters}
                        />
                        {errors.expected_headquarters && (
                            <FieldError>
                                {errors.expected_headquarters}
                            </FieldError>
                        )}
                    </Field>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <Field>
                        <FieldLabel htmlFor="email">E-Mail</FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            value={data.email || ''}
                            onChange={(e) =>
                                setData({ email: e.target.value })
                            }
                            placeholder="info@mustermann.de"
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <FieldError>{errors.email}</FieldError>
                        )}
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="phone">Telefon</FieldLabel>
                        <Input
                            id="phone"
                            type="tel"
                            value={data.phone || ''}
                            onChange={(e) =>
                                setData({ phone: e.target.value })
                            }
                            placeholder="0123456789"
                            aria-invalid={!!errors.phone}
                        />
                        {errors.phone && (
                            <FieldError>{errors.phone}</FieldError>
                        )}
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="website">Website</FieldLabel>
                    <Input
                        id="website"
                        value={data.website || ''}
                        onChange={(e) => setData({ website: e.target.value })}
                        placeholder="www.mustermann.de"
                        aria-invalid={!!errors.website}
                    />
                    {errors.website && (
                        <FieldError>{errors.website}</FieldError>
                    )}
                </Field>

                <Field>
                    <FieldLabel>Logo</FieldLabel>
                    <FieldDescription>
                        Laden Sie das Logo Ihres Unternehmens hoch.
                    </FieldDescription>
                    <FileUpload
                        value={data.logo}
                        onChange={(file) => setData({ logo: file })}
                        accept="image/png, image/jpeg, image/gif"
                        maxSize={5242880}
                        placeholder="PNG, JPEG oder GIF (max. 5 MB)"
                    />
                    {errors.logo && <FieldError>{errors.logo}</FieldError>}
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}
