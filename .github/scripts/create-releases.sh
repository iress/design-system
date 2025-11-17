#!/bin/bash
set -e

RELEASE_INFO=$1

echo "Creating GitHub releases and tags..."

IFS=';' read -ra RELEASES <<< "$RELEASE_INFO"

for RELEASE_ENTRY in "${RELEASES[@]}"; do
  if [ -z "$RELEASE_ENTRY" ]; then continue; fi
  
  IFS='|' read -r PACKAGE VERSION IS_PRERELEASE <<< "$RELEASE_ENTRY"
  TAG_NAME="${PACKAGE}@${VERSION}"
  
  echo "Creating release for $TAG_NAME..."
  
  if [ "$IS_PRERELEASE" = "true" ]; then
    PRERELEASE_FLAG="--prerelease"
    RELEASE_TYPE="Pre-release"
  else
    PRERELEASE_FLAG=""
    RELEASE_TYPE="Release"
  fi
  
  PREV_TAG=$(git tag -l "${PACKAGE}@*" --sort=-version:refname | head -n 1 || echo "")
  
  NOTES_FILE=$(mktemp)
  {
    echo "**$RELEASE_TYPE** of \`$PACKAGE\` version \`$VERSION\`"
    echo ""
    echo "## Installation"
    echo ""
    echo "\`\`\`bash"
    echo "npm install ${PACKAGE}@${VERSION}"
    echo "\`\`\`"
    echo ""
    echo "📦 [View on npm](https://www.npmjs.com/package/${PACKAGE}/v/${VERSION})"
    echo ""
    echo "---"
  } > "$NOTES_FILE"
  
  if [ -n "$PREV_TAG" ]; then
    echo "  Generating AI-powered release notes from $PREV_TAG to HEAD..."
    gh release create "$TAG_NAME" \
      --title "$PACKAGE $VERSION" \
      --notes-file "$NOTES_FILE" \
      --generate-notes \
      --notes-start-tag "$PREV_TAG" \
      $PRERELEASE_FLAG \
      --target "$GITHUB_SHA"
  else
    echo "  First release - generating notes..."
    gh release create "$TAG_NAME" \
      --title "$PACKAGE $VERSION" \
      --notes-file "$NOTES_FILE" \
      --generate-notes \
      $PRERELEASE_FLAG \
      --target "$GITHUB_SHA"
  fi
  
  echo "  ✅ Created release and tag: $TAG_NAME"
  rm -f "$NOTES_FILE"
done

echo "✅ All GitHub releases created successfully"
