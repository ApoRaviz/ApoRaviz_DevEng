# DevEng Database Schema

ไฟล์นี้คือ database schema design ของ `ApoRaviz_DevEng` สำหรับ Phase 1.0.2

เป้าหมายของไฟล์นี้คือออกแบบ table, column, relationship, index, และ constraint ก่อนเริ่มเขียน database/migration จริง เพื่อให้ API contract, backend logic, และ PostgreSQL schema ใช้ข้อตกลงเดียวกัน

## Scope

MVP รอบแรกต้องรองรับ flow นี้:

```text
register ด้วย invite token
login
ส่งข้อความอังกฤษไปแปลเป็นไทยพร้อมคำอธิบาย grammar/structure
บันทึก translation history ของ user
admin สร้าง invite token ผ่าน endpoint/Postman/curl
```

Entity หลัก:

```text
User
InviteToken
Translation
```

## Design Principles

- ใช้ `uuid` เป็น primary key ของ table หลัก
- ใช้ `timestamptz` สำหรับเวลาทั้งหมด
- `created_at` เป็น server/database-owned field ไม่รับจาก frontend
- Foreign key ไป `users.id` ใช้ `ON DELETE RESTRICT / NO ACTION` ใน MVP
- ไม่ใช้ `is_active` ใน `users` ตอนนี้ เพราะยังไม่มี disable user flow
- `invite_tokens` ไม่เก็บ token ดิบ เก็บเฉพาะ `token_hash`
- Email uniqueness เช็กจาก `email_normalized`
- Validation สำคัญทำ 2 ชั้นเมื่อเหมาะสม: API validation + DB constraint

## DB Rules Vocabulary

```text
Primary Key = ตัวตนของ row
Foreign Key = ความสัมพันธ์ต้องชี้ไป row ที่มีจริง
Unique = ค่านี้ซ้ำไม่ได้
Index = สารบัญช่วยค้นหา/เรียงข้อมูลให้เร็วขึ้น
Check Constraint = ค่าต้องอยู่ในกติกาที่กำหนด
```

Delete behavior:

```text
RESTRICT / NO ACTION = ยังมีคนอ้างอยู่ ห้ามลบ
CASCADE = ลบแม่แล้วลูกหายตาม
SET NULL = ลบแม่แล้วลูกอยู่ แต่สายสัมพันธ์หาย
```

## Table: users

เก็บ user ที่ register สำเร็จแล้ว รวมถึง admin user

| Column | Type | Null | Rule | Meaning |
|---|---|---|---|---|
| `id` | `uuid` | No | Primary key | ตัวตนหลักของ user |
| `email` | `text` | No | trimmed original email | email ที่ user กรอก หลัง trim |
| `email_normalized` | `text` | No | unique | email สำหรับเทียบ uniqueness |
| `display_name` | `text` | No | 1-80 chars | ชื่อที่แสดงในระบบ |
| `password_hash` | `text` | No | server-owned | password hash ไม่เก็บ password ดิบ |
| `role` | `text` | No | check `admin` or `user` | สิทธิ์พื้นฐานของ user |
| `created_at` | `timestamptz` | No | default `now()` | เวลาที่สร้าง user |

### Email Normalization

Decision:

```text
email = email ที่ user กรอก หลัง trim
email_normalized = lower-case email หลัง trim
unique index/constraint อยู่ที่ email_normalized
```

ตัวอย่าง:

```text
" Apo@Example.com " -> email = "Apo@Example.com"
" Apo@Example.com " -> email_normalized = "apo@example.com"
```

เหตุผล:

```text
Apo@Example.com
apo@example.com
APO@example.com
```

ควรถูกมองเป็น email เดียวกันในระบบ MVP นี้

### Role Constraint

MVP ใช้ role แบบง่าย:

```text
users.role IN ('admin', 'user')
```

อนาคตถ้า RBAC ซับซ้อนขึ้น ค่อยแยกเป็น:

```text
roles
user_roles
permissions
role_permissions
```

แต่ MVP ยังไม่ต้องแตก table เพราะมีแค่:

```text
admin = สร้าง invite token ได้
user = แปลข้อความและดู history ของตัวเองได้
```

## Table: invite_tokens

เก็บ invite token สำหรับจำกัดการสมัคร

