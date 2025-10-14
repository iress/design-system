import { RenderResult, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import {
  IressRadioGroup,
  IressRadioGroupProps,
  shouldFireRadioGroupBlur,
} from '.';
import { getFinancialReviewChildren } from './mocks/radioGroupChildren';
import styles from './RadioGroup.module.scss';
import radioStyles from '../Radio/Radio.module.scss';
import userEvent from '@testing-library/user-event';
import { IressField, IressFieldProps } from '../Field';
import { idsLogger } from '@helpers/utility/idsLogger';

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
      'test-class',
      styles.radioGroup,
      styles.stack,
    );

    screen.getAllByRole('radio').forEach((input) => {
      expect(input).toHaveAttribute('name', TEST_ID);
      expect(input).not.toHaveAttribute('checked');
    });
  });

  describe('props', () => {
    describe('hiddenRadio', () => {
      it('renders all radio children as hidden radios', () => {
        const screen = renderRadioGroup({
          hiddenRadio: true,
        });

        screen.getAllByTestId(CHILDREN_TEST_ID).forEach((radio) => {
          expect(radio).toHaveClass(radioStyles.hiddenControl);
        });
      });
    });

    describe('layout', () => {
      it('changes the layout class name on the radio group', () => {
        const screen = renderRadioGroup({
          layout: 'inlineEqualWidth',
        });

        const radioGroup = screen.getByTestId(TEST_ID);
        expect(radioGroup).toHaveClass(styles.inlineEqualWidth);
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

    describe('onBlur', () => {
      it('does not call onBlur when clicking within the radio group', async () => {
        const onBlur = vi.fn();
        const screen = renderRadioGroup({
          onBlur,
        });

        const firstRadio = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        const secondRadio = screen.getByRole('radio', {
          name: 'Saving for a holiday',
        });

        // Click on first radio - should not trigger onBlur
        await userEvent.click(firstRadio);
        expect(onBlur).not.toHaveBeenCalled();

        // Click on second radio - should not trigger onBlur
        await userEvent.click(secondRadio);
        expect(onBlur).not.toHaveBeenCalled();
      });

      it('calls onBlur when focus moves to an element outside the radio group', async () => {
        const onBlur = vi.fn();
        const screen = render(
          <div>
            <IressRadioGroup onBlur={onBlur} data-testid={TEST_ID}>
              {getFinancialReviewChildren(undefined, CHILDREN_TEST_ID)}
            </IressRadioGroup>
            <button>Outside button</button>
          </div>,
        );

        const firstRadio = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        const outsideButton = screen.getByRole('button', {
          name: 'Outside button',
        });

        // Focus first radio
        await userEvent.click(firstRadio);
        expect(onBlur).not.toHaveBeenCalled();

        // Focus outside element - should trigger onBlur
        await userEvent.click(outsideButton);
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      it('handles the tab + click scenario correctly', async () => {
        const onBlur = vi.fn();
        const screen = render(
          <div>
            <button>Before button</button>
            <IressRadioGroup onBlur={onBlur} data-testid={TEST_ID}>
              {getFinancialReviewChildren(undefined, CHILDREN_TEST_ID)}
            </IressRadioGroup>
            <button>After button</button>
          </div>,
        );

        const beforeButton = screen.getByRole('button', {
          name: 'Before button',
        });
        const firstRadio = screen.getByRole('radio', {
          name: 'Buying my first home',
        });
        const radioGroup = screen.getByRole('radiogroup');

        // Start with focus on before button
        await userEvent.click(beforeButton);

        // Tab to radio group (simulating keyboard navigation)
        radioGroup.focus();

        // Now click on a radio (simulating the bug scenario)
        await userEvent.click(firstRadio);

        // onBlur should NOT be called because we're clicking within the RadioGroup
        expect(onBlur).not.toHaveBeenCalled();
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

    describe('readonly', () => {
      it('renders a hidden input with the correct value, if checked', () => {
        const screen = renderRadioGroup({
          defaultValue: 'home',
          readonly: true,
        });

        // No radio is rendered in readonly mode
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
          readonly: true,
        });

        // No radio is rendered in readonly mode if none were selected
        const radioGroup = screen.getByRole('radiogroup');
        expect(radioGroup.innerHTML).toBe('');
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

  describe('touch', () => {
    it('adds the touch class to the radio when touch prop is true', () => {
      const screen = renderRadioGroup({
        touch: true,
      });

      screen.getAllByRole('radio').forEach((input) => {
        expect(input).toHaveClass(radioStyles.input);
      });
    });
  });

  describe('shouldFireRadioGroupBlur', () => {
    // Helper to create a mock HTMLElement with minimal API for contains
    function createElementWithChildren(
      children: HTMLElement[] = [],
    ): HTMLElement {
      const el = document.createElement('div');
      children.forEach((c) => el.appendChild(c));
      return el;
    }

    it('returns false when new focus target is inside radio group', () => {
      const child = document.createElement('button');
      const group = createElementWithChildren([child]);
      expect(shouldFireRadioGroupBlur(group, child, child)).toBe(false);
    });

    it('returns true when focus moves outside the group', () => {
      const child = document.createElement('button');
      const outside = document.createElement('button');
      const group = createElementWithChildren([child]);
      expect(shouldFireRadioGroupBlur(group, outside, child)).toBe(true);
    });

    it('returns true when relatedTarget is null and event target is the group element', () => {
      const group = createElementWithChildren();
      expect(shouldFireRadioGroupBlur(group, null, group)).toBe(true);
    });

    it('returns false when relatedTarget is null and event target is NOT the group element', () => {
      const group = createElementWithChildren();
      const other = document.createElement('div');
      expect(shouldFireRadioGroupBlur(group, null, other)).toBe(false);
    });

    it('returns true when group element is null (defensive fallback)', () => {
      const outside = document.createElement('div');
      expect(shouldFireRadioGroupBlur(null, outside, outside)).toBe(true);
    });
  });
});
