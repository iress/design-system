import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressButtonCard } from './ButtonCard';

const TEST_ID = 'test-component';

describe('IressButtonCard', () => {
  it('should render the component with the correct text and classes', () => {
    const screen = render(
      <IressButtonCard data-testid={TEST_ID} className="test-class">
        Test text
      </IressButtonCard>,
    );

    const card = screen.getByText('Test text');

    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe('BUTTON');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressButtonCard data-testid={TEST_ID} className="test-class">
          Test text
        </IressButtonCard>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
