import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FieldAppendToLabelProps } from '../Field.types';
import { FieldAppendToLabel } from './FieldAppendToLabel';
import styles from '../Field.module.scss';
import { GlobalCSSClass } from '@/main';

const PARENT_TEST_ID = 'test';

function renderComponent(props: FieldAppendToLabelProps = {}) {
  return render(
    <FieldAppendToLabel {...props} data-parent-testid={PARENT_TEST_ID} />,
  );
}

describe('FieldAppendToLabel', () => {
  it('renders nothing by default', () => {
    renderComponent();
    expect(
      screen.queryByTestId(`${PARENT_TEST_ID}__error`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(`${PARENT_TEST_ID}__hint`),
    ).not.toBeInTheDocument();
  });

  describe('props', () => {
    describe('error', () => {
      it('renders the error', () => {
        renderComponent({
          error: 'An error',
        });

        const error = screen.getByText('An error');
        expect(error).toBeInTheDocument();
      });
    });

    describe('errorMessages', () => {
      it('renders the error messages', () => {
        renderComponent({
          errorMessages: [{ message: 'Another error' }],
        });

        const errorMessages = screen.getByTestId(`${PARENT_TEST_ID}__error`);
        expect(errorMessages).toBeInTheDocument();
        expect(errorMessages).toHaveClass(styles.errorSummary);

        const error = screen.getByText('Another error');
        expect(error).toBeInTheDocument();
      });
    });

    describe('hiddenLabel', () => {
      it('hides hint, but not error', () => {
        renderComponent({
          errorMessages: [{ message: 'Another error' }],
          hiddenLabel: true,
          hint: 'A hint',
        });

        const hint = screen.getByText('A hint');
        const errorMessages = screen.getByTestId(`${PARENT_TEST_ID}__error`);

        expect(hint).toHaveClass(GlobalCSSClass.SROnly);
        expect(errorMessages).not.toHaveClass(GlobalCSSClass.SROnly);
      });
    });

    describe('hint', () => {
      it('renders the hint', () => {
        renderComponent({
          hint: 'A hint',
        });

        expect(
          screen.queryByTestId(`${PARENT_TEST_ID}__hint`),
        ).toBeInTheDocument();

        const hint = screen.getByText('A hint');
        expect(hint).toBeInTheDocument();
        expect(hint).toHaveClass(styles.hint);
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent({
        hint: 'Hint',
        error: 'Error',
        errorMessages: [{ message: 'error' }],
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
