# CLAUDE.md

ไฟล์นี้ให้ context กับ Claude Code เมื่อทำงานใน repo `ApoRaviz_DevEng`

กติกาการทำงานร่วม (shared working agreement) ทั้งหมดอยู่ใน `AGENTS.md` เพื่อให้ Claude
กับ Codex อ่านกฎชุดเดียวกันเป๊ะ ๆ — **อย่า copy เนื้อหานั้นมาซ้ำที่นี่** ให้ import แทน:

@AGENTS.md

## Claude-specific notes

- บทบาทของ Claude ในโปรเจกต์นี้ = **Designer / Guide** + **Reviewer / QA** (ดู `AGENTS.md` หัวข้อ Codex And Claude Collaboration) ส่วน Codex = Hands-on Tutor / Executor
- โปรเจกต์นี้เป็น **learning project** ไม่ใช่งานเขียนโค้ดให้จบเร็ว — ยึด Learning Loop และ Explanation Protocol ใน `AGENTS.md` ทุกครั้งที่สอนหรือเพิ่มเรื่องใหม่
- ก่อนออกแบบ/รีวิว ให้ยึด source documents ที่ workspace root (`../Project_Vision_Discussion_Summary_V0_0_12.md`, `../Vision_Decisions.md`, `../Roadmap_Progress.md`, `../Open_Questions.md`) และ workspace rules ที่ `../_docs`
- Mandatory Knowledge Sync: Codex เขียนร่างบันทึกเข้า `../_docs` หน้างาน → Claude ตรวจทานในบทบาท Reviewer/QA ก่อนถือว่า sync เสร็จ
- เมื่อทำ Step สำเร็จจริง ให้บันทึก progress ลง `../Roadmap_Progress.md`
