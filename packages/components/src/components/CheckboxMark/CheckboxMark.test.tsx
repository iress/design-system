import { render } from '@testing-library/react';
import {
  IressCheckboxMark,
  type IressCheckboxMarkProps,
  IressCheckboxStyles as styles,
} from '.';
import { axe } from 'jest-axe';

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
      expect(component).toHaveClass('test-class');
      expect(component).toHaveClass(styles.checkboxMark);
    });
  });

  describe('checked', () => {
    it('renders the correct classes', () => {
      const { getByTestId } = renderComponent({
        checked: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(styles.checked);
    });
  });

  describe('indeterminate', () => {
    it('renders the correct classes if indeterminate is true', () => {
      const { getByTestId } = renderComponent({
        indeterminate: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(styles.indeterminate);
    });

    it('renders the correct classes if indeterminate and checked are true', () => {
      const { getByTestId } = renderComponent({
        checked: true,
        indeterminate: true,
      });

      const component = getByTestId(TEST_ID);
      expect(component).toHaveClass(styles.indeterminate);
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
