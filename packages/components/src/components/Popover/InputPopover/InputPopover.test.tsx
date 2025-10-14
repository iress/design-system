import { RenderResult, act, render, screen } from '@testing-library/react';
import { IressInputPopover, IressInputPopoverProps } from './InputPopover';
import { GlobalCSSClass, IressInput, IressMenu, IressMenuItem } from '@/main';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { popover } from '../Popover.styles';

const TEST_ID = 'test-component';

function renderComponent(
  { children, ...restProps }: Partial<IressInputPopoverProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressInputPopover
      {...restProps}
      activator={restProps?.activator ?? <IressInput />}
      data-testid={TEST_ID}
    >
      {children ?? TEST_ID}
    </IressInputPopover>,
  );
}

describe('IressInputPopover', () => {
  it('renders the component with the correct attributes and classes (hidden)', () => {
    renderComponent({ className: 'test-class' });
    const classes = popover({
      hasInputActivator: true,
      matchActivatorWidth: true,
    });
    const activatorSelector = `.${String(classes.activator ?? '').replace(' ', '.')}`;

    const popoverElement = screen.getByTestId(TEST_ID);
    expect(popoverElement).toHaveClass(
      classes.root!,
      'test-class',
      GlobalCSSClass.InputPopover,
    );

    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();
    expect(combobox).toHaveAttribute('aria-autocomplete', 'list');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveAttribute('aria-haspopup', 'listbox');
    expect(combobox).toHaveAttribute('role', 'combobox');
    expect(combobox.closest(activatorSelector)).not.toBeNull();

    const content = screen.getByText(TEST_ID);
    expect(content).not.toBeVisible();
    expect(content).toHaveClass(classes.content!);
  });

  it('renders the component with the correct attributes and classes (shown)', async () => {
    renderComponent();

    const combobox = screen.getByRole('combobox');
    const content = screen.getByText(TEST_ID);

    expect(combobox).toBeInTheDocument();

    await userEvent.click(combobox);
    expect(content).not.toBeVisible();

    await userEvent.keyboard('Test text');

    expect(combobox).toHaveAttribute('aria-expanded', 'true');
    expect(combobox).toHaveAttribute('aria-controls', content.id);

    expect(content).toBeVisible();

    expect(combobox).toHaveFocus();
    expect(content).not.toHaveFocus();
  });

  it('renders the correct data-testids', () => {
    renderComponent();

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__activator`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__content`)).toBeInTheDocument();
  });

  describe('interactions', () => {
    it('closes when activator is empty', async () => {
      renderComponent();

      const activator = screen.getByRole('combobox');
      const content = screen.getByText(TEST_ID);

      await userEvent.type(activator, 'te');

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.clear(activator);

      expect(activator).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeVisible();
    });

    it('closes when user clicks outside the activator', async () => {
      renderComponent();

      const activator = screen.getByRole('combobox');
      const content = screen.getByText(TEST_ID);

      await userEvent.type(activator, 'te');

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.click(document.body);

      expect(activator).toHaveAttribute('aria-expanded', 'false');
      expect(content).not.toBeVisible();
    });

    it('closes when the activator loses focus', async () => {
      render(
        <>
          <IressInputPopover activator={<IressInput />}>
            Content
          </IressInputPopover>
          <input />
        </>,
      );

      const activator = screen.getByRole('combobox');
      const content = screen.getByText('Content');

      await userEvent.type(activator, 'Test');

      expect(activator).toHaveAttribute('aria-expanded', 'true');
      expect(content).toBeVisible();

      await userEvent.tab(); // tab away

      expect(content).not.toBeVisible();
    });
  });

  describe('props', () => {
    describe('activator', () => {
      it('renders a custom activator', async () => {
        renderComponent({
          activator: <input data-testid="activator" />,
        });

        const activator = screen.getByTestId('activator');
        expect(activator).toBeInTheDocument();
        expect(activator).toHaveAttribute('aria-expanded', 'false');

        await userEvent.type(activator, 'Test');

        expect(activator).toHaveAttribute('aria-expanded', 'true');
      });
    });

    describe('minLength', () => {
      it('opens the popover on focus and when it has no value if minLength is 0', async () => {
        renderComponent({
          minLength: 0,
        });

        const combobox = screen.getByRole('combobox');
        const content = screen.getByText(TEST_ID);

        await userEvent.click(combobox);
        expect(content).toBeVisible();

        // Type some text, it should still be visible
        await userEvent.type(combobox, 'Te');
        expect(content).toBeVisible();

        // Clear the input, it should still be visible
        await userEvent.type(combobox, '{Backspace}{Backspace}');
        expect(content).toBeVisible();
      });

      it('opens the popover when the input has the minimum length', async () => {
        renderComponent({
          minLength: 3,
        });

        const combobox = screen.getByRole('combobox');
        const content = screen.getByText(TEST_ID);

        await userEvent.type(combobox, 'Te');
        expect(content).not.toBeVisible();

        await userEvent.type(combobox, 'st');
        expect(content).toBeVisible();
      });

      it('uses the input minLength if available', async () => {
        renderComponent({
          activator: <IressInput minLength={20} />,
          minLength: undefined,
        });

        const combobox = screen.getByRole('combobox');
        const content = screen.getByText(TEST_ID);

        await userEvent.type(combobox, 'Te');
        expect(content).not.toBeVisible();

        await userEvent.type(combobox, 'st');
        expect(content).not.toBeVisible();
      });
    });
  });

  describe('accessibility', () => {
    it('does not have basic accessibility issues (hidden)', async () => {
      const { container } = render(
        <>
          <label htmlFor={TEST_ID}>{TEST_ID}</label>
          <IressInputPopover activator={<IressInput id={TEST_ID} />}>
            {TEST_ID}
          </IressInputPopover>
        </>,
      );

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('does not have basic accessibility issues (shown)', async () => {
      const { container } = render(
        <>
          <label htmlFor={TEST_ID}>{TEST_ID}</label>
          <IressInputPopover activator={<IressInput id={TEST_ID} />} show>
            <IressMenu aria-label="Selectable listbox">
              <IressMenuItem>Test</IressMenuItem>
            </IressMenu>
          </IressInputPopover>
        </>,
      );

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      // Remove the floating ui guards to pass axe tests
      // TODO: Needs to be fixed in floating-ui: https://github.com/floating-ui/floating-ui/issues/2823
      container
        .querySelectorAll('[data-floating-ui-focus-guard]')
        .forEach((el) => {
          el.remove();
        });

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
