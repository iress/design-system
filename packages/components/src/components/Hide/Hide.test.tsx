import { render, screen } from '@testing-library/react';

import { normaliseHideValues } from './helpers/composeHideClasses';
import { IressHide } from './Hide';
import { HideCssClass } from './Hide.types';

const hiddenOnTestCases = [
  { xs: true },
  { sm: true },
  { md: true },
  { lg: true },
  { xl: true },
  { xs: true, md: false },
  { sm: true, lg: false },
  { xs: true, md: false, xl: true },
  { xxl: true },
];

describe('IressHide', () => {
  describe('default', () => {
    it('renders the correct content', () => {
      render(
        <IressHide
          data-testid="test-component"
          className="test-class"
          hiddenOn={{ md: false }}
        >
          Content to hide
        </IressHide>,
      );
      const component = screen.getByTestId('test-component');
      expect(component).toHaveTextContent('Content to hide');
    });

    it('renders the correct classes', () => {
      render(
        <IressHide
          data-testid="test-component"
          className="test-class"
          hiddenOn={{ md: false }}
        >
          Content to hide
        </IressHide>,
      );
      const component = screen.getByTestId('test-component');
      expect(component).toHaveClass('test-class');
    });
  });
  describe('props', () => {
    describe('hiddenOn', () => {
      hideClassTests(HideCssClass.TotallyHidden);
    });

    describe('visibilityHidden', () => {
      hideClassTests(HideCssClass.VisuallyHidden);
    });
  });
});

const hideClassTestStatements = (
  testCase: Record<string, boolean | undefined>,
  baseClass: HideCssClass,
) => {
  render(
    <IressHide
      data-testid="test-component"
      className="test-class"
      hiddenOn={testCase}
      visuallyHidden={baseClass === HideCssClass.VisuallyHidden}
    >
      Content to hide
    </IressHide>,
  );
  const component = screen.getByTestId('test-component');
  const vals = normaliseHideValues(testCase);
  expect(component.classList.contains(`${baseClass}--xs`)).toEqual(
    vals.xs === true,
  );
  expect(component.classList.contains(`${baseClass}--sm`)).toEqual(
    vals.sm === true,
  );
  expect(component.classList.contains(`${baseClass}--md`)).toEqual(
    vals.md === true,
  );
  expect(component.classList.contains(`${baseClass}--lg`)).toEqual(
    vals.lg === true,
  );
  expect(component.classList.contains(`${baseClass}--xl`)).toEqual(
    vals.xl === true,
  );
  expect(component.classList.contains(`${baseClass}--xxl`)).toEqual(
    vals.xxl === true,
  );
};

const hideClassTests = (baseClass: HideCssClass) => {
  it('renders the correct classes - xs', () => {
    hideClassTestStatements(hiddenOnTestCases[0], baseClass);
  });
  it('renders the correct classes - sm', () => {
    hideClassTestStatements(hiddenOnTestCases[1], baseClass);
  });
  it('renders the correct classes - md', () => {
    hideClassTestStatements(hiddenOnTestCases[2], baseClass);
  });
  it('renders the correct classes - lg', () => {
    hideClassTestStatements(hiddenOnTestCases[3], baseClass);
  });
  it('renders the correct classes - xl', () => {
    hideClassTestStatements(hiddenOnTestCases[4], baseClass);
  });
  it('renders the correct classes - xxl', () => {
    hideClassTestStatements(hiddenOnTestCases[8], baseClass);
  });
  it('renders the correct classes - hidden on xs and sm only', () => {
    hideClassTestStatements(hiddenOnTestCases[5], baseClass);
  });
  it('renders the correct classes - hidden on sm and md only', () => {
    hideClassTestStatements(hiddenOnTestCases[6], baseClass);
  });
  it('renders the correct classes - hidden on xs and sm, shown on md and lg, hidden on xl', () => {
    hideClassTestStatements(hiddenOnTestCases[7], baseClass);
  });
};
