import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { App as AppWithSlideoutProvider } from './mocks/AppWithSlideoutProvider';
import { idsLogger } from '@helpers/utility/idsLogger';
import {
  GlobalCSSClass,
  IressButton,
  IressSlideout,
  IressSlideoutProps,
  IressSlideoutProvider,
  IressSlideoutProviderProps,
  slideout as slideoutStyles,
} from '@/main';
import { SlideoutContext, SlideoutContextValue } from './SlideoutProvider';
import { useState } from 'react';
import { token } from '@/styled-system/tokens';

const TEST_ID = 'test-component';
const TEST_ROLE = 'complementary';

// Mocking the breakpoint hook to return xl so push element styles are applied
vi.mock('../../hooks/useBreakpoint', () => ({
  useBreakpoint: vi.fn(() => ({
    breakpoint: 'xl',
  })),
}));

function renderComponent(
  props: Partial<IressSlideoutProps> = {},
  options?: {
    enableAnimations?: boolean;
    renderFn?: typeof render;
  },
): RenderResult {
  const { children, ...restProps } = props;
  const { enableAnimations: withAnimations = false, renderFn = render } =
    options ?? {};

  // Toggle animations based on the option
  if (withAnimations) {
    enableAnimations();
  } else {
    disableAnimations();
  }
  const idToUse = Object.prototype.hasOwnProperty.call(props, 'id')
    ? props.id
    : TEST_ID;

  const roleToUse = Object.prototype.hasOwnProperty.call(props, 'role')
    ? props.role
    : TEST_ROLE;
  const dataTestIdToUse = Object.prototype.hasOwnProperty.call(
    props,
    'data-testid',
  )
    ? props['data-testid']
    : TEST_ID;

  return renderFn(
    <IressSlideout
      {...restProps}
      id={idToUse}
      role={roleToUse}
      data-testid={dataTestIdToUse}
    >
      {children}
    </IressSlideout>,
  );
}

function renderComponentInProvider(
  { children, ...restProps }: Partial<IressSlideoutProps> = {},
  providerProps?: IressSlideoutProviderProps,
  renderFn: typeof render = render,
): RenderResult {
  const { container, ...otherProviderProps } = providerProps ?? {};

  return renderFn(
    <IressSlideoutProvider {...otherProviderProps}>
      <IressSlideout
        {...restProps}
        container={container}
        id={restProps?.id ?? TEST_ID}
        role={restProps?.role ?? TEST_ROLE}
        data-testid={TEST_ID}
      >
        {children}
      </IressSlideout>
    </IressSlideoutProvider>,
  );
}

let originalGetComputedStyle: typeof window.getComputedStyle;
let animationStyleTag: HTMLStyleElement | null = null;

function disableAnimations() {
  if (!originalGetComputedStyle) {
    originalGetComputedStyle = window.getComputedStyle;
  }

  window.getComputedStyle = (element) => {
    const computedStyle = originalGetComputedStyle(element);
    return {
      ...computedStyle,
      transitionDuration: '0s',
      getPropertyValue: (prop) => {
        if (prop === 'transition-duration') return '0s';
        return computedStyle.getPropertyValue(prop);
      },
    } as CSSStyleDeclaration;
  };

  if (!animationStyleTag) {
    animationStyleTag = document.createElement('style');
    animationStyleTag.innerHTML = `
      * {
        transition-duration: 0s !important;
        animation-duration: 0s !important;
      }
    `;
    document.head.appendChild(animationStyleTag);
  }
}

function enableAnimations() {
  if (originalGetComputedStyle) {
    window.getComputedStyle = originalGetComputedStyle;
  }

  if (animationStyleTag) {
    document.head.removeChild(animationStyleTag);
    animationStyleTag = null;
  }
}

let capturedContext: SlideoutContextValue | undefined;
const TestProviderApp = ({
  slideoutProps,
  providerProps,
}: {
  slideoutProps?: Partial<IressSlideoutProps>;
  providerProps?: IressSlideoutProviderProps;
}) => {
  return (
    <IressSlideoutProvider {...providerProps}>
      <SlideoutContext.Consumer>
        {(contextValue) => {
          capturedContext = contextValue;
          return null;
        }}
      </SlideoutContext.Consumer>
      <IressSlideout
        id={TEST_ID}
        role={TEST_ROLE}
        data-testid={TEST_ID}
        {...slideoutProps}
      >
        {slideoutProps?.children ?? 'Provider controlled content'}
      </IressSlideout>
    </IressSlideoutProvider>
  );
};

