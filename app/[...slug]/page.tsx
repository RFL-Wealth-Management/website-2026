import type { Metadata } from "next";
import type { Image } from "sanity";
import { notFound, redirect } from "next/navigation";
import { buildSeoMeta } from "sanity-plugin-seofields/next";

import { PageShell } from "@/components/PageShell";
import { pagePath, pathSegments, segmentsToQuery } from "@/lib/paths";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  PAGE_BY_PATH_QUERY,
  PAGE_PATHS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";
import type {
  Page,
  PageData,
  PagePathRow,
  SiteSettings,
  SiteSettingsData,
} from "@/sanity/lib/types";

// Matches the homepage — see the note there on what dynamic rendering costs.
// `dynamicParams` stays at its default of true so a page published in the
// Studio after a deploy renders on first request instead of 404ing until the
// next build. generateStaticParams still runs at build time, but at revalidate
// 0 its output is no longer what gets served.
export const revalidate = 0;

export async function generateStaticParams() {
  const rows = await client.fetch<PagePathRow[]>(PAGE_PATHS_QUERY);

  return rows
    .map((row) => pathSegments(row))
    .filter((segments) => segments.length > 0)
    .map((slug) => ({ slug }));
}

/**
 * Three distinct outcomes, kept apart on purpose.
 *
 * "missing" is a 404 — an unknown URL is the visitor's problem, not an outage,
 * and serving it as a 503 would tell search engines the whole site is down.
 * "error" is a 503, matching the homepage: Sanity is the only content source,
 * so an unreachable Sanity means we genuinely cannot render.
 */
type Result =
  | { status: "ok"; page: Page; settings: SiteSettings }
  | { status: "missing" }
  | { status: "error" };

async function loadPage(segments: readonly string[]): Promise<Result> {
  const params = segmentsToQuery(segments);
  if (!params) return { status: "missing" };

  try {
    const [page, settings] = await Promise.all([
      client.fetch<PageData>(PAGE_BY_PATH_QUERY, params),
      client.fetch<SiteSettingsData>(SITE_SETTINGS_QUERY),
    ]);

    if (!settings) return { status: "error" };
    if (!page?.sections?.length) return { status: "missing" };

    return { status: "ok", page, settings };
  } catch {
    return { status: "error" };
  }
}

export async function generateMetadata({
  params,
}: PageProps<"/[...slug]">): Promise<Metadata> {
  const { slug } = await params;
  const query = segmentsToQuery(slug);
  if (!query) return {};

  const page = await client
    .fetch<PageData>(PAGE_BY_PATH_QUERY, query)
    .catch(() => null);
  if (!page) return {};

  // The plugin owns the seoFields → meta mapping (see AGENTS.md); hand-rolling
  // it here would drift from what the Studio's SERP preview shows an editor.
  return buildSeoMeta({
    seo: page.seo as Parameters<typeof buildSeoMeta>[0]["seo"],
    baseUrl: SITE_URL,
    path: pagePath({
      slug: query.slug,
      isGroupIndex: page.isGroupIndex,
      groupSlug: page.groupSlug,
    }),
    defaults: {
      title: page.title,
      description: SITE_DESCRIPTION,
      siteName: SITE_NAME,
    },
    // The plugin's image type is structurally the same asset reference but is
    // declared without Sanity's index signature, so it needs the cast.
    imageUrlResolver: (image) =>
      urlForImage(image as unknown as Image).width(1200).height(630).url(),
  }) as Metadata;
}

export default async function DynamicPage({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const result = await loadPage(slug);

  // Both signal by throwing, so they sit outside loadPage's try/catch — a
  // catch there would swallow the signal and fall through to "error".
  if (result.status === "missing") notFound();
  if (result.status === "error") redirect("/503");

  return (
    <PageShell sections={result.page.sections ?? []} settings={result.settings} />
  );
}
