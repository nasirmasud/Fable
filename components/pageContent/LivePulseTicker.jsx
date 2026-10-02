"use client";

import { Radio } from "lucide-react";
import { livePulse } from "@/lib/data/homeSections";

export default function LivePulseTicker() {
  return (
    <section
      aria-label="Recent activity on Fable"
      className="w-full bg-white dark:bg-[#070314]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 md:px-10 lg:px-16">
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-brand-violet/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-violet uppercase">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-violet opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-violet" />
          </span>
          Live
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ul className="flex items-center gap-8 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {livePulse.map((item) => (
              <li
                key={item.id}
                className="flex shrink-0 items-center gap-2 text-xs whitespace-nowrap text-muted-foreground dark:text-on-surface-variant"
              >
                <Radio aria-hidden="true" className="size-3 text-brand-violet/60" />
                <span>{item.text}</span>
                <span className="text-brand-muted">{item.ago}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}