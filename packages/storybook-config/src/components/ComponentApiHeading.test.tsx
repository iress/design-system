import { ComponentApiHeading } from './ComponentApiHeading';
import { render, screen } from '@testing-library/react';

describe('ComponentApiHeading', () => {
  it('renders a heading', () => {
    render(<ComponentApiHeading />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Props');
    expect(heading).toHaveAttribute('id', 'props');
  });

  it('renders custom heading', () => {
    render(
      <ComponentApiHeading headingId="api" headingLevel={4}>
        API
      </ComponentApiHeading>,
    );

    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveTextContent('API');
    expect(heading).toHaveAttribute('id', 'api');
  });
});
