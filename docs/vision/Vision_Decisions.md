# DevEng — Vision & Decisions (LOCKED Reference)

> แยกออกมาจาก Project Vision & Learning Protocol — Discussion Summary (เดิม V0.0.8)
> เก็บเฉพาะส่วนที่ **LOCK แล้วและแทบไม่เปลี่ยนอีก** — บริบทชีวิต, หลักการ, Tech Stack, Architecture, Product Brief
> ไฟล์พี่น้อง: `Roadmap_Progress.md` (Phase breakdown, อัปเดตบ่อยที่สุด), `Open_Questions.md` (สถานะคำถามค้าง)
> อัปเดตล่าสุด: 20 มิถุนายน 2026 (พร้อมกับ Discussion Summary V0.0.9)

---

## 1. บริบทชีวิตที่เกี่ยวข้อง

- พื้นเพ: โปรแกรมเมอร์สาย **WMS/TMS** มา ~10 ปี (Panjawattana, Yamato, Techsoft, Unbox.IT) — ใช้ C#/.NET, Angular, SQL Server, Crystal Reports, Keycloak, CI/CD
- คาดว่าจะ **ตกงานประมาณ พ.ค. 2027** → เหลือเวลา ~11 เดือนจากตอนนี้
- **17 ก.ค. 2026**: ย้ายบ้านไปอยู่ระยองถาวร ภรรยาจะออกจากงานประจำ
- ภรรยามีภาวะเสี่ยงซึมเศร้า เป็นคนคิดมาก — ตัดสินใจไม่กดดันให้ทำธุรกิจ เพื่อไม่เพิ่มความเครียด
- เวลาที่ทำโปรเจกต์ได้จริง: **3+ ชม./วัน**
- เป้าหมาย 11 เดือนนี้: **เน้นความรู้แน่นขึ้นเป็นหลัก** รายได้จาก Product เป็นผลพลอยได้ระยะยาว ไม่ใช่ KPI หลักตอนนี้
- **Job-Transition Timeline — LOCKED:** ตั้งใจเรียนให้ครบทุก Phase (0-8) ตามแผนเต็ม ไม่ตัดจบกลางทางเพื่อไปหางานก่อน — Portfolio ปัจจุบันครอบคลุมหัวข้อที่จำเป็นสำหรับสมัครงานอยู่แล้ว จึงไม่ต้องอัปเดต Portfolio เพิ่มระหว่างทาง แค่ทำให้ได้จริงตามที่ Portfolio ระบุไว้
- หลัง 25/06/2026 จะ subscribe Claude และ Codex สำหรับการเรียนรู้ — เป็นจุดเริ่ม Phase 0 จริง

### Repo Landscape
GitHub Org: https://github.com/ApoRaviz มี 5 repo:
1. **ApoRaviz_Portfolio** (Main) — https://aporaviz.github.io/ApoRaviz_Portfolio/ — ใช้สมัครงานในอนาคต
2. **ApoRaviz_Workspace_Docs** — https://aporaviz.github.io/ApoRaviz_Workspace_Docs/ — ความรู้สะสม (Thai-first, VitePress)
3-4. โปรเจกต์เล็กที่ AI เขียนเป็นหลัก — ยังไม่พูดถึงในแผนนี้
5. **ApoRaviz_DevEng** — repo สำหรับ English Learning Tool (ดูข้อ 6 สำหรับ concept ชื่อ, ข้อ 8 สำหรับ Product Brief เต็ม)

---

## 2. หลักการที่ตกลงกันแล้ว

### 2.1 No Black Box — 2 ระดับ

| ระดับ | ขอบเขต | แนวทาง |
|---|---|---|
| **Core — เข้าใจทุกบรรทัด** | Angular, Tailwind CSS, Node.js, NestJS, PostgreSQL | ห้ามใช้โดยไม่เข้าใจกลไกจริง |
| **Auth/Security — Exception พิเศษ** | JWT, OAuth2/OIDC, Password hashing, Session management | เข้าใจลึกเท่า Core เพราะ bug = security incident จริง |
| **มาตรฐานอุตสาหกรรม** | Redis, BullMQ, MinIO, Docker, Observability, Deploy tools, Mobile | ใช้เป็น + เข้าใจหลักการทำงาน ไม่ต้อง implement เองจากศูนย์ |

