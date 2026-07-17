# DevEng API Contract

ไฟล์นี้คือ API contract ของ `ApoRaviz_DevEng` สำหรับ Phase 1.0.1

เป้าหมายของไฟล์นี้คือออกแบบ endpoint ก่อนเริ่มเขียน backend จริง เพื่อให้ frontend, backend, database schema, sequence diagram, และ test case ใช้ข้อตกลงเดียวกัน

## Design Principles

- MVP รอบแรกคือ English -> Thai เท่านั้น
- Public API ยังไม่ expose `targetLanguage`
- Backend อาจออกแบบ service layer ภายในให้รองรับ target language ในอนาคตได้ แต่ไม่เปิดเป็น request field ใน contract รอบแรก
- Response ส่งเฉพาะข้อมูลที่ client ต้องใช้
- Field ที่ backend ต้องคุมเอง เช่น `id`, `role`, `createdAt`, `isActive`, `tokenHash` ไม่รับจาก request body
- Error response ต้องมี message ที่ช่วยให้ client/debug เข้าใจเหตุผล แต่ต้องไม่ leak ข้อมูล sensitive
- Authenticated endpoints ใช้ `Authorization: Bearer <accessToken>`
- MVP รอบแรกยังไม่มี refresh token; access token หมดอายุแล้วให้ login ใหม่

## Shared Request Rules

### Authorization Header

Endpoint ที่ระบุว่า `Login required` หรือ `Admin only` ต้องส่ง header:

```text
Authorization: Bearer <accessToken>
```

ถ้าไม่มี header, token ผิด, หรือ token หมดอายุ:

```text
401 Unauthorized
```

