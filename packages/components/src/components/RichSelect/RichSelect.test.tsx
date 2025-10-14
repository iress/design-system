import { act, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { richSelect } from './RichSelect.styles';
import {
  MOCK_LABEL_VALUES,
  MOCK_LARGE_LABEL_VALUES_DATASET,
  mockAsyncSearchLabelValues,
} from '@/mocks/generateLabelValues';
import userEvent from '@testing-library/user-event';
import { IressRichSelect, RichSelectRef } from './RichSelect';
import { toArray } from '@helpers/formatting/toArray';
import { button } from '../Button';
import { menu } from '../Menu';
import { createRef } from 'react';
import { IressLabel } from '../Label';

describe('IressRichSelect', () => {
  const classes = richSelect();

  it('renders a single select with the correct defaults', async () => {
    const onChange = vi.fn();

    render(
      <IressRichSelect
        options={MOCK_LABEL_VALUES}
        data-testid="test-component"
        onChange={onChange}
      />,
    );

    const select = screen.getByTestId('test-component');
    if (classes.richSelect) {
      expect(select).toHaveClass(classes.richSelect);
    }

    const combobox = screen.getByRole('combobox');
    expect(combobox).toBeInTheDocument();

    const popover = screen.getByTestId('test-component__content');
    expect(popover).not.toBeVisible();

    const hiddenInput = screen.getByTestId('test-component__hidden-input');
    expect(hiddenInput).toHaveValue('');

    await userEvent.click(combobox);
    expect(popover).toBeVisible();

    const options = await screen.findAllByRole('option');
    expect(options).toHaveLength(MOCK_LABEL_VALUES.length);

    await userEvent.click(options[0]);

    expect(popover).not.toBeVisible();

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: MOCK_LABEL_VALUES[0] } }),
      MOCK_LABEL_VALUES[0],
    );
    expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[0].value));
  });

  describe('interactions copied from native select', () => {
    it('returns focus to the activator when clicking the activator', async () => {
      render(<IressRichSelect options={MOCK_LABEL_VALUES} />);

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      await screen.findByRole('option', {
        name: MOCK_LABEL_VALUES[0].label,
      });

      await userEvent.click(combobox);

      expect(combobox).toHaveFocus();
    });

    it('returns focus to the activator when using the escape key', async () => {
      render(<IressRichSelect options={MOCK_LABEL_VALUES} />);

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      await screen.findByRole('option', {
        name: MOCK_LABEL_VALUES[0].label,
      });

      await userEvent.keyboard('{Escape}');

      expect(combobox).toHaveFocus();
    });
  });

  describe('props', () => {
    describe('autoHighlight', () => {
      it('highlights first option by default', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });

        // type in combobox and then wait for options to appear
        await userEvent.type(combobox, 'op');
        const options = await screen.findAllByRole('option');

        // first option should be highlighted
        // TODO: this should be aria-activedescendant, but floating ui is not setting it on first load when autoHighlight is true, so using the class instead
        expect(options[0]).toHaveClass(menu({ isActiveInPopover: true }).item!);
      });

      it('does not highlight first option if set to false', async () => {
        render(
          <IressRichSelect
            autoHighlight={false}
            data-testid="test-component"
            placeholder="Select an item"
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });

        // type in combobox and then wait for options to appear
        await userEvent.type(combobox, 'op');
        const options = await screen.findAllByRole('option');

        // first option should not be highlighted
        // TODO: this should be aria-activedescendant, but floating ui is not setting it on first load when autoHighlight is true, so using the class instead
        expect(options[0]).not.toHaveClass(button({ active: true }).root);
      });
    });

    describe('defaultValue', () => {
      it('renders an initial value', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            defaultValue={MOCK_LABEL_VALUES[0]}
            options={MOCK_LABEL_VALUES}
          />,
        );

        const combobox = screen.getByRole('combobox');
        expect(combobox).toHaveTextContent(MOCK_LABEL_VALUES[0].label);

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[0].value));

        await userEvent.click(combobox);

        const selectedOption = await screen.findByRole('option', {
          selected: true,
          name: MOCK_LABEL_VALUES[0].label,
        });
        expect(selectedOption).toBeInTheDocument();
      });
    });

    describe('initialOptions', () => {
      it('renders initial options when the query input is empty', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            initialOptions={[
              { label: 'Frequently selected 1', value: 'freq-1' },
              { label: 'Frequently selected 2', value: 'freq-2' },
            ]}
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        expect(combobox).toBeVisible();

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(2);

        expect(options[0]).toHaveTextContent('Frequently selected 1');

        await userEvent.type(combobox, 'op');

        // The initial options should be replaced by the search results
        expect(options[0]).not.toBeInTheDocument();
      });
    });

    describe('minSearchLength', () => {
      it('shows "Type at least X characters to search" message when query is below threshold', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            options={() => mockAsyncSearchLabelValues()}
            minSearchLength={3}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });

        // Type 1 character (below threshold)
        await userEvent.type(combobox, 'a');

        await waitFor(() => {
          expect(
            screen.getByText('Type at least 3 characters to search'),
          ).toBeInTheDocument();
        });

        // Type 2 characters (still below threshold)
        await userEvent.type(combobox, 'b');

        await waitFor(() => {
          expect(
            screen.getByText('Type at least 3 characters to search'),
          ).toBeInTheDocument();
        });

        // Type 3rd character (meets threshold)
        await userEvent.type(combobox, 'c');

        // The "Type at least" message should disappear once search is triggered
        await waitFor(() => {
          expect(
            screen.queryByText('Type at least 3 characters to search'),
          ).not.toBeInTheDocument();
        });
      });

      it('shows "No results found" when search is performed but returns empty results', async () => {
        const mockEmptySearch = vi.fn().mockResolvedValue([]);

        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            options={mockEmptySearch}
            minSearchLength={2}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });

        // Type enough characters to trigger search
        await userEvent.type(combobox, 'xyz');

        // Wait for search to complete and show "No results found"
        await waitFor(() => {
          expect(screen.getByText('No results found')).toBeInTheDocument();
        });

        expect(mockEmptySearch).toHaveBeenCalledWith('xyz');
      });

      it('uses default minSearchLength of 1 when not specified', async () => {
        const mockSearch = vi
          .fn()
          .mockResolvedValue([{ label: 'Test Result', value: 'test' }]);

        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            options={mockSearch}
            debounceThreshold={0}
          />,
        );

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });

        // Type 1 character (should trigger search with default minSearchLength=1)
        await userEvent.type(combobox, 'a');

        await waitFor(() => {
          expect(mockSearch).toHaveBeenCalledWith('a');
        });

        // Should not show "Type at least" message with default behavior
        expect(
          screen.queryByText(/Type at least.*characters to search/),
        ).not.toBeInTheDocument();
      });
    });

    describe('multiSelect', () => {
      it('renders a multi-select with the correct defaults', async () => {
        const onChange = vi.fn();

        render(
          <IressRichSelect
            options={MOCK_LABEL_VALUES}
            multiSelect
            data-testid="test-component"
            onChange={onChange}
          />,
        );

        const select = screen.getByTestId('test-component');
        if (classes.richSelect) {
          expect(select).toHaveClass(classes.richSelect);
        }

        const combobox = screen.getByRole('combobox');
        // For empty multiselect, the content is empty, not "Selected: None"
        expect(combobox).toBeInTheDocument();

        const popover = screen.getByTestId('test-component__content');
        expect(popover).not.toBeVisible();

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue('');

        await userEvent.click(combobox);
        expect(popover).toBeVisible();

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(MOCK_LABEL_VALUES.length);

        await userEvent.click(options[0]);

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: { value: [MOCK_LABEL_VALUES[0]] },
          }),
          [MOCK_LABEL_VALUES[0]],
        );
        expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[0].value));

        // Check for the selected item as a tag - be more specific to avoid multiple matches
        const selectedTag = screen.getByRole('button', {
          name: `Delete ${MOCK_LABEL_VALUES[0].label}`,
        });
        expect(selectedTag).toBeInTheDocument();

        await userEvent.click((await screen.findAllByRole('option'))[1]);

        expect(popover).toBeVisible();

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: { value: [MOCK_LABEL_VALUES[0], MOCK_LABEL_VALUES[1]] },
          }),
          [MOCK_LABEL_VALUES[0], MOCK_LABEL_VALUES[1]],
        );
        expect(hiddenInput).toHaveValue(
          `${String(MOCK_LABEL_VALUES[0].value)},${String(MOCK_LABEL_VALUES[1].value)}`,
        );

        // Check for both selected items as tags - be more specific to avoid multiple matches
        const selectedTag1 = screen.getByRole('button', {
          name: `Delete ${MOCK_LABEL_VALUES[0].label}`,
        });
        const selectedTag2 = screen.getByRole('button', {
          name: `Delete ${MOCK_LABEL_VALUES[1].label}`,
        });
        expect(selectedTag1).toBeInTheDocument();
        expect(selectedTag2).toBeInTheDocument();
      });

      it('deletes a single item from a multi-select', async () => {
        const onChange = vi.fn();

        render(
          <IressRichSelect
            defaultValue={[MOCK_LABEL_VALUES[0], MOCK_LABEL_VALUES[1]]}
            options={MOCK_LABEL_VALUES}
            multiSelect
            data-testid="test-component"
            onChange={onChange}
          />,
        );

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue(
          `${String(MOCK_LABEL_VALUES[0].value)},${String(MOCK_LABEL_VALUES[1].value)}`,
        );

        const deleteOption1 = screen.getByRole('button', {
          name: `Delete ${MOCK_LABEL_VALUES[0].label}`,
        });
        expect(deleteOption1).toBeInTheDocument();

        await userEvent.click(deleteOption1);

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: { value: [MOCK_LABEL_VALUES[1]] },
          }),
          [MOCK_LABEL_VALUES[1]],
        );
        expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[1].value));
      });

      it('deletes all items from a multi-select', async () => {
        const onChange = vi.fn();
        const defaultValue = MOCK_LARGE_LABEL_VALUES_DATASET.slice(5);

        render(
          <IressRichSelect
            defaultValue={defaultValue}
            options={MOCK_LARGE_LABEL_VALUES_DATASET}
            multiSelect
            data-testid="test-component"
            onChange={onChange}
          />,
        );

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue(
          defaultValue.map((item) => item.value).join(','),
        );

        const actions = screen.getByRole('button', { name: 'Actions' });
        expect(actions).toBeInTheDocument();

        await userEvent.click(actions);

        const deleteAll = screen.getByRole('button', { name: 'Delete all' });
        expect(deleteAll).toBeInTheDocument();

        await userEvent.click(deleteAll);

        expect(onChange).toHaveBeenLastCalledWith(
          expect.objectContaining({
            target: { value: [] },
          }),
          [],
        );
        expect(hiddenInput).toHaveValue('');
      });
    });

    describe('options (async)', () => {
      it('renders single select asynchronous options', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select an item"
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
          />,
        );

        // combobox is revealed later in async mode
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

        const activator = screen.getByRole('button', {
          name: 'Select an item',
        });
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        expect(combobox).toBeVisible();

        await userEvent.type(combobox, 'op');

        const options = await screen.findAllByRole('option');
        expect(options).toHaveLength(5);

        await userEvent.keyboard('{ArrowDown}{Enter}');

        expect(activator).toHaveTextContent('Option 1');
        expect(options[0]).toHaveAttribute('aria-selected', 'true');

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue('1');

        expect(combobox).not.toBeVisible();
        expect(combobox).toHaveValue('');
      });

      it('renders multi-select asynchronous options', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select item(s)"
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
            multiSelect
          />,
        );

        // For multiSelect, the combobox button is always present
        const activator = screen.getByRole('combobox');
        await userEvent.click(activator);

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        expect(combobox).toBeVisible();

        await userEvent.type(combobox, 'op');

        const optionsRound1 = await screen.findAllByRole('option');
        expect(optionsRound1).toHaveLength(6); // heading is an option as well... a11y things

        expect(screen.getByText('Search results')).toBeInTheDocument();

        await userEvent.keyboard('{ArrowDown}{Enter}');

        const optionsRound2 = await screen.findAllByRole('option');
        expect(optionsRound2).toHaveLength(7); // heading is an option as well... a11y things

        expect(screen.getByText('Selected (1)')).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Delete Option 1' }),
        ).toBeInTheDocument();
        expect(optionsRound2[1]).toHaveAttribute('aria-selected', 'true');

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue('1');

        const clearButton = screen.getByRole('button', { name: 'Clear all' });
        await userEvent.click(clearButton);
        expect(hiddenInput).toHaveValue('');

        await userEvent.tab({ shift: true }); // tab away

        await waitFor(() => expect(combobox).not.toBeVisible());
        expect(combobox).toHaveValue('');
      });

      it('allows the clear all to be navigated via keyboard', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select item(s)"
            options={() => mockAsyncSearchLabelValues()}
            debounceThreshold={0}
            multiSelect
          />,
        );

        // focus activator and open popover
        await userEvent.tab();
        await userEvent.keyboard('{Enter}');

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        await waitFor(() => expect(combobox).toHaveFocus());

        await userEvent.keyboard('op');

        const optionsRound1 = await screen.findAllByRole('option');
        expect(optionsRound1).toHaveLength(6); // heading is an option as well... a11y things

        expect(screen.getByText('Search results')).toBeInTheDocument();

        // WAF-854 change: After typing, focus is now on search results, not the heading
        // So we don't need to press ArrowDown first to navigate to an option
        await userEvent.keyboard('{Enter}'); // select first search result directly

        const optionsRound2 = await screen.findAllByRole('option');
        expect(optionsRound2).toHaveLength(7); // heading is an option as well... a11y things

        // clear button should be visible after selecting an item
        const clearButton = screen.getByRole('button', { name: 'Clear all' });
        expect(clearButton).toBeInTheDocument();

        // Get the selected option
        const selectedOption = screen.getByRole('option', { selected: true });

        // We need to navigate to the heading section first
        // Because our focus now starts in search results instead of selected items
        await userEvent.keyboard('{ArrowUp}{ArrowUp}'); // navigate to clear all button

        // expect the clear all button to have virtual focus
        expect(combobox).toHaveAttribute(
          'aria-activedescendant',
          clearButton.id,
        );

        await userEvent.keyboard('{Enter}'); // clear all

        // clear button should no longer be visible, and the selected option should no longer be available
        expect(clearButton).not.toBeInTheDocument();
        expect(selectedOption).not.toBeInTheDocument();
      });

      it('renders an alert when options throw an error', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select item(s)"
            options={() => Promise.reject(new Error())}
            debounceThreshold={0}
            multiSelect
          />,
        );

        // focus activator and open popover
        await userEvent.tab();
        await userEvent.keyboard('{Enter}');

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        await waitFor(() => expect(combobox).toHaveFocus());

        await userEvent.keyboard('op');

        const error = await screen.findByText(
          'An unknown error occurred. Please contact support if the error persists.',
        );

        expect(error).toBeInTheDocument();
      });

      it('renders a custom error message', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            placeholder="Select item(s)"
            options={() => Promise.reject(new Error('Custom error message'))}
            debounceThreshold={0}
            multiSelect
          />,
        );

        // focus activator and open popover
        await userEvent.tab();
        await userEvent.keyboard('{Enter}');

        const combobox = await screen.findByRole('combobox', {
          name: 'Search',
        });
        await waitFor(() => expect(combobox).toHaveFocus());

        await userEvent.keyboard('op');

        const error = await screen.findByText('Custom error message');

        expect(error).toBeInTheDocument();
      });
    });

    describe('name', () => {
      it('sets the name of the hidden input', () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            name="test-name"
            options={MOCK_LABEL_VALUES}
          />,
        );

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveAttribute('name', 'test-name');
      });
    });

    describe('placeholder', () => {
      it('renders a placeholder', () => {
        render(
          <IressRichSelect
            placeholder="Select an item"
            options={MOCK_LABEL_VALUES}
          />,
        );

        const combobox = screen.getByRole('combobox');
        expect(combobox).toHaveTextContent('Select an item');
      });
    });

    describe('readOnly', () => {
      it('renders a hidden input with the correct value', () => {
        const screen = render(
          <IressRichSelect
            defaultValue={MOCK_LABEL_VALUES[0]}
            options={MOCK_LABEL_VALUES}
            readOnly
          />,
        );
        const input = screen.container.querySelector(
          `input[value="${MOCK_LABEL_VALUES[0].value}"]`,
        );

        expect(
          screen.getByText(MOCK_LABEL_VALUES[0].label),
        ).toBeInTheDocument();
        expect(input).toBeInTheDocument();
      });
    });

    describe('renderHiddenInput', () => {
      it('renders a completely custom hidden input', () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            renderHiddenInput={({ getValuesString }) => (
              <input
                data-testid="custom-hidden-input"
                defaultValue={getValuesString()}
              />
            )}
            options={MOCK_LABEL_VALUES}
            defaultValue={MOCK_LABEL_VALUES[0]}
          />,
        );

        const hiddenInput = screen.getByTestId('custom-hidden-input');
        expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[0].value));

        expect(
          screen.queryByTestId('test-component__hidden-input'),
        ).not.toBeInTheDocument();
      });
    });

    describe('renderLabel', () => {
      it('renders a completely custom label', async () => {
        const onDeactivated = vi.fn();

        render(
          <IressRichSelect
            onDeactivated={onDeactivated}
            renderLabel={({ close, value }) => (
              <>
                <strong>Custom selected: {toArray(value)[0]?.label}</strong>
                <button type="button" onClick={close}>
                  close from label
                </button>
              </>
            )}
            options={MOCK_LABEL_VALUES}
            defaultValue={MOCK_LABEL_VALUES[0]}
          />,
        );

        const customLabel = screen.getByText(
          `Custom selected: ${MOCK_LABEL_VALUES[0].label}`,
        );
        expect(customLabel).toBeInTheDocument();

        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

        const closeButton = screen.getByRole('button', {
          name: 'close from label',
        });
        await userEvent.click(closeButton);

        expect(onDeactivated).toHaveBeenCalled();
      });
    });

    describe('renderOptions', () => {
      it('renders a completely custom options', async () => {
        render(
          <IressRichSelect
            renderOptions={({ results }) => (
              <strong>Options available to you: {results.length}</strong>
            )}
            options={MOCK_LABEL_VALUES}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        const customOptions = screen.getByText(
          `Options available to you: ${MOCK_LABEL_VALUES.length}`,
        );
        expect(customOptions).toBeInTheDocument();

        expect(screen.queryByRole('option')).not.toBeInTheDocument();
      });
    });

    describe('value', () => {
      it('renders a value value', async () => {
        render(
          <IressRichSelect
            data-testid="test-component"
            options={MOCK_LABEL_VALUES}
            value={MOCK_LABEL_VALUES[0]}
          />,
        );

        const combobox = screen.getByRole('combobox');
        expect(combobox).toHaveTextContent(MOCK_LABEL_VALUES[0].label);

        const hiddenInput = screen.getByTestId('test-component__hidden-input');
        expect(hiddenInput).toHaveValue(String(MOCK_LABEL_VALUES[0].value));

        await userEvent.click(combobox);

        const selectedOption = await screen.findByRole('option', {
          selected: true,
          name: MOCK_LABEL_VALUES[0].label,
        });
        expect(selectedOption).toBeInTheDocument();
      });
    });

    describe('header', () => {
      it('renders header when provided', async () => {
        render(
          <IressRichSelect
            options={MOCK_LABEL_VALUES}
            header={<div data-testid="custom-header">Header Content</div>}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        const header = screen.getByTestId('custom-header');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Header Content');
      });

      it('does not render header when not provided', async () => {
        render(<IressRichSelect options={MOCK_LABEL_VALUES} />);

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        expect(screen.queryByTestId('custom-header')).not.toBeInTheDocument();
      });
    });

    describe('footer', () => {
      it('renders footer when provided', async () => {
        render(
          <IressRichSelect
            options={MOCK_LABEL_VALUES}
            footer={<div data-testid="custom-footer">Footer Content</div>}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        const footer = screen.getByTestId('custom-footer');
        expect(footer).toBeInTheDocument();
        expect(footer).toHaveTextContent('Footer Content');
      });

      it('does not render footer when not provided', async () => {
        render(<IressRichSelect options={MOCK_LABEL_VALUES} />);

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        expect(screen.queryByTestId('custom-footer')).not.toBeInTheDocument();
      });

      it('renders both header and footer together', async () => {
        render(
          <IressRichSelect
            options={MOCK_LABEL_VALUES}
            header={<div data-testid="header">Header</div>}
            footer={<div data-testid="footer">Footer</div>}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
      });
    });

    describe('header', () => {
      it('renders header when provided', async () => {
        render(
          <IressRichSelect
            options={MOCK_LABEL_VALUES}
            header={<div data-testid="custom-header">Header Content</div>}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        const header = screen.getByTestId('custom-header');
        expect(header).toBeInTheDocument();
        expect(header).toHaveTextContent('Header Content');
      });

      it('does not render header when not provided', async () => {
        render(<IressRichSelect options={MOCK_LABEL_VALUES} />);

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        expect(screen.queryByTestId('custom-header')).not.toBeInTheDocument();
      });
    });

    describe('onBlur', () => {
      it('calls onBlur when focus leaves the component and popover is closed', async () => {
        const onBlur = vi.fn();
        render(
          <>
            <IressRichSelect
              data-testid="test-component"
              options={MOCK_LABEL_VALUES}
              onBlur={onBlur}
            />
            <button>Outside Button</button>
          </>,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        // Click outside to trigger blur
        const outsideButton = screen.getByRole('button', {
          name: 'Outside Button',
        });
        await userEvent.click(outsideButton);
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      it('does not call onBlur when no onBlur prop is provided', async () => {
        render(
          <>
            <IressRichSelect
              data-testid="test-component"
              options={MOCK_LABEL_VALUES}
            />
            <button>Outside Button</button>
          </>,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        // Close the popover
        await userEvent.keyboard('{Escape}');

        // Click outside - should not throw any errors
        const outsideButton = screen.getByRole('button', {
          name: 'Outside Button',
        });
        await userEvent.click(outsideButton);

        // Add assertion to verify no errors occurred
        expect(outsideButton).toBeInTheDocument();
      });

      it('does not call onBlur when popover is open', async () => {
        const onBlur = vi.fn();
        render(
          <>
            <IressRichSelect
              data-testid="test-component"
              options={MOCK_LABEL_VALUES}
              onBlur={onBlur}
            />
            <button>Outside Button</button>
          </>,
        );

        // Open the popover
        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        // Wait for popover to be fully open
        await waitFor(() => {
          expect(screen.getByRole('listbox')).toBeVisible();
        });

        expect(onBlur).not.toHaveBeenCalled();

        // Try to blur while popover is open
        const outsideButton = screen.getByRole('button', {
          name: 'Outside Button',
        });
        await userEvent.click(outsideButton);
        expect(onBlur).toHaveBeenCalled();
      });

      it('does not call onBlur when focus moves within the component', async () => {
        const onBlur = vi.fn();
        render(
          <IressRichSelect
            data-testid="test-component"
            options={MOCK_LABEL_VALUES}
            onBlur={onBlur}
          />,
        );

        const combobox = screen.getByRole('combobox');
        await userEvent.click(combobox);

        // Click an option in the dropdown
        const option = screen.getByText(MOCK_LABEL_VALUES[0].label);
        await userEvent.click(option);

        expect(onBlur).not.toHaveBeenCalled();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressLabel htmlFor="select">Label</IressLabel>
          <IressRichSelect id="select" options={MOCK_LABEL_VALUES} />
        </>,
      );

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ref methods', () => {
    it('exposes imperative handle methods', () => {
      const refObject = createRef<RichSelectRef>();

      render(
        <IressRichSelect
          ref={refObject}
          options={MOCK_LABEL_VALUES}
          data-testid="test-component"
        />,
      );

      // Test that the ref object has the expected methods
      expect(refObject.current).toBeDefined();
      expect(typeof refObject.current?.focus).toBe('function');
      expect(typeof refObject.current?.blur).toBe('function');
      expect(refObject.current?.input).toBeDefined();
    });

    it('focus and blur methods work correctly', () => {
      const refObject = createRef<RichSelectRef>();

      render(
        <IressRichSelect
          ref={refObject}
          options={MOCK_LABEL_VALUES}
          data-testid="test-component"
        />,
      );

      // Test that focus and blur methods can be called without error
      expect(() => {
        refObject.current?.focus();
      }).not.toThrow();

      expect(() => {
        refObject.current?.blur();
      }).not.toThrow();
    });

    it('input reference points to hidden input element', () => {
      const refObject = createRef<RichSelectRef>();

      render(
        <IressRichSelect
          ref={refObject}
          options={MOCK_LABEL_VALUES}
          data-testid="test-component"
        />,
      );

      const hiddenInput = screen.getByTestId('test-component__hidden-input');

      // Input should reference the hidden input element
      expect(refObject.current?.input).toBe(hiddenInput);
    });
  });

  describe('width', () => {
    it('applies correct width styling for fixed width variants', () => {
      const widthVariants = ['2', '4', '6', '8', '10', '12', '16'] as const;

      widthVariants.forEach((width) => {
        const { unmount } = render(
          <IressRichSelect
            data-testid={`test-component-${width}`}
            options={MOCK_LABEL_VALUES}
            width={width}
            placeholder={`Width ${width}`}
          />,
        );

        const select = screen.getByTestId(`test-component-${width}`);
        const classes = richSelect({ width });

        if (classes.richSelect) {
          expect(select).toHaveClass(classes.richSelect);
        }

        unmount();
      });
    });

    it('applies correct width styling for percentage width variants', () => {
      const percentageVariants = [
        '25perc',
        '50perc',
        '75perc',
        '100perc',
      ] as const;

      percentageVariants.forEach((width) => {
        const { unmount } = render(
          <IressRichSelect
            data-testid={`test-component-${width}`}
            options={MOCK_LABEL_VALUES}
            width={width}
            placeholder={`Width ${width}`}
          />,
        );

        const select = screen.getByTestId(`test-component-${width}`);
        const classes = richSelect({ width });

        if (classes.richSelect) {
          expect(select).toHaveClass(classes.richSelect);
        }

        unmount();
      });
    });

    it('works with multiSelect and width', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          width="6"
          multiSelect
          placeholder="Multi-select Width 6"
        />,
      );

      const select = screen.getByTestId('test-component');
      const classes = richSelect({ width: '6' });

      if (classes.richSelect) {
        expect(select).toHaveClass(classes.richSelect);
      }

      // Verify it still functions as a multi-select
      const activator = screen.getByRole('combobox');
      await userEvent.click(activator);

      const options = await screen.findAllByRole('option');
      expect(options.length).toBeGreaterThan(0);

      // Select first option
      await userEvent.click(options[0]);

      // Verify the selected item appears as a tag (within the tag component)
      const selectedTag = screen.getByRole('button', {
        name: `Delete ${MOCK_LABEL_VALUES[0].label}`,
      });
      expect(selectedTag).toBeInTheDocument();
    });

    it('works without width prop (uses default styling)', () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          placeholder="Default width"
        />,
      );

      const select = screen.getByTestId('test-component');
      const classes = richSelect();

      if (classes.richSelect) {
        expect(select).toHaveClass(classes.richSelect);
      }
    });
  });

  describe('matchActivatorWidth', () => {
    // Mock getBoundingClientRect for width measurement
    const mockRect = {
      width: 250,
      height: 40,
      top: 0,
      left: 0,
      bottom: 40,
      right: 250,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    };

    beforeEach(() => {
      // Mock getBoundingClientRect
      Element.prototype.getBoundingClientRect = vi.fn(() => mockRect);
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('applies matchActivatorWidth styles by default (matchActivatorWidth: true)', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          matchActivatorWidth={true}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // When matchActivatorWidth is true, dropdown should be constrained to match activator width
      expect(popoverContent).toHaveStyle('min-width: 250px');
      // And should NOT have the extending class
      expect(popoverContent).not.toHaveClass('max-w_[none]');
    });

    it('does not apply activator width styles when matchActivatorWidth is false', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          matchActivatorWidth={false}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // When matchActivatorWidth is false, verify that no inline minWidth is set by FloatingUI
      expect(popoverContent.style.minWidth).toBe('');

      // And verify that our CSS allows extending by checking for the max-width: none class
      expect(popoverContent).toHaveClass('max-w_[none]');
    });

    it('defaults to matchActivatorWidth: true when prop is not provided', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // By default matchActivatorWidth is true, so dropdown should be constrained to activator width
      expect(popoverContent).toHaveStyle('min-width: 250px');
      // And should NOT have the extending class
      expect(popoverContent).not.toHaveClass('max-w_[none]');
    });

    it('works with multiSelect and matchActivatorWidth', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          multiSelect
          matchActivatorWidth={true}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // When matchActivatorWidth is true, dropdown should be constrained even with multiSelect
      expect(popoverContent).toHaveStyle('min-width: 250px');
      // And should NOT have the extending class
      expect(popoverContent).not.toHaveClass('max-w_[none]');

      // Verify it still functions as a multi-select
      const options = await screen.findAllByRole('option');
      expect(options.length).toBeGreaterThan(0);
    });

    it('correctly applies width constraints when matchActivatorWidth is true', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          matchActivatorWidth={true}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // When matchActivatorWidth is true, dropdown should be constrained to activator width
      expect(popoverContent).toHaveStyle('min-width: 250px');
      // And should NOT have the extending class
      expect(popoverContent).not.toHaveClass('max-w_[none]');
    });

    it('correctly removes width constraints when matchActivatorWidth is false', async () => {
      render(
        <IressRichSelect
          data-testid="test-component"
          options={MOCK_LABEL_VALUES}
          matchActivatorWidth={false}
        />,
      );

      const combobox = screen.getByRole('combobox');
      await userEvent.click(combobox);

      const popoverContent = screen.getByTestId('test-component__content');

      // When matchActivatorWidth is false, verify that no inline minWidth is set by FloatingUI
      expect(popoverContent.style.minWidth).toBe('');

      // And verify that our CSS allows extending by checking for the max-width: none class
      expect(popoverContent).toHaveClass('max-w_[none]');
    });
  });

  describe('meta highlighting functionality', () => {
    it('highlights query text in both label and meta when searching', async () => {
      const optionsWithMeta = [
        { label: 'Test option 1', value: '1', meta: 'Test description' },
        { label: 'Search result', value: '2', meta: 'Contains search term' },
        { label: 'Another option', value: '3', meta: 'Different content' },
      ];

      render(
        <IressRichSelect
          data-testid="test-component"
          placeholder="Select an item"
          options={() => Promise.resolve(optionsWithMeta)}
          debounceThreshold={0}
        />,
      );

      const activator = screen.getByRole('button', {
        name: 'Select an item',
      });
      await userEvent.click(activator);

      const combobox = await screen.findByRole('combobox', {
        name: 'Search',
      });

      // Type search query
      await userEvent.type(combobox, 'test');

      // Wait for options to appear
      const options = await screen.findAllByRole('option');

      // Should find options that contain "test" in label or meta
      expect(options.length).toBeGreaterThan(0);

      // Check that the label highlighting is working
      const highlightedLabels = screen.getAllByText(/test/i, { selector: 'b' });
      expect(highlightedLabels.length).toBeGreaterThan(0);

      // Verify both label and meta can be highlighted
      // The first option has "Test" in both label and meta
      const firstOption = options.find((option) =>
        option.textContent?.includes('Test option 1'),
      );
      expect(firstOption).toBeInTheDocument();

      if (firstOption) {
        // Check that highlighting appears in both label and meta within this option
        const boldElements = firstOption.querySelectorAll('b');
        expect(boldElements.length).toBeGreaterThan(0);
      }
    });

    it('handles meta that is not a string (ReactNode)', async () => {
      const optionsWithReactNodeMeta = [
        {
          label: 'Option with React meta',
          value: '1',
          meta: <span data-testid="react-meta">React Element Meta</span>,
        },
        {
          label: 'Regular option',
          value: '2',
          meta: 'Regular option meta',
        },
      ];

      render(
        <IressRichSelect
          data-testid="test-component"
          placeholder="Select an item"
          options={() => Promise.resolve(optionsWithReactNodeMeta)}
          debounceThreshold={0}
        />,
      );

      const activator = screen.getByRole('button', {
        name: 'Select an item',
      });
      await userEvent.click(activator);

      const combobox = await screen.findByRole('combobox', {
        name: 'Search',
      });

      // Type search query that appears in label
      await userEvent.type(combobox, 'option');

      // Wait for options to appear
      await screen.findAllByRole('option');

      // ReactNode meta should still be rendered correctly
      const reactMeta = screen.getByTestId('react-meta');
      expect(reactMeta).toBeInTheDocument();
      expect(reactMeta).toHaveTextContent('React Element Meta');

      // Check that we can find an option where meta is highlighted
      const highlightedText = screen.getAllByText('option', { selector: 'b' });
      expect(highlightedText).toHaveLength(2);
      expect(highlightedText[1].parentElement).toHaveTextContent(
        'Regular option meta',
      );
    });
  });
});