### 2.2 Learning Loop
อธิบาย Why → ตัวอย่าง → ลงมือเอง → ตรวจ → Knowledge Check → ถ้าตอบผิดอธิบายใหม่วนจนเข้าใจ → ไปต่อ

### 2.3 Explanation Protocol
ก่อนพูดถึงเทอม B ต้องนิยามเทอม A ที่ B ยืนอยู่บนนั้นก่อนเสมอ — เริ่มจากภาพจำ/analogy ง่ายๆ ก่อนใส่ technical term

### 2.4 Mandatory Knowledge Sync
ระหว่าง Learning Loop ถ้า AI ประเมินว่าเนื้อหาควรค่าแก่การจดจำ → AI เขียนเข้า ApoRaviz_Workspace_Docs ให้เองโดยตรง (ต้องทำผ่าน Claude Code ที่มีสิทธิ์เข้าถึงไฟล์ระบบ)

### 2.5 AI ทำหน้าที่ Technical Co-founder + Mentor
ต้อง challenge ไม่เอาใจ ไม่ยอมรับทางลัดที่ทำให้ไม่เข้าใจจริง

### 2.6 Design-First Principle
ทุก Phase ต้องมีขั้น **Design ก่อน Implement** เสมอ และ "Design" แบ่งเป็น 2 มิติที่ต้องทำคู่กัน:

| มิติ | ตอบคำถามว่า | ตัวอย่าง |
|---|---|---|
| **Technical Design** | ข้อมูลไหลยังไง โครงสร้างข้างในเป็นยังไง | API Contract, DB Schema, Sequence Diagram |
| **UI/UX Design** | หน้าตาเป็นยังไง ผู้ใช้กดตรงไหน | Wireframe, Layout, Spacing/Typography/Color scale |

### 2.7 Scope Discipline
ระหว่างคุย Product Brief พบ pattern ซ้ำหลายครั้ง: ไอเดียเพิ่มเติมที่ฟังดูดี (Admin UI เต็ม, Image/Screenshot capture, Multi-language) ถูกท้วงและแยกออกจาก MVP เพราะไม่ตรงกับ Target User/Problem ที่ระบุไว้ตรงๆ — **หลักการที่ใช้ตัดสินทุกครั้ง: ฟีเจอร์ใหม่ต้องตอบคำถาม "แก้ pain point ที่ระบุไว้แล้วไหม" ก่อนถึงจะพิจารณาเข้า MVP ถ้าไม่ตรง ให้บันทึกเป็น "Future Vision" แยกไว้ แทนที่จะใส่เข้า scope ปัจจุบัน**

### 2.8 Claude/Codex Role Division — LOCKED

ใช้ทั้ง 2 subscription ขนานกัน แบ่งบทบาทดังนี้:

| บทบาท | เครื่องมือ | หน้าที่ |
|---|---|---|
| **Designer / Guide** | Claude | ออกแบบ HTML/Architecture, วาง Why + ทิศทางก่อนลงมือ, เป็นคนตั้ง Learning Loop |
| **Hands-on Tutor / Executor** | Codex | ลงมือเขียนโค้ดคู่กับผู้ใช้ สอนแบบ hands-on ระหว่างทำจริง |
| **Reviewer / QA** | Claude | ตรวจโค้ดที่ Codex ช่วยเขียน ก่อนถือว่าจบ step |

**เงื่อนไขสำคัญที่ต้องทำทุกครั้ง:** Codex ไม่รู้จัก Explanation Protocol (ข้อ 2.3) และ Learning Loop (ข้อ 2.2) ของเราโดยอัตโนมัติ — ต้องให้ Codex อ่านกติกาเป็น context ทุกครั้งที่เริ่ม session ใหม่ เพื่อให้มาตรฐานการสอนสม่ำเสมอกันทั้งสองตัว (ดูแผน `AGENTS.md` ใน Discussion Summary ฉบับล่าสุด)

