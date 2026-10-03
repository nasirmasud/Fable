"use client";

import { Radio } from "lucide-react";
import { livePulse } from "@/lib/data/homeSections";

export default function LivePulseTicker() {
  return (
    <section
      aria-label="Recent activity on Fable"
      className="w-full relative border-y border-brand-violet/25 bg-gradient-to-r from-brand-violet/15 via-white to-brand-violet/15 dark:from-brand-violet/25 dark:via-[#070314] dark:to-brand-violet/25 shadow-[0_0_60px_-20px_rgba(139,92,246,0.8)]"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4 md:px-10 lg:px-16">
        <span className="flex shrink-0 items-center gap-2 rounded-full bg-brand-violet px-3 py-1 text-[11px] font-bold tracking-[0.2em] text-white uppercase shadow-[0_0_25px_rgba(139,92,246,0.7)]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
          </span>
          Live
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex items-center gap-10 animate-marquee [animation-duration:40s] hover:[animation-play-state:paused]">
            {[...livePulse, ...livePulse].map((item, idx) => (
              <li
                key={`${item.id}-${idx}`}
                className="flex shrink-0 items-center gap-2 text-xs md:text-sm whitespace-nowrap text-foreground/80 dark:text-on-surface"
              >
                <Radio aria-hidden="true" className="size-3.5 text-brand-violet" />
                <span>{item.text}</span>
                <span className="text-brand-violet/80 font-medium">{item.ago}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}