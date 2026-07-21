# Project Vision & Learning Protocol — Discussion Summary

> Version: **V0.0.12**
> สรุปบทสนทนาเพื่อนำไปต่อในแชทใหม่ (ต่อยอดจาก V0.0.11)
> วันที่สรุป: 20 มิถุนายน 2026
> สถานะ: **Architecture + AI Approach + Repo Name (#5) + Frontend Styling + Product Brief LOCK แล้ว ✅ — Phase 0 & Phase 1 แตกละเอียดระดับ Learning Loop เรียบร้อย ✅ — Gap ด้าน Testing/Security เพิ่มเข้า Phase 1 ✅ — Review Fixes V0.0.10 เพิ่มแล้ว ✅ — AI Safety/Privacy ก่อน Phase 2 เพิ่มแล้ว ✅ — Test runner wording sync แล้ว ✅ — `AGENTS.md` ร่างเสร็จแล้ว ✅ — Role Division/Knowledge Sync ปรับให้ครบ Learning Loop แล้ว ✅ — User pace context อัปเดตแล้ว ✅ — รอเริ่ม Phase 0 จริงหลัง 25/06/2026 (วัน subscribe Claude + Codex)**

---

## 0. Document Control

### 0.1 Current Status

| ไฟล์ | สถานะ |
|---|---|
| `Project_Vision_Discussion_Summary_V0_0_12.md` (ไฟล์นี้) | ✅ MASTER CONTEXT — ฉบับเต็มที่สมบูรณ์ที่สุด |
| `Vision_Decisions.md` | ✅ แตกแล้ว — decision ที่นิ่ง |
| `Roadmap_Progress.md` | ✅ แตกแล้ว — roadmap + progress log |
| `Open_Questions.md` | ✅ แตกแล้ว — คำถามค้าง |
| `AGENTS.md` | ✅ ร่างเสร็จแล้ว — วางที่ root ของ repo `ApoRaviz_DevEng` (เพิ่ม Security/AI-safety locked decisions แล้ว) |
| `CLAUDE.md` | ✅ ร่างเสร็จแล้ว — ไฟล์บางๆ ที่ root ของ repo ใช้ `@AGENTS.md` import กติกาทั้งหมด |

### 0.2 Change Log

#### Post-V0.0.12 (27 มิถุนายน 2026) — CLAUDE.md ร่างเสร็จ + AGENTS.md อุด gap

- **`CLAUDE.md` ร่างเสร็จแล้ว** วางที่ root ของ repo `ApoRaviz_DevEng` เป็นไฟล์บางๆ ใช้ `@AGENTS.md` import กติกาทั้งหมด (Claude กับ Codex จึงเห็น source of truth เดียวกัน แก้ที่ `AGENTS.md` ที่เดียว)
- **`AGENTS.md` เพิ่ม locked decisions ที่ยังขาด:** Invite Token security (`token_hash`, 1 token/1 คน, RBAC gate — ข้อ 8.4/OQ#20), AI safety guardrail ก่อนเสียบ AI จริง Phase 2 (Privacy Boundary/Prompt Injection/Logging — ข้อ 7.4/OQ#19), และย้ำว่า manual JWT ใช้เรียนกลไกเท่านั้น ไม่ใช่ production-final

#### V0.0.12 — Role Division Gap Fix + Pace Context

- **ข้อ 2.8 Role Division:** เพิ่มหน้าที่ "Knowledge Check ระหว่างทาง" กลับเข้าไปใน Codex (Hands-on Tutor) — เดิมตอนย่อเข้า `AGENTS.md` ตกหล่นไป ทำให้ดูเหมือนมีแค่ Claude ตรวจตอนจบ step เท่านั้น ทั้งที่ Learning Loop (ข้อ 2.2) กำหนดให้ต้องมี Knowledge Check ระหว่างทางด้วย ไม่ใช่แค่ตอนจบ
- **ข้อ 2.4 Mandatory Knowledge Sync:** เปลี่ยนจาก "AI เขียนเข้า Workspace_Docs เอง" เป็น **Codex เขียนร่างหน้างาน → Claude (Reviewer/QA) ตรวจทานก่อนถือว่า sync เสร็จ** — เหตุผล: Codex อยู่หน้างานตอนความเข้าใจเกิดขึ้นจริง แต่ไม่เห็นบทสนทนาที่ Claude เคยสอนไว้ (คนละ session) จึงเสี่ยงจดเพี้ยนถ้าไม่มีใครตรวจซ้ำ
- **User pace context (ใน `AGENTS.md` ข้อ 10):** ปรับเวลาเป็น "3+ ชม./วันขึ้นไป (ไม่ใช่เพดานตายตัว)" และเพิ่มว่า **ยอมรับการกดดันได้ถ้าจำเป็นต่อการเรียนรู้จริง** — Mentor ไม่ต้องเกรงใจ

#### V0.0.11 — Test Runner Sync + AGENTS.md เสร็จแล้ว

- แก้ข้อ 1.1.7 ให้เขียน unit test ด้วย **Jest** ตรงกับ Tech Stack (ข้อ 3) ที่ LOCK ไว้แล้ว ไม่ใช้คำคลุมเครือ "Vitest/Jest" อีกต่อไป
- ร่างไฟล์ `AGENTS.md` เสร็จแล้ว วางไว้ที่ root ของ repo `ApoRaviz_DevEng`

#### V0.0.10 — Review Fixes + Security Clarification

- แก้หัวข้อ **No Black Box** จาก "2 ระดับ" เป็น **3 ระดับ** ให้ตรงกับตารางจริง
- แก้ reference ของ **RBAC** จาก Phase `1.6.6` เป็น `1.6.7`
- ปรับ wording Phase `1.3.5` และ `1.7` ให้ชัดว่า Phase 1 ใช้ **Stub/Hardcoded AI result** ก่อน ส่วน Phase 2 ค่อยเสียบ AI Provider จริง
- เพิ่มหมายเหตุว่า **JWT ที่เขียนด้วยมือใช้เพื่อเรียนรู้กลไกเท่านั้น** ไม่ใช่ production-final implementation
- เพิ่ม entity/security fields เช่น `RefreshToken/UserSession`, `role`, `token_hash`, `expires_at`, `used_at`
- เพิ่มหัวข้อ **AI Safety & Privacy ก่อนเสียบ AI จริงใน Phase 2**
- ปรับ claim เรื่อง Modular Monolith ให้ไม่อ้างตัวเลขเฉพาะที่ยังไม่มี source แนบ
- เพิ่มแนวทางว่า `AGENTS.md` ไม่ควรบรรจุรายละเอียดชีวิตส่วนตัวเชิงลึก

### 0.3 Document Structure

#### Split Documents (แยกตามอัตราการเปลี่ยนแปลง — เริ่มใน V0.0.9)

ไฟล์ Discussion Summary นี้ยังเป็น **ฉบับเต็มที่สมบูรณ์ที่สุด** — ไฟล์ย่อยด้านล่างเป็นฉบับแยกที่ใช้สะดวกเมื่อ token จำกัด ไม่ได้ทดแทนไฟล์นี้

| ไฟล์ | เนื้อหา | อัตราการเปลี่ยน |
|---|---|---|
| `Vision_Decisions.md` | บริบทชีวิต (1), หลักการ 2.1-2.8, Tech Stack (3), Architecture (4), Frontend Styling (5), Repo concept (6), Product Brief (8), Product Idea (9), Motto | นิ่งมาก |
| `Roadmap_Progress.md` | Phase 0-8 breakdown (7) + Progress Log | บ่อยที่สุด |
| `Open_Questions.md` | ตารางคำถามค้าง (10) | ปานกลาง |

#### AI Context Files

- **`AGENTS.md`** — กติกาสอน/ทำงานสำหรับ Codex (อ่านอัตโนมัติทุก session เมื่อวางที่ repo root) และ Claude Code (อ่านผ่าน `@import` ใน `CLAUDE.md`) ทำหน้าที่เป็น context ฉุกเฉินขั้นต่ำเมื่อ token ในแชทหมดกะทันหัน
- **`CLAUDE.md`** — ไฟล์บางๆ สำหรับ Claude Code ใช้ `@AGENTS.md` เพื่อให้แก้ที่เดียวทั้งคู่เห็นเหมือนกัน — **ร่างเสร็จแล้ว** มีเฉพาะ Claude-specific notes (บทบาท Designer/Reviewer, path source docs/`_docs`, Knowledge Sync) ส่วนกติกาหลัก import จาก `AGENTS.md`

---

## 1. บริบทชีวิตที่เกี่ยวข้อง (คงเดิมจาก V0.0.4)

- พื้นเพ: โปรแกรมเมอร์สาย **WMS/TMS** มา ~10 ปี (Panjawattana, Yamato, Techsoft, Unbox.IT) — ใช้ C#/.NET, Angular, SQL Server, Crystal Reports, Keycloak, CI/CD
- คาดว่าจะ **ตกงานประมาณ พ.ค. 2027** → เหลือเวลา ~11 เดือนจากตอนนี้
- **17 ก.ค. 2026**: ย้ายบ้านไปอยู่ระยองถาวร ภรรยาจะออกจากงานประจำ
- ภรรยามีภาวะเสี่ยงซึมเศร้า เป็นคนคิดมาก — ตัดสินใจไม่กดดันให้ทำธุรกิจ เพื่อไม่เพิ่มความเครียด
- เวลาที่ทำโปรเจกต์ได้จริง: **3+ ชม./วัน**
- เป้าหมาย 11 เดือนนี้: **เน้นความรู้แน่นขึ้นเป็นหลัก** รายได้จาก Product เป็นผลพลอยได้ระยะยาว ไม่ใช่ KPI หลักตอนนี้
- **Job-Transition Timeline — ⭐ LOCKED (V0.0.8):** ตั้งใจเรียนให้ครบทุก Phase (0-8) ตามแผนเต็ม ไม่ตัดจบกลางทางเพื่อไปหางานก่อน — Portfolio ปัจจุบันครอบคลุมหัวข้อที่จำเป็นสำหรับสมัครงานอยู่แล้ว จึงไม่ต้องอัปเดต Portfolio เพิ่มระหว่างทาง แค่ทำให้ได้จริงตามที่ Portfolio ระบุไว้
- หลัง 25/06/2026 จะ subscribe Claude และ Codex สำหรับการเรียนรู้ — เป็นจุดเริ่ม Phase 0 จริง

### Repo Landscape
GitHub Org: https://github.com/ApoRaviz มี 5 repo:
1. **ApoRaviz_Portfolio** (Main) — https://aporaviz.github.io/ApoRaviz_Portfolio/ — ใช้สมัครงานในอนาคต
2. **ApoRaviz_Workspace_Docs** — https://aporaviz.github.io/ApoRaviz_Workspace_Docs/ — ความรู้สะสม (Thai-first, VitePress)
3-4. โปรเจกต์เล็กที่ AI เขียนเป็นหลัก — ยังไม่พูดถึงในแผนนี้
5. **ApoRaviz_DevEng** — repo สำหรับ English Learning Tool (ดูข้อ 6 สำหรับ concept ชื่อ, ข้อ 8 สำหรับ Product Brief เต็ม)

---

## 2. หลักการที่ตกลงกันแล้ว (คงเดิม)

### 2.1 No Black Box — 3 ระดับ

| ระดับ | ขอบเขต | แนวทาง |
|---|---|---|
| **Core — เข้าใจทุกบรรทัด** | Angular, Tailwind CSS, Node.js, NestJS, PostgreSQL | ห้ามใช้โดยไม่เข้าใจกลไกจริง |
| **Auth/Security — Exception พิเศษ** | JWT, OAuth2/OIDC, Password hashing, Session management | เข้าใจลึกเท่า Core เพราะ bug = security incident จริง |
| **มาตรฐานอุตสาหกรรม** | Redis, BullMQ, MinIO, Docker, Observability, Deploy tools, Mobile | ใช้เป็น + เข้าใจหลักการทำงาน ไม่ต้อง implement เองจากศูนย์ |

### 2.2 Learning Loop
อธิบาย Why → ตัวอย่าง → ลงมือเอง → ตรวจ → Knowledge Check → ถ้าตอบผิดอธิบายใหม่วนจนเข้าใจ → ไปต่อ

### 2.3 Explanation Protocol
ก่อนพูดถึงเทอม B ต้องนิยามเทอม A ที่ B ยืนอยู่บนนั้นก่อนเสมอ — เริ่มจากภาพจำ/analogy ง่ายๆ ก่อนใส่ technical term

### 2.4 Mandatory Knowledge Sync — ปรับ V0.0.12

ระหว่าง Learning Loop ถ้า AI ประเมินว่าเนื้อหาควรค่าแก่การจดจำ:
1. **Codex เป็นคนเขียนร่างบันทึกเข้า ApoRaviz_Workspace_Docs ทันทีหน้างาน** (อยู่ใน session ที่ความเข้าใจเกิดขึ้นจริง)
2. **Claude (บทบาท Reviewer/QA ตามข้อ 2.8) ต้องตรวจทานบันทึกนั้นก่อนถือว่า sync เสร็จสมบูรณ์** — เพราะ Codex ไม่เห็นบทสนทนาที่ Claude เคยสอนมาก่อน (คนละ session/เครื่องมือ) มีความเสี่ยงจดเพี้ยนได้ถ้าไม่มีใครตรวจซ้ำ

### 2.5 AI ทำหน้าที่ Technical Co-founder + Mentor
ต้อง challenge ไม่เอาใจ ไม่ยอมรับทางลัดที่ทำให้ไม่เข้าใจจริง

### 2.6 Design-First Principle
ทุก Phase ต้องมีขั้น **Design ก่อน Implement** เสมอ และ "Design" แบ่งเป็น 2 มิติที่ต้องทำคู่กัน:

| มิติ | ตอบคำถามว่า | ตัวอย่าง |
|---|---|---|
| **Technical Design** | ข้อมูลไหลยังไง โครงสร้างข้างในเป็นยังไง | API Contract, DB Schema, Sequence Diagram |
| **UI/UX Design** | หน้าตาเป็นยังไง ผู้ใช้กดตรงไหน | Wireframe, Layout, Spacing/Typography/Color scale |

### 2.7 Scope Discipline — ⭐ หลักการแฝงที่เห็นชัดในเซสชันนี้ (V0.0.5)
ระหว่างคุย Product Brief พบ pattern ซ้ำหลายครั้ง: ไอเดียเพิ่มเติมที่ฟังดูดี (Admin UI เต็ม, Image/Screenshot capture, Multi-language) ถูกท้วงและแยกออกจาก MVP เพราะไม่ตรงกับ Target User/Problem ที่ระบุไว้ตรงๆ — **หลักการที่ใช้ตัดสินทุกครั้ง: ฟีเจอร์ใหม่ต้องตอบคำถาม "แก้ pain point ที่ระบุไว้แล้วไหม" ก่อนถึงจะพิจารณาเข้า MVP ถ้าไม่ตรง ให้บันทึกเป็น "Future Vision" แยกไว้ แทนที่จะใส่เข้า scope ปัจจุบัน**

### 2.8 Claude/Codex Role Division — ⭐ LOCKED (V0.0.8, ปรับ V0.0.12)

ใช้ทั้ง 2 subscription ขนานกัน แบ่งบทบาทดังนี้:

| บทบาท | เครื่องมือ | หน้าที่ |
|---|---|---|
| **Designer / Guide** | Claude | ออกแบบ HTML/Architecture, วาง Why + ทิศทางก่อนลงมือ, เป็นคนตั้ง Learning Loop |
| **Hands-on Tutor / Executor** | Codex | ลงมือเขียนโค้ดคู่กับผู้ใช้ สอนแบบ hands-on ระหว่างทำจริง **+ ถามทวนความเข้าใจ (Knowledge Check ตามข้อ 2.2) ระหว่างทาง ไม่ใช่ปล่อยให้เขียนโค้ดเสร็จเฉยๆ โดยไม่เช็คว่าเข้าใจจริง** |
| **Reviewer / QA** | Claude | ตรวจโค้ดที่ Codex ช่วยเขียน + ตรวจบันทึก Knowledge Sync (ข้อ 2.4) ก่อนถือว่าจบ step |

**เงื่อนไขสำคัญที่ต้องทำทุกครั้ง:** Codex ไม่รู้จัก Explanation Protocol (ข้อ 2.3) และ Learning Loop (ข้อ 2.2) ของเราโดยอัตโนมัติ — ถ้ายังไม่มี `AGENTS.md` ให้ **แปะไฟล์สรุปนี้อย่างน้อยข้อ 2** ให้ Codex อ่านเป็น context ทุกครั้งที่เริ่ม session ใหม่กับ Codex; หลังจากสร้าง `AGENTS.md` แล้ว ให้ใช้ `AGENTS.md` เป็น context หลักแทน เพื่อให้มาตรฐานการสอนสม่ำเสมอกันทั้งสองตัว ไม่ใช่ปล่อยให้ Codex สอนแบบโยน technical term ตรงๆ โดยไม่ build จาก analogy ก่อน

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
| Testing | Backend: Jest (เริ่มจาก default ของ NestJS), Frontend: Angular default/Vitest (LOCK ตอน setup), E2E: Playwright | มาตรฐานอุตสาหกรรม |
| Observability | OpenTelemetry + Prometheus + Grafana | มาตรฐานอุตสาหกรรม |
| Deploy (จริง) | VPS + Nginx/Caddy + GitHub Actions | ใช้จริงตลอด Phase 1-7 |
| Deploy (เสริม) | PaaS, Kubernetes (minikube), Serverless | Survey แยก Phase 8 |
| Mobile | Capacitor | มาตรฐานอุตสาหกรรม — **หมายเหตุ: ไม่รวมสิทธิ์ระดับ OS เช่น screen capture แอปอื่น ดูข้อ 8.5** |

**หมายเหตุ:** ไม่มี component library (เช่น PrimeNG) ผสมกับ Tailwind — ดูเหตุผลเต็มในข้อ 5

---

## 4. Architecture & AI Provider — LOCKED

### 4.1 Architecture: **Modular Monolith** ✅ LOCKED

**เหตุผล:**
- ปี 2026 หลายทีมเริ่มทบทวนการใช้ Microservices แบบเกินจำเป็น และหันมาให้ความสำคัญกับ Modular Monolith มากขึ้น โดยเฉพาะทีมเล็ก/solo dev ที่ต้องการลดปัญหา debug ซับซ้อน, operational overhead, และ network latency ระหว่าง service
- Modular Monolith เหมาะกับทีมขนาดเล็ก (รวมถึง solo dev) — Microservices เหมาะกับทีม 100+ คนหรือมีเหตุผลทางธุรกิจเฉพาะ (ต้อง scale แยกอิสระ, ข้อกำหนด compliance) ซึ่งเราไม่เข้าเงื่อนไขข้อไหนเลย
- ออกแบบดีตั้งแต่ต้น (module แบ่งขอบเขตชัดผ่าน NestJS Module) สามารถ extract เป็น Microservices ทีหลังได้แบบ refactor ไม่ต้องเขียนใหม่

**สิ่งที่ deferred:** ความรู้ Microservices concept (สำหรับสัมภาษณ์งาน/ภาพรวม) ย้ายไปเป็นหัวข้อ survey ใน **Phase 8** เหมือน RabbitMQ — ไม่ต้องลงมือสร้างจริง

**Core vs Add-on Module (packaging):** Deferred ตามเดิม — รอจน MVP มี user จริงก่อนค่อยออกแบบ

### 4.2 MVP Concept (ทบทวน)

MVP = "ห้องเดียวที่สมบูรณ์ ใช้งานได้จริง" ไม่ใช่ "บ้านทั้งหลังที่ยังสร้างไม่เสร็จ" — เน้นคำว่า **Viable (ใช้งานได้จริง)** มากกว่า Minimum (เล็กที่สุด)

> **อัปเดต V0.0.5:** MVP feature scope เดิมที่เคยเป็นแค่ "ทิศทางกว้างๆ" ตอนนี้ถูกกลั่นเป็น **Product Brief ฉบับสมบูรณ์แล้ว** — ดูรายละเอียดทั้งหมดในข้อ 8

### 4.3 AI Provider สำหรับ Phase 2: **External API แบบ Free Tier ก่อน** ✅ LOCKED

**เหตุผล:**
- MVP ต้องการความเร็วในการทดสอบไอเดีย ปริมาณ token ต่อครั้งน้อย (ประโยคสั้นๆ) ค่าใช้จ่ายต่ำมาก
- มี Free Tier ให้เริ่มต้นโดยไม่ต้องเสียเงินเพิ่ม (เช่น Google Gemini API)
- ตรงกับหัวข้อ Prompt Engineering + Cost Control ที่วางแผนเรียนอยู่แล้ว

**หลักการออกแบบสำคัญ:** สร้าง **Interface/Abstraction Layer** กั้นกลางใน NestJS ไม่ผูกโค้ดกับ AI provider เจ้าใดเจ้าหนึ่งตรงๆ — วันหนึ่งจะสลับไป Local LLM หรือเปลี่ยนเจ้า แก้แค่จุดเดียว

> **อัปเดต V0.0.5:** Abstraction layer นี้ควรออกแบบให้ขยายรองรับ "ภาษาปลายทาง" เป็น parameter ได้ด้วย (ไม่ hardcode "แปลเป็นไทยเท่านั้น") เผื่อ Future Vision multi-language — ดูข้อ 8.6

**Local LLM (Ollama):** ไม่เลือกตอนนี้ เพราะต้องพึ่งสเปกเครื่อง (VRAM) และคุณภาพอาจสู้ cloud ไม่ได้ — เก็บไว้เป็นทางเลือกอนาคต

---

## 5. Frontend Styling: Tailwind ล้วน vs ผสม PrimeNG — LOCKED จาก V0.0.4

### ผลตัดสินใจ: **Tailwind CSS ล้วน** ✅ LOCKED — ไม่ผสม Component Library

**เหตุผลที่เลือก Tailwind ล้วนสำหรับโปรเจกต์นี้:**
1. ขัดกับ **No Black Box Principle** (ข้อ 2.1) ถ้าใช้ PrimeNG — Frontend ถูก lock เป็น Core ต้องเข้าใจทุกบรรทัด
2. **MVP ปัจจุบันไม่ต้องการ component ซับซ้อน** — UI ที่ต้องใช้จริงมีแค่ text input, button, แสดงผลลัพธ์
3. ChatGPT แนะนำแบบไม่มีบริบทเรื่อง "เป้าหมายการเรียนรู้ที่เข้มกว่าปกติ" ของโปรเจกต์นี้

**เงื่อนไขเปิดทางไว้สำหรับอนาคต:** ถ้า Phase หลังๆ ต้องการ component ซับซ้อนจริง — ให้พิจารณาใหม่แบบ exception เหมือน Auth/Security (ข้อ 2.1) ไม่ใช่ default

---

## 6. Repo ตัวที่ 5 — ชื่อและ Concept — LOCKED จาก V0.0.4

### ชื่อ Repo: **`ApoRaviz_DevEng`** ✅ LOCKED

**Concept เบื้องหลังชื่อ:** ไม่ใช่ความหมาย "English for Developers" — ความหมายจริงคือ **"Dev-eloping English"** เล่นกับ identity ของตัวเองในฐานะ Developer ที่กำลัง "พัฒนา/สร้าง" ภาษาอังกฤษของตัวเองขึ้นมาทีละ commit เหมือนการเขียนโปรแกรม

**การตัดสินใจเรื่องความกำกวมของชื่อ:** ยอมรับความกำกวม (คนอาจตีความเป็น "English for Dev" ก่อน) เพื่อรักษาความสั้น/ติดหู — แนวทาง "ปล่อยกำกวมไว้ รอให้คนถามค่อยอธิบาย"

**ชื่อทางเลือกอื่นที่พิจารณาแล้วไม่เลือก:** `SentenceDecoder`, `PhraseUnstuck`, `LingoUnblock`, `GamerLingo`, `CodeAndSpeak`, `EchoCoach`, `SpeakLoop`, `ParrotCoach`, `EnglishCoach`, `EnglishTrainer`, `LearnEnglish`, `EngMaiKeng`, `PoodEng`

---

## 7. Roadmap แบบ Phase

### 7.1 ภาพรวม Phase

| Phase | เป้าหมาย | หมายเหตุ |
|---|---|---|
| **0. Foundation** | Setup Angular project, config, Git workflow | แตกละเอียดแล้ว — ดูข้อ 7.2 |
| **1. Walking Skeleton** | Angular ↔ NestJS ↔ Postgres ↔ Docker ↔ CI/CD + Auth Deep-dive | แตกละเอียดแล้ว — ดูข้อ 7.3 |
| **2. Core Feature** | DevEng MVP จริง (เสียบ AI แทน Stub) — **รายละเอียดเต็มในข้อ 8** | AI Safety/Privacy ก่อนเสียบ Provider จริง, Input validation, RBAC เบื้องต้น, Invite Token Gate |
| **3. Scale** | Queue ประมวลผล async (BullMQ) | Rate limiting, idempotency |
| **4. Storage & Audit** | เก็บไฟล์/ประวัติย้อนหลัง (MinIO) | Presigned URL หมดอายุ |
| **5. Automation** | Scheduled Tasks/Webhook | Webhook signature verification |
| **6. Smart Layer** | AI ขั้นสูง (Speech-to-Text, TTS, conversation) | Prompt injection advanced cases — **ไม่รวม image/screenshot capture (ดูข้อ 8.5)** |
| **7. Production Hardening** | Security audit, Monitoring, Performance | HTTPS, dependency audit, load test |
| **8. Deployment & Architecture Survey** | PaaS, Kubernetes (minikube), Serverless, + Microservices concept | ความรู้เสริม ไม่กระทบ production จริง |

### 7.2 Phase 0 แบบแตกละเอียด

**0.1 Project Initialization & Tooling**
| Step | หัวข้อ |
|---|---|
| 0.1.1 | Node.js & npm คืออะไร ทำไมต้องเลือกเวอร์ชันให้ถูก |
| 0.1.2 | Angular CLI คืออะไร คำสั่ง `ng new` สร้างอะไรให้บ้าง |
| 0.1.3 | โครงสร้างโฟลเดอร์ที่ Angular generate มา — แต่ละไฟล์ทำหน้าที่อะไร |
| 0.1.4 | TypeScript คืออะไร ต่างจาก JavaScript ยังไง ทำไม Angular เลือกใช้ |

**0.2 Configuration Deep-dive**
| Step | หัวข้อ |
|---|---|
| 0.2.1 | `angular.json` คืออะไร แต่ละ key ทำหน้าที่อะไร |
| 0.2.2 | `tsconfig.json` คืออะไร strict mode สำคัญยังไง |
| 0.2.3 | `package.json` vs `package-lock.json` ต่างกันยังไง |
| 0.2.4 | Environment files คืออะไร |

**0.3 Styling Foundation**
| Step | หัวข้อ |
|---|---|
| 0.3.1 | ติดตั้ง Tailwind CSS เข้ากับ Angular — ทำงานยังไงเบื้องหลัง (PostCSS) |
| 0.3.2 | ไฟล์ config ของ Tailwind ตั้งค่าอะไรบ้าง |

**0.4 Git Workflow**
| Step | หัวข้อ |
|---|---|
| 0.4.1 | Git คืออะไร Repository คืออะไร |
| 0.4.2 | `.gitignore` คืออะไร ทำไมสำคัญ |
| 0.4.3 | Branching Strategy คืออะไร แบบไหนเหมาะ solo dev |
| 0.4.4 | Commit Message Convention คืออะไร |
| 0.4.5 | เชื่อม local repo กับ GitHub remote (`ApoRaviz_DevEng`) |

**0.5 Secret Management เบื้องต้น**
| Step | หัวข้อ |
|---|---|
| 0.5.1 | Environment Variable คืออะไร ทำไมไม่ hardcode secret |
| 0.5.2 | `.env` file คืออะไร ใช้ร่วมกับ `.gitignore` ยังไง |

### 7.3 Phase 1 แบบแตกละเอียด

**1.0 Design ก่อนเขียนโค้ด**
| Step | หัวข้อ |
|---|---|
| 1.0.1 | API Contract คืออะไร — ออกแบบ endpoint ก่อนเขียนโค้ด |
| 1.0.2 | Database Schema คืออะไร — ออกแบบตารางเบื้องต้น (ER Diagram ง่ายๆ) — ระบุ Primary Key / Foreign Key relationship ระหว่าง entity ตั้งแต่ขั้นออกแบบ — **ตอนนี้มี Product Brief ชัดแล้ว ออกแบบ schema ได้ตรงกับ entities ในข้อ 8.7** |
| 1.0.3 | Sequence Diagram คืออะไร — วาด flow หลัก (register ด้วย token → login → พิมพ์ → AI แปล → เก็บผล) |
| 1.0.4 | Wireframe คืออะไร — ร่างหน้าตาคร่าวๆ ของหน้าที่ต้องสร้าง ก่อนลงมือเขียน component จริง |

**1.1 Backend โครงเปล่า**
| Step | หัวข้อ |
|---|---|
| 1.1.1 | Nest CLI คืออะไร โครงสร้าง project ที่ generate มา |
| 1.1.2 | Module คืออะไร |
| 1.1.3 | Controller คืออะไร — ทำ endpoint แรก (`/health`) |
| 1.1.4 | Service คืออะไร แยกหน้าที่จาก Controller ทำไม |
| 1.1.5 | Dependency Injection คืออะไร |
| 1.1.6 | Exception Filter คืออะไร — ทำไม error ดิบๆ (stack trace) ที่หลุดออกไปหา frontend คือ security leak, สร้าง Global Exception Filter แรก |
| 1.1.7 | Unit Test คืออะไร — เขียน unit test แรกให้ Service ด้วย Jest ตั้งแต่ skeleton ยังเล็ก (ฝึกนิสัยก่อนโค้ดจะเยอะ) |

**1.2 Frontend คุยกับ Backend**
| Step | หัวข้อ |
|---|---|
| 1.2.1 | HttpClient คืออะไร เรียก API ยังไง |
| 1.2.2 | CORS คืออะไร ทำไม browser บล็อกถ้าไม่ตั้งค่า |
| 1.2.3 | Environment config คืออะไร ทำไมต้องแยก dev/prod |
| 1.2.4 | แสดงผลจาก backend บนจอ (data binding) — แทรก UI/UX fundamentals (spacing/typography/color) ตอนนี้ |

**1.3 ต่อฐานข้อมูลจริง**
| Step | หัวข้อ |
|---|---|
| 1.3.1 | PostgreSQL คืออะไร รันผ่าน Docker ครั้งแรก |
| 1.3.2 | ORM คืออะไร ทำไมไม่เขียน SQL ตรงทุกที่ |
| 1.3.3 | Migration คืออะไร ทำไมต้อง version control schema |
| 1.3.4 | DTO & Validation Pipe คืออะไร — ทำไมต้อง validate input ก่อนแตะ DB เลย, `class-validator` decorator ทำงานยังไงเบื้องหลัง |
| 1.3.5 | เขียน endpoint แรกที่ต่อกับ DB จริงผ่าน DTO validation — ใช้ `Translation` entity เป็นฐาน รับ input จริง แต่ใช้ผลลัพธ์จำลอง/Hardcoded ก่อน เพื่อฝึก flow การบันทึก input/output ลง DB โดยยัง **ไม่เสียบ AI Provider จริง** |
| 1.3.6 | Connection Pooling คืออะไร |
| 1.3.7 | Primary Key / Foreign Key **ระดับกลไกจริง** — DB บังคับ referential integrity ยังไง, ทำไม INSERT/DELETE ที่ละเมิด FK ถึงถูก reject, ผลกับการ JOIN ตาราง |
| 1.3.8 | Index คืออะไร — ทำไม Query เร็วขึ้น (แนวคิด B-Tree เบื้องหลัง), ใช้ `EXPLAIN ANALYZE` อ่านว่า Postgres planner เลือกใช้ index หรือไม่, Composite Index คืออะไร, ข้อเสีย/cost ของ Index ตอน insert-update, เทียบกับ Clustered/Non-clustered Index ที่เคยใช้ใน SQL Server |

**1.4 Docker Compose ห่อทั้งระบบ**
| Step | หัวข้อ |
|---|---|
| 1.4.1 | Dockerfile คืออะไร เขียนสำหรับ backend |
| 1.4.2 | Image vs Container ต่างกันยังไง |
| 1.4.3 | Docker Network คืออะไร |
| 1.4.4 | Volume คืออะไร |
| 1.4.5 | เขียน `docker-compose.yml` รวมทุกอย่าง |

**1.5 CI พื้นฐาน**
| Step | หัวข้อ |
|---|---|
| 1.5.1 | Continuous Integration คืออะไร |
| 1.5.2 | GitHub Actions คืออะไร workflow file หน้าตายังไง |
| 1.5.3 | ตั้ง pipeline รัน lint+test+build อัตโนมัติ |

✅ **ถึงจุดนี้ skeleton ทำงานครบ แต่ยังไม่มี auth**

**1.6 Auth/Security Deep-dive**

> เหตุผลที่อยู่ตำแหน่งนี้ (หลัง 1.1-1.5, ก่อน 1.7): เหมือนไม่ติดตั้งระบบล็อกประตูก่อนที่บ้านจะมีผนัง/หลังคายืนอยู่ได้จริง — ต้องมี skeleton เสถียรก่อน ค่อยติดตั้งระบบล็อกเข้ากับโครงที่มั่นคงแล้ว

**หมายเหตุสำคัญ:** การเขียน JWT ด้วยมือในขั้น `1.6.1` ใช้เพื่อการเรียนรู้กลไกเท่านั้น ไม่ใช่ production-final implementation หลังจากเข้าใจแล้ว การใช้งานจริงต้องกลับมาใช้ library/standard implementation ที่ผ่านการดูแลจาก community และต้องมี test/security review ก่อน deploy จริง

| Step | หัวข้อ |
|---|---|
| 1.6.1 | JWT คืออะไร เขียนด้วยมือเอง (ไม่ใช้ library) |
| 1.6.2 | JWT เก็บไว้ฝั่ง Frontend ที่ไหน — `localStorage` vs `httpOnly Cookie`, trade-off ระหว่างความเสี่ยง XSS กับ CSRF, **ต้อง LOCK ก่อนเขียน frontend auth จริง** |
| 1.6.3 | Password Hashing คืออะไร ต่างจาก Encrypt ยังไง (bcrypt/argon2) |
| 1.6.4 | Passport.js คืออะไร ทำอะไรแทนที่เขียนมือไปบ้าง |
| 1.6.5 | OAuth2/OIDC concept (Authorization Code + PKCE) |
| 1.6.6 | Refresh Token Rotation คืออะไร |
| 1.6.7 | RBAC คืออะไร กำหนด role/permission เบื้องต้น — **ใช้จริงกับ endpoint สร้าง Invite Token ที่ต้องเช็คสิทธิ์ admin (ข้อ 8.4)** |
| 1.6.8 | Brute-force protection คืออะไร — concept การจำกัดจำนวนครั้ง login ผิด (implement เต็มรอ Rate limiting ใน Phase 3 แต่ต้องเข้าใจ concept ตั้งแต่ตอนนี้) |
| 1.6.9 | Frontend Auth Forms & State — สร้าง Login/Register form, validation, แยก form state, ใช้ Angular signal คุม auth mode และ class binding โดยยึด JWT storage decision จาก 1.6.2 |
| 1.6.10 | Sliding Auth Panel & Accessible Motion — ฝึก CSS transform/transition, ป้องกันการสลับซ้ำระหว่าง animation, focus management, responsive fallback และ `prefers-reduced-motion` |

**1.7 Stub AI Endpoint**
| Step | หัวข้อ |
|---|---|
| 1.7.1 | ออกแบบ Stub Translation endpoint (`POST /translations`) ที่ต้อง login ก่อนเรียกได้ — รับ input จริง, ตอบกลับผลแปล/คำอธิบายแบบ hardcoded, และเตรียม flow ให้ Phase 2 เปลี่ยนเป็น AI จริงได้ง่าย |
| 1.7.2 | ต่อ frontend → backend (มี auth) → PostgreSQL → แสดงผลกลับบนหน้าจอครบวงจร |
| 1.7.3 | E2E Test แรกด้วย Playwright — ทดสอบ flow เต็มจาก frontend (login) → backend → แสดงผล, ทำไม E2E test ต่างจาก Unit Test ตรงไหน (มองจาก user จริง vs มองจากโค้ดทีละชิ้น) |

**1.8 Deploy ขึ้น VPS จริง**
| Step | หัวข้อ |
|---|---|
| 1.8.1 | Reverse Proxy คืออะไร (Nginx/Caddy) |
| 1.8.2 | Deploy flow หน้าตาเป็นยังไง (build → push → run บน VPS) |

> รวม Phase 1 ทั้งหมดมีประมาณ 40 รอบ Learning Loop ย่อย

### 7.4 Phase 2 Guardrail ก่อนเสียบ AI จริง — เพิ่มใน V0.0.10

ก่อนเปลี่ยน Stub ใน Phase 1 ให้กลายเป็น AI Provider จริง ต้องมี mini-step ด้าน safety/privacy ก่อน เพื่อไม่ให้ระบบ “ใช้ AI ได้” แต่เสี่ยงด้านข้อมูลตั้งแต่วันแรก:

| Step | หัวข้อ |
|---|---|
| 2.0.1 | AI Privacy Boundary — ห้ามส่ง secret, API key, password, internal source code, customer/company data เข้า AI provider โดยไม่ตั้งใจ |
| 2.0.2 | Prompt Injection เบื้องต้น — เข้าใจว่าข้อความ input จาก user อาจพยายามสั่ง AI ให้ข้ามกติกาของระบบได้ |
| 2.0.3 | Logging Policy — กำหนดว่า input/output อะไรเก็บลง DB ได้, อะไรควร mask/redact, และเก็บนานแค่ไหน |
| 2.0.4 | AI Provider Abstraction — ยืนยันว่าโค้ดเรียก AI ผ่าน interface กลาง ไม่ผูกกับ provider เจ้าเดียว และรองรับ target language parameter ตามข้อ 4.3/8.6 |

---

## 8. Product Brief — DevEng (MVP รอบแรก) — ⭐ LOCKED ในเซสชันนี้ (V0.0.5)

### 8.1 User

คนใกล้ตัว (ไม่เปิด public ให้สมัครเอง) ที่ได้รับ **Invite Token** จากเจ้าของโปรเจกต์ — เป็น **Dev/Gamer ไทยที่ไม่เก่งอังกฤษ หรือเคยเรียนๆเลิก** (ไม่ใช่ dev ที่เก่งอังกฤษอยู่แล้ว)

### 8.2 Problem

เจอประโยคอังกฤษที่ไม่เข้าใจ (ตอนทำงาน เช่น อ่าน error/doc หรือตอนเล่นเกม) ไม่มีทางแปล+อธิบายที่เร็วและเรียบง่าย — เคยลอง Duolingo/ELSA Speak/Cake แล้วเลิกใช้เพราะฟีเจอร์ที่ใช้ดีต้องเสียเงิน

### 8.3 Core Feature (MVP รอบแรก)

1. **Register** ด้วย Invite Token — กรอก token พร้อมข้อมูลสมัครตอน register
2. **Login** — เรียนรู้กลไก JWT ด้วยการเขียนมือเองก่อนใน Phase 1.6.1 (ไม่ใช้ library ช่วยตอนแรก เพื่อเข้าใจกลไกจริง) จากนั้นใช้งานจริงผ่าน library/standard implementation ที่ผ่าน test/security review (ดู note ใน Phase 1.6)
3. **หน้าหลัก (Core Loop):** พิมพ์ประโยคภาษาอังกฤษที่ไม่เข้าใจ → ส่งให้ AI → AI แปลเป็นภาษาไทย **พร้อมอธิบาย grammar/structure** → แสดงผลบนหน้าจอ → **บันทึกผลลัพธ์ลง PostgreSQL** (input text, translated text, ผู้ใช้ที่ถาม, เวลา)

### 8.4 Invite Token Gate — กลไกควบคุมผู้สมัคร

**เหตุผลที่เลือกแนวทางนี้:** ต้องการให้คนใกล้ตัวทดสอบระบบ (รวมถึงระบบ login/register จริง) โดยไม่ต้องปิดเว็บเป็น private — เว็บเปิด public ได้ตามปกติ แต่จำกัดจำนวนคน register ได้ด้วย token

**กลไก:**
- 1 token = ใช้ได้แค่ 1 คน (หมดสิทธิ์ทันทีหลัง register สำเร็จ)
- ไม่ควรเก็บ token ดิบใน DB — เก็บเป็น `token_hash` แทน เพื่อให้ถ้า DB หลุด token ที่ยังไม่ถูกใช้จะไม่ถูกเอาไปสมัครต่อได้ง่าย
- field ที่ควรคิดไว้ตั้งแต่ DB design: `token_hash`, `expires_at`, `used_at`, `used_by_user_id`, `created_by_admin_id`, `revoked_at`
- การสร้าง token: **ไม่มี Admin UI ในรอบแรก** — มี endpoint ที่ admin เรียกเองผ่าน Postman/curl (ทางเลือก C ที่เลือกจาก 3 ทางที่พิจารณา: Admin UI เต็ม / Script-DB ตรง / Endpoint+Postman)
- เหตุผลที่เลือก Endpoint+Postman แทน Admin UI เต็ม: หลีกเลี่ยง scope creep — ถ้าทำ Admin UI ควบคู่กับหน้าเว็บหลัก (core feature) จะกระจายพลังงานออกจากการเรียน/สร้างหน้าเว็บหลักที่ user จริงใช้ ซึ่งสำคัญกว่าในรอบนี้
- Endpoint สร้าง token ยังต้องเช็คสิทธิ์ admin (RBAC) — ได้ฝึก Phase 1.6.7 จริงแม้ไม่มี UI

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
- **User** — ผู้ใช้ที่ register สำเร็จแล้ว, มี `role` เบื้องต้น เช่น `admin` / `user` เพื่อรองรับ RBAC แบบง่ายก่อนแตกเป็นตาราง Role จริงในอนาคตถ้าจำเป็น
- **InviteToken** — token สำหรับ register, มีสถานะใช้แล้ว/ยังไม่ใช้, ผูกกับ user ที่ใช้ token นั้น (ถ้าใช้แล้ว), เก็บ token เป็น `token_hash` ไม่เก็บ token ดิบ
- **RefreshToken / UserSession** — เก็บข้อมูล refresh token rotation, expiry, revoke, device/session metadata เบื้องต้น เพื่อรองรับ Phase 1.6.6
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

## 10. คำถามค้าง — อัปเดต V0.0.12

| # | หัวข้อ | สถานะ |
|---|---|---|
| 1 | Architecture decision | ✅ LOCKED — Modular Monolith |
| 2 | ตั้งชื่อ repo ตัวที่ 5 | ✅ LOCKED — `ApoRaviz_DevEng` |
| 3 | ร่าง Product Brief สั้นๆ | ✅ LOCKED — รายละเอียดเต็มในข้อ 8 (V0.0.5) |
| 4 | เริ่ม Phase 0 จริง (ย้ายไปทำใน Claude Code) | 🔲 รอหลัง 25/06/2026 |
| 5 | Tailwind ล้วน หรือผสม PrimeNG บาง component | ✅ LOCKED — Tailwind ล้วน |
| 6 | AI Provider สำหรับ Phase 2 | ✅ LOCKED — External API (Free Tier ก่อน) + Abstraction Layer (รองรับ multi-language เผื่อไว้) |
| 7 | Phase 0 & Phase 1 granular breakdown | ✅ LOCKED — รายละเอียดในข้อ 7.2-7.3 |
| 8 | Core + Add-on Module (packaging) | 🔲 Deferred — รอจน MVP มี user จริง |
| 9 | DB Schema เต็ม (ER Diagram จริง) | 🔲 ยังค้าง — รอทำในขั้น 1.0.2 ตอนเริ่ม Phase 1 จริง โดยมี entities เบื้องต้นจากข้อ 8.7 เป็นฐาน |
| 10 | Image/Screenshot input (future vision) | 🔲 Deferred ถาวรจนกว่าจะพิจารณาใหม่ — ดูเหตุผลเต็มในข้อ 8.5 |
| 11 | Multi-language support (future vision) | 🔲 Deferred — design abstraction ไว้เผื่อ ไม่ implement ตอนนี้ — ดูข้อ 8.6 |
| 12 | PK/FK constraint mechanics + Index deep-dive | ✅ LOCKED (V0.0.6) — เพิ่มเป็น Step 1.3.7-1.3.8 เพื่อไม่ให้ตกหล่นเมื่อถึง Phase 1 จริง |
| 13 | Testing, JWT storage, Exception Filter, Brute-force concept (gap ที่ขาดใน Phase 0/1) | ✅ LOCKED (V0.0.7 + ปรับ V0.0.10) — เพิ่มเป็น Step 1.1.6-1.1.7, 1.3.4, 1.6.2, 1.6.8, 1.7.3 และระบุ manual JWT ใช้เพื่อเรียนเท่านั้น |
| 14 | Claude/Codex แบ่งบทบาทกันยังไง | ✅ LOCKED (V0.0.8) — ดูข้อ 2.8 |
| 15 | Learning Roadmap vs Job-Transition Timeline ตัดกันตรงไหน | ✅ LOCKED (V0.0.8) — เรียนครบทุก Phase ไม่ตัดจบกลางทาง, ไม่ต้องอัปเดต Portfolio เพิ่ม |
| 16 | VPS Provider เจ้าไหน | 🔲 Deferred — ไม่เร่งด่วน รอถึง Phase 1.8 |
| 17 | ร่างไฟล์ `AGENTS.md` (root ของ `ApoRaviz_DevEng`) ให้ Codex/Claude Code อ่าน context อัตโนมัติ | ✅ LOCKED (V0.0.11) — ร่างเสร็จแล้ว วางไว้ที่ root ของ repo แล้ว ดูข้อ 0.3 |
| 18 | แตกเอกสารหลักเป็นไฟล์ย่อยตามอัตราการเปลี่ยนแปลง | ✅ LOCKED (V0.0.9) — แตกเป็น `Vision_Decisions.md` / `Roadmap_Progress.md` / `Open_Questions.md` แล้ว ดูข้อ 0.2 |
| 19 | AI Safety & Privacy ก่อนเสียบ AI Provider จริง | ✅ LOCKED (V0.0.10) — เพิ่มเป็น Phase 2 Guardrail ข้อ 7.4 ก่อนเริ่ม Core Feature จริง |
| 20 | Invite Token security fields + ไม่เก็บ token ดิบ | ✅ LOCKED (V0.0.10) — เพิ่ม `token_hash`, `expires_at`, `used_at`, `used_by_user_id`, `created_by_admin_id`, `revoked_at` ในข้อ 8.4 |
| 21 | Test runner wording ไม่ตรงกันระหว่าง Tech Stack กับ Step 1.1.7 | ✅ LOCKED (V0.0.11) — แก้ 1.1.7 ให้ใช้ Jest ตรงกับ Tech Stack (ข้อ 3) แล้ว |
| 22 | Role Division ขาด Knowledge Check ของ Codex ระหว่างทาง | ✅ LOCKED (V0.0.12) — เพิ่มกลับเข้าข้อ 2.8 แล้ว ตรงกับ Learning Loop (ข้อ 2.2) |
| 23 | Mandatory Knowledge Sync ใครเขียน/ใครตรวจ ระหว่าง Claude-Codex | ✅ LOCKED (V0.0.12) — Codex เขียนร่างหน้างาน → Claude (Reviewer/QA) ตรวจทานก่อนถือว่า sync เสร็จ ดูข้อ 2.4 |
| 24 | Pace/Pressure context ของผู้ใช้ — เวลาเป็นเพดานตายตัวไหม ยอมให้กดดันได้ไหม | ✅ LOCKED (V0.0.12) — เวลา 3+ ชม./วันขึ้นไป ไม่ใช่เพดาน, ยอมรับการกดดันได้ถ้าจำเป็นต่อการเรียนรู้จริง (ดู `AGENTS.md` ข้อ 10) |
| 25 | Cross-reference เวอร์ชันตกหล่นหลัง bump V0.0.12 (หัวข้อ 0.3, 0.2, 10 ยังอ้าง V0.0.10/11 เดิม) | ✅ LOCKED (V0.0.12) — แก้ครบตามรอบตรวจทานนี้แล้ว |

---

## Motto (คงเดิม)

> เราไม่ได้กำลังสร้างแค่ซอฟต์แวร์
> เรากำลังสร้างวิธีคิดที่จะทำให้เราสร้างซอฟต์แวร์ได้ตลอดชีวิต
