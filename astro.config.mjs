import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import keystatic from '@keystatic/astro';
import clerk from '@clerk/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://vaidyarmandhiram.vercel.app',
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    sitemap({
      customPages: ['https://vaidyarmandhiram.vercel.app/'],
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    clerk(),
    mdx(),
    keystatic(),
  ],
  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
});
