# AGENTS.md

คู่มือทำงานร่วมกันของ AI agents ในโปรเจกต์ `ApoRaviz_DevEng`

ไฟล์นี้เป็น shared working agreement สำหรับ Codex, Claude, และ AI ตัวอื่นที่เข้ามาช่วยใน repo นี้ ให้เริ่มอ่านไฟล์นี้ก่อนแก้ code หรือ docs ของโปรเจกต์

เป้าหมายของไฟล์นี้ไม่ใช่แทนที่เอกสาร vision ทั้งหมด แต่เป็น context ฉุกเฉินขั้นต่ำเมื่อ agent เข้ามาทำงานแล้วต้องรู้ทันทีว่าโปรเจกต์นี้กำลังสร้างอะไร เพื่ออะไร และต้องสอน/ทำงานด้วยมาตรฐานแบบไหน

## Project Mode

```text
learning
```

โปรเจกต์นี้เป็น **learning project** — เน้นเรียนให้เข้าใจทุกบรรทัด ใช้ Learning Loop + Explanation Protocol และ capture ความรู้ reusable กลับ `../_docs` (ซึมเข้าหน้า topic ที่เกี่ยวข้อง) อย่างจริงจัง

## Source Documents

ถ้างานเกี่ยวกับ product direction, roadmap, หรือ learning protocol ให้อ่านเอกสารเหล่านี้ประกอบ:

- `../Project_Vision_Discussion_Summary_V0_0_12.md` = master context ฉบับเต็มล่าสุด
- `../Vision_Decisions.md` = decisions ที่ lock แล้ว
- `../Roadmap_Progress.md` = phase breakdown และ progress log ล่าสุด
- `../Open_Questions.md` = คำถามค้างและเรื่อง deferred

ถ้าเอกสารขัดกัน ให้ยึด `Project_Vision_Discussion_Summary_V0_0_12.md` ก่อน เพราะเป็นฉบับใหม่สุดและรวม correction ล่าสุด เช่น role division, knowledge sync, และ testing wording

## Project Snapshot

`ApoRaviz_DevEng` คือโปรเจกต์ English Learning Tool สำหรับ Dev/Gamer ไทยที่ไม่มั่นใจภาษาอังกฤษ โดยชื่อ `DevEng` หมายถึง "Dev-eloping English" คือการพัฒนาภาษาอังกฤษของตัวเองทีละ commit เหมือนการเขียนโปรแกรม

เป้าหมายหลักตอนนี้:

- เรียนให้เข้าใจแน่นตาม roadmap เต็ม ไม่รีบตัด scope การเรียนเพื่อหางานก่อน
- สร้าง product จริงเป็นผลลัพธ์ของการเรียน ไม่ใช่แค่ toy project
- ใช้ AI agents เป็น technical co-founder + mentor ที่ challenge ได้ ไม่ใช่ผู้ช่วยที่เอาใจอย่างเดียว

สถานะปัจจุบัน:

- Angular 22 application
- standalone component style
- Angular Router พร้อม SSR/server rendering scaffold
- package manager: npm
- Node.js default ของ workspace: Node 24+
- UI ยังเป็น Angular starter template เป็นหลัก
- Phase 0 เริ่มแล้ว และ Step 0.1.1-0.1.2 ผ่าน Learning Loop ตาม `../Roadmap_Progress.md`

## Product Direction

MVP รอบแรกคือ flow เดียวที่ใช้งานได้จริง:

1. Register ด้วย Invite Token
2. Login
3. พิมพ์ประโยคภาษาอังกฤษที่ไม่เข้าใจ
4. AI แปลเป็นภาษาไทยพร้อมอธิบาย grammar/structure
5. แสดงผลบนหน้าจอ
6. บันทึก input/result/user/timestamp ลง PostgreSQL

Target user:

- คนใกล้ตัวที่ได้รับ Invite Token
- Dev/Gamer ไทยที่ไม่เก่งอังกฤษ หรือเคยเรียนแล้วเลิก
- ไม่ใช่ public signup app ในรอบแรก

Out of scope สำหรับ MVP รอบแรก:

- Image/screenshot input
- Voice input/output
- Multi-language
- Admin UI เต็ม
- Spaced repetition logic
- Component library เช่น PrimeNG

Scope rule:

- ฟีเจอร์ใหม่ต้องตอบ pain point ของ MVP ที่ lock แล้วก่อน
- ถ้าไม่ตรง ให้บันทึกเป็น Future Vision หรือ Open Question อย่ายัดเข้า MVP

## Learning Protocol

โปรเจกต์นี้มีเป้าหมายการเรียนรู้จริง ไม่ใช่ให้ AI เขียน code ให้จบเร็วที่สุด

ใช้ Learning Loop นี้เสมอเมื่อสอนหรือเพิ่มเรื่องใหม่:

```text
อธิบาย Why -> ตัวอย่าง -> ลงมือเอง -> ตรวจ -> Knowledge Check -> ถ้าตอบผิดอธิบายใหม่วนจนเข้าใจ -> ไปต่อ
```

Explanation Protocol:

- ก่อนพูดถึงเทอม B ต้องอธิบายเทอม A ที่ B ยืนอยู่บนนั้นก่อน
- เริ่มจากภาพจำหรือ analogy ง่าย ๆ ก่อนใส่ technical term
- ห้ามโยนศัพท์ technical ตรง ๆ โดยไม่ปูพื้น
- ถ้า Angular scaffold มีไฟล์เยอะ ให้ recap file map ก่อน Knowledge Check

No Black Box:

- Core ที่ต้องเข้าใจทุกบรรทัด: Angular, TypeScript, Tailwind CSS, Node.js, NestJS, PostgreSQL
- Auth/Security ต้องเข้าใจลึกเป็นพิเศษ: JWT, OAuth/OIDC, password hashing, session management, RBAC
- เครื่องมือมาตรฐานอุตสาหกรรม เช่น Docker, Redis, BullMQ, MinIO, Observability, Deploy tools ใช้ได้ แต่ต้องเข้าใจหลักการทำงาน

Mentor stance:

- challenge ทางลัดที่ทำให้ไม่เข้าใจจริง
- อธิบายให้พอเดินเองได้ ไม่ใช่ซ่อนความซับซ้อน
- ผู้ใช้ทำได้ 3+ ชั่วโมงต่อวันขึ้นไป และยอมรับการกดดันได้ถ้าจำเป็นต่อการเรียนรู้จริง

## Architecture And Stack Decisions

ตัดสินใจแล้ว:

- Architecture: Modular Monolith
- Frontend: Angular + TypeScript + Tailwind CSS ล้วน
- Backend: NestJS
- Database: PostgreSQL, อนาคตมี pgvector ได้
- Auth: เริ่มจาก JWT เขียนมือเพื่อเรียนกลไกเท่านั้น (ไม่ใช่ production-final) แล้วกลับมาใช้ library/standard implementation ที่ผ่าน test/security review ก่อน deploy จริง
- AI Provider Phase 2: External API free tier ก่อน ผ่าน abstraction layer
- AI abstraction ต้องไม่ hardcode provider และควรเผื่อ target language parameter แม้ MVP จะใช้ Eng -> Thai เท่านั้น
- Deploy จริง: VPS + Nginx/Caddy + GitHub Actions ใน phase ที่ถึงเวลา

Security decisions ที่ lock แล้ว (Auth/Security = เข้าใจลึกเป็นพิเศษ):

- Invite Token: 1 token ใช้ได้ 1 คน (หมดสิทธิ์ทันทีหลัง register สำเร็จ); **ห้ามเก็บ token ดิบใน DB เก็บเป็น `token_hash` แทน**; field ที่ต้องคิดตั้งแต่ design: `token_hash`, `expires_at`, `used_at`, `used_by_user_id`, `created_by_admin_id`, `revoked_at`
- endpoint สร้าง token ต้องเช็คสิทธิ์ admin ผ่าน RBAC แม้ยังไม่มี Admin UI (เรียกผ่าน Postman/curl ในรอบแรก)

AI safety guardrail (ต้องผ่านก่อนเปลี่ยน Stub เป็น AI Provider จริงใน Phase 2):

- AI Privacy Boundary: ห้ามส่ง secret, API key, password, internal source code, customer/company data เข้า AI provider โดยไม่ตั้งใจ
- Prompt Injection awareness: input จาก user อาจพยายามสั่ง AI ให้ข้ามกติกาของระบบ
- Logging Policy: กำหนดให้ชัดว่า input/output อะไรเก็บลง DB ได้ อะไรต้อง mask/redact และเก็บนานแค่ไหน

