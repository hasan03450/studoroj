"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MenuIcon } from "./icons";
import { JOIN_HREF, NAV_ITEMS } from "./nav";
import { buttonClasses } from "./ui";
import logo from "../../public/images/logo.png";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white lg:static">
      <a
        href="#inhoud"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2"
      >
        Naar de inhoud
      </a>
      <div className="container-site flex items-center justify-between gap-4 py-3 lg:py-[18px]">
        <Link href="/" className="flex shrink-0 items-center">
          <Image src={logo} alt="StuduRoj, Studenten van Roj (home)" priority className="h-[38px] w-auto lg:h-12" />
        </Link>

        <nav aria-label="Hoofdmenu" className="hidden items-center gap-x-7 text-[15px] lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`py-3 no-underline ${active ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={JOIN_HREF}
            aria-current={isActive(pathname, JOIN_HREF) ? "page" : undefined}
            className={buttonClasses("primary", "md", "min-h-11 px-5")}
          >
            Word lid
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          aria-controls="mobiel-menu"
          className="flex size-11 cursor-pointer items-center justify-center rounded-xl border border-line bg-white lg:hidden"
        >
          <MenuIcon open={open} />
        </button>
      </div>

      {open && (
        <nav id="mobiel-menu" aria-label="Hoofdmenu" className="flex flex-col border-t border-line px-4 pt-1 pb-5 lg:hidden">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-14 items-center border-b border-[#EEF1EE] text-xl no-underline ${active ? "font-semibold text-brand" : "font-medium text-ink"}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href={JOIN_HREF} className={buttonClasses("primary", "lg", "mt-5 w-full")}>
            Word lid
          </Link>
        </nav>
      )}
    </header>
  );
}
