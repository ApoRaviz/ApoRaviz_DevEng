# DevEng — Open Questions Tracker

> แยกออกมาจาก Project Vision & Learning Protocol — Discussion Summary (เดิม V0.0.8)
> อ้างอิงบริบทเต็มที่ `Vision_Decisions.md`, รายละเอียด phase ที่ `Roadmap_Progress.md`
> อัปเดตล่าสุด: 1 กรกฎาคม 2026 (เพิ่ม #26 Private Planning Repo; หมายเหตุ: ไฟล์นี้ยังตาม master ไม่ทัน — #19-25 อยู่ใน Discussion Summary ข้อ 10 รอ sync)

| # | หัวข้อ | สถานะ |
|---|---|---|
| 1 | Architecture decision | ✅ LOCKED — Modular Monolith |
| 2 | ตั้งชื่อ repo ตัวที่ 5 | ✅ LOCKED — `ApoRaviz_DevEng` |
| 3 | ร่าง Product Brief สั้นๆ | ✅ LOCKED — รายละเอียดเต็มใน `Vision_Decisions.md` ข้อ 8 |
| 4 | เริ่ม Phase 0 จริง (ย้ายไปทำใน Claude Code) | 🔲 รอหลัง 25/06/2026 |
| 5 | Tailwind ล้วน หรือผสม PrimeNG บาง component | ✅ LOCKED — Tailwind ล้วน |
| 6 | AI Provider สำหรับ Phase 2 | ✅ LOCKED — External API (Free Tier ก่อน) + Abstraction Layer (รองรับ multi-language เผื่อไว้) |
| 7 | Phase 0 & Phase 1 granular breakdown | ✅ LOCKED — รายละเอียดใน `Roadmap_Progress.md` ข้อ 7.2-7.3 |
| 8 | Core + Add-on Module (packaging) | 🔲 Deferred — รอจน MVP มี user จริง |
| 9 | DB Schema เต็ม (ER Diagram จริง) | 🔲 ยังค้าง — รอทำในขั้น 1.0.2 ตอนเริ่ม Phase 1 จริง โดยมี entities เบื้องต้นจาก `Vision_Decisions.md` ข้อ 8.7 เป็นฐาน |
| 10 | Image/Screenshot input (future vision) | 🔲 Deferred ถาวรจนกว่าจะพิจารณาใหม่ — ดูเหตุผลเต็มใน `Vision_Decisions.md` ข้อ 8.5 |
| 11 | Multi-language support (future vision) | 🔲 Deferred — design abstraction ไว้เผื่อ ไม่ implement ตอนนี้ — ดู `Vision_Decisions.md` ข้อ 8.6 |
| 12 | PK/FK constraint mechanics + Index deep-dive | ✅ LOCKED — เพิ่มเป็น Step 1.3.7-1.3.8 เพื่อไม่ให้ตกหล่นเมื่อถึง Phase 1 จริง |
| 13 | Testing, JWT storage, Exception Filter, Brute-force concept (gap ที่ขาดใน Phase 0/1) | ✅ LOCKED — เพิ่มเป็น Step 1.1.6-1.1.7, 1.3.4, 1.6.2, 1.6.8, 1.7.3 |
| 14 | Claude/Codex แบ่งบทบาทกันยังไง | ✅ LOCKED — ดู `Vision_Decisions.md` ข้อ 2.8 |
| 15 | Learning Roadmap vs Job-Transition Timeline ตัดกันตรงไหน | ✅ LOCKED — เรียนครบทุก Phase ไม่ตัดจบกลางทาง, ไม่ต้องอัปเดต Portfolio เพิ่ม |
| 16 | VPS Provider เจ้าไหน | 🔲 Deferred — ไม่เร่งด่วน รอถึง Phase 1.8 |
| 17 | ร่างไฟล์ `AGENTS.md` (root ของ `ApoRaviz_DevEng`) ให้ Codex/Claude Code อ่าน context อัตโนมัติ | ✅ LOCKED — ร่างแล้วและปรับให้ดึง context จาก `Vision_Decisions.md`, `Roadmap_Progress.md`, `Open_Questions.md`, และ Discussion Summary V0.0.12 |
| 18 | แตกเอกสารหลักเป็นไฟล์ย่อยตามอัตราการเปลี่ยนแปลง | ✅ LOCKED (V0.0.9) — แตกเป็น `Vision_Decisions.md` / `Roadmap_Progress.md` / `Open_Questions.md` แล้ว |
| 26 | Private Planning Repo — รวม planning ทุกโปรเจกต์ไว้ที่เดียว (private) | 🔲 Planned — ทำตอน Step 0.4 (Git Workflow) เป็น use case เรียน git remote จริง; รายละเอียด/จุดแทรกดูหัวข้อด้านล่าง |

---

## #26 รายละเอียด — Private Planning Repo (brief สำหรับ Codex)

**ปัญหา:** planning docs (`Vision_Decisions.md`, `Roadmap_Progress.md`, `Open_Questions.md`, `Project_Vision_Discussion_Summary_V0_0_12.md`) ตอนนี้ลอยที่ workspace root แบบ **non-git** = ไม่ backup, เปลี่ยนเครื่องหาย และ 2 ไฟล์มี **personal context** (การเงิน/สุขภาพภรรยา) จึงเข้า public repo (`_docs`, DevEng) ไม่ได้

**ทางแก้:** private repo เดียว รวม planning ของ**ทุกโปรเจกต์** แบ่ง subfolder ต่อโปรเจกต์ — model = N public code repo + **1** private planning repo (ไม่โตตามจำนวนโปรเจกต์)

```text
ApoRaviz_Plan   (private ตลอดไป / ไม่มี code / ชื่ออาจเปลี่ยน แต่ใช้ให้ตรงกันทุกที่)
├── deveng/
│   ├── Vision_Decisions.md
│   ├── Roadmap_Progress.md
│   ├── Open_Questions.md
│   └── Project_Vision_Discussion_Summary_V0_0_12.md
├── <project-b>/
└── <project-c>/
```

**ต้องแทรก/wire ที่ไหน** (register ที่ canonical ก่อน อย่า duplicate):

| จุด | ไฟล์ / section | ทำอะไร |
|---|---|---|
| 1 | `_docs/WORKSPACE_PLAN.md` → Project Registry | เพิ่มแถว `ApoRaviz_Plan` (private / planning+personal ทุกโปรเจกต์) — single-source ของทะเบียน repo |
| 2 | `_docs/WORKSPACE_RULES.md` → North Star | ยก rule เป็น canonical: "personal context + planning → private planning repo เท่านั้น ห้ามเข้า public repo ใด ๆ" |
| 3 | `_docs/AI_UPDATE_RULE.md` → Source Of Truth + Decision Table | เพิ่ม route: "planning/vision/roadmap/personal → `ApoRaviz_Plan/<project>/` (private) ไม่ใช่ `_docs`" |
| 4 | `_docs/NEW_PROJECT_GUIDE.md` + `PROJECT_START_HERE.md` checklist | เพิ่ม step: โปรเจกต์ใหม่ที่มี planning/personal → สร้างโฟลเดอร์ `ApoRaviz_Plan/<project>/` (ไม่สร้าง repo ใหม่) |
| 5 | `ApoRaviz_DevEng/AGENTS.md` (บรรทัด ~21-24, 185, 266) + `CLAUDE.md` (~14, 16) | update path: `../<file>` → `../ApoRaviz_Plan/deveng/<file>` (`../_docs` ไม่ต้องแตะ) |
| 6 | ย้ายไฟล์จริง | 4 ไฟล์ root → `ApoRaviz_Plan/deveng/` แล้ว `git init` → commit → add remote (private) → push |

**Guardrails:**

- `ApoRaviz_Plan` = private ตลอดไป; แถว/rule ที่ลงใน `_docs` (public) เขียนแค่ **role** ห้าม copy personal content
- path ใช้ relative เท่านั้น (`../ApoRaviz_Plan/...`) ไม่ hardcode path เต็มเครื่อง (machine-agnostic)
- canonical ทะเบียน repo = `WORKSPACE_PLAN.md` Registry — role-list อื่น (WORKSPACE_RULES/PROJECT_START_HERE) ถ้าใส่ด้วยต้อง sync ให้ตรง อย่า drift
- ระหว่างรอ Step 0.4: backup 4 ไฟล์ขึ้น cloud drive กันเครื่องพัง

**เสร็จแล้ว:** ส่ง Claude review ตามกติกา 2.4 (diff + docs build ถ้าแตะ `_docs`)
