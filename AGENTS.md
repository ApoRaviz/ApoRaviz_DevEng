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
- Angular starter template ถูกแทนด้วย health status card แล้ว: มี semantic `<main>/<section>`, Tailwind utility classes, responsive-width card, visual hierarchy, interactive states และ status feedback ที่ไม่ใช้สีอย่างเดียว
- Phase 0 จบครบแล้ว และ Phase 1 เดินถึง Step 1.3.2 ตาม `docs/vision/Roadmap_Progress.md` — Step 1.3.2 ORM ผ่านบทเรียนแนวคิดและ Codex Review/QA วันที่ 22 กันยายน 2026; Final Knowledge Check ผ่าน 3/3 หลังทบทวน SQL Injection/Parameterized Query
- local PostgreSQL ใช้ standalone container `aporaviz-deveng-postgres` จาก image `postgres:17-alpine`, named volume `aporaviz-deveng-postgres-data` และ port mapping `127.0.0.1:5433 -> 5432`; learner พิสูจน์ named-volume persistence ด้วยการ remove/recreate container แล้ว query row เดิมได้, เปลี่ยน role password ผ่าน `ALTER ROLE` และ reconnect ด้วย pgAdmin สำเร็จ; ตาราง probe ถูก drop แล้ว
- ถึง Step 1.3.2 ยังไม่มี ORM package, migration หรือ NestJS database integration; แนวทางเรียนต่อคือ TypeORM Entity/Repository กับ NestJS Module/DI โดยยังต้องตรวจเวอร์ชันก่อนติดตั้งจริง; Prisma 7 เรียนเปรียบเทียบสั้น ๆ แล้ว ส่วน Docker Compose อยู่ Phase 1.4
- คำถามเปลี่ยน Host port เป็น 5434 บันทึกเป็นวิธีทำใน Docker Desktop UI guide เท่านั้น ยังไม่ได้เปลี่ยน container จริง; mapping ข้างต้นเป็นหลักฐานล่าสุดจาก Step 1.3.1 ไม่ใช่ runtime check ใหม่
- global imperative configuration ของ backend มี source of truth เดียวที่ `backend/src/configure-app.ts` (`configureApp(app)`) — `main.ts` เรียกหลัง `NestFactory.create()` ก่อน `listen()` และ E2E เรียกหลัง `createNestApplication()` ก่อน `init()`; ถ้าเพิ่ม global Pipe/Interceptor/Prefix ในอนาคต ให้เพิ่มใน `configureApp()` ไม่ใช่ใน `main.ts` โดยตรง มิฉะนั้น E2E จะไม่เห็น
- backend มี Global Exception Filter ตัวแรกที่ `backend/src/common/filters/http-exception.filter.ts` ลงทะเบียนผ่าน `configureApp()` ด้วย `app.useGlobalFilters(new HttpExceptionFilter())` (ลงทะเบียนที่เดียว ไม่ซ้ำ) — จับเฉพาะตระกูล `HttpException` ส่วน unknown `Error` ยังตกกับ Nest default handler เป็น generic 500 (ยังไม่ทำ catch-all และ `APP_FILTER` ยัง deferred)
- backend unit test: `npm test -- --runInBand` = 2 suites / 3 tests — `health.service.spec.ts` มี behavioral assertion จริง (`expect(service.getHealth()).toEqual({ status: 'ok' })`) ส่วน `health.controller.spec.ts` ยังเป็น existence test เท่านั้นและยังใช้ `HealthService` จริงใน Testing Module (Controller-level behavioral test/mock ยังไม่ได้ทำ)
- backend E2E: `npm run test:e2e` = 1 suite / 4 tests — `backend/test/health.e2e-spec.ts` ครอบ success path (`GET /health` → 200 `{"status":"ok"}` + `Access-Control-Allow-Origin`), preflight (`OPTIONS /health` → 204 + allow-origin/allow-headers), origin อื่นที่ไม่ได้ประกาศอนุญาต และ error path (`GET /missing` → 404 + custom Filter shape) ผ่าน shared `configureApp()`; ขอบเขต: ยังไม่รัน `main.ts`/`bootstrap()` จริง ไม่พิสูจน์ production port/environment และ Supertest ไม่ใช่ browser จึงไม่พิสูจน์การปิดกั้นจริงของ browser
- ASP.NET Core bridge ใน `backend-dotnet/`: `global.json` เลือก SDK `10.0.302` ด้วย `rollForward: latestPatch` (ต้อง `cd backend-dotnet` ก่อนรัน `dotnet` มิฉะนั้น current working directory อยู่นอก scope ของ `global.json`), API project target `net10.0`
- `WeatherForecast` scaffold ถูกถอดครบแล้ว — bridge มี controller-based `GET /health` ที่ `backend-dotnet/src/ApoRaviz.DevEng.Api/Controllers/HealthController.cs` ตอบ `200 {"status":"ok"}`; ใช้ `[Route("[controller]")]` จึงมีเฉพาะ `/health` ไม่มี `/api/health` และ `Program.cs` เพิ่ม `public partial class Program {}` ใต้ `app.Run()` เพื่อให้ test project เห็น entry point (ไม่ได้สร้าง startup ตัวที่สอง)
- ASP.NET Core integration test: `backend-dotnet/tests/ApoRaviz.DevEng.Api.Tests/` ใช้ xUnit + `Microsoft.AspNetCore.Mvc.Testing` (อยู่ใน test project เท่านั้น) กับ `WebApplicationFactory<Program>` ผ่าน `IClassFixture` — `dotnet test` = 1 test (`GetHealth_ReturnsOkResponse`) ตรวจทั้ง `HttpStatusCode.OK` และ JSON body `Status == "ok"`; ขอบเขต: รันบน in-memory TestServer ไม่ผูก `launchSettings.json` และไม่พิสูจน์ production port/certificate/deployment
- NestJS request pipeline: `backend/src/common/middleware/request-logging.middleware.ts` implement `NestMiddleware` — `use()` จดเวลาเริ่มเป็น local variable ต่อ request, ลงทะเบียน `response.on('finish', callback)` **ก่อน** `next()` แล้วอ่าน final `statusCode`/คำนวณ duration ภายใน callback; safe log มีเฉพาะ `method path status durationms` ไม่ log query string, body, header, cookie หรือ token (ใช้ `request.path` ที่ไม่รวม query string)
- ลงทะเบียนที่ root `AppModule` ผ่าน `implements NestModule` + `configure(consumer)` + `consumer.apply(RequestLoggingMiddleware).forRoutes('*')` จึงครอบทั้ง route ที่พบและไม่พบ (`/health` → 200, `/missing` → custom 404 จาก Exception Filter ก็ถูก log ทั้งคู่); `configure()` hook ของ Module เป็นคนละตัวกับ helper `configureApp(app)`
- ขอบเขตที่ยังไม่พิสูจน์ด้วย automated test: ไม่มี assertion ต่อ logger — Nest `TestingLogger` ซ่อน `logger.log()` ใน E2E output จึงใช้ E2E PASS อย่างเดียวสรุปว่า logging ทำงานไม่ได้ ต้องใช้ runtime probe หรือ logger/test double
- Angular frontend เรียก API ผ่าน Service: `src/app/services/health-api.ts` ใช้ Angular 22 `@Service()` (auto-provided ระดับ root โดย default) + `inject(HttpClient)` และ `getHealth()` คืน `Observable<HealthResponse>` ของ `GET ${environment.apiBaseUrl}/health`; `src/app/app.config.ts` ลงทะเบียน `provideHttpClient()` แล้ว
- Angular Environment Config: `src/environments/environment.ts` เป็น base/production config (`apiBaseUrl: 'https://api.example.invalid'` เป็น fail-loud placeholder โดยตั้งใจ — `.invalid` เป็น reserved special-use domain ที่ resolve ไม่ได้ จึงพังดังก่อนถึงมือผู้ใช้จนกว่าจะเลือก production API domain จริง และต้องเปลี่ยนก่อน deploy) ส่วน `src/environments/environment.development.ts` เป็น development override (`http://localhost:3000`); `angular.json` ประกาศ `fileReplacements` ไว้ที่ build configuration `development` เท่านั้น
- ownership ของค่า URL: Environment เป็นเจ้าของ **API base URL อย่างเดียว**, Service เป็นเจ้าของ **endpoint path** (`/health`) และ Angular CLI เป็นเจ้าของ **การเลือกไฟล์ตาม configuration**; code ต้อง import ไฟล์ฐาน `../../environments/environment` เสมอ ห้าม import `environment.development.ts` ตรง ๆ เพราะจะข้ามการเลือกไฟล์ของ CLI
- configuration flow ของ scaffold นี้: `ng serve` = development (`serve.defaultConfiguration`), `npm run build` = production (`build.defaultConfiguration`), `npm test` = **development** เพราะ `@angular/build:unit-test` ใช้ `buildTarget` default เป็น `::development` (ยืนยันจาก `node_modules/@angular/build/src/builders/unit-test/schema.json` และ `src/builders/unit-test/options.js`) — target `test` ใน `angular.json` จึงไม่ต้องมี `fileReplacements` ของตัวเอง และห้ามสรุปว่า Unit Test ใช้ base production file เพียงเพราะ target `test` ไม่มี `fileReplacements` เขียนอยู่ข้างใน
- Environment ฝั่ง frontend เป็น **build-time public configuration** ที่ถูก bundle ไปอยู่ใน JavaScript ฝั่ง browser ได้ ไม่ใช่ secret store — ห้ามใส่ password/token/credential จริง
- ขอบเขตหลักฐาน (1): spec สร้าง expected URL จาก `environment.apiBaseUrl` เหมือนกับ Service จึงพิสูจน์ได้แค่ว่า Service ประกอบ `base + /health` ตาม Environment ของ configuration ที่กำลังรัน ไม่ได้พิสูจน์ว่า base URL ของ production ถูกต้อง; ถ้า hardcode `http://localhost:3000` ไว้ใน Service test ก็ยังผ่านเพราะพฤติกรรมเท่ากับค่า development
- ขอบเขตหลักฐาน (2): Step 1.2.4 เชื่อม `App` → `HealthApi` แล้ว จึงไม่ถูก tree shaking ตัดออกจาก application flow อีกต่อไป; browser runtime จาก Angular development origin พิสูจน์ `GET /health` จริงผ่าน CORS ไป NestJS และแสดง `Backend status: ok` ได้ ส่วน production API domain/deployment ยังไม่ได้พิสูจน์
- Angular UI state แยกเป็น `idle | loading | success | error` ผ่าน Signal; `checkHealth()` ล้าง response เก่า ตั้ง loading แล้วใช้ `subscribe({ next, error })` เก็บ response/เปลี่ยน state; Template ใช้ `(click)`, `[disabled]`, interpolation, optional chaining และ `@switch` พร้อม `aria-live="polite"`
- Angular HTTP unit test: `src/app/services/health-api.spec.ts` ใช้ `TestBed` + `provideHttpClient()` แล้วตามด้วย `provideHttpClientTesting()` — Service กับ `HttpClient` เป็นของจริง แต่ testing backend ดัก request ไม่ให้ออก network; ตรวจ URL ด้วย `expectOne()`, ตรวจ method ด้วย assertion, ส่ง response จำลองด้วย `flush()`, เก็บค่าใน `actualResponse` แล้ว `expect()` นอก callback (กัน false positive แบบ tests ผ่านแต่มี Unhandled Error), คุมด้วย `expect.assertions(2)` และ `afterEach` เรียก `verify()`
- Angular Component Test ใช้ `provideHttpClientTesting()` + `HttpTestingController` ตรวจ idle/loading/success/error DOM flow; `app.spec.ts` = 4 tests และ full Angular suite = 2 files / 6 tests โดย Unit Test ไม่พิสูจน์ NestJS/network/CORS จึงมี browser runtime probe แยกทั้ง backend เปิด (success) และปิด (network error)
- CORS เปิดผ่าน `configureApp()` ด้วย `app.enableCors({ origin: 'http://localhost:4200' })` ที่เดียว (ไม่กระจาย configuration ซ้ำใน `main.ts`) จึงทำให้ runtime และ E2E ใช้ config เดียวกัน; อนุญาต Angular development origin `http://localhost:4200`
- nuance ที่ต้องจำ: `origin` เป็น string คงที่บน Express ทำให้ response ส่ง `Access-Control-Allow-Origin: http://localhost:4200` เสมอ แม้ request จะมาจาก origin อื่น — **browser** เป็นผู้เทียบแล้วปิดกั้น ไม่ใช่ server ปฏิเสธ request; `curl`/Supertest จึงยังเห็น status/body ตามปกติและไม่ได้พิสูจน์การบังคับใช้ของ browser
- CORS ไม่ได้ทำหน้าที่แทน Authentication/Authorization และ `Access-Control-Allow-Methods` ที่ preflight ตอบ (ค่า default `GET,HEAD,PUT,PATCH,POST,DELETE`) ไม่ได้ยืนยันว่า route จริงรองรับทุก method นั้น
- Step ถัดไปคือ 1.3.3 Migration คืออะไรและทำไมต้อง version control schema โดยเดิน NestJS เป็น learning track เดียวต่อเนื่องจนผ่าน Phase 1.8.4

