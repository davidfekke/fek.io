import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';

import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog');
  return rss({
    // `<title>` field in output xml
    title: 'FEK.IO',
    // `<description>` field in output xml
    description: 'FEK.IO The website for David Fekke L.L.C.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site ?? 'https://fek.io',
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `https://fek.io/blog/${post.slug.split('/').pop()}/`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}