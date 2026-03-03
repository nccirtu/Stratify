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
import { Label } from '@/components/ui/label';
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from '@/components/ui/multi-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent } from '@/components/ui/card';
import type { SelectOption, WizardStepProps } from './types';

function TooltipMultiSelectItem({ opt }: { opt: SelectOption }) {
    if (!opt.tooltip) {
        return <MultiSelectItem value={opt.value}>{opt.label}</MultiSelectItem>;
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <MultiSelectItem value={opt.value}>{opt.label}</MultiSelectItem>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-64">
                {opt.tooltip}
            </TooltipContent>
        </Tooltip>
    );
}

export default function Step13CustomerAcquisition({
    data,
    setData,
    errors,
    options,
}: WizardStepProps) {
    const { enumOptions } = options;

    const acquiringCustomers = data.acquiring_customers ?? [];
    const hasOnlineShop = acquiringCustomers.includes('online_shop');
    const hasDirektvertrieb = acquiringCustomers.includes('direktvertrieb');
    const hasAussendienst = acquiringCustomers.includes('aussendienst');

    const onlineShopItems = data.acquiring_customers_online_shop ?? [];
    const shopAlreadySetup = onlineShopItems.includes('shop_system_eingerichtet');
    const hasPaymentProvider = onlineShopItems.includes('zahlungsanbieter_angebunden');
    const hasShippingStructure = onlineShopItems.includes('versandstruktur_definiert');

    const existingSalesStructure = data.existing_sales_structure ?? [];
    const hasCompensationModel = existingSalesStructure.includes('verguetungsmodell_definiert');
    const hasTrainedStaff = existingSalesStructure.includes('geschultes_personal_verfuegbar');
    const hasCrm = existingSalesStructure.includes('crm_system_eingerichtet');

    const fieldServiceItems = data.field_service_infrastructure ?? [];
    const hasFieldStaff = fieldServiceItems.includes('aussendienstmitarbeiter_eingestellt');

    return (
        <Card>
            <CardContent>
                <FieldSet>
                    <FieldLegend>Kundenakquise & Vertrieb</FieldLegend>
                    <FieldDescription>
                        Beschreiben Sie, wie Sie aktiv Kunden gewinnen und welche Vertriebsstrukturen bereits vorhanden sind.
                    </FieldDescription>
                    <FieldGroup>
                        {/* Main question: how do you acquire customers */}
                        <Field>
                            <FieldLabel>Wie gewinnen Sie aktiv Kunden?</FieldLabel>
                            <MultiSelect
                                values={acquiringCustomers}
                                onValuesChange={(v) => setData({ acquiring_customers: v })}
                            >
                                <MultiSelectTrigger>
                                    <MultiSelectValue placeholder="Optionen wählen" />
                                </MultiSelectTrigger>
                                <MultiSelectContent>
                                    {enumOptions.acquiringCustomers.map((opt) => (
                                        <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                    ))}
                                </MultiSelectContent>
                            </MultiSelect>
                            {errors.acquiring_customers && (
                                <FieldError>{errors.acquiring_customers}</FieldError>
                            )}
                        </Field>

                        {/* Online Shop sub-questions */}
                        {hasOnlineShop && (
                            <>
                                <Field>
                                    <FieldLabel>Welche dieser Elemente sind bereits eingerichtet?</FieldLabel>
                                    <MultiSelect
                                        values={onlineShopItems}
                                        onValuesChange={(v) =>
                                            setData({ acquiring_customers_online_shop: v })
                                        }
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Optionen wählen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {enumOptions.acquiringCustomerOnlineShops.map((opt) => (
                                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {errors.acquiring_customers_online_shop && (
                                        <FieldError>
                                            {errors.acquiring_customers_online_shop}
                                        </FieldError>
                                    )}
                                </Field>

                                {!shopAlreadySetup && (
                                    <Field>
                                        <FieldLabel>Wie planen Sie die Erstellung des Online-Shops?</FieldLabel>
                                        <RadioGroup
                                            value={data.acquiring_customers_create_online_shop || ''}
                                            onValueChange={(v) =>
                                                setData({ acquiring_customers_create_online_shop: v })
                                            }
                                            aria-invalid={!!errors.acquiring_customers_create_online_shop}
                                        >
                                            {enumOptions.acquiringCustomerCreateOnlineShops.map((opt) => (
                                                <div key={opt.value} className="flex items-center gap-2">
                                                    <RadioGroupItem
                                                        value={opt.value}
                                                        id={`create_shop_${opt.value}`}
                                                    />
                                                    <Label htmlFor={`create_shop_${opt.value}`}>
                                                        {opt.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.acquiring_customers_create_online_shop && (
                                            <FieldError>
                                                {errors.acquiring_customers_create_online_shop}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}

                                {!hasPaymentProvider && (
                                    <Field>
                                        <FieldLabel>Welche Zahlungsmethoden möchten Sie anbieten?</FieldLabel>
                                        <MultiSelect
                                            values={data.payment_methods ?? []}
                                            onValuesChange={(v) => setData({ payment_methods: v })}
                                        >
                                            <MultiSelectTrigger>
                                                <MultiSelectValue placeholder="Optionen wählen" />
                                            </MultiSelectTrigger>
                                            <MultiSelectContent>
                                                {enumOptions.paymentMethods.map((opt) => (
                                                    <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                                ))}
                                            </MultiSelectContent>
                                        </MultiSelect>
                                        {errors.payment_methods && (
                                            <FieldError>{errors.payment_methods}</FieldError>
                                        )}
                                    </Field>
                                )}

                                {!hasShippingStructure && (
                                    <Field>
                                        <FieldLabel>Wie soll der Versand organisiert werden?</FieldLabel>
                                        <RadioGroup
                                            value={data.shipping_organization || ''}
                                            onValueChange={(v) => setData({ shipping_organization: v })}
                                            aria-invalid={!!errors.shipping_organization}
                                        >
                                            {enumOptions.shippingOrganizations.map((opt) => (
                                                <div key={opt.value} className="flex items-center gap-2">
                                                    <RadioGroupItem
                                                        value={opt.value}
                                                        id={`shipping_${opt.value}`}
                                                    />
                                                    <Label htmlFor={`shipping_${opt.value}`}>
                                                        {opt.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.shipping_organization && (
                                            <FieldError>{errors.shipping_organization}</FieldError>
                                        )}
                                    </Field>
                                )}
                            </>
                        )}

                        {/* Direktvertrieb sub-questions */}
                        {hasDirektvertrieb && (
                            <>
                                <Field>
                                    <FieldLabel>Wer übernimmt den direkten Vertrieb?</FieldLabel>
                                    <MultiSelect
                                        values={data.direct_sales_responsibility ?? []}
                                        onValuesChange={(v) =>
                                            setData({ direct_sales_responsibility: v })
                                        }
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Optionen wählen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {enumOptions.directSalesResponsibilities.map((opt) => (
                                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {errors.direct_sales_responsibility && (
                                        <FieldError>{errors.direct_sales_responsibility}</FieldError>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel>Welche Vertriebsstruktur ist bereits vorhanden?</FieldLabel>
                                    <MultiSelect
                                        values={existingSalesStructure}
                                        onValuesChange={(v) =>
                                            setData({ existing_sales_structure: v })
                                        }
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Optionen wählen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {enumOptions.existingSalesStructures.map((opt) => (
                                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {errors.existing_sales_structure && (
                                        <FieldError>{errors.existing_sales_structure}</FieldError>
                                    )}
                                </Field>

                                {hasTrainedStaff && (
                                    <Field>
                                        <FieldLabel>Wie viele Personen sind im Direktvertrieb tätig?</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={data.direct_sales_staff_count || ''}
                                            onChange={(e) =>
                                                setData({ direct_sales_staff_count: e.target.value })
                                            }
                                            aria-invalid={!!errors.direct_sales_staff_count}
                                        />
                                        {errors.direct_sales_staff_count && (
                                            <FieldError>{errors.direct_sales_staff_count}</FieldError>
                                        )}
                                    </Field>
                                )}

                                {hasCompensationModel && (
                                    <Field>
                                        <FieldLabel>Welches Modell nutzen Sie? (Vergütung)</FieldLabel>
                                        <RadioGroup
                                            value={data.sales_compensation_model || ''}
                                            onValueChange={(v) =>
                                                setData({ sales_compensation_model: v })
                                            }
                                            aria-invalid={!!errors.sales_compensation_model}
                                        >
                                            {enumOptions.salesCompensationModels.map((opt) => (
                                                <div key={opt.value} className="flex items-center gap-2">
                                                    <RadioGroupItem
                                                        value={opt.value}
                                                        id={`compensation_${opt.value}`}
                                                    />
                                                    <Label htmlFor={`compensation_${opt.value}`}>
                                                        {opt.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.sales_compensation_model && (
                                            <FieldError>{errors.sales_compensation_model}</FieldError>
                                        )}
                                    </Field>
                                )}

                                {!hasCrm && (
                                    <Field>
                                        <FieldLabel>Planen Sie ein CRM-System einzuführen?</FieldLabel>
                                        <RadioGroup
                                            value={data.plan_crm_introduction || ''}
                                            onValueChange={(v) =>
                                                setData({ plan_crm_introduction: v })
                                            }
                                            aria-invalid={!!errors.plan_crm_introduction}
                                        >
                                            {enumOptions.planCrmIntroductions.map((opt) => (
                                                <div key={opt.value} className="flex items-center gap-2">
                                                    <RadioGroupItem
                                                        value={opt.value}
                                                        id={`crm_plan_${opt.value}`}
                                                    />
                                                    <Label htmlFor={`crm_plan_${opt.value}`}>
                                                        {opt.label}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                        {errors.plan_crm_introduction && (
                                            <FieldError>{errors.plan_crm_introduction}</FieldError>
                                        )}
                                    </Field>
                                )}
                            </>
                        )}

                        {/* Außendienst sub-questions */}
                        {hasAussendienst && (
                            <>
                                <Field>
                                    <FieldLabel>Welche Außendienst-Infrastruktur ist vorhanden?</FieldLabel>
                                    <MultiSelect
                                        values={fieldServiceItems}
                                        onValuesChange={(v) =>
                                            setData({ field_service_infrastructure: v })
                                        }
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Optionen wählen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {enumOptions.fieldServiceInfrastructures.map((opt) => (
                                                <TooltipMultiSelectItem key={opt.value} opt={opt} />
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {errors.field_service_infrastructure && (
                                        <FieldError>{errors.field_service_infrastructure}</FieldError>
                                    )}
                                </Field>

                                {hasFieldStaff && (
                                    <Field>
                                        <FieldLabel>Wie viele Außendienstmitarbeiter sind geplant?</FieldLabel>
                                        <Input
                                            type="number"
                                            min={0}
                                            value={data.field_service_staff_planned_count || ''}
                                            onChange={(e) =>
                                                setData({
                                                    field_service_staff_planned_count: e.target.value,
                                                })
                                            }
                                            aria-invalid={!!errors.field_service_staff_planned_count}
                                        />
                                        {errors.field_service_staff_planned_count && (
                                            <FieldError>
                                                {errors.field_service_staff_planned_count}
                                            </FieldError>
                                        )}
                                    </Field>
                                )}
                            </>
                        )}
                    </FieldGroup>
                </FieldSet>
            </CardContent>
        </Card>
    );
}
