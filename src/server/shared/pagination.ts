import { t } from 'elysia';

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Query schema pagination yang dipakai di semua endpoint list (GET /..).
export const paginationQuery = t.Object({
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  pageSize: t.Optional(t.Numeric({ minimum: 1, maximum: MAX_PAGE_SIZE, default: DEFAULT_PAGE_SIZE })),
});

export type PaginationQuery = {
  page?: number;
  pageSize?: number;
};

export type PaginationParams = {
  skip: number;
  take: number;
  page: number;
  pageSize: number;
};

// Ubah query page/pageSize (sudah divalidasi t.Numeric di route) jadi skip/take untuk Prisma.
export function toPaginationParams(query: PaginationQuery): PaginationParams {
  const page = query.page && query.page > 0 ? query.page : 1;
  const pageSize = query.pageSize && query.pageSize > 0 ? Math.min(query.pageSize, MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;
  return { skip: (page - 1) * pageSize, take: pageSize, page, pageSize };
}

export type PaginatedResult<T> = {
  data: T[];
  meta: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

// Bungkus hasil query + total count jadi bentuk respons paginated yang konsisten.
export function toPaginatedResult<T>(data: T[], total: number, params: PaginationParams): PaginatedResult<T> {
  return {
    data,
    meta: {
      page: params.page,
      pageSize: params.pageSize,
      total,
      totalPages: Math.ceil(total / params.pageSize),
    },
  };
}