- 10 สิงหาคม 2026 — backend learning sequence เปลี่ยนเพื่อลด cognitive load: คง Step 1.1.9 และ `backend-dotnet/` ที่ทำเสร็จแล้วไว้เป็นประวัติ, ไม่เพิ่ม ASP.NET Core Middleware ตอนนี้, ปิด 1.1.10 เป็น NestJS-only แล้วไป 1.2.1 ต่อเนื่องด้วย NestJS จนผ่าน 1.8.4; ASP.NET Core Middleware ย้ายไป 1.9.1 ภายใต้ ASP.NET Core MVP Parity และ parity step อื่นจะถูกแตกตอนเริ่ม 1.9 โดยใช้ NestJS MVP ที่เสถียรแล้วเป็น source of truth

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
- คำว่าเข้าใจง่ายไม่ใช่การตัดศัพท์ technical ที่ใช้จริง: ให้เรียง `ความหมายแบบคนธรรมดา -> ชื่อ technical -> จุดที่เห็นใน code/output` แล้วค่อยลดคำแปลเมื่อ learner คุ้น; ห้ามใช้ศัพท์ใหม่หลายคำอธิบายศัพท์ใหม่อีกคำหนึ่ง
- เมื่อ flow มีผู้ทำงานหลายตัว ให้แยกของจริง/ของจำลองก่อน ทำแผนที่ว่าใครมีหน้าที่อะไร แล้วตามข้อมูลว่าใครส่งอะไรให้ใคร ก่อนเปิดรายละเอียดภายใน framework; Knowledge Check ต้องใช้ภาษาระดับเดียวกับบทเรียน ไม่วัดการเดาศัพท์
- ก่อนให้ learner เพิ่ม snippet ใหม่ ให้สำรวจศัพท์, syntax, class, decorator และ API ที่ปรากฏใน snippet; เรื่องที่ยังไม่เคยเรียนต้องอธิบายก่อนให้วาง ส่วนเรื่องที่เคยเรียนแต่จำเป็นต่อ flow ใหม่ให้ทวนสั้น ๆ แบบ just-in-time
- เมื่อสอน code หนึ่งบรรทัดที่ประกอบด้วยหลายส่วน ให้ใช้วิธี "แยกชิ้นแล้วประกอบกลับ": แสดงบรรทัดเต็มก่อน -> แยกคำหรือส่วนตามหน้าที่ -> อธิบายแต่ละส่วนพร้อมตัวอย่างสั้น -> ประกอบกลับเป็นความหมายและ flow ของทั้งบรรทัด; ไม่แยกทุกคำออกเป็นบทเรียนยาวโดยอัตโนมัติ เว้นแต่ส่วนนั้นเป็นพื้นฐานสำคัญจริงหรือ learner ยังสับสน
- ถ้า Angular scaffold มีไฟล์เยอะ ให้ recap file map ก่อน Knowledge Check
- เมื่อความรู้ใหม่ใช้ความรู้เก่าเป็นฐาน ให้หยิบภาพจำ, flow และคำสำคัญของเรื่องเดิมมาทวนสั้น ๆ แบบ just-in-time ก่อนเชื่อมเข้าสู่ของใหม่ เพื่อกันลืมโดยไม่เปิดบทเดิมเต็มบทซ้ำ; เช่น เมื่อบทอนาคตแตะ Middleware ให้ทวน `request -> middleware ตามลำดับ -> next หรือ short-circuit -> Controller -> response ย้อนกลับ`

