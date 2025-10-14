import { act, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import styles from './Filter.module.scss';
import { IressFilter } from './Filter';
import { IressFilterProps } from './Filter.types';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Label';

const renderFilter = (props: Partial<IressFilterProps> = {}) => {
  return render(
    <IressFilter
      {...props}
      data-testid={props['data-testid'] ?? TEST_ID}
      debounceThreshold={props.debounceThreshold ?? 0}
      label={TEST_LABEL}
      options={props.options ?? MOCK_LABEL_VALUE_META}
    />,
  );
};

describe('IressFilter', () => {
  it('should render the component with the correct text and classes', async () => {
    renderFilter({
      className: 'test-class',
    });

    const filter = screen.getByTestId(TEST_ID);
    expect(filter).toBeInTheDocument();
    expect(filter).toHaveClass('test-class');

    const activator = screen.getByRole('button', { name: TEST_LABEL });
    const activatorTestId = screen.getByTestId(
      'test-component__activator-button__button',
    );
    expect(activator).toEqual(activatorTestId);

    const popover = screen.getByTestId('test-component__popover');
    expect(popover).toBeInTheDocument();

    const popoverContent = screen.getByTestId(
      'test-component__popover__content',
    );
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();

    await userEvent.click(activator);

    const options = await screen.findAllByRole('option');
    const listbox = screen.getByRole('listbox');
    const listboxTestId = screen.getByTestId('test-component__menu');

    expect(listbox).toStrictEqual(listboxTestId);
    expect(listbox).toBeVisible();
    expect(listbox).toHaveClass(styles.optionList);
    expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);

    await userEvent.click(activator);

    expect(listbox).not.toBeVisible();
  });

  describe('props', () => {
    describe('inputProps', () => {
      it('renders the input with specific props', async () => {
        renderFilter({
          inputProps: {
            append: 'There',
            placeholder: 'May the force be with you',
            prepend: 'Hello',
          },
          searchable: true,
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        await screen.findAllByRole('option');

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('There')).toBeInTheDocument();
        expect(
          screen.getByPlaceholderText('May the force be with you'),
        ).toBeInTheDocument();
      });
    });

    describe('multiSelect', () => {
      it('allows multiple options to be selected from the filter', async () => {
        const onChange = vi.fn();

        renderFilter({
          multiSelect: true,
          onChange,
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        await userEvent.click((await screen.findAllByRole('option'))[0]);

        expect(onChange).toBeCalledWith([MOCK_LABEL_VALUE_META[0]]);

        await userEvent.click((await screen.findAllByRole('option'))[1]);

        expect(onChange).toBeCalledWith([
          MOCK_LABEL_VALUE_META[0],
          MOCK_LABEL_VALUE_META[1],
        ]);
      });
    });

    describe('onChange', () => {
      it('emits a value when it is changed using the listbox', async () => {
        const onChange = vi.fn();

        renderFilter({
          onChange,
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        const options = await screen.findAllByRole('option');
        await userEvent.click(options[0]);

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[0], // The final value includes the formatted label
          }),
        );
      });

      it('emits a value when it is changed using arrow keys', async () => {
        const onChange = vi.fn();

        renderFilter({
          onChange,
        });

        await userEvent.tab(); // focus on activator
        await userEvent.keyboard('{Enter}');

        const options = await screen.findAllByRole('option');

        await waitFor(() => expect(options[0]).toHaveFocus());

        await userEvent.keyboard('{ArrowDown}');

        await waitFor(() => expect(options[1]).toHaveFocus());

        await userEvent.keyboard('{Enter}');

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[1], // The final value includes the formatted label
          }),
        );
      });
    });

    describe('onReset', () => {
      it('emits a value when the user clicks the reset button', async () => {
        const onReset = vi.fn();

        renderFilter({
          onReset,
          visibleResetButton: true,
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        const clearButton = screen.getByRole('button', {
          name: 'Reset filter',
        });
        await userEvent.click(clearButton);

        expect(onReset).toHaveBeenCalledOnce();
      });
    });

    describe('popoverProps', () => {
      it('renders the prepend and append nodes', async () => {
        renderFilter({
          popoverProps: {
            append: <span>There</span>,
            prepend: <span>Hello</span>,
          },
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        await screen.findAllByRole('option');

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('There')).toBeInTheDocument();
      });
    });

    describe('searchable', () => {
      it('renders a searchbox to search the options', async () => {
        renderFilter({
          searchable: true,
        });

        const activator = screen.getByRole('button', { name: TEST_LABEL });
        await userEvent.click(activator);

        const searchbox = await screen.findByRole('searchbox');
        expect(searchbox).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderFilter();

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
