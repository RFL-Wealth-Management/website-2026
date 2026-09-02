import { Button } from "@/components/primitives/Button";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type { SiteSettingsData } from "@/sanity/lib/types";

export const metadata = {
  title: "Page not found",
};

/**
 * 404 with the site's own chrome.
 *
 * The header and footer need siteSettings, and this is an error path: if that
 * fetch fails we render the message alone rather than throwing, because
 * throwing here would escalate a missing page into a broken one.
 */
export default async function NotFound() {
  const settings = await client
    .fetch<SiteSettingsData>(SITE_SETTINGS_QUERY)
    .catch(() => null);

  const body = (
    <main className="flex flex-1 items-center bg-cream py-20 md:py-28">
      <Container>
        <div className="max-w-[30em]">
          <Eyebrow className="text-teal">Error 404</Eyebrow>
          <h1 className="mt-4 text-section">
            That page isn&rsquo;t here anymore.
          </h1>
          <p className="mt-5 text-lede text-ink-soft">
            The link may be out of date, or the page may have moved. Start from
            the homepage, or tell us what you were looking for.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/">Back to the homepage</Button>
            <Button href="/financial-questions" variant="navy">
              Browse financial questions
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );

  if (!settings) return body;

  return (
    <>
      <div data-theme="dark" className="relative bg-navy">
        <SiteHeader settings={settings} />
      </div>
      {body}
      <SiteFooter settings={settings} />
    </>
  );
}
