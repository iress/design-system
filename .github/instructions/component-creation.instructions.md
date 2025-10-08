---
applyTo: 'packages/components/**'
---

# V6 Component Creation Guidelines

These guidelines ensure consistency and quality when creating new components in the design system.

## File Structure Requirements

Each component must include exactly these files:

```
ComponentName/
├── index.ts                          # Exports
├── ComponentName.tsx                 # Main component
├── ComponentName.styles.ts           # Styling (CVA recipe)
├── ComponentName.stories.tsx         # Storybook stories
├── ComponentName.test.tsx            # Tests
└── ComponentName.docs.mdx            # Documentation
└── mocks/                            # (optional) Mock use cases for this component that cannot be represented in stories
```

## Component Implementation (\*.tsx)

### Required Structure

```tsx
import { propagateTestid } from '@helpers/utility/propagateTestid';
import { componentName } from './ComponentName.styles';
import { cx } from '@/styled-system/css';
import { styled } from '@/styled-system/jsx';
import { ReactNode, useMemo } from 'react';
import { IressStyledProps } from '@/types';
import { GlobalCSSClass } from '@/enums';

export interface IressComponentNameProps extends IressStyledProps {
  /**
   * Content of this component.
   */
  children?: ReactNode;

  /**
   * Additional props with detailed JSDoc comments.
   * Include default values, examples, and relationships to other props.
   */
  variant?: 'primary' | 'secondary';

  /**
   * Status of the component.
   * @default 'info'
   */
  status?: 'info' | 'success' | 'warning' | 'danger';
}

export const IressComponentName = ({
  children,
  className,
  variant,
  status = 'info',
  ...restProps
}: IressComponentNameProps) => {
  const classes = componentName({ variant, status });

  return (
    <styled.div
      className={cx(className, classes.root, GlobalCSSClass.ComponentName)}
      {...restProps}
    >
      {children}
    </styled.div>
  );
};
```

### Key Requirements

- **Always use `Iress` prefix** for component names (e.g., `IressAlert`, `IressButton`)
- **Extend existing props** when appropriate (e.g., `IressStyledProps`, `IressUnstyledProps`, `IressTextProps`)
- **Include comprehensive JSDoc comments** with defaults, examples, and relationships
- **Use `cx()` for className composition** to merge custom and component classes
- **Add `GlobalCSSClass` enum** for consistent global CSS class naming
- **Use `propagateTestid()` helper** for nested testids when needed
- **Implement controlled/uncontrolled patterns** with `useControlledState` hook when applicable
- Do not import from `@/main` within the component file itself to ensure tree-shaking. Import from `@/components/ComponentName` instead.

## Styling (\*.styles.ts)

### Required Structure

```typescript
import { sva } from '@/styled-system/css';

export const componentName = sva({
  slots: [
    'root', // Main container
    'icon', // Icon elements
    'content', // Content wrapper
    'footer', // Footer/actions area
  ],
  base: {
    root: {
      display: 'flex',
      flexWrap: 'nowrap',
      gap: 'spacing.200',
      boxSizing: 'border-box',
      borderRadius: 'radius.system.form',
      paddingBlock: 'spacing.200',
      paddingInline: 'spacing.300',
      textStyle: 'typography.body.md',
      border: 'divider',
    },
    icon: {
      lineHeight: 'inherit !important',
    },
    content: {
      marginBlock: 'spacing.000',
      '& > p': {
        marginBlock: 'spacing.000',
      },
    },
    footer: {
      paddingBlockStart: 'spacing.100',
    },
  },
  variants: {
    status: {
      info: {
        root: {
          backgroundColor: 'colour.system.info.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.info.fill',
        },
        icon: {
          color: 'colour.system.info.text',
        },
      },
      success: {
        root: {
          backgroundColor: 'colour.system.success.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.success.fill',
        },
        icon: {
          color: 'colour.system.success.text',
        },
      },
      warning: {
        root: {
          backgroundColor: 'colour.system.warning.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.warning.fill',
        },
        icon: {
          color: 'colour.system.warning.text',
        },
      },
      danger: {
        root: {
          backgroundColor: 'colour.system.danger.surface',
          color: 'colour.neutral.80',
          borderColor: 'colour.system.danger.fill',
        },
        icon: {
          color: 'colour.system.danger.text',
        },
      },
    },
    variant: {
      sidebar: {
        root: {
          borderTopLeftRadius: 'radius.000',
          borderBottomLeftRadius: 'radius.000',
          borderWidth: '[0]',
          borderLeftWidth: '[2.5px]',
          paddingBlock: 'spacing.400',
        },
      },
      compact: {
        root: {
          paddingBlock: 'spacing.100',
          paddingInline: 'spacing.200',
        },
      },
    },
  },
});
```

