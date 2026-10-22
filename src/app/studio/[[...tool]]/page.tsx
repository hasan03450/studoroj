import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export { metadata, viewport } from "next-sanity/studio";

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main style={{ fontFamily: "system-ui", maxWidth: 560, margin: "15vh auto", padding: 24, lineHeight: 1.6 }}>
        <h1>Sanity is nog niet gekoppeld</h1>
        <p>
          Zet <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> in <code>.env.local</code> (lokaal) of in Vercel (online). Zie de README voor de
          stappen.
        </p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
