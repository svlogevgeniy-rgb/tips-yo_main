# Backend API Overview

## Stack

- Node.js + TypeScript (Express)
- Prisma ORM (PostgreSQL)
- Vitest for unit tests
- Pino for structured логов

## Основные эндпоинты

| Метод | URL | Описание |
|-------|-----|----------|
| POST  | `/api/payment-links/create` | Создаёт запись `Tip`, вызывает Xendit Payment Link и возвращает URL. |
| POST  | `/api/webhooks/xendit` | Принимает webhook, валидация `X-CALLBACK-TOKEN`, идемпотентный аудит. |
| GET   | `/api/tips/:externalId` | Возвращает статус чаевых. |
| GET   | `/healthz` | Простой healthcheck. |

## Переменные окружения

См. `.env.example`. Критичные параметры:

- `DATABASE_URL` — PostgreSQL или совместимый DSN.
- `XENDIT_SECRET_KEY`, `XENDIT_CALLBACK_TOKEN` — ключи интеграции.
- `WEB_BASE_URL` — URL фронта (redirect/thank-you).

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
