import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectHeading } from './SelectHeading';
import styles from '@/components/RichSelect/RichSelect.module.scss';
import userEvent from '@testing-library/user-event';

describe('IressSelectHeading', () => {
  it('renders the component with the correct defaults', () => {
    render(
      <IressSelectHeading className="test-class">Hello</IressSelectHeading>,
    );

    const heading = screen.getByRole('option');
    expect(heading).toHaveClass('test-class', styles.dropdownSelectedHeading);
  });

  describe('props', () => {
    describe('clearAll', () => {
      it('renders a clear all button with defaults', () => {
        render(<IressSelectHeading clearAll>Hello there</IressSelectHeading>);

        const clearAll = screen.getByRole('button', { name: 'Clear all' });
        expect(clearAll).toBeInTheDocument();
      });

      it('renders a custom clear all button', () => {
        render(
          <IressSelectHeading clearAll="Goodbye">
            Hello there
          </IressSelectHeading>,
        );

        const clearAll = screen.getByRole('button', { name: 'Goodbye' });
        expect(clearAll).toBeInTheDocument();
      });
    });

    describe('onClearAll', () => {
      it('calls the function when the user clicks the clear all button', async () => {
        const onClearAll = vi.fn();

        render(
          <IressSelectHeading clearAll onClearAll={onClearAll}>
            Hello there
          </IressSelectHeading>,
        );

        await userEvent.click(
          screen.getByRole('button', { name: 'Clear all' }),
        );

        expect(onClearAll).toHaveBeenCalledOnce();
      });

      it('calls the function when the user activates the button using an arrow key', async () => {
        const onClearAll = vi.fn();

        render(
          <IressSelectHeading clearAll onClearAll={onClearAll}>
            Hello there
          </IressSelectHeading>,
        );

        await userEvent.tab(); // focus on the clear all button

        expect(screen.getByRole('button', { name: 'Clear all' })).toHaveFocus();

        await userEvent.keyboard('{Enter}');

        expect(onClearAll).toHaveBeenCalledOnce();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <div role="listbox" aria-label="For a11y only">
          <IressSelectHeading>Hello</IressSelectHeading>
        </div>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
