import {
  createTheme,
  type CSSVariablesResolver,
  type MantineColorsTuple,
} from '@mantine/core'
import { primitives, semantic, status } from './tokens'

// Skala terracotta (primary). #B0623F=idx6 (decorative), #9E4E2C=idx7 (tombol utama).
const terracotta: MantineColorsTuple = [
  '#F7E9E1', '#EFD3C4', '#E4B59E', '#D99678', '#CE785A',
  '#BF6A45', primitives.terracotta500, primitives.terracotta600, '#853F22', '#6B3019',
]

// Skala espresso (teks & border). #6B5D50=idx6, #2E2620=idx9.
const espresso: MantineColorsTuple = [
  '#F3EFE9', '#E3DCD2', '#C8BCAD', '#AC9C89', '#917F6B',
  '#7C6A58', primitives.espresso500, '#564A3F', '#3F352D', primitives.espresso900,
]

const success: MantineColorsTuple = [
  '#EAF3EE', '#D6E6DC', '#B5D2C2', '#8FBAA4', '#6AA186',
  '#4C8A6C', '#36785A', primitives.greenSolid, '#175A46', primitives.greenInk,
]
const warning: MantineColorsTuple = [
  '#FBF2DC', '#F4D58A', '#ECC35E', '#E0AD3A', '#C8942A',
  '#A87720', '#8A5A12', primitives.amberSolid, '#6B4A12', '#4E360D',
]
const danger: MantineColorsTuple = [
  '#FBEAE6', '#F0D2CC', '#E3ADA3', '#D4867A', '#C56252',
  '#B54535', '#A62F22', primitives.redSolid, '#8A2A20', '#6E2019',
]

export const theme = createTheme({
  primaryColor: 'terracotta',
  primaryShade: 7,
  colors: { terracotta, espresso, success, warning, danger },
  white: primitives.oatmeal50,
  black: primitives.espresso900,
  defaultRadius: 'lg',
  focusRing: 'always',
  // Tipografi lansia: body 18px, line-height 1.6, heading tegas (PAPER.md §6).
  fontFamily:
    '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", Lexend, system-ui, sans-serif',
  fontSizes: { xs: '0.875rem', sm: '1rem', md: '1.125rem', lg: '1.25rem', xl: '1.5rem' },
  lineHeights: { xs: '1.4', sm: '1.5', md: '1.6', lg: '1.6', xl: '1.5' },
  headings: {
    fontFamily:
      '"Atkinson Hyperlegible Next", "Atkinson Hyperlegible", Lexend, system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '2.25rem', lineHeight: '1.2' },
      h2: { fontSize: '1.625rem', lineHeight: '1.3' },
      h3: { fontSize: '1.3125rem', lineHeight: '1.4' },
      h4: { fontSize: '1.125rem', lineHeight: '1.4' },
    },
  },
  radius: { xs: '6px', sm: '10px', md: '14px', lg: '18px', xl: '24px' },
  spacing: { xs: '8px', sm: '12px', md: '16px', lg: '24px', xl: '32px' },
  components: {
    // Target sentuh ≥48px untuk aksi utama (PAPER.md §4.1).
    Button: { defaultProps: { size: 'md', radius: 'md' } },
    ActionIcon: { defaultProps: { size: 'xl', radius: 'md' } },
    TextInput: { defaultProps: { size: 'md', radius: 'md' } },
    Textarea: { defaultProps: { size: 'md', radius: 'md' } },
    Select: { defaultProps: { size: 'md', radius: 'md' } },
    Card: { defaultProps: { radius: 'lg', withBorder: true } },
  },
})

// Petakan token semantik ke CSS var Mantine: latar hangat, teks espresso, + var status kustom.
export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {
    '--mantine-color-body': semantic.bgBase,
    '--mantine-color-text': semantic.textPrimary,
    '--app-bg-base': semantic.bgBase,
    '--app-bg-surface': semantic.bgSurface,
    '--app-bg-raised': semantic.bgRaised,
    '--app-text-secondary': semantic.textSecondary,
    '--app-border-strong': semantic.borderStrong,
    '--app-accent-decorative': semantic.accentDecorative,
    '--app-status-success-soft': status.success.soft,
    '--app-status-success-ink': status.success.ink,
    '--app-status-warning-soft': status.warning.soft,
    '--app-status-warning-ink': status.warning.ink,
    '--app-status-danger-soft': status.danger.soft,
    '--app-status-danger-ink': status.danger.ink,
  },
  light: {},
  dark: {},
})
