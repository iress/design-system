import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressContainer } from '.';

describe('IressContainer', () => {
  it('should render the component with the correct classes', () => {
    const { getByRole } = render(
      <IressContainer role="main" className="test-class" />,
    );

    expect(getByRole('main')).toHaveClass('test-class', 'iress-u-container');
  });

  describe('props', () => {
    describe('fluid', () => {
      it('adds the fluid class', () => {
        const { getByRole } = render(<IressContainer role="main" fluid />);

        expect(getByRole('main')).toHaveClass('iress--fluid');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressContainer />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
