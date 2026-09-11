import { beforeEach, describe, expect, it } from 'bun:test';
import { app } from '../index';
import { cleanupDb } from './test-db';

const request = (path: string, init?: RequestInit) => app.handle(new Request(`http://localhost${path}`, init));

const jsonBody = (body: unknown) => ({
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

beforeEach(cleanupDb);

describe('User routes', () => {
  it('CRUD happy path: create, list, get, update, delete', async () => {
    const createRes = await request('/users', jsonBody({ name: 'Budi', email: 'budi@example.com', role: 'STAF' }));
    expect(createRes.status).toBe(201);
    const created = await createRes.json();
    expect(created.email).toBe('budi@example.com');

    const listRes = await request('/users');
    expect(listRes.status).toBe(200);
    const list = await listRes.json();
    expect(list.data).toHaveLength(1);
    expect(list.meta.total).toBe(1);

    const getRes = await request(`/users/${created.id}`);
    expect(getRes.status).toBe(200);
    expect((await getRes.json()).id).toBe(created.id);

    const patchRes = await request(`/users/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Budi Santoso' }),
    });
    expect(patchRes.status).toBe(200);
    expect((await patchRes.json()).name).toBe('Budi Santoso');

    const deleteRes = await request(`/users/${created.id}`, { method: 'DELETE' });
    expect(deleteRes.status).toBe(204);

    const afterDeleteRes = await request(`/users/${created.id}`);
    expect(afterDeleteRes.status).toBe(404);
  });

  it('returns 409 when email already used', async () => {
    await request('/users', jsonBody({ name: 'Ani', email: 'ani@example.com', role: 'ADMIN' }));
    const dupRes = await request('/users', jsonBody({ name: 'Ani Lain', email: 'ani@example.com', role: 'STAF' }));
    expect(dupRes.status).toBe(409);
  });

  it('returns 400 when body invalid (role tidak dikenal)', async () => {
    const res = await request('/users', jsonBody({ name: 'X', email: 'x@example.com', role: 'BUKAN_ROLE' }));
    expect(res.status).toBe(400);
  });
});
