import { render, screen, act } from '@testing-library/react';
import { IressIconProvider, IconContext } from './IconProvider';
import { useContext } from 'react';
import { IressIcon } from './Icon';
import { useDynamicFontSubsetting } from './hooks/useDynamicFontSubsetting';
import { icon } from './Icon.styles';

// Mock the useDynamicFontSubsetting hook
let IS_LOADED = true;
vi.mock('./hooks/useDynamicFontSubsetting', () => ({
  useDynamicFontSubsetting: vi.fn(() => ({
    loadedIcons: new Set(),
    isIconLoaded: vi.fn(() => IS_LOADED),
  })),
}));

describe('IressIconProvider', () => {
  it('uses Material Symbols as default type', () => {
    const TestComponent = () => {
      const context = useContext(IconContext);
      return <div data-testid="icon-type">{context?.type}</div>;
    };

    render(
      <IressIconProvider>
        <TestComponent />
      </IressIconProvider>,
    );

    expect(screen.getByTestId('icon-type')).toHaveTextContent('material');
  });

  describe('type', () => {
    it('supports fontawesome', () => {
      const TestComponent = () => {
        const context = useContext(IconContext);
        return <div data-testid="icon-type">{context?.type}</div>;
      };

      render(
        <IressIconProvider type="fontawesome">
          <TestComponent />
        </IressIconProvider>,
      );

      expect(screen.getByTestId('icon-type')).toHaveTextContent('fontawesome');
    });

    it('renders FontLoader for fontawesome type', () => {
      render(
        <IressIconProvider
          type="fontawesome"
          data-testid="font-loader-font-awesome-fonts"
        >
          <div>Content</div>
        </IressIconProvider>,
      );

      const fontLoader = document.querySelector(
        `[data-url="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"]`,
      );
      expect(fontLoader).toBeInTheDocument();
    });

    it('does not render Material Symbols FontLoader without container for material type', () => {
      render(
        <IressIconProvider type="material">
          <div>Content</div>
        </IressIconProvider>,
      );

      const fontLoader = document.querySelector(
        `[data-url^="https://fonts.googleapis.com"]`,
      );
      expect(fontLoader).toBeNull();
    });
  });

  describe('container', () => {
    it('renders FontLoader with container for fontawesome', () => {
      const container = document.createElement('div');

      render(
        <IressIconProvider type="fontawesome" container={container}>
          <div>Content</div>
        </IressIconProvider>,
      );

      const fontLoader = document.querySelector(
        `[data-url="https://cdn.iress.com/icons/5.15.4/css/combined.min.css"]`,
      );
      expect(fontLoader).toBeInTheDocument();
    });
  });

  describe('noSubsetting', () => {
    it('calls the useDynamicFontSubsetting hook with noSubsetting', () => {
      render(
        <IressIconProvider noSubsetting>
          <IressIcon name="home" />
        </IressIconProvider>,
      );

      expect(useDynamicFontSubsetting).toHaveBeenCalledWith(
        expect.objectContaining({
          noSubsetting: true,
        }),
      );
    });
  });

  describe('registerIcon', () => {
    it('should allow registering icons', async () => {
      render(
        <IressIconProvider>
          <IressIcon name="home" />
          <IressIcon name="search" />
        </IressIconProvider>,
      );

      expect(useDynamicFontSubsetting).toHaveBeenCalledWith(
        expect.objectContaining({
          icons: new Set(['home', 'search']),
        }),
      );
    });

    it('handles duplicate icon registration', async () => {
      render(
        <IressIconProvider>
          <IressIcon name="home" />
          <IressIcon name="home" />
        </IressIconProvider>,
      );

      expect(useDynamicFontSubsetting).toHaveBeenCalledWith(
        expect.objectContaining({
          icons: new Set(['home']),
        }),
      );
    });
  });

  describe('isIconLoaded function', () => {
    it('should check if icon is loaded for material type', () => {
      IS_LOADED = false;

      const { rerender } = render(
        <IressIconProvider type="material">
          <IressIcon name="home" screenreaderText="Home" />
        </IressIconProvider>,
      );

      const iconElement = screen.getByRole('img', { name: 'Home' });
      // Should be not visible as still loading
      expect(iconElement).toHaveClass(icon({ loading: true }));

      // Mock the stylesheet being loaded in
      act(() => {
        IS_LOADED = true;
      });

      rerender(
        <IressIconProvider type="material">
          <IressIcon name="home" screenreaderText="Home" />
        </IressIconProvider>,
      );

      // Should be visible now
      expect(iconElement).not.toHaveClass(icon({ loading: true }));
    });
  });
});
