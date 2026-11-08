const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Prefix an internal, root-absolute path with the site's base path.
 * Leaves external URLs, data URIs and hashes untouched.
 *
 * With no base configured this is a no-op (`/about` -> `/about`).
 * On a GitHub Pages project site it becomes `/about` -> `/fek.io/about`.
 */
export function url(path: string): string {
  if (
    !path ||
    path.startsWith('#') ||
    path.startsWith('data:') ||
    /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(path)
  ) {
    return path;
  }

  return `${base}/${path.replace(/^\//, '')}`;
}
