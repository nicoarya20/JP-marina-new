import { Elysia, t } from 'elysia';
import * as taskService from './task.service';
import { createTaskBody, listTasksQuery, taskParams, updateTaskBody } from './task.schema';

export const taskRoutes = new Elysia({ prefix: '/tasks', tags: ['Task'] })
  .get('/', ({ query }) => taskService.listTasks(query), { query: listTasksQuery })
  .get('/:id', ({ params }) => taskService.getTaskById(params.id), { params: taskParams })
  .post('/', ({ body, set }) => {
    set.status = 201;
    return taskService.createTask(body);
  }, { body: createTaskBody })
  .patch('/:id', ({ params, body }) => taskService.updateTask(params.id, body), {
    params: taskParams,
    body: updateTaskBody,
  })
  .delete('/:id', async ({ params, set }) => {
    await taskService.softDeleteTask(params.id);
    set.status = 204;
  }, { params: taskParams, response: { 204: t.Void() } });
