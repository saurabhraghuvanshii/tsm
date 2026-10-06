import Link from "next/link";
import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "bg-accent text-accent-contrast border-transparent hover:opacity-90",
  secondary: "bg-surface text-ink border-border hover:bg-surface-2",
  ghost: "bg-transparent text-muted border-transparent hover:bg-surface-2 hover:text-ink",
  danger: "bg-danger text-accent-contrast border-transparent hover:opacity-90",
};

const SIZES = {
  sm: "h-8 px-3 text-[13px] gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  icon: "h-10 w-10 justify-center",
};

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  disabled,
  href,
  className = "",
  children,
  type = "button",
  ...props
}) {
  const classes = `inline-flex shrink-0 items-center justify-center rounded-lg border font-medium shadow-sm
    disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </button>
  );
}
