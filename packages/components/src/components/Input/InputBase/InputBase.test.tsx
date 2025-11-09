import { act, fireEvent, render } from '@testing-library/react';
import { InputBase, type InputRef } from './InputBase';
import { createRef } from 'react';

describe('InputBase', () => {
  it('should change input value to "test"', () => {
    const { getByRole } = render(<InputBase />);
    const input = getByRole('textbox') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  it('should focus the input element when focus method is called', () => {
    let inputRef: InputRef | null = null;
    const { getByRole } = render(
      <InputBase
        ref={(ref) => {
          inputRef = ref;
        }}
      />,
    );
    const inputElement = getByRole('textbox') as HTMLInputElement;

    act(() => {
      inputRef?.focus();
    });

    expect(inputElement).toHaveFocus();
  });

  it('should access the original element via the ref', () => {
    const inputRef = createRef<InputRef<undefined>>();
    const { getByRole } = render(<InputBase ref={inputRef} />);
    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBe(inputRef.current?.input);
  });

  it('should render a textarea when rows is defined', () => {
    const { container } = render(<InputBase rows={5} />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });
});
