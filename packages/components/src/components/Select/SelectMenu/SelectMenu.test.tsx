import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { generateLabelValueMeta } from '@/mocks/generateLabelValues';
import { IressSelectMenuProps, IressSelectMenu } from './SelectMenu';
import { GlobalCSSClass } from '@/main';
import { css } from '@/styled-system/css';

export function filterMobileOnlyOptions(options: HTMLElement[]) {
  return options.filter((option: HTMLElement) => {
    const closest = option?.closest(`.${GlobalCSSClass.SelectMenuItem}`);

    if (!closest) return false;

    const hiddenClass = css({ hideBelow: 'md' });

    return (
      closest?.classList.contains(hiddenClass) ||
      option?.classList.contains(hiddenClass)
    );
  });
}

const TEST_ID = 'test-component';
const TEST_ITEMS = generateLabelValueMeta();

function renderComponent<TMultiple extends boolean = false>(
  {
    'data-testid': dataTestId = TEST_ID,
    items = TEST_ITEMS,
    ...props
  }: IressSelectMenuProps<TMultiple>,
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressSelectMenu<TMultiple>
      {...props}
      data-testid={dataTestId}
      items={items}
    />,
  );
}

describe('IressSelectMenu', () => {
  it('renders the component with the correct defaults', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const listbox = screen.getByRole('listbox');
    expect(listbox).toHaveClass('test-class');

    const items = screen.getAllByRole('option');
    expect(items).toHaveLength(TEST_ITEMS.length);
  });

  it('renders the component with the correct test ids', () => {
    const screen = renderComponent({});
    const listbox = screen.getByTestId(TEST_ID);
    expect(listbox).toBeInTheDocument();
  });

  describe('props', () => {
    describe('heading', () => {
      it('adds a heading using a string and connects it to menu via aria-labelledby', () => {
        const screen = renderComponent({
          heading: 'Search results',
        });

        const listbox = screen.getByRole('listbox');
        const listboxByHeading = screen.getByLabelText('Search results');

        expect(listbox).toBe(listboxByHeading);
      });

      it('adds a heading using a node', () => {
        const screen = renderComponent({
          heading: <h5>Search results</h5>,
        });

        const heading = screen.getByRole('heading', { name: 'Search results' });
        expect(heading).toBeInTheDocument();
      });
    });

    describe('hideSelectedItems', () => {
      it('hides selected items', () => {
        const screen = renderComponent({
          hideSelectedItems: true,
          selected: TEST_ITEMS[0],
        });

        const items = screen.getAllByRole('option');
        expect(items).toHaveLength(TEST_ITEMS.length - 1);
      });
    });

    describe('limitDesktop', () => {
      it('limits the options shown', () => {
        const screen = renderComponent({
          limitDesktop: 3,
        });

        const items = screen.getAllByRole('option');
        expect(items).toHaveLength(3);
        expect(items).not.toHaveLength(TEST_ITEMS.length);
      });
    });

    describe('limitMobile', () => {
      it('limits the options show in mobile', () => {
        const screen = renderComponent({
          limitMobile: 3,
        });

        const items = screen.getAllByRole('option');
        expect(items).toHaveLength(TEST_ITEMS.length);
        expect(filterMobileOnlyOptions(items)).toHaveLength(
          TEST_ITEMS.length - 3,
        );
      });
    });

    describe('noResults', () => {
      it('renders no results if provided', () => {
        const screen = renderComponent({
          items: [],
          noResults: 'No results found',
        });

        const noResults = screen.getByText('No results found');
        expect(noResults).toBeInTheDocument();
      });

      it('does not render if there are items', () => {
        const screen = renderComponent({
          noResults: 'No results found',
        });

        const noResults = screen.queryByText('No results found');
        expect(noResults).not.toBeInTheDocument();
      });
    });

    describe('selected', () => {
      it('translates LabelValueMeta[] to MenuSelected, and displays as selected', () => {
        const screen = renderComponent({
          selected: TEST_ITEMS[2],
        });

        const items = screen.getAllByRole('option');
        expect(items[2]).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('selectedFirst', () => {
      it('shows the selected items first, with a divider', () => {
        const screen = renderComponent({
          selected: TEST_ITEMS[2],
          selectedFirst: true,
        });

        const items = screen.getAllByRole('option');
        expect(items[0]).toHaveTextContent(TEST_ITEMS[2].label);
        expect((items[0].nextSibling as HTMLElement)?.tagName).toBe('HR');
      });
    });
  });

  describe('grouped options', () => {
    const groupedItems = [
      {
        label: 'Fruits',
        children: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
          { label: 'Orange', value: 'orange' },
        ],
      },
      {
        label: 'Vegetables',
        children: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ];

    it('renders grouped options correctly', () => {
      const screen = renderComponent({
        items: groupedItems,
      });

      const groups = screen.getAllByTestId(`${TEST_ID}__menu-group`);
      expect(groups).toHaveLength(2);

      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(7); // 3 fruits + 2 vegetables + 2 group headings

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
    });

    it('handles selection in grouped options', () => {
      const screen = renderComponent({
        items: groupedItems,
        selected: { label: 'Apple', value: 'apple' },
      });

      const items = screen.getAllByRole('option');
      const appleItem = items.find((item) => item.textContent === 'Apple');
      expect(appleItem).toHaveAttribute('aria-selected', 'true');
    });

    it('hideSelectedItems works with grouped options', () => {
      const screen = renderComponent({
        items: groupedItems,
        selected: { label: 'Apple', value: 'apple' },
        hideSelectedItems: true,
      });

      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(6); // Apple is hidden - 2 group headings + 4 remaining items

      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('hides entire group when all children are selected and hidden', () => {
      const screen = renderComponent({
        items: groupedItems,
        selected: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
        hideSelectedItems: true,
        multiSelect: true,
      });

      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(4); // Only fruits remain + fruits heading

      expect(screen.queryByText('Vegetables')).not.toBeInTheDocument();
      expect(screen.getByText('Fruits')).toBeInTheDocument();
    });

    it('selectedFirst works with grouped options', () => {
      const screen = renderComponent({
        items: groupedItems,
        selected: { label: 'Carrot', value: 'carrot' },
        selectedFirst: true,
      });

      const groups = screen.getAllByTestId(`${TEST_ID}__menu-group`);
      // Vegetables group should be first because carrot is selected
      expect(groups[0]).toHaveTextContent('Vegetables');
      expect(groups[1]).toHaveTextContent('Fruits');
    });

    it('limits work correctly with grouped options', () => {
      const screen = renderComponent({
        items: groupedItems,
        limitDesktop: 4,
      });

      const items = screen.getAllByRole('option');
      // Should show 3 from Fruits and 1 from Vegetables, and 2 headings
      expect(items).toHaveLength(6);
    });

    it('limitMobile works with grouped options', () => {
      const screen = renderComponent({
        items: groupedItems,
        limitMobile: 4,
      });

      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(7); // All items + headings shown on desktop
      expect(filterMobileOnlyOptions(items)).toHaveLength(1); // 1 hidden on mobile
    });

    it('handles dividers on groups', () => {
      const itemsWithDivider = [
        {
          label: 'Group 1',
          divider: true,
          children: [
            { label: 'Item 1', value: '1' },
            { label: 'Item 2', value: '2' },
          ],
        },
        {
          label: 'Group 2',
          children: [{ label: 'Item 3', value: '3' }],
        },
      ];

      const screen = renderComponent({
        items: itemsWithDivider,
      });

      const dividers = screen.container.querySelectorAll('hr');
      expect(dividers).toHaveLength(1);
    });

    it('handles mixed flat and grouped items', () => {
      const mixedItems = [
        { label: 'Flat Item 1', value: 'flat1' },
        {
          label: 'Group',
          children: [
            { label: 'Grouped Item 1', value: 'grouped1' },
            { label: 'Grouped Item 2', value: 'grouped2' },
          ],
        },
        { label: 'Flat Item 2', value: 'flat2' },
      ];

      const screen = renderComponent({
        items: mixedItems,
      });

      const groups = screen.queryAllByTestId(`${TEST_ID}__menu-group`);
      expect(groups).toHaveLength(1);

      const items = screen.getAllByRole('option');
      expect(items).toHaveLength(5); // 2 flat + 2 grouped + 1 heading
    });

    it('passes accessibility tests with grouped options', async () => {
      const screen = renderComponent({
        items: groupedItems,
        'aria-label': 'Grouped menu',
      });

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent({
        'aria-label': 'Menu heading',
      });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
