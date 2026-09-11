import { t } from 'elysia';
import { paginationQuery } from '../../shared/pagination';

export const teamParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const listTeamsQuery = paginationQuery;

export const createTeamBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 200 }),
  managerId: t.Optional(t.String({ minLength: 1 })),
});

export const updateTeamBody = t.Partial(createTeamBody);

export type CreateTeamBody = typeof createTeamBody.static;
export type UpdateTeamBody = typeof updateTeamBody.static;
