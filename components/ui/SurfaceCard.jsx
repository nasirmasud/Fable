import { cn } from "@/lib/utils";

export default function SurfaceCard({
  as: Tag = "div",
  elevated = false,
  interactive = false,
  className,
  ...props
}) {
  return (
    <Tag
      data-slot="surface-card"
      className={cn(
        "rounded-xl border border-brand-violet/15 backdrop-blur-sm",
        "bg-white/80 dark:bg-surface-container/60",
        elevated
          ? "shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.65)]"
          : "shadow-[0_4px_16px_-6px_rgba(0,0,0,0.35)]",
        interactive &&
          "transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-violet/40 hover:shadow-[0_0_24px_rgba(139,92,246,0.55)]",
        className
      )}
      {...props}
    />
  );
}