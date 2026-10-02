import { ShieldCheck, BadgeCheck, Lock, RefreshCw } from "lucide-react";
import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { trustPillars } from "@/lib/data/homeSections";

const ICONS = [ShieldCheck, BadgeCheck, Lock, RefreshCw];

export default function TrustSecurity() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-10 lg:px-16 dark:bg-surface-container-lowest/30">
      <div className="mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            eyebrow="Trust and security"
            title="How Fable handles your money and your work"
            subtitle="Plain descriptions of what the platform actually does, without the fine print."
          />
        </FadeLeft>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustPillars.map((item, index) => {
            const Icon = ICONS[index] ?? ShieldCheck;

            return (
              <StaggerItem key={item.id}>
                <SurfaceCard className="h-full p-6">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-brand-indigo/10 text-brand-indigo">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>

                  <h3 className="mt-4 text-base font-semibold text-foreground dark:text-on-surface">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
                    {item.body}
                  </p>
                </SurfaceCard>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}