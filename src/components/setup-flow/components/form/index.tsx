import type { FieldValues, DefaultValues } from "react-hook-form";
import type { OnNext, OnJump } from "@formity/react";
import type { z } from "zod";

import { useEffect, useEffectEvent, useImperativeHandle } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/src/components/ui/button";

import { ItemView, type Item } from "./item";

interface FormProps<T extends FieldValues, U extends T> {
  defaultValues: DefaultValues<T>;
  validate: z.ZodType<T, T>;
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    next: string;
    back: string | null;
  };
  onNext: OnNext<T>;
  onJump: OnJump<T>;
  prevId: string | null;
  values: U;
  onValuesChange: (values: U) => void;
  ref: React.Ref<{ jump: (id: string) => void }>;
}

export function Form<T extends FieldValues, U extends T>({
  defaultValues,
  validate,
  heading,
  message,
  content,
  buttons,
  onNext,
  onJump,
  prevId,
  values,
  onValuesChange,
  ref,
}: FormProps<T, U>) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(validate),
  });

  const onFieldsChange = useEffectEvent(({ values: fields }: { values: T }) => {
    onValuesChange({ ...values, ...fields });
  });

  useEffect(() => {
    return form.subscribe({
      formState: { values: true },
      callback: onFieldsChange,
    });
  }, [form]);

  useImperativeHandle(
    ref,
    () => ({
      jump: (id) => onJump(id, form.getValues()),
    }),
    [form, onJump],
  );

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={form.handleSubmit(onNext)}
      className="flex flex-1 flex-col overflow-hidden"
    >
      <FormProvider {...form}>
        <div className="flex-1 overflow-y-auto px-12 pt-12 pb-8">
          <div className="max-w-lg">
            <div className="mb-10">
              <h2 className="mb-1.5 text-2xl font-bold text-gray-950">
                {heading}
              </h2>
              <p className="text-sm font-medium text-gray-400">{message}</p>
            </div>
            <div className="flex flex-col gap-8">
              {content.map((item, i) => (
                <ItemView key={i} {...item} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center border-t border-gray-100 px-12 py-5">
          {buttons.back && (
            <button
              type="button"
              onClick={() => onJump(prevId, form.getValues())}
              className="inline-flex items-center gap-2 rounded text-sm font-medium text-gray-400 transition-colors outline-none hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
            >
              <ArrowLeftIcon className="size-3.5" /> {buttons.back}
            </button>
          )}
          <Button className="ml-auto">
            {buttons.next}
            <ArrowRightIcon className="size-3.5" />
          </Button>
        </div>
      </FormProvider>
    </form>
  );
}
