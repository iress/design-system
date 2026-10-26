import { render, screen } from '@testing-library/react';
import { IressAvatarGroup } from './AvatarGroup';
import { IressAvatar } from '../Avatar';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { avatar } from '../Avatar.styles';

describe('IressAvatarGroup', () => {
  it('renders children with descending z-index', () => {
    render(
      <IressAvatarGroup>
        <IressAvatar>A</IressAvatar>
        <IressAvatar>B</IressAvatar>
        <IressAvatar>C</IressAvatar>
      </IressAvatarGroup>,
    );

    const group = screen.getByRole('group');
    expect(group).toHaveClass(GlobalCSSClass.AvatarGroup);

    const items = group.querySelectorAll('[style]');
    expect(items[0]).toHaveStyle({ zIndex: 3 });
    expect(items[1]).toHaveStyle({ zIndex: 2 });
    expect(items[2]).toHaveStyle({ zIndex: 1 });
  });

  it('applies the global CSS class', () => {
    render(
      <IressAvatarGroup>
        <IressAvatar>A</IressAvatar>
      </IressAvatarGroup>,
    );
    expect(screen.getByRole('group')).toHaveClass(GlobalCSSClass.AvatarGroup);
  });

  describe('compact', () => {
    it('passes compact to all children', () => {
      const { container } = render(
        <IressAvatarGroup compact>
          <IressAvatar>A</IressAvatar>
          <IressAvatar>B</IressAvatar>
        </IressAvatarGroup>,
      );

      const avatars = container.querySelectorAll(`.${GlobalCSSClass.Avatar}`);
      avatars.forEach((a) => {
        expect(a).toHaveClass(avatar({ compact: true }).root!);
      });
    });
  });

  describe('max', () => {
    it('limits visible avatars and shows overflow', () => {
      render(
        <IressAvatarGroup max={2}>
          <IressAvatar>A</IressAvatar>
          <IressAvatar>B</IressAvatar>
          <IressAvatar>C</IressAvatar>
          <IressAvatar>D</IressAvatar>
        </IressAvatarGroup>,
      );

      expect(screen.getByRole('img', { name: 'A' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
      expect(screen.queryByRole('img', { name: 'C' })).not.toBeInTheDocument();
      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('shows all avatars when max exceeds count', () => {
      render(
        <IressAvatarGroup max={10}>
          <IressAvatar>A</IressAvatar>
          <IressAvatar>B</IressAvatar>
        </IressAvatarGroup>,
      );

      expect(screen.getByRole('img', { name: 'A' })).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'B' })).toBeInTheDocument();
      expect(screen.queryByText(/\+/)).not.toBeInTheDocument();
    });
  });

  describe('overflowLabel', () => {
    it('uses custom overflow render prop', () => {
      render(
        <IressAvatarGroup
          max={1}
          overflowLabel={(count) => `+${count} are awesome`}
        >
          <IressAvatar>A</IressAvatar>
          <IressAvatar>B</IressAvatar>
          <IressAvatar>C</IressAvatar>
        </IressAvatarGroup>,
      );

      expect(screen.getByText('+2 are awesome')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressAvatarGroup aria-label="Team members" max={2}>
          <IressAvatar>A</IressAvatar>
          <IressAvatar>B</IressAvatar>
          <IressAvatar>C</IressAvatar>
        </IressAvatarGroup>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
