import { render, screen } from '@testing-library/react';
import { IressBadge } from '.';
import styles from './Badge.module.scss';
import { axe } from 'jest-axe';
import { IressButton } from '../Button';

describe('IressBadge', () => {
  it('should render the component with defaults', () => {
    render(<IressBadge>Badge</IressBadge>);
    const badge = screen.getByText('Badge');

    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveClass(styles.pill);
    expect(badge).toHaveClass(styles['background-default']);
  });

  it('should apply the correct class when the mode prop is set', () => {
    const modes = Object.values(IressBadge.Mode);

    modes.forEach((mode) => {
      render(<IressBadge mode={mode}>{mode}</IressBadge>);
      const badge = screen.getByText(mode);

      expect(badge).toHaveClass(styles[mode]);
    });
  });

  it('should apply the correct class when the pill prop is set', () => {
    render(<IressBadge pill>Badge</IressBadge>);

    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass(styles.pill);
  });

  it('renders with the correct data-testids', () => {
    const screen = render(
      <IressBadge host={<IressButton>Button</IressButton>} data-testid="badge">
        Badge
      </IressBadge>,
    );

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge__host')).toBeInTheDocument();
  });

  it('should support a host element', () => {
    const { container } = render(
      <IressBadge host={<IressButton>Button</IressButton>}>Badge</IressBadge>,
    );

    const button = screen.getByRole('button');

    expect(container.firstChild).toHaveClass(styles.host);
    expect(button).toBeInTheDocument();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressBadge>Content</IressBadge>
        <IressBadge mode={IressBadge.Mode.Success}>Success</IressBadge>
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
