# Technical specifications — Tips’yo (MVP)

**Документ:** Техническое задание (ТЗ)  
**Продукт:** Tips’yo — цифровая платформа для приёма чаевых в ресторанах, кофейнях, салонах красоты, барбершопах, АЗС и службах доставки на Бали  
**Версия:** 2.0 (MVP, Midtrans + Google Pay)  
**Дата:** 26.11.2025  
**Ответственные:** Product Owner / Tech Lead / Legal & Compliance / DevOps Lead

---

## 1. Концепция и цели

### 1.1. Концепция
Платформа Tips’yo позволяет гостю быстро оставить чаевые по статическому QR-коду или персональной ссылке. Гость попадает на лендинг Tips’yo, выбирает сумму, далее перенаправляется на хостируемую платёжную страницу Midtrans (Snap или Payment Link) и завершает оплату, включая вариант через Google Pay. Персонал получает деньги по прозрачным правилам распределения.

### 1.2. Цель проекта
Обеспечить приём чаевых через Midtrans (Snap Hosted Checkout, Payment Link и Core API) с поддержкой банковских карт, e-wallet/QRIS и Google Pay. Гарантировать автоматическое распределение средств между сотрудником и заведением и предоставлять отчётность в реальном времени.

### 1.3. Показатели успеха MVP
- Время от открытия лендинга до получения подтверждения оплаты в Midtrans notification ≤ 10 секунд при нормальной сети.  
- ≥ 99% уведомлений Midtrans обрабатываются автоматически без ручного вмешательства.  
- Ошибок распределения чаевых (разница между ожидаемой и фактической суммой) ≤ 0.1% операций.  
- Доступность лендинга и API Tips’yo ≥ 99.5% в рабочее время заведений.

---

## 2. Область охвата (Scope) MVP
1. Приём чаевых через Midtrans Snap Hosted Checkout (включая Google Pay, карты, e-wallet/QRIS, bank transfer).  
2. Генерация Midtrans Payment Link по API для сценария «ссылка на оплату».  
3. Онбординг заведений и сотрудников с KYC и привязкой к Midtrans (merchant ID, server/client keys).  
4. Управление правилами распределения чаевых (сплиты) и учёт начислений внутри Tips’yo.  
5. Лендинг чаевых: выбор суммы, подтверждение оплаты, тексты безопасности.  
6. Кабинет заведения: сотрудники, сплиты, операции, отчёты, экспорт.  
7. Кабинет персонала: статистика, история чаевых.  
8. Интеграция с Midtrans notifications/callbacks, хранение лога вебхуков.  
9. Локализации EN/ID/RU; соблюдение MDR QRIS (комиссия на заведении).  
10. Sandbox окружение для тестирования Google Pay и прочих методов Midtrans.

---

## 3. Определения и сокращения
- **PSP (Payment Service Provider)** — Midtrans.  
- **Snap Hosted Checkout** — хостируемая платёжная страница Midtrans.  
- **Payment Link** — URL на Snap страницу, созданный через Midtrans Payment Link API.  
- **Core API** — REST API Midtrans для кастомных сценариев.  
- **QRIS** — национальный стандарт QR-платежей в Индонезии, доступен через Midtrans как e-wallet канал.  
- **Google Pay™** — платёжный метод, доступный через Midtrans при активном card channel.  
- **Tip** — запись о чаевых (платёжное намерение).  
- **Split Rule** — правило распределения чаевых между сотрудником и заведением.  
- **Notification / Callback** — серверное уведомление Midtrans о статусе транзакции.

---

## 4. Пользователи и флоу

### 4.1. Гость (Payer)
1. Сканирует статический QR Tips’yo (на стикере/бейдже) или переходит по ссылке.  
2. Попадает на лендинг Tips’yo, выбирает сумму, вводит опциональные данные (имя, сообщение).  
3. Нажимает «Оплатить» → фронтенд запрашивает у backend Snap-платёжное намерение или Payment Link.  
4. Гость перенаправляется на Snap Hosted Checkout. Доступные методы оплаты:  
   - Google Pay (если устройство/браузер поддерживает и включено в Midtrans).  
   - Банковские карты (Visa, Mastercard, JCB, AmEx, CUP).  
   - E-wallet/QRIS (GoPay, ShopeePay, Dana и т.д.).  
   - Bank transfer / virtual accounts (опционально).  