**Working mode update — 1 กรกฎาคม 2026:** ผู้ใช้ = Product Owner / Learner / Decision Maker; Codex = Executor / Hands-on Tutor / Quick Verifier; Claude = Reviewer / QA / Second Brain. `ApoRaviz_DevEng` เป็น learning mode หลักที่เรียนทุกบรรทัดด้วย Learning Loop เต็ม ส่วน `ApoRaviz_*` อื่นเป็น build mode เป็นหลัก ผู้ใช้ออกไอเดีย/requirement แล้ว AI ช่วย execute ตาม workspace rules พร้อม capture ความรู้ reusable กลับ `_docs` เมื่อจำเป็น

---

## 3. Tech Stack

| หมวด | เทคโนโลยี | ระดับความเข้าใจ |
|---|---|---|
| Frontend | Angular, TypeScript, **Tailwind CSS ล้วน** | Core — เข้าใจทุกบรรทัด |
| Frontend (เสริม) | UX/UI Design fundamentals | เรียนคู่กับ Tailwind |
| Backend | Node.js, NestJS | Core — เข้าใจทุกบรรทัด |
| Database | PostgreSQL (+ pgvector) | Core — เข้าใจทุกบรรทัด |
| Auth/Security | JWT (มือก่อน), Passport.js, OAuth2/OIDC, bcrypt/argon2, Refresh token rotation, RBAC | Deep-dive พิเศษ — ฝังใน Phase 1 |
| Container | Docker, Docker Compose | มาตรฐานอุตสาหกรรม |
| Cache | Redis | มาตรฐานอุตสาหกรรม |
| Queue | BullMQ (บน Redis) | มาตรฐานอุตสาหกรรม |
| Message Broker (เสริม) | RabbitMQ | Lab แยกภายหลัง |
| Storage | MinIO (S3-compatible) | มาตรฐานอุตสาหกรรม |
| Automation | NestJS (`@nestjs/schedule` + BullMQ + Webhook) → Temporal.io ถ้าจำเป็น | n8n ตัดทิ้งถาวร |
| AI | Prompt Engineering, RAG, Tool Calling, Cost Control | ใช้ SDK มาตรฐาน + เข้าใจ concept ลึก |
| AI Provider (เริ่มต้น) | External API แบบ Free Tier ก่อน (เช่น Google Gemini API) | LOCKED — ดูข้อ 4.3 |
| Testing | Vitest/Jest, Playwright | มาตรฐานอุตสาหกรรม |
| Observability | OpenTelemetry + Prometheus + Grafana | มาตรฐานอุตสาหกรรม |
| Deploy (จริง) | VPS + Nginx/Caddy + GitHub Actions | ใช้จริงตลอด Phase 1-7 |
| Deploy (เสริม) | PaaS, Kubernetes (minikube), Serverless | Survey แยก Phase 8 |
| Mobile | Capacitor | มาตรฐานอุตสาหกรรม — **หมายเหตุ: ไม่รวมสิทธิ์ระดับ OS เช่น screen capture แอปอื่น ดูข้อ 8.5** |

**หมายเหตุ:** ไม่มี component library (เช่น PrimeNG) ผสมกับ Tailwind — ดูเหตุผลเต็มในข้อ 5

---

## 4. Architecture & AI Provider — LOCKED

### 4.1 Architecture: **Modular Monolith** ✅ LOCKED

