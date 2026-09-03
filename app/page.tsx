import { redirect } from "next/navigation";

import { PageShell } from "@/components/PageShell";
import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import type {
  Homepage,
  SiteSettings,
  SiteSettingsData,
} from "@/sanity/lib/types";

// Temporarily dynamic: every request re-reads Sanity, so Studio edits show up
// immediately instead of within the next window. This gives up the buffer the
// 60s window bought us — there is no last-good page to keep serving, so a
// Sanity blip now goes straight to /503. Restore a positive value once the
// content settles, or when the Live Content API lands with the Presentation
// tool and makes the trade-off unnecessary.
export const revalidate = 0;

/**
 * There are no content fallbacks: Sanity is the only source. Anything that
 * stops us from rendering a real page — a failed request, a missing document,
 * a page with no sections — resolves to `null` and becomes a 503.
 */
async function loadHomepage(): Promise<{
  homepage: Homepage;
  settings: SiteSettings;
} | null> {
  try {
    const [homepage, settings] = await Promise.all([
      client.fetch<Homepage | null>(HOMEPAGE_QUERY),
      client.fetch<SiteSettingsData>(SITE_SETTINGS_QUERY),
    ]);

    if (!homepage?.sections?.length || !settings) return null;
    return { homepage, settings };
  } catch {
    return null;
  }
}

export default async function Home() {
  const content = await loadHomepage();

  // redirect() signals by throwing. Calling it inside loadHomepage's `try`
  // would let that catch swallow the signal and return null instead.
  if (!content) redirect("/503");

  const { homepage, settings } = content;

  return (
    <PageShell sections={homepage.sections ?? []} settings={settings} />
  );
}
