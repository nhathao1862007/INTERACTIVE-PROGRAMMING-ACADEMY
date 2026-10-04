# Coding Rules — Trạm Dừng Tâm Hồn

> Áp dụng cho mọi thành viên & AI agents làm việc trong repo này.

## 1. Ưu tiên

**Security > Privacy > UX > Performance** (xem docs/SECURITY.md, docs/PRIVACY.md).

## 2. Bắt buộc

- [ ] Mỗi component/file đều có **comment header** mô tả mục đích (`@module`).
- [ ] Mọi thay đổi database → **migration mới** trong `supabase/migrations/`.
- [ ] Mọi bảng mới → **bật RLS** ngay trong migration.
- [ ] Mọi input từ người dùng → **Zod schema** trước khi lưu.
- [ ] Không **hard-code secrets**; dùng `.env.local` (gitignored).
- [ ] Test trước khi merge: `npm test`, `npm run typecheck`, `npm run lint`.

## 3. Cấu trúc thư mục

```
src/
├── app/         # Next.js App Router (route groups: (auth), (marketing))
├── components/  # UI tách theo nhóm (ui/, layout/, auth/, home/, privacy/)
├── constants/   # Hằng số: routes, colors, typography, spacing, validation
├── hooks/       # Custom hooks (auth, session, user, role)
├── lib/         # Services: auth, supabase, privacy, security, validation, gsap
├── schemas/     # Zod schemas theo domain (user, journal, story, privacy...)
└── types/       # TypeScript types
```

## 4. Quy ước code

- TypeScript **strict**; alias `@/*` → `./src/*`.
- Component client phải có `"use client"` ở dòng đầu.
- Server Actions đặt trong file có `"use server"` (vd `src/lib/auth/auth.ts`).
- Không dùng `any` (trừ khi bất khả kháng, kèm comment `eslint-disable`).
- Đặt tên: camelCase cho hàm/biến, PascalCase cho component, kebab-case folder.
- Vietnamese trong UI/comment; tiếng Anh cho tên mã nguồn.

## 5. Animation (GSAP)

- Luôn dùng `useGSAP()` + `scope`; cleanup tự động (skill gsap-react).
- Tôn trọng `prefers-reduced-motion` qua `gsap.matchMedia()`.
- ScrollTrigger chỉ trên top-level tween/timeline; gọi `refresh()` sau thay đổi layout.
- Không để `markers: true` trong production.
- **Không truyền chuỗi chứa `var(--token)` làm giá trị màu** cho tween GSAP — CSSPlugin không parse được (`splitColor` trả về `null` → crash `reading 'map'`). Resolve bằng `getComputedStyle(...)` rồi truyền `rgb()/rgba()/hex` cụ thể (xem `Header.tsx`).

## 6. Git & Review

- Commit nhỏ theo task (vd `feat(db): add mood_entries rls`).
- PR: mô tả thay đổi + checklist bảo mật.
- Cập nhật docs khi hành vi thay đổi (README, ARCHITECTURE, DATABASE, SECURITY...).