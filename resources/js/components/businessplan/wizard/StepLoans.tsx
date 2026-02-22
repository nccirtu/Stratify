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
import type { LoanItem, WizardStepProps } from './types';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const emptyLoan: LoanItem = {
    name: '',
    description: '',
    loan_amount: '',
    interest_rate: '',
    monthly_installment: '',
    start_date: '',
    end_date: '',
    payment_day: '1',
};

export default function StepLoans({ data, setData, errors }: WizardStepProps) {
    const items = data.loans || [];
    const [openItems, setOpenItems] = React.useState<boolean[]>(() =>
        items.map(() => false),
    );

    const setItemOpen = (index: number, open: boolean) => {
        setOpenItems((prev) => prev.map((v, i) => (i === index ? open : v)));
    };

    const updateItem = (index: number, patch: Partial<LoanItem>) => {
        const updated = items.map((item, i) =>
            i === index ? { ...item, ...patch } : item,
        );
        setData({ loans: updated });
    };

    const addItem = () => {
        setData({ loans: [...items, { ...emptyLoan }] });
        setOpenItems((prev) => [...prev, true]);
    };

    const removeItem = (index: number) => {
        setData({ loans: items.filter((_, i) => i !== index) });
        setOpenItems((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <Card>
            <CardContent>
                <FieldSet>
                    <FieldLegend>Darlehen</FieldLegend>
                    <FieldDescription>
                        Erfassen Sie Ihre geplanten Darlehen und Kredite.
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
                                            {item.name
                                                ? `${item.name}${item.loan_amount ? ` — ${item.loan_amount} €` : ''}${item.monthly_installment ? ` · ${item.monthly_installment} €/Monat` : ''}${item.payment_day ? ` · Zahltag ${item.payment_day}.` : ''}`
                                                : `Darlehen ${index + 1}`}
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
                                                        Bezeichnung
                                                    </FieldLabel>
                                                    <Input
                                                        value={item.name}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                name: e.target
                                                                    .value,
                                                            })
                                                        }
                                                        placeholder="z.B. Bankdarlehen"
                                                        aria-invalid={
                                                            !!errors[
                                                                `loans.${index}.name`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.name`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.name`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Darlehensbetrag (€)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        value={item.loan_amount}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                loan_amount:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `loans.${index}.loan_amount`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.loan_amount`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.loan_amount`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Zinssatz (% p.a.)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        step="0.01"
                                                        value={
                                                            item.interest_rate
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                interest_rate:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `loans.${index}.interest_rate`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.interest_rate`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.interest_rate`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Monatliche Rate (€)
                                                    </FieldLabel>
                                                    <Input
                                                        type="number"
                                                        min={0}
                                                        value={
                                                            item.monthly_installment
                                                        }
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                monthly_installment:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `loans.${index}.monthly_installment`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.monthly_installment`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.monthly_installment`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4">
                                                <Field>
                                                    <FieldLabel>
                                                        Startdatum
                                                    </FieldLabel>
                                                    <Input
                                                        type="date"
                                                        value={item.start_date}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                start_date:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                        aria-invalid={
                                                            !!errors[
                                                                `loans.${index}.start_date`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.start_date`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.start_date`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>

                                                <Field>
                                                    <FieldLabel>
                                                        Enddatum
                                                    </FieldLabel>
                                                    <Input
                                                        type="date"
                                                        value={item.end_date}
                                                        onChange={(e) =>
                                                            updateItem(index, {
                                                                end_date:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        }
                                                    />
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
                                                                `loans.${index}.payment_day`
                                                            ]
                                                        }
                                                    />
                                                    {errors[
                                                        `loans.${index}.payment_day`
                                                    ] && (
                                                        <FieldError>
                                                            {
                                                                errors[
                                                                    `loans.${index}.payment_day`
                                                                ]
                                                            }
                                                        </FieldError>
                                                    )}
                                                </Field>
                                            </div>

                                            <Field>
                                                <FieldLabel>
                                                    Beschreibung
                                                </FieldLabel>
                                                <Textarea
                                                    value={item.description}
                                                    onChange={(e) =>
                                                        updateItem(index, {
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                    rows={2}
                                                    placeholder="Optionale Beschreibung..."
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
                            Darlehen hinzufügen
                        </Button>
                    </div>
                </FieldSet>
            </CardContent>
        </Card>
    );
}
