# Frontend Planning Reference

When `plan-project` routes to this file, follow these steps sequentially.
Complete each step, explain the reasoning to the user, and wait for confirmation before proceeding.

**All planning deliverables from this reference get saved to `docs/frontend-plan.md`.**
Build the document incrementally — after each step is approved, append that section to the file.

---

## Step 1: Requirements Interview (Frontend-Specific)

Ask concise questions to pin down the scope:

1. **Core Purpose:** What does this interface help users accomplish? (browse & book, manage data, monitor a dashboard, tell a story)
2. **Target Users:** Who will use this? (general public, admin staff, developers, specific demographic)
3. **Data Source:** Where does the data come from? (existing REST API, GraphQL, local storage, static content, real-time WebSocket)
4. **Key User Actions:** What are the 3–5 most important things a user can DO? (not just see — actions like "book a seat", "filter movies", "submit a form")
5. **Auth Requirements:** Does the user need to log in? What method? (Google OAuth, email/password, magic link, none)
6. **Tech Stack Constraints:** Any pre-decided technologies? (React/Vite, Next.js, Vue, Svelte, vanilla JS, Tailwind, CSS modules)
7. **Device Targets:** Desktop-first, mobile-first, or equal priority?

**Wait for user to answer. Save answers as the "Requirements" section in `docs/frontend-plan.md`.**

---

## Step 2: Screen Inventory

List every distinct screen/view the application will have. For each screen, define:

| # | Screen Name | Purpose | Auth Required | Data Needed |
|---|-------------|---------|---------------|-------------|
| 1 | Landing Page | Browse available movies | No | Movie list (title, poster, showtime) |
| 2 | Seat Selection | Pick seats for a movie | Yes | Seat grid (seat_number, status) |
| 3 | My Bookings | View booking history | Yes | User's confirmed bookings |

