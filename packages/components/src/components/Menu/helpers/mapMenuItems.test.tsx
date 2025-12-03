import { render } from '@testing-library/react';
import { mapMenuItems } from './mapMenuItems';
import { type MenuItem } from '../MenuItem/MenuItem.types';
import { IressMenu } from '../Menu';

describe('mapMenuItems', () => {
  const menuItems: MenuItem[] = [
    {
      label: 'String label',
    },
    {
      label: <span data-testid="jsxLabel">JSX Label</span>,
    },
  ];

  it('renders the correct menu items', () => {
    const { getAllByRole } = render(
      <IressMenu>{mapMenuItems(menuItems)}</IressMenu>,
    );
    const renderedItems = getAllByRole('listitem');
    expect(renderedItems).toHaveLength(2);
  });

  it('renders no test ids if no test id provided', () => {
    const { container } = render(
      <IressMenu>{mapMenuItems(menuItems)}</IressMenu>,
    );
    // 1 is for the JSX label
    expect(container.querySelectorAll('[data-testid]')).toHaveLength(1);
  });

  it('renders a JSX label if the label is provided', () => {
    const { getByTestId } = render(
      <IressMenu>{mapMenuItems(menuItems)}</IressMenu>,
    );
    expect(getByTestId('jsxLabel')).toBeInTheDocument();
  });

  it('returns null when no items are passed', () => {
    expect(mapMenuItems([])).toBe(null);
  });
});
