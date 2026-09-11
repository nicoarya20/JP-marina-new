import type { StatusKey } from '~/theme/tokens'

export type TaskState = 'OPEN' | 'IN_PROGRESS' | 'IN_REVIEW' | 'REOPENED' | 'DONE'
export type TaskPriority = 'URGENT' | 'NORMAL' | 'LOW'
export type Role = 'ADMIN' | 'MANAGER' | 'STAFF' | 'REVIEWER'

export interface Person {
  id: string
  name: string
  role: Role
  initials: string
}

export interface ChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface Task {
  id: string
  title: string
  note?: string
  state: TaskState
  priority: TaskPriority
  due: string // ISO
  assigneeId: string
  project: string
  checklist?: ChecklistItem[]
  attachments?: number
  subtasks?: number
}

export interface Meeting {
  id: string
  title: string
  start: string // ISO
  room: string
  participants: number
}

export interface ReportRow {
  id: string
  label: string
  period: string
  done: number
  total: number
}

// Peta state tugas → token status visual (soft tint pasangan bg+ink).
export const stateStatus: Record<TaskState, { label: string; status: StatusKey }> = {
  OPEN: { label: 'Antre', status: 'warning' },
  IN_PROGRESS: { label: 'Berjalan', status: 'warning' },
  IN_REVIEW: { label: 'Ditinjau', status: 'warning' },
  REOPENED: { label: 'Dibuka lagi', status: 'danger' },
  DONE: { label: 'Selesai', status: 'success' },
}

export const priorityLabel: Record<TaskPriority, string> = {
  URGENT: 'Mendesak',
  NORMAL: 'Normal',
  LOW: 'Santai',
}
