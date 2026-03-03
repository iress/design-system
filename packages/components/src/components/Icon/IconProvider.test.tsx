import { render, screen } from '@testing-library/react';
import { IressIconProvider, IconContext } from './IconProvider';
import { useContext } from 'react';

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
});
