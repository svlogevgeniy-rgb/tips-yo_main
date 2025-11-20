# Local Setup — Tips'yo Landing

Этот гайд переведён из `LANDING_SETUP.md` из dev-проекта и адаптирован под текущий Vite-приложение.

## Предварительные требования

- Node.js 18+ (желательно LTS 20)
- npm 10+
- Git (для установки из репозитория)

## Установка и запуск

```bash
git clone https://github.com/svlogevgeniy-rgb/tips-yo_main.git
cd tips-yo_main
npm install
npm run dev
```

Разработка ведётся на `http://localhost:5173`. Для production-сборки выполните `npm run build`, результат появится в `dist/`.

## Структура исходников

```
src/
├── components/
│   └── ui/            # Button, Card, Sheet, Badge, Input
├── lib/               # вспомогательные функции, данные для секций
├── LandingPage.tsx    # главный компонент с секциями
├── index.css          # глобальные стили (Tailwind)
└── main.tsx           # точка входа React
```

Tailwind настраивается в `tailwind.config.js`, общий постпроцессинг — в `postcss.config.js`.

## Работа с изображениями

1. Подготовьте PNG-файлы профессий (512×512).
2. Поместите их в `public/images/` c именами `waitress.png`, `manicure.png`, `blogger.png`, `courier.png`, `taxi.png`, `trainer.png`.
3. Для массового копирования можно использовать `./copy-images.sh <source-dir>`.

Если фотографии отсутствуют, компоненты используют градиентные фолбеки, поэтому лендинг всегда выглядит корректно.

## Кастомизация

- **Цвета** — редактируйте CSS-переменные в `src/index.css` или расширяйте палитру Tailwind.
- **Тексты** — основные копирайты находятся в `src/sections/**`.
- **CTA** — ссылки и действия задаются непосредственно в `src/LandingPage.tsx`.

## Быстрые проверки

```bash
npm run lint    # линтеры (если настроены)
npm run build   # production-сборка
```

Перед коммитом убедитесь, что билд проходит локально, а в отчёте `npm run lint` нет ошибок критического уровня.
