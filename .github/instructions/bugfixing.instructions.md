---
applyTo: '**'
---

# Bug Fixing Best Practices

## 1. Initial Analysis (Don't Jump to Solutions)

### Parse the Support Request

- **Extract key symptoms**: What exactly is broken? What's the expected vs actual behavior?
- **Identify affected components**: Which UI elements, APIs, or features are involved?
- **Classify the issue**: Bug, feature request, configuration issue, or user error?
- **Note reproduction context**: Browser, environment, specific data, user actions

### Understand the Technical Flow

- **Trace the data path**: From input → processing → output where does it break?
- **Identify the domain**: Styling, event handling, data transformation, rendering, etc.
- **Consider scope**: Is this a single component issue or systemic problem?

### Communicate Initial Analysis

**Always summarize your initial understanding and ask for confirmation:**

- "Based on the bug report, I understand that [X problem] is happening when [Y scenario]. Is this correct?"
- "I think this affects [components/areas]. Should I investigate these areas first?"
- "This seems like a [bug type] issue. Does this match your expectations?"

**Wait for confirmation before proceeding to investigation.**

### Create Story for Visual Inspection

**After confirming the analysis, create a Storybook story to reproduce the bug:**

- **Create the story in the main/root component's stories file** (e.g., `RichSelect.stories.tsx`, not `SelectMenu.stories.tsx`)
- This makes the bug reproduction more accessible and realistic for users
- Include problem summary in the story description
- Document expected vs actual behavior
- Provide clear test steps
- Make the bug visually apparent in the story
- Use the actual component API that users would interact with
- Create mock data that triggers the bug if needed

**Template for bug reproduction story:**

```typescript
export const BugReproduction: Story = {
  name: 'Bug: [Brief Description]',
  args: {
    // Props that trigger the bug
  },
  parameters: {
    docs: {
      description: {
        story: `
**Problem Summary:** [What goes wrong]

**Expected Behavior:** [What should happen]

**Actual Behavior:** [What actually happens]

**How to Test:**
1. [Step by step instructions]
2. [To reproduce the issue]

        `,
      },
    },
  },
};
```

**Communicate story creation:**

- "I've created a story to reproduce the bug at [story location]. Can you confirm this matches the issue you're seeing?"
- "Please check the story shows the problem correctly before I proceed with the investigation."

**Choosing the Right Component for Bug Stories:**

- **Use the main component** that users directly interact with (e.g., `RichSelect`, `Table`, `Form`)
- **Avoid subcomponent stories** unless the bug is specifically isolated to that subcomponent
- **Think from user perspective**: What component would they import and use?
- **Examples**:
  - Bug in select dropdown → `RichSelect.stories.tsx` (not `SelectMenu.stories.tsx`)
  - Bug in table sorting → `Table.stories.tsx` (not `TableSortButton.stories.tsx`)
  - Bug in form validation → `Form.stories.tsx` (not `FormField.stories.tsx`)

## 2. Investigative Strategy (You Must Find the Files)

### Use Workspace Search to Locate Relevant Code

**Never assume file locations** - always search first using available tools:

- Use `semantic_search` for conceptual searches
- Use `grep_search` for exact patterns, error messages, or code snippets
- Use `file_search` for finding files by name patterns

### Progressive Search Strategy

1. **Start broad**: Search for main concepts from the bug report
2. **Follow the evidence**: Look for exact error messages, component names, or symptoms
3. **Trace dependencies**: Check imports, exports, and related files
4. **Examine tests**: Often reveal expected behavior and usage patterns

**Communicate search progress:**

- "I'm searching for [search terms] to locate the relevant files"
- "Found [X files] that might be related: [list files]. Should I examine these?"
- "Based on my search, I think the issue is in [specific area]. Proceeding to investigate."

### Search Strategy by Bug Type

- **UI/Visual bugs**: Search for component names, CSS classes, styling patterns
- **Functional bugs**: Search for method names, event handlers, state management
- **Error messages**: Search for exact error text or stack trace elements
- **Data flow issues**: Search for data transformation, API calls, or prop passing
- **Performance issues**: Search for loops, heavy computations, or inefficient patterns

