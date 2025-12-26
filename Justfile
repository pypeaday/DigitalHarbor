default:
  @just --list

build:
    npm run build

serve:
    @just build
    python -m http.server -d dist 8000

tailwind:
    npx tailwindcss --input tailwind/input.css --output static/app.css --minify --watch
    # npx tailwindcss --input tailwind/input.css --output static/app.css --minify