### Key Requirements

- **Use SVA (Slot Variant Authority)** instead of CVA for complex components with multiple parts, otherwise CVA is acceptable
- **Define clear slot naming** - use semantic names like `root`, `icon`, `content`, `footer`
- **Include comprehensive base styles** - define all default styling
- **Use design tokens** - reference theme values through Panda CSS tokens
- **Support system status colors** - info, success, warning, danger variants
- **Include responsive considerations** - mobile-first approach with breakpoints
- **Use semantic pseudo-selectors** - `_hover`, `_focus`, `_disabled`, etc.
- **Include CSS-in-JS nesting** - leverage nested selectors for child elements
- Do not import from `@/main` within the styles file itself to ensure tree-shaking.

## Stories (\*.stories.tsx)

### Required Structure

```tsx
import { Meta, StoryObj } from '@storybook/react-vite';
import { disableArgTypes } from '@iress-oss/ids-storybook-addon/helpers';
import { STORYBOOK_ONLY_CATEGORY } from '@iress-oss/ids-storybook-addon/constants';
import { IressComponentName, IressStack } from '@/main';

type Story = StoryObj<typeof IressComponentName>;

export default {
  title: 'Components/ComponentName',
  component: IressComponentName,
  tags: ['beta'], // or ['updated'] for mature components
} as Meta<typeof IressComponentName>;

export const Default: Story = {
  args: {
    children: 'This is the default component state',
    status: 'info',
  },
};

export const Status: Story = {
  args: {
    ...Default.args,
  },
  argTypes: {
    ...disableArgTypes(['children', 'status']),
  },
  render: (args) => (
    <IressStack gap="md">
      {(['info', 'success', 'warning', 'danger'] as const).map((status) => (
        <IressComponentName {...args} status={status} key={status}>
          This is a {status} message
        </IressComponentName>
      ))}
    </IressStack>
  ),
};

export const Variant: Story = {
  args: {
    children: 'Component with different variants',
  },
  render: (args) => (
    <IressStack gap="md">
      <IressComponentName {...args} variant="primary" />
      <IressComponentName {...args} variant="secondary" />
    </IressStack>
  ),
};

export const Interactive: Story = {
  args: {
    children: 'Interactive component example',
    onAction: () => {
      console.log('Action triggered');
    },
  },
};
```

### Key Requirements

- **Import from `@storybook/react-vite`** - use the Vite-specific imports
- **Use Storybook helpers** - `disableArgTypes`, `STORYBOOK_ONLY_CATEGORY` for better control
- **Import from `@/main`** - use the main package export for consistency in stories and mock files
- **Always include Default story** - represents the basic component state
- **Create systematic variant stories** - demonstrate all major prop combinations
- **Use render functions** - for complex demonstrations showing multiple states
- **Tag appropriately** - `['beta']` for new components, no tag for mature components, `['updated']` for significant changes
- **Follow naming convention** `Components/ComponentName` for title
- **Include interactive examples** - show event handling and user interactions

## Tests (\*.test.tsx)

### Required Structure

```tsx
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressComponentName, componentName as componentStyles } from '.';
import { GlobalCSSClass } from '@/enums';
import { SYSTEM_VALIDATION_STATUSES } from '@/constants';

describe('IressComponentName', () => {
  describe('Default rendering', () => {
    it('should render the component with the correct content and classes', () => {
      const { getByTestId, getByText } = render(
        <IressComponentName data-testid="test-component" className="test-class">
          Test Content
        </IressComponentName>,
      );

      getByText('Test Content');
      const component = getByTestId('test-component');
      expect(component).toHaveClass(
        componentStyles({ status: 'info' }).root!,
        GlobalCSSClass.ComponentName,
      );
    });

    it('renders with default status', () => {
      const { getByTestId } = render(
        <IressComponentName data-testid="test-component" />,
      );

      const component = getByTestId('test-component');
      expect(component).toHaveClass(
        'bd-c_colour.system.info.fill bg-c_colour.system.info.surface',
      );
    });

    it('renders with the correct data-testids', () => {
      const screen = render(
        <IressComponentName
          data-testid="test-component"
          className="test-class"
          heading="Test Heading"
        >
          Content
        </IressComponentName>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByTestId('test-component__heading')).toBeInTheDocument();
    });
  });

  describe('status variants', () => {
    const statusArr = SYSTEM_VALIDATION_STATUSES.map((status) => [
      status,
      status,
    ]);

    it.each(statusArr)(
      'renders a %s variant when status is set to %s',
      (status) => {
        const { getByTestId } = render(
          <IressComponentName data-testid="test-component" status={status} />,
        );

        const component = getByTestId('test-component');
        expect(component).toHaveClass(
          `bd-c_colour.system.${status}.fill bg-c_colour.system.${status}.surface`,
        );
      },
    );
  });

  describe('interactive behavior', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      const { getByTestId } = render(
        <IressComponentName data-testid="test-component" onClick={handleClick}>
          Clickable
        </IressComponentName>,
      );

      fireEvent.click(getByTestId('test-component'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports controlled state', () => {
      const handleChange = vi.fn();
      const { getByTestId } = render(
        <IressComponentName
          data-testid="test-component"
          value="controlled"
          onChange={handleChange}
        />,
      );

      // Test controlled behavior
      expect(getByTestId('test-component')).toHaveValue('controlled');
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressComponentName>Basic content</IressComponentName>
          <IressComponentName heading="With heading">
            Content with heading
          </IressComponentName>
        </>,
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('supports keyboard navigation', () => {
      const { getByTestId } = render(
        <IressComponentName data-testid="test-component" tabIndex={0}>
          Focusable content
        </IressComponentName>,
      );

      const component = getByTestId('test-component');
      component.focus();
      expect(component).toHaveFocus();
    });
  });
});
```

