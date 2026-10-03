import { cn } from "@/lib/utils";

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
  action,
  className,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        isCenter && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("flex gap-4", isCenter && "sm:justify-center")}>
        {!isCenter && (
          <span
            aria-hidden="true"
            className="mt-1 hidden w-[3px] shrink-0 rounded-full bg-brand-violet sm:block"
          />
        )}

        <div className={cn(isCenter && "flex flex-col items-center")}>
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-[0.18em] text-brand-violet uppercase">
              {eyebrow}
            </p>
          ) : null}

          <h2 className="font-heading mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl dark:text-on-surface">
            {title}
          </h2>

          {subtitle ? (
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground dark:text-on-surface-variant">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>

      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}