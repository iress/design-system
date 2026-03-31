#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PACKAGE="@iress-oss/ids-components"

# Read version from package.json
VERSION=$(node -p "require('$REPO_ROOT/packages/components/package.json').version")
TAG="${PACKAGE}@${VERSION}"

# Determine if this is a prerelease
PRERELEASE_FLAG=""
if [[ "$VERSION" == *"-"* ]]; then
  PRERELEASE_FLAG="--prerelease"
fi

# Parse arguments
DRAFT_FLAG=""
for arg in "$@"; do
  case "$arg" in
    --draft) DRAFT_FLAG="--draft" ;;
    --published) DRAFT_FLAG="" ;;
    --help|-h)
      echo "Usage: $0 [--draft | --published]"
      echo ""
      echo "Creates a GitHub release for ${PACKAGE}."
      echo "Version is read from packages/components/package.json."
      echo ""
      echo "Options:"
      echo "  --draft       Create as a draft release"
      echo "  --published   Create as a published release (default)"
      exit 0
      ;;
    *) echo "Unknown option: $arg (use --help)" >&2; exit 1 ;;
  esac
done

# Get the previous release tag
PREVIOUS_TAG=$(gh release list --limit 1 --json tagName --jq '.[0].tagName' 2>/dev/null || echo "")

echo "Creating release:"
echo "  Tag:         ${TAG}"
echo "  Prerelease:  $([[ -n "$PRERELEASE_FLAG" ]] && echo "yes" || echo "no")"
echo "  Draft:       $([[ -n "$DRAFT_FLAG" ]] && echo "yes" || echo "no")"
[[ -n "$PREVIOUS_TAG" ]] && echo "  Changelog:   since ${PREVIOUS_TAG}"
echo ""

# --- Gather context for AI ---

# Auto-generated PR list
AUTO_NOTES=""
if [[ -n "$PREVIOUS_TAG" ]]; then
  AUTO_NOTES=$(gh api repos/{owner}/{repo}/releases/generate-notes \
    -f tag_name="$TAG" \
    -f previous_tag_name="$PREVIOUS_TAG" \
    --jq '.body' 2>/dev/null || echo "")
fi

# Get merged PR details (titles + bodies) since previous tag
PR_DETAILS=""
if [[ -n "$PREVIOUS_TAG" ]]; then
  SINCE_DATE=$(gh release view "$PREVIOUS_TAG" --json publishedAt --jq '.publishedAt' 2>/dev/null || echo "")
  if [[ -n "$SINCE_DATE" ]]; then
    PR_DETAILS=$(gh pr list --state merged --search "merged:>=${SINCE_DATE}" --json number,title,body \
      --jq '.[] | "### PR #\(.number): \(.title)\n\(.body // "(no description)")\n---"' 2>/dev/null || echo "")
  fi
fi

# --- Generate curated notes with kiro-cli ---

echo "🤖 Generating release notes with AI..."
echo ""

PROMPT="You are writing release notes for ${TAG}.

Here are the auto-generated PR notes from GitHub:

${AUTO_NOTES}

Here are the full PR descriptions for context:

${PR_DETAILS}

Write curated release notes in this exact format. The auto-generated \"What's Changed\" section will be prepended automatically — do NOT include it. Only output the curated sections below.

Rules:
- Only include sections that are relevant (omit empty sections entirely)
- Be concise — one or two sentences per item, with a short code example only for breaking changes
- Use component names with the Iress prefix (e.g. IressSelect, IressPopover)
- Write from the perspective of a consumer of the library
- Do NOT wrap the output in markdown code fences
- Start directly with the first ## heading

Available sections (use only what's needed):

## ⚠️ Breaking Changes
## ✨ New Features
## 🐛 Bug Fixes
## 📖 Documentation"

AI_NOTES_RAW=$(echo "$PROMPT" | kiro-cli chat --no-interactive --trust-tools= --wrap=never 2>/dev/null)
# Strip ANSI escape codes and kiro prompt artifacts from the output
AI_NOTES=$(echo "$AI_NOTES_RAW" | sed $'s/\x1b\[[0-9;]*[a-zA-Z]//g' | sed 's/^> //')

# Combine auto-generated + AI-curated notes
FINAL_NOTES=$(mktemp)
trap 'rm -f "$FINAL_NOTES"' EXIT

{
  echo "$AUTO_NOTES"
  echo ""
  echo "$AI_NOTES"
} > "$FINAL_NOTES"

# Let user review/edit
echo "--- Release notes preview ---"
cat "$FINAL_NOTES"
echo "--- End preview ---"
echo ""
read -rp "Edit notes before creating? [y/N] " edit_choice
if [[ "$edit_choice" == [yY] ]]; then
  EDITOR="${EDITOR:-${VISUAL:-vi}}"
  "$EDITOR" "$FINAL_NOTES"
fi

echo ""
read -rp "Create this release? [y/N] " confirm
if [[ "$confirm" != [yY] ]]; then
  echo "Aborted."
  exit 1
fi

# shellcheck disable=SC2086
gh release create "$TAG" \
  --title "$TAG" \
  --target "$(git rev-parse HEAD)" \
  --notes-file "$FINAL_NOTES" \
  $PRERELEASE_FLAG \
  $DRAFT_FLAG

echo ""
echo "✅ Release created: ${TAG}"
