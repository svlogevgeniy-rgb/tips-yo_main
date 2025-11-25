/**
 * UI Kit palette specification.
 *
 * Данные собраны из актуальных Figma-источников (Tips-yo Service UI Kit).
 * Каждый блок хранит не только цвет, но и типографику, которую дизайнеры
 * закрепили за конкретной палитрой в описании макетов.
 */

export type PaletteTextSpec = {
  color: string
  fontSize: number
  fontFamily: string
  fontWeight: string
  lineHeight: number
  wordWrap: 'break-word'
}

export interface PaletteEntry {
  title: string
  spec: PaletteTextSpec
}

export interface UIColorPalette {
  primary: PaletteEntry
  grayscale: PaletteEntry
  system: PaletteEntry
  colorHeading: PaletteEntry
  colorDescription: PaletteEntry
}

const baseText: Omit<PaletteTextSpec, 'color'> = {
  fontSize: 24,
  fontFamily: 'TT Hoves',
  fontWeight: '500',
  lineHeight: 33.6,
  wordWrap: 'break-word',
}

export const uiColors: UIColorPalette = {
  primary: {
    title: 'Primary UI Palette',
    spec: {
      color: 'black',
      ...baseText,
    },
  },
  grayscale: {
    title: 'Grayscale Palette',
    spec: {
      color: 'black',
      ...baseText,
    },
  },
  system: {
    title: 'System UI Palette',
    spec: {
      color: 'black',
      ...baseText,
    },
  },
  colorHeading: {
    title: 'Цвет',
    spec: {
      color: '#33CC99',
      fontSize: 48,
      fontFamily: 'TT Hoves',
      fontWeight: '500',
      lineHeight: 63.36,
      wordWrap: 'break-word',
    },
  },
  colorDescription: {
    title:
      'Цвет помогает пользователям воспринимать информацию и выделять важные элементы интерфейса',
    spec: {
      color: '#33CC99',
      fontSize: 18,
      fontFamily: 'TT Hoves',
      fontWeight: '400',
      lineHeight: 28.8,
      wordWrap: 'break-word',
    },
  },
}

export type UIColorToken = keyof UIColorPalette

