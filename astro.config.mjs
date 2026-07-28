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
          label: '🚀 Featured Articles',
          collapsed: false,
          items: [
            { slug: 'articles/repomix-ai-case-study' },
            { slug: 'articles/obsidian-pkm-setup' },
          ],
        },
        {
          label: '📦 3D Space Portfolio',
          badge: { text: 'Live', variant: 'success' },
          autogenerate: { directory: '3d-space-portfolio', collapsed: false },
          collapsed: true,
        },
        {
          label: '⛪ Raised Church Website',
          badge: { text: 'Live', variant: 'success' },
          collapsed: true,
          items: [
            { slug: 'raised-church-website/overview' },
            {
              label: 'Tutorials',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/tutorials/getting-started' },
                { slug: 'raised-church-website/tutorials/first-feature' },
              ],
            },
            {
              label: 'How-to Guides',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/how-to/custom-pages' },
                { slug: 'raised-church-website/how-to/deploy-to-vercel' },
                { slug: 'raised-church-website/how-to/add-a-church' },
                { slug: 'raised-church-website/how-to/contributing' },
              ],
            },
            {
              label: 'Reference',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/reference/environment-variables' },
                { slug: 'raised-church-website/reference/components' },
                { slug: 'raised-church-website/reference/content-types' },
                { slug: 'raised-church-website/reference/i18n-api' },
              ],
            },
            {
              label: 'Explanation',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/architecture' },
                { slug: 'raised-church-website/content-editor-guide' },
              ],
            },
            { slug: 'raised-church-website/changelog' },
          ],
        },
        {
          label: '🔧 TeamAssign Platform',
          badge: { text: 'Legacy', variant: 'note' },
          collapsed: true,
          items: [
            {
              label: 'TeamAssign Core',
              collapsed: false,
              items: [
                { slug: 'teamassign/overview' },
                { slug: 'teamassign/getting-started' },
                { slug: 'teamassign/architecture' },
                { slug: 'teamassign/developer-tips' },
                { slug: 'teamassign/troubleshooting' },
              ],
            },
            {
              label: 'Developer Docs & API',
              collapsed: true,
              items: [
                { slug: 'developer-docs/overview' },
                { slug: 'developer-docs/authentication-flow' },
                { slug: 'developer-docs/api-reference' },
                { slug: 'developer-docs/getting-started' },
              ],
            },
            {
              label: 'Troubleshooting & Runbooks',
              collapsed: true,
              items: [
                { slug: 'troubleshooting/overview' },
                { slug: 'troubleshooting/canvas-lms-errors' },
                { slug: 'troubleshooting/database-and-memory-runbooks' },
                { slug: 'troubleshooting/debugging-playbook' },
              ],
            },
            {
              label: 'Architecture & Logic',
              collapsed: true,
              items: [
                { slug: 'architecture/overview' },
                { slug: 'architecture/canvas-aws-system-architecture' },
                { slug: 'architecture/project-system-designs' },
                { slug: 'architecture/complex-logic-breakdown' },
              ],
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
