import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfirmMembership } from "@/components/forms/ConfirmMembership";
import { ButtonLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Aanmelding bevestigen",
  robots: { index: false, follow: false },
};

async function Confirm({ searchParams }: { searchParams: PageProps<"/lid-worden/bevestigen">["searchParams"] }) {
  const { token } = await searchParams;
  if (typeof token !== "string" || !token) {
    return (
      <div className="flex flex-col items-center gap-6">
        <p className="text-muted">Deze link is niet compleet. Gebruik de link uit je e-mail, of meld je opnieuw aan.</p>
        <ButtonLink href="/lid-worden">Opnieuw aanmelden</ButtonLink>
      </div>
    );
  }
  return <ConfirmMembership token={token} />;
}

export default function ConfirmPage(props: PageProps<"/lid-worden/bevestigen">) {
  return (
    <section className="container-site flex max-w-[640px]! flex-col items-center gap-8 py-16 text-center sm:py-28">
      <p className="eyebrow">Lidmaatschap</p>
      <h1 className="text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.035em]">Bevestig je aanmelding</h1>
      <p className="text-[17px] leading-relaxed text-muted">Nog één klik en je bent lid van StuduRoj.</p>
      <Suspense fallback={<div className="h-[52px]" />}>
        <Confirm searchParams={props.searchParams} />
      </Suspense>
    </section>
  );
}
