import { t } from 'elysia';

// Singleton — tidak ada params id, selalu row id=1.
export const updateEscalationPolicyBody = t.Partial(
  t.Object({
    overdueGraceHours: t.Integer({ minimum: 0 }),
    stalledDays: t.Integer({ minimum: 0 }),
    rescheduleThreshold: t.Integer({ minimum: 0 }),
    reopenThreshold: t.Integer({ minimum: 0 }),
  }),
);

export type UpdateEscalationPolicyBody = typeof updateEscalationPolicyBody.static;
