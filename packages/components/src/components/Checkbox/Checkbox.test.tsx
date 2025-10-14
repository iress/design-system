import { render } from '@testing-library/react';
import { IressCheckbox } from '.';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import styles from './Checkbox.module.scss';

describe('IressCheckbox', () => {
  describe('basic', () => {
    it('should render the component with checkbox and the correct checked state', () => {
      const screen = render(
        <IressCheckbox
          value="test"
          checked
          onChange={() => undefined}
          name="test checkbox"
        >
          A test checkbox
        </IressCheckbox>,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeChecked();
    });

    it('renders with the correct data-testids', () => {
      const screen = render(
        <IressCheckbox data-testid="input">A test checkbox</IressCheckbox>,
      );

      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('id', () => {
      it('sets a default ID when id is not set', () => {
        const screen = render(<IressCheckbox name="test-checkbox" />);
        const checkbox = screen.getByRole('checkbox');
        // As the ID is dynamically generated it changes depending on the combination of tests being run.
        // It always exists though, so we can test that
        expect(checkbox).toHaveAttribute('id');
      });

      it('uses the id passed in by the consumer if it is set', () => {
        const screen = render(
          <IressCheckbox id="test-set-id" name="test-checkbox" />,
        );
        const checkbox = screen.getByRole('checkbox');
        const checkboxId = checkbox.getAttribute('id');
        expect(checkboxId).toEqual('test-set-id');
      });
    });

    describe('required', () => {
      it('makes the checkbox required', () => {
        const screen = render(<IressCheckbox required name="test-checkbox" />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toHaveAttribute('required');
      });
    });

    describe('indeterminate', () => {
      it('makes the checkbox initially unchecked', async () => {
        const screen = render(
          <IressCheckbox name="test-checkbox" indeterminate />,
        );
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();

        await userEvent.click(checkbox);

        expect(checkbox).toBeChecked();
      });
    });

    describe('readonly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = render(
          <IressCheckbox value="checkbox" defaultChecked readOnly>
            Label
          </IressCheckbox>,
        );

        // No checkbox is rendered in readonly mode
        const checkbox = screen.queryByRole('checkbox');
        expect(checkbox).not.toBeInTheDocument();

        // Label should be rendered
        expect(screen.getByText('Label')).toBeInTheDocument();

        // Input with the value should be rendered
        const input = screen.container.querySelector(`input[value="checkbox"]`);
        expect(input).toBeInTheDocument();
      });

      it('renders nothing, if unchecked', () => {
        const screen = render(
          <IressCheckbox value="checkbox" readOnly>
            Label
          </IressCheckbox>,
        );

        // No checkbox is rendered in readonly mode
        const checkbox = screen.queryByRole('checkbox');
        expect(checkbox).not.toBeInTheDocument();

        // Label should not be rendered
        expect(screen.queryByText('Label')).not.toBeInTheDocument();

        // Input with the value should not be rendered
        const input = screen.container.querySelector(`input[value="checkbox"]`);
        expect(input).not.toBeInTheDocument();
      });
    });
  });

  describe('Interactions', () => {
    describe('events props', () => {
      it('calls onFocus callback', async () => {
        const focusSpy = vi.fn();
        render(<IressCheckbox name="test-checkbox" onFocus={focusSpy} />);

        await userEvent.tab(); // checkbox should receive focus

        expect(focusSpy).toHaveBeenCalledTimes(1);
      });
      it('calls onBlur callback', async () => {
        const blurSpy = vi.fn();
        render(<IressCheckbox name="test-checkbox" onBlur={blurSpy} />);

        await userEvent.tab(); // checkbox should receive focus
        await userEvent.tab(); // checkbox should lose focus

        expect(blurSpy).toHaveBeenCalledTimes(1);
      });
      it('calls onChange callback', async () => {
        const changeSpy = vi.fn();
        const screen = render(
          <IressCheckbox name="test-checkbox" onChange={changeSpy} />,
        );
        const checkbox = screen.getByRole('checkbox');

        await userEvent.click(checkbox);

        expect(changeSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues when displayed normally', async () => {
      const screen = render(
        <IressCheckbox value="Test value" name="test-name">
          Test
        </IressCheckbox>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
      expect(
        screen.getByRole('checkbox', { name: 'Test' }),
      ).toBeInTheDocument();
    });

    it('should not have basic accessibility issues when hiding the label', async () => {
      const screen = render(
        <IressCheckbox value="Test value" name="test-name" hiddenLabel>
          Test
        </IressCheckbox>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
      expect(screen.container.querySelector('div')?.classList.value).toContain(
        'hiddenLabel',
      );
    });
  });

  describe('touch', () => {
    it('should add touch class when touch prop is true', () => {
      const screen = render(
        <IressCheckbox value="Test value" name="test-name" touch>
          Test
        </IressCheckbox>,
      );
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveClass(styles.input);
    });
  });
});
