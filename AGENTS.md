# AGENTS.md

คู่มือทำงานร่วมกันของ AI agents ในโปรเจกต์ `ApoRaviz_DevEng`

ไฟล์นี้เป็น shared working agreement สำหรับ Codex, Claude, และ AI ตัวอื่นที่เข้ามาช่วยใน repo นี้ ให้เริ่มอ่านไฟล์นี้ก่อนแก้ code หรือ docs ของโปรเจกต์

เป้าหมายของไฟล์นี้ไม่ใช่แทนที่เอกสาร vision ทั้งหมด แต่เป็น context ฉุกเฉินขั้นต่ำเมื่อ agent เข้ามาทำงานแล้วต้องรู้ทันทีว่าโปรเจกต์นี้กำลังสร้างอะไร เพื่ออะไร และต้องสอน/ทำงานด้วยมาตรฐานแบบไหน

## Default Working Mode

```text
teach
```

โปรเจกต์นี้ใช้ `teach` เป็นค่าเริ่มต้น — AI สอนระหว่างสร้าง เน้นเรียนให้เข้าใจทุกบรรทัด ใช้ Learning Loop + Explanation Protocol และ capture ความรู้ reusable กลับ `../ApoRaviz_Workspace_Docs` (ซึมเข้าหน้า topic ที่เกี่ยวข้อง) อย่างจริงจัง

## Source Documents

ถ้างานเกี่ยวกับ product direction, roadmap, หรือ learning protocol ให้อ่านเอกสารเหล่านี้ประกอบ:

- `docs/vision/Project_Vision_Discussion_Summary_V0_0_12.md` = master context ฉบับเต็มล่าสุด
- `docs/vision/Vision_Decisions.md` = decisions ที่ lock แล้ว
- `docs/vision/Roadmap_Progress.md` = phase breakdown และ progress log ล่าสุด
- `docs/vision/Open_Questions.md` = คำถามค้างและเรื่อง deferred

ถ้าเอกสารขัดกัน ให้ยึด `Project_Vision_Discussion_Summary_V0_0_12.md` ก่อน เพราะเป็นฉบับใหม่สุดและรวม correction ล่าสุด เช่น role division, knowledge sync, และ testing wording

## Project Snapshot

`ApoRaviz_DevEng` คือโปรเจกต์ English Learning Tool สำหรับ Dev/Gamer ไทยที่ไม่มั่นใจภาษาอังกฤษ โดยชื่อ `DevEng` หมายถึง "Dev-eloping English" คือการพัฒนาภาษาอังกฤษของตัวเองทีละ commit เหมือนการเขียนโปรแกรม

เป้าหมายหลักตอนนี้:

- เรียนให้เข้าใจแน่นตาม roadmap เต็ม ไม่รีบตัด scope การเรียนเพื่อหางานก่อน
- สร้างระบบฝึกที่ production-shaped และครบวงจรเป็นผลลัพธ์ของการเรียน ไม่ใช่แค่ toy project
- deploy ให้คนกลุ่มเล็กใช้จริงเพื่อฝึก operation และรับ feedback แต่ไม่ใช้ DevEng เป็นเป้าหมายขายเชิงพาณิชย์
- ใช้ AI agents เป็น technical co-founder + mentor ที่ challenge ได้ ไม่ใช่ผู้ช่วยที่เอาใจอย่างเดียว

สถานะปัจจุบัน:

