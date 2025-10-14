import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressMultiCombobox, IressMultiComboboxProps } from '..';
import userEvent from '@testing-library/user-event';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import styles from '../Combobox.module.scss';

const TEST_ID = 'test-component';

const renderCombobox = (props: Partial<IressMultiComboboxProps> = {}) => {
  return render(
    <IressMultiCombobox
      {...props}
      data-testid={props['data-testid'] ?? TEST_ID}
      debounceThreshold={props.debounceThreshold ?? 0}
      options={props.options ?? MOCK_LABEL_VALUE_META}
    />,
  );
};

describe('IressMultiCombobox', () => {
  it('should render the component with the correct text and classes', async () => {
    renderCombobox({
      className: 'test-class',
    });

    const combobox = screen.getByTestId(TEST_ID);
    expect(combobox).toBeInTheDocument();
    expect(combobox).toHaveClass('test-class');

    const popover = screen.getByTestId('test-component__popover');
    expect(popover).toBeInTheDocument();

    const inputWrapper = screen.getByTestId('test-component__input');
    expect(inputWrapper).toBeInTheDocument();

    const input = screen.getByRole('combobox');
    const inputTestId = screen.getByTestId(
      'test-component__input__input__input',
    );

    expect(input).toStrictEqual(inputTestId);

    const popoverContent = screen.getByTestId(
      'test-component__popover__content',
    );
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).toHaveClass(styles.popoverContent);
    expect(popoverContent).not.toBeVisible();

    await userEvent.type(input, 'opt');

    const options = await screen.findAllByRole('option');
    const listbox = screen.getByRole('listbox');
    const listboxTestId = screen.getByTestId('test-component__menu');

    expect(listbox).toStrictEqual(listboxTestId);
    expect(listbox).toHaveClass(styles.optionList);
    expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);

    await userEvent.type(input, '{backspace}{backspace}{backspace}');

    expect(listbox).not.toBeVisible();
  });

  describe('props', () => {
    describe('initialOptions', () => {
      it('opens popover on focus when initialOptions is set', async () => {
        renderCombobox({
          initialOptions: MOCK_LABEL_VALUE_META,
        });

        const input = screen.getByRole('combobox');
        await userEvent.click(input);

        const options = await screen.findAllByRole('option');

        expect(options[0]).toBeVisible();
      });
    });

    describe('noResultsText', () => {
      it('shows no results text if set, and there are no results', async () => {
        renderCombobox({
          noResultsText: 'Unavailable',
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'not found');

        const notFound = await screen.findByText('Unavailable');

        expect(notFound).toBeVisible();
      });
    });

    describe('onChange', () => {
      it('emits a value when it is changed using the listbox', async () => {
        const onChange = vi.fn();

        renderCombobox({
          onChange,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'o');

        await userEvent.click((await screen.findAllByRole('option'))[0]);

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[2], // The final value includes the formatted label
          }),
        ]);

        await userEvent.click((await screen.findAllByRole('option'))[1]);

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[2], // The final value includes the formatted label
          }),
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[4], // The final value includes the formatted label
          }),
        ]);
      });

      it('emits a value when it is changed using arrow keys', async () => {
        const onChange = vi.fn();

        renderCombobox({
          onChange,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'o');

        await screen.findAllByRole('option');

        await userEvent.type(input, '{ArrowDown}{Enter}');

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[2], // The final value includes the formatted label
          }),
        ]);

        await userEvent.type(input, '{ArrowDown}{Enter}');

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[2], // The final value includes the formatted label
          }),
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[4], // The final value includes the formatted label
          }),
        ]);

        await userEvent.type(input, '{Enter}');

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), [
          expect.objectContaining({
            ...MOCK_LABEL_VALUE_META[2], // The final value includes the formatted label
          }),
        ]);
      });

      it('emits a value when a tag is deleted', async () => {
        const onChange = vi.fn();

        renderCombobox({
          onChange,
          value: [MOCK_LABEL_VALUE_META[0]],
        });

        const clearButton = screen.getByRole('button', {
          name: 'Delete Option 1',
        });
        await userEvent.click(clearButton);

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), []);
      });

      it('emits a value when a tag set by tagOptionLimit is deleted', async () => {
        const onChange = vi.fn();

        renderCombobox({
          onChange,
          value: [MOCK_LABEL_VALUE_META[0], MOCK_LABEL_VALUE_META[1]],
          multiOptionTagLimit: 1,
        });

        const clearButton = screen.getByRole('button', { name: 'Delete' });
        await userEvent.click(clearButton);

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), []);
      });
    });

    describe('onClear', () => {
      it('emits a value when the input is cleared using the clear button', async () => {
        const onClear = vi.fn();

        renderCombobox({
          onClear,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'o');

        const clearButton = screen.getByRole('button', { name: 'Clear' });
        await userEvent.click(clearButton);

        expect(onClear).toHaveBeenCalledOnce();
      });
    });

    describe('popoverProps', () => {
      it('renders the prepend and append nodes', async () => {
        renderCombobox({
          popoverProps: {
            append: <span>There</span>,
            prepend: <span>Hello</span>,
          },
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'o');

        await screen.findAllByRole('option');

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('There')).toBeInTheDocument();
      });
    });

    describe('readonly', () => {
      it('renders a hidden input with the correct value', () => {
        const { container } = renderCombobox({
          defaultValue: MOCK_LABEL_VALUE_META,
          readOnly: true,
        });
        const input = container.querySelector(
          `input[value="${MOCK_LABEL_VALUE_META.map((item) => item.value).join(',')}"]`,
        );

        expect(
          screen.getByText(
            MOCK_LABEL_VALUE_META.map((item) => item.label).join(', '),
          ),
        ).toBeInTheDocument();
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <label htmlFor={TEST_ID}>Test</label>
          <IressMultiCombobox
            data-testid="test-component"
            className="test-class"
            id={TEST_ID}
            options={MOCK_LABEL_VALUE_META}
          />
        </>,
      );

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
