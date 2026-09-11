import type { PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams, type PaginationQuery } from '../../shared/pagination';
import type { CreateTaskEventBody } from './task-event.schema';

const client: PrismaClient = prisma;

// Ambil histori event sebuah task, urut createdAt naik (kronologis).
// Sengaja tidak memfilter deletedAt task — event tetap harus terbaca untuk task yang sudah
// soft-deleted (mis. untuk menampilkan event DELETED itu sendiri).
export async function listTaskEvents(taskId: string, query: PaginationQuery) {
  await assertTaskExists(taskId);
  const params = toPaginationParams(query);
  const where = { taskId };
  const [data, total] = await Promise.all([
    client.taskEvent.findMany({ where, skip: params.skip, take: params.take, orderBy: { createdAt: 'asc' } }),
    client.taskEvent.count({ where }),
  ]);
  return toPaginatedResult(data, total, params);
}

// Tambah event baru — append-only, tanpa update/delete (audit log Fork #4).
export async function createTaskEvent(taskId: string, body: CreateTaskEventBody) {
  await assertTaskExists(taskId);
  validateActor(body);
  try {
    return await client.taskEvent.create({
      data: {
        taskId,
        type: body.type,
        actorType: body.actorType,
        actorId: body.actorId ?? null,
        payload: body.payload ?? undefined,
      },
    });
  } catch (error) {
    throw mapPrismaError(error, `Gagal mencatat event untuk task ${taskId}`);
  }
}

async function assertTaskExists(taskId: string) {
  const task = await client.task.findUnique({ where: { id: taskId } });
  if (!task) throw new ApiError(404, `Task ${taskId} tidak ditemukan`);
}

// Business rule non-obvious: actor USER wajib punya actorId (baris User beneran),
// sedangkan actor AI/SYSTEM tidak boleh punya actorId (tidak ada baris User untuk itu).
function validateActor(body: CreateTaskEventBody) {
  if (body.actorType === 'USER' && !body.actorId) {
    throw new ApiError(400, 'actorId wajib diisi kalau actorType adalah USER');
  }
  if (body.actorType !== 'USER' && body.actorId) {
    throw new ApiError(400, 'actorId harus kosong kalau actorType adalah AI atau SYSTEM');
  }
}
