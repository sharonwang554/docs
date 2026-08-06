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
      title: 'Sharon Wang — Docs',
      tagline: 'Technical Documentation Portfolio',
      lastUpdated: true,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sharonwang554' },
        { icon: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/shihyin-sharon-wang/' },
        { icon: 'rocket', label: 'Visit sharonwang.me', href: 'https://sharonwang.me' },
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
          label: 'System Architecture',
          collapsed: false,
          items: [{ autogenerate: { directory: 'architecture' } }],
        },
        {
          label: 'Developer Docs & API',
          collapsed: false,
          items: [{ autogenerate: { directory: 'developer-docs' } }],
        },
        {
          label: 'Site Reliability / SRE',
          collapsed: false,
          items: [{ autogenerate: { directory: 'troubleshooting' } }],
        },
        {
          label: '3D Space Portfolio',
          collapsed: true,
          items: [{ autogenerate: { directory: '3d-space-portfolio' } }],
        },
        {
          label: 'Raised Church Website',
          collapsed: true,
          items: [{ autogenerate: { directory: 'raised-church-website' } }],
        },
        {
          label: 'TMS (Team Management)',
          collapsed: true,
          items: [{ autogenerate: { directory: 'tms' } }],
        },
        {
          label: 'Featured Articles',
          collapsed: false,
          items: [{ autogenerate: { directory: 'articles' } }],
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
});