**เหตุผล:**
- ปี 2026 เทรนด์อุตสาหกรรมกำลังย้ายกลับจาก Microservices มาเป็น Modular Monolith — งานสำรวจ CNCF ปี 2025 พบว่าราว 42% ขององค์กรที่เคยใช้ Microservices ได้รวมระบบกลับเป็นหน่วยใหญ่ขึ้น เพราะปัญหา debug ซับซ้อน, operational overhead, และ network latency
- Modular Monolith เหมาะกับทีมขนาดเล็ก (รวมถึง solo dev) — Microservices เหมาะกับทีม 100+ คนหรือมีเหตุผลทางธุรกิจเฉพาะ (ต้อง scale แยกอิสระ, ข้อกำหนด compliance) ซึ่งเราไม่เข้าเงื่อนไขข้อไหนเลย
- ออกแบบดีตั้งแต่ต้น (module แบ่งขอบเขตชัดผ่าน NestJS Module) สามารถ extract เป็น Microservices ทีหลังได้แบบ refactor ไม่ต้องเขียนใหม่

**สิ่งที่ deferred:** ความรู้ Microservices concept (สำหรับสัมภาษณ์งาน/ภาพรวม) ย้ายไปเป็นหัวข้อ survey ใน **Phase 8** เหมือน RabbitMQ — ไม่ต้องลงมือสร้างจริง

**Core vs Add-on Module (packaging):** Deferred ตามเดิม — รอจน MVP มี user จริงก่อนค่อยออกแบบ

### 4.2 MVP Concept

MVP = "ห้องเดียวที่สมบูรณ์ ใช้งานได้จริง" ไม่ใช่ "บ้านทั้งหลังที่ยังสร้างไม่เสร็จ" — เน้นคำว่า **Viable (ใช้งานได้จริง)** มากกว่า Minimum (เล็กที่สุด)

MVP feature scope ฉบับสมบูรณ์อยู่ในข้อ 8 (Product Brief)

### 4.3 AI Provider สำหรับ Phase 2: **External API แบบ Free Tier ก่อน** ✅ LOCKED

**เหตุผล:**
- MVP ต้องการความเร็วในการทดสอบไอเดีย ปริมาณ token ต่อครั้งน้อย (ประโยคสั้นๆ) ค่าใช้จ่ายต่ำมาก
- มี Free Tier ให้เริ่มต้นโดยไม่ต้องเสียเงินเพิ่ม (เช่น Google Gemini API)
- ตรงกับหัวข้อ Prompt Engineering + Cost Control ที่วางแผนเรียนอยู่แล้ว

**หลักการออกแบบสำคัญ:** สร้าง **Interface/Abstraction Layer** กั้นกลางใน NestJS ไม่ผูกโค้ดกับ AI provider เจ้าใดเจ้าหนึ่งตรงๆ — วันหนึ่งจะสลับไป Local LLM หรือเปลี่ยนเจ้า แก้แค่จุดเดียว Abstraction layer นี้ควรออกแบบให้ขยายรองรับ "ภาษาปลายทาง" เป็น parameter ได้ด้วย (ไม่ hardcode "แปลเป็นไทยเท่านั้น") เผื่อ Future Vision multi-language — ดูข้อ 8.6

**Local LLM (Ollama):** ไม่เลือกตอนนี้ เพราะต้องพึ่งสเปกเครื่อง (VRAM) และคุณภาพอาจสู้ cloud ไม่ได้ — เก็บไว้เป็นทางเลือกอนาคต

---

## 5. Frontend Styling: Tailwind ล้วน vs ผสม PrimeNG — LOCKED

### ผลตัดสินใจ: **Tailwind CSS ล้วน** ✅ LOCKED — ไม่ผสม Component Library

**เหตุผลที่เลือก Tailwind ล้วนสำหรับโปรเจกต์นี้:**
1. ขัดกับ **No Black Box Principle** (ข้อ 2.1) ถ้าใช้ PrimeNG — Frontend ถูก lock เป็น Core ต้องเข้าใจทุกบรรทัด
2. **MVP ปัจจุบันไม่ต้องการ component ซับซ้อน** — UI ที่ต้องใช้จริงมีแค่ text input, button, แสดงผลลัพธ์
3. ChatGPT แนะนำแบบไม่มีบริบทเรื่อง "เป้าหมายการเรียนรู้ที่เข้มกว่าปกติ" ของโปรเจกต์นี้

