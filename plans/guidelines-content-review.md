# Guidelines Content Review

Reviewed: 2026-06-16

## Overall Verdict

The content is well-structured, clear, and genuinely useful. Most pages follow a consistent template and provide actionable guidance for their audience.

---

## Comprehensive Page Assessment

### Rating key

| Rating | Meaning |
|--------|---------|
| ⭐⭐⭐ | Highly useful — would actively help someone get work done |
| ⭐⭐ | Moderately useful — provides context but won't unblock someone |
| ⭐ | Needs improvement — too thin, abstract, or reliant on embeds |

### Consistency check key

| Symbol | Meaning |
|--------|---------|
| ✅ | Follows the standard template (Design → Develop → Specifications) |
| ⚠️ | Partially follows template (missing a section or has structural differences) |
| ❌ | Does not follow standard template |

---

### Get Started

| Page | Rating | Template | Useful? | Issues |
|------|--------|----------|---------|--------|
| Develop | ⭐⭐ | ❌ (setup guide) | Clear 4-step setup, but no next steps (testing, tree-shaking) | N/A — appropriately brief |
| Design | ⭐ | ❌ (setup guide) | Just 3 bullets. Intro paragraph is copied from Develop page (says "build React applications") | **Bug**: wrong intro copy |
| AI | ⭐⭐⭐ | ❌ (reference) | Complete skill listing with install commands for every agent | Could add usage examples |
| FAQ | ⭐⭐ | ❌ (Q&A) | Only 7 questions. Missing testing, bundle size, style overrides | Needs expansion |
| Versions | ⭐⭐ | ❌ (reference) | Useful links but could be a section elsewhere | No changelog/release notes links |
| CSP | ⭐⭐⭐ | ❌ (guide) | Complete, specific, excellent troubleshooting table | None |
| Contact | ⭐ | ❌ (contact) | Only one channel listed (GitHub Issues). "APE team" unexplained | Very sparse |

---

### Foundations

| Page | Rating | Template | Useful? | Issues |
|------|--------|----------|---------|--------|
| Overview | ⭐⭐⭐ | ❌ (overview) | Excellent orientation — explains why, who, how | None |
| Principles | ⭐⭐ | ❌ (guide) | Correct but generic. No IDS-specific examples | Needs concrete component links |
| Accessibility | ⭐ | ❌ (guide) | ~40 lines, checklist-style. Doesn't distinguish what IDS handles vs what app must do | Shallow; no testing guidance |
| Visual Design Standards | ⭐⭐⭐ | ❌ (guide) | Explains *why* behind token choices. Comprehensive tables | None |
| Using Components Consistently | ⭐⭐⭐ | ❌ (guide) | Concise rules per category with links | None |
| Responsive Layout | ⭐⭐⭐ | ❌ (guide) | Good dev section (hooks, constants). Designer tips practical | None |
| Iconography | ⭐⭐⭐ | ❌ (guide) | Microcopy guidance + icon library setup + migration table | Icon settings reference "see Storybook" without values |
| Z-index | ⭐⭐ | ❌ (reference) | Useful but 100% dependent on StoryEmbed | No fallback text content |
| User Experience | ⭐ | ❌ (guide) | Generic UX heuristics with no IDS-specific examples or links | Needs concrete component mapping |
| Common Mistakes | ⭐⭐⭐ | ❌ (guide) | Best onboarding page. Code diffs, clear before/after | None |

---

### Tokens

| Page | Rating | Template | Useful? | Issues |
|------|--------|----------|---------|--------|
| Overview | ⭐ | ❌ (overview) | Only 5 lines + StoryEmbed. No mental model explanation | Too thin; needs "when to use which method" |
| Colour | ⭐⭐⭐ | ⚠️ (Design/Develop) | Three usage methods shown clearly with code | None |
| Spacing | ⭐⭐⭐ | ⚠️ (Design/Develop) | Clear scale, responsive example, aliases explained | None |
| Radius | ⭐⭐⭐ | ⚠️ (Design/Develop) | Good "most components have this built in" caveat | None |
| Typography | ⭐⭐⭐ | ⚠️ (Design/Develop) | "Always use IressText" recommendation is practical | None |

---

### Styling Props

