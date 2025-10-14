import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FieldLegend } from './FieldLegend';

describe('FieldLegend', () => {
  it('renders as legend tag', () => {
    const screen = render(
      <FieldLegend data-testid="sausage">Eggs</FieldLegend>,
    );

    const label = screen.getByTestId('sausage');
    expect(label.tagName).toBe('LEGEND');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = render(
        <fieldset>
          <FieldLegend>Eggs</FieldLegend>
        </fieldset>,
      );
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
