# DevEng Sequence Diagrams

ไฟล์นี้คือ sequence diagram design ของ `ApoRaviz_DevEng` สำหรับ Phase 1.0.3

เป้าหมายคือกำหนดลำดับการทำงานและทางผิดพลาดของ flow หลักก่อนเริ่มเขียน backend จริง เพื่อให้ API contract, database schema, backend logic และ test case ใช้ข้อตกลงเดียวกัน

## Scope

MVP รอบแรกมี 2 user journey หลัก:

```text
ผู้ใช้ใหม่: Register -> ได้ access token -> Create Translation
ผู้ใช้เดิม: Login -> ได้ access token -> Create Translation
```

Register สำเร็จแล้ว login ให้อัตโนมัติ จึงไม่เรียก login ซ้ำทันทีหลัง register

Detailed diagram แยกเป็น 3 use case:

```text
Register
Login
Create Translation
```

## Reading Convention

```text
เวลาไหลจากบนลงล่าง
A -> B = A ส่ง request หรืองานให้ B
B --> A = B ส่งผลลัพธ์กลับ A
alt = ทางแยกตามเงื่อนไข
```

Participant หลัก:

```text
User                = ผู้ใช้ที่เริ่มเหตุการณ์
Angular             = frontend ที่รับ input และแสดงผล
NestJS              = backend ที่ตรวจ request และคุม business flow
Translation Service = ตัวสร้างผลแปล (stub ใน Phase 1, AI abstraction ใน Phase 2)
PostgreSQL           = database ที่เก็บ user, invite token และ translation
```

## Register

```text
User -> Angular:
กรอก inviteToken, displayName, email, password แล้วกดสมัคร

Angular -> NestJS:
POST /auth/register

NestJS -> NestJS:
validate request และ hash invite token

NestJS -> PostgreSQL:
ตรวจว่า token hash match, ยังไม่หมดอายุ, ยังไม่ถูกใช้ และไม่ถูก revoke

alt token ใช้ไม่ได้
  PostgreSQL --> NestJS:
  token ไม่ผ่าน

  NestJS --> Angular:
  400 Invite token is invalid or cannot be used

else token ผ่านประตูแรก
  NestJS -> NestJS:
  normalize email

  NestJS -> PostgreSQL:
  ตรวจ email_normalized ซ้ำ หลัง token ผ่านแล้วเท่านั้น

  alt email ซ้ำ
    PostgreSQL --> NestJS:
    email มีอยู่แล้ว

    NestJS --> Angular:
    409 Conflict

  else email ยังไม่ซ้ำ
    NestJS -> NestJS:
    เตรียม password_hash และ user id

    NestJS -> PostgreSQL:
    BEGIN transaction

    NestJS -> PostgreSQL:
    INSERT user โดย role = user

    alt unique constraint พบ email ซ้ำจาก concurrent request
      PostgreSQL --> NestJS:
      unique conflict

      NestJS -> PostgreSQL:
      ROLLBACK

      NestJS --> Angular:
      409 Conflict

    else สร้าง user ใน transaction สำเร็จ
      NestJS -> PostgreSQL:
      conditional UPDATE token
      SET used_at และ used_by_user_id
      เฉพาะเมื่อ token ยังใช้ได้

      alt UPDATE ได้ 0 row
        PostgreSQL --> NestJS:
        token ถูก request อื่นใช้ตัดหน้า หรือใช้ไม่ได้แล้ว

        NestJS -> PostgreSQL:
        ROLLBACK user ที่เพิ่งสร้าง

        NestJS --> Angular:
        400 Invite token is invalid or cannot be used

      else UPDATE token สำเร็จ 1 row
        NestJS -> PostgreSQL:
        COMMIT

        NestJS -> NestJS:
        สร้าง access token อายุ 1 ชั่วโมง

        NestJS --> Angular:
        201 Created + auth response

        Angular --> User:
        สมัครและเข้าสู่ระบบสำเร็จ
      end
    end
  end
end
```

### Register Concurrency Guarantee

การตรวจ token รอบแรกเป็นเพียงประตูป้องกันไม่ให้ผู้ที่ไม่มี valid token เห็นสถานะ email แต่ยังป้องกัน concurrent request ไม่ได้

