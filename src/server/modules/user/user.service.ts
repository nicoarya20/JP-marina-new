import { Prisma, type PrismaClient, type UserRole } from '@prisma/client';
import prisma from '~/lib/prisma';
import { ApiError, mapPrismaError } from '../../shared/http-error';
import { toPaginatedResult, toPaginationParams, type PaginationQuery } from '../../shared/pagination';
import type { CreateUserBody, UpdateUserBody } from './user.schema';

type ListUsersFilter = PaginationQuery & { role?: UserRole };

const client: PrismaClient = prisma;

// Ambil daftar user dengan filter role opsional + pagination.
export async function listUsers(filter: ListUsersFilter) {
  const params = toPaginationParams(filter);
  const where: Prisma.UserWhereInput = filter.role ? { role: filter.role } : {};
  const [data, total] = await Promise.all([
    client.user.findMany({ where, skip: params.skip, take: params.take, orderBy: { createdAt: 'desc' } }),
    client.user.count({ where }),
  ]);
  return toPaginatedResult(data, total, params);
}

// Ambil satu user by id, lempar 404 kalau tidak ada.
export async function getUserById(id: string) {
  const user = await client.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(404, `User ${id} tidak ditemukan`);
  return user;
}

// Buat user baru — email harus unik (P2002 ditangani mapPrismaError).
export async function createUser(body: CreateUserBody) {
  try {
    return await client.user.create({ data: body });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal membuat user');
  }
}

// Update sebagian field user; P2025 (id tidak ada) dipetakan ke 404.
export async function updateUser(id: string, body: UpdateUserBody) {
  try {
    return await client.user.update({ where: { id }, data: body });
  } catch (error) {
    throw mapPrismaError(error, `Gagal update user ${id}`);
  }
}

// Hapus user. Catatan: relasi Task/TeamMember/dll memakai FK tanpa cascade,
// jadi Prisma akan lempar P2003 kalau user masih direferensikan — dipetakan ke 400.
export async function deleteUser(id: string) {
  try {
    await client.user.delete({ where: { id } });
  } catch (error) {
    throw mapPrismaError(error, `Gagal hapus user ${id}`);
  }
}
