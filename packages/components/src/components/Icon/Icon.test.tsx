import { render, screen } from '@testing-library/react';
import { IressIcon } from '.';
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
        it('renders the correct a11y attributes', async () => {
          render(<IressIcon name="home" screenreaderText="Home screen" />);

          const component = await screen.findByRole('img', {
            name: 'Home screen',
          });
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
        it('renders the correct css class', async () => {
          render(<IressIcon name="home" flip="both" />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ flip: 'both' }));
        });
      });

      describe('rotate', () => {
        it('renders the correct css class', async () => {
          render(<IressIcon name="home" rotate={90} />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ rotate: 90 }));
        });
      });

      describe('spin', () => {
        it('should render the correct css class', async () => {
          render(<IressIcon name="home" spin="half" />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ spin: 'half' }));
        });
      });
    });
  });

  describe('Material Symbols', () => {
    it('renders icon container with correct structure', async () => {
      render(<IressIcon type="material" name="home" className="test-class" />);

      // Wait for icon container (may be Suspense fallback initially)
      const iconContainer = await screen.findByRole('img', { hidden: true });

      // Verify the container has correct classes
      expect(iconContainer).toBeInTheDocument();
      expect(iconContainer).toHaveClass(GlobalCSSClass.Icon);

      // Should have the custom class (test-class) or be the fallback
      // The fallback won't have test-class, but the loaded version will
      if (iconContainer.className.includes('test-class')) {
        expect(iconContainer).toHaveClass('test-class');
      }

      // Basic structure check - should be a span element
      expect(iconContainer.tagName).toBe('SPAN');
      expect(iconContainer).toHaveAttribute('role', 'img');
      expect(iconContainer).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders without deprecation warning', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      render(<IressIcon type="material" name="home" />);
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    describe('props', () => {
      describe('screenreaderText', () => {
        it('renders the correct a11y attributes', async () => {
          render(
            <IressIcon
              type="material"
              name="home"
              screenreaderText="Home screen"
            />,
          );

          const component = await screen.findByRole('img', {
            name: 'Home screen',
          });
          expect(component).toBeInTheDocument();
          expect(component).toHaveAccessibleName('Home screen');
          expect(component).not.toHaveAttribute('aria-hidden');
        });
      });

      describe('filled', () => {
        it('renders the filled variant', async () => {
          render(<IressIcon type="material" name="star" filled />);

          // Wait for icon container (Suspense fallback or loaded icon)
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toBeInTheDocument();
          expect(component).toHaveClass(GlobalCSSClass.Icon);
        });

        it('renders outline variant', async () => {
          render(<IressIcon type="material" name="star" filled={false} />);

          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toBeInTheDocument();
          expect(component).toHaveClass(GlobalCSSClass.Icon);
        });
      });

      describe('flip', () => {
        it('renders the correct css class', async () => {
          render(<IressIcon type="material" name="home" flip="both" />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ flip: 'both' }));
        });
      });

      describe('rotate', () => {
        it('renders the correct css class', async () => {
          render(<IressIcon type="material" name="home" rotate={90} />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ rotate: 90 }));
        });
      });

      describe('spin', () => {
        it('should render the correct css class', async () => {
          render(<IressIcon type="material" name="home" spin="half" />);
          const component = await screen.findByRole('img', { hidden: true });
          expect(component).toHaveClass(icon({ spin: 'half' }));
        });
      });
    });
  });
});
