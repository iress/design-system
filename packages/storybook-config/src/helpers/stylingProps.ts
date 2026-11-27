import type { ArgTypes } from '@storybook/react-vite';

/**
 * These are common styling props used across multiple components.
 * They are pulled from `IressCSSProps`.
 */
const PROPS = [
  'alignSelf',
  'bg',
  'color',
  'borderRadius',
  'flex',
  'focusable',
  'hideBelow',
  'hideFrom',
  'layerStyle',
  'maxWidth',
  'm',
  'mt',
  'mr',
  'mb',
  'ml',
  'mx',
  'my',
  'noGutter',
  'p',
  'pt',
  'pr',
  'pb',
  'pl',
  'px',
  'py',
  'scrollable',
  'srOnly',
  'stretch',
  'textAlign',
  'textStyle',
  'width',
] as const;

/**
 * ArgType configurations for common styling props.
 * This groups them under the "Styling props" category in Storybook.
 */
export const stylingProps = {
  stylingProps: {
    name: 'Show styling props',
    description:
      'Enable to view all styling props you can use to customise this component.',
    control: 'boolean',
    table: { category: 'Advanced' },
  },
  ...Object.fromEntries(
    PROPS.map((prop) => [
      prop,
      {
        if: { arg: 'stylingProps' },
        table: { category: 'Advanced', subcategory: 'Styling props' },
      },
    ]),
  ),
};

export const omitStylingProps = (omit: (typeof PROPS)[number][]) => {
  return Object.fromEntries(
    PROPS.filter((prop) => !omit.includes(prop)).map((prop) => [
      prop,
      {
        if: { arg: 'stylingProps' },
        table: { category: 'Advanced', subcategory: 'Styling props' },
      },
    ]),
  );
};

/**
 * ArgType configuration for ReactNode props.
 * Displays as 'ReactNode' instead of the verbose union type.
 */
export const reactNodeArgType: ArgTypes[string] = {
  table: {
    type: { summary: 'ReactNode' },
  },
};

/**
 * ArgType configuration for ReactElement props.
 * Displays as 'ReactElement' instead of the full generic type.
 */
export const reactElementArgType: ArgTypes[string] = {
  table: {
    type: { summary: 'ReactElement' },
  },
};

/**
 * ArgType configuration for JSX.Element props.
 * Displays as 'JSX.Element' instead of the full type definition.
 */
export const jsxElementArgType: ArgTypes[string] = {
  table: {
    type: { summary: 'JSX.Element' },
  },
};

/**
 * ArgType configuration for React component props (functional or class components).
 * Displays as 'ComponentType' instead of the full generic union.
 */
export const componentTypeArgType: ArgTypes[string] = {
  table: {
    type: { summary: 'ComponentType' },
  },
};

/**
 * Helper function to create custom type summaries for complex types.
 * Useful for custom union types or generic types that need simplification.
 *
 * @example
 * ```tsx
 * argTypes: {
 *   value: customTypeArgType('string | number | Date'),
 * }
 * ```
 */
export const customTypeArgType = (typeSummary: string): ArgTypes[string] => ({
  table: {
    type: { summary: typeSummary },
  },
});

/**
 * Args that are Storybook-internal and should be hidden from controls and generated source.
 * These are typically workarounds for rendering in the Storybook iframe (e.g., `container: document.body`).
 *
 * Spread into `argTypes` at the meta level:
 * ```tsx
 * argTypes: { ...stylingProps, ...internalArgs }
 * ```
 */
export const internalArgs: ArgTypes = {
  container: { table: { disable: true } },
  popoverProps: { table: { disable: true } },
};
