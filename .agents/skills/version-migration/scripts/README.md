# Migration Scripts

Automated scripts to help with IDS v6 migration.

## Usage

Run from your project root (where `package.json` is located):

```bash
# 1. Detect current version and migration path
.agents/skills/version-migration/scripts/detect-version.sh

# 2. Audit component usage
.agents/skills/version-migration/scripts/audit-components.sh

# 3. Find deprecated props
.agents/skills/version-migration/scripts/find-deprecated-props.sh

# 4. Find Formik forms
.agents/skills/version-migration/scripts/find-formik.sh

# 5. Find old test utilities
.agents/skills/version-migration/scripts/find-test-utils.sh

# 6. Validate migration (run after migration)
.agents/skills/version-migration/scripts/validate-migration.sh
```

## Scripts

### `detect-version.sh`
Detects current IDS/OUI version in package.json and recommends migration path.

**Output**: Version detection, migration path, complexity estimate

### `audit-components.sh`
Scans codebase for IDS/OUI component usage and generates usage report.

**Output**: Component usage counts, high-effort migration areas

### `find-deprecated-props.sh`
Searches for deprecated/renamed props that will break in v6.

**Output**: List of deprecated props with file locations and replacement guidance

### `find-formik.sh`
Identifies Formik forms and Yup schemas needing migration to React Hook Form.

**Output**: Formik file count, Yup schema count, migration scope

### `find-test-utils.sh`
Finds old IDS v4 test utilities (`idsFireEvent`, `mockLazyLoadedComponents`, etc.).

**Output**: Old test patterns with file locations and replacement guidance

### `validate-migration.sh`
Runs post-migration validation checks.

**Output**: Pass/fail report with errors and warnings

**Exit codes**:
- `0`: All checks passed (or warnings only)
- `1`: Validation failed with errors

### `setup-playwright-vrt.sh`
Generates Playwright visual regression test suite for migration.

**Output**: 
- `playwright.config.ts` configuration
- `e2e/components.spec.ts` test suite
- Setup instructions

**Usage**: Run before migration to set up VRT, then capture baselines

## Requirements

- Bash 4.0+
- Standard Unix tools: `grep`, `wc`, `sed`
- Run from project root directory

## Notes

- Scripts search the `src/` directory by default
- All scripts are safe to run (read-only, no modifications)
- False positives may occur — review results manually
