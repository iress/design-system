import { render } from '@testing-library/react';
import { checkboxMark, IressCheckboxMark, IressCheckboxMarkProps } from '.';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';

function renderComponent(props?: IressCheckboxMarkProps) {
  return render(<IressCheckboxMark {...props} data-testid={TEST_ID} />);
}

describe('IressCheckboxMark', () => {
  describe('default (no props)', () => {
    it('renders the correct classes', () => {
      const { getByTestId } = renderComponent({
        className: 'test-class',
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass('test-class', GlobalCSSClass.CheckboxMark);
      expect(component).toHaveClass(checkboxMark({}).root!);
    });
  });

  describe('checked', () => {
    it('renders the correct classes', () => {
      const { getByTestId } = renderComponent({
        checked: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(checkboxMark({ checked: true }).root!);
    });
  });

  describe('indeterminate', () => {
    it('renders the correct classes if indeterminate is true', () => {
      const { getByTestId } = renderComponent({
        indeterminate: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(
        checkboxMark({ indeterminate: true }).root!,
      );
    });

    it('renders the correct classes if indeterminate and checked are true', () => {
      const { getByTestId } = renderComponent({
        checked: true,
        indeterminate: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(
        checkboxMark({ checked: true, indeterminate: true }).root!,
      );
    });
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = renderComponent({
      checked: true,
      indeterminate: true,
    });

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
