import { t } from 'elysia';
import { TaskStatus, TaskType } from '@prisma/client';
import { paginationQuery } from '../../shared/pagination';

export const taskParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const listTasksQuery = t.Composite([
  paginationQuery,
  t.Object({
    status: t.Optional(t.Enum(TaskStatus)),
    projectId: t.Optional(t.String({ minLength: 1 })),
    assigneeId: t.Optional(t.String({ minLength: 1 })),
    teamId: t.Optional(t.String({ minLength: 1 })),
  }),
]);

export const createTaskBody = t.Object({
  type: t.Enum(TaskType),
  title: t.String({ minLength: 1, maxLength: 300 }),
  description: t.Optional(t.String()),
  status: t.Optional(t.Enum(TaskStatus)),
  dueAt: t.Optional(t.String({ format: 'date-time' })),
  projectId: t.String({ minLength: 1 }),
  creatorId: t.String({ minLength: 1 }),
  assigneeId: t.Optional(t.String({ minLength: 1 })),
  teamId: t.Optional(t.String({ minLength: 1 })),
  reviewerId: t.Optional(t.String({ minLength: 1 })),
});

// Field yang boleh diubah lewat PATCH generik. Counter (rescheduleCount, reopenCount,
// escalationLevel, lastNudgedAt) dan deletedAt sengaja TIDAK di sini — itu dikelola lewat
// alur TaskEvent/soft-delete masing-masing, bukan overwrite bebas via PATCH.
export const updateTaskBody = t.Partial(
  t.Object({
    type: t.Enum(TaskType),
    title: t.String({ minLength: 1, maxLength: 300 }),
    description: t.Optional(t.String()),
    status: t.Enum(TaskStatus),
    dueAt: t.Optional(t.String({ format: 'date-time' })),
    assigneeId: t.Optional(t.String({ minLength: 1 })),
    teamId: t.Optional(t.String({ minLength: 1 })),
    reviewerId: t.Optional(t.String({ minLength: 1 })),
    blockedAt: t.Optional(t.String({ format: 'date-time' })),
  }),
);

export type CreateTaskBody = typeof createTaskBody.static;
export type UpdateTaskBody = typeof updateTaskBody.static;
export type ListTasksQuery = typeof listTasksQuery.static;
