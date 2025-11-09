import { render } from '@testing-library/react';
import {
  IressMenu,
  IressMenuDivider,
  IressMenuDividerProps,
  IressMenuProps,
} from '..';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const MENU_TEST_ID = 'test-menu';

function renderComponent(props?: IressMenuDividerProps) {
  return render(<IressMenuDivider {...props} data-testid={TEST_ID} />);
}

function renderInsideMenu(
  props?: IressMenuProps,
  itemProps?: IressMenuDividerProps,
  wrapperTag = 'div',
) {
  const Wrapper = wrapperTag as keyof React.JSX.IntrinsicElements;

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
    expect(separator).toHaveClass(GlobalCSSClass.MenuDivider);
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
