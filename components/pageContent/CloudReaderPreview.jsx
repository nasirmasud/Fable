import { Type, Contrast, Highlighter, RefreshCw, Bookmark } from "lucide-react";
import { FadeLeft } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import { readerPreview, readerFeatures } from "@/lib/data/homeSections";
import FloatingParticles from "@/components/tools/FloatingParticles";

const ICONS = [Type, Contrast, Highlighter, RefreshCw];

export default function CloudReaderPreview() {
  return (
    <section className="section-y relative w-full overflow-hidden bg-background px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(139,92,246,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_80%,rgba(168,85,247,0.14),transparent_75%)]" />
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="relative mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            align="center"
            eyebrow="Reading experience"
            title="A reader that keeps your place"
            subtitle="Comfortable typography, three themes, and progress that follows you between devices."
          />
        </FadeLeft>

        <div
          aria-hidden="true"
          className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-brand-violet/15 bg-white/70 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] backdrop-blur-sm dark:bg-surface-container/70"
        >
          <div className="flex items-center gap-2 border-b border-brand-violet/10 px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
            <span className="ml-3 truncate rounded-md bg-black/5 px-2 py-0.5 text-[11px] text-muted-foreground dark:bg-white/5">
              fable.read/{readerPreview.title.toLowerCase().replace(/\s+/g, "-")}
            </span>
          </div>

          <div className="flex items-center gap-2 border-b border-brand-violet/10 px-4 py-2">
            <Type className="size-3.5 text-muted-foreground" />
            <Contrast className="size-3.5 text-muted-foreground" />
            <span className="ml-1 flex items-center gap-1.5">
              <span className="size-3.5 rounded-full border border-brand-violet/40 bg-white" />
              <span className="size-3.5 rounded-full border border-brand-violet/20 bg-black/85" />
              <span className="size-3.5 rounded-full border border-brand-violet/20 bg-[#f4ecd8]" />
            </span>
            <Bookmark className="ml-auto size-3.5 text-brand-violet" />
          </div>

          <div className="px-6 py-7 sm:px-10">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand-violet uppercase">
              {readerPreview.title}
            </p>
            <p className="mt-1 text-xs text-muted-foreground dark:text-on-surface-variant">
              {readerPreview.author}
            </p>

            <div className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
              <p>{readerPreview.blurb}</p>
              <p className="opacity-70">
                The greenhouse had been locked for eleven years. She had the key and, now that she had
                the deed, the debt that came with it.
              </p>
            </div>
          </div>

          <div className="h-1 w-full bg-black/5 dark:bg-white/5">
            <div
              className="h-full bg-brand-violet"
              style={{ width: `${readerPreview.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {readerFeatures.map((item, index) => {
            const Icon = ICONS[index] ?? Type;

            return (
              <div key={item.id} className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-violet/10 text-brand-violet">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground dark:text-on-surface">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground dark:text-on-surface-variant">
                    {item.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}