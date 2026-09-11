import { Prisma } from '@prisma/client';

// Error HTTP eksplisit (status + message) yang dilempar dari service layer.
// Route/global error handler tinggal memetakan ke response, tanpa perlu tahu detail Prisma.
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

// Petakan error Prisma yang umum jadi ApiError dengan context — dipakai di semua *.service.ts
// supaya tidak ada `throw e` mentah atau `catch {}` kosong.
export function mapPrismaError(error: unknown, context: string): ApiError {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2025':
        return new ApiError(404, `${context}: data tidak ditemukan`);
      case 'P2002': {
        const target = Array.isArray(error.meta?.target) ? error.meta.target.join(', ') : String(error.meta?.target ?? '');
        return new ApiError(409, `${context}: sudah ada data dengan ${target || 'nilai unik yang sama'}`);
      }
      case 'P2003':
        return new ApiError(400, `${context}: referensi relasi tidak valid (foreign key)`);
      default:
        return new ApiError(500, `${context}: gagal query database (${error.code})`);
    }
  }
  if (error instanceof ApiError) return error;
  const message = error instanceof Error ? error.message : String(error);
  return new ApiError(500, `${context}: ${message}`);
}
