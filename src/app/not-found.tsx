import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = { title: "Pagina niet gevonden" };

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="inhoud" className="container-site flex max-w-[640px]! flex-col items-center gap-6 py-24 text-center sm:py-32">
        <p className="eyebrow">404</p>
        <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Deze pagina bestaat niet.</h1>
        <p className="text-[17px] leading-relaxed text-muted">De pagina is verplaatst of verwijderd. Ga terug naar de homepage.</p>
        <ButtonLink href="/">Naar de homepage</ButtonLink>
      </main>
      <Footer />
    </>
  );
}
