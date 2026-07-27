import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroMermaid from 'astro-mermaid';

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
        { icon: 'laptop', label: 'Main Portfolio (sharonwang.me)', href: 'https://sharonwang.me' },
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

      head: [
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
            mermaid.initialize({ startOnLoad: false, theme: 'dark' });

            async function renderMermaidDiagrams() {
              const codeBlocks = document.querySelectorAll('code.language-mermaid, pre.language-mermaid');
              for (let i = 0; i < codeBlocks.length; i++) {
                const codeBlock = codeBlocks[i];
                const preOrFigure = codeBlock.closest('.expressive-code') || codeBlock.closest('pre') || codeBlock;
                const textContent = codeBlock.textContent || '';
                if (!textContent.trim()) continue;

                const container = document.createElement('div');
                container.className = 'mermaid-diagram-container';
                container.style.margin = '1.5rem 0';
                container.style.display = 'flex';
                container.style.justifyContent = 'center';
                container.style.overflowX = 'auto';

                const id = 'mermaid-svg-' + i + '-' + Math.random().toString(36).substring(2, 7);
                try {
                  const { svg } = await mermaid.render(id, textContent.trim());
                  container.innerHTML = svg;
                  if (preOrFigure.parentNode) {
                    preOrFigure.parentNode.replaceChild(container, preOrFigure);
                  }
                } catch (err) {
                  console.error('Mermaid render error:', err);
                }
              }
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', renderMermaidDiagrams);
            } else {
              renderMermaidDiagrams();
            }
          `,
        },
      ],

      editLink: {
        baseUrl: 'https://github.com/sharonwang554/docs/edit/main/',
      },
    }),
    astroMermaid(),
  ],
});
