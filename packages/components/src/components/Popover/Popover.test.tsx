import {
  type RenderResult,
  act,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  IressPopover,
  type IressPopoverProps,
  PopoverCssClass,
  type PopoverRef,
} from '.';
import styles from './Popover.module.scss';
import { IressButton } from '../Button';
import { axe } from 'jest-axe';
import { createRef } from 'react';
import { idsLogger } from '@helpers/utility/idsLogger';
import { IressMenu, IressMenuItem } from '../Menu';

const TEST_ID = 'test-component';
const TEST_ACTIVATOR = 'Activator';

function renderComponent(
  { children, ...restProps }: Partial<IressPopoverProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressPopover
      {...restProps}
      activator={
        restProps?.activator ?? <IressButton>{TEST_ACTIVATOR}</IressButton>
      }
      data-testid={TEST_ID}
    >
      {children ?? TEST_ID}
    </IressPopover>,
  );
}

describe('IressPopover', () => {
  it('renders the component with the correct attributes and classes (hidden)', () => {
    renderComponent({ className: 'test-class' });

    const popover = screen.getByTestId(TEST_ID);
    expect(popover).toHaveClass(styles.popover, 'test-class');

    const activator = screen.getByRole('button');
    expect(activator).toBeInTheDocument();
    expect(activator).toHaveAttribute('aria-expanded', 'false');
    expect(activator).toHaveAttribute('aria-haspopup', 'dialog');
    expect(activator.closest(`.${styles.activator}`)).not.toBeNull();

    const content = screen.getByText(TEST_ID);
    expect(content).not.toBeVisible();
    expect(content).toHaveClass(styles.content);
  });

  it('renders the component with the correct attributes and classes (shown)', async () => {
    renderComponent();

    const activator = screen.getByRole('button');
    const content = screen.getByText(TEST_ID);

    expect(activator).toBeInTheDocument();

    await userEvent.click(activator);

    expect(activator).toHaveAttribute('aria-expanded', 'true');
    expect(activator).toHaveAttribute('aria-controls', content.id);

    expect(content).toBeVisible();
    await waitFor(() => expect(content).toHaveFocus());
  });

  it('renders the correct data-testids', () => {
    renderComponent();

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__activator`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__content`)).toBeInTheDocument();
  });

  describe('interactions', () => {
    it('closes when user clicks the activator', async () => {
      renderComponent();

      const activator = screen.getByRole('button');
      const content = screen.getByText(TEST_ID);

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeVisible();
    });

    it('closes when user clicks outside the activator', async () => {
      renderComponent();

      const activator = screen.getByRole('button');
      const content = screen.getByText(TEST_ID);

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.click(document.body);

      expect(activator).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeVisible();
    });

    it('closes when user uses the escape key', async () => {
      renderComponent();

      const activator = screen.getByRole('button');
      const content = screen.getByText(TEST_ID);

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.keyboard('{Escape}');

      expect(activator).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeVisible();
    });

    it('closes when the popover loses focus', async () => {
      render(
        <>
          <IressPopover activator={<IressButton>Toggle</IressButton>}>
            Content
          </IressPopover>
          <input />
        </>,
      );

      const activator = screen.getByRole('button');
      const content = screen.getByText('Content');

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await waitFor(() => expect(content).toHaveFocus());
      await userEvent.tab(); // tab away

      expect(content).not.toBeVisible();
    });

    it('closes when the focus returns to the activator from inside the popover', async () => {
      renderComponent();

      const activator = screen.getByRole('button');
      const content = screen.getByText(TEST_ID);

      await userEvent.click(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await waitFor(() => expect(content).toHaveFocus());
      await userEvent.tab({ shift: true }); // tab backwards

      await waitFor(() => expect(content).not.toBeVisible());
    });

    it('transfers focus using page up and down', async () => {
      render(
        <IressPopover type="menu" activator={<IressButton>Toggle</IressButton>}>
          <IressMenu role="menu">
            <IressMenuItem key="1" value="1">
              Option 1
            </IressMenuItem>
            <IressMenuItem key="2" value="2">
              Option 2
            </IressMenuItem>
          </IressMenu>
        </IressPopover>,
      );

      const activator = screen.getByRole('button');

      await userEvent.click(activator);

      const menuItems = await screen.findAllByRole('menuitem');

      await waitFor(() => expect(menuItems[0]).toHaveFocus());

      // second item should be focused
      await userEvent.keyboard('{PageDown}');
      expect(menuItems[1]).toHaveFocus();

      // On page up, first item should be focused
      await userEvent.keyboard('{PageUp}');
      expect(menuItems[0]).toHaveFocus();
    });
  });

  describe('props', () => {
    describe('activator', () => {
      it('renders a custom activator', async () => {
        renderComponent({
          activator: <button data-testid="activator">Activator</button>,
        });

        const activator = screen.getByTestId('activator');
        expect(activator).toBeInTheDocument();
        expect(activator).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(activator);

        expect(activator).toHaveAttribute('aria-expanded', 'true');
        expect(activator.parentElement).toHaveClass(PopoverCssClass.Active);
      });
    });

    describe('children', () => {
      it('changes the content of the popover', () => {
        renderComponent({
          children: 'New content',
        });

        expect(screen.getByText('New content')).not.toBeVisible();
      });
    });

    describe('defaultShow', () => {
      it('opens the popover by default', () => {
        renderComponent({
          defaultShow: true,
        });

        expect(screen.getByText(TEST_ID)).toBeVisible();
      });

      it('closes the popover as its uncontrolled', async () => {
        renderComponent({
          defaultShow: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toBeVisible();

        await userEvent.keyboard('{Escape}');

        expect(content).not.toBeVisible();
      });

      it('does not change on re-render', () => {
        const { rerender } = renderComponent({
          defaultShow: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toBeVisible();

        renderComponent(
          {
            defaultShow: false,
          },
          rerender as never,
        );

        expect(content).toBeVisible();
      });
    });

    describe('container', () => {
      it('changes where the popover is rendered', async () => {
        const container = document.createElement('div');
        renderComponent({
          defaultShow: true,
          container,
        });

        await waitFor(() => expect(container.children).toHaveLength(1));
        expect(container.querySelector(`.${styles.content}`)).not.toBeNull();
      });
    });

    describe('contentClassName', () => {
      it('adds class name to the content', () => {
        renderComponent({
          children: 'Content',
          contentClassName: 'test-class',
        });

        const content = screen.getByText('Content');
        expect(content).toHaveClass('test-class');
      });
    });

    describe('disabledAutoToggle', () => {
      it('does not toggle the popover', async () => {
        renderComponent({
          disabledAutoToggle: true,
        });

        const activator = screen.getByRole('button');
        expect(activator).toHaveAttribute('aria-expanded', 'false');

        await userEvent.click(activator);

        expect(activator).toHaveAttribute('aria-expanded', 'false');
      });
    });

    describe('displayMode', () => {
      it('does not render with floating styles when inline', () => {
        renderComponent({
          displayMode: 'inline',
        });

        const content = screen.getByText(TEST_ID);
        expect(content).not.toHaveStyle({ position: 'absolute' });
      });

      it('does not render a width and max-width if displaying inline and matching activator width', () => {
        renderComponent({
          displayMode: 'inline',
          matchActivatorWidth: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).not.toHaveAttribute('style');
      });
    });

    describe('matchActivatorWidth', () => {
      it('removes the max width on the popover', () => {
        renderComponent({
          matchActivatorWidth: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toHaveStyle({ maxWidth: 'none' });
      });
    });

    describe('onActivated', () => {
      it('is called when popover is opened', async () => {
        const onActivated = vi.fn();
        renderComponent({
          onActivated,
        });

        await userEvent.click(screen.getByRole('button')); // open

        expect(onActivated).toHaveBeenCalledTimes(1);
      });
    });

    describe('onDeactivated', () => {
      it('is called when popover is closed', async () => {
        const onDeactivated = vi.fn();
        renderComponent({
          onDeactivated,
        });

        await userEvent.click(screen.getByRole('button')); // open
        await userEvent.click(screen.getByRole('button')); // close

        expect(onDeactivated).toHaveBeenCalledTimes(1);
      });
    });

    describe('onNavigate', () => {
      it('is called when user navigates the popover using arrow keys', async () => {
        const onNavigate = vi.fn();
        renderComponent({
          children: (
            <IressMenu role="menu">
              <IressMenuItem key="1" value="1">
                Option 1
              </IressMenuItem>
              ,
              <IressMenuItem key="2" value="2">
                Option 2
              </IressMenuItem>
              ,
            </IressMenu>
          ),
          onNavigate,
          type: 'menu',
        });

        await userEvent.tab(); // focus activator
        await userEvent.keyboard('{Enter}'); // open

        const menuItems = await screen.findAllByRole('menuitem');

        await waitFor(() => expect(menuItems[0]).toHaveFocus());

        expect(onNavigate).toHaveBeenLastCalledWith(0);

        await userEvent.keyboard('{ArrowDown}');

        expect(onNavigate).toHaveBeenLastCalledWith(1);
      });
    });

    describe('type', () => {
      it('changes the role of the popover content', async () => {
        renderComponent({
          type: 'menu',
        });

        await userEvent.click(screen.getByRole('button')); // open

        expect(screen.getByText(TEST_ID)).toHaveAttribute('role', 'menu');
      });
    });

    describe('show', () => {
      it('opens the popover by default', () => {
        renderComponent({
          show: true,
        });

        expect(screen.getByText(TEST_ID)).toBeVisible();
      });

      it('does not close the popover as its controlled', async () => {
        renderComponent({
          show: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toBeVisible();

        await userEvent.keyboard('{Escape}');

        expect(content).toBeVisible();
      });

      it('changes on re-render', () => {
        const { rerender } = renderComponent({
          show: true,
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toBeVisible();

        renderComponent(
          {
            show: false,
          },
          rerender as never,
        );

        expect(content).not.toBeVisible();
      });
    });

    describe('width', () => {
      it('changes the width of the popover content', () => {
        renderComponent({
          width: '20rem',
        });

        const content = screen.getByText(TEST_ID);
        expect(content).toHaveStyle({ maxWidth: '20rem', width: '100%' });

        expect(idsLogger).toHaveBeenCalledTimes(1);
      });
    });

    describe('virtualFocus', () => {
      it('uses aria-activedescendant to track the currently focused item on the activator', async () => {
        renderComponent({
          children: (
            <IressMenu role="menu">
              <IressMenuItem key="1" value="1">
                Option 1
              </IressMenuItem>
              ,
              <IressMenuItem key="2" value="2">
                Option 2
              </IressMenuItem>
              ,
            </IressMenu>
          ),
          type: 'menu',
          virtualFocus: true,
        });

        const activator = screen.getByRole('button', { name: TEST_ACTIVATOR });
        expect(activator).not.toHaveAttribute('aria-activedescendant');

        await userEvent.tab(); // focus activator
        await userEvent.keyboard('{Enter}'); // open

        const menuItems = await screen.findAllByRole('menuitem');

        expect(activator).toHaveFocus();
        expect(activator).toHaveAttribute(
          'aria-activedescendant',
          menuItems[0].id,
        );
        expect(menuItems[0].id).not.toBe(''); // Check ID is not empty, otherwise aria-activedescendant will not work

        await userEvent.keyboard('{ArrowDown}'); // navigate to next item

        expect(activator).toHaveFocus();
        expect(activator).toHaveAttribute(
          'aria-activedescendant',
          menuItems[1].id,
        );
        expect(menuItems[1].id).not.toBe(''); // Check ID is not empty, otherwise aria-activedescendant will not work
      });
    });
  });

  describe('ref', () => {
    describe('getContent', () => {
      it('gets the floating content of the popover', () => {
        const ref = createRef<PopoverRef>();

        render(
          <IressPopover
            ref={ref}
            activator={<IressButton>{TEST_ACTIVATOR}</IressButton>}
          >
            {TEST_ID}
          </IressPopover>,
        );

        const content = screen.getByText(TEST_ID);
        expect(ref.current?.getContent()).toBe(content);
      });
    });

    describe('setShow', () => {
      it('changes the status of the popover', () => {
        const ref = createRef<PopoverRef>();

        render(
          <IressPopover
            ref={ref}
            activator={<IressButton>{TEST_ACTIVATOR}</IressButton>}
          >
            {TEST_ID}
          </IressPopover>,
        );

        act(() => ref.current?.setShow(true));

        expect(screen.getByText(TEST_ID)).toBeVisible();
      });
    });

    describe('show', () => {
      it('provides the status of the popover', async () => {
        const ref = createRef<PopoverRef>();

        render(
          <IressPopover
            ref={ref}
            activator={<IressButton>{TEST_ACTIVATOR}</IressButton>}
          >
            {TEST_ID}
          </IressPopover>,
        );

        expect(ref.current?.show).toBe(false);

        await userEvent.click(screen.getByRole('button'));

        expect(ref.current?.show).toBe(true);
      });
    });

    describe('toggleAriaControls', () => {
      it('adds an aria control to the popover activator', async () => {
        const ref = createRef<PopoverRef>();

        render(
          <IressPopover
            ref={ref}
            activator={<IressButton>{TEST_ACTIVATOR}</IressButton>}
          >
            {TEST_ID}
          </IressPopover>,
        );

        const activator = screen.getByRole('button');
        expect(activator).not.toHaveAttribute('aria-controls');

        ref.current?.toggleAriaControls('test');

        await userEvent.click(activator);

        expect(activator.getAttribute('aria-controls')).toContain('test');
      });
    });
  });

  describe('accessibility', () => {
    it('does not have basic accessibility issues (hidden)', async () => {
      const { container } = renderComponent();

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('does not have basic accessibility issues (shown)', async () => {
      const { container } = renderComponent({ show: true });

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
