# Secrets & CI Checklists

## 1. Vault и .env

1. **Выбор и создание записи**
   - Используем корпоративный vault (например, 1Password → коллекция `Tips’yo`).
   - Создаем запись `Tips’yo Landing / ENV (dev)` и добавляем поля для всех ключей из `.env.example`.
2. **Наполнение значениями**
   - Владелец переменных (тимлид или DevOps) заносит утвержденные значения, добавляет ссылку на `docs/setup/env.md` и контакты.
   - Фиксируем дату последнего обновления и окружение (dev/stage/prod).
3. **Настройка доступа**
   - Создаем группу `tipsyo-dev` и выдаем права только участникам команды (Dev, QA, DevOps).
   - В onboarding-док добавляем шаг «получи доступ к записи vault».
4. **Рассылка инструкции**
   - В Slack/Teams публикуем сообщение:
     1. Открой запись vault.
     2. Скопируй содержимое в новый файл `.env` (в корне проекта).
     3. Проверь, что `.env` не попал в git (`git status`).
     4. Отметься реакцией ✅ после обновления.
5. **Поддержание актуальности**
   - Любые изменения переменной проходят через тикет `config/<variable>`.
   - После обновления: правим `.env.example`, `docs/setup/env.md`, запись в vault и оповещаем канал.
   - Раз в месяц владелец переменных делает ревизию и подтверждает актуальность записи.

## 2. GitHub Actions + Branch Protection

1. **Включение Actions**
   - Settings → Actions → General → выбрать «Allow all actions and reusable workflows».
2. **Проверка workflow**
   - Убедиться, что файл `.github/workflows/ci.yml` содержит шаги `npm ci`, `npm run lint`, `npm run build`.
   - Создать тестовый PR либо push в `main` и убедиться, что job `CI / lint-build` проходит.
3. **Branch Protection**
   - Settings → Branches → Add rule.
   - Branch pattern: `main`.
   - Включить опции:
     - Require a pull request before merging.
     - Require status checks to pass before merging.
     - Выбрать `CI / lint-build` в списке обязательных чеков.
     - (Опционально) Include administrators, Require linear history.
   - Сохранить правило.
4. **Валидация**
   - Создать PR без прохождения CI → убедиться, что Merge кнопка заблокирована.
   - После успешного CI проверить, что Merge доступен.
