---
applyTo: '**'
---

# File Organization Principles

## Implementation Files (.ts/.tsx)

Organize implementation files in this order for better readability and maintainability:

```typescript
// 1. Imports (external dependencies first, then internal)
import { externalLib } from 'external-package';
import { internalUtil } from '../utils';

// 2. Types and Interfaces (public API)
export interface PublicData {
  // Public types that consumers need
}

type InternalType = {
  // Internal types for implementation
};

// 3. Constants and Configuration
const CONFIG_VALUE = 'constant';
const REGEX_PATTERN = /pattern/;

// 4. Helper Functions (private implementation details)
const helperFunction = () => {
  // Internal utility functions
};

// 5. Main Exported Functions (primary public API)
export const mainFunction = () => {
  // Primary public functions
};
```

**Key Principles:**

- **Public types first** - What consumers need to import/use
- **Constants grouped together** - Configuration and static values
- **Helper functions grouped together** - Private implementation details
- **Main exports last** - Primary public API
- **Separate concerns** - Clear boundaries between public and private code

## Test Files (.test.ts/.test.tsx)

Organize test files in this order for clarity and proper setup:

```typescript
// 1. Imports
import { describe, it, expect, vi } from 'vitest';
import { functionToTest, type TypeToTest } from './moduleToTest';

// 2. Mocks (global setup that affects module loading)
vi.mock('external-dependency', () => ({
  // Mock implementation
}));

// 3. Constants and Test Data
const TEST_DATA = {
  // Static test data
};

const EXPECTED_VALUES = ['value1', 'value2'];

// 4. Helper Functions (test utilities)
const createTestInstance = () => {
  // Test setup helpers
};

const validateStructure = (item: TypeToTest) => {
  // Validation helpers
};

// 5. Test Suites (actual test execution)
describe('functionToTest', () => {
  // Test cases
});
```

**Key Principles:**

- **Mocks immediately after imports** - They're hoisted anyway and affect module loading
- **Constants before helpers** - Static configuration before dynamic utilities
- **Helper functions before tests** - Setup utilities before test execution
- **Test suites last** - Actual test execution comes after all setup

## Why This Order Matters

### Implementation Files

- **Types first** - Consumers can quickly see the public API
- **Configuration visible** - Constants and config are easy to find
- **Implementation details grouped** - Helper functions don't clutter the main API
- **Main API prominent** - Primary exports are clearly identified at the bottom

### Test Files

- **Mocks early** - Clear what external dependencies are being mocked
- **Setup before execution** - All configuration and utilities defined before tests
- **Logical flow** - From module setup → test data → test utilities → test execution
- **Easier debugging** - Mock and helper definitions are easy to locate

## Examples of Good Organization

**Implementation File:**

```typescript
// ✅ Good: Clear separation of concerns
export interface UserData { ... }          // Public API
const API_ENDPOINT = '/api/users';          // Configuration
const validateUser = (user) => { ... };    // Helper
export const fetchUsers = () => { ... };   // Main export
```

**Test File:**

```typescript
// ✅ Good: Logical flow from setup to execution
import { fetchUsers } from './users';       // Imports
vi.mock('./api', () => ({ ... }));         // Mocks
const MOCK_USERS = [{ ... }];              // Test data
const createMockUser = () => ({ ... });    // Helpers
describe('fetchUsers', () => { ... });     // Tests
```

## Common Anti-patterns to Avoid

### Implementation Files

```typescript
// ❌ Bad: Mixed organization
export const mainFunction = () => { ... };  // Main export at top
const CONSTANT = 'value';                   // Constants scattered
export interface Data { ... }               // Types mixed in
const helper = () => { ... };              // Helpers anywhere
```

### Test Files

```typescript
// ❌ Bad: Disorganized setup
describe('tests', () => { ... });          // Tests before setup
const TEST_DATA = { ... };                 // Constants after tests
vi.mock('module', () => ({ ... }));        // Mocks at bottom
const helper = () => { ... };              // Helpers scattered
```

## Benefits of Consistent Organization

1. **Faster Code Reviews** - Reviewers know where to find specific types of code
2. **Better Onboarding** - New developers can quickly understand file structure
3. **Easier Debugging** - Logical flow makes it easier to trace issues
4. **Improved Maintainability** - Clear separation of concerns reduces coupling
5. **Enhanced Readability** - Consistent patterns across the codebase
