# UI Components Catalog

## Atoms
| Component | Props | Состояния | Использование |
|-----------|-------|-----------|---------------|
| `Button` (`shared/ui/atoms/button`) | `variant`, `size`, `iconLeft/iconRight`, `loading`, `fullWidth`, `iconOnly` | primary, secondary, ghost, danger, success, outline, dark, disabled, loading | CTA, inline actions, icon-only toggles. |
| `Input` | `label`, `hint`, `error`, `prefix`, `suffix`, `type` | default, focus, error, disabled | Формы TipForm, модалки, онбординг. |
| `Checkbox` | `label`, `description`, `error`, `indeterminate`, `disabled` | default, hover, checked, indeterminate, disabled, error | Согласия, feature toggles. |
| `Radio` | `label`, `description`, `disabled` | default, hover, checked, disabled | Выбор тарифов, дележи. |
| `Switch` | `label`, `description`, `disabled` | default, hover, checked, disabled | Быстрое включение настроек. |
| `AmountPill` | `value`, `selected`, `onSelect` | selected/unselected | Быстрый выбор суммы чаевых. |
| `Tag` | `tone`, `icon` | default/success/warning/danger | Badges, статусные лейблы. |
| `Badge` | `variant` (solid/outline) | ... | KPI подписи, состояния фильтров. |
| `Spinner` | `size` | ... | Loading в кнопках, карточках. |

## Molecules
- `StatsTile` — kpi карточка (label, value, trend). Используется на dashboard страницах.
- `SplitSummary` — отображает дефолтный split rule (90/10). Встраивается в merchant dashboard/настройки.
- `EmptyState` — иллюстрация + текст + CTA для состояний «нет данных»/«нет доступа».
- (Backlog) `Table`, `FilterBar`, `WebhookTimeline` — TBD.

## Organisms
- `Navbar` — глобальная навигация (links + theme toggle). Рендерится в Layout.
- (План) `Sidebar`, `WebhookMonitor`, `SplitSettingsPanel`.

## Widgets
- `TipForm` (`src/widgets/tip-form`) — объединяет AmountPill, Input, Button, Tag. Отвечает за UX гостя.
- Будущие widgets: `MerchantOverview`, `StaffPerformance`, `WebhookList`.

## Правила
- Каждая сущность имеет `index.ts` для barrel-экспорта.
- В сториз отображаем все состояния (default/hover/disabled/loading/empty/error) + описание props.
- Документация (MDX) включает пример import/usage.
