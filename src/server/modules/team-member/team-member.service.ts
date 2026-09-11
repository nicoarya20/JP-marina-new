import type { PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams, type PaginationQuery } from '../../shared/pagination';
import type { AddTeamMemberBody } from './team-member.schema';

const client: PrismaClient = prisma;

// Ambil daftar member sebuah team (join table — tanpa endpoint update, hanya add/remove).
export async function listTeamMembers(teamId: string, query: PaginationQuery) {
  const params = toPaginationParams(query);
  const where = { teamId };
  const [data, total] = await Promise.all([
    client.teamMember.findMany({
      where,
      skip: params.skip,
      take: params.take,
      orderBy: { createdAt: 'asc' },
      include: { user: true },
    }),
    client.teamMember.count({ where }),
  ]);
  return toPaginatedResult(data, total, params);
}

// Tambahkan user ke team. Pasangan (userId, teamId) unik — P2002 kalau sudah jadi member.
export async function addTeamMember(teamId: string, body: AddTeamMemberBody) {
  try {
    return await client.teamMember.create({ data: { teamId, userId: body.userId }, include: { user: true } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal menambah member ke team ${teamId}`);
  }
}

// Hapus member dari team. Divalidasi eksplisit bahwa row memberId benar milik teamId
// (bukan cuma delete-by-id) supaya salah teamId di URL tidak diam-diam hapus row team lain.
export async function removeTeamMember(teamId: string, memberId: string) {
  const member = await client.teamMember.findUnique({ where: { id: memberId } });
  if (!member || member.teamId !== teamId) {
    throw new ApiError(404, `Member ${memberId} tidak ditemukan di team ${teamId}`);
  }
  try {
    await client.teamMember.delete({ where: { id: memberId } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal hapus member ${memberId}`);
  }
}
