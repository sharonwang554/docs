import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import vercel from '@astrojs/vercel';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkMermaidToDiv } from './astro-mermaid-remark.mjs';

export default defineConfig({
  site: 'https://docs.sharonwang.me',
  adapter: vercel({ imageService: true, webAnalytics: { enabled: true } }),
  markdown: {
    remarkPlugins: [remarkMath, remarkMermaidToDiv],
    rehypePlugins: [rehypeKatex],
  },
  integrations: [
    starlight({
      title: 'Sharon Wang — Docs',
      components: {
        Head: './src/components/Head.astro',
      },
      logo: {
        src: './public/favicon.svg',
        alt: 'Sharon Wang Docs Logo',
        replacesTitle: false,
      },
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
          label: 'Featured Articles',
          collapsed: false,
          items: [
            { slug: 'articles/tms-canvas-oauth2' },
            { slug: 'articles/canvas-lms-setup' },
          ],
        },
        {
          label: 'Open Source Contributions',
          collapsed: false,
          items: [
            {
              label: 'Graft Docs',
              link: 'https://graft.sharonwang.me',
              attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-sidebar-link' },
            },
            {
              label: 'Caveman Docs',
              link: 'https://caveman.sharonwang.me',
              attrs: { target: '_blank', rel: 'noopener noreferrer', class: 'external-sidebar-link' },
            },
          ],
        },
      ],

      head: [
        /* 
        // Biel AI chat widget (temporarily disabled — free trial expired)
        { tag: 'link', attrs: { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/biel-search/dist/biel-search/biel-search.css' } },
        { tag: 'script', attrs: { type: 'module', src: 'https://cdn.jsdelivr.net/npm/biel-search/dist/biel-search/biel-search.esm.js' } },
        {
          tag: 'script',
          attrs: { type: 'module' },
          content: \`
            const biel = document.createElement('biel-button');
            biel.setAttribute('project', '\${process.env.BIEL_PROJECT_ID || 'PENDING_SETUP'}');
            biel.setAttribute('header-title', 'Docs AI Search');
            biel.setAttribute('button-position', 'bottom-right');
            biel.setAttribute('modal-position', 'bottom-right');
            biel.setAttribute('button-style', 'dark');
            biel.textContent = 'Ask AI';
            document.body.appendChild(biel);
          \`,
        },
        */
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
            import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
            mermaid.initialize({ startOnLoad: false, theme: 'dark' });

            // Set up the native modal with manual zoom controls
            function setupMermaidModal() {
              if (document.getElementById('mermaid-modal')) return;
              const dialog = document.createElement('dialog');
              dialog.id = 'mermaid-modal';
              dialog.innerHTML = \`
                <div id="mermaid-modal-toolbar">
                  <div class="zoom-controls">
                    <button id="mermaid-zoom-out" title="Zoom Out">−</button>
                    <span id="mermaid-zoom-level">100%</span>
                    <button id="mermaid-zoom-in" title="Zoom In">+</button>
                  </div>
                  <button id="mermaid-modal-close" title="Close diagram">✕</button>
                </div>
                <div id="mermaid-modal-scroll-container">
                  <div id="mermaid-modal-content"></div>
                </div>
              \`;
              document.body.appendChild(dialog);

              let currentScale = 1;
              const content = document.getElementById('mermaid-modal-content');
              const zoomLevelLabel = document.getElementById('mermaid-zoom-level');

              const applyScale = () => {
                content.style.transform = 'scale(' + currentScale + ')';
                zoomLevelLabel.innerText = Math.round(currentScale * 100) + '%';
              };

              document.getElementById('mermaid-zoom-in').addEventListener('click', (e) => {
                e.stopPropagation();
                currentScale += 0.25;
                applyScale();
              });

              document.getElementById('mermaid-zoom-out').addEventListener('click', (e) => {
                e.stopPropagation();
                currentScale = Math.max(0.25, currentScale - 0.25);
                applyScale();
              });

              const closeModal = () => {
                dialog.close();
                currentScale = 1;
                applyScale();
              };

              dialog.addEventListener('click', (e) => {
                if (e.target === dialog || e.target.id === 'mermaid-modal-close') {
                  closeModal();
                }
              });
            }

            async function renderMermaidDiagrams() {
              setupMermaidModal();
              
              const codeBlocks = document.querySelectorAll('.mermaid-raw, code.language-mermaid, pre.language-mermaid, pre[data-language="mermaid"]');
              for (let i = 0; i < codeBlocks.length; i++) {
                const codeBlock = codeBlocks[i];
                if (codeBlock.dataset.mermaidRendered) continue;
                codeBlock.dataset.mermaidRendered = 'true';
                
                const preOrFigure = codeBlock.closest('.expressive-code') || codeBlock.closest('pre') || codeBlock;
                
                let textContent = '';
                if (codeBlock.classList.contains('mermaid-raw')) {
                  textContent = decodeURIComponent(codeBlock.dataset.raw || '');
                } else {
                  const copyBtn = preOrFigure.querySelector('button[data-code]');
                  if (copyBtn && copyBtn.dataset.code) {
                    textContent = copyBtn.dataset.code.replace(new RegExp(String.fromCharCode(127), 'g'), String.fromCharCode(10));
                  } else {
                    const lines = codeBlock.querySelectorAll('.ec-line .code');
                    if (lines.length > 0) {
                      textContent = Array.from(lines).map(line => line.textContent).join(String.fromCharCode(10));
                    } else {
                      textContent = codeBlock.textContent || '';
                    }
                  }
                }
                
                if (!textContent.trim()) continue;

                const container = document.createElement('div');
                container.className = 'mermaid-diagram-container';
                container.title = 'Click to expand diagram';

                const id = 'mermaid-svg-' + i + '-' + Math.random().toString(36).substring(2, 7);
                try {
                  const { svg } = await mermaid.render(id, textContent.trim());
                  container.innerHTML = svg;
                  
                  // Add explicit overlay icon
                  container.style.position = 'relative';
                  const expandIcon = document.createElement('div');
                  expandIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
                  expandIcon.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; background: var(--sl-color-bg-nav); border: 1px solid var(--sl-color-gray-5); color: var(--sl-color-text); width: 2.25rem; height: 2.25rem; border-radius: 0.25rem; display: flex; align-items: center; justify-content: center; opacity: 1; transition: opacity 0.2s, background 0.2s; pointer-events: none; z-index: 2;';
                  container.onmouseover = () => expandIcon.style.opacity = '1';
                  container.onmouseout = () => expandIcon.style.opacity = '0.7';
                  container.appendChild(expandIcon);
                  
                  // Add click listener for modal
                  container.addEventListener('click', () => {
                    const dialog = document.getElementById('mermaid-modal');
                    const content = document.getElementById('mermaid-modal-content');
                    content.innerHTML = svg;
                    dialog.showModal();
                  });

                  if (preOrFigure.parentNode) {
                    preOrFigure.parentNode.replaceChild(container, preOrFigure);
                  }
                } catch (err) {
                  console.error('Mermaid render error:', err);
                  container.innerHTML = '<div style="color:red;padding:1rem;">Mermaid Error: ' + err.message + '</div>';
                  if (preOrFigure.parentNode) {
                    preOrFigure.parentNode.replaceChild(container, preOrFigure);
                  }
                }
              }
            }

            // Run eagerly
            renderMermaidDiagrams();
            // And run on DOM ready
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', renderMermaidDiagrams);
            }
            // And run on Astro page transitions
            document.addEventListener('astro:page-load', renderMermaidDiagrams);
            // And just in case, poll for a bit
            let attempts = 0;
            const interval = setInterval(() => {
              renderMermaidDiagrams();
              if (attempts++ > 10) clearInterval(interval);
            }, 500);
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
  ],
});
