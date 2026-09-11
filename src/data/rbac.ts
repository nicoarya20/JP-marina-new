import type { Role } from './types'

export const roleLabel: Record<Role, string> = {
  ADMIN: 'Admin',
  MANAGER: 'Manajer',
  STAFF: 'Staf',
  REVIEWER: 'Peninjau',
}

export const roleOrder: Role[] = ['ADMIN', 'MANAGER', 'STAFF', 'REVIEWER']

// Tingkat akses per sel (lihat legenda wireframe §11 Matriks RBAC).
export type Access = 'full' | 'own' | 'join' | 'view' | 'none'

export const accessLabel: Record<Access, string> = {
  full: '✓',
  own: 'sendiri',
  join: 'ikut',
  view: 'lihat',
  none: '—',
}

export interface Capability {
  label: string
  grants: Record<Role, Access>
}

const g = (
  admin: Access,
  manager: Access,
  staff: Access,
  reviewer: Access,
): Record<Role, Access> => ({ ADMIN: admin, MANAGER: manager, STAFF: staff, REVIEWER: reviewer })

// Matriks 9 kemampuan × 4 peran (Flow 5).
export const capabilities: Capability[] = [
  { label: 'Kelola user & peran', grants: g('full', 'none', 'none', 'none') },
  { label: 'Atur aturan & kebijakan', grants: g('full', 'none', 'none', 'none') },
  { label: 'Buat & tugaskan tugas', grants: g('full', 'full', 'own', 'none') },
  { label: 'Assign kolaborator', grants: g('full', 'full', 'none', 'none') },
  { label: 'Kerjakan & update tugas', grants: g('full', 'full', 'full', 'none') },
  { label: 'Setujui / kembalikan hasil', grants: g('full', 'full', 'none', 'full') },
  { label: 'Lihat papan bersama', grants: g('full', 'full', 'full', 'full') },
  { label: 'Buat & bagikan laporan', grants: g('full', 'full', 'own', 'view') },
  { label: 'Kelola meeting & event', grants: g('full', 'full', 'join', 'none') },
]
