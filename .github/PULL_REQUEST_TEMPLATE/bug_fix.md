name: Bug Fix Template
description: Template for bug fixes that may affect multiple branches
title: "Fix: [Brief description of the bug]"
labels: ["bug", "needs-cross-branch-check"]
body:

- type: markdown
  attributes:
  value: | ## Bug Fix Details
  Use this template when fixing bugs that may need to be addressed in both 5.x and main branches.

- type: dropdown
  id: affected-branches
  attributes:
  label: Affected Branch(es)
  description: Which branch(es) does this bug affect?
  multiple: true
  options: - 5.x branch - main branch - Both branches - Unknown (needs investigation)
  validations:
  required: true

- type: input
  id: issue-reference
  attributes:
  label: Related Issue
  description: Link to the issue this PR fixes (e.g., #123)
  placeholder: "#123"

- type: textarea
  id: bug-description
  attributes:
  label: Bug Description
  description: What is the bug being fixed?
  placeholder: |
  Brief description of what's broken...
  validations:
  required: true

- type: textarea
  id: root-cause
  attributes:
  label: Root Cause
  description: What caused this bug?
  placeholder: |
  Explanation of the root cause...
  validations:
  required: true

- type: textarea
  id: solution
  attributes:
  label: Solution
  description: How does this PR fix the bug?
  placeholder: |
  Description of the fix...
  validations:
  required: true

- type: textarea
  id: testing
  attributes:
  label: Testing
  description: How was this fix tested?
  placeholder: | - [ ] Existing tests pass - [ ] Added new test for bug scenario - [ ] Manually tested in Storybook
  validations:
  required: true

- type: checkboxes
  id: cross-branch-checklist
  attributes:
  label: Cross-Branch Checklist
  description: If this bug affects both branches, ensure both are addressed
  options: - label: I verified if this bug exists in the 5.x branch - label: I verified if this bug exists in the main branch - label: If needed, I created a corresponding PR for the other branch - label: Both PRs are linked to the same issue - label: I documented any version-specific differences

- type: textarea
  id: branch-differences
  attributes:
  label: Branch-Specific Differences (if any)
  description: Document any differences in how the bug manifests or how it's fixed between branches
  placeholder: |
  Example: The fix required different approach on 5.x due to older React version...

- type: textarea
  id: related-prs
  attributes:
  label: Related PRs
  description: Link to the corresponding PR for the other branch (if applicable)
  placeholder: | - 5.x PR: #XXX - main PR: #YYY
