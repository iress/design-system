import { render } from '@testing-library/react';
import { button, IressCloseButton } from '..';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';

describe('IressCloseButton', () => {
  it('should render the component with the correct text and classes', () => {
    const { getByTestId } = render(
      <IressCloseButton data-testid="test" className="test-class" />,
    );

    const component = getByTestId('test');
    expect(component).toHaveClass(
      `test-class ${button({ mode: 'tertiary' }).root}`,
      GlobalCSSClass.CloseButton,
    );
  });

  it('should render the correct screen reader text on the icon', () => {
    const { getByRole } = render(
      <IressCloseButton screenreaderText="Click me" />,
    );

    const icon = getByRole('img');
    expect(icon).toHaveAttribute('aria-label', 'Click me');
  });

  it('renders the correct data-testid when set via the data-testid attribute', () => {
    const { getByTestId } = render(<IressCloseButton data-testid="Sausage" />);

    const button = getByTestId('Sausage');

    expect(button).toBeInTheDocument();
  });
});

describe('accessibility', () => {
  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressCloseButton />
        <IressCloseButton screenreaderText="Test" />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
