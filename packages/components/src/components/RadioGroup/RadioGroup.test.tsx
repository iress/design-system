import { RenderResult, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  IressRadioGroup,
  IressRadioGroupProps,
  radioGroup as radioGroupStyles,
} from '.';
import { getFinancialReviewChildren } from './mocks/radioGroupChildren';
import userEvent from '@testing-library/user-event';
import { IressField, IressFieldProps } from '../Field';
import { idsLogger } from '@helpers/utility/idsLogger';
import { radio as radioStyles } from '../Radio/Radio.styles';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const CHILDREN_TEST_ID = 'test-children';
const LABEL = 'Test label';

function renderRadioGroup(
  {
    children = getFinancialReviewChildren(undefined, CHILDREN_TEST_ID),
    name = TEST_ID,
    ...restProps
  }: Partial<IressRadioGroupProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressRadioGroup {...restProps} name={name} data-testid={TEST_ID}>
      {children}
    </IressRadioGroup>,
  );
}

function renderRadioGroupInField(
  {
    children = getFinancialReviewChildren(undefined, CHILDREN_TEST_ID),
    name = TEST_ID,
    ...restProps
  }: Partial<IressRadioGroupProps> = {},
  fieldProps: Partial<IressFieldProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressField {...fieldProps} label={fieldProps.label ?? LABEL}>
      <IressRadioGroup {...restProps} name={name} data-testid={TEST_ID}>
        {children}
      </IressRadioGroup>
    </IressField>,
  );
}

describe('IressRadioGroup', () => {
  it('renders the component with the correct classes and defaults', () => {
    const screen = renderRadioGroup({
      className: 'test-class',
    });

    const component = screen.getByTestId(TEST_ID);
    expect(component).toHaveAttribute('role', 'radiogroup');
    expect(component).toHaveClass(
      radioGroupStyles({ layout: 'stack' }),
      GlobalCSSClass.RadioGroup,
    );

    screen.getAllByRole('radio').forEach((input) => {
      expect(input).toHaveAttribute('name', TEST_ID);
      expect(input).not.toHaveAttribute('checked');
    });
  });

  describe('props', () => {
    describe('layout', () => {
      it('changes the layout class name on the radio group', () => {
        const screen = renderRadioGroup({
          layout: 'inlineEqualWidth',
        });

        const radioGroup = screen.getByTestId(TEST_ID);
        expect(radioGroup).toHaveClass(
          radioGroupStyles({ layout: 'inlineEqualWidth' }),
        );
      });
    });

    describe('onChange', () => {
      it('calls the handler when the user clicks the radio button', async () => {
        const onChange = vi.fn();
        const screen = renderRadioGroup({
          onChange,
        });

        const input = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        await userEvent.click(input);

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({ target: input }),
          'home',
        );
      });
    });

    describe('required', () => {
      it('renders all radio children as required', () => {
        const screen = renderRadioGroup({
          required: true,
        });

        screen.getAllByRole('radio').forEach((input) => {
          expect(input).toHaveAttribute('required');
        });
      });
    });

    describe('value', () => {
      it('selects a radio option by default', () => {
        const screen = renderRadioGroup({
          value: 'home',
        });

        const input = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        expect(input).toHaveAttribute('checked');
      });
    });

    describe('defaultValue', () => {
      it('selects a radio option by default', () => {
        const screen = renderRadioGroup({
          defaultValue: 'home',
        });

        const input = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        expect(input).toHaveAttribute('checked');
      });

      it('logs a warning when both the value and defaultValue props are used', async () => {
        renderRadioGroup({
          defaultValue: 'home',
          value: 'home',
        });

        await waitFor(() => expect(idsLogger).toHaveBeenCalledTimes(1));
      });
    });

    describe('readOnly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = renderRadioGroup({
          defaultValue: 'home',
          readOnly: true,
        });

        // No radio is rendered in readOnly mode
        const radio = screen.queryByRole('radio');
        expect(radio).not.toBeInTheDocument();

        // Label should be rendered
        expect(screen.getByText('Buying my first home')).toBeInTheDocument();

        // Input with the value should be rendered
        const input = screen.container.querySelector(`input[value="home"]`);
        expect(input).toBeInTheDocument();
      });

      it('renders nothing, if nothing checked', () => {
        const screen = renderRadioGroup({
          readOnly: true,
        });

        // No radio is rendered in readOnly mode if none were selected
        const radioGroup = screen.getByRole('radiogroup');
        expect(radioGroup.innerHTML).toBe('');
      });

      it('supports readOnly="locked"', () => {
        const screen = renderRadioGroup({
          defaultValue: 'home',
          readOnly: 'locked',
        });

        expect(screen.queryByRole('radio')).not.toBeInTheDocument();
        expect(screen.getByText('Buying my first home')).toBeInTheDocument();
        const input = screen.container.querySelector(`input[value="home"]`);
        expect(input).toBeInTheDocument();
      });
    });

    describe('variant', () => {
      it('adds the card class to the radio group when variant prop is card', () => {
        const screen = renderRadioGroup({
          variant: 'card',
        });

        screen.getAllByRole('radio').forEach((checkbox) => {
          expect(checkbox).toHaveClass(radioStyles({ variant: 'card' }).input!);
        });
      });

      it('adds the touch class to the radio group when variant prop is touch', () => {
        const screen = renderRadioGroup({
          variant: 'touch',
        });

        screen.getAllByRole('radio').forEach((checkbox) => {
          expect(checkbox).toHaveClass(
            radioStyles({ variant: 'touch' }).input!,
          );
        });
      });
    });
  });

  describe('interactions', () => {
    it('should focus on first element when radio group is focused', () => {
      const screen = renderRadioGroup({
        tabIndex: -1, // Needs tabindex to focus
        value: 'home',
      });

      const radios = screen.getAllByRole('radio');

      screen.getByRole('radiogroup').focus();
      expect(radios[0]).toHaveFocus();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderRadioGroup();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues when in field', async () => {
      const screen = renderRadioGroupInField();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