## 3. Root Cause Analysis

### Examine the Located Files

- **Read the actual code** - don't make assumptions about implementation
- **Understand the data flow** - how do props/data move through the component hierarchy?
- **Look for patterns and anti-patterns** in the code
- **Check component interactions** - how do different parts communicate?

### Common Bug Categories and Investigation Focus

- **Rendering issues**: Check JSX structure, conditional rendering, component lifecycle
- **Event handling bugs**: Look for event listeners, handlers, preventDefault/stopPropagation
- **State management**: Examine state updates, side effects, dependency arrays
- **Styling problems**: Investigate CSS classes, inline styles, theme variables
- **Type errors**: Check TypeScript definitions, prop types, interface mismatches
- **Performance issues**: Look for unnecessary re-renders, heavy computations, memory leaks
- **API/Network bugs**: Examine fetch calls, error handling, data transformation
- **Prop/data flow**: Trace how data moves between components and gets transformed

**Communicate findings:**

- "I've located the issue in [file/component]. The problem appears to be [specific issue]."
- "The root cause seems to be [explanation]. This affects [scope of impact]."
- "Before proposing a fix, can you confirm this matches what you're experiencing?"

### Propose Solution Options

**After confirming the root cause, present multiple solution approaches:**

- **Always provide 2-3 solution options** when possible, ranked by preference
- **Explain the pros and cons** of each approach
- **Consider different levels of complexity** (minimal fix vs comprehensive solution)
- **Highlight trade-offs** in terms of maintainability, performance, and risk

**Template for solution options:**

```
I've identified [X] potential solutions for this issue:

**Option 1: [Approach Name] (Recommended)**
- What: [Brief description of the fix]
- Pros: [Benefits of this approach]
- Cons: [Potential drawbacks]
- Risk: [Low/Medium/High]
- Effort: [Small/Medium/Large]

**Option 2: [Alternative Approach]**
- What: [Brief description]
- Pros: [Benefits]
- Cons: [Drawbacks]
- Risk: [Level]
- Effort: [Size]

**Option 3: [Another Alternative]** (if applicable)
- What: [Brief description]
- Pros: [Benefits]
- Cons: [Drawbacks]
- Risk: [Level]
- Effort: [Size]

Which approach would you prefer? I recommend Option 1 because [reasoning].
```

**Wait for decision before proceeding to implementation planning.**

## 4. Solution Strategy

### Always Prefer Minimal Changes

1. **Fix at the exact problem location** (most targeted approach)
2. **Prefer deletion over addition** - remove problematic code rather than adding workarounds, when deletion is simpler and more reasonable
3. **Add validation or guards** if the issue is data-related
4. **Refactor component structure** only if architecture is fundamentally wrong
5. **Create new utilities/abstractions** as last resort

### Common Fix Patterns by Bug Type

- **Prop issues**: Remove unnecessary code, extract problematic elements, or fix destructuring
- **State bugs**: Fix update logic, dependencies, or initial state
- **Event handling**: Add proper handlers, prevent defaults, or fix bindings
- **Styling issues**: Correct CSS classes, fix specificity, or update theme values
- **Type errors**: Update interfaces, fix imports, or add proper type guards
- **Performance**: Optimize renders, add memoization, or fix expensive operations
- **API issues**: Fix error handling, update endpoints, or improve data transformation
- **API issues**: Fix error handling, update endpoints, or improve data transformation

### Simplicity First Approach

- **Question necessity**: Does this code actually need to exist?
- **Remove over filter**: If code is causing issues, consider if it's needed at all
- **Explicit over implicit**: Be explicit about what you're passing or including
- **Clean over complex**: A simple deletion is often better than complex filtering logic

### Validate Your Approach

- **Check existing patterns** in the codebase - follow established conventions
- **Consider backward compatibility** - don't break existing APIs
- **Think about similar cases** - will this fix work for related scenarios?
- **Review component responsibility** - is this the right place for the fix?

**Communicate proposed solution:**

- "I propose fixing this by [solution approach] because [reasoning]."
- "This is the minimal change needed and maintains backward compatibility."
- "Should I proceed with implementing this fix, or would you prefer a different approach?"

