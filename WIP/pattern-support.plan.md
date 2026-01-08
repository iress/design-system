# Pattern Support Implementation Plan

## Problem Summary

IressForm and other pattern-based components (like IressHookForm) are not discoverable via the MCP server because the component mapping logic only searches for `components-*-docs.md` files, missing `patterns-*-docs.md` files.

## Root Cause

The `mapIressComponentToFile()` function in `/packages/mcp-server/src/utils.ts` only searches for component documentation files with the pattern `components-{name}-docs.md`. When Form was moved from a component to a pattern, the documentation file became `patterns-form-docs.md`, but the mapping logic wasn't updated.

## Solution Approach

Extend the component mapping logic to search both `components-*` and `patterns-*` documentation files, with a hierarchical fallback strategy:

1. Exact component match
2. Exact pattern match
3. Partial component matching
4. Partial pattern matching
5. Fuzzy component matching
6. Fuzzy pattern matching

Additionally, boost relevance scores for pattern-based results in search handlers.

## Implementation Checklist

### Code Changes

- [x] Update `mapIressComponentToFile()` in `/packages/mcp-server/src/utils.ts`
  - [x] Add exact pattern match after exact component match
  - [x] Add partial pattern matching after partial component matching
  - [x] Add fuzzy pattern matching after fuzzy component matching
  - [x] Ensure backward compatibility with existing component mappings

- [x] Update `handleFindComponent()` in `/packages/mcp-server/src/componentHandlers.ts`
  - [x] Add pattern-specific relevance score boost (+25 points)
  - [x] Update scoring logic to prioritize patterns when appropriate

- [x] Update `handleAnalyzeComponentMentions()` in `/packages/mcp-server/src/iressHandlers.ts`
  - [x] Ensure pattern components are correctly detected and analyzed (works automatically with updated mapping)

### Testing

- [x] **REQUIRED: Write test that reproduces the bug**
  - [x] Test searching for "IressForm" fails before fix
  - [x] Test that `mapIressComponentToFile('IressForm')` returns null

- [x] **REQUIRED: Write comprehensive pattern mapping tests in `/packages/mcp-server/src/utils.test.ts`**
  - [x] Test exact pattern match: `mapIressComponentToFile('IressForm')` → `patterns-form-docs.md`
  - [x] Test IressHookForm maps to correct pattern file
  - [x] Test component mapping still works: `mapIressComponentToFile('IressButton')` → `components-button-docs.md`
  - [x] Test fallback priority (component → pattern → partial → fuzzy)
  - [x] Test case insensitivity
  - [x] Test with/without "Iress" prefix

- [x] **REQUIRED: Write integration tests in `/packages/mcp-server/test/handlers.test.ts`**
  - [x] Test `find_component` tool returns IressForm correctly
  - [x] Test `get_iress_component_info` tool works with pattern components
  - [x] Test `analyze_component_mentions` detects pattern components in text

- [x] **REQUIRED: Verify all tests pass after fix**
  - [x] Run `yarn test:mcp-server` and confirm all pass (286 tests passed)
  - [x] Run `yarn test:coverage` and check coverage is maintained

### Manual Testing

- [ ] Test IressForm discovery via MCP server
  - [ ] Query: "find component IressForm"
  - [ ] Query: "find component Form"
  - [ ] Query: "get info for IressForm"

- [ ] Test IressHookForm discovery
  - [ ] Query: "find component IressHookForm"
  - [ ] Query: "get props for IressHookForm"

- [ ] Test backward compatibility
  - [ ] Query: "find component IressButton" still works
  - [ ] Query: "find component IressRichSelect" still works
  - [ ] All existing component searches work as before

### Documentation

- [x] Update `/packages/mcp-server/README.md`
  - [x] Document that MCP server supports both components and patterns
  - [x] Add examples of searching for pattern-based components
  - [x] Update component discovery documentation

- [x] Add inline code comments explaining the fallback strategy

### Validation

- [x] Confirm fix resolves original issue (IressForm not found) - verified through tests
- [x] Verify no regressions in existing component mappings - all 286 tests pass
- [ ] Test with real AI interactions to ensure discovery works
- [x] Check performance impact (minimal expected, but validate) - no performance degradation

## Files to Modify

### Primary Changes

