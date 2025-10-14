import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressLinkCard } from './LinkCard';

const TEST_ID = 'test-component';

describe('IressLinkCard', () => {
  it('should render the component with the correct text and classes', () => {
    const screen = render(
      <IressLinkCard data-testid={TEST_ID} className="test-class">
        Test text
      </IressLinkCard>,
    );

    const card = screen.getByText('Test text');

    expect(card).toBeInTheDocument();
    expect(card.tagName).toBe('A');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressLinkCard data-testid={TEST_ID} className="test-class">
          Test text
        </IressLinkCard>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