| Column | Type | Null | Rule | Meaning |
|---|---|---|---|---|
| `id` | `uuid` | No | Primary key | ตัวตนหลักของ invite token record |
| `token_hash` | `text` | No | unique | hash ของ token ดิบ |
| `expires_at` | `timestamptz` | No | API-validated future time | เวลาหมดอายุ |
| `used_at` | `timestamptz` | Yes | nullable | เวลาที่ token ถูกใช้สมัครสำเร็จ |
| `used_by_user_id` | `uuid` | Yes | FK -> `users.id` | user ที่ใช้ token นี้สมัคร |
| `created_by_admin_id` | `uuid` | No | FK -> `users.id` | admin ที่สร้าง token นี้ |
| `revoked_at` | `timestamptz` | Yes | nullable | เวลาที่ token ถูก revoke |
| `created_at` | `timestamptz` | No | default `now()` | เวลาที่สร้าง record |

### Token Hash

ไม่เก็บ token ดิบใน database

```text
token ดิบ = กุญแจจริง
token_hash = รอยพิมพ์ของกุญแจ
```

ตอน register:

```text
1. user ส่ง inviteToken มา
2. backend hash token ที่ user ส่งมา
3. backend เอา hash ไปเทียบกับ invite_tokens.token_hash
4. ถ้าตรง และยังไม่หมดอายุ/ยังไม่ถูกใช้/ยังไม่ถูก revoke -> สมัครได้
```

### Invite Token Status

Token ใช้ได้เมื่อ:

```text
token_hash match
expires_at > now()
used_at IS NULL
revoked_at IS NULL
```

Token ใช้ไม่ได้เมื่อ:

```text
ไม่มีจริง
หมดอายุ
ถูกใช้แล้ว
ถูก revoke
```

ทุกกรณีที่ token ใช้ไม่ได้ต้องตอบ API แบบเดียวกันตาม `docs/api-contract.md` เพื่อไม่เปิดช่อง token enumeration

### Expiry Validation

`expires_at` ต้องเป็นเวลาในอนาคตตอนสร้าง invite token แต่ rule นี้บังคับที่ API/service layer ไม่ใช่ DB check constraint

เหตุผล:

```text
CHECK (expires_at > now())
```

ไม่เหมาะกับ PostgreSQL เพราะ `now()` เป็นค่าที่เปลี่ยนตามเวลา ไม่ใช่ immutable function สำหรับ check constraint และ row ที่เคยถูกต้องตอน insert อาจกลายเป็นไม่ถูกต้องเมื่อเวลาผ่านไป

ดังนั้น:

```text
API/service validation = expires_at ต้องอยู่ในอนาคตตอนสร้าง
DB schema = เก็บ expires_at เป็น timestamptz NOT NULL
runtime token check = expires_at > now()
```

### Revoke

`revoke` แปลว่าเพิกถอนหรือยกเลิกสิทธิ์ไม่ให้ใช้ต่อ

```text
revoked_at = null
```

แปลว่ายังไม่ถูก revoke

```text
revoked_at = timestamp
```

แปลว่า admin ยกเลิก token นี้แล้ว

มี `id` เพื่อให้ future revoke endpoint อ้าง token record ได้โดยไม่ใช้ token ดิบหรือ `token_hash`

## Table: translations

เก็บประวัติการแปลของ user

| Column | Type | Null | Rule | Meaning |
|---|---|---|---|---|
| `id` | `uuid` | No | Primary key | ตัวตนหลักของ translation record |
| `user_id` | `uuid` | No | FK -> `users.id` | user ที่ถาม |
| `input_text` | `text` | No | check 1-1000 chars | ข้อความอังกฤษที่ user ส่งมา |
| `translated_text` | `text` | No | required | คำแปลภาษาไทย |
| `grammar_explanation` | `text` | No | required | คำอธิบาย grammar/structure |
| `created_at` | `timestamptz` | No | default `now()` | เวลาที่สร้าง translation |

### Input Length Constraint

API contract จำกัด `inputText` ที่ 1-1000 characters

Schema ควรมีกติกา DB ซ้ำ:

```text
char_length(input_text) BETWEEN 1 AND 1000
```

เหตุผล:

```text
API validation = กันตั้งแต่ประตูหน้า
DB check constraint = กันชั้นสุดท้าย เผื่อ bug, seed script, หรือ future endpoint
```

## Relationships / Foreign Keys

```text
translations.user_id
-> users.id
ON DELETE RESTRICT / NO ACTION
```

