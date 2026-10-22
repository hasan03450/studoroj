/* Icons from the design. Decorative: hidden from screen readers. */

type IconProps = { className?: string };

function Tile({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden="true" className={className ?? "shrink-0"}>
      <rect width="40" height="40" rx="12" fill="var(--color-mint)" />
      <g fill="none" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export const CommunityIcon = (p: IconProps) => (
  <Tile {...p}>
    <path d="M15 21a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM25 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM8.5 29c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5M21.5 25c1-.9 2.2-1.5 3.5-1.5 2.8 0 5 1.8 6 5.5" />
  </Tile>
);

export const ActivitiesIcon = (p: IconProps) => (
  <Tile {...p}>
    <rect x="11" y="12.5" width="18" height="16" rx="3" />
    <path d="M11 17.5h18M15.5 10.5v4M24.5 10.5v4" />
  </Tile>
);

export const SupportIcon = (p: IconProps) => (
  <Tile {...p}>
    <path d="M20 29s-8-4.6-8-10.5A4.5 4.5 0 0 1 20 16a4.5 4.5 0 0 1 8 2.5C28 24.4 20 29 20 29z" />
  </Tile>
);

export const MailIcon = (p: IconProps) => (
  <Tile {...p}>
    <rect x="11" y="13" width="18" height="14" rx="2.5" />
    <path d="M11.5 14l8.5 6.5 8.5-6.5" />
  </Tile>
);

export const PhoneIcon = (p: IconProps) => (
  <Tile {...p}>
    <path d="M14 11.5h3l1.5 4-2 1.5a10 10 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 12 13.5a2 2 0 0 1 2-2z" />
  </Tile>
);

export const PinIcon = (p: IconProps) => (
  <Tile {...p}>
    <path d="M20 29s7-6.2 7-11.5a7 7 0 0 0-14 0C13 22.8 20 29 20 29z" />
    <circle cx="20" cy="17.5" r="2.5" />
  </Tile>
);

export const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true" className="mt-px shrink-0">
    <path d="M4 9.5l3 3 7-7" fill="none" stroke="var(--color-brand)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const MenuIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
    <path d={open ? "M5 5l10 10M15 5L5 15" : "M3 6h14M3 10h14M3 14h14"} stroke="var(--color-ink)" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const RingsArt = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 400 340"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
    className="absolute inset-0"
  >
    {[150, 100, 50].map((r) => (
      <circle key={r} cx="330" cy="70" r={r} fill="none" stroke="var(--color-brand-line)" strokeWidth="1" />
    ))}
  </svg>
);