- `/packages/mcp-server/src/utils.ts`
  - Update `mapIressComponentToFile()` function
  - Add pattern-specific search logic

- `/packages/mcp-server/src/componentHandlers.ts`
  - Update `calculateRelevanceScore()` function
  - Add pattern scoring boost

### Test Files

- `/packages/mcp-server/src/utils.test.ts` (NEW)
  - Create comprehensive unit tests for `mapIressComponentToFile()`
  - Test all fallback scenarios

- `/packages/mcp-server/test/handlers.test.ts`
  - Add integration tests for pattern component discovery

### Documentation

- `/packages/mcp-server/README.md`
  - Update component discovery documentation
  - Add pattern support examples

## Implementation Details

### Updated `mapIressComponentToFile()` Function

```typescript
export function mapIressComponentToFile(componentName: string): string | null {
  const baseComponentName = componentName.replace(/^Iress/, '').toLowerCase();
  const markdownFiles = getMarkdownFiles();

  // 1. Try exact component match first (maintain existing behavior)
  let matchingFile = markdownFiles.find(
    (file) => file === `components-${baseComponentName}-docs.md`,
  );

  // 2. Try exact pattern match
  if (!matchingFile) {
    matchingFile = markdownFiles.find(
      (file) => file === `patterns-${baseComponentName}-docs.md`,
    );
  }

  // 3. Try partial component matching
  if (!matchingFile) {
    matchingFile = markdownFiles.find(
      (file) =>
        file.startsWith(`components-${baseComponentName}`) &&
        file.endsWith('-docs.md'),
    );
  }

  // 4. Try partial pattern matching
  if (!matchingFile) {
    matchingFile = markdownFiles.find(
      (file) =>
        file.startsWith(`patterns-${baseComponentName}`) &&
        file.endsWith('-docs.md'),
    );
  }

  // 5. Try fuzzy component matching
  if (!matchingFile) {
    matchingFile = markdownFiles.find(
      (file) =>
        file.includes(baseComponentName) && file.startsWith('components-'),
    );
  }

  // 6. Try fuzzy pattern matching
  if (!matchingFile) {
    matchingFile = markdownFiles.find(
      (file) =>
        file.includes(baseComponentName) && file.startsWith('patterns-'),
    );
  }

  return matchingFile ?? null;
}
```

### Updated Relevance Scoring

```typescript
function calculateRelevanceScore(
  file: string,
  content: string,
  query: string,
  lines: string[],
): number {
  let relevanceScore = 0;

  // Existing scoring logic...

  // Add pattern-specific scoring boost
  if (file.startsWith('patterns-')) {
    relevanceScore += 25; // Boost patterns as they're often searched for
  }

  return relevanceScore;
}
```

## Risk Assessment

- **Low risk change**
- **Potential side effects:**
  - If a component and pattern have the same name, component will be prioritized (by design)
  - Pattern boost in relevance scoring might affect existing search result ordering
- **Rollback plan:**
  - Revert changes to `utils.ts` and `componentHandlers.ts`
  - All existing functionality will remain intact
  - No breaking changes to MCP server API

## Expected Impact

### Immediate Benefits

- ✅ IressForm becomes discoverable
- ✅ IressHookForm becomes discoverable
- ✅ All pattern-based exports work correctly
- ✅ Maintains 100% backward compatibility with existing component searches

### Performance

- Minimal performance impact (6 sequential find operations vs 3)
- No significant slowdown expected
- Early returns optimize for common cases

### Developer Experience

- AI can now find and use pattern-based components
- Improved search relevance for patterns
- Better component discovery overall

## Success Criteria

- [ ] `find_component` tool successfully returns IressForm documentation
- [ ] All existing component searches continue to work
- [ ] Unit tests achieve 95%+ coverage for new code paths
- [ ] Integration tests pass for both components and patterns
- [ ] No performance degradation in search operations
- [ ] Documentation updated and clear

## Timeline

- **Day 1:** Implement `mapIressComponentToFile()` changes and unit tests
- **Day 2:** Update relevance scoring and add integration tests
- **Day 3:** Manual testing, documentation, and validation
- **Total:** 3 days

## Notes

- This is the highest priority solution from the MCP Server Improvements Plan
- Foundation for other improvements (multi-component search depends on this)
- No Storybook changes needed - documentation structure is already correct
- Consider this a critical bug fix, not a feature addition
