# Technical Documentation Portfolio

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://docs.sharonwang.me)
[![Built with Astro Starlight](https://img.shields.io/badge/Built%20with-Astro%20Starlight-ff5a03?logo=astro&logoColor=white)](https://starlight.astro.build)

A documentation engineering portfolio showcasing docs-as-code workflows, API integration guides, and developer runbooks designed to optimize Developer Experience (DevEx). Live at **[docs.sharonwang.me](https://docs.sharonwang.me)**.

---

## 📂 Repository Structure

```
docs/
├── src/content/docs/
│   ├── index.mdx                              # Landing page
│   ├── about.mdx                              # Documentation philosophy & methodology
│   ├── coming-soon.mdx                        # Placeholder for upcoming sections
│   └── articles/
│       ├── canvas-lms-setup.mdx               # Local Environment Setup Guide: Docker & Canvas LMS
│       └── tms-canvas-oauth2.mdx              # API Integration Guide: OAuth 2.0 & Canvas LMS
├── public/                                    # Static assets and branding
├── astro.config.mjs                           # Starlight config, sidebar, KaTeX, Mermaid, Vercel analytics
└── package.json                               # Project dependencies and build scripts
```

---

## 📝 Published Articles

### [API Integration Guide: OAuth 2.0 & Canvas LMS](https://docs.sharonwang.me/articles/tms-canvas-oauth2/)
An architectural deep-dive into the OAuth 2.0 Authorization Code Flow for Canvas LMS integrations, including a Mermaid sequence diagram and a cURL HTTP request example.

### [Local Environment Setup Guide: Docker & Canvas LMS](https://docs.sharonwang.me/articles/canvas-lms-setup/)
A step-by-step developer runbook for provisioning a containerized Canvas LMS instance on AWS EC2 and generating OAuth 2.0 developer keys for API integration testing.

---

## 🛠️ Technology Stack

- **Static Site Generator**: [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/) documentation theme.
- **Content Format**: [MDX](https://mdxjs.com/) (Markdown + JSX for interactive components, tabs, cards, and callouts).
- **Diagramming**: [Mermaid.js](https://mermaid.js.org/) client-side rendering for sequence, state, and flowchart diagrams.
- **Mathematical Rendering**: [remark-math](https://github.com/remarkjs/remark-math) & [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex) for KaTeX formula rendering.
- **Full-Text Search**: Client-side static indexing powered by [Pagefind](https://pagefind.app/).
- **Deployment**: [Vercel](https://vercel.com/) static edge hosting with integrated Web Analytics.

---

## 🚀 Local Development

### Prerequisites
- **Node.js**: `v18.14.1` or higher (`v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Quick Start

```bash
git clone git@github.com:sharonwang554/docs.git
cd docs
npm install
npm run dev
```

Open `http://localhost:4321`. Changes to `.mdx` files under `src/content/docs/` will hot-reload instantly.

### Production Build

```bash
npm run build
```

Compiles all static routes, renders KaTeX formulas, and generates the Pagefind search index inside `dist/`.

---

## 📬 Contact

- **Portfolio**: [sharonwang.me](https://sharonwang.me)
- **GitHub**: [@sharonwang554](https://github.com/sharonwang554)
