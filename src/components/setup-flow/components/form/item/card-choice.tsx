import { cva } from "class-variance-authority";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import * as RadioGroup from "@radix-ui/react-radio-group";

import { cn } from "@/src/lib/cn";

const cardVariants = cva(
  "flex flex-col items-center gap-3 rounded-xl border px-4 py-6 text-sm font-medium transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=checked]:border-emerald-400 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-700 [&_svg]:size-6 [&_svg]:transition-colors data-[state=checked]:[&_svg]:text-emerald-500",
  {
    variants: {
      error: {
        false:
          "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus-visible:ring-emerald-400 [&_svg]:text-gray-400",
        true: "border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-700 focus-visible:ring-red-400 [&_svg]:text-red-400",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface CardChoice {
  type: "cardChoice";
  name: string;
  label: string;
  hideLabel?: boolean;
  options: {
    icon?: React.ReactNode;
    label: string;
    value: string;
  }[];
}

export function CardChoiceView({
  name,
  label,
  hideLabel,
  options,
}: CardChoice) {
  const { control } = useFormContext();
  return (
    <div>
      <Label.Root
        className={cn("mb-3 block text-sm font-semibold text-gray-700", {
          "sr-only": hideLabel,
        })}
      >
        {label}
      </Label.Root>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <>
            <RadioGroup.Root
              value={field.value}
              onValueChange={field.onChange}
              aria-invalid={!!fieldState.error}
              className="grid grid-cols-1 gap-3 @md:grid-cols-3"
            >
              {options.map(({ value, label, icon }) => (
                <RadioGroup.Item
                  key={value}
                  value={value}
                  className={cardVariants({ error: !!fieldState.error })}
                >
                  <>{icon}</>
                  <span className="text-center text-xs leading-tight">
                    {label}
                  </span>
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
            {fieldState.error && (
              <p className="mt-1.5 text-xs font-medium text-red-500">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
