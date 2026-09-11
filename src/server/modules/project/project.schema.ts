import { t } from 'elysia';
import { ProjectStatus } from '@prisma/client';
import { paginationQuery } from '../../shared/pagination';

export const projectParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const listProjectsQuery = t.Composite([
  paginationQuery,
  t.Object({
    status: t.Optional(t.Enum(ProjectStatus)),
    ownerId: t.Optional(t.String({ minLength: 1 })),
    teamId: t.Optional(t.String({ minLength: 1 })),
  }),
]);

export const createProjectBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 200 }),
  status: t.Optional(t.Enum(ProjectStatus)),
  ownerId: t.String({ minLength: 1 }),
  teamId: t.Optional(t.String({ minLength: 1 })),
  isInbox: t.Optional(t.Boolean()),
});

export const updateProjectBody = t.Partial(createProjectBody);

export type CreateProjectBody = typeof createProjectBody.static;
export type UpdateProjectBody = typeof updateProjectBody.static;
export type ListProjectsQuery = typeof listProjectsQuery.static;
