import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { generateLabelValueMeta } from '@/mocks/generateLabelValues';
import { IressSelectMenuProps } from './SelectMenu.types';
import { IressSelectMenu } from './SelectMenu';
import { GlobalCSSClass } from '@/main';

import menuItemStyles from '../../Menu/MenuItem/MenuItem.module.scss';

export function filterMobileOnlyOptions(
  options: HTMLElement[],
  className = menuItemStyles.menuItem,
) {
  return options.filter((option: HTMLElement) => {
    const closest = option?.closest(`.${className}`);

    if (!option?.classList.contains(className) || !closest) return false;

    return (
      closest?.classList.contains(GlobalCSSClass.HiddenMobile) ||
      option?.classList.contains(GlobalCSSClass.HiddenMobile)
    );
  });
}

const TEST_ID = 'test-component';
const TEST_ITEMS = generateLabelValueMeta();

function renderComponent(
  {
    'data-testid': dataTestId = TEST_ID,
    items = TEST_ITEMS,
    ...props
  }: IressSelectMenuProps,
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressSelectMenu {...props} data-testid={dataTestId} items={items} />,
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
