import { ShieldCheck, BadgeCheck, Lock, RefreshCw } from "lucide-react";
import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { trustPillars } from "@/lib/data/homeSections";
import FloatingParticles from "@/components/tools/FloatingParticles";

const ICONS = [ShieldCheck, BadgeCheck, Lock, RefreshCw];

export default function TrustSecurity() {
  return (
    <section className="section-y relative w-full overflow-hidden bg-background px-6 md:px-10 lg:px-16 font-sans transition-colors duration-300 dark:bg-[#070314]">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-violet/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(139,92,246,0.18),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_80%,rgba(168,85,247,0.14),transparent_75%)]" />
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="relative mx-auto w-full max-w-7xl">
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