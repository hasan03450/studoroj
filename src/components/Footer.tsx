import Image from "next/image";
import Link from "next/link";
import { cacheLife, cacheTag } from "next/cache";
import { getSettings } from "@/lib/content";
import { EMAIL_PLACEHOLDER } from "@/lib/format";
import { SANITY_TAG } from "@/sanity/fetch";
import logo from "../../public/images/logo.png";

const linkClass = "text-mist no-underline hover:text-white";

export async function Footer() {
  "use cache";
  cacheTag(SANITY_TAG);
  cacheLife("hours");
  const s = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark text-mist">
      <div className="container-site pt-[72px] pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex self-start rounded-[14px] bg-white px-3.5 py-2.5">
              <Image src={logo} alt="StuduRoj, Studenten van Roj" className="h-11 w-auto" />
            </div>
            <p className="text-sm leading-relaxed">{s.tagline}</p>
          </div>
          <nav aria-label="Vereniging" className="flex flex-col gap-3 text-sm">
            <p className="font-semibold text-white">Vereniging</p>
            <Link href="/over-ons" className={linkClass}>Over ons</Link>
            <Link href="/activiteiten" className={linkClass}>Activiteiten</Link>
            <Link href="/nieuws" className={linkClass}>Nieuws</Link>
          </nav>
          <nav aria-label="Leden" className="flex flex-col gap-3 text-sm">
            <p className="font-semibold text-white">Leden</p>
            <Link href="/lid-worden" className={linkClass}>Lid worden</Link>
            <Link href="/contact" className={linkClass}>Contact</Link>
            <Link href="/over-ons#documenten" className={linkClass}>Documenten</Link>
          </nav>
          <address className="flex flex-col gap-3 text-sm not-italic">
            <p className="font-semibold text-white">Contact</p>
            <span>{s.street}</span>
            <span>
              {s.postcode} {s.city}
            </span>
            {s.email ? (
              <a href={`mailto:${s.email}`} className={linkClass}>{s.email}</a>
            ) : (
              <span>{EMAIL_PLACEHOLDER}</span>
            )}
            <span>KvK {s.kvk}</span>
          </address>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-footer-line pt-6 text-[13px]">
          <span>
            © {year} {s.name}
          </span>
          <div className="flex gap-6">
            <Link href="/privacy" className={linkClass}>Privacy</Link>
            <Link href="/over-ons#documenten" className={linkClass}>Statuten</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
