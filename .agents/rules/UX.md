# UX & Design System — Trạm Dừng Tâm Hồn

> Phiên bản: 1.0.0 · Cập nhật: 2026-08-30

## 1. Nguyên tắc UX

1. **Calm by default**: màu dịu, spacing rộng, không gấp gáp.
2. **Không phán xét**: ngôn ngữ luôn "khuyến khích", không tạo áp lực.
3. **Riêng tư hiển nhiên**: mọi dữ liệu hướng dẫn là PRIVATE; chỉ công khai khi chủ động.
4. **Giảm nhận thức tải**: 1 nhiệm vụ chính mỗi màn hình.
5. **Accessibility**: WCAG AA+, tôn trọng `prefers-reduced-motion`.

## 2. Color System (Calm Modern Mental Health)

Light & Dark mode qua CSS variables trong `src/app/globals.css`. Nguồn gốc hex & công cụ kiểm tra WCAG ở `src/constants/colors.ts`.

| Vai trò | Light | Dark |
|---|---|---|
| background | #FBFBF9 | #131716 |
| foreground | #1C1917 | #ECE9E4 |
| primary | #2F6B5E (xanh ngọc) | #7AB8A7 |
| accent | #EBE8F6 (oải hương) | #26243A |
| success | #2E8B57 | #58A87E |
| destructive | #D6455D | #E27083 |

Contrast: primary trên background đạt ≥ 4.5:1 (AA). Kiểm tra bằng `contrastRatio()` trong `colors.ts`.

## 3. Typography

- **Font**: Be Vietnam Pro (Google Fonts) — hỗ trợ tiếng Việt đầy đủ dấu.
- Scale: `xs → 7xl` trong `src/constants/typography.ts` (chi tiết line-height, letter-spacing).
- Heading dùng `font-display` (cùng font, nặng hơn), body dùng `font-sans`.

## 4. Component system (Task 3.3)

| Component | File | Ghi chú |
|---|---|---|
| Button | `src/components/ui/button.tsx` | 6 variants, 4 sizes |
| Input / Textarea | `ui/input.tsx`, `ui/textarea.tsx` | Focus ring chuẩn |
| Card / InteractiveCard | `ui/card.tsx` | Hover nâng nhẹ |
| Alert | `ui/alert.tsx` | destructive/success/info |
| Badge | `ui/badge.tsx` | 6 variants |
| Toast | `ui/toast.tsx`, `ui/toaster.tsx` | success/error/info, tự ẩn 5s |
| AuthShell | `auth/AuthShell.tsx` | Khung trang auth |

## 5. Animation (GSAP)

Tuân theo bộ skills `skills/`:

- **useGSAP** (`@gsap/react`) cho mọi animation trong React — cleanup tự động.
- **gsap.matchMedia** kiểm soát responsive + `prefers-reduced-motion` (duration 0 khi reduce).
- **ScrollTrigger** cho reveal khi cuộn; `gsap.utils.selector` để scope selector.
- Sử dụng `autoAlpha`, transform aliases (`y`, `xPercent`) — không animate layout.
- Nhịp: 0.5–0.8s, ease `power3.out` mặc định.

## 6. Spacing & layout

- Spacing scale 4px (0.25rem), tối đa 16rem — `src/constants/spacing.ts`.
- Breakpoints: xs 480, sm 640, md 768, lg 1024, xl 1280, 2xl 1440.
- Radius: 0.75rem base (`--radius`), shadows `soft`/`soft-lg`.
- Container: max-w-7xl + padding adaptive.

## 7. Empty / Loading / Error states

- **Empty**: icon + h2 + mô tả + CTA (đã dùng ở stories, hugs, journal).
- **Loading**: skeleton hoặc text "Đang tải…" (dashboard privacy).
- **Error**: Alert destructive + hướng xử lý; không lộ stack trace.