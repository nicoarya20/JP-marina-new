import { PrismaClient } from '@prisma/client';

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

if (!TEST_DATABASE_URL) {
  throw new Error(
    'TEST_DATABASE_URL belum di-set. Isi di .env dengan koneksi Postgres TEST (terpisah dari dev/prod), ' +
      'lalu jalankan `bunx prisma migrate deploy` ke DB tersebut sebelum `bun test`.',
  );
}

// PrismaClient terpisah untuk test — datasource eksplisit ke TEST_DATABASE_URL,
// tidak pernah menyentuh DB dev/prod (Rule #3).
export const testDb = new PrismaClient({
  datasources: { db: { url: TEST_DATABASE_URL } },
});

// Hapus semua data uji dalam urutan FK yang benar (child dulu, baru parent) supaya
// state tidak bocor antar test. Dipanggil di beforeEach setiap file test.
export async function cleanupDb() {
  await testDb.taskEvent.deleteMany();
  await testDb.task.deleteMany();
  await testDb.teamMember.deleteMany();
  await testDb.project.deleteMany();
  await testDb.team.deleteMany();
  await testDb.user.deleteMany();
  await testDb.escalationPolicy.deleteMany();
}
