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
    expect(input).toHaveAttribute(
      'class',
      expect.stringContaining('pos_absolute'),
    );
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

    describe('hiddenControl', () => {
      it('before checked: hides the radio mark and the checkbox mark (visually), yet still accessible', () => {
        const screen = renderRadio({
          required: true,
          hiddenControl: true,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toBeInTheDocument();

        const radioMark = screen.queryByTestId(`${TEST_ID}__radioMark`);
        expect(radioMark).not.toBeInTheDocument();
        const checkboxMark = screen.queryByTestId(`${TEST_ID}__checkboxMark`);
        expect(checkboxMark).toBeInTheDocument();
        expect(checkboxMark).toHaveClass(
          radioStyles({ hiddenControl: true, checked: false }).checkboxMark!,
        );
      });

      it('after checked: hides the radio mark, shows the checkbox mark and colored border, yet still accessible', async () => {
        const screen = renderRadio({
          required: true,
          hiddenControl: true,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toBeInTheDocument();

        await userEvent.click(input);

        const radioMark = screen.queryByTestId(`${TEST_ID}__radioMark`);
        expect(radioMark).not.toBeInTheDocument();
        const checkboxMark = screen.queryByTestId(`${TEST_ID}__checkboxMark`);
        expect(checkboxMark).toBeInTheDocument();
        expect(checkboxMark).toHaveClass(
          radioStyles({ hiddenControl: true, checked: true }).checkboxMark!,
        );
        const label = screen.getByText(TEST_ID).closest('label');
        expect(label).toHaveClass(
          radioStyles({ hiddenControl: true, checked: true }).label!,
        );
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
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderRadio();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('touch', () => {
    it('adds the touch class to the radio when touch prop is true', () => {
      const screen = renderRadio({
        touch: true,
      });

      const component = screen.getByTestId(TEST_ID);
      expect(component).toHaveClass('group');

      const label = component.querySelector('label');
      expect(label).toHaveClass(radioStyles({ touch: true }).label!);
    });
  });
});
