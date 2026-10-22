import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <JsonLd data={await organizationJsonLd()} />
      <Header />
      <main id="inhoud">{children}</main>
      <Footer />
    </>
  );
}
