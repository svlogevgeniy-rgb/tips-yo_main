# UI States Playbook

## Loading
- **Skeletons**: используем компоненты `Skeleton` (todo) и `StatsTile` placeholders.
- **Button loading**: prop `loading` показывает spinner, блокирует клик.
- **Tables**: показываем 3–5 скелет-строк + hint «Обновляем данные Midtrans…».

## Empty
- Используем `EmptyState` c иллюстрацией (emoji/иконка) + CTA.
- Примеры: нет сотрудников, нет операций, нет вебхуков.

## Error
- Inline ошибки форм (`Input error`) + summary (toast/alert) c actionable текстом.
- Для интеграций Midtrans — статус badges (danger) + кнопка Retry.

## No Access / Permissions
- Экран с иконкой lock, текст «Нет доступа», CTA «Вернуться на главную» + ссылка на поддержку.

## Offline / API Timeout
- Toast «Проблемы со связью» + кнопка Retry, fallback UI (cache).

## Empty filters
- Badge «Фильтр: Custom» + CTA «Сбросить».

## Webhook retries
- Ряд таблицы подсвечен warning, в Tooltip причины.
