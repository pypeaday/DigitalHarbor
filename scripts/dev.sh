#!/usr/bin/env bash
# wrangler dev on a free port — this box runs lots of things, never assume 8787.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT="${1:-$(bash scripts/free-port.sh)}"
echo "dev → http://localhost:${PORT}"
exec npx wrangler dev --port "$PORT" --inspector-port 0
