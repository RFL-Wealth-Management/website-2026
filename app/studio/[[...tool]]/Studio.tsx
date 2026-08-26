"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/sanity.config";

/**
 * The client boundary for the Studio.
 *
 * sanity.config.ts must be imported from a Client Component, never from the
 * Server Component page. Under the `react-server` export condition Turbopack
 * resolves Sanity's transitive deps (notably `swr`) to RSC builds that omit
 * the default exports Studio expects, and the build fails.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
