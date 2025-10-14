import { render, screen } from '@testing-library/react';
import { IressIcon } from '.';
import { icon } from './Icon.styles';
import { GlobalCSSClass } from '@/enums';

describe('IressIcon', () => {
  it('renders the correct defaults', () => {
    render(<IressIcon name="home" className="test-class" />);

    const component = screen.getByRole('img', { hidden: true });
    expect(component).toHaveClass(
      `test-class fa-home fal ${icon()}`,
      GlobalCSSClass.Icon,
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
        render(<IressIcon name="home" fixedWidth />);
        const component = screen.getByRole('img', { hidden: true });
        expect(component).toHaveClass('fa-fw');
      });
    });

    describe('set', () => {
      it('renders the correct css class', () => {
        render(<IressIcon name="home" set="fab" />);
        const component = screen.getByRole('img', { hidden: true });
        expect(component).toHaveClass('fab');
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
