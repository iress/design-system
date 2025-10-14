import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { IressSelectMenuItemProps } from './SelectMenu.types';
import { IressSelectMenuItem } from './SelectMenuItem';

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
        expect(listItem).toHaveClass(GlobalCSSClass.HiddenMobile);
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
    });

    describe('formattedMeta', () => {
      it('renders formatted metadata when provided', () => {
        const screen = renderComponent({
          meta: 'Original meta',
          formattedMeta: (
            <span data-testid="formatted-meta">Formatted meta</span>
          ),
        });

        const formattedMeta = screen.getByTestId('formatted-meta');
        expect(formattedMeta).toBeInTheDocument();
        expect(formattedMeta).toHaveTextContent('Formatted meta');

        // Original meta should not be rendered when formattedMeta is provided
        expect(screen.queryByText('Original meta')).not.toBeInTheDocument();
      });

      it('falls back to meta when formattedMeta is not provided', () => {
        const screen = renderComponent({
          meta: 'Original meta',
        });

        const meta = screen.getByText('Original meta');
        expect(meta).toBeInTheDocument();
      });

      it('renders nothing when both meta and formattedMeta are not provided', () => {
        const screen = renderComponent({});

        const listItem = screen.getByRole('button');
        expect(listItem).toHaveTextContent(TEST_LABEL);
        expect(
          listItem.querySelector('.iress-display--block'),
        ).not.toBeInTheDocument();
      });

      it('renders nothing when formattedMeta is explicitly null/undefined', () => {
        const screen = renderComponent({
          meta: 'Original meta',
          formattedMeta: undefined,
        });

        const listItem = screen.getByRole('button');
        expect(listItem).toHaveTextContent(TEST_LABEL);
        // When formattedMeta is undefined, it should fall back to meta
        expect(screen.getByText('Original meta')).toBeInTheDocument();
      });

      it('renders nothing when formattedMeta is explicitly set to null', () => {
        const screen = renderComponent({
          meta: 'Original meta',
          formattedMeta: null,
        });

        const listItem = screen.getByRole('button');
        expect(listItem).toHaveTextContent(TEST_LABEL);
        expect(
          listItem.querySelector('.iress-display--block'),
        ).not.toBeInTheDocument();
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
