import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressRow, RowCssClass } from '.';

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
      RowCssClass.Base,
      `${RowCssClass.HorizontalAlign}--${IressRow.HorizontalAlign.Left}`,
      `${RowCssClass.VerticalAlign}--${IressRow.VerticalAlign.Top}`,
      `${RowCssClass.Gutter}--${IressRow.Gutter.None}`,
      'test-class',
    );

    expect(element).not.toHaveClass(RowCssClass.UseColGap);

    expect(getByTestId('children')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('gutter', () => {
      it(`adds the gutter for all breakpoints of string passed`, () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} gutter={IressRow.Gutter.Md} />,
        );

        const element = getByTestId(TEST_ID);

        expect(element).toHaveClass(
          `${RowCssClass.Gutter}--${IressRow.Gutter.Md}`,
        );
        expect(element).not.toHaveClass(
          `${RowCssClass.Gutter}--${IressRow.Gutter.None}`,
        );
      });

      it(`adds the correct responsive gutter classes from object - two options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              xs: IressRow.Gutter.None,
              md: IressRow.Gutter.Md,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${RowCssClass.Gutter}-xs--${IressRow.Gutter.None}`,
          `${RowCssClass.Gutter}-md--${IressRow.Gutter.Md}`,
        );
      });

      it(`adds the correct responsive gutter classes from object - three options`, () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            gutter={{
              sm: IressRow.Gutter.Xl,
              lg: IressRow.Gutter.Sm,
              xxl: IressRow.Gutter.Sm,
            }}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${RowCssClass.Gutter}-sm--${IressRow.Gutter.Xl}`,
          `${RowCssClass.Gutter}-lg--${IressRow.Gutter.Sm}`,
          `${RowCssClass.Gutter}-xxl--${IressRow.Gutter.Sm}`,
        );
      });
    });

    describe('horizontalAlign', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            horizontalAlign={IressRow.HorizontalAlign.Between}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${RowCssClass.HorizontalAlign}--${IressRow.HorizontalAlign.Between}`,
        );
      });
    });

    describe('useColGap', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressRow data-testid={TEST_ID} useColGap />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(RowCssClass.UseColGap);
      });
    });

    describe('verticalAlign', () => {
      it('adds the correct classes', () => {
        const { getByTestId } = render(
          <IressRow
            data-testid={TEST_ID}
            verticalAlign={IressRow.VerticalAlign.Bottom}
          />,
        );

        expect(getByTestId(TEST_ID)).toHaveClass(
          `${RowCssClass.VerticalAlign}--${IressRow.VerticalAlign.Bottom}`,
        );
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
