# Agent Skills Catalog

This catalog indexes the skills available on this system. Skills are modular runbooks and domain guidelines that dynamically inject deep expertise into AI agents on demand (progressive disclosure).

---

## 💾 Backed-Up Custom Skills (`skills/custom/`)

These 14 custom skills are stored directly in this repository for permanent version control and backup:

| Custom Skill | Domain | Purpose |
| :--- | :--- | :--- |
| **`backend-standards`** | Backend | 5-pillar backend scaffolding: typed env config, fail-fast DB/Redis, Pino logging, ApiError/ApiResponse, async handlers. |
| **`design-canvas`** | UI/UX | High-fidelity screen design phase (token-only HTML, mobile/desktop artboards, motion spec, anti-slop craft). |
| **`document-architecture`** | Architecture | Analyzes backend codebases, generates developer lifecycle diagrams, client flows, and API contract dictionaries. |
| **`domain-asset-discovery`** | Media Assets | Discovers and verifies authentic domain assets (sports badges, club logos, movie posters, products) via open APIs. |
| **`frontend-design`** | UI/UX | Design-system phase: palette & typography discovery, token generation, layout hierarchy. |
| **`frontend-implementation`** | Frontend | Production frontend standard: sequential page assembly, zero-hardcode token discipline, 4-state async machines. |
| **`generate-qa-review`** | Learning | Analyzes project implementations and generates Active Recall Q&A revision guides with collapsible answers. |
| **`handoff`** | Workflow | Generates lightweight state summaries to hand off projects between AI agents. |
| **`pdf`** | Document AI | PDF reading, text extraction, visual layout inspection, and parsing. |
| **`performance-audit`** | Web Vitals | Stack-agnostic Core Web Vitals (CWV) & Lighthouse auditing and bottleneck optimization. |
| **`plan-project`** | Planning | Interactive planning: divides projects into modular vertical slices and generates tracking documents. |
| **`playwright`** | Testing | End-to-end browser automation, test scripting, and visual verification. |
| **`ui-styling`** | UI/UX | Component styling using shadcn/ui, Tailwind CSS, Radix UI primitives, dark mode, and canvas designs. |
| **`ui-ux-pro-max`** | UI/UX | Comprehensive UI/UX design intelligence: 79 styles, 192 product palettes, 74 font pairings, 119 UX guidelines. |

---

## 🔌 Plugin & Platform Skills (Auto-Managed)

These skills are distributed and maintained by installed plugins or Google Cloud tools (no manual repository backup required):

### 1. Modern Web & DevTools (via `chrome-devtools-plugin` & `modern-web-guidance`)
* `a11y-debugging` — Accessibility testing (ARIA, focus states, keyboard nav, contrast).
* `chrome-devtools` — Chrome DevTools automation and performance profiling.
* `debug-optimize-lcp` — Diagnostic runbook for Largest Contentful Paint (LCP) Core Web Vitals.
* `memory-leak-debugging` — Heap snapshot inspection, garbage collection profiling, and memory leak diagnosis.
* `troubleshooting` — Chrome DevTools connection recovery.
* `chrome-extensions` — Manifest V3 browser extension development and store publishing.
* `modern-web-guidance` — Best practices for modern browser APIs (View Transitions, scroll animations, popovers).

### 2. Google Cloud Platform & Data Pipelines (via `datacloud` bundle)
* `bigquery-sql`, `bigquery-ai-ml`, `bigquery-bigframes`, `bigquery-data-transfer-service`, `bigquery-graph`
* `dbt-bigquery`, `dataform-bigquery`, `data-autocleaning`, `schema-mapping`
* `gcp-data-pipelines`, `gcp-dataflow`, `gcp-spark`, `bigtable-basics`
* `gcp-composer-troubleshooting`, `gcp-managed-airflow-dag-authoring`, `gcp-managed-airflow-migrations`, `gcp-managed-airflow-recommendations`
* `gcs-security-assessment`, `google-cloud-storage-basics`, `google-cloud-storage-bucket-architect`, `google-cloud-storage-fuse`
* `google-cloud-auth-verification`, `enforcing-resource-attribution`, `discovering-gcp-data-assets`, `building-data-apps`

### 3. Generative AI SDKs (via `gemini-api` & `google-antigravity-sdk`)
* `gemini-api-dev` — Official Google GenAI SDK (Python & TypeScript) for text, multimodal, and agent calls.
* `gemini-live-api-dev` — Real-time bidirectional streaming with Gemini Live API (audio/video streaming, VAD).
* `gemini-omni-flash-api` — Generative video editing, frame-to-video, and transitions via Gemini Omni models.
* `google-antigravity-sdk` — Autonomous AI agent design and multi-agent orchestration.

### 4. Safety & System Maintenance
* `accidental-data-loss-prevention` — Mandatory STOP-AND-VERIFY before destructive commands (DROP, DELETE, rm).
* `managing-python-dependencies` — Virtual environments, uv/poetry/pip tooling, avoiding global pip pollution.
* `skill-repair` — Diagnosing and repairing broken agent skills or manifests.