Also list **modal/overlay views** separately (they're not full pages but are distinct UI states):

| Modal | Trigger | Purpose |
|-------|---------|---------|
| Auth Modal | Click "Sign In" | Google OAuth login flow |
| OTP Modal | After seat selection | Email verification |
| Ticket Modal | Click booking card | View digital ticket |

**Present to the user. Save as the "Screen Inventory" section in `docs/frontend-plan.md`. Wait for approval before proceeding.**

---

## Step 3: Sitemap Tree

Organize the screens into a navigational hierarchy.
Use a Markdown tree to show how pages relate to each other:

```
App
├── / (Landing Page)
│   ├── → /movie/:id/seats (Seat Selection) [requires auth]
│   │   └── [OTP Modal] → [Confirmation]
│   └── [Auth Modal] (triggered from navbar)
├── /profile (My Bookings) [requires auth]
│   └── [Ticket Modal] (triggered from booking card)
└── /theme-studio (Design System Lab) [dev only]
```

Guidelines:
- Show which routes require authentication (mark with `[requires auth]`)
- Show modal triggers as indented children of the page that opens them
- Note any dev-only or admin-only routes

**Present to the user. Save as the "Sitemap" section in `docs/frontend-plan.md`. Wait for approval before proceeding.**

---

## Step 4: User Flow Diagrams

For each **key user action** (from Step 1, question 4), map the step-by-step flow the user walks through. Use a numbered list or Markdown flow:

### Example: "Book a Seat" Flow

```
User lands on Landing Page
    ↓
Browses movie grid → clicks a movie card
    ↓
App checks: is user logged in?
    ├── NO → Auth Modal opens → Google Sign-In → JWT stored → redirect to seat page
    └── YES → navigate to Seat Selection page
    ↓
Seat grid loads (real-time status from API)
    ↓
User clicks available seat → seat highlights as "selected"
    ↓
Clicks "Confirm Booking" button
    ↓
API call: POST /api/bookings/initiate
    ├── SUCCESS → OTP Modal opens, email sent
    └── RACE CONDITION (409) → Toast: "Seat was just taken" → seat refreshes
    ↓
User enters OTP → POST /api/bookings/verify
    ├── VALID → Booking confirmed → redirect to My Bookings
    ├── EXPIRED → Toast: "OTP expired, seat released"
    └── INVALID → Toast: "Wrong code, try again"
```

Create a flow diagram for each key action. These flows become the test script for QA and the blueprint for which components need which states.

**Present to the user. Save as the "User Flows" section in `docs/frontend-plan.md`. Wait for approval before proceeding.**

---

## Step 5: Component Inventory & Wireframe Descriptions

For each screen, list the **components** it contains and describe their layout at a low-fidelity level (no colors/fonts — just structure and content):

### Example: Landing Page

```
┌─────────────────────────────────────────────┐
│ [Navbar]                                     │
│   Logo | Movies | My Bookings | Sign In btn  │
├─────────────────────────────────────────────┤
│ [Hero Banner]                                │
│   Featured movie backdrop                    │
│   Title, tagline, "Book Now" CTA             │
├─────────────────────────────────────────────┤
│ [Movie Grid]                                 │
│   ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐      │
│   │Poster│ │Poster│ │Poster│ │Poster│      │
│   │Title │ │Title │ │Title │ │Title │      │
│   │Time  │ │Time  │ │Time  │ │Time  │      │
│   └──────┘ └──────┘ └──────┘ └──────┘      │
└─────────────────────────────────────────────┘
```

For each component, note:
- What data props it receives
- What interactive states it has (hover, selected, disabled, loading)
- What actions it triggers (navigation, API call, modal open)

**Present to the user. Save as the "Components & Wireframes" section in `docs/frontend-plan.md`. Wait for approval before proceeding.**

---

## Step 6: Frontend Phase Breakdown

Unlike backend vertical slices (which are organized by feature/domain), frontend phases are organized by **build layer**:

### Recommended Phase Sequence:

1. **Foundation & Tooling** — Project scaffold (Vite/Next.js), folder structure, routing setup, API service layer (axios/fetch wrapper), auth context/provider.

2. **Design System & Tokens** — Visual design decisions (palette, fonts, spacing, radius, shadow, motion). Handled by the `frontend-design` skill (Theme Studio) — a separate step, not part of this planning.

3. **Screen Design (Canvas)** — High-fidelity mobile/desktop artboards for the key screens and their states, critiqued and approved on a design canvas. Handled by the `design-canvas` skill. No page code yet.

4. **Core Screens (Static)** — Build the kit components, then each screen with mock/static data, matching the approved artboards 1:1. No API calls yet.

5. **State & API Integration** — Connect screens to real API endpoints. Implement loading/error/empty states as designed. Wire auth flow end-to-end.

6. **Polish & Edge Cases** — Responsive breakpoints, keyboard accessibility, error boundaries, skeleton loaders, the motion spec from the design handoff.

7. **Testing & QA** — Walk through every user flow from Step 4. Verify each happy path and error path works.

**Present the proposed phases to the user. These phases become the checklist items in `project_tracker.md`. Wait for approval.**

---

## Step 7: Implementation Standards Bridge

Before handing off to doc-generation (Step 3 in the router), inform the user:

> Your frontend planning blueprint is complete and saved in `docs/frontend-plan.md`. Three skills will guide the next steps, in this order:
>
> 1. **`frontend-design`** — Use this NEXT to decide visual direction in the Theme Studio: palette, fonts, role swaps, shape, depth and motion → one token file.
>
> 2. **`design-canvas`** — Then design the actual screens (mobile and/or desktop, with their states) on a canvas, self-critiqued and approved before any page code.
>
> 3. **`frontend-implementation`** — Use this when writing code, matching the approved screens 1:1. It enforces: 4-stage page assembly (shell → static → loading states → API wiring), 4-state async machines (idle → loading → success → error), and token linting.

**Return to the router SKILL.md to execute the shared doc-generation step.**
