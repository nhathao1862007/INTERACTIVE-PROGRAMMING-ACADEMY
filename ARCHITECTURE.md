# CODEVERSE Academy — Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │  React UI   │  │  Monaco      │  │  Algorithm    │  │
│  │  Components │  │  Editor      │  │  Visualizer   │  │
│  └──────┬──────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                │                   │          │
│         └────────────────┼───────────────────┘          │
│                          │                              │
│                    HTTP / Server Actions                 │
└──────────────────────────┼──────────────────────────────┘
                           │
┌──────────────────────────┼──────────────────────────────┐
│              Next.js 16 (App Router)                     │
│  ┌──────────────┐  ┌──────┴───────┐  ┌───────────────┐  │
│  │  Server      │  │  API Routes  │  │  Server       │  │
│  │  Components  │  │  /api/*      │  │  Actions      │  │
│  └──────┬───────┘  └──────┬───────┘  └───────┬───────┘  │
│         │                 │                   │          │
│         └─────────────────┼───────────────────┘          │
│                           │                              │
│                    Drizzle ORM                           │
└───────────────────────────┼──────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────┐
│                  PostgreSQL Database                     │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐    │
│  │ users  │ │courses │ │lessons │ │ user_progress  │    │
│  └────────┘ └────────┘ └────────┘ └────────────────┘    │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────────────┐    │
│  │exercises│ │algorithms│ │projects│ │  submissions   │    │
│  └────────┘ └────────┘ └────────┘ └────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Content Layer** (`src/content/`) — Static educational content (courses, lessons, algorithms)
2. **Database** (`src/db/schema.ts`) — User progress, submissions, achievements
3. **Server Components** — Fetch and render data on server
4. **Client Components** — Interactive UI (editor, visualizer, exercises)
5. **API Routes** — Code execution, progress updates

## Key Design Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| Rendering | Server Components + Client Islands | SEO + interactivity |
| State | Zustand | Lightweight, no boilerplate |
| Validation | Zod | Type-safe schema validation |
| ORM | Drizzle | Type-safe SQL, lightweight |
| Editor | Monaco | VS Code quality, Python support |
| Styling | Tailwind | Utility-first, fast development |

## Security

- Code execution runs in isolated sandbox (mock in MVP, real sandbox in Phase 2)
- All user input validated with Zod
- Database queries parameterized via Drizzle ORM
- No sensitive data exposed to client

## Performance

- Static generation for content pages
- Dynamic rendering for user-specific pages
- Monaco Editor loaded dynamically (lazy)
- Algorithm visualizer uses CSS transitions (GPU accelerated)
- Code splitting per route