5. Гость подтверждает платёж (например, Google Pay → выбор карты → biometric).  
6. Midtrans обрабатывает транзакцию и отправляет notification Tips’yo.  
7. Гость видит страницу благодарности Tips’yo (при необходимости — редирект обратно с `status=paid`).

### 4.2. Заведение (Merchant)
- Проходит онбординг в Tips’yo и Midtrans (передаёт юридические данные, банковские реквизиты).  
- Создаёт карточки сотрудников, настраивает правила распределения (общие/индивидуальные проценты).  
- Скачивает и печатает статические QR-коды Tips’yo, размещает их в зале.  
- Отслеживает операции, статус уведомлений Midtrans, выгружает отчёты.  
- Отвечает за MDR QRIS и соблюдение локальных налоговых правил.  
- Управляет настройками Midtrans (ключи, включённые методы, Google Pay toggle) в кабинете Tips’yo.

### 4.3. Персонал (Staff)
- Предоставляет реквизиты для перечисления доли чаевых (через заведение).  
- Получает уведомления внутри Tips’yo о новых чаевых и видит собственную статистику.  
- Может получать чаевые индивидуально или через общий пул в зависимости от сплит-правил.

---

## 5. Функциональные требования

### 5.1. Создание платёжного намерения (Snap Hosted Checkout)
- Endpoint: `POST /api/payments/midtrans/snap-intents`.  
- Вход: `merchant_id`, `staff_id?`, `amount_idr`, `customer_note?`, `locale`.  
- Backend создаёт запись Tip (`status=pending`), вызывает Midtrans Snap API (`/snap/v1/transactions`) с server key, передаёт `order_id`, `gross_amount`, данные покупателя и список enabled payments (включая Google Pay).  
- Ответ backend содержит `snap_token` и `redirect_url` → фронтенд инициирует Snap (web SDK) либо редирект.

### 5.2. Создание Payment Link
- Endpoint: `POST /api/payments/midtrans/payment-link`.  
- Backend вызывает Midtrans Payment Link API (`/v1/payment-links`) для генерации URL, сохраняет `payment_link_id`, `payment_link_url` в Tip.  
- Используется, если нужно отправить ссылку гостю (например, курьеру или при заказе по телефону).

### 5.3. QR-сценарий
- Статический QR ведёт на Tips’yo лендинг.  
- Для десктоп/офлайн сценария допускается генерация динамического QRIS через Snap (метод `gopay`, `qris`) и отображение `qr_string`.  
- На стороне Tips’yo QR-код всегда открыт (не требует авторизации гостя).

### 5.4. Google Pay
- На уровне Midtrans Dashboard включаем Google Pay (Payments → Google Pay™) и активируем card channel.  
- В Snap Preferences добавляем Google Pay в список поддерживаемых методов.  
- Backend при создании Snap запроса передаёт `enabled_payments` с `gopay`, `card`, `gpay`.  
- Флоу: гость выбирает Google Pay → подтверждает в своём кошельке → Midtrans возвращает статус `capture/settlement`.  
- Sandbox: использовать тестовую среду Google Pay, тестовые карты, отдельные merchant IDs, чтобы получить токены без реальных списаний.

### 5.5. Сплит и учёт чаевых
- Распределение реализовано внутри Tips’yo: для каждого Tip хранится `pct_to_staff` и `pct_to_venue`.  
- После подтверждения платежа Tips’yo фиксирует сумму к выплате сотруднику и заведению, формирует отчёты для бухгалтерии.  
- При появлении нативного split в Midtrans допускаем будущую интеграцию, но в MVP статус платежа принимается целиком и распределяется в нашей учётной системе.  
- Поддерживаются режимы: общий счёт, индивидуальные сотрудник-счёт и кастомные правила (процент, фикс, формулы).

