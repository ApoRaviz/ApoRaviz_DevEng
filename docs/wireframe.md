# DevEng Low-Fidelity Wireframe

ไฟล์นี้คือ wireframe design ของ `ApoRaviz_DevEng` สำหรับ Phase 1.0.4

เป้าหมายคือกำหนด screen map, information hierarchy, interaction และ screen states ก่อนเลือกสี/ภาพจริงและก่อนเขียน Angular component

## Scope

MVP มีหน้าจอที่ user ใช้จริง 3 state หลัก:

```text
Public
├── Login
└── Register (invite-only)

Login required
└── Translation Workspace
    ├── Translation Form
    ├── Translation Result
    └── Latest History
```

ไม่มี Admin UI ใน MVP การสร้าง invite token ใช้ endpoint ผ่าน Postman/curl

## Low-Fidelity Rule

Wireframe นี้กำหนด:

- ตำแหน่งและลำดับความสำคัญขององค์ประกอบ
- สิ่งที่ user กดและผลที่เกิดขึ้น
- loading, success, empty, validation และ auth-expired states
- desktop/mobile layout
- behavior ของ Sliding Auth Panel

Wireframe นี้ยังไม่กำหนด:

- ภาพจริง
- brand color
- font จริง
- shadow/decoration ขั้นสุดท้าย
- Tailwind utility class

กล่อง `VISUAL PANEL` เป็น placeholder ไม่ใช่ asset จริง

## Auth Shell

Login และ Register ใช้ Auth Shell เดียวกัน เพื่อให้ logo, spacing, panel และ interaction สม่ำเสมอ

### Login State — Desktop

```text
┌──────────────────────────────────────────────────────────┐
│ DevEng                                                   │
├────────────────────────────┬─────────────────────────────┤
│ Login                      │                             │
│                            │       VISUAL PANEL          │
│ Email                      │                             │
│ [________________________] │   ภาพ/ข้อความเกี่ยวกับ       │
│                            │   การพัฒนาภาษาอังกฤษ         │
│ Password             [ดู] │                             │
│ [________________________] │                             │
│                            │                             │
│ [       เข้าสู่ระบบ      ] │                             │
│                            │                             │
│ มี Invite Token? สมัคร ->  │                             │
└────────────────────────────┴─────────────────────────────┘
```

Login form รับ:

```text
email
password
```

Login fail ใช้ข้อความกลาง `Invalid email or password` ไม่บอกว่า email ไม่มีหรือ password ผิด

### Register State — Desktop

เมื่อกด `สมัคร` visual panel เลื่อนจากขวามาซ้าย และ Register form แสดงทางขวา

```text
┌──────────────────────────────────────────────────────────┐
│ DevEng                                                   │
├────────────────────────────┬─────────────────────────────┤
│                            │ Register                    │
│       VISUAL PANEL         │                             │
│                            │ Invite Token                │
│   เลื่อนมาจากฝั่งขวา       │ [________________________]  │
│                            │ Display Name                │
│                            │ [________________________]  │
│                            │ Email                       │
│                            │ [________________________]  │
│                            │ Password              [ดู] │
│                            │ [________________________]  │
│                            │                             │
│                            │ [       สมัครใช้งาน       ] │
│                            │ <- มีบัญชีแล้ว? Login       │
└────────────────────────────┴─────────────────────────────┘
```

Register form รับเฉพาะ:

```text
inviteToken
displayName
email
password
```

ไม่มี `role`, `id`, `createdAt` หรือ server-owned field ใน form

Register สำเร็จแล้วได้ access token และเข้า Translation Workspace ทันที ไม่เรียก Login ซ้ำ

### Sliding Auth Panel Behavior

```text
Login
form ซ้าย + visual ขวา

กดสมัคร
visual ขวา -> ซ้าย
Register form -> ขวา

กด Login
ทำ animation ย้อนกลับ
```

ข้อกำหนด:

- animation เป้าหมายประมาณ 300–500 ms
- ระหว่าง animation ป้องกันการกดสลับซ้ำ
- form state และ validation ของ Login/Register ไม่ปนกัน
- หลังเปลี่ยนโหมด keyboard focus ไป heading หรือ field แรกของ form ใหม่
- animation เป็น enhancement; ถ้าปิด motion form ยังต้องเปลี่ยนและ submit ได้
- ไม่เพิ่ม Apple/Google login เพราะ API contract ยังไม่มี OAuth endpoint

### Auth — Mobile/Reduced Motion

```text
DevEng
┌──────────────────────────┐
│ Login หรือ Register form │
│ เต็มความกว้าง            │
└──────────────────────────┘
link สลับโหมด
```

- mobile ย่อหรือซ่อน visual panel
- ไม่เลื่อน panel ข้ามจอ ใช้ transition เบา ๆ หรือสลับทันที
- เมื่อ user ตั้ง `prefers-reduced-motion` ให้ลด/ปิด animation

## Translation Workspace

Translation Form, Result และ History อยู่หน้าเดียวกันใน MVP

### Desktop

