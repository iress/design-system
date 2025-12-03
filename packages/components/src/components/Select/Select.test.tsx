import { type RenderResult, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IressSelect, type IressSelectProps, IressSelectOption } from '.';
import styles from './Select.module.scss';
import { GlobalCSSClass } from '@/enums';
import { IressLabel } from '../Label';

const TEST_ID = 'test-component';
const NAME = 'test-component';

function renderComponent(
  {
    children = [
      <option value="1" key="1">
        One
      </option>,
      <IressSelectOption value={2} key="2">
        Two
      </IressSelectOption>,
      <option value="3" key="3">
        Three
      </option>,
    ],
    'data-testid': dataTestId = TEST_ID,
    name = NAME,
    ...props
  }: Omit<IressSelectProps, 'name'> & { name?: string } = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressSelect {...props} name={name} data-testid={dataTestId}>
      {children}
    </IressSelect>,
  );
}

describe('IressSelect', () => {
  it('should render the component with the correct classes and roles', () => {
    const screen = renderComponent({
      className: 'test-class',
      style: { color: 'red' },
    });

    const wrapper = screen.getByTestId(TEST_ID);
    expect(wrapper).toHaveClass('test-class');
    expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    const component = screen.getByTestId(`${TEST_ID}__select`);
    expect(component).toHaveClass(styles.element);
    expect(component).toHaveAttribute('name');

    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  describe('props', () => {
    describe('defaultValue', () => {
      it('sets the correct initial value', () => {
        const screen = renderComponent({
          defaultValue: 2,
        });

        const selected = screen.getByRole('option', { selected: true });
        expect(selected).toHaveTextContent('Two');
      });
    });

    describe('name', () => {
      it('renders name attribute', () => {
        const screen = renderComponent({
          name: NAME,
        });

        const select = screen.getByRole('combobox');
        expect(select).toHaveAttribute('name', NAME);
      });
    });

    describe('onChange', () => {
      it('fires onChange event', async () => {
        const onChange = vitest.fn();

        const screen = renderComponent({
          onChange,
          placeholder: 'Select an option',
        });

        await userEvent.selectOptions(screen.getByRole('combobox'), '2');

        expect(onChange).toHaveBeenCalledTimes(1);
      });

      it('fires onChange event twice when there is no placeholder (to sync value)', async () => {
        const onChange = vitest.fn();

        const screen = renderComponent({
          onChange,
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: expect.objectContaining({
              value: '1',
            }) as EventTarget,
          }),
          '1',
        );

        await userEvent.selectOptions(screen.getByRole('combobox'), '2');

        expect(onChange).toHaveBeenCalledTimes(2);
      });
    });

    describe('onFocus', () => {
      it('fires onFocus event', async () => {
        const onFocus = vitest.fn();

        const screen = renderComponent({
          onFocus,
        });

        await userEvent.click(screen.getByRole('combobox'));

        expect(onFocus).toHaveBeenCalledTimes(1);
      });
    });

    describe('onBlur', () => {
      it('fires onBlur event', async () => {
        const onBlur = vitest.fn();

        const screen = renderComponent({
          onBlur,
        });

        await userEvent.click(screen.getByRole('combobox'));
        await userEvent.tab();

        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });

    describe('placeholder', () => {
      it('renders placeholder as the first option', () => {
        const screen = renderComponent({
          placeholder: 'Placeholder text',
        });

        const options = screen.getAllByRole('option');
        expect(options).toHaveLength(4);
        expect(options[0].textContent).toEqual('Placeholder text');
      });
    });

    describe('readonly', () => {
      it('renders no options', () => {
        const screen = renderComponent({
          readonly: true,
        });

        expect(screen.queryAllByRole('option')).toHaveLength(0);
      });

      it('renders the selected value into an input', () => {
        const screen = renderComponent({
          readonly: true,
          defaultValue: 2,
        });

        const input = screen.getByText('Two');
        const realInput = screen.getByDisplayValue('2');
        expect(input).toBeInTheDocument();
        expect(realInput).toBeInTheDocument();
      });
    });

    describe('value', () => {
      it('renders selected item', () => {
        const screen = renderComponent({
          value: 2,
        });

        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('2');
      });
    });

    describe('width', () => {
      it('renders correct classes', () => {
        const screen = renderComponent({
          width: IressSelect.Width.SeventyFivePercent,
        });

        expect(screen.getByTestId(TEST_ID)).toHaveClass(
          `${GlobalCSSClass.Width}--75perc`,
        );
      });
    });
  });

  describe('interactions', () => {
    describe('options change', () => {
      it('updates the value correctly when the selecting a new option', async () => {
        const screen = renderComponent({
          defaultValue: 2,
        });

        const select = screen.getByRole('combobox');
        expect(select).toHaveDisplayValue('Two');

        await userEvent.selectOptions(select, '1');

        expect(select).toHaveDisplayValue('One');
      });

      it('updates the value correctly when the selecting a new option (optgroups)', async () => {
        const screen = renderComponent({
          defaultValue: 'opt2',
          children: (
            <>
              <optgroup label="group one">
                <option value="opt1">One</option>
                <option value="opt2">Two</option>
              </optgroup>
              <optgroup label="group two">
                <option value="opt3">Three</option>
                <option value="opt4">Four</option>
              </optgroup>
            </>
          ),
        });

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.selectedIndex).toBe(1);

        await userEvent.selectOptions(select, 'opt1');

        expect(select.selectedIndex).toBe(0);
      });

      it('resets the value correctly when selected option is programmatically removed', () => {
        const screen = renderComponent({
          defaultValue: 'opt2',
          children: (
            <>
              <option value="">Please select a value</option>
              <option value="opt1">One</option>
              <option value="opt2">Two</option>
              <option value="opt3">Three</option>
            </>
          ),
        });

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.selectedIndex).toBe(2);

        renderComponent(
          {
            children: (
              <>
                <option value="">Please select a value</option>
                <option value="opt1">One</option>
                <option value="opt3">Three</option>
              </>
            ),
          },
          screen.rerender as never,
        );

        expect(select.selectedIndex).toBe(0);
      });

      it('keeps the current value correctly when the options change programmatically', () => {
        const screen = renderComponent({
          value: 'opt2',
          children: (
            <>
              <option value="">Please select a value</option>
              <option value="opt1">One</option>
              <option value="opt2">Two</option>
              <option value="opt3">Three</option>
            </>
          ),
        });

        const select = screen.getByRole('combobox') as HTMLSelectElement;
        expect(select.selectedIndex).toBe(2);

        renderComponent(
          {
            value: 'opt2',
            children: (
              <>
                <option value="">Please select a value</option>
                <option value="opt1">One</option>
                <option value="opt2">Changed second label</option>
                <option value="opt3">Three</option>
              </>
            ),
          },
          screen.rerender as never,
        );

        expect(select.selectedIndex).toBe(2);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <>
          <IressLabel htmlFor="select">Label</IressLabel>
          <IressSelect name="select" id="select" />
        </>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues - readonly mode', async () => {
      const screen = render(
        <>
          <IressLabel htmlFor="select">Label</IressLabel>
          <IressSelect name="select" id="select" readonly />
        </>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
