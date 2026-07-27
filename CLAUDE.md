# CLAUDE.md

ไฟล์นี้ให้ context กับ Claude Code เมื่อทำงานใน repo `ApoRaviz_DevEng`

กติกาการทำงานร่วม (shared working agreement) ทั้งหมดอยู่ใน `AGENTS.md` เพื่อให้ Claude
กับ Codex อ่านกฎชุดเดียวกันเป๊ะ ๆ — **อย่า copy เนื้อหานั้นมาซ้ำที่นี่** ให้ import แทน:

@AGENTS.md

## Claude-specific notes

- บทบาทของ Claude ในโปรเจกต์นี้ = **Designer / Guide** + **Reviewer / QA** (ดู `AGENTS.md` หัวข้อ Codex And Claude Collaboration) ส่วน Codex = Hands-on Tutor / Executor
- Default Working Mode ของโปรเจกต์นี้คือ `teach` ไม่ใช่งานเขียนโค้ดให้จบเร็ว — ยึด Learning Loop และ Explanation Protocol ใน `AGENTS.md` ทุกครั้งที่สอนหรือเพิ่มเรื่องใหม่
- ก่อนออกแบบ/รีวิว ให้ยึด source documents ใน repo นี้ (`docs/vision/Project_Vision_Discussion_Summary_V0_0_12.md`, `docs/vision/Vision_Decisions.md`, `docs/vision/Roadmap_Progress.md`, `docs/vision/Open_Questions.md`) และ workspace rules ที่ `../ApoRaviz_Workspace_Docs`
- Mandatory Knowledge Sync: ยึด flow ใน `AGENTS.md` และ `docs/vision/Vision_Decisions.md` ข้อ 2.4 — Claude ตรวจเฉพาะ changed files/ไฟล์เกี่ยวข้องโดยตรง, stamp เมื่อ PASS และห้าม commit/push; Codex เป็นผู้ตรวจ scope แล้ว commit/push
- เมื่อทำ Step สำเร็จจริง ให้บันทึก progress ลง `docs/vision/Roadmap_Progress.md`
