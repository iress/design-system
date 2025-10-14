import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import { IressInputCurrency } from './InputCurrency';
import styles from '../Input/Input.module.scss';

describe('IressInputCurrency', () => {
  const defaultProps = {
    locale: 'en-US',
    currencyCode: 'USD',
  };

  describe('with default props', () => {
    it('should render the component correctly', async () => {
      render(<IressInputCurrency {...defaultProps} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345');
      await userEvent.tab();
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue('12,345.00');
    });

    it('should handle numbers with decimal places', async () => {
      render(<IressInputCurrency {...defaultProps} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345.6789');
      await userEvent.tab();
      expect(input).toHaveValue('12,345.68');
    });
  });

  describe('withSymbol props', () => {
    it('should display the correct currency symbol', async () => {
      render(<IressInputCurrency withSymbol {...defaultProps} />);
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345');
      await userEvent.tab();
      expect(input).toHaveValue('$12,345.00');
    });

    it('should display different region currency symbol', async () => {
      render(
        <IressInputCurrency withSymbol locale="ja-JP" currencyCode="JPY" />,
      );
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345');
      await userEvent.tab();
      expect(input).toHaveValue('￥12,345');
    });
  });

  describe('alignRight prop', () => {
    it('should apply alignRight class when alignRight is true', () => {
      render(
        <IressInputCurrency {...defaultProps} alignRight value="12345.67" />,
      );
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(styles.alignRight);
    });

    it('should not apply alignRight class by default', () => {
      render(<IressInputCurrency {...defaultProps} value="12345.67" />);
      const input = screen.getByRole('textbox');
      expect(input).not.toHaveClass(styles.alignRight);
    });
  });

  describe('formatOptions prop', () => {
    it('should format with zero decimal places when specified in formatOptions', async () => {
      render(
        <IressInputCurrency
          {...defaultProps}
          formatOptions={{ minimumFractionDigits: 0, maximumFractionDigits: 0 }}
        />,
      );
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345.67');
      await userEvent.tab();
      expect(input).toHaveValue('12,346');
    });

    it('should format with custom decimal places specified in formatOptions', async () => {
      render(
        <IressInputCurrency
          {...defaultProps}
          formatOptions={{ minimumFractionDigits: 3, maximumFractionDigits: 3 }}
        />,
      );
      const input = screen.getByRole('textbox');
      await userEvent.type(input, '12345.6789');
      await userEvent.tab();
      expect(input).toHaveValue('12,345.679');
    });
  });
});
