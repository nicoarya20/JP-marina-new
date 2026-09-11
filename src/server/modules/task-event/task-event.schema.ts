import { t } from 'elysia';
import { ActorType, TaskEventType } from '@prisma/client';
import { paginationQuery } from '../../shared/pagination';

// Nama param sengaja "id" (bukan "taskId") supaya konsisten dengan task.routes.ts —
// Elysia/memoirist menolak dua nama parameter berbeda di posisi path yang sama (/tasks/:x).
export const taskEventListParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const listTaskEventsQuery = paginationQuery;

export const createTaskEventBody = t.Object({
  type: t.Enum(TaskEventType),
  actorType: t.Enum(ActorType),
  // Wajib diisi kalau actorType === USER, harus kosong kalau AI/SYSTEM — divalidasi di service.
  actorId: t.Optional(t.String({ minLength: 1 })),
  // Detail bebas per jenis event (changedFields, from/to, alasan AI, dll) — payload Json di schema.
  payload: t.Optional(t.Any()),
});

export type CreateTaskEventBody = typeof createTaskEventBody.static;
