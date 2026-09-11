import { Elysia } from 'elysia';
import * as escalationPolicyService from './escalation-policy.service';
import { updateEscalationPolicyBody } from './escalation-policy.schema';

export const escalationPolicyRoutes = new Elysia({ prefix: '/escalation-policy', tags: ['EscalationPolicy'] })
  .get('/', () => escalationPolicyService.getEscalationPolicy())
  .patch('/', ({ body }) => escalationPolicyService.updateEscalationPolicy(body), {
    body: updateEscalationPolicyBody,
  });
