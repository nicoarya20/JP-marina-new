import { beforeEach, describe, expect, it } from 'bun:test';
import { app } from '../index';
import { cleanupDb, testDb } from './test-db';

const request = (path: string, init?: RequestInit) => app.handle(new Request(`http://localhost${path}`, init));

const jsonBody = (method: string, body: unknown) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

beforeEach(cleanupDb);

describe('Team routes', () => {
  it('CRUD happy path: create (with manager), list, get, update, delete', async () => {
    const manager = await testDb.user.create({ data: { name: 'Manajer', email: 'manajer@example.com', role: 'MANAJER' } });

    const createRes = await request('/teams', jsonBody('POST', { name: 'Tim Backend', managerId: manager.id }));
    expect(createRes.status).toBe(201);
    const created = await createRes.json();
    expect(created.managerId).toBe(manager.id);

    const listRes = await request('/teams');
    const list = await listRes.json();
    expect(list.meta.total).toBe(1);

    const getRes = await request(`/teams/${created.id}`);
    expect(getRes.status).toBe(200);

    const patchRes = await request(`/teams/${created.id}`, jsonBody('PATCH', { name: 'Tim Backend & Infra' }));
    expect(patchRes.status).toBe(200);
    expect((await patchRes.json()).name).toBe('Tim Backend & Infra');

    const deleteRes = await request(`/teams/${created.id}`, { method: 'DELETE' });
    expect(deleteRes.status).toBe(204);
  });

  it('returns 404 when team not found', async () => {
    const res = await request('/teams/does-not-exist');
    expect(res.status).toBe(404);
  });

  it('returns 400 when managerId merujuk user yang tidak ada', async () => {
    const res = await request('/teams', jsonBody('POST', { name: 'Tim X', managerId: 'user-tidak-ada' }));
    expect(res.status).toBe(400);
  });
});
