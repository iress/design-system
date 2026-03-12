import { render, screen } from '@testing-library/react';
import { IressIcon, IressIconProvider } from '.';
import { icon } from './Icon.styles';
import { GlobalCSSClass } from '@/enums';
import { idsLogger } from '@/helpers/utility/idsLogger';

describe('IressIcon', () => {
  describe('Font Awesome (deprecated)', () => {
    it('renders the correct defaults', () => {
      render(
        <IressIcon type="fontawesome" name="home" className="test-class" />,
      );

      const component = screen.getByRole('img', { hidden: true });
      expect(component).toHaveClass(
        `test-class fa-home fal ${icon()}`,
        GlobalCSSClass.Icon,
      );
    });

    it('renders deprecation warning in development', () => {
      render(<IressIcon name="home" type="fontawesome" />);

      expect(idsLogger).toHaveBeenCalledWith(
        expect.stringContaining('Font Awesome is deprecated'),
      );
    });

    describe('props', () => {
      describe('screenreaderText', () => {
        it('renders the correct a11y attributes', () => {
          render(<IressIcon name="home" screenreaderText="Home screen" />);

          const component = screen.getByRole('img', { name: 'Home screen' });
          expect(component).toBeInTheDocument();
        });
      });

      describe('fixedWidth', () => {
        it('renders the correct css class', () => {
          render(<IressIcon type="fontawesome" name="home" fixedWidth />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass('fa-fw');
        });
      });

      describe('flip', () => {
        it('renders the correct css class', () => {
          render(<IressIcon name="home" flip="both" />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ flip: 'both' }));
        });
      });

      describe('rotate', () => {
        it('renders the correct css class', () => {
          render(<IressIcon name="home" rotate={90} />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ rotate: 90 }));
        });
      });

      describe('spin', () => {
        it('should render the correct css class', () => {
          render(<IressIcon name="home" spin="half" />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ spin: 'half' }));
        });
      });
    });
  });

  describe('Material Symbols', () => {
    it('renders the correct defaults', () => {
      render(<IressIcon type="material" name="home" className="test-class" />);

      const component = screen.getByRole('img', { hidden: true });
      expect(component).toHaveClass(
        'test-class',
        GlobalCSSClass.Icon,
        icon(),
      );
      expect(component).toHaveTextContent('home');
    });

    it('renders without deprecation warning', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<IressIcon type="material" name="home" />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    describe('props', () => {
      describe('screenreaderText', () => {
        it('renders the correct a11y attributes', () => {
          render(
            <IressIcon
              type="material"
              name="home"
              screenreaderText="Home screen"
            />,
          );

          const component = screen.getByRole('img', { name: 'Home screen' });
          expect(component).toBeInTheDocument();
          expect(component).toHaveTextContent('home');
        });
      });

      describe('filled', () => {
        it('renders the filled variant class when filled=true', () => {
          render(<IressIcon type="material" name="star" filled />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ filled: true }));
        });

        it('does not render filled class when filled=false', () => {
          render(<IressIcon type="material" name="star" filled={false} />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).not.toHaveClass(icon({ filled: true }));
        });
      });

      describe('flip', () => {
        it('renders the correct css class', () => {
          render(<IressIcon type="material" name="home" flip="both" />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ flip: 'both' }));
        });
      });

      describe('rotate', () => {
        it('renders the correct css class', () => {
          render(<IressIcon type="material" name="home" rotate={90} />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ rotate: 90 }));
        });
      });

      describe('spin', () => {
        it('should render the correct css class', () => {
          render(<IressIcon type="material" name="home" spin="half" />);
          const component = screen.getByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ spin: 'half' }));
        });
      });
    });

    describe('IressIconProvider integration', () => {
      it('renders with provider context', () => {
        render(
          <IressIconProvider>
            <IressIcon type="material" name="home" />
          </IressIconProvider>,
        );

        const component = screen.getByRole('img', { hidden: true });
        expect(component).toHaveTextContent('home');
      });

      it('applies loading class when font not loaded', () => {
        render(
          <IressIconProvider>
            <IressIcon type="material" name="star" />
          </IressIconProvider>,
        );

        const component = screen.getByRole('img', { hidden: true });
        // Initially should have loading class (font not loaded immediately)
        expect(component).toHaveClass(icon({ loading: true }));
      });
    });
  });
});
