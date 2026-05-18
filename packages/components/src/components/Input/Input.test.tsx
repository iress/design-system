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

    await userEvent.click(getByRole('button'));
    await waitFor(() => {
      expect(input.value).toBe('');
    });

    expect(input).toHaveFocus();
  });

  it('should call onChange with empty value when clearing', async () => {
    const handleChange = vi.fn();
    const handleClear = vi.fn();
    const { getByRole } = render(
      <IressInput clearable onChange={handleChange} onClear={handleClear} />,
    );
    const input = getByRole('textbox') as HTMLInputElement;

    await userEvent.type(input, 'test');
    handleChange.mockClear();

    await userEvent.click(getByRole('button'));
    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          target: expect.objectContaining({ value: '' }),
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          currentTarget: expect.objectContaining({ value: '' }),
        }),
        '',
      );
      expect(handleClear).toHaveBeenCalled();
    });
  });

  describe('width', () => {
    it('adds the width class to the input when its not a percentage, so its not affected by prepend/append', () => {
      const screen = render(<IressInput width="10" data-testid="test-input" />);
      const wrapper = screen.getByTestId('test-input').firstChild;
      const inputElement = screen.getByRole('textbox');

      const styles = input({ width: '10' });
      expect(wrapper).toHaveClass(styles.wrapper!);
      expect(inputElement).toHaveClass(styles.formControl!);
    });

    it('adds the width class to the wrapper when its a percentage', () => {
      const screen = render(
        <IressInput width="25%" data-testid="test-input" />,
      );

      const wrapper = screen.getByTestId('test-input').firstChild;
      const styles = input({ width: '25%' });
      expect(wrapper).toHaveClass(styles.wrapper!);
    });
  });

  describe('readonly', () => {
    it('renders a hidden input with the correct value', () => {
      const screen = render(<IressInput defaultValue="Hello" readOnly />);
      const input = screen.container.querySelector('input[value="Hello"]');

      expect(screen.getByText('Hello')).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    it('supports readOnly="locked"', () => {
      const screen = render(
        <IressInput defaultValue="Hello" readOnly="locked" />,
      );
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

    it('does not select text on tab focus when no formatter is set', async () => {
      const screen = render(<IressInput defaultValue="hello" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      const selectSpy = vi.spyOn(input, 'select');

      await userEvent.tab();
      expect(input).toHaveFocus();

      // Flush the microtask queue so a queued select() would have fired
      await new Promise<void>((resolve) => queueMicrotask(resolve));

      expect(selectSpy).not.toHaveBeenCalled();
      selectSpy.mockRestore();
    });
  });

  describe('autoGrow', () => {
    it('should apply autoGrow styling when autoGrow prop is set', () => {
      const screen = render(
        <IressInput rows={3} autoGrow={5} data-testid="test-input" />,
      );
      const wrapper = screen.getByTestId('test-input').firstChild;
      const textarea = screen.container.querySelector('textarea');

      expect(textarea).toBeInTheDocument();
      const styles = input({ autoGrow: true, isTextarea: true });
      expect(wrapper).toHaveClass(styles.wrapper!);
    });

    it('should default autoGrow to 5 when set to true', () => {
      const screen = render(
        <IressInput rows={3} autoGrow={true} data-testid="test-input" />,
      );
      const wrapper = screen.getByTestId('test-input').firstChild;
      const textarea = screen.container.querySelector('textarea');

      expect(textarea).toBeInTheDocument();
      // The component should treat autoGrow=true as autoGrow=5
      const styles = input({ autoGrow: true, isTextarea: true });
      expect(wrapper).toHaveClass(styles.wrapper!);
    });
  });

  describe('actions', () => {
    it('should render action buttons when provided', () => {
      const screen = render(
        <IressInput
          data-testid="test-input"
          actions={[
            { children: 'Action 1', onClick: vi.fn() },
            { children: 'Action 2', onClick: vi.fn() },
          ]}
        />,
      );

      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });

    it('should call onClick handler when action button is clicked', async () => {
      const handleAction1 = vi.fn();
      const handleAction2 = vi.fn();

      const screen = render(
        <IressInput
          data-testid="test-input"
          actions={[
            { children: 'Action 1', onClick: handleAction1 },
            { children: 'Action 2', onClick: handleAction2 },
          ]}
        />,
      );

      const action1Button = screen.getByText('Action 1');
      const action2Button = screen.getByText('Action 2');

      await userEvent.click(action1Button);
      expect(handleAction1).toHaveBeenCalledTimes(1);
      expect(handleAction2).not.toHaveBeenCalled();

      await userEvent.click(action2Button);
      expect(handleAction2).toHaveBeenCalledTimes(1);
      expect(handleAction1).toHaveBeenCalledTimes(1);
    });

    it('should not render action buttons when actions is not provided', () => {
      const screen = render(<IressInput data-testid="test-input" />);

      // Should only have the input, no action buttons
      const buttons = screen.queryAllByRole('button');
      expect(buttons).toHaveLength(0);
    });

    it('should render actions with custom button props', () => {
      const screen = render(
        <IressInput
          data-testid="test-input"
          actions={[
            {
              children: 'Custom Action',
              onClick: vi.fn(),
              'aria-label': 'Custom action button',
            },
          ]}
        />,
      );

      const actionButton = screen.getByLabelText('Custom action button');
      expect(actionButton).toBeInTheDocument();
      expect(actionButton).toHaveTextContent('Custom Action');
    });
  });
});
