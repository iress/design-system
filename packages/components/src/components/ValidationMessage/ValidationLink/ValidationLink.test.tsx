import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressValidationLink } from './ValidationLink';
import { GlobalCSSClass } from '@/enums';

describe('IressValidationLink', () => {
  it('should render the component with the correct text and classes', () => {
    render(
      <IressValidationLink
        data-testid="test-component"
        className="test-class"
        linkToTarget="test"
      >
        Test message
      </IressValidationLink>,
    );

    const component = screen.getByTestId('test-component');
    expect(component.tagName).equals('A');
    expect(component).toHaveAttribute('href', '#test');
    expect(component).toHaveClass(GlobalCSSClass.ValidationLink);
  });

  describe('accessibility', () => {
    it('anchor should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressValidationLink
          data-testid="test-component"
          className="test-class"
          linkToTarget="test-id"
        >
          Label content
        </IressValidationLink>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