## Endpoint Summary

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/health` | Public | เช็กว่า backend ยังตอบอยู่ |
| POST | `/auth/register` | Public | สมัครด้วย invite token และ login ให้ทันที |
| POST | `/auth/login` | Public | login ด้วย email/password |
| POST | `/invite-tokens` | Admin only | สร้าง invite token ผ่าน Postman/curl |
| POST | `/translations` | Login required | ส่งข้อความอังกฤษไปแปลและอธิบาย |
| GET | `/translations` | Login required | ดูประวัติแปลของ user ที่ login อยู่ |

## Shared Response Shapes

### Auth User

```json
{
  "id": "user_123",
  "displayName": "Apo",
  "email": "apo@example.com",
  "role": "user"
}
```

### Error Response

```json
{
  "message": "limit must be between 1 and 50",
  "error": "Bad Request",
  "statusCode": 400
}
```

Security note:

- Validation errors should explain what the client must fix.
- Login errors should use a generic message such as `Invalid email or password`.
- Token/security errors should avoid leaking sensitive state more than needed.

### Auth Response

```json
{
  "tokenType": "Bearer",
  "accessToken": "access_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_123",
    "displayName": "Apo",
    "email": "apo@example.com",
    "role": "user"
  }
}
```

Decision:

- `expiresIn` มีหน่วยเป็นวินาที
- MVP access token lifetime = 1 hour
- MVP ยังไม่มี refresh token; token หมดอายุแล้วให้ login ใหม่

## GET /health

เช็กว่า backend ยังตอบอยู่

```text
Auth: Public
Request body: none
```

Success:

```text
200 OK
```

```json
{
  "status": "ok"
}
```

Decision:

- ไม่ส่ง `timestamp` ใน walking skeleton เพราะ endpoint นี้ตอบแค่คำถามว่า backend ยังตอบอยู่ไหม
- ไม่เขียน health check ลง database

## POST /auth/register

สมัครด้วย invite token และ login ให้ทันทีเมื่อสมัครสำเร็จ

```text
Auth: Public
```

Request:

```json
{
  "inviteToken": "DEVENG-ABC123",
  "displayName": "Apo",
  "email": "apo@example.com",
  "password": "example-password"
}
```

Validation:

| Field | Rule |
|---|---|
| `inviteToken` | required, string, trimmed, non-empty |
| `displayName` | required, string, trimmed, 1-80 characters |
| `email` | required, valid email format, normalized before uniqueness check |
| `password` | required, 8-128 characters |

Success:

```text
201 Created
```

```json
{
  "tokenType": "Bearer",
  "accessToken": "access_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_123",
    "displayName": "Apo",
    "email": "apo@example.com",
    "role": "user"
  }
}
```

Errors:

| Status | Reason |
|---|---|
| 400 Bad Request | ข้อมูลขาด, รูปแบบผิด, invite token ไม่มีจริง, หมดอายุ, ถูกใช้แล้ว, หรือถูก revoke |
| 409 Conflict | email ถูกใช้แล้ว หลังจาก invite token ผ่านแล้วเท่านั้น |

Decisions:

- Register สำเร็จแล้ว login ให้ทันทีเพื่อให้ MVP flow ลื่น
- `role` ไม่อยู่ใน request body เพราะเป็น server-owned field
- `id`, `createdAt`, `isActive` เป็น server-owned fields
- Backend ต้อง mark invite token ว่า used หลังสมัครสำเร็จจริง
- Invite token ที่ใช้ไม่ได้ทุกกรณีต้องใช้ status/message เดียวกัน เพื่อไม่ให้คนเดาว่า token string ไหนเคยมีอยู่จริง
- Error message สำหรับ invite token ใช้ข้อความกลาง เช่น `Invite token is invalid or cannot be used`
- Backend ต้องตรวจ invite token ให้ผ่านก่อน แล้วค่อยตรวจ email ซ้ำ
- `409 Conflict` สำหรับ email ซ้ำเป็น UX trade-off ที่ยอมรับได้ เพราะคนที่ไม่มี valid invite token จะไม่มีทางเห็น email conflict

## POST /auth/login

Login ด้วย email/password

```text
Auth: Public
```

Request:

```json
{
  "email": "apo@example.com",
  "password": "example-password"
}
```

Validation:

| Field | Rule |
|---|---|
| `email` | required, valid email format |
| `password` | required, non-empty string |

Success:

```text
200 OK
```

```json
{
  "tokenType": "Bearer",
  "accessToken": "access_token",
  "expiresIn": 3600,
  "user": {
    "id": "user_123",
    "displayName": "Apo",
    "email": "apo@example.com",
    "role": "user"
  }
}
```

Errors:

| Status | Reason |
|---|---|
| 400 Bad Request | email/password ขาดหรือรูปแบบผิด |
| 401 Unauthorized | email หรือ password ไม่ถูก |

Decision:

- Login fail ใช้ message กลาง เช่น `Invalid email or password`
- ไม่แยก message ว่า email ไม่มีในระบบหรือ password ผิด เพื่อป้องกัน user enumeration

## POST /invite-tokens

Admin สร้าง invite token ผ่าน Postman/curl รอบแรกยังไม่มี Admin UI

```text
Auth: Login required
Role: admin only
Authorization: Bearer <accessToken>
```

Request:

```json
{
  "expiresAt": "2026-08-15T00:00:00.000Z"
}
```

Request without custom expiry:

```json
{}
```

Success:

```text
201 Created
```

```json
{
  "inviteToken": "DEVENG-ABC123",
  "expiresAt": "2026-08-15T00:00:00.000Z"
}
```

Errors:

| Status | Reason |
|---|---|
| 400 Bad Request | `expiresAt` ผิดรูปแบบหรืออยู่ในอดีต |
| 401 Unauthorized | ยังไม่ login หรือ token ไม่ถูก |
| 403 Forbidden | login แล้วแต่ไม่ใช่ admin |

Decisions:

- `expiresAt` optional
- ถ้าไม่ส่ง `expiresAt` backend ใช้ default 7 วัน
- Response ส่ง invite token ดิบกลับมาเฉพาะตอนสร้าง
- Response ไม่ส่ง `tokenHash`
- Database ต้องเก็บ `token_hash` ไม่เก็บ token ดิบ

## POST /translations

ส่งข้อความอังกฤษให้ backend แปลเป็นไทยและอธิบาย grammar/structure

```text
Auth: Login required
Authorization: Bearer <accessToken>
```

Request:

```json
{
  "inputText": "I got disconnected from the server."
}
```

Validation:

| Field | Rule |
|---|---|
| `inputText` | required, string, trimmed, 1-1000 characters |

Success:

```text
201 Created
```

```json
{
  "id": "tr_123",
  "inputText": "I got disconnected from the server.",
  "translatedText": "ฉันหลุดออกจากเซิร์ฟเวอร์",
  "grammarExplanation": "I got disconnected = ฉันถูกตัดการเชื่อมต่อหรือหลุดออกจากระบบ",
  "createdAt": "2026-07-15T10:30:00.000Z"
}
```

Errors:

| Status | Reason |
|---|---|
| 400 Bad Request | `inputText` ขาด, ว่าง, ผิดรูปแบบ, หรือยาวเกิน 1000 characters |
| 401 Unauthorized | ยังไม่ login หรือ token ไม่ถูก |

Decisions:

- Request ใช้ `inputText`
- Public API ยังไม่รับ `targetLanguage`
- Default target language ของ MVP คือ Thai
- Response ไม่ส่ง `userId` เพราะ endpoint นี้เป็น user-facing endpoint ของ user ที่ login อยู่
- Phase 1 ใช้ hardcoded/stub result ก่อน Phase 2 ค่อยเสียบ AI provider จริง
- จำกัด `inputText` ตั้งแต่ contract แรกเพื่อกัน user ที่ login แล้วส่ง input ยาวเกินจนกระทบ AI provider cost/rate limit ใน Phase 2

## GET /translations

ดูประวัติแปลของ user ที่ login อยู่

```text
Auth: Login required
Authorization: Bearer <accessToken>
```

Query:

| Name | Required | Default | Max | Meaning |
|---|---|---|---|---|
| `limit` | No | 20 | 50 | จำนวนรายการที่ต้องการ |

Example:

```text
GET /translations?limit=20
```

Success:

```text
200 OK
```

```json
[
  {
    "id": "tr_124",
    "inputText": "Where is the quest marker?",
    "translatedText": "เครื่องหมายภารกิจอยู่ที่ไหน",
    "grammarExplanation": "Where is ...? = ใช้ถามตำแหน่งของสิ่งใดสิ่งหนึ่ง",
    "createdAt": "2026-07-15T11:00:00.000Z"
  },
  {
    "id": "tr_123",
    "inputText": "I got disconnected from the server.",
    "translatedText": "ฉันหลุดออกจากเซิร์ฟเวอร์",
    "grammarExplanation": "I got disconnected = ฉันถูกตัดการเชื่อมต่อหรือหลุดออกจากระบบ",
    "createdAt": "2026-07-15T10:30:00.000Z"
  }
]
```

Errors:

| Status | Reason |
|---|---|
| 400 Bad Request | `limit` ไม่ใช่ตัวเลข, น้อยกว่า 1, หรือมากกว่า 50 |
| 401 Unauthorized | ยังไม่ login หรือ token ไม่ถูก |

Decisions:

- คืนเฉพาะ history ของ user ที่ login อยู่
- Default order คือ `createdAt` descending
- ไม่เรียงด้วย `id` เป็น contract หลัก เพราะ `id` เป็น identifier ไม่ใช่ field ที่สื่อเวลาเสมอ
- ถ้า `limit` เกิน max ให้ตอบ `400 Bad Request` พร้อม reason ชัดเจน เช่น `limit must be between 1 and 50`
