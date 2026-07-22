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
          autogenerate: { directory: 'developer-docs', collapsed: false },
          collapsed: false,
        },
        {
          label: '🎯 Troubleshooting & Runbooks',
          autogenerate: { directory: 'troubleshooting', collapsed: false },
          collapsed: false,
        },
        {
          label: '🎯 Architecture & Project Logic',
          autogenerate: { directory: 'architecture', collapsed: false },
          collapsed: false,
        },
        {
          label: '📁 Complete System Repositories',
          collapsed: false,
          items: [
            {
              label: '3D Space Portfolio',
              badge: { text: 'Live', variant: 'success' },
              autogenerate: { directory: '3d-space-portfolio', collapsed: false },
              collapsed: true,
            },
            {
              label: 'Raised Church Website',
              badge: { text: 'Live', variant: 'success' },
              autogenerate: { directory: 'raised-church-website', collapsed: false },
              collapsed: true,
            },
            {
              label: 'TeamAssign',
              badge: { text: 'Legacy', variant: 'note' },
              autogenerate: { directory: 'teamassign', collapsed: false },
              collapsed: true,
            },
          ],
        },
        {
          label: '📚 Articles & Research',
          autogenerate: { directory: 'articles', collapsed: false },
          collapsed: false,
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
