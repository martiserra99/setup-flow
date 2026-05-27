import { cva } from "class-variance-authority";
import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, CheckIcon } from "lucide-react";

import { cn } from "@/src/lib/cn";

const triggerVariants = cva(
  "flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-950 transition-all outline-none focus-visible:ring-2 data-placeholder:text-gray-400",
  {
    variants: {
      error: {
        false:
          "border-gray-200 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20",
        true: "border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20",
      },
    },
    defaultVariants: {
      error: false,
    },
  },
);

export interface Select {
  type: "select";
  name: string;
  label: string;
  hideLabel?: boolean;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
}

export function SelectView({
  name,
  label,
  hideLabel,
  placeholder,
  options,
}: Select) {
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
            <SelectPrimitive.Root
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectPrimitive.Trigger
                id={id}
                aria-invalid={!!fieldState.error}
                className={triggerVariants({ error: !!fieldState.error })}
              >
                <SelectPrimitive.Value placeholder={placeholder} />
                <SelectPrimitive.Icon>
                  <ChevronDownIcon className="size-4 shrink-0 text-gray-400" />
                </SelectPrimitive.Icon>
              </SelectPrimitive.Trigger>
              <SelectPrimitive.Portal>
                <SelectPrimitive.Content
                  position="popper"
                  sideOffset={4}
                  className="z-50 w-(--radix-select-trigger-width) overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-md"
                >
                  <SelectPrimitive.Viewport className="max-h-60 px-1">
                    {options.map(({ value, label }) => (
                      <SelectPrimitive.Item
                        key={value}
                        value={value}
                        className="relative flex cursor-pointer items-center rounded-md px-3 py-2 pr-8 text-sm font-medium text-gray-700 outline-none select-none data-highlighted:bg-gray-50 data-highlighted:text-gray-950 data-[state=checked]:text-emerald-600"
                      >
                        <SelectPrimitive.ItemText>
                          {label}
                        </SelectPrimitive.ItemText>
                        <SelectPrimitive.ItemIndicator className="absolute right-3">
                          <CheckIcon className="size-3.5 text-emerald-500" />
                        </SelectPrimitive.ItemIndicator>
                      </SelectPrimitive.Item>
                    ))}
                  </SelectPrimitive.Viewport>
                </SelectPrimitive.Content>
              </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
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
