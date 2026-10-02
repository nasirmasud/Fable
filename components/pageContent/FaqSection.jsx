"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { faq } from "@/lib/data/homeSections";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16 dark:bg-surface-container-lowest/30">
      <div className="mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            eyebrow="Questions"
            title="Frequently asked questions"
            subtitle="If something here is wrong or out of date, it is marked as a placeholder rather than guessed at."
          />
        </FadeLeft>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 lg:grid-cols-2">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `${baseId}-panel-${index}`;
            const buttonId = `${baseId}-button-${index}`;

            return (
              <div
                key={item.id}
                className="rounded-xl border border-brand-violet/15 bg-white/70 backdrop-blur-sm dark:bg-surface-container/60"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-foreground transition-colors hover:text-brand-violet dark:text-on-surface"
                  >
                    {item.q}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-4 shrink-0 text-brand-violet transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}