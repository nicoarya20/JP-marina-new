import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

export const fullDate = (iso: string | Date = new Date()) =>
  dayjs(iso).format('dddd, D MMMM YYYY')

export const timeOf = (iso: string) => dayjs(iso).format('HH.mm')

export const dayTime = (iso: string) => dayjs(iso).format('ddd, D MMM • HH.mm')

// Relatif ringkas untuk tenggat ("hari ini", "besok", "kemarin", atau tanggal).
export const relativeDue = (iso: string): string => {
  const d = dayjs(iso).startOf('day')
  const diff = d.diff(dayjs().startOf('day'), 'day')
  if (diff === 0) return `Hari ini ${timeOf(iso)}`
  if (diff === 1) return `Besok ${timeOf(iso)}`
  if (diff === -1) return `Kemarin ${timeOf(iso)}`
  return dayjs(iso).format('D MMM • HH.mm')
}

export const greeting = (d: Date = new Date()): string => {
  const h = d.getHours()
  if (h < 11) return 'Selamat pagi'
  if (h < 15) return 'Selamat siang'
  if (h < 19) return 'Selamat sore'
  return 'Selamat malam'
}
