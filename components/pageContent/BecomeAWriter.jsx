"use client";

import { useMemo, useState } from "react";
import { Percent, Zap, BarChart3, BadgeCheck } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import SurfaceCard from "@/components/ui/SurfaceCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import {
  ROYALTY_RATE,
  AUTHOR_VERIFICATION_FEE_NOTE,
  writerPillars,
} from "@/lib/data/homeSections";

const ICONS = [Percent, Zap, BarChart3, BadgeCheck];
const MAX_COPIES = 1000;

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function sanitize(value, fallback) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(n, 100000);
}

export default function BecomeAWriter() {
  const [price, setPrice] = useState("15");
  const [copies, setCopies] = useState("300");

  const result = useMemo(() => {
    const p = sanitize(price, 0);
    const c = sanitize(copies, 0);
    const total = p * c * ROYALTY_RATE;
    return { p, c, total };
  }, [price, copies]);

  const progress = Math.min(100, Math.round((result.c / MAX_COPIES) * 100));

  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16 dark:bg-surface-container-lowest/30">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 lg:grid-cols-7 lg:gap-12">
        <div className="lg:col-span-4">
          <FadeLeft>
            <SectionHeader
              eyebrow="For writers"
              title="Publish on Fable and keep 90% of every sale"
              subtitle="No monthly subscription, no per-book listing fee, and a dashboard that shows what sold each month."
            />
          </FadeLeft>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {writerPillars.map((item, index) => {
              const Icon = ICONS[index] ?? Percent;

              return (
                <div key={item.id} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground dark:text-on-surface">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <PrimaryButton
              // TODO: no apply-as-writer route exists yet
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Apply as a Verified Writer
            </PrimaryButton>
          </div>
        </div>

        <div className="lg:col-span-3">
          <SurfaceCard elevated className="p-6">
            <h3 className="text-lg font-semibold text-foreground dark:text-on-surface">
              Earnings calculator
            </h3>
            <p className="mt-1 text-sm text-muted-foreground dark:text-on-surface-variant">
              Estimate what a title would return at a given price and sales volume.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground dark:text-on-surface-variant">
                  Price (USD)
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-sm outline-none focus-visible:border-brand-violet focus-visible:ring-2 focus-visible:ring-brand-violet/40 dark:bg-black/25"
                />
              </label>

              <label className="block">
                <span className="text-xs font-medium text-muted-foreground dark:text-on-surface-variant">
                  Copies sold
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  inputMode="numeric"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-brand-violet/20 bg-white px-3 py-2 text-sm outline-none focus-visible:border-brand-violet focus-visible:ring-2 focus-visible:ring-brand-violet/40 dark:bg-black/25"
                />
              </label>
            </div>

            <div className="mt-6 rounded-xl border border-brand-violet/20 bg-brand-violet/5 p-4">
              <p className="text-xs font-medium text-muted-foreground dark:text-on-surface-variant">
                You would keep
              </p>
              <p
                aria-live="polite"
                className="mt-1 font-heading text-3xl font-bold text-brand-violet tabular-nums"
              >
                {result.total > 0 ? formatter.format(result.total) : "$0.00"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground dark:text-on-surface-variant">
                {result.c} {result.c === 1 ? "copy" : "copies"} at{" "}
                {formatter.format(result.p)} each, after a {Math.round(ROYALTY_RATE * 100)}% royalty
              </p>
            </div>

            <div className="mt-5">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                <div
                  className="h-full rounded-full bg-brand-violet transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground dark:text-on-surface-variant">
                {progress}% of a {MAX_COPIES}-copy month
              </p>
            </div>

            <p className="mt-5 border-t border-brand-violet/10 pt-4 text-xs leading-relaxed text-muted-foreground dark:text-on-surface-variant">
              {AUTHOR_VERIFICATION_FEE_NOTE}
            </p>
          </SurfaceCard>
        </div>
      </div>
    </section>
  );
}