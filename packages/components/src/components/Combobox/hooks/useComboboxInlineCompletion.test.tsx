import { renderHook, waitFor } from '@testing-library/react';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';
import { ComboboxInlineCompletionHookProps } from '../Combobox.types';
import { useComboboxInlineCompletion } from './useComboboxInlineCompletion';

const renderComboboxInlineCompletionHook = (
  defaultProps: Partial<ComboboxInlineCompletionHookProps> = {},
) =>
  renderHook((props: ComboboxInlineCompletionHookProps) =>
    useComboboxInlineCompletion({
      ...defaultProps,
      ...props,
    }),
  );

const mockQueryRef = () => ({
  current: {
    blur: vi.fn(),
    focus: vi.fn(),
    input: {
      setSelectionRange: vi.fn(),
    } as unknown as HTMLInputElement,
  },
});

describe('useComboboxInlineCompletion', () => {
  it('changes the active value to the first value when debouncedQuery and results change', async () => {
    const queryRef = mockQueryRef();
    const setTypedQuery = vi.fn();
    const setValue = vi.fn();
    const hook = renderComboboxInlineCompletionHook({
      debounceThreshold: 0,
      queryRef,
      setTypedQuery,
      setValue,
    });

    expect(setValue).not.toBeCalled();

    hook.rerender({
      debouncedQuery: 'o',
      queryRef,
      results: MOCK_LABEL_VALUE_META,
      setTypedQuery,
      setValue,
    });

    expect(setValue).toBeCalledWith(MOCK_LABEL_VALUE_META[0]);
    expect(setTypedQuery).toBeCalledWith(MOCK_LABEL_VALUE_META[0].label);

    await waitFor(() => {
      // expect 'option 1' to be selected in 'Option 1' after the query input was updated

      expect(queryRef.current.input.setSelectionRange).toHaveBeenCalledWith(
        1,
        8,
      );
    });
  });

  it('does not change or highlight the query value if backspace was pressed', () => {
    const queryRef = mockQueryRef();
    const setTypedQuery = vi.fn();
    const setValue = vi.fn();
    const hook = renderComboboxInlineCompletionHook({
      queryRef,
      setTypedQuery,
      setValue,
    });

    const helpers = hook.result.current;

    helpers.setKeyPressed({
      key: 'Backspace',
    } as KeyboardEvent);

    hook.rerender({
      debouncedQuery: 'o',
      queryRef,
      results: MOCK_LABEL_VALUE_META,
      setTypedQuery,
      setValue,
    });

    expect(setValue).not.toBeCalled();
    expect(setTypedQuery).not.toBeCalled();
  });

  it('does not highlight the active value if autoSelect is disabled', () => {
    const queryRef = mockQueryRef();
    const setValue = vi.fn();
    const setTypedQuery = vi.fn();
    const hook = renderComboboxInlineCompletionHook({
      autoSelect: false,
      queryRef,
      setTypedQuery,
      setValue,
    });

    hook.rerender({
      debouncedQuery: 'o',
      queryRef,
      results: MOCK_LABEL_VALUE_META,
      setTypedQuery,
      setValue,
    });

    expect(setValue).not.toBeCalled();
  });
});
