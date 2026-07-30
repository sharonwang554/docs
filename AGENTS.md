# AI Agent Contribution Guide & Codebase Runbook (`AGENTS.md`)

Welcome, autonomous AI coding agents (`Antigravity`, `Claude`, `Cursor`, `Devin`, `Aider`, `Copilot`) and human engineers. This document establishes the strict architectural mandates, content fidelity rules, and verification procedures required when contributing to the **System Documentation & Architecture Hub** (`sharonwang554/docs`).

---

## 🏛️ Repository Identity & Mission

This repository powers **`docs.sharonwang.me`**, an authoritative, multi-tier technical knowledge base and engineering runbook hub created by **Sharon Wang**. It serves as a live, production-grade demonstration of **technical writing, systems architecture design, API documentation, and site reliability engineering (SRE) runbooks** across multiple production and legacy platforms.

---

## 🚨 Critical Mandates & Golden Rules for AI Agents

When interacting with or modifying files in this codebase, AI agents must strictly adhere to the following rules without exception:

### 1. Zero Synthetic Content & Strict Source Fidelity
- **DO NOT Invent Fictional Scenarios**: Never generate synthetic database schemas, imaginary API endpoints, fictional troubleshooting runbooks, or unverified setup steps that are not grounded in real project source code or explicit user instructions.
- **Legacy Source Preservation**: When modularizing or referencing legacy raw documents (`TMS.md`, `textual criticism.md` at the repository root), preserve **100% of the authentic technical knowledge, commands, SQL queries, and edge cases**.
- **Root Files are Read-Only**: Never modify legacy reference files in the repository root (`TMS.md`, `textual criticism.md`). All enhancements, Mermaid diagrams, and structural segmentations must reside inside `src/content/docs/`.

### 2. Anonymization Standards (`tms/`)
The `/src/content/docs/tms/` documentation captures institutional knowledge for an anonymized 15-year-old LAMP/Perl academic team management platform. Agents must rigorously enforce the following anonymization replacements:
- Real product/system name $\rightarrow$ **`TMS`**
- University name $\rightarrow$ **`a major research university`**
- Server hostnames $\rightarrow$ **`*.tms.org`** (e.g., `dev01.tms.org`)
- Instructor, student, or admin personal identities $\rightarrow$ **Genericized test identities** (`faculty_test@tms.org`, `student_test@tms.org`, `admin@test.edu`)

### 3. Precision Multi-Audience Tone
Every section in this repository targets a specific reader persona. Agents must maintain domain-appropriate technical depth:
- **Developer Enablement (`/developer-docs/`, `*-guide/developer-guide.mdx`)**: High technical precision, complete HTTP request/response payloads, exact CLI/Git commands, and concrete code snippets.
- **SRE & Troubleshooting (`/troubleshooting/`, `*/troubleshooting.mdx`)**: Structured diagnostic methodology (`Symptom → Root Cause → Diagnostic Verification → Actionable Fix → Prevention`).
- **Content Editors & Non-Technical Staff (`*/content-editor-guide.mdx`)**: Gentle, jargon-free, numbered step-by-step instructions utilizing clear callouts.
- **AI Coding Agents (`*/ai-agent-guide.mdx`)**: Structured, scannable directives optimized for LLM token consumption and context retrieval.

### 4. Strict Diátaxis Framework Structuring
All major project documentation (e.g., `3d-space-portfolio/`, `raised-church-website/`, `tms/`) must be strictly organized into the four quadrants of the **Diátaxis framework**:
- `tutorials/`: Learning-oriented, practical guides for beginners (e.g., `getting-started.mdx`).
- `how-to/`: Problem-oriented, step-by-step practical guides for specific tasks.
- `reference/`: Information-oriented, theoretical documentation (e.g., API endpoints, environment variables).
- `explanation/`: Understanding-oriented, theoretical overviews (e.g., architecture, design patterns).
When creating new documentation sections, always place them in the correct Diátaxis subdirectory and update `astro.config.mjs` accordingly.

---

## 🛠️ Tech Stack & Configuration Protocols

### 1. Astro Starlight (`astro.config.mjs`)
- The documentation site is powered by **Astro Starlight (`v0.34+`)**.
- All navigation groups and sidebars are centrally configured in `astro.config.mjs`.
- **Sidebar Collapsibility**: Every sidebar group (`autogenerate` or `items` array) must explicitly define `collapsed: true` or `collapsed: false` to ensure clear navigation controls across deep content hierarchies.