```text
┌───────────────────────────────────────────────────────────────┐
│ DevEng                       สวัสดี, Apo    [ออกจากระบบ]      │
├──────────────────────────────────────┬────────────────────────┤
│ ประโยคภาษาอังกฤษ                    │ ประวัติล่าสุด          │
│ ┌──────────────────────────────────┐ │                        │
│ │                                  │ │ [selected] Where is…   │
│ │                                  │ │ เครื่องหมายภารกิจ…     │
│ └──────────────────────────────────┘ │ 21 ก.ค. 2026 10:30     │
│ 0/1000                 [แปลภาษา]     │                        │
│                                      │ I got disconnected…    │
│ ผลการแปล                             │ ฉันหลุดออกจาก…          │
│ ┌──────────────────────────────────┐ │ 20 ก.ค. 2026 19:15     │
│ │ คำแปล                            │ │                        │
│ │                                  │ │ ...ล่าสุดไม่เกิน 20    │
│ │ คำอธิบาย Grammar                 │ │                        │
│ └──────────────────────────────────┘ │                        │
└──────────────────────────────────────┴────────────────────────┘
```

Information hierarchy:

```text
พื้นที่หลัก = input + result
พื้นที่รอง  = latest history
header     = product name + displayName + logout
```

ไม่ใส่ Profile button เพราะ MVP ยังไม่มี profile endpoint/page

Logout mechanism เป็น decision gate ของ Step 1.6.2:

```text
ถ้า token อยู่ใน storage ที่ frontend ควบคุมได้
-> frontend ล้าง auth state/token ได้

ถ้าเลือก httpOnly cookie
-> browser JavaScript ล้าง cookie โดยตรงไม่ได้
-> ต้องออกแบบ logout endpoint ให้ server ล้าง cookie
-> อัปเดต API contract ก่อน implement
```

Wireframe แสดงปุ่ม Logout เพราะ user ต้องมีทางออกจาก session แต่ยังไม่ lock กลไกก่อนตัดสินใจเรื่อง JWT storage

### Mobile

```text
Header
-> Translation Form
-> Translation Result
-> Latest History
```

Desktop ใช้สองคอลัมน์ ส่วน mobile เรียงเป็นหนึ่งคอลัมน์

## Translation Form States

### Initial

```text
textarea ว่าง
0/1000
ปุ่มแปล disabled
result area แสดงข้อความแนะนำ
```

### Typing / Invalid

- character counter เปลี่ยนตาม input
- ปุ่มใช้ได้เมื่อ trimmed input มีความยาว 1–1000 ตัวอักษร
- validation message อยู่ใต้ textarea

### Loading

```text
ปุ่มเปลี่ยนเป็น "กำลังแปล..." และ disabled
result เก่าถูกแทนด้วย loading state
ป้องกัน request ซ้ำ
```

### Success

- แสดง translated text และ grammar explanation
- เพิ่มรายการใหม่ไว้บนสุดของ history
- ตอบสนองหลัง database save สำเร็จแล้ว

### Token Expired

- แสดงข้อความว่า session หมดอายุ
- พา user กลับ Auth Shell ใน Login state

## History Interaction

History โหลดล่าสุด 20 รายการและเรียง `createdAt` จากใหม่ไปเก่า ตาม API contract

ถ้ายังไม่มีรายการ ให้แสดง `ยังไม่มีประวัติการแปล` แทนพื้นที่ว่าง

แต่ละรายการแสดงแบบย่อ:

```text
inputText
translatedText snippet
createdAt
```

เมื่อเลือก history item:

- highlight item ที่เลือก
- แสดง translated text และ grammar explanation ใน result area
- แสดงป้ายว่าเป็นผล `จากประวัติ`
- ไม่เขียนทับ draft ใน textarea
- ไม่เรียก API เพิ่ม เพราะ response ของ `GET /translations` มีรายละเอียดครบแล้ว

ยังไม่มี pagination/load-more ใน MVP เพราะ API contract รองรับเพียง `limit` โดย default 20 และ max 50

## Implementation Learning Map

Wireframe กำหนด behavior ตอนนี้ แต่ implementation แยกเรียนภายหลัง:

```text
Step 1.6.9  Frontend Auth Forms & State
            Login/Register form, validation, signal และ class binding

Step 1.6.10 Sliding Auth Panel & Accessible Motion
            transform, transition, focus management,
            responsive fallback และ prefers-reduced-motion

Step 1.7.2  เชื่อม Auth UI -> backend -> protected translation flow
```

การเพิ่ม 1.6.9–1.6.10 เพิ่มเวลาประมาณ 2 Learning Loops แต่ไม่เพิ่ม API, database หรือ product feature นอก MVP

## Out Of Scope

- Admin UI
- Public signup ที่ไม่ใช้ invite token
- OAuth/social login
- Profile/Edit Account
- Theme switch
- Pagination/full history page
- สี ภาพ และ typography ขั้นสุดท้าย

## Design Checklist

- ทุก control มี flow รองรับใน API/sequence diagram หรือระบุ decision gate ที่ต้องปิดก่อน implement
- protected screen ไม่รับ owner id จาก user
- loading ป้องกัน submit ซ้ำ
- error message ช่วยแก้ได้โดยไม่ leak sensitive state
- desktop/mobile มี information hierarchy เดียวกัน
- motion ไม่เป็นเงื่อนไขที่จำเป็นต่อการใช้งาน
- ไม่มีปุ่มที่สัญญาฟีเจอร์นอก MVP
