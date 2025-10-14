import { render } from '@testing-library/react';
import { IressIcon } from '.';
import styles from './Icon.module.scss';

const TEST_ID = 'test-component';

// eslint-disable-next-line
const renderComponent = (props?: any) => {
  return render(<IressIcon data-testid={TEST_ID} {...props} />);
};

describe('IressIcon', () => {
  it('should render the correct css classes', () => {
    const { getByTestId } = renderComponent({
      name: 'home',
      className: 'test-class',
    });
    const component = getByTestId(TEST_ID);

    expect(component).toHaveClass(`test-class fa-home fal ${styles.icon}`);
  });

  it('should render the correct a11y attributes', () => {
    const { getByTestId } = renderComponent({ name: 'home' });
    const component = getByTestId(TEST_ID);

    expect(component).toHaveAttribute('role', 'img');
    expect(component).toHaveAttribute('aria-hidden');
  });

  describe('props', () => {
    describe('screenreaderText', () => {
      it('should render the correct a11y attributes', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          screenreaderText: 'Home screen',
        });
        const component = getByTestId(TEST_ID);

        expect(component).not.toHaveAttribute('aria-hidden');
        expect(component).toHaveAttribute('aria-label', 'Home screen');
      });
    });

    describe('fixedWidth', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          fixedWidth: true,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass('fa-fw');
      });
    });

    describe('set', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          set: IressIcon.Set.FABrand,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass('fab');
      });
    });

    describe('flip', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          flip: IressIcon.Flip.Both,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass(styles['flip-both']);
      });
    });

    describe('rotate', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          rotate: IressIcon.Rotate.Deg90,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass(styles['rotate-90']);
      });
    });

    describe('spin', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          spin: IressIcon.Spin.SpinHalf,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass(styles['spin-half']);
      });
    });

    describe('mode', () => {
      it('should render the correct css class', () => {
        const { getByTestId } = renderComponent({
          name: 'home',
          mode: IressIcon.Mode.Muted,
        });
        const component = getByTestId(TEST_ID);

        expect(component).toHaveClass(styles['mode-muted']);
      });
    });
  });
});
