import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  IressCheckboxGroup,
  IressCheckboxGroupProps,
  checkboxGroup as checkboxGroupStyles,
} from '.';
import { getFinancialReviewCheckboxes } from './mocks/checkboxGroupChildren';
import { IressFieldGroup, IressFieldGroupProps } from '../FieldGroup';
import userEvent from '@testing-library/user-event';
import { IressCheckbox, checkbox as checkboxStyles } from '../Checkbox';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const CHILDREN_TEST_ID = 'test-children';
const LABEL = 'Test label';

function renderComponent(
  props: IressCheckboxGroupProps = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressCheckboxGroup
      {...props}
      name={props?.name ?? TEST_ID}
      data-testid={props?.['data-testid'] ?? TEST_ID}
    >
      {props?.children ??
        getFinancialReviewCheckboxes(undefined, CHILDREN_TEST_ID)}
    </IressCheckboxGroup>,
  );
}

function renderComponentInField(
  props: IressCheckboxGroupProps = {},
  fieldProps: Partial<IressFieldGroupProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressFieldGroup {...fieldProps} label={fieldProps.label ?? LABEL}>
      <IressCheckboxGroup
        {...props}
        name={props?.name ?? TEST_ID}
        data-testid={props?.['data-testid'] ?? TEST_ID}
      >
        {props?.children ??
          getFinancialReviewCheckboxes(undefined, CHILDREN_TEST_ID)}
      </IressCheckboxGroup>
    </IressFieldGroup>,
  );
}

describe('IressCheckboxGroup', () => {
  it('should render the component with the correct classes and defaults', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const component = screen.getByTestId(TEST_ID);
    expect(component).toHaveAttribute('role', 'group');
    expect(component).toHaveClass(
      checkboxGroupStyles({ layout: 'stack' }),
      GlobalCSSClass.CheckboxGroup,
    );

    screen.getAllByRole('checkbox').forEach((input) => {
      expect(input).toHaveAttribute('name', TEST_ID);
      expect(input).not.toHaveAttribute('checked');
    });
  });

  describe('props', () => {
    describe('defaultValue', () => {
      it('selects a checkbox by default', () => {
        const screen = renderComponent({
          defaultValue: 'home',
        });

        const checkedRadio = screen.getByRole('checkbox', {
          name: 'Buying my first home',
          checked: true,
        });
        expect(checkedRadio).toBeInTheDocument();
      });
    });

    describe('layout', () => {
      it('changes the layout class name on the radio group', () => {
        const screen = renderComponent({
          layout: 'inline',
        });

        const checkboxGroup = screen.getByTestId(TEST_ID);
        expect(checkboxGroup).toHaveClass(
          checkboxGroupStyles({ layout: 'inline' }),
        );
      });
    });

    describe('onChange', () => {
      it('calls the handler when the user clicks the checkbox', async () => {
        const onChange = vi.fn();
        const screen = renderComponent({
          defaultValue: [],
          onChange,
        });

        const input = screen.getByRole('checkbox', {
          name: 'Buying my first home',
        });
        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith(['home']);

        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith([]);
      });

      it('calls the inner checkbox handler if provided', async () => {
        const onChange = vi.fn();
        const onCheckboxChange = vi.fn();
        const screen = render(
          <IressCheckboxGroup onChange={onChange}>
            <IressCheckbox onChange={onCheckboxChange} value="home">
              Buying my first home
            </IressCheckbox>
          </IressCheckboxGroup>,
        );

        const input = screen.getByRole('checkbox', {
          name: 'Buying my first home',
        });
        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith(['home']);
        expect(onCheckboxChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: input,
          }),
          true,
          'home',
        );
        expect(input).toBeChecked();

        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith([]);
        expect(onCheckboxChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: input,
          }),
          false,
          'home',
        );
        expect(input).not.toBeChecked();
      });
    });

    describe('readOnly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = renderComponent({
          value: ['home'],
          readOnly: true,
        });

        // No checkbox is rendered in readOnly mode
        const checkbox = screen.queryByRole('checkbox');
        expect(checkbox).not.toBeInTheDocument();

        // Label should be rendered
        expect(screen.getByText('Buying my first home')).toBeInTheDocument();

        // Input with the value should be rendered
        const input = screen.container.querySelector(`input[value="home"]`);
        expect(input).toBeInTheDocument();
      });

      it('renders nothing, if nothing checked', () => {
        const screen = renderComponent({
          readOnly: true,
        });

        // No checkbox is rendered in readOnly mode if none were selected
        const checkboxGroup = screen.getByRole('group');
        expect(checkboxGroup.innerHTML).toBe('');
      });

      it('supports readOnly="locked"', () => {
        const screen = renderComponent({
          value: ['home'],
          readOnly: 'locked',
        });

        expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
        expect(screen.getByText('Buying my first home')).toBeInTheDocument();
        const input = screen.container.querySelector(`input[value="home"]`);
        expect(input).toBeInTheDocument();
      });
    });

    describe('value', () => {
      it('selects a checkbox by default', () => {
        const screen = renderComponent({
          value: ['home'],
        });

        const checkedRadio = screen.getByRole('checkbox', {
          name: 'Buying my first home',
          checked: true,
        });
        expect(checkedRadio).toBeInTheDocument();
      });
    });

    describe('variant', () => {
      it('adds the card class to the checkbox group when variant prop is card', () => {
        const screen = renderComponent({
          variant: 'card',
        });

        screen.getAllByRole('checkbox').forEach((checkbox) => {
          expect(checkbox).toHaveClass(
            checkboxStyles({ variant: 'card' }).input!,
          );
        });
      });

      it('adds the touch class to the checkbox group when variant prop is touch', () => {
        const screen = renderComponent({
          variant: 'touch',
        });

        screen.getAllByRole('checkbox').forEach((checkbox) => {
          expect(checkbox).toHaveClass(
            checkboxStyles({ variant: 'touch' }).input!,
          );
        });
      });
    });
  });

  describe('interactions', () => {
    it('should focus on first element when checkbox group is focused', () => {
      const screen = renderComponent({
        tabIndex: -1, // Needs tabindex to focus
        value: 'home',
      });

      const radios = screen.getAllByRole('checkbox');

      screen.getByTestId(TEST_ID).focus();
      expect(radios[0]).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues when in field', async () => {
      const screen = renderComponentInField();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