| Page | Rating | Template | Useful? | Issues |
|------|--------|----------|---------|--------|
| Overview | ⭐⭐⭐ | ❌ (reference) | Comprehensive reference + best practices | Long (10KB); migration content should be in /migration |
| Spacing | ⭐⭐⭐ | ❌ (reference) | Clear prop listing, responsive examples, v5 migration diff | None |
| Colour | ⭐⭐⭐ | ❌ (reference) | Token examples well-organised | None |
| Typography | ⭐⭐⭐ | ❌ (reference) | Clear prop mapping | None |
| Layout | ⭐⭐⭐ | ❌ (reference) | Practical | None |
| Radius | ⭐⭐ | ❌ (reference) | Short but sufficient | None |
| Sizing | ⭐⭐⭐ | ❌ (reference) | Clear | None |
| Accessibility | ⭐⭐⭐ | ❌ (reference) | Clear | None |

---

### Components

| Page | Rating | Template | Useful? | Consistency Issues |
|------|--------|----------|---------|-------------------|
| Overview | ⭐⭐⭐ | ❌ (overview) | Great categorisation table + "Choosing a component" guide | None |
| Alert | ⭐⭐⭐ | ✅ | Full template. Excellent ARIA role table, testing section with gotchas | Storybook link button missing `mode="secondary"` on some |
| Autocomplete | ⭐⭐⭐ | ✅ | Comprehensive. Testing section with MSW example is excellent | None |
| Button | ⭐⭐⭐ | ✅ | Disabled alternatives table is standout. Complete | None |
| ButtonGroup | ⭐⭐⭐ | ✅ | Clear use cases, good accessibility section | Shorter Specifications than peers |
| Card | ⭐⭐⭐ | ✅ | Good. All sections present | None |
| Checkbox | ⭐⭐⭐ | ✅ | Thorough — variants, testing gotchas, WCAG refs | Has duplicate "Storybook" section in Specifications |
| CheckboxGroup | ⭐⭐⭐ | ✅ | Complete, with table integration example | Has duplicate "Storybook" section in Specifications |
| Col | ⭐⭐ | ⚠️ | Missing Do's/Don'ts. Specifications section is just one sentence + embed | Spec section inconsistent with other pages |
| Container | ⭐⭐ | ⚠️ | Thin. No Do's/Don'ts table. Specs section is one sentence | Spec section inconsistent |
| Divider | ⭐⭐⭐ | ✅ | Complete despite being simple | Has duplicate "Storybook" section |
| Expander | ⭐⭐⭐ | ✅ | Good. W3 ARIA pattern references | None |
| Field | ⭐⭐⭐ | ✅ | Comprehensive — all layout variants documented | None |
| FieldGroup | ⭐⭐⭐ | ✅ | Clear, appropriate scope | None |
| Hide | ⭐⭐⭐ | ✅ | Good. Breakpoint table embed is practical | None |
| Icon | ⭐⭐⭐ | ✅ | Very thorough — installation, migration, Font Awesome deprecation | Long (10KB) but justifiably so |
| Image | ⭐⭐ | ✅ | Complete but minimal usage examples | Has duplicate "Storybook" section |
| Inline | ⭐⭐ | ⚠️ | Missing Do's/Don'ts. Specs section is one sentence | Spec section inconsistent with other pages |
| Input | ⭐⭐⭐ | ✅ | Comprehensive — all types, modes, formatting | None |
| InputCurrency | ⭐⭐⭐ | ✅ | ISO-4217 reference, locale examples, table recipe | Has duplicate "Storybook" section |
| Label | ⭐⭐⭐ | ✅ | Complete, clear scope definition | None |
| Link | ⭐⭐⭐ | ✅ | Good. `href` vs no-`href` rendering explained clearly | Has duplicate "Storybook" section |
| Menu | ⭐⭐⭐ | ✅ | Very comprehensive — roles, variants, groups, subitems | None |
| Modal | ⭐⭐⭐ | ✅ | "Use a page instead" guidance is unique and valuable | None |
| Panel | ⭐⭐ | ⚠️ | Very thin (1.8KB). No Do's/Don'ts, minimal Specs | Missing sections vs template |
| Pill | ⭐⭐ | ⚠️ | Clear but short. No Testing section or Specifications keyboard table | Missing Keyboard interaction section |
| Placeholder | ⭐⭐ | ⚠️ | Appropriate for a dev-only component | No Specifications keyboard/a11y section |
| Popover | ⭐⭐⭐ | ✅ | Excellent "Use instead" table at the top | None |
| Progress | ⭐⭐⭐ | ✅ | "Prefer IressLoading" callout is good. Complete | Has duplicate "Storybook" section |
| Provider | ⭐⭐ | ⚠️ | Appropriate scope but no Specifications a11y/keyboard section | Missing Specifications detail |
| Radio | ⭐⭐⭐ | ✅ | Complete. Testing gotchas are practical | None |
| RadioGroup | ⭐⭐⭐ | ✅ | Complete with layout options and testing disambiguation | Shorter Specifications than peers |
| Readonly | ⭐⭐⭐ | ✅ | Complete. Locked variant well-explained | Has duplicate "Storybook" section |
| Row | ⭐⭐ | ⚠️ | Missing Do's/Don'ts. Specs section is one sentence | Spec section inconsistent |
| Select | ⭐⭐⭐ | ✅ | Very comprehensive. All variants covered | None |
| Skeleton | ⭐⭐⭐ | ✅ | "Prefer IressLoading" callout. Complete | None |
| SkipLink | ⭐⭐ | ✅ | Clear but brief (appropriate for a simple component) | None |
| Slider | ⭐⭐⭐ | ✅ | Complete. Testing note about `fireEvent` vs `userEvent` is practical | None |
| Slideout | ⭐⭐⭐ | ✅ | "Use a page instead" guidance matches Modal. Complete | None |
| Spinner | ⭐⭐⭐ | ✅ | "Prefer IressLoading" callout. Complete | None |
| Stack | ⭐⭐ | ⚠️ | Missing Do's/Don'ts. Specs section is one sentence | Spec section inconsistent with other pages |
| Styled | ⭐⭐ | ⚠️ | Clear usage but no Specifications section at all | Missing Specifications |
| TabSet | ⭐⭐⭐ | ✅ | Complete. Good keyboard interaction table | None |
| Table | ⭐⭐⭐ | ✅ | Very comprehensive (8KB). All features documented | None |
| Tag | ⭐⭐⭐ | ✅ | Complete. Test ID table is helpful | Has duplicate "Storybook" section |
| TagInput | ⭐⭐ | ⚠️ | Short. No StoryEmbed examples beyond quick start. No Behaviour table | Missing sections vs template |
| Text | ⭐⭐⭐ | ✅ | Redundant textStyle warning is valuable | Has duplicate "Storybook" section |
| Toaster | ⭐⭐⭐ | ✅ | Complete. Testing gotchas with async patterns | None |
| Toggle | ⭐⭐⭐ | ✅ | Clear. "Don't use in forms" guidance is helpful | None |
| Tooltip | ⭐⭐⭐ | ✅ | Complete. WCAG 1.4.13 reference is good | None |
| ValidationMessage | ⭐⭐⭐ | ✅ | Clear. ValidationSummary included | None |

