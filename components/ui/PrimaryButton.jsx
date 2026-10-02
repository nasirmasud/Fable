import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function PrimaryButton({
  href,
  size = "lg",
  withArrow = true,
  className,
  children,
  ...props
}) {
  const classes = cn(
    buttonVariants({ variant: "default", size }),
    "rounded-full border-0 bg-transparent bg-[linear-gradient(135deg,#7c3aed,#6366f1)] px-6 text-white",
    "shadow-[0_8px_24px_-8px_rgba(124,58,237,0.6)] transition-all duration-300",
    "hover:scale-[1.02] hover:bg-[linear-gradient(135deg,#7c3aed,#6366f1)] hover:shadow-[0_0_24px_rgba(139,92,246,0.55)]",
    className
  );

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}