#!/usr/bin/env bash
# Build the white-style variant (option 2) of 01a and 01b into ../delivery/white/,
# alongside the existing colored delivery/ set (which stays untouched).
#
# Usage: ./build-delivery-white.sh
set -euo pipefail
cd "$(dirname "$0")"
export CHROME_PATH="${CHROME_PATH:-/opt/pw-browsers/chromium-1194/chrome-linux/chrome}"
python3 build_delivery_white.py
