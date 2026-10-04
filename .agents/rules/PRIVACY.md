# Quyền riêng tư — Trạm Dừng Tâm Hồn

> Phiên bản: 1.0.0 · Cập nhật: 2026-08-30

## 1. Triết lý

> Mặc định **PRIVATE**. Người dùng là chủ sở hữu duy nhất dữ liệu của họ.

## 2. Data classification

| Level | Ví dụ | UI hiển thị |
|---|---|---|
| PUBLIC | Stories đã duyệt, professional info | Mọi người |
| PRIVATE | Journal, mood | Chỉ chủ tài khoản |
| SENSITIVE | Mental health profile, medications | Chủ + chuyên gia được consent |
| CLINICAL | Clinical notes | Chủ + chuyên gia + audit trước |

## 3. Consent management (6 loại)

| Loại | Ý nghĩa | Vị trí quản lý |
|---|---|---|
| `consent_profile` | Hồ sơ cơ bản | /settings/privacy |
| `consent_health_data` | Dữ liệu sức khỏe | /settings/privacy |
| `consent_story` | Chia sẻ câu chuyện | /settings/privacy |
| `consent_professional_access` | Chuyên gia truy cập | /settings/privacy |
| `consent_ai_processing` | Xử lý AI | /settings/privacy |
| `consent_public_sharing` | Chia sẻ công khai | /settings/privacy |

Trạng thái: `pending → granted | denied` và `granted → revoked`. Mọi thay đổi có hiệu lực tức thì.

## 4. Access permissions (Task 7.3)

Người dùng cấp quyền xem dữ liệu cho grantee (professional/moderator/app) theo loại:
`view_journal`, `view_mood`, `view_health_profile`, `view_medications`, `view_clinical_notes`, `export_data`, `emergency_access`.

Lưu trong `access_permissions`; có `expires_at` và có thể thu hồi. Mọi grant/revoke ghi audit.

## 5. Quyền của người dùng

- **Truy cập**: xem toàn bộ dữ liệu mình tạo.
- **Sửa**: cập nhật consent, profile, thu hồi quyền.
- **Xuất dữ liệu**: tiện ích xuất JSON/CSV (phase sau).
- **Xóa tài khoản**: `ON DELETE CASCADE` xóa sạch dữ liệu; audit log giữ phi định danh.

## 6. Audit log

`audit_logs` là append-only: trigger DB chặn UPDATE/DELETE. Ghi khi:
- Đọc/ghi dữ liệu CLINICAL.
- Cấp/thu hồi access_permissions.
- Change consent status.
- Đổi lịch hẹn quan trọng.

## 7. Consent banner & signup flow

- Trang public hiển thị `ConsentBanner` (localStorage) → link `/privacy`.
- Form đăng ký bắt buộc tick đồng ý Điều khoản + Chính sách riêng tư trước khi tạo tài khoản.