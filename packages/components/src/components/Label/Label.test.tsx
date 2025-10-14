import { render } from '@testing-library/react';
import { IressLabel } from './Label';
import { axe } from 'jest-axe';

describe('IressLabel', () => {
  it('renders as label tag', () => {
    const screen = render(
      <IressLabel htmlFor="bacon" data-testid="sausage">
        Eggs
      </IressLabel>,
    );

    const label = screen.getByTestId('sausage');
    expect(label.tagName).toBe('LABEL');
  });

  it('renders as strong tag if no htmlFor is provided', () => {
    const screen = render(<IressLabel data-testid="sausage">Eggs</IressLabel>);

    const label = screen.getByTestId('sausage');
    expect(label.tagName).toBe('STRONG');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressLabel htmlFor="bacon">Eggs</IressLabel>
          <input id="bacon" name="egg" />
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
