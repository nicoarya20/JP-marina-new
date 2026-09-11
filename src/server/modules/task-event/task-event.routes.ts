import { Elysia } from 'elysia';
import * as taskEventService from './task-event.service';
import { createTaskEventBody, listTaskEventsQuery, taskEventListParams } from './task-event.schema';

export const taskEventRoutes = new Elysia({ prefix: '/tasks', tags: ['TaskEvent'] })
  .get('/:id/events', ({ params, query }) => taskEventService.listTaskEvents(params.id, query), {
    params: taskEventListParams,
    query: listTaskEventsQuery,
  })
  .post('/:id/events', ({ params, body, set }) => {
    set.status = 201;
    return taskEventService.createTaskEvent(params.id, body);
  }, { params: taskEventListParams, body: createTaskEventBody });
