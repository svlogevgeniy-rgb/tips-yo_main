# Deployment Playbook

Документ основан на `LANDING_READY.md` из dev-проекта и описывает, как выпускать лендинг Tips'yo.

## 1. Чек-лист перед релизом

- [ ] `npm run lint` и `npm run build` проходят без ошибок.
- [ ] Все CTA-ссылки ведут на реальные формы/чат.
- [ ] В `public/images/` лежат финальные фотографии профессий.
- [ ] Обновлены тексты тарифов и юридические ссылки.

## 2. Production-сборка

```bash
npm install        # при первом запуске
npm run build      # создаёт dist/
npm run preview    # быстрый smoke-тест
```

Содержимое `dist/` — полностью статическое, его можно выкладывать на любой CDN.

## 3. Варианты размещения

### Vercel / Netlify
1. Создайте проект, укажите `Build Command = npm run build`, `Output Directory = dist`.
2. Добавьте переменные окружения (см. `docs/setup/env.md`).
3. Настройте автоматический деплой из ветки `main`.

### GitHub Pages
1. Выполните `npm run build`.
2. Задеплойте `dist/` с помощью `npx gh-pages -d dist`.
3. В `vite.config.ts` задайте `base` при необходимости (`/tips-yo_main/`).

### Docker / Nginx
1. Соберите статику.
2. Используйте базовый `nginx:alpine` и скопируйте `dist/` в `/usr/share/nginx/html`.

## 4. Мониторинг

- Проверяйте статус деплоя в CI (GitHub Actions/Vercel Dashboard).
- После релиза пройдитесь по основным сценариям: загрузка страницы, анкоры, мобильное меню.

## 5. Rollback

- Храните предыдущий артефакт `dist/` (например, через релизы GitHub).
- Для Vercel/Netlify можно откатиться на прошлый деплой через UI.
- При ручном деплое на сервер держите резервную копию `/var/www/tipsyo_prev`.
