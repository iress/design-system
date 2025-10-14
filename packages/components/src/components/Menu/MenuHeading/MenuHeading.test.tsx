import { render } from '@testing-library/react';
import { IressMenuHeading, IressMenuHeadingProps } from '..';
import { axe } from 'jest-axe';

import styles from '../MenuItem/MenuItem.module.scss';

const TEST_ID = 'test-component';

function renderHeading(props?: IressMenuHeadingProps) {
  return render(<IressMenuHeading {...props} data-testid={TEST_ID} />);
}

describe('IressMenuHeading', () => {
  it('renders defaults', () => {
    const screen = renderHeading({
      children: 'Test',
    });

    const heading = screen.getByRole('heading', { name: 'Test' });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
    expect(heading.parentNode).toHaveClass(styles.contents);
    expect(heading.parentNode?.parentNode).toHaveClass(styles.heading);
  });

  describe('props', () => {
    describe('level', () => {
      it('renders the heading with the provided level', () => {
        const screen = renderHeading({
          children: 'Test',
          level: IressMenuHeading.Level.H3,
        });

        const heading = screen.getByRole('heading', { name: 'Test' });
        expect(heading.tagName).toBe('H3');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderHeading({ children: 'Title' });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
