import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectMenuItemProps } from './SelectMenu';
import { IressSelectMenuItem } from './SelectMenuItem';
import { css } from '@/styled-system/css';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Option 1';

function renderComponent(
  {
    'data-testid': dataTestId = TEST_ID,
    label = TEST_LABEL,
    ...props
  }: Omit<IressSelectMenuItemProps, 'label'> & { label?: string },
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressSelectMenuItem {...props} label={label} data-testid={dataTestId} />,
  );
}

describe('IressSelectMenuItem', () => {
  describe('props', () => {
    describe('divider', () => {
      it('renders a horizontal rule instead of an item', () => {
        const screen = renderComponent({
          divider: true,
        });

        const hr = screen.getByRole('presentation');
        expect(hr.tagName).toBe('HR');

        const listItem = screen.queryByRole('listitem');
        expect(listItem).not.toBeInTheDocument();
      });
    });

    describe('hiddenOnMobile', () => {
      it('hides the item on mobile', () => {
        const screen = renderComponent({
          hiddenOnMobile: true,
        });

        const listItem = screen.getByRole('button');
        expect(listItem).toHaveClass(css({ srOnly: true }));
      });
    });

    describe('meta', () => {
      it('renders metadata', () => {
        const screen = renderComponent({
          meta: 'Metadata',
        });

        const meta = screen.getByText('Metadata');
        expect(meta).toBeInTheDocument();
      });

      it('does not render meta when not provided', () => {
        const screen = renderComponent({
          label: 'Just a label',
        });

        // Should only have the label text, no meta text
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Just a label');

        // Verify no meta styling classes are applied
        const textElements = button.querySelectorAll(
          '[class*="typography.body.sm"]',
        );
        expect(textElements).toHaveLength(0);
      });
    });

    describe('formattedMeta', () => {
      it('prioritizes formattedMeta over meta when both are provided', () => {
        const screen = renderComponent({
          meta: 'Original meta',
          formattedMeta: (
            <span data-testid="formatted-meta">Formatted meta</span>
          ),
        });

        // Should show formatted meta, not original
        const formattedMeta = screen.getByTestId('formatted-meta');
        expect(formattedMeta).toBeInTheDocument();
        expect(formattedMeta).toHaveTextContent('Formatted meta');

        // Original meta should not be present
        expect(screen.queryByText('Original meta')).not.toBeInTheDocument();
      });

      it('falls back to meta when formattedMeta is not provided', () => {
        const screen = renderComponent({
          meta: 'Fallback meta',
        });

        const meta = screen.getByText('Fallback meta');
        expect(meta).toBeInTheDocument();
      });

      it('does not render meta section when both meta and formattedMeta are undefined', () => {
        const screen = renderComponent({
          label: 'Just a label',
          meta: undefined,
          formattedMeta: undefined,
        });

        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Just a label');

        // Verify no meta styling classes are applied
        const textElements = button.querySelectorAll(
          '[class*="typography.body.sm"]',
        );
        expect(textElements).toHaveLength(0);
      });
    });

    describe('formattedLabel', () => {
      it('prioritizes formattedLabel over label when both are provided', () => {
        const screen = renderComponent({
          label: 'Original label',
          formattedLabel: (
            <span data-testid="formatted-label">Formatted label</span>
          ),
        });

        // Should show formatted label, not original
        const formattedLabel = screen.getByTestId('formatted-label');
        expect(formattedLabel).toBeInTheDocument();
        expect(formattedLabel).toHaveTextContent('Formatted label');

        // Original label should not be present as text (it's still the prop value but not rendered)
        expect(screen.queryByText('Original label')).not.toBeInTheDocument();
      });

      it('falls back to label when formattedLabel is not provided', () => {
        const screen = renderComponent({
          label: 'Fallback label',
        });

        const label = screen.getByText('Fallback label');
        expect(label).toBeInTheDocument();
      });

      it('renders formattedLabel with highlighted text', () => {
        const highlightedLabel = (
          <>
            <b>Found</b> items
          </>
        );

        const screen = renderComponent({
          label: 'Found items',
          formattedLabel: highlightedLabel,
        });

        const boldText = screen.getByText('Found');
        expect(boldText.tagName).toBe('B');

        // Check that the full text is present
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Found items');
      });
    });

    describe('combined formatted content', () => {
      it('renders both formattedLabel and formattedMeta with highlighting', () => {
        const highlightedLabel = (
          <>
            <b>Search</b> result
          </>
        );
        const highlightedMeta = (
          <>
            Contains <b>search</b> term
          </>
        );

        const screen = renderComponent({
          label: 'Search result',
          formattedLabel: highlightedLabel,
          meta: 'Contains search term',
          formattedMeta: highlightedMeta,
        });

        // Check label highlighting
        const labelBold = screen.getByText('Search');
        expect(labelBold.tagName).toBe('B');

        // Check meta highlighting
        const metaBold = screen.getByText('search');
        expect(metaBold.tagName).toBe('B');

        // Check full content
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Search result');
        expect(button).toHaveTextContent('Contains search term');
      });
    });
  });

  describe('extended properties filtering', () => {
    it('should filter out extended LabelValueMeta properties that could interfere with button HTML attributes', () => {
      // Create fake extended props that could break HTML
      const extendedProps = {
        type: 'custom-dangerous-type',
        form: 'some-form-id',
        name: 'dangerous-name',
        formaction: '/dangerous-action',
        customProperty: 'should-be-filtered',
        arbitraryExtension: 'also-filtered',
      };

      const screen = renderComponent({
        ...extendedProps,
        label: 'Test Option',
      } as unknown as Omit<IressSelectMenuItemProps, 'label'> & {
        label?: string;
      });

      const button = screen.getByRole('button');

      // Verify dangerous HTML attributes are NOT present
      expect(button).not.toHaveAttribute('type', 'custom-dangerous-type');
      expect(button).not.toHaveAttribute('form', 'some-form-id');
      expect(button).not.toHaveAttribute('name', 'dangerous-name');
      expect(button).not.toHaveAttribute('formaction', '/dangerous-action');
      expect(button).not.toHaveAttribute('customProperty');
      expect(button).not.toHaveAttribute('arbitraryExtension');

      // Verify the button has proper default type (controlled by IressButton)
      expect(button.getAttribute('type')).toBe('button');

      // Verify the component still renders correctly
      expect(button).toHaveTextContent('Test Option');
    });

    it('should still pass through known safe properties', () => {
      const screen = renderComponent({
        label: 'Test Option',
        selected: true,
        append: 'Append Content',
        prepend: 'Prepend Content',
        role: 'option',
        'data-testid': 'safe-test-id',
        'aria-label': 'Safe aria label',
      });

      const button = screen.getByRole('option');

      // Verify safe properties are passed through
      expect(button).toHaveAttribute('data-testid', 'safe-test-id');
      expect(button).toHaveAttribute('aria-label', 'Safe aria label');
      // Note: aria-selected is controlled by the Menu component's context, not directly by props

      // Verify content is rendered
      expect(button).toHaveTextContent('Prepend Content');
      expect(button).toHaveTextContent('Test Option');
      expect(button).toHaveTextContent('Append Content');
    });

    it('should handle mixed safe and unsafe properties correctly', () => {
      const mixedProps = {
        // Safe properties that should be passed through
        selected: true,
        append: 'Safe append',
        'data-testid': 'mixed-test',
        'aria-describedby': 'description-id',

        // Unsafe properties that should be filtered out
        type: 'submit', // This would be dangerous on a button
        form: 'dangerous-form',
        customExtension: 'filtered-out',
        arbitraryProp: 'also-filtered',
      };

      const screen = renderComponent({
        ...mixedProps,
        label: 'Mixed Props Test',
      } as unknown as Omit<IressSelectMenuItemProps, 'label'> & {
        label?: string;
      });

      const button = screen.getByRole('button');

      // Verify safe properties are preserved
      expect(button).toHaveAttribute('data-testid', 'mixed-test');
      expect(button).toHaveAttribute('aria-describedby', 'description-id');
      // Note: aria-selected is controlled by the Menu component's context, not directly by props
      expect(button).toHaveTextContent('Safe append');

      // Verify unsafe properties are filtered out
      expect(button).not.toHaveAttribute('type', 'submit');
      expect(button).not.toHaveAttribute('form', 'dangerous-form');
      expect(button).not.toHaveAttribute('customExtension');
      expect(button).not.toHaveAttribute('arbitraryProp');

      // Button should have proper default type
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe.skip('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent({});
      const results = await axe(screen.container);
      expect(results).not.toHaveNoViolations();
    });
  });
});
