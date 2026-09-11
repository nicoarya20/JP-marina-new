import { Elysia, t } from 'elysia';
import * as userService from './user.service';
import { createUserBody, listUsersQuery, updateUserBody, userParams } from './user.schema';

export const userRoutes = new Elysia({ prefix: '/users', tags: ['User'] })
  .get('/', ({ query }) => userService.listUsers(query), { query: listUsersQuery })
  .get('/:id', ({ params }) => userService.getUserById(params.id), { params: userParams })
  .post('/', ({ body, set }) => {
    set.status = 201;
    return userService.createUser(body);
  }, { body: createUserBody })
  .patch('/:id', ({ params, body }) => userService.updateUser(params.id, body), {
    params: userParams,
    body: updateUserBody,
  })
  .delete('/:id', async ({ params, set }) => {
    await userService.deleteUser(params.id);
    set.status = 204;
  }, { params: userParams, response: { 204: t.Void() } });