**เงื่อนไขเปิดทางไว้สำหรับอนาคต:** ถ้า Phase หลังๆ ต้องการ component ซับซ้อนจริง — ให้พิจารณาใหม่แบบ exception เหมือน Auth/Security (ข้อ 2.1) ไม่ใช่ default

---

## 6. Repo ตัวที่ 5 — ชื่อและ Concept — LOCKED

### ชื่อ Repo: **`ApoRaviz_DevEng`** ✅ LOCKED

**Concept เบื้องหลังชื่อ:** ไม่ใช่ความหมาย "English for Developers" — ความหมายจริงคือ **"Dev-eloping English"** เล่นกับ identity ของตัวเองในฐานะ Developer ที่กำลัง "พัฒนา/สร้าง" ภาษาอังกฤษของตัวเองขึ้นมาทีละ commit เหมือนการเขียนโปรแกรม

**การตัดสินใจเรื่องความกำกวมของชื่อ:** ยอมรับความกำกวม (คนอาจตีความเป็น "English for Dev" ก่อน) เพื่อรักษาความสั้น/ติดหู — แนวทาง "ปล่อยกำกวมไว้ รอให้คนถามค่อยอธิบาย"

**ชื่อทางเลือกอื่นที่พิจารณาแล้วไม่เลือก:** `SentenceDecoder`, `PhraseUnstuck`, `LingoUnblock`, `GamerLingo`, `CodeAndSpeak`, `EchoCoach`, `SpeakLoop`, `ParrotCoach`, `EnglishCoach`, `EnglishTrainer`, `LearnEnglish`, `EngMaiKeng`, `PoodEng`

---

## 8. Product Brief — DevEng (MVP รอบแรก) — LOCKED

### 8.1 User

คนใกล้ตัว (ไม่เปิด public ให้สมัครเอง) ที่ได้รับ **Invite Token** จากเจ้าของโปรเจกต์ — เป็น **Dev/Gamer ไทยที่ไม่เก่งอังกฤษ หรือเคยเรียนๆเลิก** (ไม่ใช่ dev ที่เก่งอังกฤษอยู่แล้ว)

### 8.2 Problem

เจอประโยคอังกฤษที่ไม่เข้าใจ (ตอนทำงาน เช่น อ่าน error/doc หรือตอนเล่นเกม) ไม่มีทางแปล+อธิบายที่เร็วและเรียบง่าย — เคยลอง Duolingo/ELSA Speak/Cake แล้วเลิกใช้เพราะฟีเจอร์ที่ใช้ดีต้องเสียเงิน

### 8.3 Core Feature (MVP รอบแรก)

1. **Register** ด้วย Invite Token — กรอก token พร้อมข้อมูลสมัครตอน register
2. **Login** — ใช้ JWT ที่เขียนด้วยมือเอง (ตาม Phase 1.6.1, ไม่ใช้ library ช่วยตอนแรก)
3. **หน้าหลัก (Core Loop):** พิมพ์ประโยคภาษาอังกฤษที่ไม่เข้าใจ → ส่งให้ AI → AI แปลเป็นภาษาไทย **พร้อมอธิบาย grammar/structure** → แสดงผลบนหน้าจอ → **บันทึกผลลัพธ์ลง PostgreSQL** (input text, translated text, ผู้ใช้ที่ถาม, เวลา)

### 8.4 Invite Token Gate — กลไกควบคุมผู้สมัคร

**เหตุผลที่เลือกแนวทางนี้:** ต้องการให้คนใกล้ตัวทดสอบระบบ (รวมถึงระบบ login/register จริง) โดยไม่ต้องปิดเว็บเป็น private — เว็บเปิด public ได้ตามปกติ แต่จำกัดจำนวนคน register ได้ด้วย token

