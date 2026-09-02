/**
 * The one place that decides what a page's URL is.
 *
 * The route, generateStaticParams, the nav content and scripts/seed.ts all
 * answer the same question, and they must never disagree — a page that renders
 * at one path while the menu links to another is invisible without being
 * broken. Keep this free of React and of `sanity` imports so both the app and
 * the seed script (plain Node type-stripping) can load it.
 */

export type PageRef = {
  slug?: string | null;
  isHomepage?: boolean | null;
  isGroupIndex?: boolean | null;
  groupSlug?: string | null;
};

export function pagePath({
  slug,
  isHomepage,
  isGroupIndex,
  groupSlug,
}: PageRef): string {
  if (isHomepage) return "/";
  if (groupSlug) {
    return isGroupIndex ? `/${groupSlug}` : `/${groupSlug}/${slug ?? ""}`;
  }
  return `/${slug ?? ""}`;
}

/** The URL split into route segments, for generateStaticParams. */
export const pathSegments = (page: PageRef): string[] =>
  pagePath(page).split("/").filter(Boolean);

/**
 * The inverse: turn the segments a request arrived with back into the two
 * values PAGE_BY_PATH_QUERY filters on.
 *
 * One segment is ambiguous by design — `/financial-questions` could be a group
 * landing page or an ungrouped top-level page — so it fills both slots and the
 * query decides. Anything longer than two segments cannot match a page.
 */
export function segmentsToQuery(
  segments: readonly string[],
): { group: string | null; slug: string | null } | null {
  if (segments.length === 1) return { group: segments[0], slug: null };
  if (segments.length === 2) return { group: segments[0], slug: segments[1] };
  return null;
}
