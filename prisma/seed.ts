import {
  ActorType,
  PrismaClient,
  ProjectStatus,
  TaskEventType,
  TaskStatus,
  TaskType,
  UserRole,
} from '@prisma/client';

// PrismaClient sendiri (bukan singleton src/lib/prisma.ts) — script ini short-lived dan harus bisa
// diarahkan ke DATABASE_URL apa pun saat dijalankan (dev ATAU TEST_DATABASE_URL, lihat package.json).
const prisma = new PrismaClient();

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

// Hapus data lama dalam urutan FK yang benar (child dulu) supaya seed idempotent — aman diulang.
async function cleanup() {
  await prisma.taskEvent.deleteMany();
  await prisma.task.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.team.deleteMany();
  await prisma.user.deleteMany();
  await prisma.escalationPolicy.deleteMany();
}

async function main() {
  await cleanup();

  const [admin, manajerBackend, manajerFrontend, staf1, staf2, staf3, peninjau] = await Promise.all([
    prisma.user.create({ data: { name: 'Admin Utama', email: 'admin@seed.local', role: UserRole.ADMIN } }),
    prisma.user.create({
      data: { name: 'Manajer Backend', email: 'manajer.backend@seed.local', role: UserRole.MANAJER },
    }),
    prisma.user.create({
      data: { name: 'Manajer Frontend', email: 'manajer.frontend@seed.local', role: UserRole.MANAJER },
    }),
    prisma.user.create({ data: { name: 'Staf Satu', email: 'staf1@seed.local', role: UserRole.STAF } }),
    prisma.user.create({ data: { name: 'Staf Dua', email: 'staf2@seed.local', role: UserRole.STAF } }),
    prisma.user.create({ data: { name: 'Staf Tiga', email: 'staf3@seed.local', role: UserRole.STAF } }),
    prisma.user.create({ data: { name: 'Peninjau Satu', email: 'peninjau1@seed.local', role: UserRole.PENINJAU } }),
  ]);

  const teamBackend = await prisma.team.create({ data: { name: 'Tim Backend', managerId: manajerBackend.id } });
  const teamFrontend = await prisma.team.create({ data: { name: 'Tim Frontend', managerId: manajerFrontend.id } });

  await prisma.teamMember.createMany({
    data: [
      { userId: manajerBackend.id, teamId: teamBackend.id },
      { userId: staf1.id, teamId: teamBackend.id },
      { userId: staf2.id, teamId: teamBackend.id },
      { userId: manajerFrontend.id, teamId: teamFrontend.id },
      { userId: staf3.id, teamId: teamFrontend.id },
    ],
  });

  const inbox = await prisma.project.create({
    data: { name: 'Inbox', ownerId: admin.id, isInbox: true, status: ProjectStatus.ACTIVE },
  });
  const apiMigration = await prisma.project.create({
    data: { name: 'API Migration', ownerId: manajerBackend.id, teamId: teamBackend.id, status: ProjectStatus.ACTIVE },
  });
  const websiteRedesign = await prisma.project.create({
    data: {
      name: 'Website Redesign',
      ownerId: manajerFrontend.id,
      teamId: teamFrontend.id,
      status: ProjectStatus.ACTIVE,
    },
  });

  const taskOpen = await prisma.task.create({
    data: {
      type: TaskType.TASK,
      title: 'Setup skema database baru',
      description: 'Migrasi skema Task Manager ke Postgres.',
      projectId: apiMigration.id,
      creatorId: manajerBackend.id,
      assigneeId: staf1.id,
      teamId: teamBackend.id,
      status: TaskStatus.OPEN,
      dueAt: daysFromNow(7),
    },
  });

  const taskInProgress = await prisma.task.create({
    data: {
      type: TaskType.BUG,
      title: 'Perbaiki bug validasi email',
      projectId: apiMigration.id,
      creatorId: staf1.id,
      assigneeId: staf2.id,
      teamId: teamBackend.id,
      status: TaskStatus.IN_PROGRESS,
      dueAt: daysFromNow(2),
    },
  });

  const taskInReview = await prisma.task.create({
    data: {
      type: TaskType.QC,
      title: 'QC halaman checkout',
      projectId: websiteRedesign.id,
      creatorId: manajerFrontend.id,
      assigneeId: staf3.id,
      reviewerId: peninjau.id,
      teamId: teamFrontend.id,
      status: TaskStatus.IN_REVIEW,
    },
  });

  const taskBlocked = await prisma.task.create({
    data: {
      type: TaskType.TICKET,
      title: 'Tunggu akses API pihak ketiga',
      projectId: apiMigration.id,
      creatorId: manajerBackend.id,
      assigneeId: staf1.id,
      teamId: teamBackend.id,
      status: TaskStatus.IN_PROGRESS,
      blockedAt: new Date(),
    },
  });

  const taskReopened = await prisma.task.create({
    data: {
      type: TaskType.BUG,
      title: 'Bug login muncul lagi di production',
      projectId: websiteRedesign.id,
      creatorId: manajerFrontend.id,
      assigneeId: staf3.id,
      teamId: teamFrontend.id,
      status: TaskStatus.REOPENED,
      reopenCount: 1,
    },
  });

  const taskDeleted = await prisma.task.create({
    data: {
      type: TaskType.TASK,
      title: 'Task lama yang sudah dibatalkan',
      projectId: inbox.id,
      creatorId: admin.id,
      status: TaskStatus.DONE,
      deletedAt: new Date(), // contoh soft-deleted task, untuk uji filter list & 404 by id
    },
  });

  await prisma.taskEvent.createMany({
    data: [
      {
        taskId: taskOpen.id,
        type: TaskEventType.ASSIGNED,
        actorType: ActorType.USER,
        actorId: manajerBackend.id,
        payload: { assigneeId: staf1.id },
      },
      {
        taskId: taskInProgress.id,
        type: TaskEventType.STATUS_CHANGED,
        actorType: ActorType.USER,
        actorId: staf2.id,
        payload: { from: 'OPEN', to: 'IN_PROGRESS' },
      },
      {
        taskId: taskInReview.id,
        type: TaskEventType.STATUS_CHANGED,
        actorType: ActorType.USER,
        actorId: staf3.id,
        payload: { from: 'IN_PROGRESS', to: 'IN_REVIEW' },
      },
      {
        taskId: taskBlocked.id,
        type: TaskEventType.BLOCKED,
        actorType: ActorType.SYSTEM,
        payload: { reason: 'Menunggu API key vendor' },
      },
      {
        taskId: taskReopened.id,
        type: TaskEventType.REVIEW_RETURNED,
        actorType: ActorType.USER,
        actorId: peninjau.id,
        payload: { catatan: 'Bug muncul lagi setelah deploy' },
      },
      {
        taskId: taskReopened.id,
        type: TaskEventType.NUDGE_SENT,
        actorType: ActorType.AI,
        payload: { alasan: 'Task tidak ada progres > 3 hari' },
      },
      {
        taskId: taskDeleted.id,
        type: TaskEventType.DELETED,
        actorType: ActorType.SYSTEM,
        payload: { alasan: 'Task duplikat' },
      },
    ],
  });

  await prisma.escalationPolicy.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });

  console.log('Seed selesai: 7 users, 2 teams, 5 team members, 3 projects, 6 tasks, 7 task events, 1 escalation policy.');
}

main()
  .catch((error) => {
    console.error('Seed gagal:', error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
