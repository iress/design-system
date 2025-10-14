import { render, waitFor } from '@testing-library/react';
import { IressInput } from './Input';
import { input } from './Input.styles';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

describe('IressInput', () => {
  it('should render without crashing', () => {
    const { getByRole } = render(<IressInput />);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input.closest(`.${GlobalCSSClass.Input}`)).not.toBeNull();
  });

  it('renders with the correct data-testids (single row input)', () => {
    const screen = render(
      <IressInput data-testid="test-input" name="Normal Input" />,
    );

    const wrapper = screen.getByTestId('test-input');

    expect(wrapper).toBeInTheDocument();

    expect(screen.getByTestId('test-input__input')).toBeInTheDocument();
  });

  it('renders with the correct data-testids (textarea input)', () => {
    const screen = render(
      <IressInput data-testid="test-input" rows={4} name="Textarea Input" />,
    );

    const wrapper = screen.getByTestId('test-input');

    expect(wrapper).toBeInTheDocument();

    expect(screen.getByTestId('test-input__textarea')).toBeInTheDocument();
  });

  it('should change input value to "test"', async () => {
    const { getByRole } = render(<IressInput />);
    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test');
    expect(input.value).toBe('test');
  });

  it('should render prepend and append elements', () => {
    const { getByText } = render(
      <IressInput prepend={<div>Prepend</div>} append={<div>Append</div>} />,
    );

    expect(getByText('Prepend')).toBeInTheDocument();
    expect(getByText('Append')).toBeInTheDocument();
  });

  it('should change value and clear value with change event', async () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();
    const { getByRole } = render(
      <IressInput clearable onChange={handleChange} onClear={handleClear} />,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test');
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: 'test' }) as EventTarget,
        }),
        'test',
      );
    });

    await userEvent.click(getByRole('button') as HTMLButtonElement);
    await waitFor(() => {
      expect(input.value).toBe('');
    });

    expect(input).toHaveFocus();
  });

  describe('width', () => {
    it('adds the width class to the input when its not a percentage, so its not affected by prepend/append', () => {
      const screen = render(<IressInput width="10" data-testid="test-input" />);
      const wrapper = screen.getByTestId('test-input');
      const inputElement = screen.getByRole('textbox');

      const styles = input({ width: '10' });
      expect(wrapper).toHaveClass(styles.wrapper ?? '');
      expect(inputElement).toHaveClass(styles.formControl ?? '');
    });

    it('adds the width class to the wrapper when its a percentage', () => {
      const screen = render(
        <IressInput width="25perc" data-testid="test-input" />,
      );

      const wrapper = screen.getByTestId('test-input');
      const styles = input({ width: '25perc' });
      expect(wrapper).toHaveClass(styles.wrapper ?? '');
    });
  });

  describe('readonly', () => {
    it('renders a hidden input with the correct value', () => {
      const screen = render(<IressInput defaultValue="Hello" readOnly />);
      const input = screen.container.querySelector('input[value="Hello"]');

      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });
  });

  describe('formatter', () => {
    it('formats the value correctly', async () => {
      const screen = render(
        <IressInput
          formatter={(value) => (value ? value.toString().toUpperCase() : '')}
        />,
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, 'hello');
      await userEvent.tab(); // blur the input

      expect(input.value).toBe('HELLO');
    });

    it('highlights the input when tabbed to, but not when clicked', async () => {
      const screen = render(
        <IressInput
          defaultValue="hello"
          formatter={(value) => (value ? value.toString().toUpperCase() : '')}
        />,
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;

      await userEvent.tab();
      expect(input).toHaveFocus();
      expect(input).toHaveSelection('hello');

      await userEvent.tab();
      expect(input).not.toHaveFocus();

      await userEvent.click(input);
      expect(input).toHaveFocus();
      expect(input).not.toHaveSelection('hello');
    });
  });
});
