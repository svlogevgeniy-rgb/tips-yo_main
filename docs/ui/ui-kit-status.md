# UI Kit coverage

| Компонент | Что есть в Figma | Что реализовано | Комментарий |
|-----------|------------------|-----------------|-------------|
| Button | solid/outline/dark/green CTA, размеры 40/48/60, иконки, лоадер | ✅ Добавлены вариации `success`, `outline`, `dark`, размер `xl`, поддержка icon-only/loader | Поведение hover/focus совпадает с токенами, API полностью обратно совместим |
| Checkbox | Default / Hover / Disabled / Error / Indeterminate | ✅ Новый атом `Checkbox` с поддержкой описания и `indeterminate` | Внутренний `<input>` остаётся контролируемым, состояния синхронизируются через CSS |
| Radio | Default / Hover / Disabled | ✅ Новый атом `Radio` | Используется в сториз с группой радиокнопок |
| Switch | Default / Hover / Disabled | ✅ Новый атом `Switch` с поддержкой подписи | thumb/track размеры привязаны к токенам |
| Input | States (default, focus, error) | ✅ Уже был реализован ранее | Без изменений |
| Tag / Badge / Chip | Статусы и цвета | ✅ Уже реализованы | — |

## Backlog
- `Select`/`Dropdown` (компонент есть в Figma, пока не подключали)
- `Segmented Control` (вариант табов для фильтров)
- `Table`/`FilterBar` (из спеки, нужны данные API)

Для open items оставлены заметки в этой таблице и в backlog-файле `docs/ui/ui-components.md`.
