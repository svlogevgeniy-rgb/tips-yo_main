# Navigation Patterns

## Layout
- **Navbar** (desktop): бренд, ссылки (Dashboard, Staff, Webhooks), переключатель темы.
- **Sidebar** (backlog): список разделов с иконками, collapse для мобильных.
- **Breadcrumbs**: для вложенных экранов (Webhook → Details) показываем путь + кнопку «Назад».

## Роутинг (Next.js App Router)
- `/` — Tip Landing
- `/thank-you` — экран благодарности
- `/dashboard/merchant` — KPI и управления
- `/dashboard/staff` — персональные данные
- `/dashboard/merchant?tab=webhooks` — фильтры
- `/onboarding/*` — wizard

## Паттерны
- Sticky action bar для фильтров/CTA.
- Tabbed navigation (`Tabs` компонент, TODO) для переключения между split/webhooks.
- Drawer для мобильных (пункты меню, настройки).

## Состояния
- Активные ссылки подсвечиваются (bold/цвет).
- Ограниченные разделы показывают badge "Beta".
