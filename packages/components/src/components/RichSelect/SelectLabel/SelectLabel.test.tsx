import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectLabel } from './SelectLabel';
import styles from './SelectLabel.module.scss';
import { MOCK_LABEL_VALUE_META } from '@/mocks/generateLabelValues';

describe('IressSelectLabel', () => {
  describe('props', () => {
    describe('append', () => {
      it('adds a class to append, so it can have the proper text color', () => {
        render(<IressSelectLabel append="Append" />);
        const append = screen.getByText('Append');
        expect(append).toHaveClass(styles.append);
      });
    });

    describe('placeholder', () => {
      it('renders if there are no selected items', () => {
        render(<IressSelectLabel placeholder="Placeholder" />);

        const label = screen.getByRole('button', { name: 'Placeholder' });
        expect(label).toBeInTheDocument();

        const placeholderText = screen.getByText('Placeholder');
        expect(placeholderText).toHaveClass(styles.placeholder);
      });

      it('does not render if there are selected items', () => {
        render(
          <IressSelectLabel
            placeholder="Placeholder"
            selected={MOCK_LABEL_VALUE_META}
          />,
        );

        const placeholderText = screen.queryByText('Placeholder');
        expect(placeholderText).not.toBeInTheDocument();
      });
    });

    describe('prepend', () => {
      it('renders prepended content', () => {
        render(<IressSelectLabel prepend="prepend" />);
        const prepend = screen.getByText('prepend');
        expect(prepend).toBeInTheDocument();
      });
    });

    describe('selected', () => {
      it('renders the selected item label if there is a single item', () => {
        render(<IressSelectLabel selected={MOCK_LABEL_VALUE_META[0]} />);
        const label = screen.getByRole('button', {
          name: MOCK_LABEL_VALUE_META[0].label,
        });
        expect(label).toBeInTheDocument();
      });

      it('renders the number of selected items if there is more than one', () => {
        render(<IressSelectLabel selected={MOCK_LABEL_VALUE_META} />);
        const label = screen.getByRole('button', {
          name: `${MOCK_LABEL_VALUE_META.length} selected`,
        });
        expect(label).toBeInTheDocument();
      });
    });

    describe('selectedOptionsText', () => {
      it('changes the label text when more than one is selected', () => {
        render(
          <IressSelectLabel
            selected={MOCK_LABEL_VALUE_META}
            selectedOptionsText="{{numOptions}} chosen"
          />,
        );
        const label = screen.getByRole('button', {
          name: `${MOCK_LABEL_VALUE_META.length} chosen`,
        });
        expect(label).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSelectLabel />);
      const results = await axe(container);
      expect(results).not.toHaveNoViolations();
    });
  });
});
