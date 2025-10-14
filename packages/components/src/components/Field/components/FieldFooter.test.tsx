import { expect, it, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FieldFooter } from './FieldFooter';
import { field } from '../Field.styles';

describe('FieldFooter', () => {
  it('renders nothing by default', () => {
    render(<FieldFooter data-testid="test" />);
    expect(screen.queryByTestId('test')).not.toBeInTheDocument();
  });

  describe('props', () => {
    describe('error', () => {
      it('renders the error', () => {
        render(<FieldFooter error="An error" />);

        const error = screen.getByText('An error');
        expect(error).toBeInTheDocument();
      });
    });

    describe('errorMessages', () => {
      it('renders the error messages', () => {
        render(
          <FieldFooter
            data-testid="test"
            errorMessages={[{ message: 'Another error' }]}
          />,
        );

        const errorMessages = screen.getByTestId('test');
        expect(errorMessages).toBeInTheDocument();
        expect(errorMessages.parentElement).toHaveClass(field().footer!);

        const error = screen.getByText('Another error');
        expect(error).toBeInTheDocument();
      });
    });

    describe('supplementary', () => {
      it('renders the supplementary content', () => {
        render(<FieldFooter supplementary="Hello" />);

        const supplementary = screen.getByText('Hello');
        expect(supplementary).toBeInTheDocument();
        expect(supplementary).toHaveClass(field().supplementary!);
      });

      it('does not render supplementary if there is an error', () => {
        render(<FieldFooter error="Error" supplementary="Hello" />);

        const error = screen.queryByText('Error');
        const supplementary = screen.queryByText('Hello');

        expect(error).toBeInTheDocument();
        expect(supplementary).not.toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <FieldFooter
          data-testid="test"
          error="An error"
          errorMessages={[{ message: 'error' }]}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
