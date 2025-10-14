import { render } from '@testing-library/react';
import {
  IressMenu,
  IressMenuHeading,
  IressMenuProps,
  IressMenuText,
  IressMenuTextProps,
  menu,
} from '..';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { css } from '@/styled-system/css';

const TEST_ID = 'test-component';
const MENU_TEST_ID = 'test-menu';

function renderText(props?: IressMenuTextProps) {
  return render(<IressMenuText {...props} data-testid={TEST_ID} />);
}

function renderTextInsideMenu(
  props?: IressMenuProps,
  itemProps?: IressMenuTextProps,
  wrapperTag = 'div',
) {
  const Wrapper = wrapperTag as keyof JSX.IntrinsicElements;

  return render(
    <Wrapper>
      <IressMenu {...props} data-testid={MENU_TEST_ID}>
        <IressMenuText {...itemProps} data-testid={TEST_ID} />
      </IressMenu>
    </Wrapper>,
  );
}

describe('IressMenuText', () => {
  it('renders defaults', () => {
    const screen = renderText({
      children: 'Test',
    });
    const classes = menu();

    const wrapper = screen.getByTestId(TEST_ID);
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass(classes.text!, GlobalCSSClass.MenuText);

    const text = screen.getByText('Test');
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(classes.contents!);
  });

  describe('props', () => {
    describe('append', () => {
      it('renders the appended JSX', () => {
        const screen = renderText({
          append: 'Append',
        });

        const append = screen.getByText('Append');
        expect(append).toBeInTheDocument();
        expect(append).toHaveClass(menu({ hasAppendOrPrepend: true }).append!);
      });
    });

    describe('divider', () => {
      it('renders a divider', () => {
        const screen = renderText({
          divider: true,
        });

        const wrapper = screen.getByTestId(TEST_ID);
        expect(wrapper.nextElementSibling?.tagName).toBe('HR');
      });
    });

    describe('prepend', () => {
      it('renders the prepended JSX', () => {
        const screen = renderText({
          prepend: 'Prepend',
        });

        const prepend = screen.getByText('Prepend');
        expect(prepend).toBeInTheDocument();

        const wrapper = screen.getByTestId(TEST_ID);
        expect(wrapper).toHaveClass(menu({ hasAppendOrPrepend: true }).text!);
      });
    });

    describe('role', () => {
      it('renders any role if used outside of a menu', () => {
        const screen = renderText({
          children: 'Test',
          role: 'button',
        });

        const wrapper = screen.getByTestId(TEST_ID);
        expect(wrapper).toHaveAttribute('role', 'button');
      });
    });
  });

  describe('inside menu', () => {
    it('overrides the role when used in a menu', () => {
      const screen = renderTextInsideMenu({}, { role: 'button' });
      const wrapper = screen.getByTestId(TEST_ID);
      expect(wrapper).toHaveAttribute('role', 'listitem');
    });

    it('adds the listitem role in a menu with role=list', () => {
      const screen = renderTextInsideMenu();
      const wrapper = screen.getByTestId(TEST_ID);
      expect(wrapper).toHaveAttribute('role', 'listitem');
    });

    it('adds the menuitem role in a menu with role=menu', () => {
      const screen = renderTextInsideMenu({ role: 'menu' });
      const wrapper = screen.getByTestId(TEST_ID);
      expect(wrapper).toHaveAttribute('role', 'menuitem');
    });

    it('adds the option role in a menu with role=listbox', () => {
      const screen = renderTextInsideMenu({ role: 'listbox' });
      const wrapper = screen.getByTestId(TEST_ID);
      expect(wrapper).toHaveAttribute('role', 'option');
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderText({ children: 'Title' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=list', async () => {
      const screen = renderTextInsideMenu(
        { role: 'list' },
        { children: 'Title' },
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=menu', async () => {
      const screen = renderTextInsideMenu(
        { role: 'menu' },
        { children: 'Title' },
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in menu with role=listbox', async () => {
      const screen = renderTextInsideMenu(
        { 'aria-label': 'Test', role: 'listbox' },
        { children: 'Title' },
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe('IressMenuHeading', () => {
  it('renders defaults', () => {
    const screen = render(<IressMenuHeading>Test</IressMenuHeading>);

    const heading = screen.getByRole('heading', { name: 'Test', level: 2 });
    expect(heading).toHaveClass(css({ textStyle: 'typography.heading.4' }));
    expect(heading.closest(`.${GlobalCSSClass.MenuHeading}`)).not.toBeNull();
  });
});
