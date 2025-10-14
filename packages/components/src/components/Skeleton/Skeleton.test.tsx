import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSkeleton } from '.';
import { css } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

const styles = {
  rect: 'w_[100%] h_[100px]',
  circle: 'bdr_[50%] w_[100px] h_[100px]',
  text: 'w_[100%] h_[spacing.600]',
};
const TEST_ID = 'test-component';
const modes = ['rect', 'circle', 'text'] as const;

describe('IressSkeleton', () => {
  describe('props', () => {
    it('should render with default props', () => {
      render(<IressSkeleton data-testid={TEST_ID} />);

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveClass(
        'bg-c_colour.neutral.30 bdr_radius.025 motionReduce:anim_none moreContrast:ring_[1px_solid_transparent] layerStyle_skeleton animationStyle_skeleton-loading w_[100%] h_[spacing.600]',
        GlobalCSSClass.Skeleton,
      );
    });

    it('should render with custom width and height', () => {
      render(
        <IressSkeleton
          mode="rect"
          width="100px"
          height="100px"
          data-testid={TEST_ID}
        />,
      );

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveStyle({
        width: '100px',
        height: '100px',
      });
    });

    it('should render the correct Text variant', () => {
      render(
        <IressSkeleton
          textStyle="typography.heading.1"
          data-testid={TEST_ID}
        />,
      );

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveClass(css({ textStyle: 'typography.heading.1' }));
    });

    it.each(modes)('should render with mode %s', (mode) => {
      render(<IressSkeleton mode={mode} data-testid={TEST_ID} />);

      const skeleton = screen.getByTestId(TEST_ID);

      expect(skeleton).toHaveClass(styles[mode]);
    });
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(<IressSkeleton />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
