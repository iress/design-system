import { render, screen } from '@testing-library/react';

import { axe } from 'jest-axe';
import { IressTableBody } from './TableBody';
import { type IressTableBodyProps } from './TableBody.types';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const TEST_CAPTION = 'caption';
const TEST_ROWS = [
  { key: '1', value: 'one' },
  { key: '2', value: 'two' },
];

const renderComponent = <TRow extends object, TData = never>(
  props: Partial<IressTableBodyProps<TRow, TData>> = {},
  renderFn: typeof render = render,
) =>
  renderFn(
    <table>
      <IressTableBody<TRow, TData>
        {...props}
        data-testid={TEST_ID}
        caption={props?.caption ?? TEST_CAPTION}
        rows={(props?.rows as unknown as TRow[]) ?? TEST_ROWS}
      />
    </table>,
  );

describe('TableBody', () => {
  it('renders with the correct text and classes', async () => {
    renderComponent({
      className: 'test-class',
    });

    const tbody = screen.getByRole('rowgroup', { name: TEST_CAPTION });
    expect(tbody).toBeInTheDocument();
    expect(tbody).toHaveClass('test-class');

    const header = screen.getByRole('rowheader', { name: TEST_CAPTION });
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('aria-expanded', 'false');

    const activator = screen.getByRole('button', { name: TEST_CAPTION });
    expect(activator).toBeInTheDocument();

    // Only the first row is visible by default
    const closedRows = screen.getAllByRole('row');
    expect(closedRows).toHaveLength(1);

    await userEvent.click(activator);

    // Once opened, should have the rows visible, include the column headers
    const openedRows = screen.getAllByRole('row');
    expect(openedRows).toHaveLength(2 + TEST_ROWS.length);

    // The header should now be expanded
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(header).toHaveAttribute(
      'aria-controls',
      [openedRows[1].id, openedRows[2].id, openedRows[3].id].join(' '),
    );
  });

  describe('props', () => {
    describe('children', () => {
      it('renders children inside a table cell', () => {
        renderComponent({
          children: <div>Hello world</div>,
          hiddenCaption: true,
          rows: [],
        });

        const cell = screen.getByRole('cell', { name: 'Hello world' });
        expect(cell).toBeInTheDocument();
      });
    });

    describe('empty', () => {
      it('renders an empty state when provided', () => {
        const screen = renderComponent({
          columns: [{ key: 'key', label: 'Column 1' }],
          empty: 'No data',
          hiddenCaption: true,
          rows: [],
        });

        const empty = screen.getByText('No data');
        expect(empty).toBeInTheDocument();
      });
    });

    describe('hiddenCaption', () => {
      it('visually hides the caption', () => {
        const screen = renderComponent({
          hiddenCaption: true,
        });

        const header = screen.getByRole('rowheader', { name: TEST_CAPTION });
        expect(header).toHaveClass(GlobalCSSClass.SROnly);
        expect(header).not.toHaveAttribute('aria-expanded');
      });

      it('always renders rows', () => {
        const screen = renderComponent({
          hiddenCaption: true,
        });

        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(2 + TEST_ROWS.length);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <table>
          <IressTableBody caption="A body" rows={[{ hello: 'world' }]} />
        </table>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