### 5.6. Notifications / callbacks Midtrans
- Endpoint: `POST /api/payments/midtrans/notifications`.  
- Принимаем уведомления о статусах (`pending`, `settlement`, `capture`, `deny`, `expire`, `cancel`, `refund`).  
- Валидация: сравнение `order_id`, `gross_amount`, проверка подписи (`X-CALLBACK-SIGNATURE`) и server key.  
- Идемпотентность: `event_id` и `signature` сохраняем в `WebhookLog`, повторные сообщения игнорируем.  
- При `settlement/capture` переводим Tip в `paid`, генерируем события для распределения.  
- Логируем payload, время обработки, результат.

### 5.7. Кабинеты
- **Merchant Admin:** управление сотрудниками, настройка методов Midtrans (вкл/выкл Google Pay), просмотр операций, фильтры по статусам, экспорт CSV.  
- **Staff:** личная статистика, уведомления о чаевых, состояние выплат.  
- **Platform Admin:** справочники заведений, аудит уведомлений, мониторинг интеграций, управление ключами Midtrans per merchant.

---

## 6. Нефункциональные и архитектурные требования
- **Производительность:** backend обрабатывает ≥ 50 запросов/сек с задержкой ≤ 200 мс до обращения в Midtrans.  
- **Надёжность:** сервис устойчив к повторным уведомлениям; все операции идемпотентны.  
- **Безопасность:** хранение `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_MERCHANT_ID` в секрет-хранилище; все внешние вызовы только по HTTPS; RBAC в кабинетах.  
- **Логирование и мониторинг:** сохраняем попытки вызова Snap/Payment Link, ошибки Midtrans, статусы уведомлений; метрики доступны в Grafana/ELK.  
- **Окружения:** `dev`, `staging`, `prod`. Для sandbox используем тестовые ключи Midtrans и Google Pay test environment; переключение окружений — через `MIDTRANS_ENV`.  
- **Комплаенс:** соблюдение MDR QRIS (комиссия не перекладывается на гостя), соответствие PDP и требованиям Midtrans по хранению данных.  
- **Архитектура:** Frontend (React/Vite), Backend API (Node/TS), PostgreSQL (основные данные), Redis (очереди уведомлений), Object Storage (экспорты).

---

## 7. API (эскиз)

### POST `/api/payments/midtrans/snap-intents`
**Вход:**  
```json
{
  "merchant_id": "m_123",
  "staff_id": "s_456",
  "amount_idr": 50000,
  "locale": "id",
  "customer_note": "Спасибо!"
}
```
**Логика:** создаёт Tip (`status=pending`), вызывает Midtrans Snap API, сохраняет `order_id`, `snap_token`, `redirect_url`, список методов оплаты.  
**Ответ:**  
```json
{
  "tip_id": "tip_2025-11-26_s_456",
  "snap_token": "abcdef123",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v4/redirection/abcdef123"
}
```

### POST `/api/payments/midtrans/payment-link`
**Вход:** аналогичен Snap, плюс `expires_in_minutes`.  
**Логика:** создаёт Tip, вызывает `/v1/payment-links`, сохраняет `payment_link_id` и URL.  
**Ответ:**  
```json
{
  "payment_link_url": "https://link.midtrans.com/tipsyo/abc123"
}
```

### POST `/api/payments/midtrans/notifications`
**Вход:** JSON уведомления Midtrans + заголовок `X-CALLBACK-SIGNATURE`.  
**Логика:** валидация подписи, идемпотентность, обновление Tip (`paid/failed/expired`), запись в `WebhookLog`, генерация событий выплат.  
**Ответ:** `200 OK`.

### GET `/api/tips/:tip_id/status`
Возвращает публичный статус (`pending|paid|failed|expired`) и текст для отображения лендингу.

---

## 8. Данные (основные сущности)

