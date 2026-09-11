import { type Prisma, type PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams } from '../../shared/pagination';
import type { CreateProjectBody, ListProjectsQuery, UpdateProjectBody } from './project.schema';

const client: PrismaClient = prisma;

// Ambil daftar project dengan filter status/owner/team + pagination.
export async function listProjects(filter: ListProjectsQuery) {
  const params = toPaginationParams(filter);
  const where: Prisma.ProjectWhereInput = {
    ...(filter.status ? { status: filter.status } : {}),
    ...(filter.ownerId ? { ownerId: filter.ownerId } : {}),
    ...(filter.teamId ? { teamId: filter.teamId } : {}),
  };
  const [data, total] = await Promise.all([
    client.project.findMany({ where, skip: params.skip, take: params.take, orderBy: { createdAt: 'desc' } }),
    client.project.count({ where }),
  ]);
  return toPaginatedResult(data, total, params);
}

// Ambil satu project by id, lempar 404 kalau tidak ada.
export async function getProjectById(id: string) {
  const project = await client.project.findUnique({ where: { id } });
  if (!project) throw new ApiError(404, `Project ${id} tidak ditemukan`);
  return project;
}

// Buat project baru — ownerId wajib user valid, teamId opsional (FK, P2003 kalau tidak valid).
export async function createProject(body: CreateProjectBody) {
  try {
    return await client.project.create({ data: body });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal membuat project');
  }
}

// Update sebagian field project.
export async function updateProject(id: string, body: UpdateProjectBody) {
  try {
    return await client.project.update({ where: { id }, data: body });
  } catch (error) {
    throw mapPrismaError(error, `Gagal update project ${id}`);
  }
}

// Hapus project. Task yang masih mereferensikan project ini akan memicu P2003 (tanpa cascade).
export async function deleteProject(id: string) {
  try {
    await client.project.delete({ where: { id } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal hapus project ${id}`);
  }
}
