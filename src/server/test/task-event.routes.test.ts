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

async function seedTask() {
  const user = await testDb.user.create({ data: { name: 'Aktor', email: 'aktor@example.com', role: 'STAF' } });
  const project = await testDb.project.create({ data: { name: 'Proyek B', ownerId: user.id } });
  const task = await testDb.task.create({
    data: { type: 'TASK', title: 'Tugas B', projectId: project.id, creatorId: user.id },
  });
  return { user, task };
}

describe('TaskEvent routes', () => {
  it('happy path: append event by USER actor lalu terbaca di list urut createdAt', async () => {
    const { user, task } = await seedTask();

    const createRes = await request(
      `/tasks/${task.id}/events`,
      jsonBody('POST', { type: 'STATUS_CHANGED', actorType: 'USER', actorId: user.id, payload: { from: 'OPEN', to: 'IN_PROGRESS' } }),
    );
    expect(createRes.status).toBe(201);

    await request(
      `/tasks/${task.id}/events`,
      jsonBody('POST', { type: 'NUDGE_SENT', actorType: 'SYSTEM' }),
    );

    const listRes = await request(`/tasks/${task.id}/events`);
    expect(listRes.status).toBe(200);
    const list = await listRes.json();
    expect(list.meta.total).toBe(2);
    expect(list.data[0].type).toBe('STATUS_CHANGED');
    expect(list.data[1].type).toBe('NUDGE_SENT');
  });

  it('returns 400 saat actorType USER tanpa actorId', async () => {
    const { task } = await seedTask();
    const res = await request(`/tasks/${task.id}/events`, jsonBody('POST', { type: 'ASSIGNED', actorType: 'USER' }));
    expect(res.status).toBe(400);
  });

  it('returns 400 saat actorType SYSTEM tapi mengisi actorId', async () => {
    const { user, task } = await seedTask();
    const res = await request(
      `/tasks/${task.id}/events`,
      jsonBody('POST', { type: 'ASSIGNED', actorType: 'SYSTEM', actorId: user.id }),
    );
    expect(res.status).toBe(400);
  });
});
