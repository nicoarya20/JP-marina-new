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

describe('Project routes', () => {
  it('CRUD happy path: create, list (filter status), get, update, delete', async () => {
    const owner = await testDb.user.create({ data: { name: 'Owner', email: 'owner@example.com', role: 'MANAJER' } });

    const createRes = await request('/projects', jsonBody('POST', { name: 'Website Baru', ownerId: owner.id }));
    expect(createRes.status).toBe(201);
    const created = await createRes.json();
    expect(created.status).toBe('ACTIVE');

    const listRes = await request(`/projects?status=ACTIVE&ownerId=${owner.id}`);
    const list = await listRes.json();
    expect(list.meta.total).toBe(1);

    const getRes = await request(`/projects/${created.id}`);
    expect(getRes.status).toBe(200);

    const patchRes = await request(`/projects/${created.id}`, jsonBody('PATCH', { status: 'ON_HOLD' }));
    expect(patchRes.status).toBe(200);
    expect((await patchRes.json()).status).toBe('ON_HOLD');

    const deleteRes = await request(`/projects/${created.id}`, { method: 'DELETE' });
    expect(deleteRes.status).toBe(204);
  });

  it('returns 400 when ownerId merujuk user yang tidak ada', async () => {
    const res = await request('/projects', jsonBody('POST', { name: 'Project X', ownerId: 'user-tidak-ada' }));
    expect(res.status).toBe(400);
  });
});
