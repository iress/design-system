import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { IressLabel } from '../../Label';
import { GlobalCSSClass } from '@/enums';
import { NativeSelect, NativeSelectProps } from './NativeSelect';

const TEST_ID = 'test-component';
const NAME = 'test-component';

const renderComponent = (
  {
    options = [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: 2 },
      { label: 'Option 3', value: '3' },
      { label: 'Option 4', value: 4 },
      { label: 'Option 5', value: '5' },
    ],
    'data-testid': dataTestId = TEST_ID,
    name = NAME,
    ...props
  }: Partial<NativeSelectProps>,
  renderFn: typeof render = render,
) => {
  return renderFn(
    <NativeSelect
      {...(props as NativeSelectProps)}
      options={options}
      name={name}
      data-testid={dataTestId}
    />,
  );
};

describe('IressSelect (native)', () => {
  it('should render the component with the correct classes and roles', () => {
    const screen = renderComponent({
      className: 'test-class',
      style: { color: 'red' },
    });

    const wrapper = screen.getByTestId(TEST_ID);
    expect(wrapper).toHaveClass('test-class', GlobalCSSClass.Select);
    expect(wrapper).toHaveStyle({ color: 'rgb(255, 0, 0)' });

    const component = screen.getByTestId(`${TEST_ID}__select`);
    expect(component).toHaveAttribute('name');

    expect(screen.getAllByRole('option')).toHaveLength(5);
  });

  describe('props', () => {
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
        expect(options).toHaveLength(6);
        expect(options[0].textContent).toEqual('Placeholder text');
      });
    });

    describe('value', () => {
      it('renders selected item', () => {
        const screen = renderComponent({
          value: { label: 'Option 2', value: 2 },
        });

        const select = screen.getByRole('combobox');
        expect(select).toHaveValue('2');
      });
    });

    describe('width', () => {
      it('renders correct classes', () => {
        const screen = renderComponent({
          width: '75%',
        });

        expect(screen.getByTestId(TEST_ID)).toHaveClass(`w_9\/12`);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <>
          <IressLabel htmlFor="select">Label</IressLabel>
          <NativeSelect
            name="select"
            id="select"
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: 2 },
              { label: 'Option 3', value: '3' },
            ]}
          />
        </>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