### 2. MDX Components & Callouts (`@astrojs/starlight/components`)
When authoring `.mdx` pages, leverage official Starlight UI components:
```mdx
import { Card, CardGrid, Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';

<Aside type="tip">
Use `tip` for best practices, `note` for context, `caution` for potential pitfalls, and `danger` for high-risk actions.
</Aside>

<Steps>
1. **First Step**: Command or instruction.
2. **Second Step**: Follow-up action.
</Steps>
```

### 3. Diagramming with Mermaid.js (` ```mermaid `)
Enhance technical explanations by embedding native `Mermaid.js` diagrams directly inside Markdown code blocks:
- **Sequence Diagrams (`sequenceDiagram`)**: For OAuth 2.0 PKCE flows, API request cycles, and multi-actor communication.
- **Architecture Flowcharts (`graph TD` or `graph LR`)**: For AWS EC2/VPC network topology, database schema relationships, and data pipelines.
- **State Diagrams (`stateDiagram-v2`)**: For object lifecycles (e.g., activity archiving vs permanent deletion).
- **Git Workflows (`gitGraph`)**: For branching, pull request review, and cherry-picking procedures.
- *Syntax Rule*: Always enclose node labels containing special characters inside double quotes (e.g., `Node["Label (Info)"]`) to prevent runtime parse failures.

### 4. KaTeX Mathematical Equations
- Mathematical equations are supported via `remark-math` and `rehype-katex`.
- Inline math: `\( E = mc^2 \)` or `$ E = mc^2 $`.
- Display / Block math: `\[ \sum_{i=1}^n i \]` or `$$ \sum_{i=1}^n i $$`.
- *Syntax Rule*: Only apply KaTeX rendering to articles (`/articles/`) or architectural algorithms that explicitly require mathematical notation. Do not inject equations into standard web runbooks or legacy files where math was absent.

---

## 📂 Directory Map & Content Organization

```
docs/
├── src/content/docs/
│   ├── index.mdx                   # Portal Landing & Splash Page
│   ├── about.mdx                   # Documentation Philosophy & Competency Matrix
│   ├── developer-docs/             # 🎯 Developer Enablement & API Reference Hub
│   ├── troubleshooting/            # 🎯 Site Reliability Engineering & Support Runbooks
│   ├── architecture/               # 🎯 System Architecture & Logic Breakdown
│   ├── 3d-space-portfolio/         # Complete documentation for React/Three.js interactive portfolio (sharonwang.me)
│   ├── raised-church-website/      # Tri-audience documentation for SvelteKit/Contentful church platform
│   ├── tms/                 # Institutional knowledge base & dev runbooks for anonymized Perl/mod_perl system
│   └── articles/                   # Academic writing & research collation articles
├── public/                         # Static assets and media files
├── astro.config.mjs                # Central Astro, Starlight, KaTeX, and Vercel configuration
├── package.json                    # Project dependencies and build scripts
└── vercel.json                     # Vercel deployment headers and build directives
```

---

## 🧪 Verification & CI Runbook for AI Agents

Before submitting code modifications or creating commits, AI agents must verify that the documentation compiles cleanly without errors:

### 1. Local Syntax & Type Checking (`astro check`)
To verify MDX syntax, frontmatter validity, and component props without triggering telemetry prompts:
```bash
ASTRO_TELEMETRY_DISABLED=1 node ./node_modules/astro/astro.js check
```
*Requirement*: Must pass with `0 errors, 0 warnings`.

### 2. Static Production Build Verification (`astro build`)
To verify static route generation, KaTeX formula compilation, and Starlight sitemap/Pagefind index integrity:
```bash
ASTRO_TELEMETRY_DISABLED=1 node ./node_modules/astro/astro.js build
```
*Requirement*: All static pages under `src/content/docs/` must build cleanly inside `dist/` without broken internal links (`[text](file:///...)` or relative path failures).

### 3. Git Deployment & CI Pipeline
- Always verify your modifications with `git status` and `git diff` before committing.
- Write clear, concise, imperative commit messages summarizing the technical changes.
- Push directly to `origin main`. Vercel is configured to automatically intercept `main` branch commits and execute edge builds (`npm run build`) via `@astrojs/vercel`.