### Key Requirements

- **Import from testing library** - use `render`, `screen`, `fireEvent`, `userEvent`
- **Always include accessibility test** - use `axe` for a11y validation
- **Test component behavior** - verify props, state, and interactions work correctly
- **Use `describe` blocks** - organize tests by functionality (rendering, behavior, accessibility)
- **Verify CSS classes** - test that styling variants are applied correctly
- **Test data-testids** - ensure testid propagation works for nested elements
- **Include parametrized tests** - use `it.each()` for testing multiple variants
- **Test interactive behavior** - verify event handlers, controlled/uncontrolled state
- **Mock functions with vi.fn()** - use Vitest mocking for event handlers
- **Test edge cases** - empty states, loading states, error conditions

## Documentation (\*.docs.mdx)

### Required Structure

```mdx
import { Meta } from '@storybook/addon-docs/blocks';
import {
  ComponentOverview,
  ComponentExample,
} from '@iress-oss/ids-storybook-addon/components';
import * as ComponentStories from './ComponentName.stories';

<Meta of={ComponentStories} />

# ComponentName

<ComponentOverview
  description="A clear, concise description that explains the purpose and use cases of this component. Focus on when and why developers should use it."
  story={ComponentStories.Default}
  stories={ComponentStories}
/>

## Examples

### Status Variants

Explanation of the different status variants and their appropriate use cases. Be specific about when to use each variant.

<ComponentExample story={ComponentStories.Status} stories={ComponentStories} />

### Interactive Behavior

Description of how users can interact with the component, including any keyboard shortcuts or accessibility features.

<ComponentExample
  story={ComponentStories.Interactive}
  stories={ComponentStories}
/>

### Variants

Explain the different visual or behavioral variants available and their intended contexts.

<ComponentExample story={ComponentStories.Variant} stories={ComponentStories} />

### Advanced Usage

Show more complex usage patterns, including integration with forms, other components, or specific business logic.

<ComponentExample
  story={ComponentStories.Advanced}
  stories={ComponentStories}
/>
```

### Key Requirements

- **Include ComponentOverview** - provides component description and default story
- **Don't include ComponentApi** - this is auto-generated and not needed in all components
- **Include detailed Examples section** - demonstrate all major use cases with context
- **Write descriptive section headers** - explain what each example demonstrates
- **Provide usage guidance** - explain when and how to use each variant
- **Include accessibility notes** - document keyboard interactions and screen reader behavior
- **Reference story objects** - link to actual stories for consistency
- **Use semantic organization** - group related functionality together

## Exports (index.ts)

### Required Structure

```typescript
export * from './ComponentName.styles';
export * from './ComponentName';
```

### Key Requirements

- **Export styles first** - allows consumers to import CVA recipe independently
- **Export component second** - makes component available for import
- **Use wildcard exports** - exports all named exports from each file

## Naming Conventions

### File Names

- **PascalCase for files**: `RichSelect.tsx`, `Button.stories.tsx`
- **Match component name**: File names should match the component name exactly

### Component Names

- **Always use `Iress` prefix**: `IressButton`, `IressRichSelect`, `IressTable`
- **PascalCase**: Each word capitalized, no spaces or hyphens

### Style Recipe Names

- **camelCase**: `button`, `richSelect`, `dataTable`
- **Descriptive**: Name should clearly indicate what it styles

### Story Names

- **PascalCase**: `Default`, `WithIcon`, `Loading`
- **Descriptive**: Name should explain the scenario being demonstrated

## Common Patterns and Best Practices

### Component Structure

