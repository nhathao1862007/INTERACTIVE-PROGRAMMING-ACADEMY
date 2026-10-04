# CODEVERSE Academy

> Nền tảng học lập trình tương tác — Biến việc học từ "đọc lý thuyết" thành "quan sát → tương tác → viết code → chạy thử → sửa lỗi"

## Tech Stack

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Validation**: Zod
- **ORM**: Drizzle ORM
- **Editor**: Monaco Editor
- **Charts**: Recharts
- **Database**: PostgreSQL

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home — Career path selection
│   ├── roadmap/           # Skill tree roadmap
│   ├── courses/           # Course listing + lessons
│   ├── algorithms/        # Algorithm visualizer
│   ├── playground/        # Code editor + execution
│   ├── exercises/        # Exercise engine
│   ├── progress/          # Progress dashboard
│   ├── projects/          # Project-based learning
│   ├── videos/            # Video lessons
│   ├── achievements/      # Gamification
│   └── profile/           # User profile
├── components/
│   ├── layout/            # Sidebar, Header
│   ├── algorithms/        # Algorithm visualizer
│   └── lessons/           # Lesson viewer
├── content/               # Educational content (seed data)
│   ├── python-course.ts
│   ├── algorithms.ts
│   └── career-paths.ts
├── db/
│   └── schema.ts          # Drizzle ORM schema
├── lib/
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript types
```

## Features (MVP)

- [x] Home với career path selection
- [x]Roadmap engine với skill tree
- [x]Python course (5 chapters, 8+ lessons)
- [x]Lesson UI với sections (concept, syntax, example, playground, quiz)
- [x]Code Playground với Monaco Editor
- [x]Algorithm Visualizer (Bubble Sort, Binary Search, Linear Search)
- [x]Exercise engine (multiple choice, predict output)
- [x]Progress tracking dashboard
- [x]Achievements system
- [x]Projects listing
- [x]Video lessons listing

## Roadmap

### Phase 1 (MVP) — Done
- Core layout + navigation
- Python course với 8+ lessons
- Algorithm visualizer (3 algorithms)
- Code playground
- Exercise engine
- Progress tracking

### Phase 2
- C++ course
- JavaScript course
- Data structures visualizer
- More algorithms (Merge Sort, Quick Sort, BFS, DFS)
- User authentication
- Real code execution sandbox

### Phase 3
- Java, TypeScript, SQL courses
- Project submission system
- Cross-language comparison
- Concept graph
- Search system

### Phase 4
- AI learning assistant
- Advanced sandbox
- Collaboration features
- Leaderboard
- Certificates

## Database

See [DATABASE.md](./DATABASE.md) for full schema design.

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system architecture.
