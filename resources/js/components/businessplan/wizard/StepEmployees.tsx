import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, Trash2 } from 'lucide-react';
import type { EmployeeItem, WizardStepProps } from './types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const emptyEmployee: EmployeeItem = {
    job_title: '',
    number_of_employees: '1',
    salary: '',
    date_of_hire: '',
    payment_day: '1',
    working_hours_per_week: '',
    qualification: '',
    area_of_responsibility: '',
};

export default function StepEmployees({
    data,
    setData,
    errors,
}: WizardStepProps) {
    const items = data.employees || [];
    const [openItems, setOpenItems] = React.useState<boolean[]>(() =>
        items.map(() => false),
    );

    const setItemOpen = (index: number, open: boolean) => {
        setOpenItems((prev) => prev.map((v, i) => (i === index ? open : v)));
    };

    const updateItem = (index: number, patch: Partial<EmployeeItem>) => {
        const updated = items.map((item, i) =>
            i === index ? { ...item, ...patch } : item,
        );
        setData({ employees: updated });
    };

    const addItem = () => {
        setData({ employees: [...items, { ...emptyEmployee }] });
        setOpenItems((prev) => [...prev, true]);
    };

    const removeItem = (index: number) => {
        setData({ employees: items.filter((_, i) => i !== index) });
        setOpenItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <CardContent>
                <FieldSet>
                    <FieldLegend>Mitarbeiter</FieldLegend>
                    <FieldDescription>
                        Erfassen Sie Ihre geplanten Mitarbeiter und deren
                        Gehälter.
                    </FieldDescription>

                    <div className="space-y-3">
                        {items.map((item, index) => (
                            <Collapsible
                                key={index}
                                open={openItems[index]}
                                onOpenChange={(open) =>
                                    setItemOpen(index, open)
                                }
                                className="rounded-lg border"
                            >
                                <div className="flex items-center justify-between px-4 py-3">
                                    <CollapsibleTrigger asChild>
                                        <button
                                            type="button"
                                            className="flex flex-1 items-center gap-2 text-left text-sm font-medium"
                                        >
                                            <ChevronDown
                                                className={cn(
                                                    'h-4 w-4 shrink-0 transition-transform duration-200',
                                                    openItems[index] &&
                                                        'rotate-180',
                                                )}
                                            />
                                            {item.job_title
                                                ? `${item.job_title}${item.number_of_employees && Number(item.number_of_employees) > 1 ? ` — ${item.number_of_employees}x` : ''}${item.salary ? ` · ${item.salary} €/Monat` : ''}${item.payment_day ? ` · Zahltag ${item.payment_day}.` : ''}`
                                                : `Mitarbeiter ${index + 1}`}
                                        </button>
                                    </CollapsibleTrigger>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeItem(index)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <CollapsibleContent>
                                    <div className="border-t px-4 pt-3 pb-4">
                                        <FieldGroup>
                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Berufsbezeichnung
                                                    </FieldLabel>
                                                    <Input
                                                        value={item.job_title}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                job_title:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        placeholder="z.B. Softwareentwickler"
                                                        aria-invalid={
                                                            !!errors[
                                                                `employees.${index}.job_title`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `employees.${index}.job_title`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `employees.${index}.job_title`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Anzahl Mitarbeiter
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        value={
                                                            item.number_of_employees
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                number_of_employees:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `employees.${index}.number_of_employees`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `employees.${index}.number_of_employees`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `employees.${index}.number_of_employees`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Bruttogehalt (€/Monat)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        value={item.salary}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                salary: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `employees.${index}.salary`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `employees.${index}.salary`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `employees.${index}.salary`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Zahltag (1–31)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={1}
                                                        max={31}
                                                        value={item.payment_day}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                payment_day:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `employees.${index}.payment_day`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `employees.${index}.payment_day`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `employees.${index}.payment_day`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Einstellungsdatum
                                                    </FieldLabel>
                                                    <Input
                                                        type="date"
                                                        value={
                                                            item.date_of_hire
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                date_of_hire:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `employees.${index}.date_of_hire`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `employees.${index}.date_of_hire`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `employees.${index}.date_of_hire`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Wochenstunden
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        value={
                                                            item.working_hours_per_week
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                working_hours_per_week:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
                                                </Field>
                                            </div>

                                            <Field>
                                                <FieldLabel>
                                                    Qualifikation
                                                </FieldLabel>
                                                <Input
                                                    value={item.qualification}
                                                    onChange={(e) =>
                                                        updateItem(index, {
                                                            qualification:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="z.B. Bachelor Informatik"
                                                />
                                            </Field>

                                            <Field>
                                                <FieldLabel>
                                                    Aufgabenbereich
                                                </FieldLabel>
                                                <Textarea
                                                    value={
                                                        item.area_of_responsibility
                                                    }
                                                    onChange={(e) =>
                                                        updateItem(index, {
                                                            area_of_responsibility:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={2}
                                                    placeholder="Beschreiben Sie den Aufgabenbereich..."
                                                />
                                            </Field>
                                        </FieldGroup>
                                    </div>
                                </CollapsibleContent>
                            </Collapsible>
                        ))}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={addItem}
                        >
                            Mitarbeiter hinzufügen
                        </Button>
                    </div>
                </FieldSet>
            </CardContent>
        </Card>
    );
}
