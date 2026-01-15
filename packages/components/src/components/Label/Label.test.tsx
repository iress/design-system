import { render } from '@testing-library/react';
import { IressLabel } from './Label';
import { axe } from 'jest-axe';

describe('IressLabel', () => {
  it('renders as label tag', () => {
    const screen = render(
      <IressLabel htmlFor="bacon" data-testid="sausage">
        Eggs
      </IressLabel>,
    );

    const label = screen.getByTestId('sausage');
    expect(label.tagName).toBe('LABEL');
  });

  it('renders as strong tag if no htmlFor is provided', () => {
    const screen = render(<IressLabel data-testid="sausage">Eggs</IressLabel>);

    const label = screen.getByTestId('sausage');
    expect(label.tagName).toBe('STRONG');
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressLabel htmlFor="bacon">Eggs</IressLabel>
          <input id="bacon" name="egg" />
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('locked prop', () => {
    it('renders lock icon when locked is true', () => {
      const screen = render(
        <IressLabel htmlFor="test" locked data-testid="label">
          Test Label
        </IressLabel>,
      );

      const lockIcon = screen.getByTestId('label__lock-icon');
      expect(lockIcon).toBeInTheDocument();
    });

    it('does not render lock icon when locked is false', () => {
      const screen = render(
        <IressLabel htmlFor="test" locked={false} data-testid="label">
          Test Label
        </IressLabel>,
      );

      expect(screen.queryByTestId('label__lock-icon')).not.toBeInTheDocument();
    });

    it('lock icon has accessible title', () => {
      const screen = render(
        <IressLabel htmlFor="test" locked data-testid="label">
          Test Label
        </IressLabel>,
      );

      const lockIcon = screen.getByTestId('label__lock-icon');
      const title = lockIcon.querySelector('title');
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toBe('(Locked)');
    });
  });
});
