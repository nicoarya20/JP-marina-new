import { Elysia, t } from 'elysia';
import * as projectService from './project.service';
import { createProjectBody, listProjectsQuery, projectParams, updateProjectBody } from './project.schema';

export const projectRoutes = new Elysia({ prefix: '/projects', tags: ['Project'] })
  .get('/', ({ query }) => projectService.listProjects(query), { query: listProjectsQuery })
  .get('/:id', ({ params }) => projectService.getProjectById(params.id), { params: projectParams })
  .post('/', ({ body, set }) => {
    set.status = 201;
    return projectService.createProject(body);
  }, { body: createProjectBody })
  .patch('/:id', ({ params, body }) => projectService.updateProject(params.id, body), {
    params: projectParams,
    body: updateProjectBody,
  })
  .delete('/:id', async ({ params, set }) => {
    await projectService.deleteProject(params.id);
    set.status = 204;
  }, { params: projectParams, response: { 204: t.Void() } });
