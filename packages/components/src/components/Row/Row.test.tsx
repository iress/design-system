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

    expect(element).not.toHaveClass('cg_spacing.000');

    expect(getByTestId('children')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('gutter', () => {
      it(`adds the gap for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} gutter="spacing.400" />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass('gutter_spacing.400');
        expect(element).not.toHaveClass('gutter_spacing.000');
      });

      it(`adds the correct responsive gutter classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              xs: 'spacing.000',
              md: 'spacing.400',
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'xs:gutter_spacing.000',
          'md:gutter_spacing.400',
        );
      });

      it(`adds the correct responsive gutter classes from object - three options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              sm: 'spacing.1200',
              lg: 'spacing.200',
              xxl: 'spacing.200',
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'sm:gutter_spacing.1200',
          'lg:gutter_spacing.200',
          'xxl:gutter_spacing.200',
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
