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
  output: 'hybrid',
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    clerk(),
    sitemap({
      filter: (page) => !page.includes('/dashboard') && !page.includes('/admin') && !page.includes('/api'),
    }),
    mdx(),
    keystatic(),
  ],
  vite: {
    ssr: {
      noExternal: ['lucide-react'],
    },
  },
  site: 'https://vaidyamandhiram.vercel.app', // Replace with actual domain later
});