การตรวจ email ซ้ำก่อนเริ่ม transaction เป็น UX fast-path เพื่อแจ้ง `409 Conflict` ได้เร็วขึ้นเท่านั้น ตัวรับประกันจริงว่า email ซ้ำไม่ได้คือ `UNIQUE (email_normalized)` ตอน `INSERT` เพราะ concurrent request อาจผ่านการตรวจรอบแรกพร้อมกันได้

การรับประกันว่า 1 token ใช้ได้ 1 คนเกิดจาก:

```text
conditional UPDATE = มี request เดียว update token row สำเร็จ
row-level lock      = request ที่แตะ token row เดียวกันต้องรอคิว
transaction         = request ที่แพ้ rollback user ที่เพิ่งสร้าง
```

ถ้า request แรก rollback แทน commit request ถัดไปยังมีโอกาส update token สำเร็จได้ เพราะสถานะ used ไม่ถูกบันทึกถาวร

## Login

```text
User -> Angular:
กรอก email/password แล้วกด login

Angular -> NestJS:
POST /auth/login

NestJS -> NestJS:
validate request และ normalize email

alt request ขาดหรือรูปแบบผิด
  NestJS --> Angular:
  400 Bad Request

else request ผ่าน validation
  NestJS -> PostgreSQL:
  ค้นหา user ด้วย email_normalized

  PostgreSQL --> NestJS:
  user record หรือไม่พบ user

  NestJS -> NestJS:
  verify password กับ password_hash

  alt ไม่พบ user หรือ password ไม่ตรง
    NestJS --> Angular:
    401 Invalid email or password

  else ยืนยันตัวตนสำเร็จ
    NestJS -> NestJS:
    สร้าง access token อายุ 1 ชั่วโมง

    NestJS --> Angular:
    200 OK + auth response

    Angular --> User:
    เข้าสู่ระบบสำเร็จ
  end
end
```

Login ใช้ข้อความกลางเดียวกันสำหรับ email ไม่มีจริงและ password ผิด เพื่อไม่เปิดช่อง user enumeration

## Create Translation

```text
User -> Angular:
พิมพ์ประโยคอังกฤษแล้วกดแปล

Angular -> NestJS:
POST /translations
Authorization: Bearer accessToken
Body: { inputText }

NestJS -> NestJS:
verify access token

alt token ไม่มี ผิด หรือหมดอายุ
  NestJS --> Angular:
  401 Unauthorized

  Angular --> User:
  แจ้งให้ login ใหม่

else token ใช้ได้
  NestJS -> NestJS:
  validate และ trim inputText ให้มีความยาว 1-1000 characters

  alt inputText ไม่ผ่าน
    NestJS --> Angular:
    400 Bad Request พร้อม validation message

    Angular --> User:
    แสดงข้อความที่ช่วยแก้ input

  else inputText ผ่าน
    NestJS -> Translation Service:
    ขอผลแปลและคำอธิบาย

    Translation Service --> NestJS:
    translatedText + grammarExplanation

    NestJS -> PostgreSQL:
    บันทึก input, result และ user_id จาก access token

    PostgreSQL --> NestJS:
    translation record พร้อม id และ created_at

    NestJS --> Angular:
    201 Created + translation response

    Angular --> User:
    แสดงคำแปลและคำอธิบาย
  end
end
```

### Translation Ownership

Request body รับเฉพาะ `inputText` และไม่รับ `userId`

```text
inputText  = มาจาก user และต้อง validate
user_id    = มาจาก access token ที่ verify แล้ว
created_at = database สร้างเอง
```

Phase 1 ใช้ stub result ใน `Translation Service` ก่อน Phase 2 จึงค่อยเชื่อม external AI provider ผ่าน abstraction layer

## Design Checklist

- ตรวจ authentication ก่อนทำงานของ protected endpoint
- validate input ก่อนใช้ service หรือ database
- ไม่เชื่อ server-owned field จาก request body
- ไม่ตอบ success ก่อน database commit/save สำเร็จ
- ใช้ข้อความกลางเมื่อ error detail อาจ leak sensitive state
- ใช้ transaction และ conditional update เมื่อหลาย record ต้องถูกต้องเป็นชุดเดียวและมี concurrent request ได้