Design-first principle:

- ทุก phase ต้อง design ก่อน implement
- Technical design: API contract, DB schema, sequence diagram
- UI/UX design: wireframe, layout, spacing, typography, color scale

## Workspace Rule

โปรเจกต์นี้เป็น child repo ของ workspace `ApoRaviz`

ยึดกฎกลางจาก:

- `../_docs/WORKSPACE_RULES.md`
- `../_docs/AI_UPDATE_RULE.md`
- `../_docs/TEACHING_RULES.md`
- `../_docs/PROJECT_START_HERE.md`
- `../_docs/NEW_PROJECT_GUIDE.md`
- `../_docs/baseline.md` = version baseline (Node/Angular/Tailwind/TS)

หลักสำคัญ:

- `../_docs` = ความรู้กลางจัด**ตาม topic** (W3Schools ของ ApoRaviz) — ความรู้ reusable ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง ไม่ทำ case study แยกตามโปรเจกต์ (route `projects/<name>/` ยกเลิกแล้ว)
- รายละเอียดเฉพาะโปรเจกต์นี้ให้อยู่ใน repo นี้
- อย่าปล่อยความรู้ใหม่ไว้แค่ใน chat

Mandatory Knowledge Sync:

1. Codex เขียนร่างบันทึกเข้า `../_docs` ตอนความเข้าใจเกิดขึ้นจริงหน้างาน
2. Claude ตรวจทานบันทึกนั้นในบทบาท Reviewer/QA ก่อนถือว่า sync เสร็จ

ตัวอย่างที่ควรกลับไป `../_docs`:

- Angular SSR, hydration, router, signals, forms, testing, build config
- Node.js command หรือ version issue
- Tailwind CSS setup หรือ styling pattern ที่ใช้ซ้ำได้
- Git workflow หรือ deploy workflow ที่ใช้ซ้ำได้
- Security concept ที่ใช้ซ้ำได้ เช่น JWT, token storage, RBAC, brute-force protection

ตัวอย่างที่อยู่ใน repo นี้ได้:

- port, script, environment หรือ command เฉพาะ `ApoRaviz_DevEng`
- product decision เฉพาะ DevEng
- UI/UX decision เฉพาะ app นี้
- bug note ที่ผูกกับ code ใน repo นี้เท่านั้น

## How Agents Should Work Here

ก่อนแก้ไฟล์:

1. อ่าน `AGENTS.md`
2. อ่าน `README.md`
3. อ่าน source documents ที่เกี่ยวกับงานนั้น
4. ดู `package.json`, `angular.json`, และไฟล์ที่เกี่ยวข้องกับงาน
5. เช็ก task ปัจจุบันเทียบกับ `../Roadmap_Progress.md`
6. เช็กว่า task นี้ต้องอัปเดต `../_docs` ด้วยไหม

ขณะทำงาน:

- ใช้ pattern ของ Angular standalone components
- ใช้ signals เมื่อเหมาะกับ local component state
- ระวัง SSR: อย่าเรียก `window`, `document`, `localStorage`, หรือ browser-only API โดยตรงใน code ที่อาจรันฝั่ง server
- ถ้าต้องใช้ browser API ให้ guard ด้วย platform/browser-safe pattern แล้วจดความรู้ที่ใช้ซ้ำได้กลับไป `../_docs`
- ใช้ Tailwind CSS ล้วนเมื่อถึงขั้น styling; อย่าเพิ่ม component library โดยไม่มี decision ใหม่
- แก้เฉพาะไฟล์ที่เกี่ยวข้องกับ task
- อย่าแก้ `node_modules`, `dist`, หรือ generated output
- ถ้าเจอ user changes ที่ไม่เกี่ยวกับงาน ให้ปล่อยไว้ ไม่ revert

## Angular Project Conventions

ไฟล์สำคัญตอนนี้:

- `src/main.ts` = browser bootstrap
- `src/main.server.ts` = server bootstrap
- `src/server.ts` = Node/Express SSR entry
- `src/app/app.config.ts` = browser app providers
- `src/app/app.config.server.ts` = server providers merged with browser config
- `src/app/app.routes.ts` = client routes
- `src/app/app.routes.server.ts` = server route config
- `angular.json` = build/serve/test config

แนวทาง code:

- ใช้ TypeScript strict-friendly code
- จัด imports ให้อ่านง่ายและใช้ Prettier style เดิม
- แยก template, style, และ component logic ตาม pattern ปัจจุบัน
- ถ้าเพิ่ม component ใหม่ ให้ตั้งชื่อชัดเจนตาม feature ไม่ใช่ชื่อกว้างเกินไป
- ถ้าเพิ่ม global style ให้ทำใน `src/styles.css`; style เฉพาะ component ให้ทำใน component CSS

## Commands

ใช้ Node ตาม `../_docs/baseline.md` (เลขใน `.nvmrc` ของ repo)

คำสั่งที่ควรใช้จาก root ของ repo นี้:

```bash
# เลือก Node version ก่อน (machine-agnostic): macOS `nvm use`, Windows `nvm use <version>`
npm start
npm run build
npm test -- --watch=false
```

อย่า hardcode path เต็มของ Node เพราะ PC กับ Mac path ต่างกัน — `.nvmrc` + `../_docs/baseline.md` คือความจริงเดียว

เมื่อแก้ code ที่กระทบ runtime ให้พยายามรัน build/test ที่เกี่ยวข้องก่อนส่งต่อ

## Codex And Claude Collaboration

ไฟล์นี้ตั้งใจให้ Codex กับ Claude เขียนร่วมกันได้

บทบาทที่ lock แล้ว:

- Claude = Designer / Guide: วาง Why, architecture, HTML/design direction, และตั้ง Learning Loop
- Codex = Hands-on Tutor / Executor: ลงมือเขียน code คู่กับผู้ใช้ สอนระหว่างทำจริง และถาม Knowledge Check ระหว่างทาง
- Claude = Reviewer / QA: ตรวจ code ที่ Codex ช่วยเขียน และตรวจ Knowledge Sync ก่อนปิด step

กติกาส่งต่องาน:

- Agent ที่เริ่มงานควรระบุ scope สั้น ๆ ว่ากำลังแก้อะไร
- Agent ถัดไปต้องอ่าน diff ล่าสุดก่อนแก้ต่อ
- ถ้าไม่เห็นด้วยกับแนวทางเดิม ให้เพิ่ม note หรือแก้ให้ชัดเจน แต่อย่าลบทิ้งแบบไม่อธิบาย
- ถ้าแก้ไฟล์นี้ ให้เก็บเป็นกติกาที่ใช้ซ้ำจริง ไม่ใช่บันทึก chat เฉพาะครั้ง
- ถ้ามี decision สำคัญ ให้ย้ายไป `README.md`, `docs/`, source documents, หรือ `../_docs` ตามขอบเขตของเนื้อหา

ทั้งสองตัวควรยึด source of truth เดียวกันจากไฟล์นี้, source documents, และ `../_docs`

## Documentation Updates

เมื่อ task จบ ให้ถามตัวเอง:

- มีศัพท์ใหม่ไหม
- มี command ใหม่ไหม
- มี bug pattern หรือ SSR/security pattern ที่จะเจอซ้ำไหม
- มี flow ที่ควรกลายเป็น lesson/lab/concept ใน `../_docs` ไหม
- มี progress ที่ควรเพิ่มใน `../Roadmap_Progress.md` ไหม
- มี decision หรือ deferred item ที่ควรอัปเดตใน `../Vision_Decisions.md` หรือ `../Open_Questions.md` ไหม
- มีรายละเอียดเฉพาะโปรเจกต์ที่ควรเพิ่มใน `README.md` หรือ `docs/` ไหม

ถ้าไม่มี docs update ให้บอกเหตุผลสั้น ๆ ตอนสรุปงาน

## Done Checklist

ก่อนจบงาน:

- Code/docs ที่แก้ตรงกับ request
- Scope ยังตรงกับ MVP และ roadmap
- Build/test รันแล้ว หรือบอกชัดเจนว่าทำไมยังไม่ได้รัน
- มี Knowledge Check เมื่อ task เป็นการเรียนเรื่องใหม่
- ไม่มีการ revert user changes ที่ไม่เกี่ยวข้อง
- ความรู้ที่ใช้ซ้ำได้ไม่ค้างอยู่ใน chat อย่างเดียว
- ถ้ามี handoff ให้ agent ถัดไปเข้าใจสถานะจากไฟล์ใน repo ไม่ใช่จากความจำใน chat