### Assess Bug Complexity and Documentation Needs

**Before creating implementation plans and documentation, evaluate the bug complexity:**

**Create Implementation Plan & Documentation ONLY when the bug meets these criteria:**

- **Multiple file changes** required across different components or packages
- **Complex root cause** affecting multiple systems or data flows
- **Risk of regression** in related functionality
- **API or interface changes** needed
- **Multiple solution approaches** need careful coordination
- **Cross-team impact** or affects multiple user workflows

**Skip formal documentation for simple bugs that:**

- **Single file, single function fix** (e.g., typo, missing null check, simple prop fix)
- **Obvious solution** with minimal implementation steps
- **Low risk change** with no backward compatibility concerns
- **Quick validation** can be done immediately after fix
- **Part of ongoing bugfixing journey** where context is already established

**When in doubt, ask yourself:**

- "Can this be fixed with 1-3 simple changes in 1-2 files?"
- "Is the solution obvious and low-risk?"
- "Am I already in the middle of fixing related issues?"

**If YES to all three → Skip formal documentation and proceed directly to implementation.**
**If NO to any → Create implementation plan and documentation.**

### Create Implementation Plan

**After solution selection and approval, create a detailed implementation plan:**

- Create `bugfixing-[bug-topic].plan.md` in the workspace root (e.g., `bugfixing-richselect-concurrent-requests.plan.md`)
- Use kebab-case and keep the filename descriptive but concise
- List all implementation steps as checkboxes
- Include testing and validation steps
- Reference specific files and line numbers where possible

**Template for implementation plan:**

```markdown
# Bug Fix Implementation Plan

## Problem Summary

[Brief description of the bug]

## Root Cause

[What exactly is causing the issue]

## Solution Approach

[High-level description of the fix]

## Implementation Checklist

### Code Changes

- [ ] Fix [specific issue] in `[file path]` (line X)
- [ ] Update [related component/type] if needed
- [ ] Add validation/guards if necessary

### Testing

- [ ] Run existing tests for affected components
- [ ] Add test case for bug scenario
- [ ] Test edge cases and similar patterns
- [ ] Verify no regressions in related functionality

### Documentation

- [ ] Update component documentation if API changes
- [ ] Add inline comments explaining the fix
- [ ] Update story with fixed behavior

### Validation

- [ ] Confirm fix resolves original issue
- [ ] Test with different data/scenarios
- [ ] Check similar components for same issue
- [ ] Verify backward compatibility maintained

## Files to Modify

- `[file path]` - [what will be changed]
- `[test file path]` - [test additions/updates]

## Risk Assessment

- **Low/Medium/High risk change**
- **Potential side effects:** [list any concerns]
- **Rollback plan:** [how to undo if needed]
```

**Communicate plan creation:**

- "I've created a detailed implementation plan at `bugfixing-[bug-topic].plan.md`. Please review the steps before I begin implementation."
- "The plan includes [X steps] covering code changes, testing, and validation. Should I proceed with step 1?"

## 5. Implementation Guidelines

### Code Changes

- **Follow existing code style** and patterns in the file
- **Add proper TypeScript types** if modifying interfaces
- **Consider performance impact** of your changes
- **Maintain component API contracts**

### Testing Strategy

- **Identify test files** for the modified components
- **Run existing tests** to ensure no regressions
- **Add test cases** for the specific bug scenario if needed
- **Test edge cases** that might be affected

**Communicate implementation completion:**

- "I've implemented the fix in [files]. Here's what changed: [summary]"
- "All existing tests pass, and I've added/updated tests for this scenario."
- "Can you test this fix and confirm it resolves the original issue?"

## 6. Documentation and Communication

### Explain Your Investigation Process

- **How you found the root cause** (search terms, files examined)
- **Why this solution** over alternatives
- **What could prevent similar issues** in the future

### Solution Documentation

- **Clear before/after code** showing the change
- **Explanation of the fix** and why it works
- **Any trade-offs or considerations** for the change

### Create Bug Fix Documentation

**After implementation completion, create comprehensive documentation:**

