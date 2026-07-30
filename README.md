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
| **System Documentation Hub** | [https://docs.sharonwang.me](https://docs.sharonwang.me) | Astro Starlight, MDX, Mermaid.js, KaTeX | *(This Repository)* |
| **3D Space Portfolio** | [https://sharonwang.me](https://sharonwang.me) | React 18, Three.js, React Three Fiber, WebGL, Vitest | [`/3d-space-portfolio`](https://docs.sharonwang.me/3d-space-portfolio/overview) |
| **Raised Church Website** | [https://raisedchurch.com](https://raisedchurch.com) | SvelteKit SSR, Contentful Headless CMS, Cloudflare ISR | [`/raised-church-website`](https://docs.sharonwang.me/raised-church-website/overview) |
| **TMS Platform** | `*.tms.org` *(Anonymized Legacy Platform)* | Perl 5, mod_perl2, Apache, Template Toolkit, PostgreSQL | [`/tms`](https://docs.sharonwang.me/tms/overview) |

---

## 🏛️ Knowledge Base Architecture & Navigation Hubs

The repository is structured into three targeted deep-linking categories designed to demonstrate specialized technical domain competencies, followed by complete project documentation repositories and academic research:

```
docs/
├── src/content/docs/
│   ├── developer-docs/         # 🎯 Developer Enablement & API Specifications (OpenAPI schemas, OAuth 2.0 PKCE sequence flows, onboarding)
│   ├── troubleshooting/        # 🎯 SRE & Support Runbooks (Symptom-Diagnosis-Fix SOPs, Canvas LMS errors, distributed log tracing)
│   ├── architecture/           # 🎯 System Architecture & Logic Decomposition (Cloud diagrams, trade-off analysis, KaTeX algorithms)
│   ├── 3d-space-portfolio/     # Complete multi-audience documentation for sharonwang.me
│   ├── raised-church-website/  # Tri-audience documentation (Developers, Non-technical Content Editors, AI Coding Agents)
│   ├── tms/             # Anonymized institutional knowledge capture and onboarding guide for a 15-year-old Perl/mod_perl platform
│   ├── articles/               # Academic writing and biblical textual criticism (Great Isaiah Scroll vs Masoretic Text collation)
│   ├── index.mdx               # Portal Landing Page
│   └── about.mdx               # Philosophy & Competency Map
├── public/                     # Static assets, branding icons, and diagrams
├── astro.config.mjs            # Starlight config, collapsible sidebar autogeneration, KaTeX math integration, Vercel analytics
└── package.json                # Project dependencies and build scripts
```

### Key Competency Highlights
- **Developer Enablement (`/developer-docs/`)**: Features multi-language API request/response payload definitions (`POST /api/webhooks/contentful`, `PUT /api/v1/locale`, Canvas grade passback), secure SSH agent forwarding (`ssh -A`) setup guides, and multi-actor `Mermaid.js` sequence diagrams.
- **Support Engineering & Runbooks (`/troubleshooting/`)**: Actionable SOPs following strict incident triage methodologies (`Symptom → Diagnosis → Fix → Prevention`). Covers HTTP `401 Unauthorized` token dropouts, `429 Too Many Requests` Leaky Bucket rate throttling, CORS preflight blocks, and Chromium HSTS local bypass protocols (`thisisunsafe`).
- **System Architecture (`/architecture/`)**: In-depth cloud infrastructure diagrams (`WAF → ALB → Cognito → EC2/ECS → SQS/DLQ → RDS`), synchronous vs asynchronous messaging trade-off analysis, and formal algorithm decomposition utilizing **KaTeX / LaTeX** mathematical equations.

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

---

## 📬 Contact & Connect

- **Personal Portfolio & Bio**: [sharonwang.me](https://sharonwang.me)
- **GitHub**: [@sharonwang554](https://github.com/sharonwang554)
- **Email**: [sharonwang554@gmail.com](mailto:sharonwang554@gmail.com)
