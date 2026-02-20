"use client";
import * as z from "zod";
import { formSchema } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import {
    Field,
    FieldGroup,
    FieldContent,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldSeparator,
} from "@/components/ui/field";
import {
    FormHeader,
    FormFooter,
    StepFields,
    PreviousButton,
    NextButton,
    SubmitButton,
    MultiStepFormContent,
} from "@/components/multi-step-viewer";
import { MultiStepFormProvider } from "@/hooks/use-multi-step-viewer";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    MultiSelect,
    MultiSelectContent,
    MultiSelectItem,
    MultiSelectTrigger,
    MultiSelectValue,
} from "@/components/ui/multi-select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

//------------------------------
type Schema = z.infer<typeof formSchema>;

export function GeneratedForm() {
    const form = useForm<Schema>({
        resolver: zodResolver(formSchema as any),
    });
    const {
        formState: { isSubmitting, isSubmitSuccessful },
    } = form;

    const handleSubmit = form.handleSubmit(async (data: Schema) => {
        try {
            // TODO: implement form submission
            console.log(data);
            form.reset();
        } catch (error) {
            // TODO: handle error
        }
    });
    const stepsFields = [
        {
            fields: ["name", "slug", "description"],
            component: (
                <>
                    <h3 className="mt-3 mb-1 font-semibold text-xl tracking-tight col-span-full">
                        Stammdaten
                    </h3>

                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="name">
                                    Name dieses Businessplans *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="name"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Mein erster Businessplan"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="slug"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="slug">Slug *</FieldLabel>
                                <Input
                                    {...field}
                                    id="slug"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="slug"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="description">
                                    Interne Kurzbeschreibung{" "}
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="description"
                                    placeholder="Mein erster Businessplan für meine Werkstatt"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </>
            ),
        },
        {
            fields: [
                "company_state",
                "handover_date",
                "existing_date",
                "togglegroup-2cf",
                "company_name",
                "branch_id",
                "company_description",
                "adress",
                "zip_code",
                "city",
                "state",
                "country",
                "expected_headquarters",
                "email",
                "phone",
                "website",
            ],
            component: (
                <>
                    <h3 className="mt-3 mb-1 font-semibold text-xl tracking-tight col-span-full">
                        Unternehmensdaten
                    </h3>

                    <Controller
                        name="company_state"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "new", label: "Neugründung" },
                                { value: "existing", label: "Bestehendes Unternehmen" },
                                { value: "succession", label: "Unternehmensnachfolge" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="company_state">
                                        Unternehmensstatus{" "}
                                    </FieldLabel>

                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="wähle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="handover_date"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const selectedDate = field.value;
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="col-span-full"
                                >
                                    <FieldLabel htmlFor="handover_date">
                                        Geplanter Startzeitraum{" "}
                                    </FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-start font-normal active:scale-none",
                                                        !selectedDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="size-4" />
                                                    {selectedDate ? (
                                                        <span>{format(selectedDate, "dd MMM, yyyy")}</span>
                                                    ) : (
                                                        <span>Wähle ein Datum</span>
                                                    )}
                                                </Button>
                                                {fieldState.isDirty && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.resetField("handover_date");
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(newDate) => {
                                                    form.setValue(field.name, newDate, {
                                                        shouldDirty: true,
                                                    });
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="existing_date"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const selectedDate = field.value;
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="col-span-full"
                                >
                                    <FieldLabel htmlFor="existing_date">
                                        Seit wann besteht das Unternehmen?{" "}
                                    </FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-start font-normal active:scale-none",
                                                        !selectedDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="size-4" />
                                                    {selectedDate ? (
                                                        <span>{format(selectedDate, "dd MMM, yyyy")}</span>
                                                    ) : (
                                                        <span>wähle ein Datum</span>
                                                    )}
                                                </Button>
                                                {fieldState.isDirty && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.resetField("existing_date");
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(newDate) => {
                                                    form.setValue(field.name, newDate, {
                                                        shouldDirty: true,
                                                    });
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="togglegroup-2cf"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "true", label: "Ja" },
                                { value: "false", label: "Nein" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-2 col-span-full"
                                >
                                    <FieldLabel htmlFor="togglegroup-2cf">
                                        Ist schon bekannt wo das Unternehmen seinen Sitz haben
                                        wird?{" "}
                                    </FieldLabel>

                                    <ToggleGroup
                                        variant="outline"
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        type="single"
                                        className="flex justify-start items-center gap-2 flex-wrap"
                                    >
                                        {options.map(({ label, value }) => (
                                            <ToggleGroupItem
                                                key={value}
                                                value={value}
                                                className="flex items-center gap-x-2"
                                            >
                                                {label}
                                            </ToggleGroupItem>
                                        ))}
                                    </ToggleGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="company_name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="company_name">
                                    Name des Unternehmens *
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="company_name"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Mustermann GmbH"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="branch_id"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [{ value: "option-1", label: "Option 1" }];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="branch_id">Branche *</FieldLabel>

                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="wähle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="company_description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="company_description">
                                    Interne Kurzbeschreibung{" "}
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="company_description"
                                    placeholder="Fertigung von Schrauben"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="adress"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="adress">Adresse </FieldLabel>
                                <Input
                                    {...field}
                                    id="adress"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Musterstr. 7"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="zip_code"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="zip_code">PLZ </FieldLabel>
                                <Input
                                    {...field}
                                    id="zip_code"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="77777"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="city"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="city">Stadt *</FieldLabel>
                                <Input
                                    {...field}
                                    id="city"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Musterstadt"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="state"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="state">Bundesland *</FieldLabel>
                                <Input
                                    {...field}
                                    id="state"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Baden Würrtemberg"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="country"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="country">Land *</FieldLabel>
                                <Input
                                    {...field}
                                    id="country"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Deutschland"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="expected_headquarters"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="expected_headquarters">
                                    Wo wäre voraussichtlich der Sitz des Unternehmens?{" "}
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id="expected_headquarters"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Karlsruhe Stadtmitte"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="email">E-Mail </FieldLabel>
                                <Input
                                    {...field}
                                    id="email"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="info@mustermann.de"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 md:col-span-3"
                            >
                                <FieldLabel htmlFor="phone">Telefon </FieldLabel>
                                <Input
                                    {...field}
                                    id="phone"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="0123456789"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="website"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="website">Website </FieldLabel>
                                <Input
                                    {...field}
                                    id="website"
                                    type="text"
                                    onChange={(e) => {
                                        field.onChange(e.target.value);
                                    }}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="www.mustermann.de"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </>
            ),
        },
        {
            fields: [
                "businessplan_target",
                "capital_usage",
                "period_from",
                "period_until",
            ],
            component: (
                <>
                    <h3 className="mt-3 mb-1 font-semibold text-xl tracking-tight col-span-full">
                        Dein Vorhaben
                    </h3>

                    <Controller
                        name="businessplan_target"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "financial", label: "Finanzierung" },
                                { value: "investorengewinnung", label: "Investorengewinnung" },
                                { value: "credit", label: "Bankdarlehen" },
                                { value: "intern_strategy", label: "Interne Strategie" },
                                { value: "funding", label: "Fördermittel" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="businessplan_target">
                                        Was ist dein Ziel mit dem Businessplan?{" "}
                                    </FieldLabel>

                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="wählen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="capital_usage"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "product_development", label: "Produktentwicklung" },
                                { value: "employees", label: "Personal" },
                                { value: "marketing", label: "Marketing" },
                                { value: "operating_resources", label: "Betriebsmittel" },
                                { value: "growth", label: "Wachstum" },
                                { value: "reorientation", label: "Neuausrichtung" },
                                {
                                    value: "efficiency_improvement",
                                    label: "Effizienzsteigerung",
                                },
                                {
                                    value: "internationalization",
                                    label: "Internationalisierung",
                                },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="capital_usage">
                                        Wofür benötigst du Kapital?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="wähle" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="period_from"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const selectedDate = field.value;
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="md:col-span-3"
                                >
                                    <FieldLabel htmlFor="period_from">
                                        Planungszeitraum von *
                                    </FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-start font-normal active:scale-none",
                                                        !selectedDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="size-4" />
                                                    {selectedDate ? (
                                                        <span>{format(selectedDate, "dd MMM, yyyy")}</span>
                                                    ) : (
                                                        <span>wähle</span>
                                                    )}
                                                </Button>
                                                {fieldState.isDirty && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.resetField("period_from");
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(newDate) => {
                                                    form.setValue(field.name, newDate, {
                                                        shouldDirty: true,
                                                    });
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="period_until"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const selectedDate = field.value;
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="md:col-span-3"
                                >
                                    <FieldLabel htmlFor="period_until">
                                        Planungszeitraum bis *
                                    </FieldLabel>

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <div className="relative">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    className={cn(
                                                        "w-full justify-start text-start font-normal active:scale-none",
                                                        !selectedDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="size-4" />
                                                    {selectedDate ? (
                                                        <span>{format(selectedDate, "dd MMM, yyyy")}</span>
                                                    ) : (
                                                        <span>wähle</span>
                                                    )}
                                                </Button>
                                                {fieldState.isDirty && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute top-1/2 end-0 -translate-y-1/2 rounded-full"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            form.resetField("period_until");
                                                        }}
                                                    >
                                                        <X />
                                                    </Button>
                                                )}
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={(newDate) => {
                                                    form.setValue(field.name, newDate, {
                                                        shouldDirty: true,
                                                    });
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />
                </>
            ),
        },
        {
            fields: ["business_activities", "business_model", "customer_problems"],
            component: (
                <>
                    <h3 className="mt-3 mb-1 font-semibold text-xl tracking-tight col-span-full">
                        Details
                    </h3>

                    <Controller
                        name="business_activities"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "no_revenue", label: "noch keine Umsätze" },
                                { value: "first_sales", label: "Erste Umsätze" },
                                { value: "pilot_customer", label: "Pilotkunden vorhanden" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="business_activities">
                                        Werden Umsätze bereits erwirtschaftet?{" "}
                                    </FieldLabel>

                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="wähle" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {options.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="business_model"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "product_sales", label: "Produktverkauf" },
                                { value: "services", label: "Dienstleistung" },
                                { value: "marketplace", label: "Platform/Marktplatz" },
                                { value: "abo-model", label: "Abo-Model" },
                                { value: "llcensemodel", label: "Lizenzmodell" },
                                { value: "franchise", label: "Franchise" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="business_model">
                                        Welches Geschäftsmodell verfolgen Sie?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle ein oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="customer_problems"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="customer_problems">
                                    Welches Problem lösen Sie? *
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="customer_problems"
                                    placeholder="Die manuelle Suche von Hotels"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </>
            ),
        },
        {
            fields: [
                "inovation_level",
                "usp",
                "price_leadership",
                "quality_leadership",
                "specialist_leadership",
                "technology_leadership",
                "exclusive_leadership",
                "community_leadership",
                "usp_text",
                "scalable",
            ],
            component: (
                <>
                    <Controller
                        name="inovation_level"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "classic", label: "klassisches Geschäftsmodel" },
                                {
                                    value: "better_version",
                                    label: "verbesserte Version bestehender Lösung",
                                },
                                { value: "disruptiv_model", label: "Disruptives Modell" },
                                { value: "option_1771571114749", label: "Option 4" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-2 col-span-full"
                                >
                                    <FieldLabel htmlFor="inovation_level">
                                        Wie hoch ist der Innovationsgrad deines Geschäfts?{" "}
                                    </FieldLabel>

                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        {options.map(({ label, value }) => (
                                            <div key={value} className="flex items-center gap-x-2">
                                                <RadioGroupItem value={value} id={value} />
                                                <Label htmlFor={value}>{label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="usp"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "price_leadership", label: "Preisführerschaft" },
                                { value: "quality_leadership", label: "Qualitätsführerschaft" },
                                { value: "specialist_leadership", label: "Spezialisierung" },
                                {
                                    value: "technology_leadership",
                                    label: "Technologievorsprung",
                                },
                                { value: "exclusive_leadership", label: "Exklusiver Zugang" },
                                { value: "community_leadership", label: "Marke/Community" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="usp">
                                        Welche Alleinstellungsmerkmale (USP´s) sind vorhanden?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle ein oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="price_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "scale_efect", label: "Skaleneffekte" },
                                { value: "automation", label: "Automatisierung" },
                                { value: "direct_sales", label: "Direktvertrieb" },
                                { value: "low_fixed_costs", label: "Niedrige Fixkosten" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="price_leadership">
                                        Wie erreichen Sie die Preisführerschaft?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="quality_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "certification", label: "Zertifizierungen" },
                                { value: "reference", label: "Referenzen" },
                                { value: "test_seal", label: "Testsiegel" },
                                { value: "expert_state", label: "Expertenstatus" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="quality_leadership">
                                        Wie erreichen Sie die Qualitätsführerschaft?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle eine oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="specialist_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "niche", label: "Nische" },
                                { value: "branch", label: "Branche" },
                                { value: "region", label: "Region" },
                                { value: "customer_segment", label: "Kundensegment" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="specialist_leadership">
                                        Wie erreichen Sie die Spezialisierung?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle eine oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="technology_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "selfdevelopment", label: "Eigenentwicklung" },
                                { value: "patent", label: "Patent" },
                                { value: "proprietary_data", label: "Proprietäre Daten" },
                                { value: "ai-models", label: "KI-Modelle" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="technology_leadership">
                                        Wie erreichen Sie den Technologievorsprung?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle ein oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="exclusive_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "supplier", label: "Lieferanten" },
                                { value: "raw_materials", label: "Rohstoffe" },
                                { value: "community", label: "Community" },
                                { value: "relationship", label: "Partnerschaften" },
                                { value: "platform", label: "Plattformen" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="exclusive_leadership">
                                        Zu was haben Sie exklusiven Zugang?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle ein oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="community_leadership"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "under_tausend", label: "Unter 1000 Follower" },
                                { value: "tausend_ten_tausend", label: "1000-10000 Follower" },
                                {
                                    value: "ten_tausend_hundred_tausend",
                                    label: "10000-100000 Follower",
                                },
                                { value: "over_hundred_tausend", label: "über 100000" },
                                { value: "friday", label: "Friday" },
                                { value: "saturday", label: "Saturday" },
                                { value: "sunday", label: "Sunday" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-1 col-span-full"
                                >
                                    <FieldLabel htmlFor="community_leadership">
                                        Welche Reichweite haben Sie mit Ihrer Marke und
                                        Community?{" "}
                                    </FieldLabel>

                                    <MultiSelect
                                        values={field.value ?? []}
                                        onValuesChange={(value) => field.onChange(value ?? [])}
                                    >
                                        <MultiSelectTrigger>
                                            <MultiSelectValue placeholder="Wähle ein oder mehrere Optionen" />
                                        </MultiSelectTrigger>
                                        <MultiSelectContent>
                                            {options.map(({ label, value }) => (
                                                <MultiSelectItem key={value} value={value}>
                                                    {label}
                                                </MultiSelectItem>
                                            ))}
                                        </MultiSelectContent>
                                    </MultiSelect>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        name="usp_text"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="gap-1 col-span-full"
                            >
                                <FieldLabel htmlFor="usp_text">
                                    Beschreibe einige Details zu deinen ausgewählten
                                    Alleinstellungsmerkmalen *
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    aria-invalid={fieldState.invalid}
                                    id="usp_text"
                                    placeholder="Meine KI kann ein End to End Businessplan erstellen mit Hilfe von KI Modelle was ein absoluter Technologievorsprung bedeutet"
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="scalable"
                        control={form.control}
                        render={({ field, fieldState }) => {
                            const options = [
                                { value: "local", label: "lokal begrenzt" },
                                { value: "national", label: "national Skalierbar" },
                                { value: "international", label: "international skalierter" },
                                { value: "digital", label: "Digital Global" },
                            ];
                            return (
                                <Field
                                    data-invalid={fieldState.invalid}
                                    className="gap-1 [&_p]:pb-2 col-span-full"
                                >
                                    <FieldLabel htmlFor="scalable">
                                        Wie schnell kann Ihr Modell wachsen? *
                                    </FieldLabel>

                                    <RadioGroup
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        aria-invalid={fieldState.invalid}
                                    >
                                        {options.map(({ label, value }) => (
                                            <div key={value} className="flex items-center gap-x-2">
                                                <RadioGroupItem value={value} id={value} />
                                                <Label htmlFor={value}>{label}</Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />
                </>
            ),
        },
    ];

    if (isSubmitSuccessful) {
        return (
            <div className="p-2 sm:p-5 md:p-8 w-full rounded-md gap-2 border">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, stiffness: 300, damping: 25 }}
                    className="h-full py-6 px-3"
                >
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.3,
                            type: "spring",
                            stiffness: 500,
                            damping: 15,
                        }}
                        className="mb-4 flex justify-center border rounded-full w-fit mx-auto p-2"
                    >
                        <Check className="size-8" />
                    </motion.div>
                    <h2 className="text-center text-2xl text-pretty font-bold mb-2">
                        Thank you
                    </h2>
                    <p className="text-center text-lg text-pretty text-muted-foreground">
                        Form submitted successfully, we will get back to you soon
                    </p>
                </motion.div>
            </div>
        );
    }
    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col p-2 md:p-5 w-full mx-auto rounded-md max-w-3xl gap-2 border"
            >
                <MultiStepFormProvider
                    stepsFields={stepsFields}
                    onStepValidation={async (step) => {
                        const isValid = await form.trigger(step.fields);
                        return isValid;
                    }}
                >
                    <MultiStepFormContent>
                        <FormHeader />
                        <StepFields />
                        <FormFooter>
                            <PreviousButton>
                                <ChevronLeft />
                                Previous
                            </PreviousButton>
                            <NextButton>
                                Next <ChevronRight />
                            </NextButton>
                            <SubmitButton type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Submitting..." : "Submit"}
                            </SubmitButton>
                        </FormFooter>
                    </MultiStepFormContent>
                </MultiStepFormProvider>
            </form>
        </div>
    );
}
