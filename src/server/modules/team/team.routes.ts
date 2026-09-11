import { Elysia, t } from 'elysia';
import * as teamService from './team.service';
import { createTeamBody, listTeamsQuery, teamParams, updateTeamBody } from './team.schema';

export const teamRoutes = new Elysia({ prefix: '/teams', tags: ['Team'] })
  .get('/', ({ query }) => teamService.listTeams(query), { query: listTeamsQuery })
  .get('/:id', ({ params }) => teamService.getTeamById(params.id), { params: teamParams })
  .post('/', ({ body, set }) => {
    set.status = 201;
    return teamService.createTeam(body);
  }, { body: createTeamBody })
  .patch('/:id', ({ params, body }) => teamService.updateTeam(params.id, body), {
    params: teamParams,
    body: updateTeamBody,
  })
  .delete('/:id', async ({ params, set }) => {
    await teamService.deleteTeam(params.id);
    set.status = 204;
  }, { params: teamParams, response: { 204: t.Void() } });
