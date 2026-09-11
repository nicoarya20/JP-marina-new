import type { Meeting, Person, ReportRow, Task } from './types'

// Data contoh (UI-only). Diganti API nanti.
export const currentUser: Person = {
  id: 'u1',
  name: 'Budi Santoso',
  role: 'STAFF',
  initials: 'BS',
}

export const people: Person[] = [
  currentUser,
  { id: 'u2', name: 'Sri Wahyuni', role: 'MANAGER', initials: 'SW' },
  { id: 'u3', name: 'Agus Pranoto', role: 'STAFF', initials: 'AP' },
  { id: 'u4', name: 'Dewi Lestari', role: 'REVIEWER', initials: 'DL' },
  { id: 'u5', name: 'Hendra Gunawan', role: 'ADMIN', initials: 'HG' },
]

export const personById = (id: string): Person =>
  people.find((p) => p.id === id) ?? currentUser

const today = new Date()
const iso = (dayOffset: number, h = 9, m = 0) => {
  const d = new Date(today)
  d.setDate(d.getDate() + dayOffset)
  d.setHours(h, m, 0, 0)
  return d.toISOString()
}

export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Kirim laporan keuangan bulanan',
    note: 'Rekap pemasukan & pengeluaran Agustus, lampirkan PDF.',
    state: 'IN_PROGRESS',
    priority: 'URGENT',
    due: iso(0, 15, 0),
    assigneeId: 'u1',
    project: 'Keuangan',
    attachments: 2,
    subtasks: 3,
    checklist: [
      { id: 'c1', label: 'Kumpulkan nota', done: true },
      { id: 'c2', label: 'Rekap ke spreadsheet', done: true },
      { id: 'c3', label: 'Ekspor PDF', done: false },
      { id: 'c4', label: 'Kirim ke Bu Sri', done: false },
    ],
  },
  {
    id: 't2',
    title: 'Telepon vendor katering rapat',
    state: 'OPEN',
    priority: 'NORMAL',
    due: iso(0, 13, 0),
    assigneeId: 'u1',
    project: 'Umum',
  },
  {
    id: 't3',
    title: 'Follow-up tanda tangan surat tugas',
    state: 'OPEN',
    priority: 'NORMAL',
    due: iso(1, 10, 0),
    assigneeId: 'u1',
    project: 'Administrasi',
  },
  {
    id: 't4',
    title: 'Revisi materi presentasi mingguan',
    state: 'IN_REVIEW',
    priority: 'LOW',
    due: iso(2, 11, 0),
    assigneeId: 'u3',
    project: 'Umum',
  },
  {
    id: 't5',
    title: 'Perbarui data anggota koperasi',
    state: 'DONE',
    priority: 'NORMAL',
    due: iso(-1, 16, 0),
    assigneeId: 'u3',
    project: 'Administrasi',
  },
  {
    id: 't6',
    title: 'Siapkan notulen rapat pimpinan',
    state: 'REOPENED',
    priority: 'URGENT',
    due: iso(-1, 9, 0),
    assigneeId: 'u1',
    project: 'Rapat',
  },
]

export const todayTasks = tasks.filter((t) => t.assigneeId === 'u1' && t.state !== 'DONE').slice(0, 3)

export const meetings: Meeting[] = [
  { id: 'm1', title: 'Rapat koordinasi mingguan', start: iso(0, 14, 0), room: 'Ruang Mawar', participants: 6 },
  { id: 'm2', title: 'Review laporan keuangan', start: iso(1, 10, 30), room: 'Ruang Melati', participants: 4 },
  { id: 'm3', title: 'Sosialisasi kebijakan baru', start: iso(3, 9, 0), room: 'Aula', participants: 18 },
]

export const nextMeeting = meetings[0]!

export const reportRows: ReportRow[] = [
  { id: 'r1', label: 'Hari ini', period: 'Senin', done: 4, total: 7 },
  { id: 'r2', label: 'Minggu ini', period: '4–10 Sep', done: 21, total: 30 },
  { id: 'r3', label: 'Budi Santoso', period: 'Minggu ini', done: 8, total: 11 },
  { id: 'r4', label: 'Agus Pranoto', period: 'Minggu ini', done: 6, total: 9 },
]

// Statistik cepat dashboard staf.
export const dashboardStats = {
  today: todayTasks.length + 1,
  done: tasks.filter((t) => t.state === 'DONE').length,
  late: tasks.filter((t) => new Date(t.due) < new Date() && t.state !== 'DONE').length,
}
