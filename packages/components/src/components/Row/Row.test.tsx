import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressRow } from '.';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

describe('IressRow', () => {
  it('should render the component with the correct classes and defaults', () => {
    const { getByTestId } = render(
      <IressRow data-testid={TEST_ID} className="test-class">
        <div data-testid="children">test</div>
      </IressRow>,
    );

    const element = getByTestId(TEST_ID);

    expect(element).toHaveClass(
      'jc_flex-start',
      'ai_flex-start',
      'test-class',
      GlobalCSSClass.Row,
    );

    expect(element).not.toHaveClass('cg_spacing.0');

    expect(getByTestId('children')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('gutter', () => {
      it(`adds the gap for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} gutter="spacing.4" />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass('gutter_spacing.4');
        expect(element).not.toHaveClass('gutter_spacing.0');
      });

      it(`adds the correct responsive gutter classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              xs: 'spacing.0',
              md: 'spacing.4',
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'xs:gutter_spacing.0',
          'md:gutter_spacing.4',
        );
      });

      it(`adds the correct responsive gutter classes from object - three options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              sm: 'spacing.10',
              lg: 'spacing.2',
              xxl: 'spacing.2',
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'sm:gutter_spacing.10',
          'lg:gutter_spacing.2',
          'xxl:gutter_spacing.2',
        );
      });
    });

    describe('horizontalAlign', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} horizontalAlign="between" />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass('jc_space-between');
      });
    });

    describe('verticalAlign', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} verticalAlign="bottom" />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass('ai_flex-end');
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressRow />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
