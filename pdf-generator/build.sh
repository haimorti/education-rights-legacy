#!/usr/bin/env bash
# Build the "שיקום מקצועי לסטודנטים" benefit/process PDFs (desktop + mobile).
#
# Usage:
#   ./build.sh 01            # build a single page by id
#   ./build.sh 01 02         # build several
#   ./build.sh all           # build every page
#
# Output: ../pdf/desktop/<slug>.pdf  and  ../pdf/mobile/<slug>.pdf
# Requires: python3, node, and `npm install` (playwright-core) run once in this dir.
# Chromium: set CHROME_PATH to your Chrome/Chromium binary if the default isn't present.
set -euo pipefail
cd "$(dirname "$0")"
REPO="$(cd .. && pwd)"
OUTDIR="$REPO/pdf"
mkdir -p "$OUTDIR" _html

declare -A SLUG=(
  [01]=01-application-process
  [02]=02-rehabilitation-allowance
  [03]=03-tuition
  [04]=04-rent-assistance
  [05]=05-travel-expenses
  [06]=06-study-equipment
  [07]=07-tutoring
  [08]=08-accessibility
)
# Bespoke builders (faithful to the original site components).
# Pages not listed here fall back to the generic Markdown generator (flat layout — not final).
declare -A BESPOKE=(
  [01]=pages/app01.py
  [02]=pages/app02.py
  [03]=pages/app03.py
  [04]=pages/app04.py
  [05]=pages/app05.py
  [06]=pages/app06.py
  [07]=pages/app07.py
  [08]=pages/app08.py
)

build_one () {
  local id="$1" slug="${SLUG[$1]:-}"
  [ -z "$slug" ] && { echo "unknown page id: $1 (use 01..08)"; return 1; }
  if [ -n "${BESPOKE[$id]:-}" ]; then
    python3 "${BESPOKE[$id]}" >/dev/null
  else
    echo "  (note: $slug has no bespoke builder yet — using generic fallback)"
    python3 generate.py "$slug" >/dev/null
  fi
  node render.js "_html/$slug.html" "$OUTDIR/$slug"
  echo "built $slug -> pdf/desktop/$slug.pdf  +  pdf/mobile/$slug.pdf"
}

if [ "$#" -eq 0 ]; then
  echo "usage: ./build.sh <id...|all>   (ids: 01 02 03 04 05 06 07 08)"; exit 1
fi
if [ "$1" = "all" ]; then set -- 01 02 03 04 05 06 07 08; fi
for a in "$@"; do build_one "$a"; done
