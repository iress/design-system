import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IressToggle, toggle } from '.';

const layouts = [
  'inline',
  'inline-between',
  'inline-reverse',
  'stack',
] as const;

describe('IressToggle', () => {
  it('renders with all data-testids', () => {
    const labelText = 'Test Label';
    render(<IressToggle data-testid="test-toggle">{labelText}</IressToggle>);
    expect(screen.getByTestId('test-toggle')).toBeInTheDocument();
    expect(
      screen.getByTestId('test-toggle__button__button'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('test-toggle__label')).toBeInTheDocument();
  });

  it('renders with a label', () => {
    const labelText = 'Test Label';
    render(<IressToggle>{labelText}</IressToggle>);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  it('renders label only for SR when hiddenLabel is true', () => {
    const labelText = 'Test Label';
    render(<IressToggle hiddenLabel>{labelText}</IressToggle>);
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass(toggle({ hiddenLabel: true }).label!);
  });

  it('renders label for everyone when hiddenLabel is false', () => {
    const labelText = 'Test Label';
    render(<IressToggle>{labelText}</IressToggle>);
    const label = screen.getByText(labelText);
    expect(label).toBeInTheDocument();
    expect(label).not.toHaveClass(toggle({ hiddenLabel: true }).label!);
  });

  it.each(layouts)('renders with %s layout', (layout) => {
    render(
      <IressToggle data-testid="test-id" layout={layout}>
        Test text
      </IressToggle>,
    );

    const element = screen.getByTestId('test-id');
    expect(element).toHaveClass(toggle({ layout }).toggleBase!);
    expect(element).toBeInstanceOf(HTMLDivElement);
  });

  it.each([true, false])(
    'renders with the buttonChecked class when checked is %s',
    (isChecked) => {
      render(<IressToggle checked={isChecked}>Test text</IressToggle>);

      const toggleButton = screen.getByRole('switch');
      if (isChecked) {
        expect(toggleButton).toHaveClass(
          toggle({ checked: true }).toggleButton!,
        );
      } else {
        expect(toggleButton).not.toHaveClass(
          toggle({ checked: true }).toggleButton!,
        );
      }
    },
  );

  it('emits the onChange event', async () => {
    const onChange = vi.fn();

    render(<IressToggle onChange={onChange}>Label</IressToggle>);

    const toggle = screen.getByRole('switch');

    await userEvent.click(toggle);

    expect(onChange).toHaveBeenCalledWith(true, expect.anything());

    await userEvent.click(toggle);

    expect(onChange).toHaveBeenCalledWith(false, expect.anything());
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressToggle>Toggle</IressToggle>
        <IressToggle hiddenLabel>Toggle</IressToggle>
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('interactions & events', () => {
  it('checked when it is clicked', async () => {
    render(<IressToggle>Toggle</IressToggle>);
    const toggleElement = screen.getByRole('switch');

    // Toggle is not checked as default.
    expect(toggleElement).not.toHaveClass(
      toggle({ checked: true }).toggleButton!,
    );

    await userEvent.click(toggleElement);

    // Toggle is checked after the click.
    expect(toggleElement).toHaveClass(toggle({ checked: true }).toggleButton!);
    expect(toggleElement.getAttribute('aria-checked')).toBe('true');
  });
});
