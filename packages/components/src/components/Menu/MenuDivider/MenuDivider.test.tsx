import { render } from '@testing-library/react';
import { IressMenu, IressMenuDivider } from '..';
import { type IressMenuProps } from '../Menu.types';
import { axe } from 'jest-axe';
import { type IressHTMLAttributes } from '@/interfaces';

const TEST_ID = 'test-component';
const MENU_TEST_ID = 'test-menu';

function renderComponent(props?: IressHTMLAttributes<HTMLHRElement>) {
  return render(<IressMenuDivider {...props} data-testid={TEST_ID} />);
}

function renderInsideMenu(
  props?: IressMenuProps,
  itemProps?: IressHTMLAttributes<HTMLHRElement>,
  wrapperTag = 'div',
) {
  const Wrapper = wrapperTag as keyof JSX.IntrinsicElements;

  return render(
    <Wrapper>
      <IressMenu {...props} data-testid={MENU_TEST_ID}>
        <IressMenuDivider {...itemProps} data-testid={TEST_ID} />
      </IressMenu>
    </Wrapper>,
  );
}

describe('IressMenuDivider', () => {
  it('renders with role of presentation by default', () => {
    const screen = renderComponent();
    const separator = screen.getByRole('presentation');
    expect(separator).toBeInTheDocument();
  });

  describe('inside menu', () => {
    it('renders a separator inside role=menu', () => {
      const screen = renderInsideMenu({
        role: 'menu',
      });
      const separator = screen.getByRole('separator');
      expect(separator).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=list', async () => {
      const screen = renderInsideMenu({ role: 'list' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=menu', async () => {
      const screen = renderInsideMenu({ role: 'menu' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox', async () => {
      const screen = renderInsideMenu({
        'aria-label': 'Test',
        role: 'listbox',
      });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
