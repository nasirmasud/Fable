"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { faq } from "@/lib/data/homeSections";
import FloatingParticles from "@/components/tools/FloatingParticles";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const baseId = useId();

  return (
    <section className="relative w-full overflow-hidden bg-background px-6 py-20 md:px-10 md:py-24 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(139,92,246,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_80%,rgba(168,85,247,0.14),transparent_75%)]" />
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="relative mx-auto w-full max-w-3xl">
        <FadeLeft>
          <SectionHeader
            eyebrow="Questions"
            title="Frequently asked questions"
            subtitle="If something here is wrong or out of date, it is marked as a placeholder rather than guessed at."
          />
        </FadeLeft>

        <div className="mt-12 grid grid-cols-1 gap-y-3">
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