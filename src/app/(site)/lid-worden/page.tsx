import type { Metadata } from "next";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { CheckIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { PageIntro, buttonClasses } from "@/components/ui";
import { getMembershipPage } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getMembershipPage();
  return pageMetadata({ title: "Lid worden", description: page.intro, path: "/lid-worden" });
}

const STEPS = ["Vul je gegevens in", "Bevestig via de link in je e-mail", "Welkom bij StuduRoj"];

export default async function MembershipPage() {
  const page = await getMembershipPage();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs
      .filter((f) => !f.answer.startsWith("["))
      .map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className="container-site pt-12 pb-10 sm:pt-[88px] sm:pb-16">
        <PageIntro eyebrow="Lidmaatschap" title="Word lid van de vereniging." text={page.intro} center />
      </section>

      <section className="container-site pb-12 sm:pb-24">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-center gap-10 rounded-[24px] border border-line p-6 sm:gap-12 sm:rounded-[28px] sm:p-12">
          <div className="flex flex-col gap-5">
            <span className="self-start rounded-full bg-mint px-3.5 py-1.5 text-[13px] font-medium text-brand">Gratis lidmaatschap</span>
            <p className="flex flex-wrap items-baseline gap-3">
              <span className="text-[56px] leading-none font-semibold tracking-[-0.04em] text-brand sm:text-[64px]">€ 0</span>
              <span className="text-base text-muted">geen contributie</span>
            </p>
            <p className="max-w-[440px] text-base leading-relaxed text-muted sm:text-[17px]">
              Lidmaatschap kost niets. We vragen alleen dat je meedoet en helpt de vereniging levendig te houden.
            </p>
            <a href="#aanmelden" className={buttonClasses("primary", "lg", "self-start px-7")}>
              Gratis aanmelden
            </a>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-6 gap-y-4 text-base text-ink-soft">
            {page.benefits.map((b) => (
              <li key={b} className="flex gap-2.5">
                <CheckIcon />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="aanmelden" className="scroll-mt-20 bg-surface">
        <div className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-10 py-12 sm:gap-16 sm:py-24">
          <div className="flex flex-col gap-[18px]">
            <p className="eyebrow">Aanmelden</p>
            <h2 className="text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">In twee minuten lid.</h2>
            <p className="text-base leading-relaxed text-muted sm:text-[17px]">
              Vul het formulier in en je ontvangt een bevestiging per e-mail. Betalen is niet nodig: je lidmaatschap gaat in zodra je
              bevestigt.
            </p>
            <ol className="mt-2 flex flex-col gap-3.5 text-[15px] text-ink-soft">
              {STEPS.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
          <MembershipForm />
        </div>
      </section>

      <section className="container-site max-w-[820px]! py-12 sm:py-24">
        <h2 className="mb-8 text-[32px] leading-[1.1] font-semibold tracking-[-0.03em] sm:text-[40px]">Veelgestelde vragen</h2>
        {page.faqs.map((f) => (
          <details key={f.question} className="group border-b border-line py-[22px]">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-medium">
              {f.question}
              <span aria-hidden="true" className="text-2xl leading-none font-normal text-brand transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3.5 text-base leading-relaxed text-muted">{f.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
