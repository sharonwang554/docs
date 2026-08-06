# System Documentation & Architecture Hub (`docs.sharonwang.me`)

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel&logoColor=white)](https://docs.sharonwang.me)
[![Built with Astro Starlight](https://img.shields.io/badge/Built%20with-Astro%20Starlight-ff5a03?logo=astro&logoColor=white)](https://starlight.astro.build)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The **System Documentation & Architecture Hub** (`docs.sharonwang.me`) is an authoritative technical knowledge base and engineering runbook center created by **Sharon Wang**. 

Rather than a conventional resume or basic project showcase, this portal serves as a live, production-grade demonstration of **technical writing, systems architecture, API documentation, and site reliability engineering (SRE) runbooks** across varied technology stacks—ranging from modern server-side rendered frameworks and WebGL graphics engines to mature, high-throughput legacy Perl platforms.

---

## 🌐 Live Production Ecosystem

This documentation portal directly references and supports several live production web applications and engineering repositories:

| Project System | Live Application URL | Primary Technology Stack | Documentation Hub Section |
| :--- | :--- | :--- | :--- |
| **System Documentation Hub** | [https://docs.sharonwang.me](https://docs.sharonwang.me) | Astro Starlight, MDX, Diátaxis, Mermaid.js, KaTeX | *(This Repository)* |
| **3D Space Portfolio** | [https://sharonwang.me](https://sharonwang.me) | React 18, Three.js, React Three Fiber, WebGL, Vitest | [`/3d-space-portfolio`](https://docs.sharonwang.me/3d-space-portfolio/tutorials/getting-started) |
| **Raised Church Website** | [https://raisedchurch.com](https://raisedchurch.com) | SvelteKit SSR, Contentful Headless CMS, Cloudflare ISR | [`/raised-church-website`](https://docs.sharonwang.me/raised-church-website/tutorials/contentful-quick-start) |
| **TMS Platform** | `*.tms.org` *(Anonymized Academic System)* | C# / ASP.NET Core, PostgreSQL, Apache, Canvas LTI | [`/tms`](https://docs.sharonwang.me/tms/tutorials/getting-started) |

---

## 🏛️ Knowledge Base Architecture & Diátaxis Structuring

The documentation architecture is organized strictly using the four quadrants of the **Diátaxis framework** across all projects:

```
docs/
├── src/content/docs/
│   ├── tms/                    # 🎓 Academic Team Management Platform (C# / .NET Core)
│   │   ├── tutorials/          # Learning-oriented getting started guide
│   │   ├── how-to/             # Problem-oriented OAuth & API integration guides
│   │   ├── reference/          # Information-oriented database & memory runbooks
│   │   └── explanation/        # System design & architecture overviews
│   ├── 3d-space-portfolio/    # 🌌 React / Three.js Interactive Portfolio (sharonwang.me)
│   │   ├── tutorials/          # Quick start & development workflow
│   │   ├── how-to/             # Testing strategy and Vitest setup
│   │   ├── reference/          # API reference & SCSS module standards
│   │   └── explanation/        # Project structure & WebGL rendering pipeline
│   ├── raised-church-website/ # ⛪ SvelteKit / Contentful Multi-Church Platform
│   │   ├── tutorials/          # Contentful quick start & template setup
│   │   ├── how-to/             # Custom features, i18n, & deployment troubleshooting
│   │   ├── reference/          # Svelte components, Contentful GraphQL queries, & types
│   │   └── explanation/        # Jamstack architecture & content structure
│   ├── articles/               # ✍️ Deep-dive technical articles & research collations
│   ├── index.mdx               # Portal Landing Page
│   └── about.mdx               # Philosophy & Competency Matrix
├── public/                     # Static assets, branding icons, and diagrams
├── astro.config.mjs            # Central Astro, Starlight, KaTeX, and Vercel configuration
└── package.json                # Project dependencies and build scripts
```

### Key Competency Highlights
- **Developer Enablement & API Specifications**: Features multi-language API request/response payload definitions, secure SSH agent forwarding setups, and multi-actor `Mermaid.js` sequence diagrams for OAuth 2.0 PKCE workflows.
- **Support Engineering & Operational Runbooks**: Actionable SOPs following strict incident triage methodologies (`Symptom → Diagnosis → Fix → Prevention`). Covers HTTP `401 Unauthorized` token dropouts, `429` rate throttling, EF Core N+1 query optimization, and memory leak resolution.
- **System Architecture**: In-depth cloud infrastructure diagrams, synchronous vs asynchronous messaging trade-off analysis, and formal algorithm decomposition utilizing **KaTeX / LaTeX** mathematical equations.

---

## 🛠️ Technology Stack & Tooling

- **Static Site Generator**: [Astro](https://astro.build/) with [Starlight](https://starlight.astro.build/) documentation theme.
- **Content Format**: [MDX](https://mdxjs.com/) (Markdown + React/JSX syntax for interactive components, tabs, cards, and callouts).
- **Diagramming**: Native [Mermaid.js](https://mermaid.js.org/) client-side rendering for sequence, state, flowchart, and Git workflow diagrams.
- **Mathematical Rendering**: [remark-math](https://github.com/remarkjs/remark-math) & [rehype-katex](https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex) (`KaTeX`) for high-performance formula rendering.
- **Full-Text Search**: Client-side static indexing and fuzzy search powered by [Pagefind](https://pagefind.app/).
- **Deployment & Analytics**: [Vercel](https://vercel.com/) static edge hosting with integrated Vercel Web Analytics.

---

## 🚀 Local Development Setup

To run this documentation hub locally on your machine:

### Prerequisites
- **Node.js**: `v18.14.1` or higher (`v20+` recommended)
- **Package Manager**: `npm`, `pnpm`, or `yarn`

### Installation & Execution

1. **Clone the repository**:
   ```bash
   git clone git@github.com:sharonwang554/docs.git
   cd docs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or with pnpm:
   pnpm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:4321`. Any modifications to `.md` or `.mdx` files under `src/content/docs/` will hot-reload instantly.

4. **Verify static production build**:
   ```bash
   npm run build
   ```
   This compiles all static routes, executes strict MDX syntax verification, renders KaTeX formulas, and generates the static Pagefind search index inside the `dist/` directory.

---

## 📝 Documentation Philosophy

> *"Writing for the reader, not the writer. Every document begins by answering two questions: Who is reading this right now, and exactly what actionable task do they need to accomplish after finishing the page?"*

Every page within this portal adheres to strict engineering documentation standards:
- **Zero Placeholder Text**: All code blocks, cURL payloads, database queries, and error stack traces reflect authentic production engineering behaviors.
- **Audience-Targeted Tone**: Codebase onboarding guides speak with technical precision to software developers; runbooks provide direct, step-by-step diagnostic clarity for SREs and support engineers; and CMS guides provide gentle, jargon-free instructions tailored for non-technical staff.
- **Institutional Preservation**: Legacy system documentation prioritizes capturing nuanced tribal knowledge, architectural trade-offs, and historical quirks that are critical for system maintenance and evolution.
