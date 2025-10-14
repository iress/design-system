import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressButtonGroup, IressButtonGroupProps } from '.';
import { IressButton } from '../Button/Button';
import userEvent from '@testing-library/user-event';
import { buttonGroup } from './ButtonGroup.styles';
import { FormControlValue } from '@/types';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const TEST_CHILDREN = [
  <IressButton key="1">Option 1</IressButton>,
  <IressButton key="2" value={2}>
    Option 2
  </IressButton>,
  <IressButton key="3" value={3}>
    Option 3
  </IressButton>,
];
const TEST_LABEL = 'Button group';

function renderComponent<
  T = FormControlValue,
  TMultiple extends boolean = false,
>(
  props: Partial<IressButtonGroupProps<T, TMultiple>> = {},
  renderFn: typeof render = render,
) {
  return renderFn(
    <IressButtonGroup
      {...props}
      data-testid={TEST_ID}
      label={props?.label ?? TEST_LABEL}
    >
      {props?.children ?? TEST_CHILDREN}
    </IressButtonGroup>,
  );
}

describe('IressButtonGroup', () => {
  it('renders the component with the correct text and classes', () => {
    const screen = renderComponent({
      className: 'test-class',
    });
    const classes = buttonGroup();

    const container = screen.getByTestId(TEST_ID);
    expect(container).toHaveClass(
      `test-class ${classes.root}`,
      GlobalCSSClass.ButtonGroup,
    );

    const group = screen.getByRole('group', { name: TEST_LABEL });
    expect(group).toHaveClass(classes.values!);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(TEST_CHILDREN.length);
  });

  it('allows user to toggle buttons', async () => {
    const screen = renderComponent();

    const option1 = screen.getByRole('button', { name: 'Option 1' });

    await userEvent.click(option1);
    expect(option1).toHaveAttribute('aria-pressed', 'true');

    await userEvent.click(option1);
    expect(option1).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders with the correct data-testids', () => {
    const screen = renderComponent();

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__label`)).toBeInTheDocument();
  });

  describe('props', () => {
    describe('label', () => {
      it('renders a string label', () => {
        const screen = renderComponent({
          label: 'Test label',
        });

        const label = screen.getByText('Test label');
        expect(label).toHaveClass(buttonGroup().label!);

        const group = screen.getByRole('group', { name: 'Test label' });
        expect(group).toBeInTheDocument();
      });

      it('renders an element directly, with the id', () => {
        const screen = renderComponent({
          label: <h2>Heading label</h2>,
        });

        const label = screen.getByRole('heading', { name: 'Heading label' });
        expect(label).toBeInTheDocument();

        const group = screen.getByRole('group', { name: 'Heading label' });
        expect(group).toBeInTheDocument();
      });
    });

    describe('defaultSelected', () => {
      it('renders a default pressed button', () => {
        const screen = renderComponent({
          defaultSelected: 'Option 1',
        });

        const button = screen.getByRole('button', {
          name: 'Option 1',
          pressed: true,
        });
        expect(button).toBeInTheDocument();
      });

      it('uses the button value prop if defined', () => {
        const screen = renderComponent({
          defaultSelected: 2,
        });

        const button = screen.getByRole('button', {
          name: 'Option 2',
          pressed: true,
        });
        expect(button).toBeInTheDocument();
      });
    });

    describe('hiddenLabel', () => {
      it('adds the screen reader only class to label', () => {
        const screen = renderComponent({
          hiddenLabel: true,
        });

        const label = screen.getByText(TEST_LABEL);
        expect(label).toHaveClass(buttonGroup({ hiddenLabel: true }).label!);
      });
    });

    describe('multiple', () => {
      it('allows multiple buttons to be selected', async () => {
        const screen = renderComponent({
          multiple: true,
        });

        const option1 = screen.getByRole('button', { name: 'Option 1' });
        const option2 = screen.getByRole('button', { name: 'Option 2' });

        await userEvent.click(option1);
        await userEvent.click(option2);

        expect(option1).toHaveAttribute('aria-pressed', 'true');
        expect(option2).toHaveAttribute('aria-pressed', 'true');
      });
    });

    describe('onChange', () => {
      it('is called when user changes the value', async () => {
        const onChange = vi.fn();
        const screen = renderComponent({
          onChange,
        });

        const option1 = screen.getByRole('button', { name: 'Option 1' });
        const option2 = screen.getByRole('button', { name: 'Option 2' });

        await userEvent.click(option1);
        expect(onChange).toHaveBeenCalledWith('Option 1');

        await userEvent.click(option2);
        expect(onChange).toHaveBeenCalledWith(2);

        await userEvent.click(option2);
        expect(onChange).toHaveBeenCalledWith(undefined);
      });

      it('is called with array in a multiple button group', async () => {
        const onChange = vi.fn();
        const screen = renderComponent({
          onChange,
          multiple: true,
        });

        const option1 = screen.getByRole('button', { name: 'Option 1' });
        const option2 = screen.getByRole('button', { name: 'Option 2' });

        await userEvent.click(option1);
        expect(onChange).toHaveBeenCalledWith(['Option 1']);

        await userEvent.click(option2);
        expect(onChange).toHaveBeenCalledWith(['Option 1', 2]);

        await userEvent.click(option2);
        expect(onChange).toHaveBeenCalledWith(['Option 1']);
      });
    });

    describe('selected', () => {
      it('renders a default pressed button', () => {
        const screen = renderComponent({
          selected: 'Option 1',
        });

        const button = screen.getByRole('button', {
          name: 'Option 1',
          pressed: true,
        });
        expect(button).toBeInTheDocument();
      });

      it('uses the button value prop if defined', () => {
        const screen = renderComponent({
          selected: 2,
        });

        const button = screen.getByRole('button', {
          name: 'Option 2',
          pressed: true,
        });
        expect(button).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
