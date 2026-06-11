"use client";

import type { OnReturn } from "@formity/react";

import { useState, useCallback, useMemo, useRef } from "react";
import { useFormity } from "@formity/react";

import type { Status, FormStatus } from "./types/status";
import type { FormStep } from "./types/steps";

import { Sidebar } from "./components/sidebar";
import { Done } from "./components/done";

import { steps, flow, inputs, type Schema } from "./flow";

export function SetupFlow() {
  const [status, setStatus] = useState<Status>({
    type: "form",
    submitting: false,
  });

  const onReturn = useCallback<OnReturn<Schema>>(async (output) => {
    setStatus({ type: "form", submitting: true });

    // Show output in the console
    console.log(output);

    // Simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setStatus({ type: "done" });
  }, []);

  if (status.type === "done") {
    return (
      <Done
        onStartOver={() => setStatus({ type: "form", submitting: false })}
      />
    );
  }

  return <Form status={status} onReturn={onReturn} />;
}

interface FormProps {
  status: FormStatus;
  onReturn: OnReturn<Schema>;
}

function Form({ status, onReturn }: FormProps) {
  const [values, setValues] = useState(inputs);

  const ref = useRef<{ jump: (id: string) => void }>(null);

  const { step: current, form } = useFormity({
    flow,
    inputs,
    params: { status, values, onValuesChange: setValues, ref },
    history: false,
    onReturn,
  });

  const completed = useMemo(() => {
    for (let i = 0; i < steps.length - 1; i++) {
      const step = steps[i] as FormStep;
      if (!step.zod.safeParse(values).success) {
        return i;
      }
    }
    return steps.length - 1;
  }, [values]);

  return (
    <div className="@container flex h-full w-full overflow-hidden bg-white">
      <Sidebar
        steps={steps}
        current={current}
        completed={completed}
        jump={(step) => ref.current?.jump(step)}
      />
      <main className="flex flex-1 flex-col overflow-hidden">{form}</main>
    </div>
  );
}
