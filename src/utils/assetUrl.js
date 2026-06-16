const BASE = import.meta.env.BASE_URL;

/**
 * Resolves a public-folder asset path against Vite's configured base URL.
 * Use this instead of bare string literals so paths work on GitHub Pages sub-paths.
 *
 * @param {string} path - Path relative to /public, starting with "/"
 * @returns {string}
 */
export const assetUrl = (path) => `${BASE}${path.replace(/^\//, '')}`;
