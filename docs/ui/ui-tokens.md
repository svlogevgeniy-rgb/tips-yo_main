# Design Tokens

Источник: `apps/web/src/shared/styles/tokens/*` + `styles/global.css`.

## Палитра
| Token | Value | Usage |
|-------|-------|-------|
| `primary.400` | `#0EA5E9` | CTA background |
| `primary.500` | `#0284C7` | Hover, focus |
| `primary.600` | `#0369A1` | Active |
| `accent.teal` | `#22D3EE` | Gradients, highlights |
| `neutral.900` | `#030712` | Dark bg |
| `neutral.800` | `#111827` | Panels |
| `neutral.50` | `#F9FAFB` | Text на dark, bg light |
| `success` | `#4ADE80` | Positive states |
| `danger` | `#F87171` | Errors, destructive |
| `warning` | `#FBBF24` | Pending, caution |
| `info` | `#38BDF8` | Informational |

## Типографика
- Font family: `Inter/Manrope`.
- Scale: `display-lg (40/48, 600)`, `heading-xl (32/40, 600)`, `heading-lg (28/36, 600)`, `heading-md (24/32, 600)`, `heading-sm (20/28, 600)`, `body-lg (18/26, 500)`, `body-md (16/24, 400)`, `body-sm (14/20, 400)`, `caption (12/16, 500)`.

## Spacing
- `space-1..10` = `4px → 40px`, используем для padding/margins.
- Grid: `12 кол`, `24px` gutter, `max-width 1200px`.

## Радиусы
- `xs: 4px`, `sm: 6px`, `md: 10px`, `lg: 16px`, `pill: 999px`.

## Shadows
- `shadow-sm`: `0 1px 2px rgba(15,23,42,0.12)` — кнопки/inputs.
- `shadow-md`: `0 8px 24px rgba(2,8,23,0.24)` — карточки, панели.

## Motion
- `fast`: `120ms cubic-bezier(0.4,0,0.2,1)`.
- `normal`: `200ms ...`.
- `slow`: `320ms ...`.

## Z-index
- `nav: 100`, `dropdown: 200`, `overlay: 500`, `modal: 1000`, `toast: 1100`.

## Темы
- `lightTheme`, `darkTheme` → `ThemeProvider` меняет `data-theme` и CSS vars (`--color-bg`, `--color-text`).
- Для новых тем добавляем файл в `styles/themes` и расширяем `ThemeProvider`.

## Применение
- Компоненты используют только CSS vars (`var(--color-primary-400)`), не хардкодят hex.
- Токены экспонируются и в TS (для Storybook controls, форм). Напр.:
  ```ts
  import { colors } from '@/shared/styles/tokens';
  ```
