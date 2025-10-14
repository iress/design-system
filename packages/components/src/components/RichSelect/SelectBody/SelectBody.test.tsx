import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectBody } from './SelectBody';
import { selectBody } from './SelectBody.styles';

describe('IressSelectBody', () => {
  it('renders the component with the correct defaults', () => {
    const classes = selectBody();

    render(
      <IressSelectBody className="test-class" data-testid="select-body">
        Contents
      </IressSelectBody>,
    );

    const body = screen.getByTestId('select-body');
    expect(body).toHaveClass('test-class');
    if (classes.selectBody) {
      expect(body).toHaveClass(classes.selectBody);
    }

    const contents = screen.getByText('Contents');
    if (classes.children) {
      expect(contents).toHaveClass(classes.children);
    }
  });

  describe('props', () => {
    describe('header', () => {
      it('renders a header', () => {
        render(<IressSelectBody header="Header" />);

        const header = screen.getByText('Header');
        expect(header).toBeInTheDocument();
      });
    });

    describe('footer', () => {
      it('renders a footer', () => {
        render(<IressSelectBody footer="Footer" />);

        const footer = screen.getByText('Footer');
        expect(footer).toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(<IressSelectBody />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
