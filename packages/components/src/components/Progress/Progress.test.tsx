import { axe } from 'jest-axe';
import { IressProgress } from './Progress';
import { render, screen } from '@testing-library/react';

describe('IressProgress', () => {
  describe('props', () => {
    it('renders with defaults', () => {
      render(<IressProgress />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    });

    it('renders with custom min, max, and value', () => {
      render(<IressProgress min={0} max={100} value={50} />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });
  });

  describe('resets on limit break', () => {
    it('resets value to min if less than min', () => {
      render(<IressProgress min={0} value={-12} />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    });

    it('resets value to max if greater than max', () => {
      render(<IressProgress max={100} value={102} />);

      const progressBar = screen.getByRole('progressbar');

      expect(progressBar).toHaveAttribute('aria-valuemax', '100');
    });
  });

  it('sets the section title correctly', () => {
    render(<IressProgress sectionTitle="Step {{current}} of {{max}}" />);

    const progressBar = screen.getByRole('progressbar');

    expect(progressBar).toHaveAccessibleName('Step 0 of 100');
  });

  it('renders with the correct data-testids', () => {
    render(
      <IressProgress
        sectionTitle="Step {{current}} of {{max}}"
        data-testid="test-progress"
      />,
    );

    expect(screen.getByTestId('test-progress')).toBeInTheDocument();

    expect(
      screen.getByTestId('test-progress__progressbar'),
    ).toBeInTheDocument();
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