---

### Patterns

| Page | Rating | Template | Useful? | Consistency Issues |
|------|--------|----------|---------|-------------------|
| Overview | ⭐⭐ | ❌ (overview) | "Explore" tab is 100% StoryEmbed. "What are patterns?" tab is excellent | No fallback text in Explore tab |
| Breadcrumbs | ⭐⭐⭐ | ✅ | Complete. Routing integration examples for Next.js + React Router | None |
| Contextual Menu | ⭐⭐⭐ | ✅ | Complete. Clear scope boundaries | None |
| Dropdown Menu | ⭐⭐⭐ | ✅ | Very comprehensive. All variants covered | None |
| Feedback | ⭐⭐⭐ | ⚠️ (decision guide) | Excellent decision table. Quick reference at bottom | No Develop/Specifications sections (appropriate) |
| Form | ⭐⭐⭐ | ✅ | Most comprehensive page (29KB). State management diff is excellent | Very long — needs TL;DR at top |
| Loading | ⭐⭐⭐ | ✅ | Timing breakdown is standout. Complete | None |
| Search & Selection | ⭐⭐⭐ | ⚠️ (decision guide) | Comparison table is the best decision guide in the docs | No Specifications (appropriate — it's a guide) |
| Shadow | ⭐⭐⭐ | ✅ | AI mistake callout is unique and helpful | None |
| Side Nav | ⭐⭐⭐ | ✅ | Complete. Routing integration examples | None |

---

### Migration

| Page | Rating | Template | Useful? | Issues |
|------|--------|----------|---------|--------|
| v4 to v5 | ⭐⭐⭐ | ❌ (migration) | Step-by-step with diffs | No effort estimate |
| v5 to v6 | ⭐⭐⭐ | ❌ (migration) | Very comprehensive (42KB). All breaking changes covered | Very long; no effort estimate or summary |
| OUI to v6 | ⭐⭐⭐ | ❌ (migration) | Complete transformation guide | No effort estimate |

---

## Consistency Analysis

### Template adherence

- **38 of 51 component pages** follow the full Design → Develop → Specifications template ✅
- **13 pages** have structural gaps (mostly layout primitives and utility components)

### Specific consistency issues

| Issue | Affected pages | Severity |
|-------|---------------|----------|
| **Specifications section is just one sentence** (no behaviour table, no a11y, no keyboard) | Container, Row, Col, Stack, Inline, Styled | Medium — these are simple but peers (Divider, Hide) still provide full specs |
| **Duplicate "Storybook" sections** within Specifications | Checkbox, CheckboxGroup, Divider, Image, InputCurrency, Link, Progress, Readonly, Tag, Text | Low — redundant "View in Storybook" button appears twice |
| **Storybook link button styling inconsistency** | Alert uses `href` without `mode`, most others use `mode="secondary"` with `href` | Low — visual inconsistency |
| **Do's and Don'ts table missing** | Col, Container, Row, Stack, Inline, Panel | Medium — these components could benefit from guidance |
| **Testing section missing** | Styled | Low — utility component, less critical |
| **TagInput page is underdeveloped** | TagInput | Medium — no live examples beyond Quick Start, missing Behaviour table |

### Content quality patterns

| Pattern | Observation |
|---------|-------------|
| **Decision guide pages** (Feedback, Search & Selection) | Consistently excellent — clear criteria tables, quick reference lists |
| **Form input components** (Input, Select, Checkbox, Radio, etc.) | Consistently thorough — all have testing sections with gotchas |
| **Layout primitives** (Stack, Inline, Row, Col, Container) | Consistently thin — minimal guidance, one-sentence Specifications |
| **Overlay components** (Modal, Slideout, Popover) | Consistently excellent — "when to use a page instead" guidance |
| **Loading-related** (Skeleton, Spinner, Progress) | Consistently good — all reference the Loading pattern appropriately |

---

## Recommendations (prioritised)

1. **Fix the Design page intro copy** — says "build React applications", should describe Figma setup
2. **Add Specifications sections to layout primitives** (Container, Row, Col, Stack, Inline, Styled) — even a brief behaviour/a11y table for consistency
3. **Remove duplicate "Storybook" sections** from ~10 component pages — appears twice in Specifications
4. **Add Do's and Don'ts to layout primitives** — e.g. "Don't use Stack for horizontal layout", "Don't use Col outside a Row"
5. **Expand TagInput page** — add StoryEmbed examples and a Behaviour table to match peers
6. **Expand Accessibility foundation page** — add "what IDS handles vs what you handle" table, testing tools
7. **Expand Tokens Overview** — explain when to use props vs CSS vars vs `cssVars`
8. **Add TL;DR to Form pattern** — "short ≤8 fields validate on submit; long >8 validate on blur"
9. **Add fallback text to StoryEmbed-heavy pages** (Patterns Overview Explore tab, Tokens Overview, Z-index)
10. **Link User Experience heuristics to IDS components** — each principle should reference the components that implement it
11. **Add effort estimates to migration guides** — even t-shirt sizing
12. **Expand FAQ** — add testing, bundle size, style overrides, SSR, contributing questions
13. **Move migration content from Styling Props overview** to the migration section
14. **Standardise Storybook button styling** — always use `mode="secondary"` consistently