**Note: Follow the same complexity assessment criteria from Section 4 - only create formal documentation for complex bugs that require it.**

- Create `bugfixing-[bug-topic].docs.md` in the workspace root (e.g., `bugfixing-richselect-concurrent-requests.docs.md`)
- Use kebab-case and keep the filename descriptive but concise
- Include all bug reproduction details from the story
- Summarize the technical fix in bullet points
- **Provide self-contained usage example** (not implementation code) for testing
- **Use proper IDS component imports** from `@iress-oss/ids-components` with `Iress` prefix (e.g., `IressRichSelect`, `IressButton`)
- Format for easy copy-paste to GitHub PR descriptions or CodeSandbox

**Template for bug fix documentation:**

````markdown
# Bug Fix Documentation

## Problem Summary

[What goes wrong]

## Expected Behavior

[What should happen]

## Actual Behavior

[What actually happens]

## How to Test

1. [Step by step instructions]
2. [To reproduce the issue]

## What We Fixed

- [Technical highlight 1 - specific code change]
- [Technical highlight 2 - why this approach]
- [Technical highlight 3 - impact/scope]

## Code Sandbox Snippet

Copy the following snippet to [BEFORE](https://design.wm.iress.com/?path=/docs/introduction--docs) and AFTER to test yourself.

```typescript
// Self-contained usage example demonstrating the fix (NOT implementation code)
import React from 'react';
import { IressComponentName } from '@iress-oss/ids-components';

// Mock data that reproduces the issue
const mockData = {
  // Include necessary test data that would trigger the bug
};

export const FixedExample = () => {
  return (
    <div>
      <h3>Bug Fix Test</h3>
      <IressComponentName
        // Props that previously caused the bug
        {...mockData}
      >
        Content here
      </IressComponentName>

      <div>
        <strong>Test Instructions:</strong>
        <ol>
          <li>[Step by step instructions]</li>
          <li>[To verify the fix works]</li>
        </ol>
      </div>
    </div>
  );
};

// Before fix: [brief description of old behavior]
// After fix: [brief description of new behavior]
```

## Files Modified

- `[file path]` - [description of changes]

## Risk Assessment

- **Change Impact:** [Low/Medium/High]
- **Backward Compatibility:** [Maintained/Breaking]
````

**Communicate documentation creation:**

- "I've created comprehensive bug fix documentation at `bugfixing-[bug-topic].docs.md`"
- "This includes the problem summary, technical fixes, and a self-contained code snippet"
- "You can copy the content directly for the GitHub PR description"

## Example Workflow (Adaptable to Any Bug Type)

### 1. Parse Bug Report

```
Bug: "Component X doesn't work when Y happens"
→ Extract: What is X? What is Y? What should happen vs what actually happens?
→ Identify: Which components/features are involved?
→ Scope: Is this isolated or widespread?
```

### 2. Search Strategy (Adapt Based on Bug Type)

```
# For UI bugs: Search component names, CSS classes, styling keywords
# For functional bugs: Search method names, event handlers, state logic
# For errors: Search exact error messages, stack trace elements
# For data issues: Search API calls, data transformations, type definitions
```

### 3. Locate and Analyze

```
# Read the actual code in located files
# Understand how the problematic flow works
# Identify the exact point where things go wrong
# Look for patterns that might cause the issue
```

### 4. Apply Targeted Fix

```
# Fix the specific problem without over-engineering
# Follow existing code patterns and conventions
# Ensure the fix doesn't break other functionality
# Test the fix addresses the root cause, not just symptoms
```

## Red Flags to Avoid

- **Assuming file locations** without searching
- **Proposing complex solutions** before examining actual code
- **Breaking existing component APIs** unnecessarily
- **Ignoring established codebase patterns**
- **Fixing symptoms instead of root causes**
- **Over-engineering simple problems**
- **Adding complex workarounds** when simple deletion would work

## Success Criteria

- ✅ **Found the exact root cause** through systematic investigation
- ✅ **Applied minimal, targeted fix** that follows existing patterns
- ✅ **Maintained backward compatibility** and component contracts
- ✅ **Provided clear explanation** of the problem and solution
- ✅ **Considered similar cases** and potential side effects
