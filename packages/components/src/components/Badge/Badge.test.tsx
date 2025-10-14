import { render, screen } from '@testing-library/react';
import { IressBadge } from './Badge';
import { axe } from 'jest-axe';
import { IressButton } from '../Button';
import { SYSTEM_VALIDATION_STATUSES } from '@/constants';
import { GlobalCSSClass } from '@/enums';

const modeStyles = {
  success: 'bg_colour.system.success.fill c_colour.system.success.onFill',
  warning: 'bg_colour.system.warning.fill c_colour.system.warning.onFill',
  danger: 'bg_colour.system.danger.fill c_colour.system.danger.onFill',
  info: 'bg_colour.system.info.fill c_colour.system.info.onFill',
  neutral: 'bg_colour.neutral.20 c_colour.neutral.80',
};

describe('IressBadge', () => {
  it('should render the component with defaults', () => {
    render(<IressBadge>Badge</IressBadge>);
    const badge = screen.getByText('Badge');

    expect(badge).toBeInTheDocument();
    expect(badge).not.toHaveClass('bdr_radius.100');
    expect(badge).toHaveClass(
      'bg_colour.neutral.20 c_colour.neutral.80',
      GlobalCSSClass.Badge,
    );
  });

  it('should apply the correct class when the mode prop is set', () => {
    const modes = [...SYSTEM_VALIDATION_STATUSES, 'neutral'] as const;

    modes.forEach((mode) => {
      render(<IressBadge mode={mode}>{mode}</IressBadge>);
      const badge = screen.getByText(mode);

      expect(badge).toHaveClass(modeStyles[mode]);
    });
  });

  it('should apply the correct class when the pill prop is set', () => {
    render(<IressBadge pill>Badge</IressBadge>);

    const badge = screen.getByText('Badge');
    expect(badge).toHaveClass('bdr_radius.100');
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

    expect(container.firstChild).toHaveClass('pos_relative h_auto');
    expect(button).toBeInTheDocument();
  });

  it('should not have basic accessibility issues', async () => {
    const { container } = render(
      <>
        <IressBadge>Content</IressBadge>
        <IressBadge mode="success">Success</IressBadge>
      </>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
