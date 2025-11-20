# UI Architecture

## Слои
1. **Design Tokens** (`apps/web/src/shared/styles/tokens`) — исходник цветов, типографики, spacing, motion.
2. **Themes** (`styles/themes`) — map CSS vars для light/dark, тема подключается в `ThemeProvider`.
3. **Atoms** (`shared/ui/atoms`) — контролы без бизнес-логики (`Button`, `Input`, `Tag`, `AmountPill`, `Spinner`).
4. **Molecules** (`shared/ui/molecules`) — композиции атомов (`StatsTile`, `SplitSummary`, `EmptyState`).
5. **Organisms** (`shared/ui/organisms`) — крупные блоки (`Navbar`, в будущем `Sidebar`, `PaymentPanel`).
6. **Widgets** (`src/widgets`) — связаны с конкретной фичей (например, `TipForm` объединяет атомы и вызовы API).
7. **Pages** (`app/**`) — собирают виджеты и данные (Next.js App Router).

## Правила импорта
- `atoms → molecules → organisms → widgets` (вверх, но не наоборот).
- `widgets` могут импортировать `shared/*`, `entities`, `features` (при появлении FSD-структуры).
- Исключаем абсолютные импорт-пути вида `../../..` в UI Kit: используем barrels (`shared/ui`).

## Стили
- Tokens → CSS Variables (`global.css`).
- Компоненты используют CSS Modules (scoped классы).
- Медиа-запросы/spacing/радиусы — только через токены.
- Базовый reset и типографика хранятся в `global.css`.

## Темизация
- `ThemeProvider` управляет `data-theme` атрибутом, переключение меняет vars.
- Компоненты не знают о конкретных цветах, обращаются к CSS vars (`var(--color-bg)` и т.д.).

## Тесты и Storybook
- Каждый атом/молекула получает Storybook stories.
- Критичные компоненты покрываются snapshot-тестами (Vitest + Testing Library) — TODO.

## Производительность и доступность
- Reusable skeletons/placeholder'ы для loading states.
- Фокус/ARIA: `Button`, `Input` и другие atoms обязаны прокидывать `...rest` и `aria-*` атрибуты.
- Все SVG-иконки экспортируются как React-компоненты в `shared/icons`.
