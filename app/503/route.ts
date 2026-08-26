/**
 * The maintenance page, served with a real 503.
 *
 * This is a Route Handler rather than a page because App Router pages cannot
 * set an arbitrary status: Next only exposes 404, 403 and 401 through the
 * access-fallback mechanism (see `HTTPAccessErrorStatus` in
 * next/dist/client/components/http-access-fallback), and once a response
 * starts streaming the status is fixed. A handler owns the whole response.
 *
 * The markup is deliberately self-contained — no Tailwind, no next/font, no
 * imports. This page exists for the moments when the rest of the stack is
 * unavailable, so it must not depend on any of it. Colours are the `@theme`
 * tokens from app/globals.css, copied by value for that reason.
 */

const RETRY_AFTER_SECONDS = 120;

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>We’re having problems — RFL Wealth Management</title>
<style>
  :root { color-scheme: dark }
  * { box-sizing: border-box }
  body {
    margin: 0; min-height: 100vh; display: grid; place-items: center;
    padding: 24px; background: #1e3256; color: #fff;
    font-family: -apple-system, "Segoe UI", Roboto, sans-serif;
    font-size: 16px; line-height: 1.6; -webkit-font-smoothing: antialiased;
  }
  main { max-width: 34em; text-align: center }
  .eyebrow {
    display: inline-block; margin-bottom: 20px; color: #7ccfb5;
    font-size: 12.5px; font-weight: 600; letter-spacing: .16em;
    text-transform: uppercase;
  }
  h1 {
    margin: 0 0 16px; font-family: Georgia, "Times New Roman", serif;
    font-weight: 500; line-height: 1.12; letter-spacing: -.01em;
    font-size: clamp(30px, 3.4vw, 44px);
  }
  p { margin: 0 auto; max-width: 30em; color: #c6d0e2 }
  .note { margin-top: 28px; font-size: 13px; color: #9fb0cb }
</style>
</head>
<body>
<main>
  <span class="eyebrow">Temporarily unavailable</span>
  <h1>We’re having problems loading the site.</h1>
  <p>This is on our end, not yours. The page should come back on its own in a
     minute or two — please try again shortly.</p>
  <p class="note">If you need to reach us in the meantime, email
     <a href="mailto:info@rflwealth.ca" style="color:#7ccfb5">info@rflwealth.ca</a>.</p>
</main>
</body>
</html>
`;

export function GET() {
  return new Response(HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      // Never let a CDN or browser hold on to an outage.
      "cache-control": "no-store, must-revalidate",
      "retry-after": String(RETRY_AFTER_SECONDS),
    },
  });
}
