import type { PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams, type PaginationQuery } from '../../shared/pagination';
import type { CreateTeamBody, UpdateTeamBody } from './team.schema';

const client: PrismaClient = prisma;

// Ambil daftar team dengan pagination.
export async function listTeams(query: PaginationQuery) {
  const params = toPaginationParams(query);
  const [data, total] = await Promise.all([
    client.team.findMany({ skip: params.skip, take: params.take, orderBy: { createdAt: 'desc' } }),
    client.team.count(),
  ]);
  return toPaginatedResult(data, total, params);
}

// Ambil satu team by id, lempar 404 kalau tidak ada.
export async function getTeamById(id: string) {
  const team = await client.team.findUnique({ where: { id } });
  if (!team) throw new ApiError(404, `Team ${id} tidak ditemukan`);
  return team;
}

// Buat team baru — managerId opsional, kalau diisi harus user yang valid (FK, P2003).
export async function createTeam(body: CreateTeamBody) {
  try {
    return await client.team.create({ data: body });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal membuat team');
  }
}

// Update sebagian field team.
export async function updateTeam(id: string, body: UpdateTeamBody) {
  try {
    return await client.team.update({ where: { id }, data: body });
  } catch (error) {
    throw mapPrismaError(error, `Gagal update team ${id}`);
  }
}

// Hapus team. Project/Task/TeamMember yang mereferensikan team ini akan memicu P2003 (tanpa cascade).
export async function deleteTeam(id: string) {
  try {
    await client.team.delete({ where: { id } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal hapus team ${id}`);
  }
}
