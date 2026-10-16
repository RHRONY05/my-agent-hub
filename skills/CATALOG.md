# Agent Skills Catalog

This catalog indexes all skills available on this system. In this repository, custom skills are organized by domain layers under `skills/<domain>/<skill-name>/`.

---

## 💾 Backed-Up Custom Skills (Layered by Domain)

### ⚙️ 1. Backend (`skills/backend/`)
| Skill | Purpose |
| :--- | :--- |
| **`backend-standards`** | 5-pillar backend scaffolding: typed env config, fail-fast DB/Redis startup, Pino structured logging, ApiError/ApiResponse envelopes, async handlers. |

### 🏛️ 2. Architecture & Planning (`skills/architecture/`)
| Skill | Purpose |
| :--- | :--- |
| **`document-architecture`** | Analyzes backend codebases, detects critical & complex API endpoints, and generates developer lifecycle diagrams, user flows, and complete API contract dictionaries. |
| **`plan-project`** | Interactive planning: divides projects into modular vertical slices and generates tracking documents (`AGENTS.md`, `project_tracker.md`) and design docs. |

### 💻 3. Frontend (`skills/frontend/`)
| Skill | Purpose |
| :--- | :--- |
| **`frontend-design`** | Design-system phase: palette & typography discovery, token generation, anti-slop creative direction, and centralized token export. |
| **`frontend-implementation`** | Production frontend standard: sequential page assembly, zero-hardcode token discipline, and 4-state async machines. |
| **`performance-audit`** | Stack-agnostic Core Web Vitals (CWV) & Lighthouse auditing, bottleneck diagnosis (LCP, TBT, CLS), and optimization verification. |

### 🎨 4. UI/UX Design (`skills/ui-ux-design/`)
| Skill | Purpose |
| :--- | :--- |
| **`design-canvas`** | Screen design phase: token-only HTML artboards on a zoom/pan canvas, component kit, motion spec, and visual checks. |
| **`domain-asset-discovery`** | Discovers and verifies authentic domain assets (sports badges, club logos, movie posters, products) via open APIs without placeholder URLs. |
| **`ui-styling`** | Accessible UI creation using shadcn/ui, Tailwind CSS utility styling, Radix UI primitives, dark mode themes, and canvas designs. |
| **`ui-ux-pro-max`** | Comprehensive UI/UX design intelligence database: 79 searchable styles, 192 product palettes, 74 font pairings, 119 UX guidelines, and stack-specific implementations. |

### 🔄 5. Workflows & Review (`skills/workflow/`)
| Skill | Purpose |
| :--- | :--- |
| **`generate-qa-review`** | Analyzes project implementations and automatically generates high-yield Active Recall Q&A revision guides with collapsible answers. |
| **`handoff`** | Generates a lightweight, structured state summary to hand off project context seamlessly to another AI agent or session. |

---

## 🔌 Plugin & Platform Skills (Auto-Managed)

These skills are distributed and maintained by installed plugins or Google Cloud tools (no manual repository backup required):

### Modern Web & DevTools (via `chrome-devtools-plugin` & `modern-web-guidance`)
* `a11y-debugging` — Accessibility testing (ARIA, focus states, keyboard nav, contrast).
* `chrome-devtools` — Chrome DevTools automation and performance profiling.
* `debug-optimize-lcp` — Diagnostic runbook for Largest Contentful Paint (LCP) Core Web Vitals.
* `memory-leak-debugging` — Heap snapshot inspection, garbage collection profiling, and memory leak diagnosis.
* `troubleshooting` — Chrome DevTools connection recovery.
* `chrome-extensions` — Manifest V3 browser extension development and store publishing.
* `modern-web-guidance` — Best practices for modern browser APIs (View Transitions, scroll animations, popovers).

### Google Cloud Platform & Data Pipelines (via `datacloud` bundle)
* `bigquery-sql`, `bigquery-ai-ml`, `bigquery-bigframes`, `bigquery-data-transfer-service`, `bigquery-graph`
* `dbt-bigquery`, `dataform-bigquery`, `data-autocleaning`, `schema-mapping`
* `gcp-data-pipelines`, `gcp-dataflow`, `gcp-spark`, `bigtable-basics`
* `gcp-composer-troubleshooting`, `gcp-managed-airflow-dag-authoring`, `gcp-managed-airflow-migrations`, `gcp-managed-airflow-recommendations`
* `gcs-security-assessment`, `google-cloud-storage-basics`, `google-cloud-storage-bucket-architect`, `google-cloud-storage-fuse`
* `google-cloud-auth-verification`, `enforcing-resource-attribution`, `discovering-gcp-data-assets`, `building-data-apps`

### Generative AI SDKs (via `gemini-api` & `google-antigravity-sdk`)
* `gemini-api-dev` — Official Google GenAI SDK (Python & TypeScript) for text, multimodal, and agent calls.
* `gemini-live-api-dev` — Real-time bidirectional streaming with Gemini Live API (audio/video streaming, VAD).
* `gemini-omni-flash-api` — Generative video editing, frame-to-video, and transitions via Gemini Omni models.
* `google-antigravity-sdk` — Autonomous AI agent design and multi-agent orchestration.

### Safety & System Maintenance
* `accidental-data-loss-prevention` — Mandatory STOP-AND-VERIFY before destructive commands (DROP, DELETE, rm).
* `managing-python-dependencies` — Virtual environments, uv/poetry/pip tooling, avoiding global pip pollution.
* `skill-repair` — Diagnosing and repairing broken agent skills or manifests.
