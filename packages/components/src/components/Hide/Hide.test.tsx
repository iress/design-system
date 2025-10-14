import { render, screen } from '@testing-library/react';

import { normaliseHideValues } from './helpers/normaliseHideValues';
import { IressHide } from './Hide';

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
      hideClassTests(false);
    });

    describe('visibilityHidden', () => {
      hideClassTests(true);
    });
  });
});

const hideClassTestStatements = (
  testCase: Record<string, boolean | undefined>,
  srOnly = false,
) => {
  render(
    <IressHide
      data-testid="test-component"
      className="test-class"
      hiddenOn={testCase}
      visuallyHidden={srOnly}
    >
      Content to hide
    </IressHide>,
  );
  const component = screen.getByTestId('test-component');
  const vals = normaliseHideValues(testCase);
  const baseClass = srOnly ? 'sr' : 'hide';
  expect(component.classList.contains(`xs:${baseClass}_true`)).toEqual(
    vals.xs === true,
  );
  expect(component.classList.contains(`sm:${baseClass}_true`)).toEqual(
    vals.sm === true,
  );
  expect(component.classList.contains(`md:${baseClass}_true`)).toEqual(
    vals.md === true,
  );
  expect(component.classList.contains(`lg:${baseClass}_true`)).toEqual(
    vals.lg === true,
  );
  expect(component.classList.contains(`xl:${baseClass}_true`)).toEqual(
    vals.xl === true,
  );
  expect(component.classList.contains(`xxl:${baseClass}_true`)).toEqual(
    vals.xxl === true,
  );
};

const hideClassTests = (srOnly = false) => {
  it('renders the correct classes - xs', () => {
    hideClassTestStatements(hiddenOnTestCases[0], srOnly);
  });
  it('renders the correct classes - sm', () => {
    hideClassTestStatements(hiddenOnTestCases[1], srOnly);
  });
  it('renders the correct classes - md', () => {
    hideClassTestStatements(hiddenOnTestCases[2], srOnly);
  });
  it('renders the correct classes - lg', () => {
    hideClassTestStatements(hiddenOnTestCases[3], srOnly);
  });
  it('renders the correct classes - xl', () => {
    hideClassTestStatements(hiddenOnTestCases[4], srOnly);
  });
  it('renders the correct classes - xxl', () => {
    hideClassTestStatements(hiddenOnTestCases[8], srOnly);
  });
  it('renders the correct classes - hidden on xs and sm only', () => {
    hideClassTestStatements(hiddenOnTestCases[5], srOnly);
  });
  it('renders the correct classes - hidden on sm and md only', () => {
    hideClassTestStatements(hiddenOnTestCases[6], srOnly);
  });
  it('renders the correct classes - hidden on xs and sm, shown on md and lg, hidden on xl', () => {
    hideClassTestStatements(hiddenOnTestCases[7], srOnly);
  });
};
