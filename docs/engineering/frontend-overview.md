# Frontend Overview

## Tech stack

- React 18 + Vite (SPA)
- TypeScript + ESLint
- Vitest + Testing Library (готов к добавлению UI-тестов)
- Tailwind + кастомные токены (shadcn/ui компоненты)

## Страницы

| Путь | Назначение |
|------|------------|
| `/` | Лендинг для гостя + форма запуска Midtrans Snap/Payment Link. |
| `/thank-you` | Экран благодарности после Hosted Checkout (при необходимости). |
| `/dashboard/merchant` | Заглушка кабинета заведения (сплиты, сотрудники, операции). |
| `/dashboard/staff` | Заглушка кабинета персонала. |

## Обращения к API

- Основное действие: `POST /api/payments/midtrans/snap-intents` (через `VITE_API_BASE_URL`).  
- Альтернативный сценарий «Отправить ссылку»: `POST /api/payments/midtrans/payment-link`.  
- Статусы подтягиваются через `GET /api/tips/:tipId/status` (доступно для страницы «Спасибо»).  
- Идентификаторы мерчанта/сотрудника прокидываются из UI по данным QR/ссылки (см. бизнес-правила в functional spec).

## Быстрый старт

```bash
npm run dev            # Vite dev server на 5173
npm run lint
npm run test
```

## Дальнейшие шаги

- Подключить реальные данные из API для dashboards.
- Добавить i18n (EN/ID) и форму авторизации (Platform Admin → Merchant/Staff).
- Уточнить визуал в Figma и перенести токены.