- Angular 22 application ที่ root + NestJS 11 backend ใน `backend/` + ASP.NET Core bridge ใน `backend-dotnet/` (Git repo เดียว แต่แต่ละ backend มี project/dependency ของตัวเอง)
- standalone component style
- Angular Router พร้อม SSR/server rendering scaffold
- package manager: npm
- Node.js default ของ workspace: Node 24+
- UI ยังเป็น Angular starter template เป็นหลัก
- Phase 0 จบครบแล้ว และ Phase 1 เดินถึง Step 1.1.8 ตาม `docs/vision/Roadmap_Progress.md` — Step 1.1.8 (Backend E2E Test ด้วย Jest + Supertest) ผ่าน Learning Loop และ Independent Review/QA (Claude) ตามกติกา 2.4 แล้ว
- global imperative configuration ของ backend มี source of truth เดียวที่ `backend/src/configure-app.ts` (`configureApp(app)`) — `main.ts` เรียกหลัง `NestFactory.create()` ก่อน `listen()` และ E2E เรียกหลัง `createNestApplication()` ก่อน `init()`; ถ้าเพิ่ม global Pipe/Interceptor/Prefix ในอนาคต ให้เพิ่มใน `configureApp()` ไม่ใช่ใน `main.ts` โดยตรง มิฉะนั้น E2E จะไม่เห็น
- backend มี Global Exception Filter ตัวแรกที่ `backend/src/common/filters/http-exception.filter.ts` ลงทะเบียนผ่าน `configureApp()` ด้วย `app.useGlobalFilters(new HttpExceptionFilter())` (ลงทะเบียนที่เดียว ไม่ซ้ำ) — จับเฉพาะตระกูล `HttpException` ส่วน unknown `Error` ยังตกกับ Nest default handler เป็น generic 500 (ยังไม่ทำ catch-all และ `APP_FILTER` ยัง deferred)
- backend unit test: `npm test -- --runInBand` = 2 suites / 3 tests — `health.service.spec.ts` มี behavioral assertion จริง (`expect(service.getHealth()).toEqual({ status: 'ok' })`) ส่วน `health.controller.spec.ts` ยังเป็น existence test เท่านั้นและยังใช้ `HealthService` จริงใน Testing Module (Controller-level behavioral test/mock ยังไม่ได้ทำ)
- backend E2E: `npm run test:e2e` = 1 suite / 2 tests — `backend/test/health.e2e-spec.ts` ครอบ success path (`GET /health` → 200 `{"status":"ok"}`) และ error path (`GET /missing` → 404 + custom Filter shape `statusCode`/`timestamp`/`path`/`message`) ผ่าน shared `configureApp()`; ขอบเขต: ยังไม่รัน `main.ts`/`bootstrap()` จริง ไม่พิสูจน์ production port/environment และครอบเฉพาะสอง route ที่มี assertion เท่านั้น
- Step 1.1.9 แบ่งเป็นสอง checkpoint: `1.1.9-1` Foundations & Scaffold และ `1.1.9-2` Health API & Tests
- `1.1.9-1` ทำถึง controller-based ASP.NET Core Web API scaffold แล้ว: `backend-dotnet/global.json` เลือก SDK `10.0.302`, project target `net10.0`, build ผ่าน และรัน HTTP/HTTPS profile ได้; scaffold `WeatherForecast` ยังอยู่โดยตั้งใจ
- สถานะนี้เป็น checkpoint กลางบท ไม่ใช่การปิด Step 1.1.9 และยังไม่ให้ Claude stamp ว่าเสร็จ
- Step ถัดไปคือ 1.1.9-2: เปลี่ยน scaffold เป็น `GET /health`, เพิ่ม test project, รัน `dotnet test` และตรวจ behavior parity ที่จำเป็น

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

- Core ที่ต้องเข้าใจทุกบรรทัด: Angular, TypeScript, Tailwind CSS, Node.js, NestJS, C#/.NET/ASP.NET Core, PostgreSQL
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
- Backend หลักระหว่างสร้าง Nest MVP: NestJS ใน `backend/`
- ASP.NET Core bridge: controller-based Web API ใน `backend-dotnet/`; หลัง Nest MVP เสร็จจะกลับมาทำ behavior parity ของ MVP เพื่อเรียน C#/.NET ควบคู่กัน
- Frontend มี Angular application เดียวและเลือก backend ด้วย API base URL/configuration ไม่สร้าง frontend แยกตาม framework
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