Start-of-day teaching check:

- ก่อนเริ่มสอนใน turn แรกของแชทใหม่ ให้เช็กวันที่และ timezone จริง แล้วเทียบกับวันที่ของ teaching checkpoint ล่าสุดที่เชื่อถือได้
- ถ้าเป็นแชทใหม่, วันที่ปัจจุบันไม่ตรงกับ checkpoint ล่าสุด หรือหา checkpoint date ไม่ได้ ให้ถือว่า context อาจขาด: ต้องอ่าน `AGENTS.md` และ `../ApoRaviz_Workspace_Docs/TEACHING_RULES.md` ฉบับเต็มอีกครั้ง แล้วตรวจ `git status`/diff, Roadmap checkpoint และไฟล์ที่ learner แก้ค้าง
- หลังอ่านกฎ ให้สรุปตำแหน่งปัจจุบัน, ขอบเขตของส่วนย่อยถัดไป และศัพท์ใหม่ที่จะต้องปูพื้น เพื่อป้องกันบทเรียน drift หรือออกนอก scope
- ห้ามเริ่มสอนเนื้อหาใหม่หรือให้ learner เพิ่ม code ก่อนทำ start-of-day check ที่เข้าเงื่อนไขข้างต้นครบ

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
- ASP.NET Core bridge: controller-based Web API ใน `backend-dotnet/`; หยุด learning track นี้ไว้หลัง Step 1.1.9 และกลับมาทำ behavior parity ใน 1.9 หลัง NestJS ผ่าน Phase 1.8.4 โดยไม่สลับ framework ระหว่างทาง
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
2. Codex ทำ Review/QA โดยอ่าน changed files และไฟล์ที่เกี่ยวข้องโดยตรง พร้อมตรวจ scope, technical accuracy และ validation evidence
3. ถ้า PASS ให้ Codex stamp สถานะใน `AGENTS.md` และ `docs/vision/Roadmap_Progress.md`
4. Codex ตรวจ working tree/diff แล้ว commit/push ทั้ง `ApoRaviz_DevEng` และ `ApoRaviz_Workspace_Docs`
5. External second-opinion review เช่น Claude ใช้เมื่อผู้ใช้ร้องขอ ไม่ใช่ blocking gate

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

