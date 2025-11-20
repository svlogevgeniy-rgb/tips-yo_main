# Theming

## Архитектура
- CSS vars объявлены в `global.css` + `data-theme` overrides.
- `ThemeProvider` хранит `theme` в state, предоставляет `toggleTheme()`.
- Тема по умолчанию — `dark`, позже добавим сохранение в `localStorage` + `prefers-color-scheme`.

## Добавление новых тем
1. Создайте файл `styles/themes/<name>.ts`, экспортируйте `colors/background/surface/text`.
2. Расширьте `ThemeProvider`, чтобы поддерживать значение.
3. Добавьте новый блок `data-theme='<name>'` в `global.css`.
4. В Storybook настройте backgrounds.

## Тематические токены
- Компоненты используют общие CSS vars (`--color-bg`, `--color-text`, `--color-panel`).
- Если нужен специфический оттенок, добавьте токен (например, `--color-brand-amber`).

## Storybook
- В `preview.ts` backgrounds переключаются (dark/light), controls для темы подключим через `globalTypes` (todo).
