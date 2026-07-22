import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://docs.sharonwang.me',
  adapter: vercel({ imageService: true, webAnalytics: { enabled: true } }),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'System Documentation & Architecture Hub',
      tagline: 'Developer Knowledge Base & Technical Runbooks',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sharonwang554' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/YOUR_HANDLE' },
        { icon: 'external', label: 'Live Portfolio', href: 'https://sharonwang.me' },
      ],
      customCss: ['./src/styles/custom.css', 'katex/dist/katex.min.css'],

      // English only for now; structured for future i18n
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        // Future: zh: { label: '繁體中文', lang: 'zh-TW' },
      },

      sidebar: [
        {
          label: '🎯 Developer Docs & API',
          autogenerate: { directory: 'developer-docs' },
        },
        {
          label: '🎯 Troubleshooting & Runbooks',
          autogenerate: { directory: 'troubleshooting' },
        },
        {
          label: '🎯 Architecture & Project Logic',
          autogenerate: { directory: 'architecture' },
        },
        {
          label: '📁 Complete System Repositories',
          items: [
            {
              label: '3D Space Portfolio',
              badge: { text: 'Live', variant: 'success' },
              autogenerate: { directory: '3d-space-portfolio' },
            },
            {
              label: 'Raised Church Website',
              badge: { text: 'Live', variant: 'success' },
              autogenerate: { directory: 'raised-church-website' },
            },
            {
              label: 'TeamAssign',
              badge: { text: 'Legacy', variant: 'note' },
              autogenerate: { directory: 'teamassign' },
            },
          ],
        },
        {
          label: '📚 Articles & Research',
          autogenerate: { directory: 'articles' },
        },
        {
          label: 'About This Knowledge Base',
          slug: 'about',
        },
      ],

      editLink: {
        baseUrl: 'https://github.com/sharonwang554/docs/edit/main/',
      },
    }),
  ],
});
