import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import astroMermaid from 'astro-mermaid';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightBiel from 'starlight-biel';

export default defineConfig({
  site: 'https://docs.sharonwang.me',
  adapter: vercel({ imageService: true, webAnalytics: { enabled: true } }),
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Sharon Wang — Docs',
      tagline: 'Technical Documentation Portfolio',
      lastUpdated: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sharonwang554' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/shihyin-sharon-wang/' },
        { icon: 'rocket', label: 'Visit sharonwang.me', href: 'https://sharonwang.me' },
      ],
      customCss: [
        './src/styles/custom.css',
        './src/styles/api-components.css',
        'katex/dist/katex.min.css',
      ],

      // Starlight plugins
      plugins: [
        starlightBiel({
          project: process.env.BIEL_PROJECT_ID || 'PENDING_SETUP',
          headerTitle: 'Docs AI Search',
        }),
        starlightLlmsTxt({
          projectName: 'Sharon Wang — Technical Documentation Portfolio',
          description: 'Documentation engineering portfolio showcasing docs-as-code workflows, API integration guides, system architecture, and developer portals.',
        }),
      ],

      // Logo configuration
      logo: {
        src: './public/logo.svg',
        alt: 'Sharon Wang Docs',
      },

      // English only for now; structured for future i18n
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
        // Future: zh: { label: '繁體中文', lang: 'zh-TW' },
      },

      sidebar: [
        {
          label: 'About This Knowledge Base',
          slug: 'about',
        },
        {
          label: 'Featured Articles',
          collapsed: false,
          items: [{ autogenerate: { directory: 'articles' } }],
        },
        {
          label: 'TMS',
          collapsed: true,
          items: [
            { slug: 'tms/explanation/overview' },
            {
              label: 'Tutorials',
              collapsed: true,
              items: [
                { slug: 'tms/tutorials/getting-started' },
              ],
            },
            {
              label: 'How-to Guides',
              collapsed: true,
              items: [
                { slug: 'tms/how-to/overview' },
                { slug: 'tms/how-to/authentication-flow' },
                { slug: 'tms/how-to/api-reference' },
              ],
            },
            {
              label: 'Reference',
              collapsed: true,
              items: [
                { slug: 'tms/reference/overview' },
                { slug: 'tms/reference/canvas-lms-errors' },
                { slug: 'tms/reference/database-and-memory-runbooks' },
                { slug: 'tms/reference/debugging-playbook' },
              ],
            },
            {
              label: 'Explanation',
              collapsed: true,
              items: [
                { slug: 'tms/explanation/project-system-designs' },
                { slug: 'tms/explanation/canvas-aws-system-architecture' },
                { slug: 'tms/explanation/complex-logic-breakdown' },
              ],
            },
          ],
        },
        {
          label: '3D Space Portfolio',
          collapsed: true,
          items: [
            {
              label: 'Tutorials',
              collapsed: true,
              items: [
                { slug: '3d-space-portfolio/tutorials/getting-started' },
              ],
            },
            {
              label: 'How-to Guides',
              collapsed: true,
              items: [
                { slug: '3d-space-portfolio/how-to/testing' },
              ],
            },
            {
              label: 'Reference',
              collapsed: true,
              items: [
                { slug: '3d-space-portfolio/reference/api-reference' },
                { slug: '3d-space-portfolio/reference/scss-module-standards' },
              ],
            },
            {
              label: 'Explanation',
              collapsed: true,
              items: [
                { slug: '3d-space-portfolio/explanation/project-structure' },
              ],
            },
          ],
        },
        {
          label: 'Raised Church Website',
          collapsed: true,
          items: [
            {
              label: 'Tutorials',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/tutorials/contentful-quick-start' },
                { slug: 'raised-church-website/tutorials/multi-church-template-guide' },
              ],
            },
            {
              label: 'How-to Guides',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/how-to/adding-features' },
                { slug: 'raised-church-website/how-to/contentful-setup' },
                { slug: 'raised-church-website/how-to/internationalization' },
                { slug: 'raised-church-website/how-to/deployment-troubleshooting' },
                { slug: 'raised-church-website/how-to/testing' },
              ],
            },
            {
              label: 'Reference',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/reference/components' },
                { slug: 'raised-church-website/reference/contentful-queries' },
                { slug: 'raised-church-website/reference/styling' },
                { slug: 'raised-church-website/reference/types' },
              ],
            },
            {
              label: 'Explanation',
              collapsed: true,
              items: [
                { slug: 'raised-church-website/explanation/architecture' },
                { slug: 'raised-church-website/explanation/content-structure' },
              ],
            },
          ],
        },
      ],

      head: [
        // Open Graph social meta
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://docs.sharonwang.me/og-image.jpg' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { property: 'og:site_name', content: 'Sharon Wang — Technical Documentation Portfolio' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://docs.sharonwang.me/og-image.jpg' } },
        // RSS autodiscovery
        { tag: 'link', attrs: { rel: 'alternate', type: 'application/rss+xml', title: 'Sharon Wang Docs RSS', href: '/rss.xml' } },
        // Mermaid diagram rendering
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
        // Social icon tooltips (CSS-driven via data-tooltip)
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            document.querySelectorAll('starlight-social-icons a, .social-icons a').forEach(a => {
              const sr = a.querySelector('.sr-only');
              if (sr) a.dataset.tooltip = sr.textContent;
            });
          `,
        },
        // Back-to-top button
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: `
            const btn = document.createElement('button');
            btn.id = 'back-to-top';
            btn.setAttribute('aria-label', 'Back to top');
            btn.innerHTML = '↑';
            document.body.appendChild(btn);

            const toggle = () => {
              btn.classList.toggle('visible', window.scrollY > 400);
            };
            window.addEventListener('scroll', toggle, { passive: true });
            btn.addEventListener('click', () => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            toggle();
          `,
        },
      ],

      editLink: {
        baseUrl: 'https://github.com/sharonwang554/docs/edit/main/',
      },
    }),
    astroMermaid(),
  ],
  vite: {
    build: {
      chunkSizeWarningLimit: 1500,
    },
  },
});