**Tip**  
`id`, `order_id`, `merchant_id`, `staff_id|null`, `amount_idr`, `currency=IDR`, `status`, `payment_channel`, `redirect_url`, `snap_token`, `midtrans_payment_link_id|null`, `customer_note`, `pct_to_staff`, `pct_to_venue`, `created_at`, `paid_at|null`

**Merchant**  
`id`, `name`, `midtrans_merchant_id`, `midtrans_server_key`, `midtrans_client_key`, `midtrans_env`, `default_split_rule_id`, `contact_email`, `created_at`

**Staff**  
`id`, `merchant_id`, `name`, `role`, `status`, `payout_account`, `payout_type`, `created_at`

**SplitRule**  
`id`, `merchant_id`, `pct_to_staff`, `pct_to_venue`, `active`, `created_at`

**WebhookLog**  
`id`, `tip_id`, `event_type`, `event_id`, `signature`, `payload_hash`, `status`, `processed_at`, `raw_payload`

**PaymentConfig**  
`id`, `merchant_id`, `google_pay_enabled`, `card_enabled`, `ewallet_enabled`, `bank_transfer_enabled`, `updated_at`

---

## 9. UX-тексты (фрагменты лендинга)
- «Выберите сумму чаевых и нажмите **Оплатить** — мы перенаправим вас на защищённую страницу Midtrans (Snap Hosted Checkout).»  
- «На странице оплаты доступны Google Pay, банковские карты и кошельки. Tips’yo не хранит данные карты — обработку выполняет Midtrans.»  
- «Сканируйте QR камерой телефона или откройте ссылку — оставление чаевых займёт меньше минуты.»  
- «Если вы оплачиваете через Google Pay, убедитесь, что в кошельке привязана карта. Midtrans подтвердит платёж автоматически.»

---

## 10. Примечания
- Базовый сценарий — Snap Hosted Checkout; Payment Link используется как вторичный канал (ссылка на оплату).  
- Динамический QRIS через Midtrans доступен как опция для десктопа и офлайн-материалов.  
- Все тексты и интерфейсы должны одинаково поддерживать EN/ID; RU — опционально, но по умолчанию для русскоязычных гостей.  
- MDR QRIS оплачивается заведением; Tips’yo не добавляет комиссию плательщику.  
- Google Pay должен быть включён в Midtrans Dashboard до запуска в продакшне.

---

## 11. Изменения в проекте и конфигурации
1. **Конфигурация и переменные окружения**  
   - Удалить все переменные окружения и конфиги предыдущего PSP.  
   - Добавить: `MIDTRANS_SERVER_KEY`, `MIDTRANS_CLIENT_KEY`, `MIDTRANS_MERCHANT_ID`, `MIDTRANS_ENV`, `MIDTRANS_PAYMENT_LINK_BASE_URL`, `MIDTRANS_NOTIFICATION_SECRET`, `GOOGLE_PAY_TEST_MERCHANT_ID`.  
   - Обновить `.env.example`, `docs/setup/env.md`, секреты CI/CD.

2. **Интеграции и кодовая база**  
   - Удалить все артефакты прежнего PSP; внедрить Midtrans HTTP-клиент (официальный SDK или собственный).  
   - Обновить backend сервисы: `payments.service`, `webhooks.controller`, слой работы со SplitRule.  
   - Пересобрать UI/админ-панель для управления Midtrans ключами и включёнными методами (в т.ч. Google Pay).  
   - Обновить деплой-скрипты и документацию (README, Quick Start) с упоминанием Midtrans.

3. **Тестирование**  
   - Написать интеграционные тесты для Snap Hosted Checkout (мокаем ответы Midtrans).  
   - Покрыть Payment Link API и обработку статусов `pending/settlement/expire`.  
   - Добавить тесты уведомлений (`/notifications`) на идемпотентность и подписи.  
   - Создать e2e сценарии гостя в браузере с Google Pay sandbox (Chrome + Android/Pixel эмулятор).  
   - Проверить QRIS/e-wallet флоу в sandbox Midtrans.

Документ самодостаточный; все процессы описаны исходно под Midtrans и Google Pay.
