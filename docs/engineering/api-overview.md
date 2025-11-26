# Backend API Overview

## Stack

- Node.js + TypeScript (Express)
- Prisma ORM (PostgreSQL)
- Vitest for unit tests
- Pino for structured логов

## Основные эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| POST  | `/api/payments/midtrans/snap-intents` | Создаёт `Tip`, вызывает Midtrans Snap API и возвращает token/redirect. |
| POST  | `/api/payments/midtrans/payment-link` | Генерирует Midtrans Payment Link по API и отдаёт URL гостю. |
| POST  | `/api/payments/midtrans/notifications` | Принимает уведомления Midtrans, валидирует подпись, апдейтит Tip. |
| GET   | `/api/tips/:tipId/status` | Возвращает публичный статус чаевых. |
| GET   | `/healthz` | Простой healthcheck. |

## Переменные окружения

См. `.env.example`. Критичные параметры:

- `DATABASE_URL` — PostgreSQL или совместимый DSN.
- `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_MERCHANT_ID` — ключи PSP.
- `MIDTRANS_ENV` — `sandbox` или `production`.
- `MIDTRANS_NOTIFICATION_SECRET` — подпись для callback'ов.
- `WEB_BASE_URL` — URL фронта (redirect/thank-you).
- `GOOGLE_PAY_TEST_MERCHANT_ID` — идентификатор для sandbox Google Pay.

## Скрипты

```bash
npm run dev:api    # Watch mode
npm run test --workspace=@tipsyo/api
npm run prisma:migrate --workspace=@tipsyo/api
```

## Паттерны качества

- Каждый webhook логируется в `WebhookLog` с хэшем полезной нагрузки.
- Валидация входных данных через `zod`.
- Сервисы принимают зависимости через конструктор (легко мокать в тестах).
