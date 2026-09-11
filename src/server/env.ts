// Baca & validasi environment variable yang dipakai proses API (terpisah dari Vite/TanStack Start).

const DEFAULT_API_PORT = 3001;

function parsePort(raw: string | undefined, fallback: number): number {
  if (!raw) return fallback;
  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`API_PORT tidak valid: "${raw}" — harus integer 1-65535`);
  }
  return parsed;
}

export const env = {
  API_PORT: parsePort(process.env.API_PORT, DEFAULT_API_PORT),
  // Opsional: kalau tidak di-set, CORS dibuka untuk semua origin (cocok untuk dev lokal).
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
