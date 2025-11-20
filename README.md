# Tips'yo Landing & Documentation

Одностраничный лендинг сервиса бескэшевых чаевых Tips'yo и основной источник продуктовой документации, перенесённой из `Tips_yo_dev`.

## Что внутри

- **Продакшен-лендинг:** React 18 + TypeScript + Vite + Tailwind + shadcn/ui.
- **Документация:** `docs/product`, `docs/engineering`, `docs/ui`, `docs/setup`, `docs/operations`, `docs/changelog`.
- **Утилиты для ассетов:** `copy-images.sh`, `check-images.sh`.

## Быстрый старт

```bash
npm install
npm run dev
```

Локальная разработка доступна на [http://localhost:5173](http://localhost:5173).

Production-сборка:

```bash
npm run build
npm run preview   # smoke-тест собранной версии
```

Подробности по окружению и настройке см. в `docs/setup/local.md` и `docs/setup/env.md`.

## Документация

| Раздел | Содержимое |
|--------|------------|
| `docs/product` | Vision, functional spec, iteration plan, привезены из `Tips_yo_dev`. |
| `docs/engineering` | Frontend/API обзоры, coding conventions. |
| `docs/ui` | Руководства по компонентам, навигации, темизации, состояниям. |
| `docs/setup` | Локальный запуск, переменные окружения, работа с изображениями. |
| `docs/operations` | Deployment playbook, troubleshooting, секреты и CI чек-листы. |
| `docs/changelog.md` | Ключевые релизы и обновления. |

## Структура лендинга

- **Header** — липкая шапка с логотипом, навигацией и CTA.
- **Hero** — главный экран с призывом и безопасностью платежей.
- **Quick Links** — быстрые ссылки-анкоры.
- **For Whom** — карточки профессий с реальными изображениями или fallback-градиентами.
- **How It Works** — сценарий QR/код.
- **Pricing** — тарифы и CTA.
- **Footer** — юридические ссылки, язык, копирайт.

## Работа с изображениями

1. Подготовьте PNG-файлы и поместите их в `public/images/` с именами `waitress.png`, `manicure.png`, `blogger.png`, `gas-station.png`, `courier.png`, `anyone.png`.
2. Для автоматизации используйте `./copy-images.sh <source-dir>`.
3. При отсутствии файлов карточки используют градиенты, так что сборка не ломается.

Подробности и примеры — `QUICK_START.md`.

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер Vite. |
| `npm run build` | Production-сборка. |
| `npm run preview` | Локальный предпросмотр `dist/`. |

## Деплой

См. `docs/operations/deployment.md` для вариантов (Vercel/Netlify, GitHub Pages, Docker). Базовый пайплайн:

1. `npm run build`
2. Загрузить содержимое `dist/` на выбранный CDN или статический хостинг.
3. Пройтись по чек-листу перед релизом.

## Вклад

- Перед пушем запускайте `npm run build`.
- Соблюдайте гайд `docs/engineering/coding-conventions.md`.
- Подробнее про процесс — `CONTRIBUTING.md`.

## Лицензия

Проект распространяется по лицензии MIT (см. `LICENSE`).
