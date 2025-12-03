import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressPlaceholder, type IressPlaceholderProps } from '.';
import styles from './Placeholder.module.scss';

const TEST_ID = 'test-component';

function renderComponent(props?: IressPlaceholderProps) {
  return render(<IressPlaceholder {...props} data-testid={TEST_ID} />);
}

describe('IressPlaceholder', () => {
  describe('default', () => {
    it('should render the component with the correct defaults', () => {
      const { getByTestId } = renderComponent({
        className: 'test-class',
      });

      const component = getByTestId(TEST_ID);
      expect(component).toBeInTheDocument();
      expect(component).toHaveClass('test-class', styles.placeholder);
      expect(component).not.toHaveClass(styles.transparent);
      expect(component).toHaveStyle({ width: 'auto', height: 'auto' });
    });

    it('should render children if provided', () => {
      const { getByText } = renderComponent({
        children: 'Placeholder',
      });

      expect(getByText('Placeholder')).toBeInTheDocument();
    });
  });

  describe('props', () => {
    it('transparent => adds transparent class', () => {
      const { getByTestId } = renderComponent({
        transparent: true,
      });

      expect(getByTestId(TEST_ID)).toHaveClass(styles.transparent);
    });

    it('stretch => makes height 100%', () => {
      const { getByTestId } = renderComponent({
        stretch: true,
      });

      expect(getByTestId(TEST_ID)).toHaveStyle({ height: '100%' });
    });

    it('width => adds a custom width', () => {
      const { getByTestId } = renderComponent({
        width: 48,
      });

      expect(getByTestId(TEST_ID)).toHaveStyle({ width: '48px' });
    });

    it('height => adds a custom height', () => {
      const { getByTestId } = renderComponent({
        height: 48,
      });

      expect(getByTestId(TEST_ID)).toHaveStyle({ height: '48px' });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
