// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import icon from 'astro-icon';

const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site: 'https://fek.io',
  base,
  integrations: [
    mdx(),
    icon()],
    vite: {
      ssr: {
        noExternal: ['neotraverse', 'astro-icon']
      }
    }
});