import { render, RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressRadio, IressRadioProps, radio as radioStyles } from '.';
import userEvent from '@testing-library/user-event';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

function renderRadio(
  { children, ...restProps }: Partial<IressRadioProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressRadio {...restProps} data-testid={TEST_ID}>
      {children ?? TEST_ID}
    </IressRadio>,
  );
}

describe('IressRadio', () => {
  it('renders the component with the correct testids', () => {
    const screen = renderRadio({
      children: 'Test text',
      className: 'test-class',
    });

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__input`)).toBeInTheDocument();
  });

  it('renders the component with the correct classes and defaults', () => {
    const screen = renderRadio({
      children: 'Test text',
      className: 'test-class',
    });

    const component = screen.getByTestId(TEST_ID);
    expect(component).toHaveClass(
      'test-class',
      radioStyles().root!,
      GlobalCSSClass.Radio,
    );

    const input = screen.getByRole('radio', { name: 'Test text' });
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    expect(input).toHaveClass('sr_true');
  });

  describe('props', () => {
    describe('checked', () => {
      it('renders the input as checked', () => {
        const screen = renderRadio({
          checked: true,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toBeChecked();
      });

      it('renders the input as checked when it is clicked', async () => {
        const screen = renderRadio();

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).not.toBeChecked();

        await userEvent.click(input);
        expect(input).toBeChecked();
      });
    });

    describe('name', () => {
      it('renders the input with correct name', () => {
        const screen = renderRadio({
          name: TEST_ID,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toHaveAttribute('name', TEST_ID);
      });
    });

    describe('onChange', () => {
      it('calls the handler when the user clicks the radio button', async () => {
        const onChange = vi.fn();
        const screen = renderRadio({
          onChange,
          value: 9,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({ target: input }),
          9,
        );
      });
    });

    describe('readOnly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = render(
          <IressRadio value="radio" defaultChecked readOnly>
            Label
          </IressRadio>,
        );

        // No radio is rendered in readOnly mode
        const radio = screen.queryByRole('radio');
        expect(radio).not.toBeInTheDocument();

        // Label should be rendered
        expect(screen.getByText('Label')).toBeInTheDocument();

        // Input with the value should be rendered
        const input = screen.container.querySelector(`input[value="radio"]`);
        expect(input).toBeInTheDocument();
      });

      it('renders nothing, if unchecked', () => {
        const screen = render(
          <IressRadio value="radio" readOnly>
            Label
          </IressRadio>,
        );

        // No radio is rendered in readOnly mode
        const radio = screen.queryByRole('radio');
        expect(radio).not.toBeInTheDocument();

        // Label should not be rendered
        expect(screen.queryByText('Label')).not.toBeInTheDocument();

        // Input with the value should not be rendered
        const input = screen.container.querySelector(`input[value="radio"]`);
        expect(input).not.toBeInTheDocument();
      });

      it('supports readOnly="locked" when checked', () => {
        const screen = render(
          <IressRadio value="radio" defaultChecked readOnly="locked">
            Label
          </IressRadio>,
        );

        expect(screen.queryByRole('radio')).not.toBeInTheDocument();
        expect(screen.getByText('Label')).toBeInTheDocument();
        const input = screen.container.querySelector(`input[value="radio"]`);
        expect(input).toBeInTheDocument();
      });
    });

    describe('required', () => {
      it('renders the input as required', () => {
        const screen = renderRadio({
          required: true,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toBeRequired();
      });
    });

    describe('value', () => {
      it('renders the input with correct value (cast as string)', () => {
        const screen = render(
          <form name="form">
            <IressRadio name="test" value={true}>
              {TEST_ID}
            </IressRadio>
          </form>,
        );

        const form = screen.getByRole('form');
        expect(form).toHaveFormValues({
          test: 'true',
        });
      });
    });

    describe('variant', () => {
      it('adds touch class when variant prop is touch', () => {
        const screen = render(
          <IressRadio value="Test value" name="test-name" variant="touch">
            Test
          </IressRadio>,
        );
        const radio = screen.getByRole('radio');
        expect(radio).toHaveClass(radioStyles({ variant: 'touch' }).input!);
      });

      it('adds the card class when variant prop is card', () => {
        const screen = render(
          <IressRadio
            value="Test value"
            name="test-name"
            data-testid={TEST_ID}
            variant="card"
          >
            Test
          </IressRadio>,
        );
        const radioMark = screen.queryByTestId(`${TEST_ID}__radioMark`);
        expect(radioMark).toHaveClass(radioStyles({ variant: 'card' }).mark!);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderRadio();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
