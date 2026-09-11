import { t } from 'elysia';
import { paginationQuery } from '../../shared/pagination';

// Nama param sengaja "id" (bukan "teamId") supaya konsisten dengan team.routes.ts —
// Elysia/memoirist menolak dua nama parameter berbeda di posisi path yang sama (/teams/:x).
export const teamMemberListParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const teamMemberDeleteParams = t.Object({
  id: t.String({ minLength: 1 }),
  memberId: t.String({ minLength: 1 }),
});

export const listTeamMembersQuery = paginationQuery;

export const addTeamMemberBody = t.Object({
  userId: t.String({ minLength: 1 }),
});

export type AddTeamMemberBody = typeof addTeamMemberBody.static;
