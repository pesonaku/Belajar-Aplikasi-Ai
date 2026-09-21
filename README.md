# Backend API (Bun + ElysiaJS + Drizzle ORM + MySQL)

Proyek backend API berkinerja tinggi yang dibangun menggunakan ekosistem Bun, framework ElysiaJS, Drizzle ORM, dan database MySQL. Dibuat untuk menyelesaikan [GitHub Issue #2](https://github.com/pesonaku/Belajar-Aplikasi-Ai/issues/2).

## Tech Stack
- **Runtime:** [Bun](https://bun.sh/)
- **Framework:** [ElysiaJS](https://elysiajs.com/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Database Driver:** `mysql2`
- **Database:** MySQL

---

## Struktur Folder

```text
.
├── drizzle/                    # File hasil generate migrasi SQL
│   └── 0000_rare_omega_sentinel.sql
├── src/
│   ├── db/
│   │   ├── index.ts           # Inisialisasi koneksi MySQL pool & Drizzle ORM
│   │   └── schema.ts          # Definisi skema tabel (users)
│   └── index.ts               # Entry point aplikasi & route handler Elysia
├── test/
│   └── index.test.ts          # Unit test menggunakan Bun Test
├── .env.example               # Contoh variabel lingkungan
├── .env                       # File konfigurasi environment lokal
├── drizzle.config.ts          # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

---

## Panduan Memulai (Quickstart)

### 1. Instalasi Dependensi
Pastikan [Bun](https://bun.sh/) sudah terinstal di komputer Anda:
```bash
bun install
```

### 2. Konfigurasi Database (.env)
Sesuaikan URL koneksi MySQL di file `.env`:
```env
PORT=3000
DATABASE_URL=mysql://root:@localhost:3306/belajar_ai
```

### 3. Migrasi Skema Database
Pastikan server MySQL Anda sudah aktif dan database (misalnya `belajar_ai`) sudah dibuat.

Untuk menerapkan skema tabel langsung ke MySQL:
```bash
bun run db:push
```
Atau jika ingin membuat file migrasi SQL baru setelah mengubah skema:
```bash
bun run db:generate
```

### 4. Menjalankan Server
Mode pengembangan (dengan auto-reload):
```bash
bun run dev
```

Mode produksi:
```bash
bun run start
```
Server akan berjalan di `http://localhost:3000`.

---

## Daftar Endpoint API

### 1. Health Check
- **Endpoint:** `GET /`
- **Deskripsi:** Menampilkan status server dan konektivitas database.
- **Contoh Respons:**
```json
{
  "message": "Hello World from Elysia + Bun!",
  "database": "Connected",
  "timestamp": "2026-09-22T02:27:00.000Z"
}
```

### 2. Dapatkan Semua Pengguna
- **Endpoint:** `GET /users`
- **Deskripsi:** Mengambil semua data pengguna dari tabel `users`.
- **Contoh Respons:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2026-09-22T02:27:00.000Z"
    }
  ]
}
```

### 3. Tambah Pengguna Baru
- **Endpoint:** `POST /users`
- **Headers:** `Content-Type: application/json`
- **Body:**
```json
{
  "name": "Budi",
  "email": "budi@example.com"
}
```
- **Contoh Respons:**
```json
{
  "success": true,
  "message": "User created successfully"
}
```

---

## Menjalankan Pengujian (Testing)
Jalankan unit test bawaan Bun:
```bash
bun test
```
