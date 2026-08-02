# ApoRavizDevEng
Learning project for ApoRaviz DevEng.
Git practice uses clear commit messages.
Daily Git workflow checks local and remote sync before pushing.
Git conflict practice starts from the main branch version.
Git conflict practice also includes the feature branch version.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.0.

## Project structure

```text
ApoRaviz_DevEng/
├─ src/             Angular frontend
├─ backend/         NestJS backend (เส้นหลักระหว่างสร้าง MVP)
└─ backend-dotnet/  ASP.NET Core bridge สำหรับเรียนและทำ behavior parity ภายหลัง
```

Frontend และ backend ทั้งสอง implementation อยู่ใน Git repository เดียวกัน แต่แยก project,
dependencies และคำสั่ง build/test ออกจากกัน Angular frontend จะเลือก backend ผ่าน API base URL/configuration ไม่ได้มี frontend คนละชุด

ใช้ Node.js ตาม `.nvmrc` ก่อนติดตั้ง dependencies หรือรันโปรเจกต์

## Frontend development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Backend development server

ติดตั้ง dependencies และเปิด NestJS development server จากโฟลเดอร์ `backend`:

```bash
cd backend
npm install
npm run start:dev
```

Backend เริ่มต้นที่ `http://localhost:3000/` และจะ compile/restart อัตโนมัติเมื่อ source code เปลี่ยน

คำสั่งตรวจ backend:

```bash
cd backend
npm run lint
npm run build
npm test -- --runInBand
npm run test:e2e
```

## ASP.NET Core bridge

`backend-dotnet/global.json` เลือก .NET SDK สำหรับ bridge project จึงต้องเข้า directory tree ของ `backend-dotnet` ก่อนรัน `dotnet`:

```powershell
cd backend-dotnet
dotnet --version
dotnet build src/ApoRaviz.DevEng.Api/ApoRaviz.DevEng.Api.csproj
```

การอยู่ที่ repository root แล้วส่งเพียง path ของ `.csproj` อาจทำให้ `dotnet` เลือก SDK จากนอก scope ของ `backend-dotnet/global.json`

สถานะ checkpoint ปัจจุบันยังเป็น template `WeatherForecast`; `GET /health` และ test project อยู่ใน Step 1.1.9-2

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

Test again

