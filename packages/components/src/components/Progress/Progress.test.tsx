import { axe } from 'jest-axe';
import { IressProgress } from './Progress';
import { render, screen } from '@testing-library/react';
import { progress } from './Progress.styles';
import { GlobalCSSClass } from '@/enums';

describe('IressProgress', () => {
  describe('props', () => {
    it('renders with defaults', () => {
      render(<IressProgress />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveClass(progress(), GlobalCSSClass.Progress);
      expect(progressBar).toHaveAttribute('max', '100');
      expect(progressBar).not.toHaveAttribute('min');
      expect(progressBar).toHaveAttribute('value', '0');
    });

    it('renders with custom min, max, and value', () => {
      render(<IressProgress min={0} max={100} value={50} />);

      const progressBar = screen.getByRole('meter');

      expect(progressBar).toHaveAttribute('max', '100');
      expect(progressBar).toHaveAttribute('min', '0');
      expect(progressBar).toHaveAttribute('value', '50');
    });
  });

  describe('resets on limit break', () => {
    it('resets value to min if less than min', () => {
      render(<IressProgress min={0} value={-12} />);

      const progressBar = screen.getByRole('meter');
      expect(progressBar).toHaveAttribute('min', '0');
    });

    it('resets value to max if greater than max', () => {
      render(<IressProgress max={100} value={102} />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveAttribute('max', '100');
    });
  });

  it('sets the section title correctly', () => {
    render(<IressProgress sectionTitle="Step {{current}} of {{max}}" />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveAccessibleName('Step 0 of 100');
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressProgress />
        <IressProgress max={100} value={50} />
        <IressProgress
          max={100}
          value={100}
          sectionTitle="Step {{current}} of {{max}}"
        />
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
