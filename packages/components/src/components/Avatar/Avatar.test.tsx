import { render, screen } from '@testing-library/react';
import { IressAvatar } from './Avatar';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { avatar } from './Avatar.styles';

describe('IressAvatar', () => {
  it('renders with children', () => {
    render(<IressAvatar>BC</IressAvatar>);
    const el = screen.getByRole('img', { name: 'BC' });
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass(GlobalCSSClass.Avatar);
    expect(el).toHaveTextContent('BC');
  });

  it('uses aria-label as accessible name when provided', () => {
    render(<IressAvatar aria-label="Luke Skywalker">LS</IressAvatar>);
    const el = screen.getByRole('img', { name: 'Luke Skywalker' });
    expect(el).toBeInTheDocument();
  });

  describe('props', () => {
    describe('badge', () => {
      it('renders badge with icon', () => {
        render(
          <IressAvatar badge={{ ariaLabel: 'Online', icon: 'circle' }}>
            BC
          </IressAvatar>,
        );
        expect(screen.getByRole('img', { name: 'Online' })).toBeInTheDocument();
      });

      it('renders badge without icon', () => {
        render(<IressAvatar badge={{ ariaLabel: 'Status' }}>BC</IressAvatar>);
        expect(screen.getByRole('img', { name: 'Status' })).toBeInTheDocument();
      });

      it('renders badge with mode', () => {
        render(
          <IressAvatar
            badge={{ ariaLabel: 'Error', icon: 'error', mode: 'danger' }}
          >
            BC
          </IressAvatar>,
        );
        const badge = screen.getByRole('img', { name: 'BC' });
        expect(badge).toHaveClass(avatar({ badgeMode: 'danger' }).root!);
      });
    });

    describe('type', () => {
      it('renders type with icon', () => {
        render(
          <IressAvatar type={{ ariaLabel: 'Group', icon: 'group' }}>
            BC
          </IressAvatar>,
        );
        expect(screen.getByRole('img', { name: 'Group' })).toBeInTheDocument();
      });
    });

    describe('mode', () => {
      it('accepts a numeric mode', () => {
        render(<IressAvatar mode={20}>BC</IressAvatar>);
        expect(screen.getByRole('img', { name: 'BC' })).toHaveClass(
          avatar({ mode: '20' }).root!,
        );
      });

      it('accepts a status mode', () => {
        render(<IressAvatar mode="success">BC</IressAvatar>);
        expect(screen.getByRole('img', { name: 'BC' })).toHaveClass(
          avatar({ mode: 'success' }).root!,
        );
      });
    });

    describe('compact', () => {
      it('renders compact avatar', () => {
        render(<IressAvatar compact>BC</IressAvatar>);
        expect(screen.getByRole('img', { name: 'BC' })).toHaveClass(
          avatar({ compact: true }).root!,
        );
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressAvatar>BC</IressAvatar>
          <IressAvatar badge={{ ariaLabel: 'Online', icon: 'circle' }}>
            BC
          </IressAvatar>
          <IressAvatar type={{ ariaLabel: 'Group', icon: 'group' }}>
            BC
          </IressAvatar>
          <IressAvatar compact>MT</IressAvatar>
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
