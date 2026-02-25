import { render, screen } from '@testing-library/react';
import { IressPill } from './Pill';
import { axe } from 'jest-axe';
import { GlobalCSSClass } from '@/enums';
import { pill } from './Pill.styles';
import { STATUSES } from '@/constants';

describe('IressPill', () => {
  it('renders the component with defaults', () => {
    render(<IressPill>Pill</IressPill>);
    const badge = screen.getByText('Pill');
    expect(badge).toHaveClass(pill());
    expect(badge).toHaveClass(GlobalCSSClass.Pill);
  });

  describe('props', () => {
    describe('mode', () => {
      it('applies the correct class depending on mode', () => {
        render(<IressPill mode="20">Badge</IressPill>);
        const badge = screen.getByText('Badge');
        expect(badge).toHaveClass(pill({ mode: '20' }));
      });
    });

    describe('status', () => {
      const statusArr = STATUSES.map((status) => [status, status]);

      it.each(statusArr)(
        'renders a %s variant when status is set to %s',
        (status) => {
          render(<IressPill status={status}>Badge</IressPill>);
          const badge = screen.getByText('Badge');
          expect(badge).toHaveClass(pill({ status }));
        },
      );

      it('overrides mode when both mode and status are provided', () => {
        render(
          <IressPill mode="20" status="danger">
            Badge
          </IressPill>,
        );
        const badge = screen.getByText('Badge');
        expect(badge).toHaveClass(pill({ status: 'danger' }));
        expect(badge).not.toHaveClass(pill({ mode: '20' }));
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressPill>Content</IressPill>
          <IressPill mode="10">Success</IressPill>
          <IressPill status="success">Success Status</IressPill>
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
