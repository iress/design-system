import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressAutocomplete, IressAutocompleteProps } from '.';
import userEvent from '@testing-library/user-event';
import {
  MOCK_LABEL_VALUE_META,
  mockAsyncSearchLabelValues,
} from '@/mocks/generateLabelValues';

const TEST_ID = 'test-component';

const renderAutocomplete = (props: IressAutocompleteProps = {}) => {
  return render(
    <IressAutocomplete
      {...props}
      data-testid={props['data-testid'] ?? TEST_ID}
      debounceThreshold={props.debounceThreshold ?? 0}
      options={props.options ?? MOCK_LABEL_VALUE_META}
    />,
  );
};

describe('IressAutocomplete', () => {
  it('should render the component with the correct text', async () => {
    renderAutocomplete({
      className: 'test-class',
    });

    const popover = screen.getByTestId(TEST_ID);
    expect(popover).toBeInTheDocument();
    expect(popover).toHaveClass('test-class');

    const inputWrapper = screen.getByTestId('test-component__input');
    expect(inputWrapper).toBeInTheDocument();

    const input = screen.getByRole('combobox');
    const inputTestId = screen.getByTestId('test-component__input__input');
    expect(input).toStrictEqual(inputTestId);

    const popoverContent = screen.getByTestId('test-component__content');
    expect(popoverContent).toBeInTheDocument();
    expect(popoverContent).not.toBeVisible();

    await userEvent.type(input, 'opt');

    const options = await screen.findAllByRole('option');
    const listbox = screen.getByRole('listbox');
    const listboxTestId = screen.getByTestId('test-component__menu');

    expect(listbox).toStrictEqual(listboxTestId);
    expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);

    await userEvent.type(input, '{backspace}{backspace}{backspace}');

    expect(listbox).not.toBeVisible();
  });

  describe('props', () => {
    describe('alwaysShowOnFocus', () => {
      it('does not open the popover when returning focus to the input and there is a value', async () => {
        renderAutocomplete({
          options: () => mockAsyncSearchLabelValues(MOCK_LABEL_VALUE_META),
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);

        await userEvent.tab(); // tab away

        // test if clicking on the input does not open the popover
        await userEvent.click(input);
        expect(options[0]).not.toBeVisible();

        // typing in the input should open the popover
        await userEvent.keyboard('i');
        const newOptions = await screen.findAllByRole('option');
        expect(newOptions[0]).toBeVisible();
      });

      it('opens the popover when returning focus to the input and there is a value', async () => {
        renderAutocomplete({
          alwaysShowOnFocus: true,
          options: () => mockAsyncSearchLabelValues(MOCK_LABEL_VALUE_META),
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);

        await userEvent.tab(); // tab away

        // test if clicking on the input opens the popover
        await userEvent.click(input);
        expect(options[0]).toBeVisible();
      });
    });

    describe('initialOptions', () => {
      it('opens popover on focus when initialOptions is set', async () => {
        renderAutocomplete({
          initialOptions: MOCK_LABEL_VALUE_META,
        });

        const input = screen.getByRole('combobox');
        await userEvent.click(input);

        const options = await screen.findAllByRole('option');

        expect(options[0]).toBeVisible();
      });
    });

    describe('errorText', () => {
      it('shows error text when there is an error', async () => {
        renderAutocomplete({
          options: () => Promise.reject(new Error('Error')),
          errorText: 'Noooooo!!!!',
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'n');

        const error = await screen.findByText('Noooooo!!!!');

        expect(error).toBeVisible();
      });
    });

    describe('noResultsText', () => {
      it('shows no results text if set, and there are no results', async () => {
        renderAutocomplete({
          noResultsText: 'Unavailable',
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'not found');

        const notFound = await screen.findByText('Unavailable');

        expect(notFound).toBeInTheDocument();
      });

      it('should render React nodes when provided', async () => {
        renderAutocomplete({
          noResultsText: <p>No results found</p>,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'nonexistent');

        const notFound = await screen.findByText('No results found');

        expect(notFound).toBeInTheDocument();
      });
    });

    describe('onChange', () => {
      it('emits a value when it is changed using the input', async () => {
        const onChange = vi.fn();

        renderAutocomplete({
          onChange,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        expect(onChange).toHaveBeenLastCalledWith(expect.anything(), 'opt');
      });

      it('emits a value when it is changed using the listbox', async () => {
        const onChange = vi.fn();

        renderAutocomplete({
          onChange,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        const options = await screen.findAllByRole('option');
        await userEvent.click(options[0]);

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: {
              value: 'Option 3',
            },
          }),
          'Option 3',
          expect.objectContaining(MOCK_LABEL_VALUE_META[2]),
        );
      });

      it('emits a value when it is changed using arrow keys', async () => {
        const onChange = vi.fn();

        renderAutocomplete({
          onChange,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        await screen.findAllByRole('option');

        await userEvent.type(input, '{ArrowDown}{Enter}');

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: {
              value: 'Option 3',
            },
          }),
          'Option 3',
          expect.objectContaining(MOCK_LABEL_VALUE_META[2]),
        );
      });
    });

    describe('onClear', () => {
      it('emits a value when the input is cleared using the clear button', async () => {
        const onClear = vi.fn();

        renderAutocomplete({
          onClear,
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        const clearButton = screen.getByRole('button', { name: 'Clear' });
        await userEvent.click(clearButton);

        expect(onClear).toHaveBeenCalledOnce();
      });
    });

    describe('options', () => {
      it('shows asynchronous options in the popover', async () => {
        renderAutocomplete({
          options: () => mockAsyncSearchLabelValues(MOCK_LABEL_VALUE_META),
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        const options = await screen.findAllByRole('option');

        expect(options).toHaveLength(MOCK_LABEL_VALUE_META.length);
      });
    });

    describe('popoverProps', () => {
      it('renders the prepend and append nodes', async () => {
        renderAutocomplete({
          popoverProps: {
            append: <span>There</span>,
            prepend: <span>Hello</span>,
          },
        });

        const input = screen.getByRole('combobox');
        await userEvent.type(input, 'opt');

        await screen.findAllByRole('option');

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('There')).toBeInTheDocument();
      });

      it('renders popover classes and styles', () => {
        renderAutocomplete({
          popoverProps: {
            className: 'popover-class',
            contentClassName: 'popover-content-class',
            style: {
              color: 'red',
            },
          },
        });

        const popover = screen.getByTestId(TEST_ID);
        expect(popover).toHaveClass('popover-class');
        expect(popover).toHaveStyle({
          color: 'rgb(255, 0, 0)',
        });

        const popoverContent = screen.getByTestId(`${TEST_ID}__content`);
        expect(popoverContent).toHaveClass('popover-content-class');
      });
    });

    describe('readOnly', () => {
      it('renders a hidden input with the correct value', () => {
        const { container } = renderAutocomplete({
          defaultValue: MOCK_LABEL_VALUE_META[0].label,
          readOnly: true,
        });
        const input = container.querySelector(
          `input[value="${MOCK_LABEL_VALUE_META[0].label}"]`,
        );

        expect(
          screen.getByText(MOCK_LABEL_VALUE_META[0].label),
        ).toBeInTheDocument();
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('interactions', () => {
    it('shows the selected value in the popover', async () => {
      renderAutocomplete();

      const input = screen.getByRole('combobox');
      await userEvent.type(input, MOCK_LABEL_VALUE_META[0].label);

      const options = await screen.findAllByRole('option');

      expect(options).toHaveLength(1);
      expect(options[0]).toHaveTextContent(MOCK_LABEL_VALUE_META[0].label);
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <label htmlFor={TEST_ID}>Test</label>
          <IressAutocomplete
            data-testid="test-component"
            className="test-class"
            id={TEST_ID}
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