แปลว่า translation ต้องเป็นของ user ที่มีอยู่จริง และห้ามลบ user ถ้ายังมี translation history อ้างอยู่

```text
invite_tokens.created_by_admin_id
-> users.id
ON DELETE RESTRICT / NO ACTION
```

แปลว่า invite token ต้องรู้ว่า admin user คนไหนสร้าง และห้ามลบ admin ถ้ายังมี token audit อ้างอยู่

```text
invite_tokens.used_by_user_id
-> users.id
ON DELETE RESTRICT / NO ACTION
```

แปลว่าเมื่อ token ถูกใช้แล้ว ต้องรู้ว่า user คนไหนใช้ และห้ามลบ user ถ้ายังมี token usage audit อ้างอยู่

## Indexes / Constraints

### users

```text
PRIMARY KEY (id)
UNIQUE (email_normalized)
CHECK (role IN ('admin', 'user'))
CHECK (char_length(display_name) BETWEEN 1 AND 80)
```

### invite_tokens

```text
PRIMARY KEY (id)
UNIQUE (token_hash)
FOREIGN KEY (created_by_admin_id) REFERENCES users(id) ON DELETE RESTRICT / NO ACTION
FOREIGN KEY (used_by_user_id) REFERENCES users(id) ON DELETE RESTRICT / NO ACTION
CHECK ((used_at IS NULL) = (used_by_user_id IS NULL))
```

`used_at` และ `used_by_user_id` ต้องไปด้วยกัน:

```text
used_at IS NULL และ used_by_user_id IS NULL
= token ยังไม่ถูกใช้

used_at IS NOT NULL และ used_by_user_id IS NOT NULL
= token ถูกใช้แล้วและรู้ว่า user คนไหนใช้
```

### translations

```text
PRIMARY KEY (id)
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT / NO ACTION
CHECK (char_length(input_text) BETWEEN 1 AND 1000)
INDEX (user_id, created_at DESC)
```

`INDEX (user_id, created_at DESC)` supports:

```sql
SELECT *
FROM translations
WHERE user_id = :user_id
ORDER BY created_at DESC
LIMIT 20;
```

ภาพจำ:

```text
index(created_at) = ชั้นวางเรียงตามเวลา แต่ปนของทุกคน
index(user_id, created_at) = ชั้นวางแยกเจ้าของก่อน แล้วเรียงเวลาข้างใน
```

## ER Diagram แบบ Text

```text
users
  id PK
  email_normalized UNIQUE
  role CHECK ('admin', 'user')

users 1 ── many translations
  translations.user_id -> users.id

users 1 ── many invite_tokens created
  invite_tokens.created_by_admin_id -> users.id

users 1 ── many invite_tokens used
  invite_tokens.used_by_user_id -> users.id
```

## Open Notes For Implementation

- เลือก UUID generation approach ตอนเขียน migration จริง
- ยืนยันว่า PostgreSQL syntax ใช้ `ON DELETE RESTRICT` หรือปล่อย default `NO ACTION` ตาม migration tool ที่เลือก
- `expires_at` ต้อง validate ว่าเป็น future time ใน API/service layer ตอนสร้าง token; ห้ามพยายามใช้ `CHECK (expires_at > now())` ใน PostgreSQL เพราะ `now()` ไม่ใช่ immutable function สำหรับ check constraint
- First admin bootstrap ต้องมาจาก seed/migration หรือ controlled setup flow เพราะ register ปกติสร้าง `role = 'user'` เสมอ แต่ `POST /invite-tokens` ต้องใช้ admin และ `invite_tokens.created_by_admin_id` เป็น `NOT NULL`
- Password hashing จะเรียนและ implement ใน Phase 1.6.3; schema ใช้ `password_hash` ตั้งแต่ตอนนี้เพื่อไม่เปิดทางเก็บ password ดิบ
- ✅ ปิดใน Step 1.0.3: การันตี "1 token ใช้ได้ 1 คน" ด้วย atomic conditional update ตอน mark token used; ถ้าไม่มี row กลับมาต้อง rollback ทั้ง transaction ดู flow และ concurrency guarantee ที่ [Sequence Diagrams](sequence-diagram.md#register-concurrency-guarantee)
- Index แบบลึก เช่น B-Tree, composite index cost, และ `EXPLAIN ANALYZE` จะเรียนละเอียดใน Step 1.3.8
