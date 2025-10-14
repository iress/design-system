import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ColCssClass, IressCol } from '.';

const TEST_ID = 'test-component';

describe('IressCol', () => {
  it('should render the component with the correct classes and defaults', () => {
    const { getByTestId } = render(
      <IressCol data-testid={TEST_ID} className="test-class">
        <div data-testid="children">test</div>
      </IressCol>,
    );

    const element = getByTestId(TEST_ID);

    expect(element).toHaveClass(
      ColCssClass.Base,
      `${ColCssClass.Span}--${IressCol.Span.Auto}`,
      'test-class',
    );

    expect(getByTestId('children')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('alignSelf', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            alignSelf={IressCol.AlignSelf.Stretch}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${ColCssClass.AlignSelf}--${IressCol.AlignSelf.Stretch}`,
        );
      });
    });

    describe('offset', () => {
      it(`adds the offset for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressCol data-testid={TEST_ID} offset={IressCol.Offset.Two} />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass(
          `${ColCssClass.Offset}--${IressCol.Offset.Two}`,
        );
      });

      it(`adds the correct responsive offset classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            offset={{
              xs: IressCol.Offset.Ten,
              md: IressCol.Offset.Six,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${ColCssClass.Offset}-xs--${IressCol.Offset.Ten}`,
          `${ColCssClass.Offset}-md--${IressCol.Offset.Six}`,
        );
      });

      it(`adds the correct responsive offset classes from object - three options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            offset={{
              sm: IressCol.Offset.Eleven,
              lg: IressCol.Offset.Three,
              xxl: IressCol.Offset.Five,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${ColCssClass.Offset}-sm--${IressCol.Offset.Eleven}`,
          `${ColCssClass.Offset}-lg--${IressCol.Offset.Three}`,
          `${ColCssClass.Offset}-xxl--${IressCol.Offset.Five}`,
        );
      });
    });

    describe('span', () => {
      it(`adds the span for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressCol data-testid={TEST_ID} span={IressCol.Span.Two} />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass(
          `${ColCssClass.Span}--${IressCol.Span.Two}`,
        );
        expect(element).not.toHaveClass(
          `${ColCssClass.Span}--${IressCol.Span.Auto}`,
        );
      });

      it(`adds the correct responsive span classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            span={{
              xs: IressCol.Span.Ten,
              md: IressCol.Span.Six,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${ColCssClass.Span}-xs--${IressCol.Span.Ten}`,
          `${ColCssClass.Span}-md--${IressCol.Span.Six}`,
        );
      });

      it(`adds the correct responsive span classes from object - three options with fallback`, () => {
        const { getByTestId } = render(
          <IressCol
            data-testid={TEST_ID}
            span={{
              sm: IressCol.Span.Two,
              lg: IressCol.Span.Three,
              xxl: IressCol.Span.Five,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${ColCssClass.Span}-xs--${IressCol.Span.Twelve}`,
          `${ColCssClass.Span}-sm--${IressCol.Span.Two}`,
          `${ColCssClass.Span}-lg--${IressCol.Span.Three}`,
          `${ColCssClass.Span}-xxl--${IressCol.Span.Five}`,
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
