# API Documentation — Trạm Dừng Tâm Hồn

> Phiên bản: 1.0.0 · Cập nhật: 2026-08-30

Kiến trúc: App Router của Next.js — **Server Actions** cho mutations, **Server Components** cho đọc dữ liệu riêng tư, **API Routes** cho endpoints công khai/webhook.

## 1. Server Actions (src/lib/auth/auth.ts)

| Action | Vào | Ra | Ghi chú |
|---|---|---|---|
| `signIn` | `{ email, password }` | error hoặc redirect `/dashboard` | Validate Zod; lỗi chung "Email hoặc mật khẩu không đúng" |
| `signUp` | `{ email, password, displayName, acceptTerms }` | error / redirect | Redirect `/verify-email` nếu bật confirm |
| `forgotPassword` | `{ email }` | error/null | Luôn trả null lỗi khi thành công để tránh user enumeration |
| `resetPassword` | `{ password, confirmPassword }` | error / redirect `/login?reset=success` | Cần recovery session |
| `signOut` | — | redirect `/` | |

Bảo mật: tất cả đều gọi `createClient()` (server, cookies) + `supabase.auth.*`; không bao giờ dùng `createBrowserClient` phía server action.

## 2. API Routes (dự kiến phase sau)

| Route | Method | Mục đích | Rate limit |
|---|---|---|---|
| `/api/stories` | GET | Feed stories đã duyệt | 60/phút |
| `/api/webhooks/supabase` | POST | Trigger xử lý nền | HMAC verify |
| `/api/export` | GET | Xuất dữ liệu người dùng | Auth + 120/phút |

## 3. Supabase functions (Postgres)

| Function | Gọi từ | Mô tả |
|---|---|---|
| `handle_user_created()` | Trigger `auth.users.insert` | Tạo profile + mental_health_profile |
| `validate_consent(type, user_id)` | RLS / server | Kiểm tra consent granted |
| `record_audit(action, resource_type, resource_id, context)` | Server Action | Ghi audit log |
| `calculate_mood_trends(user_id, days)` | Server Component | Aggregate mood theo ngày |

## 4. Error convention

- Client/Server Actions trả `{ error: string | null }` — UI hiển thị Alert.
- Validation lỗi trả theo field: `{ errors: { [field]: string } }` (từ `validate()`).
- Không bao giờ trả stack trace / thông tin nội bộ cho client.

## 5. Auth flow redirects

| Trạng thái | Trang |
|---|---|
| Chưa đăng nhập + protected | `/login?next=<path>` |
| Đã đăng nhập + auth page | `/dashboard` |
| Đăng ký thành công (confirm on) | `/verify-email` |
| Reset thành công | `/login?reset=success` |