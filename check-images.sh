#!/bin/bash

echo "🔍 Проверка изображений в проекте..."
echo ""

IMAGES_DIR="public/images"
REQUIRED_IMAGES=(
  "waitress.png"
  "manicure.png"
  "blogger.png"
  "gas-station.png"
  "courier.png"
  "anyone.png"
)

found=0
missing=0

for img in "${REQUIRED_IMAGES[@]}"; do
  if [ -f "$IMAGES_DIR/$img" ]; then
    size=$(ls -lh "$IMAGES_DIR/$img" | awk '{print $5}')
    echo "✅ $img ($size)"
    ((found++))
  else
    echo "❌ $img - НЕ НАЙДЕНО"
    ((missing++))
  fi
done

echo ""
echo "📊 Результат:"
echo "   Найдено: $found из 6"
echo "   Отсутствует: $missing"

if [ $missing -eq 0 ]; then
  echo ""
  echo "🎉 Все изображения на месте!"
  echo "   Откройте http://localhost:5173 и обновите страницу"
else
  echo ""
  echo "⚠️  Добавьте недостающие изображения в папку public/images/"
  echo "   См. инструкцию: БЫСТРОЕ_ДОБАВЛЕНИЕ_ФОТО.md"
fi
