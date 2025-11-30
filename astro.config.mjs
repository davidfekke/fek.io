// @ts-check
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(), 
    icon(),
    image({
        serviceEntryPoint: '@astrojs/image/sharp', // REMOVE this if you have it
    })]
});