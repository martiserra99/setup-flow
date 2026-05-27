import { cva } from "class-variance-authority";
import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";

import { cn } from "@/src/lib/cn";

const inputVariants = cva(
  "w-full rounded-lg border px-4 py-3 text-sm font-medium text-gray-950 transition-all outline-none placeholder:text-gray-400 focus:ring-2",
  {
    variants: {
      error: {
        false:
          "border-gray-200 focus:border-emerald-400 focus:ring-emerald-400/20",
        true: "border-red-400 focus:border-red-400 focus:ring-red-400/20",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface Input {
  type: "input";
  name: string;
  label: string;
  hideLabel?: boolean;
  placeholder: string;
}

export function InputView({ name, label, hideLabel, placeholder }: Input) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div>
      <Label.Root
        htmlFor={id}
        className={cn("mb-2 block text-sm font-semibold text-gray-700", {
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
            <input
              id={id}
              {...field}
              type="text"
              placeholder={placeholder}
              aria-invalid={!!fieldState.error}
              className={inputVariants({ error: !!fieldState.error })}
            />
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
