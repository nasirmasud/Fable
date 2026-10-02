import { Compass, CreditCard, Laptop, Check, Lock, RefreshCw } from "lucide-react";
import FloatingParticles from "@/components/tools/FloatingParticles";
import { FadeLeft, StaggerContainer, StaggerItem } from "@/components/tools/MotionWrapper";
import SectionHeader from "@/components/ui/SectionHeader";
import SurfaceCard from "@/components/ui/SurfaceCard";
import { howFableWorks } from "@/lib/data/homeSections";

const ICONS = [Compass, CreditCard, Laptop];
const FOOTER_ICONS = [Check, Lock, RefreshCw];

export default function HowFableWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden w-full bg-white px-6 md:px-10 lg:px-16 dark:bg-[#070314] font-sans transition-colors duration-300"
    >
      <FloatingParticles count={25} color="rgba(167,139,250,0.5)" />
      <div className="mx-auto w-full max-w-7xl">
        <FadeLeft>
          <SectionHeader
            align="center"
            eyebrow="How it works"
            title="Three steps from browse to bookshelf"
            subtitle="No account needed to look around. Sign up only when you are ready to keep a book."
          />
        </FadeLeft>

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {howFableWorks.map((item, index) => {
            const Icon = ICONS[index] ?? Compass;
            const FooterIcon = FOOTER_ICONS[index] ?? Check;

            return (
              <StaggerItem key={item.id}>
                <SurfaceCard interactive className="relative h-full overflow-hidden p-6">
                  <span
                    aria-hidden="true"
                    className="absolute -top-6 -right-2 text-7xl font-bold text-brand-violet/10 select-none"
                  >
                    {item.step}
                  </span>

                  <span className="relative flex size-12 items-center justify-center rounded-xl bg-brand-violet/10 text-brand-violet">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>

                  <h3 className="relative mt-5 text-lg font-semibold text-foreground dark:text-on-surface">
                    {item.title}
                  </h3>

                  <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
                    {item.body}
                  </p>

                  <p className="relative mt-5 flex items-center gap-2 border-t border-brand-violet/10 pt-4 text-xs font-medium text-brand-violet">
                    <FooterIcon aria-hidden="true" className="size-3.5" />
                    {item.footer}
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