ไฟล์นี้ตั้งใจให้ AI agents ที่ได้รับมอบหมายเขียนร่วมกันได้

บทบาทที่ lock แล้ว:

- ผู้ใช้ = Product Owner / Learner / Decision Maker
- Codex = Hands-on Tutor / Executor / Reviewer / QA / Release Operator: วาง Why, สอนและทำงานคู่กับผู้ใช้, ตรวจ code/docs, stamp, commit และ push
- Claude หรือ AI อื่น = Optional Second Opinion เมื่อผู้ใช้ร้องขอ

กติกาส่งต่องาน:

- Agent ที่เริ่มงานควรระบุ scope สั้น ๆ ว่ากำลังแก้อะไร
- Agent ถัดไปต้องอ่าน diff ล่าสุดก่อนแก้ต่อ
- ถ้าไม่เห็นด้วยกับแนวทางเดิม ให้เพิ่ม note หรือแก้ให้ชัดเจน แต่อย่าลบทิ้งแบบไม่อธิบาย
- ถ้าแก้ไฟล์นี้ ให้เก็บเป็นกติกาที่ใช้ซ้ำจริง ไม่ใช่บันทึก chat เฉพาะครั้ง
- ถ้ามี decision สำคัญ ให้ย้ายไป `README.md`, `docs/`, source documents, หรือ `../ApoRaviz_Workspace_Docs` ตามขอบเขตของเนื้อหา

ทุก agent ควรยึด source of truth เดียวกันจากไฟล์นี้, source documents, และ `../ApoRaviz_Workspace_Docs`

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
