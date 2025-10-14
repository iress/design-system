import { RenderResult, fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSlider, IressSliderProps, slider as sliderStyles } from '.';
import { IressLabel } from '../Label';
import { css } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

function renderComponent(
  props: Partial<IressSliderProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(<IressSlider {...props} data-testid={TEST_ID} />);
}

describe('IressSlider', () => {
  it('renders the component with the correct classes', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const wrapper = screen.getByTestId(TEST_ID);
    expect(wrapper).toHaveClass(
      'test-class',
      sliderStyles().root!,
      GlobalCSSClass.Slider,
    );
    expect(wrapper).toHaveStyle({
      '--iress-thumb-value-offset': 'calc(0% + ((1.75rem / 2) - 0px))',
    });

    const slider = screen.getByRole('slider');
    expect(slider).toHaveClass(sliderStyles().control!);
    expect(slider).toHaveValue('0');

    const status = screen.getByRole('status');
    expect(status).toHaveClass(sliderStyles().thumbValue!);
    expect(status).toHaveTextContent('0');
  });

  it('renders the component with the correct test ids', () => {
    const screen = renderComponent({
      className: 'test-class',
    });

    const wrapper = screen.getByTestId(TEST_ID);
    const slider = screen.getByTestId(`${TEST_ID}__slider`);

    expect(wrapper).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
  });

  describe('props', () => {
    describe('defaultValue', () => {
      it('sets the initial value of the slider', () => {
        const screen = renderComponent({
          defaultValue: 2,
        });

        const slider = screen.getByRole('slider');
        expect(slider).toHaveValue('2');

        expect(screen.getByTestId(TEST_ID)).toHaveStyle({
          '--iress-thumb-value-offset':
            'calc(20% + ((1.75rem / 2) - 5.699999999999999px))',
        });
      });
    });

    describe('formatValue', () => {
      it('changes the value thumb of the slider', () => {
        const screen = renderComponent({
          formatValue: (value) => `Value is: ${value}`,
        });

        const status = screen.getByRole('status');
        expect(status).toHaveTextContent('Value is: 0');
      });

      it('provides the tick label if found', () => {
        const screen = renderComponent({
          formatValue: (value, tick) => <>Value is: {tick?.label ?? value}</>,
          tickLabels: [{ value: 0, label: 'Zero' }],
        });

        const status = screen.getByRole('status');
        expect(status).toHaveTextContent('Value is: Zero');
      });

      it('uses the readOnly flag if found', () => {
        const screen = renderComponent({
          formatValue: (value, tick, readOnly) =>
            readOnly ? `I am readonly` : <>Value is: ${tick?.label ?? value}</>,
          readOnly: true,
          tickLabels: [{ value: 0, label: 'Zero' }],
        });

        expect(screen.getByText('I am readonly')).toBeInTheDocument();
      });
    });

    describe('hiddenValueTooltip', () => {
      it('does not render thumb value', () => {
        const screen = renderComponent({
          hiddenValueTooltip: true,
        });

        const status = screen.queryByRole('status');
        expect(status).not.toBeInTheDocument();
      });
    });

    describe('max', () => {
      it('sets the max prop on the slider', () => {
        const screen = renderComponent({
          max: 200,
        });

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('max', '200');
      });
    });

    describe('min', () => {
      it('sets the min prop on the slider', () => {
        const screen = renderComponent({
          min: 5,
        });

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '5');
      });
    });

    describe('onChange', () => {
      it('is called when the close button is clicked', () => {
        const onChange = vi.fn();

        const screen = renderComponent({
          onChange,
        });

        // TODO: userEvent does not work on type="range" input.
        // https://github.com/testing-library/user-event/issues/1067
        // await userEvent.tab(); // Tab to slider
        // await userEvent.keyboard('{ArrowRight}');

        fireEvent.change(screen.getByRole('slider'), {
          target: { value: '1' },
        });

        expect(onChange).toHaveBeenCalledWith(expect.anything(), 1);
      });
    });

    describe('readOnly', () => {
      it('renders a readOnly version', () => {
        const screen = renderComponent({
          name: 'test',
          readOnly: true,
        });

        expect(screen.queryByRole('slider')).not.toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();

        const hiddenInput = screen.getByTestId(`${TEST_ID}__slider__input`);
        expect(hiddenInput).toHaveValue('0');
      });

      it('renders a readOnly version with a value', () => {
        const screen = renderComponent({
          readOnly: true,
          value: 2,
        });

        expect(screen.getByText('2')).toBeInTheDocument();
      });

      it('renders a readOnly version with a value, and uses the tick labels if provided', () => {
        const screen = renderComponent({
          name: 'name',
          readOnly: true,
          value: 0,
          tickLabels: [
            { value: 0, label: 'Zero' },
            { value: 200, label: 'All' },
          ],
        });

        expect(screen.getByText('Zero')).toBeInTheDocument();

        const hiddenInput = screen.getByTestId(`${TEST_ID}__slider__input`);
        expect(hiddenInput).toHaveValue('0');
      });
    });

    describe('step', () => {
      it('sets the step prop on the slider', () => {
        const screen = renderComponent({
          step: 5,
        });

        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('step', '5');
      });
    });

    describe('tickLabels', () => {
      it('renders tick labels based on step, min, max - if true', () => {
        const screen = renderComponent({
          min: 0,
          max: 6,
          step: 2,
          tickLabels: true,
        });

        // TODO: Datalist is supposed to have role=listbox and its options role=option, but RTL doesn't support this
        const dataList = screen.getByTestId(`${TEST_ID}__datalist`);
        expect(dataList).toBeInTheDocument();

        const options = screen.getAllByTestId(`${TEST_ID}__datalist__option`);
        expect(options).toHaveLength(4);

        options.forEach((option, index) => {
          expect(option.parentElement).toHaveStyle({
            '--iress-tick-label-width':
              index === 0 ? '0%' : '33.33333333333333%',
          });
        });
      });

      it('renders an array of numbers', () => {
        const screen = renderComponent({
          tickLabels: [2, 3, 4],
        });

        const options = screen.getAllByTestId(`${TEST_ID}__datalist__option`);
        expect(options).toHaveLength(3);

        expect(screen.getByText('2').parentElement).toHaveStyle({
          '--iress-tick-label-width': '20%',
        });

        expect(screen.getByText('3').parentElement).toHaveStyle({
          '--iress-tick-label-width': '10%',
        });

        expect(screen.getByText('4').parentElement).toHaveStyle({
          '--iress-tick-label-width': '10%',
        });
      });

      it('renders TickLabel[]', () => {
        const screen = renderComponent({
          tickLabels: [
            { label: 'One', value: 1 },
            { label: 'Final', value: 10 },
          ],
        });

        const options = screen.getAllByTestId(`${TEST_ID}__datalist__option`);
        expect(options).toHaveLength(2);

        expect(screen.getByText('One').parentElement).toHaveStyle({
          '--iress-tick-label-width': '10%',
        });

        expect(screen.getByText('Final').parentElement).toHaveStyle({
          '--iress-tick-label-width': '90%',
        });
      });

      it('renders ResponsiveSizing<TickLabel[]>', () => {
        const screen = renderComponent({
          tickLabels: [
            { label: 'Zero', value: 0 },
            { label: 'Five', value: 5, srOnly: { xs: true, lg: false } },
            { label: 'Final', value: 10 },
          ],
        });

        expect(screen.getByText('Five')).toHaveClass(
          css({ srOnly: { xs: true, lg: false } }),
        );
      });
    });

    describe('value', () => {
      it('sets the value of the slider', () => {
        const screen = renderComponent({
          value: 2,
        });

        const slider = screen.getByRole('slider');
        expect(slider).toHaveValue('2');

        expect(screen.getByTestId(TEST_ID)).toHaveStyle({
          '--iress-thumb-value-offset':
            'calc(20% + ((1.75rem / 2) - 5.699999999999999px))',
        });
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues, when used with label', async () => {
      const { container } = render(
        <>
          <IressLabel htmlFor={TEST_ID}>Test label</IressLabel>
          <IressSlider id={TEST_ID} />
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
