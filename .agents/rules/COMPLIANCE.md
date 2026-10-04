# Compliance Documentation

> **Phiên bản:** 1.0 | **Cập nhật:** 1/9/2026

## Tổng quan

Trạm Dừng Tâm Hồn tuân thủ các nguyên tắc GDPR-inspired trong thiết kế và phát triển. Tài liệu này tổng hợp Data Processing Agreements, Data Protection Impact Assessment, và Privacy Policy.

## GDPR-inspired Principles

### 1. Data Minimization
- Chỉ thu thập dữ liệu cần thiết cho mục đích cụ thể
- Mỗi trường dữ liệu đều có mô tả mục đích
- Không lưu trữ IP gốc (chỉ lưu SHA-256 hash)

### 2. Purpose Limitation
- Dữ liệu chỉ được sử dụng cho mục đích đã đăng ký
- Consent quản lý granular cho từng loại dữ liệu
- Audit trail ghi lại mọi truy cập dữ liệu

### 3. Storage Limitation
- Retention policy mặc định:
  - Nhật ký: 10 năm
  - Mood entries: 5 năm
  - Check-in: 2 năm
  - Stories: 5 năm
  - Audit logs: 2 năm
  - Consent history: 7 năm
- Dữ liệu hết hạn sẽ được archive tự động

### 4. Right to Deletion
- User có thể xóa tài khoản hoàn toàn
- Recovery window: 7 ngày trước khi xóa vĩnh viễn
- Xác nhận qua email trước khi thực hiện

### 5. Right to Data Portability
- User có thể export toàn bộ dữ liệu
- Hỗ trợ định dạng: JSON, CSV, PDF
- Link tải có thời hạn 24 giờ

## Data Processing Agreements

### Supabase
- **Dịch vụ:** Hosting database, authentication, storage
- **Vai trò:** Data Processor
- **Cam kết:** GDPR compliant, SOC 2 Type II
- **Data Processing:** Raw data stored in EU (Frankfurt) region

### Vercel (Frontend hosting)
- **Dịch vụ:** Static site hosting
- **Vai trò:** Data Processor
- **Cam kết:** GDPR compliant
- **Data Processing:** CDN edge cache, no persistent storage

## Data Protection Impact Assessment

### Dữ liệu nhạy được xử lý
1. **Health data** — mood entries, check-in data, mental health profile
2. **Personal data** — tên, email, ngày sinh, thông tin bệnh lý
3. **Behavioral data** — journal entries, stories, interaction logs
4. **Technical data** — IP address (hashed), user agent, session info

### Rủi ro và biện pháp phòng ngừa
| Rủi ro | Mức độ | Biện pháp |
|---|---|---|
| Truy cập trái phép dữ liệu sức khỏe | Cao | RLS policies, audit logs, rate limiting |
| Data breach | Trung bình | Encryption at rest (Supabase), TLS in transit |
| Quên consent | Trung bình | Consent lifecycle management, expiry reminders |
| Lộ IP | Thấp | IP hashing (SHA-256), không lưu trữ raw IP |

### Data flow
```
User → Frontend (Vercel CDN) → API Routes (Vercel Edge) → Supabase (EU)
                                      ↓
                              Audit logs (Supabase)
```

## Audit Trail

| Loại hành động | Category | Action | Log |
|---|---|---|---|
| Đăng nhập/đăng xuất | AUTH | INSERT/UPDATE | ✅ |
| Thay đổi profile | PROFILE | UPDATE | ✅ |
| Truy cập dữ liệu y tế | HEALTH | ACCESS | ✅ |
| Thay đổi consent | CONSENT | CONSENT_CHANGE | ✅ |
| Thay đổi permissions | SHARING | INSERT/DELETE | ✅ |
| Export dữ liệu | EXPORT | EXPORT | ✅ |
| Xóa dữ liệu | DELETION | DELETE_REQUEST | ✅ |

## Retention Schedule

| Data type | Retention | Archive trước xóa |
|---|---|---|
| Journal entries | 10 năm | 11 năm |
| Mood entries | 5 năm | 5.5 năm |
| Stories | 5 năm | 5.5 năm |
| Health symptoms | 5 năm | 5.5 năm |
| Medical records | 10 năm | 11 năm |
| Audit logs | 2 năm | 2 năm |
| Consent history | 7 năm | 7.5 năm |

## Liên hệ

- **DPO (Data Protection Officer):** dpo@tramdungtamhon.org
- **Báo cáo breach:** security@tramdungtamhon.org
- **Yêu cầu data portability:** settings/data
