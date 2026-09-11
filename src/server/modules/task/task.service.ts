import { type Prisma, type PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams } from '../../shared/pagination';
import type { CreateTaskBody, ListTasksQuery, UpdateTaskBody } from './task.schema';

const client: PrismaClient = prisma;

// Ambil daftar task dengan filter status/project/assignee/team + pagination.
// Task yang sudah soft-deleted (deletedAt terisi) selalu dikecualikan dari list.
export async function listTasks(filter: ListTasksQuery) {
  const params = toPaginationParams(filter);
  const where: Prisma.TaskWhereInput = {
    deletedAt: null,
    ...(filter.status ? { status: filter.status } : {}),
    ...(filter.projectId ? { projectId: filter.projectId } : {}),
    ...(filter.assigneeId ? { assigneeId: filter.assigneeId } : {}),
    ...(filter.teamId ? { teamId: filter.teamId } : {}),
  };
  const [data, total] = await Promise.all([
    client.task.findMany({ where, skip: params.skip, take: params.take, orderBy: { createdAt: 'desc' } }),
    client.task.count({ where }),
  ]);
  return toPaginatedResult(data, total, params);
}

// Ambil satu task by id. Task yang sudah soft-deleted dianggap tidak ada (404) —
// konsisten dengan list yang mengecualikannya; histori tetap ada lewat TaskEvent.
export async function getTaskById(id: string) {
  const task = await client.task.findUnique({ where: { id } });
  if (!task || task.deletedAt) throw new ApiError(404, `Task ${id} tidak ditemukan`);
  return task;
}

// Buat task baru — projectId & creatorId wajib valid (FK), status default OPEN dari schema.
export async function createTask(body: CreateTaskBody) {
  try {
    return await client.task.create({
      data: { ...body, dueAt: body.dueAt ? new Date(body.dueAt) : undefined },
    });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal membuat task');
  }
}

// Update sebagian field task (lihat task.schema.ts untuk field yang boleh diubah lewat PATCH).
export async function updateTask(id: string, body: UpdateTaskBody) {
  await getTaskById(id); // 404 kalau tidak ada / sudah soft-deleted
  try {
    return await client.task.update({
      where: { id },
      data: {
        ...body,
        dueAt: body.dueAt !== undefined ? new Date(body.dueAt) : undefined,
        blockedAt: body.blockedAt !== undefined ? new Date(body.blockedAt) : undefined,
      },
    });
  } catch (error) {
    throw mapPrismaError(error, `Gagal update task ${id}`);
  }
}

// Soft delete: set deletedAt, bukan hapus baris — sesuai kolom deletedAt+index di schema
// supaya histori TaskEvent (onDelete: Cascade ke Task) tidak ikut hilang.
export async function softDeleteTask(id: string) {
  await getTaskById(id); // 404 kalau tidak ada / sudah ter-soft-delete sebelumnya
  try {
    await client.task.update({ where: { id }, data: { deletedAt: new Date() } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal hapus task ${id}`);
  }
}
