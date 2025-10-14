import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressCol } from '.';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

describe('IressCol', () => {
  it('should render the component with the correct classes and defaults', () => {
    const { getByTestId } = render(
      <IressCol data-testid={TEST_ID} className="test-class">
        <div data-testid="children">test</div>
      </IressCol>,
    );

    const element = getByTestId(TEST_ID);

    expect(element).toHaveClass('span_auto', 'test-class', GlobalCSSClass.Col);

    expect(getByTestId('children')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('alignSelf', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressCol data-testid={TEST_ID} alignSelf="stretch" />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass('as_stretch');
      });
    });

    describe('offset', () => {
      it(`adds the offset for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressCol data-testid={TEST_ID} offset={2} />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass('offset_2');
      });

      it(`adds the correct responsive offset classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            offset={{
              xs: 10,
              md: 6,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass('xs:offset_10', 'md:offset_6');
      });

      it(`adds the correct responsive offset classes from object - three options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            offset={{
              sm: 11,
              lg: 3,
              xxl: 5,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'sm:offset_11',
          'lg:offset_3',
          'xxl:offset_5',
        );
      });
    });

    describe('span', () => {
      it(`adds the span for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressCol data-testid={TEST_ID} span={2} />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass('span_2');
        expect(element).not.toHaveClass('span_auto');
      });

      it(`adds the correct responsive span classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            span={{
              xs: 10,
              md: 6,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass('xs:span_10', 'md:span_6');
      });

      it(`adds the correct responsive span classes from object - three options with fallback`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            span={{
              sm: 2,
              lg: 3,
              xxl: 5,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          'sm:span_2',
          'lg:span_3',
          'xxl:span_5',
        );
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressCol />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
