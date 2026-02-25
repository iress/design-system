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

      const statusArr = STATUSES.map((status) => [status, status]);

      it.each(statusArr)(
        'renders a %s variant when mode is set to %s',
        (status) => {
          render(<IressPill mode={status}>Badge</IressPill>);
          const badge = screen.getByText('Badge');
          expect(badge).toHaveClass(pill({ mode: status }));
        },
      );
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressPill>Content</IressPill>
          <IressPill mode="10">Mode 10</IressPill>
          <IressPill mode="success">Success</IressPill>
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
