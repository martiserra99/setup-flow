import type { Next, Jump } from "@formity/react";
import type { FormStatus } from "../../types/status";

import { useImperativeHandle } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

import { Button } from "@/src/components/ui/button";

import { ItemView, type Item } from "./item";

interface ReviewProps {
  heading: string;
  message: string;
  content: Item[];
  buttons: {
    next: string;
    back: string;
  };
  onNext: Next<Record<never, never>>;
  onJump: Jump<Record<never, never>>;
  prevId: string;
  status: FormStatus;
  ref: React.Ref<{ jump: (id: string) => void }>;
}

export function Review({
  heading,
  message,
  content,
  buttons,
  onNext,
  onJump,
  prevId,
  status,
  ref,
}: ReviewProps) {
  useImperativeHandle(
    ref,
    () => ({
      jump: (id) => onJump(id, {}),
    }),
    [onJump],
  );
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-12 pt-12 pb-8">
        <div className="max-w-lg">
          <div className="mb-10">
            <h2 className="mb-1.5 text-2xl font-bold text-gray-950">
              {heading}
            </h2>
            <p className="text-sm font-medium text-gray-400">{message}</p>
          </div>
          <div className="flex flex-col gap-4">
            {content.map((item, i) => (
              <ItemView key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center justify-between border-t border-gray-100 px-12 py-5">
        <button
          type="button"
          onClick={() => onJump(prevId, {})}
          disabled={status.submitting}
          className="inline-flex items-center gap-2 rounded text-sm font-medium text-gray-400 transition-colors outline-none hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:text-gray-400"
        >
          <ArrowLeftIcon className="size-3.5" /> Back
        </button>
        <Button disabled={status.submitting} onClick={() => onNext({})}>
          {status.submitting ? "Submitting..." : buttons.next}
          <ArrowRightIcon className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
