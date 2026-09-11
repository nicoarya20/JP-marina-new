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

async function seedProject() {
  const creator = await testDb.user.create({ data: { name: 'Creator', email: 'creator@example.com', role: 'STAF' } });
  const project = await testDb.project.create({ data: { name: 'Proyek A', ownerId: creator.id } });
  return { creator, project };
}

describe('Task routes', () => {
  it('CRUD happy path + soft delete', async () => {
    const { creator, project } = await seedProject();

    const createRes = await request(
      '/tasks',
      jsonBody('POST', { type: 'TASK', title: 'Kerjakan laporan', projectId: project.id, creatorId: creator.id }),
    );
    expect(createRes.status).toBe(201);
    const created = await createRes.json();
    expect(created.status).toBe('OPEN');

    const listRes = await request(`/tasks?projectId=${project.id}&status=OPEN`);
    const list = await listRes.json();
    expect(list.meta.total).toBe(1);

    const patchRes = await request(`/tasks/${created.id}`, jsonBody('PATCH', { status: 'IN_PROGRESS' }));
    expect(patchRes.status).toBe(200);
    expect((await patchRes.json()).status).toBe('IN_PROGRESS');

    const deleteRes = await request(`/tasks/${created.id}`, { method: 'DELETE' });
    expect(deleteRes.status).toBe(204);

    // Soft delete: baris masih ada di DB, hanya deletedAt terisi — bukan hilang.
    const rowInDb = await testDb.task.findUnique({ where: { id: created.id } });
    expect(rowInDb).not.toBeNull();
    expect(rowInDb?.deletedAt).not.toBeNull();

    // Tapi sudah tidak terlihat lewat API.
    const getAfterDelete = await request(`/tasks/${created.id}`);
    expect(getAfterDelete.status).toBe(404);
    const listAfterDelete = await (await request(`/tasks?projectId=${project.id}`)).json();
    expect(listAfterDelete.meta.total).toBe(0);
  });

  it('returns 400 when projectId tidak valid', async () => {
    const { creator } = await seedProject();
    const res = await request(
      '/tasks',
      jsonBody('POST', { type: 'TASK', title: 'Tugas', projectId: 'project-tidak-ada', creatorId: creator.id }),
    );
    expect(res.status).toBe(400);
  });
});
