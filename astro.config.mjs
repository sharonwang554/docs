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
      head: [
        {
          tag: 'script',
          content: `
            document.addEventListener('DOMContentLoaded', () => {
              const headerControls = document.querySelector('.header .sl-flex:last-child') || document.querySelector('.header .sl-flex') || document.querySelector('header');
              if (!headerControls) return;

              const toggleBtn = document.createElement('button');
              toggleBtn.id = 'sidebar-collapse-btn';
              toggleBtn.className = 'sidebar-collapse-btn';
              toggleBtn.setAttribute('title', 'Toggle left navigation sidebar for expanded reading space');
              
              const updateBtnContent = (isCollapsed) => {
                toggleBtn.innerHTML = \`
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>
                  </svg>
                  <span>\${isCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}</span>
                \`;
              };

              const initialCollapsed = localStorage.getItem('sl-sidebar-collapsed') === 'true';
              if (initialCollapsed) {
                document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
              }
              updateBtnContent(initialCollapsed);

              const search = headerControls.querySelector('.site-search');
              if (search) {
                headerControls.insertBefore(toggleBtn, search);
              } else if (headerControls.firstChild) {
                headerControls.insertBefore(toggleBtn, headerControls.firstChild);
              } else {
                headerControls.appendChild(toggleBtn);
              }

              toggleBtn.addEventListener('click', () => {
                const isCollapsed = document.documentElement.getAttribute('data-sidebar-collapsed') === 'true';
                const nextState = isCollapsed ? 'false' : 'true';
                document.documentElement.setAttribute('data-sidebar-collapsed', nextState);
                localStorage.setItem('sl-sidebar-collapsed', nextState);
                updateBtnContent(!isCollapsed);
              });
            });
          `,
        },
      ],
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

      editLink: {
        baseUrl: 'https://github.com/sharonwang554/docs/edit/main/',
      },
    }),
  ],
});
