import { beforeEach, describe, expect, it } from 'bun:test';
import { app } from '../index';
import { cleanupDb } from './test-db';

const request = (path: string, init?: RequestInit) => app.handle(new Request(`http://localhost${path}`, init));

beforeEach(cleanupDb);

describe('EscalationPolicy routes', () => {
  it('GET membuat singleton dengan default kalau belum ada, PATCH mengubah sebagian field', async () => {
    const getRes = await request('/escalation-policy');
    expect(getRes.status).toBe(200);
    const initial = await getRes.json();
    expect(initial.id).toBe(1);
    expect(initial.overdueGraceHours).toBe(24);
    expect(initial.stalledDays).toBe(3);

    const patchRes = await request('/escalation-policy', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ overdueGraceHours: 48 }),
    });
    expect(patchRes.status).toBe(200);
    const updated = await patchRes.json();
    expect(updated.overdueGraceHours).toBe(48);
    expect(updated.stalledDays).toBe(3); // field lain tidak ikut berubah

    const getAfter = await (await request('/escalation-policy')).json();
    expect(getAfter.overdueGraceHours).toBe(48);
  });

  it('returns 400 saat value negatif', async () => {
    const res = await request('/escalation-policy', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stalledDays: -1 }),
    });
    expect(res.status).toBe(400);
  });
});
