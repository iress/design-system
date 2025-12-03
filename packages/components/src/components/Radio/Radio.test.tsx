import { render, type RenderResult } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressRadio, type IressRadioProps } from '.';
import styles from './Radio.module.scss';
import userEvent from '@testing-library/user-event';

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
    expect(component).toHaveClass(`test-class ${styles.radio}`);

    const input = screen.getByRole('radio', { name: 'Test text' });
    expect(input).toBeInTheDocument();
    expect(input).not.toBeChecked();
    expect(input).toHaveClass(styles.input);
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
      it('hides the radio mark, yet still accessible', () => {
        const screen = renderRadio({
          required: true,
        });

        const input = screen.getByRole('radio', { name: TEST_ID });
        expect(input).toBeInTheDocument();

        const mark = screen.queryByTestId(`${TEST_ID}-mark`);
        expect(mark).not.toBeInTheDocument();
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

    describe('readonly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = render(
          <IressRadio value="radio" defaultChecked readOnly>
            Label
          </IressRadio>,
        );

        // No radio is rendered in readonly mode
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

        // No radio is rendered in readonly mode
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
      expect(component).toHaveClass(styles.touch);
    });
  });
});
