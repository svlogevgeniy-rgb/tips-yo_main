#!/bin/bash

# Скрипт для копирования изображений в проект
# Использование: ./copy-images.sh <путь_к_папке_с_изображениями>

if [ -z "$1" ]; then
  echo "❌ Ошибка: Укажите путь к папке с изображениями"
  echo "Использование: ./copy-images.sh <путь_к_папке>"
  echo "Пример: ./copy-images.sh ~/Downloads/tips-images"
  exit 1
fi

SOURCE_DIR="$1"

if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Ошибка: Папка $SOURCE_DIR не найдена"
  exit 1
fi

echo "📁 Копирование изображений из $SOURCE_DIR..."

# Создаём папку если её нет
mkdir -p public/images

# Массив с соответствием файлов
declare -A images=(
  ["waitress.png"]="Официанты"
  ["manicure.png"]="Мастера маникюра"
  ["blogger.png"]="Блогеры"
  ["gas-station.png"]="Заправщики"
  ["courier.png"]="Курьеры"
  ["anyone.png"]="Кто угодно"
)

copied=0
missing=0

for filename in "${!images[@]}"; do
  if [ -f "$SOURCE_DIR/$filename" ]; then
    cp "$SOURCE_DIR/$filename" "public/images/$filename"
    echo "✅ Скопировано: $filename (${images[$filename]})"
    ((copied++))
  else
    echo "⚠️  Не найдено: $filename (${images[$filename]})"
    ((missing++))
  fi
done

echo ""
echo "📊 Результат:"
echo "   Скопировано: $copied файлов"
echo "   Не найдено: $missing файлов"

if [ $copied -gt 0 ]; then
  echo ""
  echo "✨ Готово! Обновите страницу в браузере (http://localhost:5173)"
fi
