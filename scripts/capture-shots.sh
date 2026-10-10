#!/usr/bin/env bash
# Capture homepage screenshots for the site registry -> public/images/shots/{slug}.jpg
# Uses the Playwright-cached Chromium binary directly (no npm dep).
# Usage: npm run shots
set -uo pipefail

CHROME="${CHROME:-$HOME/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome}"
OUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images/shots"
mkdir -p "$OUT_DIR"

# slug<TAB>url — keep in sync with src/data/sites.ts
SITES=$'olivet\thttps://olivet-website.olivetbiblechurch.workers.dev
olivet-emdash\thttps://olivet-emdash.olivetbiblechurch.workers.dev
reveal\thttps://reveal-fitness-website.revealfitness.workers.dev
jacobs\thttps://jacobs-meat-market-website.nicpayne713.workers.dev
hofackers\thttps://hofackers-website.hofackersfarm.workers.dev
power-washing\thttps://gdwrks.com
vans-construction\thttps://vans-construction-website.nicpayne713.workers.dev
mydigitalharbor\thttps://mydigitalharbor.com
notifiq\thttps://notifiq.net
pype-dev\thttps://pype.dev'

while IFS=$'\t' read -r slug url; do
  [ -z "$slug" ] && continue
  png="$OUT_DIR/$slug.png"
  out="$OUT_DIR/$slug.jpg"
  echo "-> $slug ($url)"
  "$CHROME" --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
    --screenshot="$png" --window-size=1200,630 \
    --virtual-time-budget=10000 --timeout=20000 \
    "$url" >/dev/null 2>&1
  if [ -s "$png" ]; then
    if command -v convert >/dev/null; then
      convert "$png" -quality 72 "$out" && rm -f "$png"
    elif command -v magick >/dev/null; then
      magick "$png" -quality 72 "$out" && rm -f "$png"
    elif command -v ffmpeg >/dev/null; then
      ffmpeg -y -loglevel error -i "$png" -q:v 4 "$out" && rm -f "$png"
    else
      mv "$png" "$out"
    fi
    echo "   ok: $out"
  else
    echo "   FAILED"
  fi
done <<< "$SITES"
