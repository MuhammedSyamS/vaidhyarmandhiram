// Ensure Vercel Serverless Functions target nodejs20.x/22.x on newer Node build environments
try {
  Object.defineProperty(process, 'version', { value: 'v20.18.0', configurable: true, writable: true });
} catch (e) {}

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vaidhyarmandhiram.com/',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    mdx(),
    sitemap(),
  ],
  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});