- **Use functional components** - with destructured props and explicit logic
- **Support composition** - allow children and flexible content
- **Extend appropriate base props** - `IressTextProps`, `IressHTMLProps`, etc.
- **Include TypeScript interfaces** - export interfaces for external use
- **Use controlled/uncontrolled patterns** - with `useControlledState` hook
- **Implement proper event handling** - with TypeScript-safe event types
- **Add helper utilities** - like `propagateTestid` for nested elements

### Styling Approach

- **Use SVA for complex components** - with multiple slots/parts
- **Mobile-first responsive design** - start with mobile styles
- **Use design tokens** - reference theme values through Panda CSS (`colour.*`, `spacing.*`, etc.)
- **Semantic slot naming** - `root`, `icon`, `content`, `footer` for clarity
- **Include system status support** - info, success, warning, danger variants
- **Leverage CSS-in-JS features** - nesting, pseudo-selectors, conditional styles

### Testing Strategy

- **Test behavior, not implementation** - focus on user interactions
- **Include edge cases** - test empty states, loading states, error states
- **Verify accessibility** - ensure keyboard navigation and screen reader support
- **Mock external dependencies** - isolate component behavior

### Documentation Standards

- **Clear component purpose** - explain what the component does
- **Usage examples** - show how to implement common patterns
- **Props documentation** - describe all available options
- **Accessibility notes** - explain keyboard interactions and ARIA support

## Quality Checklist

Before considering a v6 component complete:

### ✅ Implementation

- [ ] Component follows naming conventions (`Iress` prefix)
- [ ] Extends appropriate base props (`IressStyledProps` etc.)
- [ ] Uses functional component with destructured props
- [ ] Includes comprehensive TypeScript interfaces
- [ ] Supports children/content composition
- [ ] Implements controlled/uncontrolled patterns where applicable
- [ ] Uses helper utilities (`propagateTestid`, `cx`, etc.)
- [ ] No direct imports from `@/main` in component file

### ✅ Styling

- [ ] Uses SVA (Slot Variant Authority) for complex components
- [ ] Follows design token conventions (`colour.*`, `spacing.*`, etc.)
- [ ] Supports responsive design with mobile-first approach
- [ ] Includes system status variants (info, success, warning, danger)
- [ ] Uses semantic slot names (`root`, `icon`, `content`, etc.)
- [ ] Base styles are comprehensive and well-defined
- [ ] No direct imports from `@/main` in styling file

### ✅ Stories

- [ ] Includes `Default` story showing basic usage
- [ ] Demonstrates key variants systematically (Status, Variant, etc.)
- [ ] Uses Storybook helpers (`disableArgTypes`, `STORYBOOK_ONLY_CATEGORY`)
- [ ] Imports from `@storybook/react-vite` and `@/main`
- [ ] Properly tagged (`beta`/`updated`) based on maturity
- [ ] Uses render functions for complex multi-state demonstrations

### ✅ Testing

- [ ] Default rendering tests with content and class verification
- [ ] Accessibility tests with `axe` validation
- [ ] Systematic variant testing using `it.each()` patterns
- [ ] Interactive behavior testing (clicks, state changes, etc.)
- [ ] CSS class verification for all variants
- [ ] Testid propagation verification for nested elements
- [ ] Edge cases and error conditions covered

### ✅ Documentation

- [ ] Clear component description with use case guidance
- [ ] Comprehensive examples with context and usage notes
- [ ] Semantic organization by functionality
- [ ] Accessibility considerations documented
- [ ] Integration patterns and advanced usage shown
- [ ] Links to related components where appropriate

### ✅ Files

- [ ] All 6 required files present
- [ ] Consistent naming across files
- [ ] Proper imports/exports
- [ ] No missing dependencies
- [ ] Follows file organization principles

## Error Prevention

### Common Mistakes to Avoid

- **Missing `Iress` prefix** - All components must be prefixed
- **Using `styled()` wrapper** - Use functional components with explicit logic instead
- **Using CVA for complex components** - Use SVA when you have multiple slots/parts
- **Incomplete TypeScript interfaces** - All props must be properly typed with JSDoc
- **Missing accessibility tests** - All components must pass a11y validation with `axe`
- **Inconsistent import patterns** - Import from `@/main`, use `@storybook/react-vite`
- **Missing helper utilities** - Use `cx()`, `propagateTestid()`, etc. appropriately
- **Inadequate test coverage** - Test variants, interactions, and edge cases systematically

### Template Validation

When creating components, ensure:

- All template placeholders are replaced with actual names
- No `{{ variable }}` syntax remains in final code
- Component names are consistent across all files
- Import paths are correct for the specific component
- Story titles match the component hierarchy

This ensures consistency across the design system and provides a reliable foundation for component development.
