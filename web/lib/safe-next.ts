/**
 * Constrain a `?next=` redirect target to a same-origin path.
 *
 * `new URL(next, origin)` happily resolves protocol-relative and absolute
 * inputs off-origin — `//evil.com` and `https://evil.com` both escape — which
 * turns the auth callback into an open redirect an attacker can use to make a
 * phishing link look like it starts at our own sign-in page. Only a path
 * beginning with a single `/` is accepted; everything else falls back to "/".
 */
export function safeNext(next: string | null | undefined): string {
  if (!next) return "/";
  // Reject protocol-relative ("//host", "/\host"), absolute URLs, and anything
  // that is not rooted at a single slash.
  if (!next.startsWith("/")) return "/";
  if (next.startsWith("//") || next.startsWith("/\\")) return "/";
  // Belt and braces: resolve it and confirm the origin did not change.
  try {
    const base = "https://kapp.invalid";
    if (new URL(next, base).origin !== base) return "/";
  } catch {
    return "/";
  }
  return next;
}
