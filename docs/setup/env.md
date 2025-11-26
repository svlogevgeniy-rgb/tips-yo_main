# Environment Variables

Лендинг почти статичен, но для интеграции с API/аналитикой предусмотрены переменные окружения Vite (`VITE_*`). Создайте файл `.env` в корне и укажите необходимые значения.

> Все переменные должны начинаться с `VITE_`, иначе они не будут доступны в клиентском коде.

## Структура `.env.example`

Шаблон хранится в корне репозитория и служит единым источником правды. Рекомендуем разбивать его на блоки:

```
# =========================
# CORE APPLICATION
# =========================
VITE_API_BASE_URL=https://api.tipsyo.example
VITE_CDN_URL=https://static.tipsyo.example
VITE_APP_ENV=development

# =========================
# PAYMENTS (MIDTRANS + GOOGLE PAY)
# =========================
MIDTRANS_SERVER_KEY=midtrans_server_key
MIDTRANS_CLIENT_KEY=midtrans_client_key
MIDTRANS_MERCHANT_ID=midtrans_merchant_id
MIDTRANS_ENV=sandbox
MIDTRANS_NOTIFICATION_SECRET=midtrans_notification_secret
MIDTRANS_PAYMENT_LINK_BASE_URL=https://link.midtrans.com/tipsyo
GOOGLE_PAY_TEST_MERCHANT_ID=BCR2DN4TIPSYO

# =========================
# ANALYTICS & MONITORING
# =========================
VITE_ANALYTICS_ID=plausible_site_id
VITE_SENTRY_DSN=https://public@sentry.example/project-id

# =========================
# MARKETING & SUPPORT
# =========================
VITE_SUPPORT_WIDGET_TOKEN=chat_token
VITE_CONTACT_LINK=https://t.me/tipsyo_support
```

Правила:

- Один комментарий-блок описывает назначение ключей.
- Используйте осмысленные плейсхолдеры вместо `xxx`.
- После добавления новой переменной — обязательно обновляйте `.env.example` и `docs/setup/env.md`.
- Переменные без префикса `VITE_` используются бекенд-сервисами Tips’yo (Snap, Payment Link, notifications) и должны храниться вне клиентского бандла.

## Процесс распространения и обновления

1. **Владелец переменных** (тимлид/DevOps) ведёт таблицу значений (например, в 1Password/Notion с разграничением прав).
2. Эталонный `.env` формируется DevOps и хранится в защищённом vault (1Password, Bitwarden, SOPS). Для backend ключей Midtrans рекомендуется отдельный секрет (например, `.env.server`).
3. При онбординге разработчик получает доступ к vault и копирует `.env` локально. Файл не коммитится (см. `.gitignore`). Бекенд-ключи вставляются только в серверные окружения (Docker secrets, CI/CD variables).
4. Любые изменения переменных:
   - создаётся тикет `config/<variable>`;
   - обновляется `.env.example` + документация;
   - владелец публикует сообщение в #tipsyo-dev со списком изменений и ссылкой на тикет;
   - каждый разработчик подтверждает обновление в треде.

## Чек-лист тимлида

- [ ] Сверить используемые переменные через `rg "import.meta.env" -n src`.
- [ ] Актуализировать `.env.example` (плейсхолдеры, блоки, комментарии).
- [ ] Настроить защищённое хранилище и занести реальные значения.
- [ ] Добавить инструкцию по доступу в onboarding-док.
- [ ] Включить напоминание о рассылке в шаблон PR (чек «обновил `.env.example`»).
- [ ] Проводить ежеспринтовую ревизию: не появились ли неиспользуемые ключи.

## Как использовать в коде

```ts
const api = import.meta.env.VITE_API_BASE_URL;
```

## Безопасность

- Не храните приватные ключи или секреты в клиентском `.env`.
- Подготовьте `.env.example` без чувствительных данных, чтобы команде было проще настраивать окружения.

Файл `.env.example` следует держать в репозитории, а `.env` попадёт в `.gitignore`.
