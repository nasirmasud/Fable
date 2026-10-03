import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

export default function GhostButton({ href, size = "lg", className, children, ...props }) {
  const classes = cn(
    buttonVariants({ variant: "outline", size }),
    "rounded-full border-white/15 bg-white/5 px-6 text-white",
    "transition-all duration-300 hover:border-brand-violet/40 hover:bg-white/10",
    "dark:border-white/15 dark:bg-white/5 dark:hover:border-brand-violet/40 dark:hover:bg-white/10",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}