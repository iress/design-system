import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectCreate } from './SelectCreate';

import userEvent from '@testing-library/user-event';
import { menu } from '@/components/Menu';

describe('IressSelectCreate', () => {
  it('renders the component with the correct defaults', () => {
    render(<IressSelectCreate className="test-class" />);

    const menuElement = screen.getByRole('menu');
    expect(menuElement).toHaveClass('test-class', menu({ fluid: true }).root!);

    const menuItem = screen.getByRole('menuitem', { name: 'AddNew option' });
    expect(menuItem).toBeInTheDocument();

    const prepend = screen.getByRole('img', { name: 'Add' });
    expect(prepend).toBeInTheDocument();

    const label = screen.getByText('New option');
    expect(label).toBeInTheDocument();
  });

  describe('props', () => {
    describe('heading', () => {
      it('adds a heading using a string and connects it to menu via aria-labelledby', () => {
        render(<IressSelectCreate heading="Add custom option" />);

        const menuByHeading = screen.getByLabelText('Add custom option');
        expect(menuByHeading).toBeInTheDocument();
      });

      it('adds a heading using a node', () => {
        render(<IressSelectCreate heading={<h5>New option here!</h5>} />);

        const heading = screen.getByRole('heading', {
          name: 'New option here!',
          level: 5,
        });
        expect(heading).toBeInTheDocument();
      });
    });

    describe('label', () => {
      it('changes the label ', () => {
        const { rerender } = render(<IressSelectCreate label="" />);

        expect(
          screen.getByRole('menuitem', { name: 'Add' }),
        ).toBeInTheDocument();

        rerender(<IressSelectCreate label="WX" />);

        expect(
          screen.getByRole('menuitem', { name: 'AddWX' }),
        ).toBeInTheDocument();
      });
    });

    describe('onCreate', () => {
      it('calls the function when the user clicks the add new option button', async () => {
        const onCreate = vi.fn();

        render(<IressSelectCreate onCreate={onCreate} />);

        await userEvent.click(
          screen.getByRole('menuitem', { name: 'AddNew option' }),
        );

        expect(onCreate).toHaveBeenCalledOnce();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSelectCreate />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
