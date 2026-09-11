/**
 * Design tokens — "Oatmeal & Espresso" (lihat PAPER.md §5).
 * Tier 1 = primitif (nilai mentah), Tier 2 = semantik (peran → primitif).
 * Komponen hanya memakai token semantik. Kontras tiap pasangan sudah diverifikasi WCAG.
 */

// Tier 1 — primitif
export const primitives = {
  oatmeal50: '#FBF8F1',
  oatmeal100: '#F5F1E8',
  oatmeal200: '#EBE4D6',
  espresso500: '#6B5D50',
  espresso900: '#2E2620',
  terracotta500: '#B0623F',
  terracotta600: '#9E4E2C',
  greenSoft: '#D6E6DC',
  greenInk: '#1B4D3E',
  greenSolid: '#1E6B54',
  amberSoft: '#F4D58A',
  amberInk: '#6B4A12',
  amberSolid: '#8A5A12',
  redSoft: '#F0D2CC',
  redInk: '#8A2A20',
  redSolid: '#A62F22',
  white: '#FFFFFF',
} as const

// Tier 2 — semantik
export const semantic = {
  bgBase: primitives.oatmeal100,
  bgSurface: primitives.oatmeal200,
  bgRaised: primitives.oatmeal50,
  textPrimary: primitives.espresso900,
  textSecondary: primitives.espresso500,
  textOnAccent: primitives.white,
  borderStrong: primitives.espresso500,
  accentPrimary: primitives.terracotta600,
  accentDecorative: primitives.terracotta500,
  focusRing: primitives.terracotta600,
} as const

// Status (soft tint = bg+ink; solid = fill+on-accent). Warna tak pernah berdiri sendiri → selalu ikon+label.
export type StatusKey = 'success' | 'warning' | 'danger'
export const status: Record<StatusKey, { soft: string; ink: string; solid: string }> = {
  success: { soft: primitives.greenSoft, ink: primitives.greenInk, solid: primitives.greenSolid },
  warning: { soft: primitives.amberSoft, ink: primitives.amberInk, solid: primitives.amberSolid },
  danger: { soft: primitives.redSoft, ink: primitives.redInk, solid: primitives.redSolid },
}

// Skala aksesibilitas teks A / A+ / A++ (PAPER.md §6.3) — pengali global pada root font-size.
export const fontScale = { a: 1, aa: 1.15, aaa: 1.3 } as const
export type FontScaleKey = keyof typeof fontScale

// Lebar bingkai ponsel (wireframe: 390px).
export const PHONE_WIDTH = 390