**กลไก:**
- 1 token = ใช้ได้แค่ 1 คน (หมดสิทธิ์ทันทีหลัง register สำเร็จ)
- การสร้าง token: **ไม่มี Admin UI ในรอบแรก** — มี endpoint ที่ admin เรียกเองผ่าน Postman/curl (ทางเลือก C ที่เลือกจาก 3 ทางที่พิจารณา: Admin UI เต็ม / Script-DB ตรง / Endpoint+Postman)
- เหตุผลที่เลือก Endpoint+Postman แทน Admin UI เต็ม: หลีกเลี่ยง scope creep — ถ้าทำ Admin UI ควบคู่กับหน้าเว็บหลัก (core feature) จะกระจายพลังงานออกจากการเรียน/สร้างหน้าเว็บหลักที่ user จริงใช้ ซึ่งสำคัญกว่าในรอบนี้
- Endpoint สร้าง token ยังต้องเช็คสิทธิ์ admin (RBAC) — ได้ฝึก Phase 1.6.6 จริงแม้ไม่มี UI

### 8.5 Out of Scope: Image/Screenshot Input — บันทึกเหตุผลเชิงเทคนิคไว้

**บริบทที่มาของคำถาม:** Pain point จริงที่เจอตอนเล่นเกม — capture ทั้งภาพไปให้ AI แปลแล้วเจาะจงไม่ได้ (มีตัวอักษรอื่นกวน) ส่วนพิมพ์เองก็จำตัวสะกดทั้งประโยคไม่ได้ อยากได้ region-capture แบบ Line/macOS

**สรุปเหตุผลทางเทคนิคที่ทำให้ feature นี้ไม่อยู่ใน MVP รอบแรก (สำคัญ ต้องเข้าใจก่อนพิจารณาใหม่ในอนาคต):**

- **Desktop (Windows):** ปัญหานี้แก้ได้แล้วด้วยเครื่องมือที่มีอยู่ (Line capture, Windows Snipping Tool) — สิ่งที่เว็บต้องทำแค่ "รับภาพที่แคปมาแล้ว" (paste/upload) แล้วส่งให้ AI vision อ่าน ไม่ต้องสร้าง capture tool เอง
- **Mobile:** ปัญหาต่างจาก desktop เพราะมือถือไม่มี region screenshot ติดเครื่อง — และที่สำคัญกว่านั้น **เว็บแอป/Capacitor ไม่มีสิทธิ์เข้าถึงหน้าจอของแอปอื่นได้เลยทั้ง Android (ต้องขอสิทธิ์ MediaProjection ระดับสูง + overlay UI) และ iOS (Apple บล็อกสนิท)** — การทำ native screen-capture-region tool เป็นโปรเจกต์คนละสายเทคโนโลยี (native mobile dev) ไม่ใช่ scope ของ Angular/NestJS/Capacitor ที่ lock ไว้

**ทางออกที่เป็นไปได้ในอนาคต (Future Vision เท่านั้น ยังไม่ implement):**
- รับภาพเต็มจอผ่าน Share Sheet ของมือถือ (ไม่ต้อง region select) → ให้ AI vision ช่วยหาประโยคที่น่าจะเป็นปัญหาในภาพทั้งใบเอง (ย้าย "การเลือกจุด" จาก user-action ไปเป็น AI-action)
- Native capture-region tool แยกเป็นโปรเจกต์คนละ scope (ยังไม่ตัดสินใจทำ)

**สถานะ:** ไม่อยู่ใน MVP รอบแรกแน่นอน — ถ้าจะทำในอนาคต ควรเป็นส่วนขยายของ Phase 2 รอบสอง (หลัง MVP พิมพ์/แปลเสถียรแล้ว) ไม่ใช่ Phase 6 (Smart Layer เน้นเสียง คนละแกนกับภาพ)

### 8.6 Out of Scope: Multi-language — บันทึกไว้เป็น Future Vision

**คำถามตั้งต้น:** อยากให้แปลพร้อมกันได้หลายภาษา (เช่น ไทย → Eng/JP)

**เหตุผลที่ตัดออกจาก MVP รอบแรก:** ไม่ตรงกับ Target User ที่ระบุไว้ (Dev/Gamer ไทยที่ไม่เก่ง**อังกฤษ** — ไม่มีการระบุถึงภาษาที่สาม) เป็นตัวอย่างชัดของ scope creep ตาม Scope Discipline principle (ข้อ 2.7)

