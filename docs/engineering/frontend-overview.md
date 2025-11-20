# Frontend Overview

## Tech stack

- Next.js 14 (App Router)
- TypeScript + ESLint (core web vitals rules)
- Vitest + Testing Library (готов к добавлению UI-тестов)
- Ручной дизайн-системы на CSS переменных без Tailwind

## Страницы

| Путь | Назначение |
|------|------------|
| `/` | Лендинг для гостя + форма создания Payment Link. |
| `/thank-you` | Экран благодарности после Hosted Checkout. |
| `/dashboard/merchant` | Заглушка кабинета заведения (сплиты, сотрудники, операции). |
| `/dashboard/staff` | Заглушка кабинета персонала. |

## Обращения к API

Форма гостя вызывает `POST /api/payment-links/create` на backend через `NEXT_PUBLIC_API_BASE_URL`. ID мерчанта задаётся переменной `NEXT_PUBLIC_DEFAULT_MERCHANT_ID`.

## Быстрый старт

```bash
npm run dev:web         # Next.js dev server на 3000
npm run lint --workspace=@tipsyo/web
npm run test --workspace=@tipsyo/web
```

## Дальнейшие шаги

- Подключить реальные данные из API для dashboards.
- Добавить i18n (EN/ID) и форму авторизации (Platform Admin → Merchant/Staff).
- Уточнить визуал в Figma и перенести токены.
