import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import styles from '../Input/Input.module.scss';
import baseStyles from '../Input/InputBase/InputBase.module.scss';
import { type IressReadonlyProps } from './Readonly.types';
import { IressReadonly } from './Readonly';
import { GlobalCSSClass } from '@/main';

const renderReadonly = (props: IressReadonlyProps = {}) => {
  return render(<IressReadonly {...props} />);
};

describe('ReadonlyInput', () => {
  it('should render the component with the correct classes', () => {
    renderReadonly({
      className: 'test-class',
      'data-testid': 'test-component',
      value: 'Value',
    });

    const wrapper = screen.getByTestId('test-component');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass('test-class', styles.input);

    const input = screen.getByText('Value');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass(baseStyles.formControl, styles.readonlyControl);
  });

  describe('props', () => {
    describe('append', () => {
      it('renders in append slot', () => {
        renderReadonly({
          append: 'Hello there',
        });

        const append = screen.getByText('Hello there');
        expect(append).toHaveClass(styles.addon, styles.append);
      });
    });

    describe('children', () => {
      it('renders with children instead of value', () => {
        renderReadonly({
          children: 'Hello',
          value: 'World',
        });

        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.queryByText('World')).not.toBeInTheDocument();
      });
    });

    describe('loading', () => {
      it('renders a spinner', () => {
        renderReadonly({
          loading: true,
        });

        expect(screen.getByLabelText('loading')).toBeInTheDocument();
      });

      it('renders a spinner with custom loading text', () => {
        renderReadonly({
          loading: 'May the force be with you',
        });

        expect(
          screen.getByLabelText('May the force be with you'),
        ).toBeInTheDocument();
      });
    });

    describe('prepend', () => {
      it('renders in prepend slot', () => {
        renderReadonly({
          prepend: 'Hello there',
        });

        const prepend = screen.getByText('Hello there');
        expect(prepend).toHaveClass(styles.addon, styles.prepend);
      });
    });

    describe('width', () => {
      it('adds the width class to the input when its not a percentage, so its not affected by prepend/append', () => {
        renderReadonly({
          width: '10',
          value: 'Value',
        });

        const input = screen.getByText('Value');
        expect(input).toHaveClass(`${GlobalCSSClass.Width}--10`);
      });

      it('adds the width class to the wrapper when its a percentage', () => {
        renderReadonly({
          width: '25perc',
          'data-testid': 'test-input',
          value: 'Value',
        });

        const wrapper = screen.getByTestId('test-input');
        expect(wrapper).toHaveClass(`${GlobalCSSClass.Width}--25perc`);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderReadonly();

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