- `../ApoRaviz_Workspace_Docs/WORKSPACE_RULES.md`
- `../ApoRaviz_Workspace_Docs/AI_UPDATE_RULE.md`
- `../ApoRaviz_Workspace_Docs/TEACHING_RULES.md`
- `../ApoRaviz_Workspace_Docs/PROJECT_START_HERE.md`
- `../ApoRaviz_Workspace_Docs/NEW_PROJECT_GUIDE.md`
- `../ApoRaviz_Workspace_Docs/baseline.md` = version baseline (Node/Angular/Tailwind/TS)

หลักสำคัญ:

- `../ApoRaviz_Workspace_Docs` = ความรู้กลางจัด**ตาม topic** (W3Schools ของ ApoRaviz) — ความรู้ reusable ให้ซึมเข้าหน้า topic ที่เกี่ยวข้องเป็นตัวอย่าง ไม่ทำ case study แยกตามโปรเจกต์ (route `projects/<name>/` ยกเลิกแล้ว)
- รายละเอียดเฉพาะโปรเจกต์นี้ให้อยู่ใน repo นี้
- อย่าปล่อยความรู้ใหม่ไว้แค่ใน chat

Mandatory Knowledge Sync:

1. Codex เขียนร่าง code/docs และ Knowledge Sync หน้างาน
2. Claude ทำ Independent Review/QA โดยอ่าน changed files และไฟล์ที่เกี่ยวข้องโดยตรง
3. ถ้า PASS ให้ Claude stamp สถานะใน `AGENTS.md` และ `docs/vision/Roadmap_Progress.md`
4. Claude ห้าม commit/push
5. Codex ตรวจ scope แล้ว commit/push ทั้ง `ApoRaviz_DevEng` และ `ApoRaviz_Workspace_Docs`

ตัวอย่างที่ควรกลับไป `../ApoRaviz_Workspace_Docs`:

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
5. เช็ก task ปัจจุบันเทียบกับ `docs/vision/Roadmap_Progress.md`
6. เช็กว่า task นี้ต้องอัปเดต `../ApoRaviz_Workspace_Docs` ด้วยไหม

ขณะทำงาน:

- ใช้ pattern ของ Angular standalone components
- ใช้ signals เมื่อเหมาะกับ local component state
- ระวัง SSR: อย่าเรียก `window`, `document`, `localStorage`, หรือ browser-only API โดยตรงใน code ที่อาจรันฝั่ง server
- ถ้าต้องใช้ browser API ให้ guard ด้วย platform/browser-safe pattern แล้วจดความรู้ที่ใช้ซ้ำได้กลับไป `../ApoRaviz_Workspace_Docs`
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

ใช้ Node ตาม `../ApoRaviz_Workspace_Docs/baseline.md` (เลขใน `.nvmrc` ของ repo)

คำสั่งที่ควรใช้จาก root ของ repo นี้:

```bash
# เลือก Node version ก่อน (machine-agnostic): macOS `nvm use`, Windows `nvm use <version>`
npm start
npm run build
npm test -- --watch=false
```

อย่า hardcode path เต็มของ Node เพราะ PC กับ Mac path ต่างกัน — `.nvmrc` + `../ApoRaviz_Workspace_Docs/baseline.md` คือความจริงเดียว

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
- ถ้ามี decision สำคัญ ให้ย้ายไป `README.md`, `docs/`, source documents, หรือ `../ApoRaviz_Workspace_Docs` ตามขอบเขตของเนื้อหา

ทั้งสองตัวควรยึด source of truth เดียวกันจากไฟล์นี้, source documents, และ `../ApoRaviz_Workspace_Docs`

## Documentation Updates

เมื่อ task จบ ให้ถามตัวเอง:

- มีศัพท์ใหม่ไหม
- มี command ใหม่ไหม
- มี bug pattern หรือ SSR/security pattern ที่จะเจอซ้ำไหม
- มี flow ที่ควรกลายเป็น lesson/lab/concept ใน `../ApoRaviz_Workspace_Docs` ไหม
- มี progress ที่ควรเพิ่มใน `docs/vision/Roadmap_Progress.md` ไหม
- มี decision หรือ deferred item ที่ควรอัปเดตใน `docs/vision/Vision_Decisions.md` หรือ `docs/vision/Open_Questions.md` ไหม
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
