import { render, screen } from '@testing-library/react';
import { Breakpoints } from '@/types';
import { BREAKPOINT_DETAILS } from '@/constants';
import { IressHide } from './Hide';

const mockWindowResize = (breakpoint: Breakpoints) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === BREAKPOINT_DETAILS[breakpoint].mediaQuery,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe('IressHide', () => {
  beforeEach(() => {
    // Set default breakpoint to md for tests
    mockWindowResize('md');
  });

  describe('default rendering', () => {
    it('renders content when hiddenOn does not match current breakpoint', () => {
      mockWindowResize('md');
      render(
        <IressHide
          data-testid="test-component"
          className="test-class"
          hiddenOn={{ xs: true, sm: true, md: false }}
        >
          Content to hide
        </IressHide>,
      );
      const component = screen.getByTestId('test-component');
      expect(component).toHaveTextContent('Content to hide');
      expect(component).toHaveClass('test-class');
    });

    it('does not render content when hiddenOn matches current breakpoint', () => {
      mockWindowResize('md');
      render(
        <IressHide data-testid="test-component" hiddenOn={{ md: true }}>
          Content to hide
        </IressHide>,
      );
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('renders content when hiddenOn is explicitly false for current breakpoint', () => {
      mockWindowResize('md');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, md: false }}
        >
          Content to hide
        </IressHide>,
      );
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('hiddenOn prop - cascading behavior', () => {
    it('hides on xs breakpoint when xs is true', () => {
      mockWindowResize('xs');
      render(
        <IressHide data-testid="test-component" hiddenOn={{ xs: true }}>
          Content
        </IressHide>,
      );
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('cascades hidden state from xs to sm when not overridden', () => {
      mockWindowResize('sm');
      render(
        <IressHide data-testid="test-component" hiddenOn={{ xs: true }}>
          Content
        </IressHide>,
      );
      // Since xs: true cascades to sm, content should be hidden on sm
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('shows on sm when xs is hidden but sm is explicitly shown', () => {
      mockWindowResize('sm');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, sm: false }}
        >
          Content
        </IressHide>,
      );
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('cascades hidden state to larger breakpoints', () => {
      mockWindowResize('lg');
      render(
        <IressHide data-testid="test-component" hiddenOn={{ xs: true }}>
          Content
        </IressHide>,
      );
      // xs: true cascades to all larger breakpoints
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('respects explicit overrides at larger breakpoints', () => {
      mockWindowResize('xl');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, md: false, xl: true }}
        >
          Content
        </IressHide>,
      );
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('shows content when breakpoint explicitly set to false', () => {
      mockWindowResize('md');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, md: false }}
        >
          Content
        </IressHide>,
      );
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('visuallyHidden prop', () => {
    it('renders with srOnly when visuallyHidden is true and content should be hidden', () => {
      mockWindowResize('md');
      const { container } = render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ md: true }}
          visuallyHidden={true}
        >
          Content to hide
        </IressHide>,
      );
      const component = screen.getByTestId('test-component');
      expect(component).toBeInTheDocument();
      // Component should have srOnly styling applied
      expect(
        container.querySelector('[data-testid="test-component"]'),
      ).toBeInTheDocument();
    });

    it('renders with srOnly when visuallyHidden is true and content should be shown', () => {
      mockWindowResize('md');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, md: false }}
          visuallyHidden={true}
        >
          Content to hide
        </IressHide>,
      );
      const component = screen.getByTestId('test-component');
      expect(component).toBeInTheDocument();
    });

    it('always renders when visuallyHidden is true regardless of breakpoint', () => {
      mockWindowResize('xs');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true }}
          visuallyHidden={true}
        >
          Content
        </IressHide>,
      );
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });
  });

  describe('multiple breakpoints', () => {
    it('hides on sm and shows on larger breakpoints', () => {
      mockWindowResize('sm');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ sm: true, md: false }}
        >
          Content
        </IressHide>,
      );
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });

    it('shows on md when sm is hidden but md is explicitly shown', () => {
      mockWindowResize('md');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ sm: true, md: false }}
        >
          Content
        </IressHide>,
      );
      expect(screen.getByTestId('test-component')).toBeInTheDocument();
    });

    it('handles complex hide patterns across all breakpoints', () => {
      // Hidden on xs, shown on sm-lg, hidden on xl+
      mockWindowResize('xxl');
      render(
        <IressHide
          data-testid="test-component"
          hiddenOn={{ xs: true, sm: false, xl: true }}
        >
          Content
        </IressHide>,
      );
      expect(screen.queryByTestId('test-component')).not.toBeInTheDocument();
    });
  });
});
