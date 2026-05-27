import { cva } from "class-variance-authority";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { cn } from "@/src/lib/cn";

const cardVariants = cva(
  "group flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-50",
  {
    variants: {
      error: {
        false:
          "border-gray-200 hover:border-gray-300 hover:bg-gray-50 focus-visible:ring-emerald-400",
        true: "border-red-300 hover:border-red-400 hover:bg-red-50 focus-visible:ring-red-400",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const iconVariants = cva(
  "flex size-8 items-center justify-center rounded-lg transition-colors group-data-[state=checked]:bg-emerald-100 [&_svg]:size-4 group-data-[state=checked]:[&_svg]:text-emerald-600",
  {
    variants: {
      error: {
        false: "bg-gray-100 [&_svg]:text-gray-500",
        true: "bg-red-100 [&_svg]:text-red-500",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const labelVariants = cva(
  "text-sm font-semibold group-data-[state=checked]:text-emerald-700",
  {
    variants: {
      error: {
        false: "text-gray-900",
        true: "text-red-700",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

const descriptionVariants = cva(
  "mt-0.5 text-xs leading-snug font-medium group-data-[state=checked]:text-emerald-600/80",
  {
    variants: {
      error: {
        false: "text-gray-400",
        true: "text-red-400",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface TemplateChoice {
  type: "templateChoice";
  name: string;
  label: string;
  hideLabel?: boolean;
  options: {
    icon?: React.ReactNode;
    label: string;
    value: string;
    description?: string;
  }[];
}

export function TemplateChoiceView({
  name,
  label,
  hideLabel,
  options,
}: TemplateChoice) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div>
          <Label.Root
            className={cn("mb-3 block text-sm font-semibold text-gray-700", {
              "sr-only": hideLabel,
            })}
          >
            {label}
          </Label.Root>
          <RadioGroup.Root
            value={field.value}
            onValueChange={field.onChange}
            aria-invalid={!!fieldState.error}
            className="grid grid-cols-1 gap-3 @md:grid-cols-2"
          >
            {options.map(({ value, label, description, icon }) => (
              <RadioGroup.Item
                key={value}
                value={value}
                className={cardVariants({ error: !!fieldState.error })}
              >
                <div className={iconVariants({ error: !!fieldState.error })}>
                  {icon}
                </div>
                <div>
                  <p className={labelVariants({ error: !!fieldState.error })}>
                    {label}
                  </p>
                  {description && (
                    <p
                      className={descriptionVariants({
                        error: !!fieldState.error,
                      })}
                    >
                      {description}
                    </p>
                  )}
                </div>
              </RadioGroup.Item>
            ))}
          </RadioGroup.Root>
          {fieldState.error && (
            <p className="mt-1.5 text-xs font-medium text-red-500">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
