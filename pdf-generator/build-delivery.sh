#!/usr/bin/env bash
# Build the up-to-date applicant handout set into ../delivery/ (desktop + mobile),
# without touching any existing builder, doc, or the frozen pdf/ outputs.
#
# Usage: ./build-delivery.sh
# Requires: python3, node, and `npm install` (playwright-core) run once in this dir.
# Chromium: set CHROME_PATH if the default isn't present.
set -euo pipefail
cd "$(dirname "$0")"
export CHROME_PATH="${CHROME_PATH:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
python3 build_delivery.py
