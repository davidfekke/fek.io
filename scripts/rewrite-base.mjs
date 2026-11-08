/**
 * Post-build step for GitHub Pages project-site previews.
 *
 * Astro prefixes bundled assets (/_astro/...) and anything rendered through
 * src/utils/url.ts with the configured base. Markdown content contains plain
 * root-absolute links (`[resume](/resume.pdf)`), which Astro leaves untouched,
 * so under `/fek.io/` they would point at the domain root.
 *
 * This rewrites only unprefixed root-absolute href/src values in built HTML.
 * When BASE_PATH is unset or `/` it is a no-op.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const base = (process.env.BASE_PATH || '').replace(/\/+$/, '');

if (!base) {
	process.exit(0);
}

const root = 'dist';
const escape = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const baseNoSlash = escape(base.replace(/^\/+/, ''));
const pattern = new RegExp(`(href|src)="/(?!/|${baseNoSlash}/)`, 'g');

async function walk(dir) {
	const entries = await readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const full = join(dir, entry.name);

		if (entry.isDirectory()) {
			await walk(full);
		} else if (extname(entry.name) === '.html') {
			const html = await readFile(full, 'utf8');
			const rewritten = html.replace(pattern, `$1="${base}/`);

			if (rewritten !== html) {
				await writeFile(full, rewritten);
			}
		}
	}
}

await walk(root);
console.log(`Rewrote root-absolute HTML links with base path ${base}/`);
