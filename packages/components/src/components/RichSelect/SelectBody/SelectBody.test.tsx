import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSelectBody } from './SelectBody';

import styles from './SelectBody.module.scss';

describe('IressSelectBody', () => {
  it('renders the component with the correct defaults', () => {
    render(
      <IressSelectBody className="test-class" role="main">
        Contents
      </IressSelectBody>,
    );

    const body = screen.getByRole('main');
    expect(body).toHaveClass('test-class', styles.selectBody);

    const contents = screen.getByText('Contents');
    expect(contents).toHaveClass(styles.children);
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
