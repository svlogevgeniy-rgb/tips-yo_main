# UI Forms & Validation

## Структура
- Используем `react-hook-form` + `zod` (в планах) для схем.
- Каждый input оборачивается `Input` или `Field` (TBD) с label/hint/error.
- Грид форм: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.

## Валидация
- **Синхронная**: required, формат, min/max (моментально, onBlur).
- **Асинхронная**: проверки KYC/Midtrans — показываем state `Verifying…` + spinner.
- Ошибки отображаются под полем + summary сверху (toast).

## Чеклисты
- Показываем шаги wizard'а (progress), disabled CTA до валидной формы.

## Помощь
- Hint-тексты/tooltip для сложных полей (split rule, webhook URL).
- Линки «Learn more» в правой колонке.

## Технические требования
- Каждое поле доступно с клавиатуры (tab order), `aria-describedby` для ошибок.
- Формы должны поддерживать авто-назаполнение (autocomplete).
