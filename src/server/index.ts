import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { cors } from '@elysiajs/cors';
import { env } from './env';
import { ApiError } from './shared/http-error';
import { userRoutes } from './modules/user/user.routes';
import { teamRoutes } from './modules/team/team.routes';
import { teamMemberRoutes } from './modules/team-member/team-member.routes';
import { projectRoutes } from './modules/project/project.routes';
import { taskRoutes } from './modules/task/task.routes';
import { taskEventRoutes } from './modules/task-event/task-event.routes';
import { escalationPolicyRoutes } from './modules/escalation-policy/escalation-policy.routes';

export const app = new Elysia()
  .use(cors({ origin: env.CORS_ORIGIN ?? true }))
  .use(
    swagger({
      path: '/swagger',
      documentation: {
        info: {
          title: 'Task Manager API',
          version: '1.0.0',
          description: 'REST API untuk Task Manager (User, Team, Project, Task, TaskEvent, EscalationPolicy).',
        },
      },
    }),
  )
  .onError(({ code, error, set }) => {
    if (error instanceof ApiError) {
      set.status = error.status;
      return { error: error.message };
    }
    if (code === 'VALIDATION') {
      set.status = 400;
      return { error: 'Validasi gagal', detail: error.message };
    }
    if (code === 'NOT_FOUND') {
      set.status = 404;
      return { error: 'Route tidak ditemukan' };
    }
    // eslint-disable-next-line no-console -- log error tak terduga, tanpa payload sensitif
    console.error('Unhandled error:', code, error instanceof Error ? error.message : error);
    set.status = 500;
    return { error: 'Terjadi kesalahan internal' };
  })
  .use(userRoutes)
  .use(teamRoutes)
  .use(teamMemberRoutes)
  .use(projectRoutes)
  .use(taskRoutes)
  .use(taskEventRoutes)
  .use(escalationPolicyRoutes);

if (import.meta.main) {
  app.listen(env.API_PORT);
  // eslint-disable-next-line no-console -- lifecycle log, bukan debug log
  console.log(`Task Manager API jalan di http://localhost:${env.API_PORT} (Swagger: /swagger)`);
}
