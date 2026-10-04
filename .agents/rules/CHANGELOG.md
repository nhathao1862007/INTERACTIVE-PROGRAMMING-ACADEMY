# Changelog — Trạm Dừng Tâm Hồn

## [Unreleased]

### Fixed (2026-08-30)

- **Header.tsx**: sửa runtime error `TypeError: Cannot read properties of null (reading 'map')` từ `splitColor` — GSAP CSSPlugin không parse được `var(--token)` trong chuỗi màu. Màu giờ được resolve qua `getComputedStyle` thành `rgba(...)` cụ thể, tự thích ứng light/dark.
- **docs/CODING_RULES.md**: bổ sung quy tắc GSAP — cấm truyền chuỗi `var()` làm giá trị màu cho tween.

### Phase 1 — Nền tảng (2026-08-30)

**Task 1 — Architecture**
- ✅ `docs/ARCHITECTURE.md`: sơ đồ hệ thống (Mermaid), security boundaries, data flow.
- ✅ `docs/DEPLOYMENT.md`: hướng dẫn triển khai Vercel/Docker, migration workflow, backup.

**Task 2 — Database**
- ✅ Migrations `0001`–`0006`: 17 bảng, RLS toàn diện, enum, trigger, seed demo.
- ✅ `docs/DATABASE.md`: ER diagram, classification, indexing, constraints.

**Task 3 — Design System**
- ✅ Color tokens (light/dark), typography, spacing, radius, shadows.
- ✅ UI components: Button, Input, Textarea, Label, Card, Alert, Badge, Toast.
- ✅ Globals.css với CSS variables + prefers-reduced-motion.

**Task 4 — Supabase Setup**
- ✅ `config.toml` (3 storage buckets, auth config).
- ✅ Functions: `handle_user_created`, `validate_consent`, `update_audit_log`/`record_audit`, `calculate_mood_trends`.
- ✅ `seed.sql` + seed demo trong `0006`.

**Task 5 — Authentication**
- ✅ Login / Register / Forgot / Reset / Verify-email pages + Server Actions (Zod).
- ✅ Edge Middleware bảo vệ route, refresh session, role redirect.
- ✅ Hooks: `useAuth`, `useSession`, `useUser`, `useRole`.

**Task 6 — Basic Layout**
- ✅ Header (sticky + GSAP scroll effect), Footer, Sidebar, MobileMenu.
- ✅ Home page 7 sections (Hero GSAP timeline + ScrollTrigger reveals).
- ✅ Dashboard (welcome, quick actions, mood overview, recent journal).

**Task 7 — Privacy & Consent**
- ✅ `/privacy`, `/terms`, `/settings/privacy`, ConsentBanner, ConsentManager, PermissionList.
- ✅ Lib: `consent.ts`, `permissions.ts` (pure, tested).

**Task 8 — Security Hardening**
- ✅ Headers (CSP, HSTS...), CORS whitelist, sanitize (XSS), Zod schemas, rate-limit constants.

**Task 9 — Testing**
- ✅ Vitest: 30 tests pass (validation, privacy, security, auth pipeline).
- ✅ Playwright config + e2e scaffold.

**Task 10 — Documentation**
- ✅ Hoàn thiện README + docs/ (ARCHITECTURE, DATABASE, SECURITY, PRIVACY, UX, API, CODING_RULES, DEPLOYMENT, CHANGELOG, CONTRIBUTING).