**สิ่งที่ทำตอนนี้แทน:** MVP รอบแรกคงไว้แค่ **Eng → Thai + อธิบาย grammar/structure** (ภาษาเดียวคู่เดียว)

**สิ่งที่ออกแบบเผื่อไว้ (ไม่ implement ตอนนี้):** AI Provider Abstraction Layer (ข้อ 4.3) ควรออกแบบให้รับ "ภาษาปลายทาง" เป็น parameter ได้ ไม่ hardcode "ไทย" ตรงๆในโค้ด — เพื่อให้วันหนึ่งอยากเพิ่มภาษาอื่น แค่เปิด option ใหม่ ไม่ต้องรื้อระบบ

### 8.7 Entities เบื้องต้น (สำหรับ DB Schema ในขั้น 1.0.2)

จาก Core Feature ข้างบน พอประเมิน entities หลักได้ดังนี้ (รายละเอียดเต็มรอออกแบบจริงในขั้น 1.0.2):
- **User** — ผู้ใช้ที่ register สำเร็จแล้ว
- **InviteToken** — token สำหรับ register, มีสถานะใช้แล้ว/ยังไม่ใช้, ผูกกับ user ที่ใช้ token นั้น (ถ้าใช้แล้ว)
- **Translation** — ประวัติการแปล (input text, translated text + grammar explanation, user_id ที่ถาม, timestamp)

### 8.8 สรุป Out of Scope ทั้งหมดของ MVP รอบแรก

- Voice input/output
- Spaced repetition logic (มีแค่การเก็บข้อมูลลง DB ไว้เป็นฐาน ยังไม่มี logic ทบทวน)
- Image/Screenshot input (ทั้ง desktop และ mobile) — ดูข้อ 8.5
- Admin UI (มีแค่ endpoint ไม่มีหน้าเว็บ) — ดูข้อ 8.4
- Multi-language — ดูข้อ 8.6

---

## 9. Product Idea — DevEng (บริบทเดิม คงไว้เพื่ออ้างอิง)

### Pain Point จริงของผู้ใช้เอง
- ฟังภาษาอังกฤษพอได้ แต่พูดไม่ได้เลย เรียงประโยคไม่ถูก
- อยากเรียนคำศัพท์ไปพร้อมกับสิ่งที่ทำอยู่ (เช่น สะกด PostgreSQL ผิดเป็น "progress" บ่อยๆ)
- เคยลอง Duolingo / ELSA Speak / Cake แล้วเลิกใช้ — ฟีเจอร์ที่ใช้ดีต้องเสียเงิน
- รำคาญเวลาเล่นเกมแล้วต้อง capture หน้าจอไปให้ AI แปล (passive) — ดูการตัดสินใจเรื่องนี้ในข้อ 8.5

### Core Loop (เวอร์ชันเต็ม ระยะยาว — ไม่ใช่ MVP รอบแรก)
เจอประโยคอังกฤษที่ไม่เข้าใจ → แคป/พิมพ์เข้าระบบ → AI แปล+อธิบาย grammar/structure → ระบบให้พูดประโยคคล้ายกันกลับ (voice input) → AI ฟังแล้วแก้การออกเสียง/โครงสร้างประโยค → เก็บไว้ทบทวนซ้ำ (spaced repetition)

> MVP รอบแรกคือ subset เล็กที่สุดของ Core Loop นี้ — ดูขอบเขตจริงในข้อ 8

### Monetization
ยังไม่ตัดสินใจ (deferred) — หลักการ: เอาความรู้ก่อน รายได้ค่อยว่ากันทีหลัง

---

## Motto

> เราไม่ได้กำลังสร้างแค่ซอฟต์แวร์
> เรากำลังสร้างวิธีคิดที่จะทำให้เราสร้างซอฟต์แวร์ได้ตลอดชีวิต
