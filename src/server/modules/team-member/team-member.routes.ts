import { Elysia, t } from 'elysia';
import * as teamMemberService from './team-member.service';
import {
  addTeamMemberBody,
  listTeamMembersQuery,
  teamMemberDeleteParams,
  teamMemberListParams,
} from './team-member.schema';

export const teamMemberRoutes = new Elysia({ prefix: '/teams', tags: ['TeamMember'] })
  .get('/:id/members', ({ params, query }) => teamMemberService.listTeamMembers(params.id, query), {
    params: teamMemberListParams,
    query: listTeamMembersQuery,
  })
  .post('/:id/members', ({ params, body, set }) => {
    set.status = 201;
    return teamMemberService.addTeamMember(params.id, body);
  }, { params: teamMemberListParams, body: addTeamMemberBody })
  .delete('/:id/members/:memberId', async ({ params, set }) => {
    await teamMemberService.removeTeamMember(params.id, params.memberId);
    set.status = 204;
  }, { params: teamMemberDeleteParams, response: { 204: t.Void() } });
