import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressNavbar } from '.';
import { IressText } from '../Text';

describe('IressNavbar', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  beforeEach(() => {
    const ResizeObserverMock = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('ResizeObserver', ResizeObserverMock);
  });

  it('should render the component with children, text and classes', () => {
    const screen = render(
      <IressNavbar data-testid="test-component" className="test-class">
        Nav heading
      </IressNavbar>,
    );

    const component = screen.getByTestId('test-component');
    screen.getByText('Nav heading');
    expect(component).toHaveClass('test-class');
  });

  it('renders with the correct data-testids', () => {
    const screen = render(
      <IressNavbar
        data-testid="test-navbar"
        logoSrc="logo/src.png"
        logoAltText="test alt text"
        homeUrl="www.google.com"
        nav={<div>Nav Text</div>}
        breakpoint={IressNavbar.Breakpoint.Lg}
      />,
    );

    expect(screen.getByTestId('test-navbar__nav')).toBeInTheDocument();

    expect(screen.getByTestId('test-navbar__logo')).toBeInTheDocument();
    expect(screen.getByTestId('test-navbar__logo-link')).toBeInTheDocument();

    expect(
      screen.getByTestId('test-navbar__toggle-button__button'),
    ).toBeInTheDocument();
  });

  describe('logo', () => {
    it('should render the standard logo', () => {
      const screen = render(
        <IressNavbar logo={<div>Logo Text</div>}>Nav heading</IressNavbar>,
      );

      const logo = screen.getByText('Logo Text');
      expect(logo).toBeInTheDocument();
    });

    it('should render a fallback logo with a home link if provided', () => {
      const screen = render(
        <IressNavbar data-testid="test-component" homeUrl="www.google.com">
          Nav heading
        </IressNavbar>,
      );

      const logo = screen.getByRole('link');
      expect(logo).toBeInTheDocument();
    });

    it('should pass a test id through to the fallback logo', () => {
      const screen = render(
        <IressNavbar data-testid="test-component" homeUrl="www.google.com">
          Nav heading
        </IressNavbar>,
      );

      const logo = screen.getByTestId('test-component__logo-link');
      expect(logo).toBeInTheDocument();
    });

    it('should render the logo from src with a home link if both are provided', () => {
      const screen = render(
        <IressNavbar
          data-testid="test-component"
          logoSrc="logo/src.png"
          logoAltText="test alt text"
          homeUrl="www.google.com"
        >
          Nav heading
        </IressNavbar>,
      );

      const logoLink = screen.getByTestId('test-component__logo-link');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink).toHaveAttribute('href', 'www.google.com');
      const logoImg = logoLink.querySelector('img');
      expect(logoImg).toHaveAttribute('src', 'logo/src.png');
    });

    it('should render the logo with a link if provided', () => {
      const screen = render(
        <IressNavbar data-testid="test-component" homeUrl="www.google.com">
          Nav heading
        </IressNavbar>,
      );

      const logo = screen.getByTestId('test-component__logo-link');
      expect(logo).toBeInTheDocument();
    });
  });

  it('should render the logo from a src url if provided', () => {
    const screen = render(
      <IressNavbar
        data-testid="test-component"
        logoSrc="www.google.com"
        logoAltText="google logo"
      >
        Nav heading
      </IressNavbar>,
    );

    const logo = screen.getByAltText('google logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'www.google.com');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues in a default render', async () => {
      const { container } = render(<IressNavbar></IressNavbar>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues in a complex render', async () => {
      const { container } = render(
        <IressNavbar
          logo={<div>Logo Text</div>}
          nav={<div>Nav Text</div>}
          breakpoint={IressNavbar.Breakpoint.Lg}
          fixed={true}
          handledFocus={true}
          homeUrl="www.google.com"
          horizontalAlign={IressNavbar.HorizontalAlign.Between}
          logoAltText="Alt Text"
          logoSrc="www.google.com/icon"
          navLabel="Main navigation"
        >
          <IressText>Children of the Navbar</IressText>
        </IressNavbar>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