beforeEach(() => {
  disableAnimations();
});

afterAll(() => {
  disableAnimations();
});

describe('IressSlideout', () => {
  it('renders the component with the correct text and classes (hidden)', () => {
    const screen = renderComponent({
      children: 'Test text',
    });

    expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();
    expect(screen.queryByText('Test text')).not.toBeInTheDocument();
  });

  it('renders the component with the correct text and classes (shown)', async () => {
    const screen = renderComponent({
      children: 'Test text',
      show: true,
    });

    const slideout = await screen.findByRole(TEST_ROLE);
    const content = await screen.findByText('Test text');
    const closeButton = await screen.findByRole('button', {
      name: 'Close',
    });

    expect(slideout).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    expect(slideout).toHaveClass(
      slideoutStyles({ status: 'open' }).root!,
      GlobalCSSClass.Slideout,
    );
    expect(content).toHaveClass(slideoutStyles({}).content!);
    expect(closeButton).toHaveClass(slideoutStyles({}).closeButton!);
  });

  it('renders the component with the correct data-testids', async () => {
    const screen = renderComponent({
      footer: 'Footer slot',
      show: true,
    });

    expect(await screen.findByTestId(TEST_ID)).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${TEST_ID}__content`),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(`${TEST_ID}__close-button__button`),
    ).toBeInTheDocument();
    expect(await screen.findByTestId(`${TEST_ID}__footer`)).toBeInTheDocument();
  });

  describe('interactions', () => {
    it('closes when the user clicks the close button (uncontrolled)', async () => {
      const screen = renderComponent({
        defaultShow: true,
        id: undefined,
      });

      const slideoutElement = await screen.findByRole(TEST_ROLE);
      expect(slideoutElement).toBeInTheDocument();

      const closeButton = await screen.findByRole('button', { name: 'Close' });
      await userEvent.click(closeButton);

      await waitForElementToBeRemoved(() => screen.queryByRole(TEST_ROLE));

      expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();
    });

    it('closes when the user clicks the close button (controlled)', async () => {
      let showFlag = true;
      const onShowChangeMock = vi.fn((newShow: boolean) => {
        showFlag = newShow;
      });

      const screen = renderComponent({
        show: showFlag,
        onShowChange: onShowChangeMock,
      });

      const slideoutElement = await screen.findByRole(TEST_ROLE);
      expect(slideoutElement).toBeInTheDocument();

      const closeButton = await screen.findByRole('button', { name: 'Close' });
      await userEvent.click(closeButton);

      expect(onShowChangeMock).toHaveBeenCalledWith(false, undefined);
      expect(showFlag).toBe(false);

      screen.rerender(
        <IressSlideout
          show={showFlag}
          onShowChange={onShowChangeMock}
          id={TEST_ID}
          role={TEST_ROLE}
          data-testid={TEST_ID}
        ></IressSlideout>,
      );

      await waitForElementToBeRemoved(() => screen.queryByRole(TEST_ROLE));

      expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();
    });

    it('closes when the user clicks the close button (provider)', async () => {
      const screen = render(<TestProviderApp />);

      expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();

      act(() => {
        capturedContext?.showSlideout(TEST_ID, true);
      });

      const slideout = await screen.findByRole(TEST_ROLE);
      expect(slideout).toBeInTheDocument();
      expect(
        screen.getByText('Provider controlled content'),
      ).toBeInTheDocument();

      const closeButton = await screen.findByRole('button', { name: 'Close' });
      await userEvent.click(closeButton);

      await waitForElementToBeRemoved(() => screen.queryByRole(TEST_ROLE));

      expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();
    });

    it('closes when using the escape key', async () => {
      const screen = renderComponent({
        defaultShow: true,
        id: undefined,
      });

      const slideout = await screen.findByRole(TEST_ROLE);
      expect(slideout).toBeInTheDocument();

      act(() => {
        slideout.focus();
      });

      await waitFor(() => expect(slideout).toHaveFocus());

      await userEvent.keyboard('{Escape}');

      await waitForElementToBeRemoved(() => screen.queryByRole(TEST_ROLE));

      expect(screen.queryByRole(TEST_ROLE)).not.toBeInTheDocument();
    });

    it('does not close when clicking on a component outside the slideout', async () => {
      const screen = render(
        <>
          <IressButton>Button outside slideout</IressButton>
          <IressSlideout defaultShow role={TEST_ROLE} data-testid={TEST_ID}>
            Content inside slideout
          </IressSlideout>
        </>,
      );

      const outsideButton = screen.getByRole('button', {
        name: 'Button outside slideout',
      });
      const slideout = await screen.findByRole(TEST_ROLE);

      await waitFor(() => expect(slideout).toHaveFocus());

      await userEvent.click(outsideButton);

      await waitFor(() => expect(outsideButton).toHaveFocus());
      expect(slideout).not.toHaveFocus();
      expect(slideout).not.toHaveFocus();

      expect(slideout).toBeInTheDocument();
    });

    it('does not close when clicking on a component outside the slideout', async () => {
      const screen = render(
        <>
          <IressButton>Button outside slideout</IressButton>
          <IressSlideout defaultShow role={TEST_ROLE} data-testid={TEST_ID}>
            Content inside slideout
          </IressSlideout>
        </>,
      );

      const button = screen.getByRole('button', {
        name: 'Button outside slideout',
      });
      const slideout = await screen.findByRole(TEST_ROLE);

      await waitFor(() => expect(slideout).toHaveFocus());

      await userEvent.click(button);

      await waitFor(() => expect(slideout).not.toHaveFocus());

      expect(slideout).toBeInTheDocument();
    });

    it('does not close when clicking on a component outside the slideout', async () => {
      const screen = render(
        <>
          <IressButton>Button outside slideout</IressButton>
          <IressSlideout defaultShow role={TEST_ROLE} data-testid={TEST_ID}>
            Content inside slideout
          </IressSlideout>
        </>,
      );

      const button = screen.getByRole('button', {
        name: 'Button outside slideout',
      });
      const slideout = await screen.findByRole(TEST_ROLE);

      await waitFor(() => expect(slideout).toHaveFocus());

      await userEvent.click(button);

      await waitFor(() => expect(slideout).not.toHaveFocus());

      expect(slideout).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('closeText', () => {
      it('replaces default close button text', async () => {
        const screen = renderComponent({
          closeText: 'Exit',
          show: true,
        });

        const closeButton = await screen.findByRole('button', { name: 'Exit' });
        expect(closeButton).toBeInTheDocument();
      });
    });

    describe('container', () => {
      it('changes where the slideout is rendered', async () => {
        const container = document.createElement('div');
        renderComponent({
          defaultShow: true,
          container,
        });

        await waitFor(() => expect(container.children).toHaveLength(1));
        expect(container.querySelector(`[role="${TEST_ROLE}"]`)).not.toBeNull();
      });

      it('changes where the slideout is rendered, if using a provider', async () => {
        const container = document.createElement('div');
        renderComponentInProvider(
          {
            defaultShow: true,
          },
          {
            container,
          },
        );

        await waitFor(() => expect(container.children).toHaveLength(1));
        expect(container.querySelector(`[role="${TEST_ROLE}"]`)).not.toBeNull();
      });
    });

    describe('defaultShow', () => {
      it('shows the modal by default', async () => {
        const screen = renderComponent({
          defaultShow: true,
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).toBeInTheDocument();
      });
    });

    describe('onStatus', () => {
      it('is called with the correct status values during slideout transitions', async () => {
        const onStatus = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onStatus,
        });

        // Wait for the slideout to be mounted and open
        const slideout = await screen.findByRole(TEST_ROLE);
        await waitFor(() => expect(slideout).toHaveFocus());

        // Verify that onStatus was called with the expected status values
        expect(onStatus).toHaveBeenCalledWith('initial');
        expect(onStatus).toHaveBeenCalledWith('open');

        // Close the slideout
        const closeButton = await screen.findByRole('button');
        await userEvent.click(closeButton);

        // Wait for the slideout to be removed
        await waitForElementToBeRemoved(slideout);

        // Verify that onStatus was called with 'close' and 'unmounted' status
        expect(onStatus).toHaveBeenCalledWith('close');
        expect(onStatus).toHaveBeenCalledWith('unmounted');
      });

      it('is called with status changes when slideout is controlled', async () => {
        const onStatus = vi.fn();

        const screen = renderComponent({
          show: true,
          onStatus,
        });

        // Wait for the slideout to be mounted and open
        const slideout = await screen.findByRole(TEST_ROLE);
        await waitFor(() => expect(slideout).toHaveFocus());

        // Verify initial status calls
        expect(onStatus).toHaveBeenCalledWith('initial');
        expect(onStatus).toHaveBeenCalledWith('open');

        // Re-render with show = false
        renderComponent(
          {
            show: false,
            onStatus,
          },
          { renderFn: screen.rerender as never },
        );

        // Wait for the slideout to be removed
        await waitForElementToBeRemoved(slideout);

        // Verify that onStatus was called with 'close' and 'unmounted' status
        expect(onStatus).toHaveBeenCalledWith('close');
        expect(onStatus).toHaveBeenCalledWith('unmounted');
      });
    });

    describe('eleToPush', () => {
      it('pushes the element by query selector', async () => {
        const screen = render(
          <div>
            <div data-testid="push-element" />
            <IressSlideout
              eleToPush="[data-testid='push-element']"
              defaultShow
              data-testid={TEST_ID}
              mode="push"
            />
          </div>,
        );

        const pushElement = screen.getByTestId('push-element');
        const closeButton = await screen.findByRole('button');

        expect(pushElement).toBeInTheDocument();
        expect(pushElement).toHaveClass(GlobalCSSClass.SlideoutPushElement);

        await waitFor(() => {
          expect(pushElement.style.getPropertyValue('margin-inline-end')).toBe(
            'var(--sizes-overlay\\.sm, 375px)',
          );
        });

        await userEvent.click(closeButton);

        await waitFor(() =>
          expect(
            pushElement.style.getPropertyValue('margin-inline-end'),
          ).not.toBe(token.var('sizes.overlay.sm')),
        );
      });

      it('pushes the element by HTMLElement', async () => {
        const eleToPush = document.createElement('div');

        const screen = renderComponent({
          defaultShow: true,
          eleToPush,
          mode: 'push',
        });

        await screen.findByTestId(TEST_ID);

        expect(eleToPush).toHaveClass(GlobalCSSClass.SlideoutPushElement);
      });

      it('pushes the element by ref', async () => {
        const eleToPush = { current: document.createElement('div') };

        const screen = renderComponent({
          defaultShow: true,
          eleToPush,
          mode: 'push',
        });

        await screen.findByTestId(TEST_ID);

        expect(eleToPush.current).toHaveClass(
          GlobalCSSClass.SlideoutPushElement,
        );
      });

      // TODO: Fix WAF-863 with this new hook, so that the push element remains open when closing a slideout and opening another one
      it.skip('does not remove push element when opening a slideout after closing another one', async () => {
        const eleToPush = { current: document.createElement('div') };

        const SlideoutTransitions = () => {
          const [show1, setShow1] = useState(true);
          const [show2, setShow2] = useState(false);

          return (
            <>
              <IressButton
                onClick={() => {
                  setShow1(false);
                  setShow2(true);
                }}
              >
                Close slideout 1 and open slideout 2
              </IressButton>
              <IressSlideout
                show={show1}
                onShowChange={setShow1}
                mode="push"
                eleToPush={eleToPush}
                aria-label="Slideout 1"
              >
                Slideout 1
              </IressSlideout>
              <IressSlideout
                show={show2}
                onShowChange={setShow2}
                mode="push"
                eleToPush={eleToPush}
                aria-label="Slideout 2"
              >
                Slideout 2
              </IressSlideout>
            </>
          );
        };

        const screen = render(<SlideoutTransitions />);

        // Slideout 1 is open and slideout 2 is closed
        const slideout1 = await screen.findByLabelText('Slideout 1');
        expect(slideout1).toBeInTheDocument();
        expect(screen.queryByLabelText('Slideout 2')).not.toBeInTheDocument();

        // Wait for the slideout 1 to be fully open
        await waitFor(() => expect(slideout1).toHaveFocus());

        // Element should be pushed
        expect(eleToPush.current).toHaveClass(GlobalCSSClass.SlideoutOpen);

        // Click the button to close slideout 1 and open slideout 2
        const button = screen.getByRole('button', {
          name: 'Close slideout 1 and open slideout 2',
        });
        await userEvent.click(button);

        // Slideout 1 should be closed
        await waitForElementToBeRemoved(slideout1);

        // Slideout 2 should be open
        const slideout2 = await screen.findByLabelText('Slideout 2');
        expect(slideout2).toBeInTheDocument();
        expect(slideout2).toHaveFocus();

        // Element should still be pushed
        expect(eleToPush.current).toHaveClass(GlobalCSSClass.SlideoutOpen);
      });
    });

    describe('footer', () => {
      it('renders the content into the footer slot', async () => {
        const screen = renderComponent({
          defaultShow: true,
          footer: 'Footer',
        });

        const footer = await screen.findByText('Footer');
        expect(footer).toHaveClass(slideoutStyles({}).footer!);
      });
    });

    describe('heading', () => {
      it('renders a string heading', async () => {
        const screen = renderComponent({
          defaultShow: true,
          heading: 'Test label',
        });

        const dialog = await screen.findByRole(TEST_ROLE, {
          name: 'Test label',
        });
        expect(dialog).toBeInTheDocument();
      });

      it('renders an element directly, with the id', async () => {
        const screen = renderComponent({
          defaultShow: true,
          heading: <h3>Heading label</h3>,
        });

        const dialog = await screen.findByRole(TEST_ROLE, {
          name: 'Heading label',
        });
        expect(dialog).toBeInTheDocument();
      });
    });

    describe('mode', () => {
      it('uses overlay by default', async () => {
        const screen = renderComponent({
          defaultShow: true,
          mode: 'overlay',
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).not.toHaveClass(
          slideoutStyles({ mode: 'push' }).root!,
        );
      });

      it('does not allow push without an eleToPush', async () => {
        const screen = renderComponent({
          defaultShow: true,
          mode: 'push',
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        await waitFor(() => expect(slideout).toHaveFocus());
        expect(slideout).toHaveClass(
          slideoutStyles({ mode: 'overlay', status: 'open' }).root!,
        );
      });

      it('adds push class when eleToPush is available', async () => {
        const eleToPush = document.createElement('div');

        const screen = renderComponent({
          defaultShow: true,
          mode: 'push',
          eleToPush,
        });

        const slideout = await screen.findByRole(TEST_ROLE);

        // Need to wait for transition to finish
        await waitFor(() => {
          expect(slideout).toHaveClass(
            slideoutStyles({ mode: 'push', status: 'open' }).root!,
          );
        });
      });
    });

    describe('onShowChange', () => {
      it('is called when the close button is clicked', async () => {
        const onShowChange = vi.fn();

        const screen = renderComponent({
          show: true,
          onShowChange,
        });

        const closeButton = await screen.findByRole('button');
        await userEvent.click(closeButton);

        expect(onShowChange).toHaveBeenCalledWith(false, undefined);
      });
    });

    describe('onEntered', () => {
      it('is called when the slideout is opened', async () => {
        const onEntered = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onEntered,
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        await waitFor(() => expect(slideout).toHaveFocus());

        // Fire transition end event to simulate CSS transition completion
        fireEvent.transitionEnd(slideout, {
          propertyName: 'right',
        });

        await waitFor(() => expect(onEntered).toHaveBeenCalledOnce());
      });
    });

    describe('onExited', () => {
      it('is called when the slideout is closed via the button', async () => {
        const onExited = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onExited,
          id: undefined,
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).toBeInTheDocument();

        const closeButton = await screen.findByRole('button', {
          name: 'Close',
        });
        await userEvent.click(closeButton);

        // Fire transition end event to simulate CSS transition completion
        fireEvent.transitionEnd(slideout, {
          propertyName: 'right',
        });

        await waitFor(() => expect(onExited).toHaveBeenCalledOnce());
      });

      it('is called when the slideout is closed via escape key', async () => {
        const onExited = vi.fn();

        const screen = renderComponent({
          defaultShow: true,
          onExited,
          id: undefined,
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).toBeInTheDocument();

        act(() => {
          slideout.focus();
        });
        await waitFor(() => expect(slideout).toHaveFocus());

        await userEvent.keyboard('{Escape}');

        // Fire transition end event to simulate CSS transition completion
        fireEvent.transitionEnd(slideout, {
          propertyName: 'right',
        });

        await waitFor(() => expect(onExited).toHaveBeenCalledOnce());
      });
    });

    describe('padding', () => {
      it('changes the padding of the content and footer', async () => {
        const screen = renderComponent({
          children: 'Content',
          defaultShow: true,
          p: 'none',
          footer: 'Footer',
        });

        const content = await screen.findByText('Content');
        const footer = await screen.findByText('Footer');

        expect(content).toHaveClass(slideoutStyles({}).content!);
        expect(footer).toHaveClass(slideoutStyles({}).footer!);
      });
    });

    describe('position', () => {
      it('changes the position of the slideout if provided', async () => {
        const screen = renderComponent({
          show: true,
          position: 'left',
        });

        const slideout = await screen.findByRole(TEST_ROLE);

        await waitFor(() => {
          expect(slideout).toHaveClass(
            slideoutStyles({ position: 'left', status: 'open' }).root!,
          );
        });
      });
    });

    describe('show', () => {
      it('opens the slideout if set to true', async () => {
        const screen = renderComponent({
          show: true,
        });

        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).toBeInTheDocument();
      });
    });

    describe('size', () => {
      it('changes the size of the slideout if provided', async () => {
        const screen = renderComponent({
          show: true,
          size: 'md',
        });

        const slideout = await screen.findByRole(TEST_ROLE);

        // Need to wait for transition to finish
        await waitFor(() => {
          expect(slideout).toHaveClass(
            slideoutStyles({ size: 'md', status: 'open' }).root!,
          );
        });
      });

      it('updates push element size classes when size prop changes while slideout is open', async () => {
        const eleToPush = document.createElement('div');

        const SizeChangeTest = () => {
          const [size, setSize] = useState<IressSlideoutProps['size']>('md');

          return (
            <>
              <button onClick={() => setSize('sm')}>Change to small</button>
              <IressSlideout
                show={true}
                mode="push"
                eleToPush={eleToPush}
                size={size}
                data-testid={TEST_ID}
                role={TEST_ROLE}
              >
                Slideout content
              </IressSlideout>
            </>
          );
        };

        const screen = render(<SizeChangeTest />);

        // Wait for slideout to be open
        const slideout = await screen.findByRole(TEST_ROLE);
        expect(slideout).toBeInTheDocument();

        // Wait for the slideout to be fully open and push element classes to be applied
        await waitFor(() => {
          expect(eleToPush).toHaveClass(
            GlobalCSSClass.SlideoutPushElement,
            GlobalCSSClass.SlideoutOpen,
          );

          // Checks if the element is sized correctly
          expect(eleToPush.style.getPropertyValue('margin-inline-end')).toBe(
            'var(--sizes-overlay\\.md, 640px)',
          );
        });

        // Change size from 'md' to 'sm'
        const changeButton = screen.getByRole('button', {
          name: 'Change to small',
        });
        await userEvent.click(changeButton);

        // Verify that the push element classes are updated
        await waitFor(() => {
          expect(eleToPush).toHaveClass(
            GlobalCSSClass.SlideoutPushElement,
            GlobalCSSClass.SlideoutOpen,
          );

          // Checks if the element is sized correctly
          expect(
            eleToPush.style.getPropertyValue('margin-inline-end'),
          ).not.toBe('var(--sizes-overlay\\.md, 640px)');
        });
      });
    });
  });

  describe('warnings', () => {
    it('logs a warning when both provider and show prop is used', async () => {
      const screen = render(<AppWithSlideoutProvider id={TEST_ID} />);

      await userEvent.click(
        screen.getByRole('button', {
          name: 'Show slideout using provider',
          hidden: true,
        }),
      );

      screen.rerender(<AppWithSlideoutProvider id={TEST_ID} show />);

      await waitFor(() => expect(idsLogger).toHaveBeenCalledTimes(1));
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues (hidden)', async () => {
      const { container } = render(
        <IressSlideout data-testid="test-component" className="test-class">
          Test text
        </IressSlideout>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('does not have basic accessibility issues (shown)', async () => {
      const screen = renderComponent({
        show: true,
      });
      await screen.findByRole(TEST_ROLE);

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const slideout = await screen.findByRole(TEST_ROLE);
      expect(slideout).toBeInTheDocument();

      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
