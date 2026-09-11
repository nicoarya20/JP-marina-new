import { t } from 'elysia';
import { UserRole } from '@prisma/client';
import { paginationQuery } from '../../shared/pagination';

export const userParams = t.Object({
  id: t.String({ minLength: 1 }),
});

export const listUsersQuery = t.Composite([
  paginationQuery,
  t.Object({
    role: t.Optional(t.Enum(UserRole)),
  }),
]);

export const createUserBody = t.Object({
  name: t.String({ minLength: 1, maxLength: 200 }),
  email: t.String({ format: 'email' }),
  role: t.Enum(UserRole),
});

export const updateUserBody = t.Partial(createUserBody);

export type CreateUserBody = typeof createUserBody.static;
export type UpdateUserBody = typeof updateUserBody.static;
export type ListUsersQuery = typeof listUsersQuery.static;
