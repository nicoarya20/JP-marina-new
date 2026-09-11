import type { PrismaClient } from '@prisma/client';
import prisma from '~/lib/prisma';
import { mapPrismaError } from '../../shared/http-error';
import type { UpdateEscalationPolicyBody } from './escalation-policy.schema';

const client: PrismaClient = prisma;

// Id singleton tetap — hanya ada satu baris EscalationPolicy di seluruh sistem.
const SINGLETON_ID = 1;

// Ambil policy singleton. Kalau belum pernah dibuat, upsert dengan default schema (Prisma @default).
export async function getEscalationPolicy() {
  try {
    return await client.escalationPolicy.upsert({
      where: { id: SINGLETON_ID },
      update: {},
      create: { id: SINGLETON_ID },
    });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal mengambil escalation policy');
  }
}

// Update sebagian field policy singleton (upsert supaya PATCH pertama tetap jalan walau belum ada row).
export async function updateEscalationPolicy(body: UpdateEscalationPolicyBody) {
  try {
    return await client.escalationPolicy.upsert({
      where: { id: SINGLETON_ID },
      update: body,
      create: { id: SINGLETON_ID, ...body },
    });
  } catch (error) {
    throw mapPrismaError(error, 'Gagal update escalation policy');
  }
}
