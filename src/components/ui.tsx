import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "white";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  outline: "border border-line-strong text-ink hover:border-brand hover:bg-mint",
  white: "bg-white text-brand font-semibold hover:bg-mint",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-[22px] text-[15px]",
  lg: "min-h-[52px] px-[26px] text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `inline-flex items-center justify-center gap-2 rounded-full font-medium no-underline transition-colors ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  size = "lg",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link {...props} className={buttonClasses(variant, size, className)} />;
}

export function SectionHeader({
  eyebrow,
  title,
  link,
  as: Heading = "h2",
}: {
  eyebrow: string;
  title: string;
  link?: { href: string; label: string };
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-2.5">
        <p className="eyebrow">{eyebrow}</p>
        <Heading className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">{title}</Heading>
      </div>
      {link && (
        <Link href={link.href} className="py-3 text-[15px] font-medium no-underline">
          {link.label} <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

/** Large page title block used at the top of inner pages. */
export function PageIntro({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-[22px] ${center ? "items-center text-center" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="max-w-[820px] text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.05] font-semibold tracking-[-0.035em]">{title}</h1>
      {text && <p className="max-w-[640px] text-[17px] leading-relaxed text-muted sm:text-[19px]">{text}</p>}
    </div>
  );
}

/** Grey box shown where a photo is still missing. */
export function PhotoPlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center bg-sage p-4 text-center text-sm text-brand ${className}`} role="img" aria-label={label}>
      <span aria-hidden="true">[{label}]</span>
    </div>
  );
}
