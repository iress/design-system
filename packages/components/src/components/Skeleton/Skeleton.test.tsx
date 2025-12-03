import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSkeleton, type IressSkeletonProps } from '.';
import styles from './Skeleton.module.scss';

const TEST_ID = 'test-component';
const modes = Object.values(IressSkeleton.Mode);
const renderComponent = (props?: IressSkeletonProps) => {
  return render(<IressSkeleton {...props} data-testid={TEST_ID} />);
};

describe('IressSkeleton', () => {
  describe('props', () => {
    it('should render with default props', () => {
      renderComponent();

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveClass(styles.skeleton);
      expect(skeleton).toHaveClass(styles.text);
      expect(skeleton).toHaveClass('iress-u-text');
    });

    it('should render with custom width and height', () => {
      renderComponent({
        width: '100px',
        height: '100px',
        mode: IressSkeleton.Mode.Rect,
      });

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveStyle({
        width: '100px',
        height: '100px',
      });
    });

    it('should render the correct Text variant', () => {
      const { container } = renderComponent({
        textVariant: IressSkeleton.TextVariant.Display1,
      });

      const text = container.firstChild?.firstChild;

      expect(text).toBeInTheDocument();
      expect(text).toHaveClass('iress--display1');
    });

    it.each(modes)('should render with mode %s', (mode) => {
      renderComponent({ mode });

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveClass(styles[mode]);
    });
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = renderComponent();

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
