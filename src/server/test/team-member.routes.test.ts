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

async function seedTeamAndUser() {
  const user = await testDb.user.create({ data: { name: 'Staf', email: 'staf@example.com', role: 'STAF' } });
  const team = await testDb.team.create({ data: { name: 'Tim A' } });
  return { user, team };
}

describe('TeamMember routes', () => {
  it('happy path: add member, list, remove', async () => {
    const { user, team } = await seedTeamAndUser();

    const addRes = await request(`/teams/${team.id}/members`, jsonBody('POST', { userId: user.id }));
    expect(addRes.status).toBe(201);
    const member = await addRes.json();
    expect(member.userId).toBe(user.id);

    const listRes = await request(`/teams/${team.id}/members`);
    const list = await listRes.json();
    expect(list.meta.total).toBe(1);

    const removeRes = await request(`/teams/${team.id}/members/${member.id}`, { method: 'DELETE' });
    expect(removeRes.status).toBe(204);

    const listAfter = await (await request(`/teams/${team.id}/members`)).json();
    expect(listAfter.meta.total).toBe(0);
  });

  it('returns 409 when user sudah jadi member team tersebut', async () => {
    const { user, team } = await seedTeamAndUser();
    await request(`/teams/${team.id}/members`, jsonBody('POST', { userId: user.id }));
    const dupRes = await request(`/teams/${team.id}/members`, jsonBody('POST', { userId: user.id }));
    expect(dupRes.status).toBe(409);
  });

  it('returns 404 saat hapus member dengan teamId yang salah', async () => {
    const { user, team } = await seedTeamAndUser();
    const otherTeam = await testDb.team.create({ data: { name: 'Tim Lain' } });
    const addRes = await request(`/teams/${team.id}/members`, jsonBody('POST', { userId: user.id }));
    const member = await addRes.json();

    const res = await request(`/teams/${otherTeam.id}/members/${member.id}`, { method: 'DELETE' });
    expect(res.status).toBe(404);
  });
});
