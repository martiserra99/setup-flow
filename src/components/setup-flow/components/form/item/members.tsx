import { cva } from "class-variance-authority";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import { PlusIcon, XIcon } from "lucide-react";

import { cn } from "@/src/lib/cn";

const inputVariants = cva(
  "min-w-0 flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-gray-950 transition-all outline-none placeholder:text-gray-400 focus:ring-2",
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

export interface Members {
  type: "members";
  name: string;
  label: string;
  hideLabel?: boolean;
}

export function MembersView({ name, label, hideLabel }: Members) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const errors = fieldState.error as FieldError[] | undefined;

        const setEmail = (i: number, email: string) => {
          const value = [...field.value];
          value[i] = email;
          field.onChange(value);
        };

        const add = () => {
          field.onChange([...field.value, ""]);
        };

        const remove = (i: number) => {
          field.onChange(field.value.filter((_: string, j: number) => j !== i));
        };

        return (
          <div className="flex flex-col gap-3">
            <Label.Root
              className={cn("block text-sm font-semibold text-gray-700", {
                "sr-only": hideLabel,
              })}
            >
              {label}
            </Label.Root>
            {field.value.map((email: string, i: number) => (
              <div key={i} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(i, e.target.value)}
                    placeholder="colleague@company.com"
                    aria-invalid={!!errors?.[i]}
                    className={inputVariants({ error: !!errors?.[i] })}
                  />
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 transition-colors outline-none hover:border-red-200 hover:bg-red-50 hover:text-red-500 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
                  >
                    <XIcon className="size-3.5" />
                  </button>
                </div>
                {errors?.[i] && (
                  <p className="text-xs font-medium text-red-500">
                    {errors[i].message}
                  </p>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={add}
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-lg border border-dashed border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-400 transition-colors outline-none hover:border-gray-300 hover:text-gray-600 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
            >
              <PlusIcon className="size-3.5" />
              Add member
            </button>
          </div>
        );
      }}
    />
  );
}
