import { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export interface Switch {
  type: "switch";
  name: string;
  label: string;
  hint: string;
}

export function SwitchView({ name, label, hint }: Switch) {
  const id = useId();
  const { control } = useFormContext();
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-5 py-4">
      <Label.Root htmlFor={id} className="cursor-pointer">
        <p className="text-sm font-semibold text-gray-900">{label}</p>
        <p className="mt-0.5 text-xs font-medium text-gray-400">{hint}</p>
      </Label.Root>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SwitchPrimitive.Root
            id={id}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="relative ml-6 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full bg-gray-200 transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 data-[state=checked]:bg-emerald-500"
          >
            <SwitchPrimitive.Thumb className="inline-block size-4 translate-x-1 transform rounded-full bg-white shadow-sm transition-transform duration-200 data-[state=checked]:translate-x-6" />
          </SwitchPrimitive.Root>
        )}
      />
    </div>
  );
}
