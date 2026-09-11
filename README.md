# Task Manager

TanStack Start + Vite (frontend) dengan Prisma (Postgres) sebagai skema data. Lihat `prisma/schema.prisma` untuk model data.

## Setup

```bash
bun install
cp .env.example .env   # isi DATABASE_URL, dst.
bunx prisma migrate dev
```

## Frontend (TanStack Start)

```bash
bun run dev         # dev server (Vite)
bun run build       # build production
bun run typecheck   # type check
```

## Task Manager API (Elysia)

REST API untuk model Task Manager (User, Team, TeamMember, Project, Task, TaskEvent, EscalationPolicy).
Proses Bun terpisah dari frontend — port & lifecycle sendiri, tidak menyatu dengan TanStack Start.

```bash
bun run server:dev     # dev, auto-reload (bun --watch)
bun run server:start   # start tanpa watch
```

Env yang dibutuhkan (lihat `.env.example`):

| Variable | Wajib | Default | Keterangan |
|---|---|---|---|
| `DATABASE_URL` | ya | – | Koneksi Postgres dev/prod (dipakai Prisma) |
| `API_PORT` | tidak | `3001` | Port HTTP server API |
| `CORS_ORIGIN` | tidak | semua origin | Origin yang diizinkan CORS |
| `TEST_DATABASE_URL` | ya (untuk test) | – | Postgres **terpisah** untuk `bun test`, jangan disamakan dengan `DATABASE_URL` |

Setelah server jalan, Swagger UI untuk eksplorasi/test endpoint ada di:

```
http://localhost:3001/swagger
```

(ganti `3001` kalau `API_PORT` di-set berbeda)

### Test

```bash
bunx prisma migrate deploy   # sekali, ke DB yang ditunjuk TEST_DATABASE_URL
bun run test
```
