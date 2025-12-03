import { act, fireEvent, render } from '@testing-library/react';

import { idsLogger } from '@helpers/utility/idsLogger';
import { InputBase } from './InputBase';
import { type InputRef } from './InputBase.types';
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
    const { getByRole } = render(<InputBase ref={(ref) => (inputRef = ref)} />);
    const inputElement = getByRole('textbox') as HTMLInputElement;

    act(() => {
      inputRef?.focus();
    });

    expect(inputElement).toHaveFocus();
  });

  it('should access the original element via the ref', () => {
    const inputRef = createRef<InputRef>();
    const { getByRole } = render(<InputBase ref={inputRef} />);
    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBe(inputRef.current?.input);
  });

  it('should render a textarea when rows is greater than 0', () => {
    const { container } = render(<InputBase rows={5} />);
    expect(container.querySelector('textarea')).toBeInTheDocument();
  });

  it('should log a warning when unsupported props are provided for a textarea', () => {
    render(<InputBase rows={5} type="number" min={1} max={10} step={1} />);
    expect(idsLogger).toHaveBeenCalledTimes(3);
  });
});
