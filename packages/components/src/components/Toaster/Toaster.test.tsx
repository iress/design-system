import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Toaster, type ToasterProps, ToasterItem } from './Toaster';
import { toaster as toasterStyles } from './Toaster.styles';
import { GlobalCSSClass } from '@/enums';

interface MockToasterItem extends Omit<ToasterItem, 'content'> {
  content: string;
}

const mockToasts: MockToasterItem[] = [
  { id: '1', status: 'danger', content: 'Sample Toast 1' },
  { id: '2', status: 'info', content: 'Sample Toast 2' },
  { id: '3', status: 'success', content: 'Sample Toast 3' },
];

describe('Toaster', () => {
  it('renders with defaults', () => {
    const screen = render(<Toaster />);

    const toaster = screen.getByRole('alert');
    expect(toaster).toBeInTheDocument();

    expect(toaster).toHaveAttribute('aria-live', 'assertive');
    expect(toaster).toHaveAttribute('aria-relevant', 'additions');
  });

  it('renders toasts', () => {
    const { container } = render(
      <Toaster toasts={mockToasts} className="test-class" />,
    );

    const toasterElement = container.querySelector('[role="alert"]');
    expect(toasterElement).not.toBeNull();

    const toasterHolder = toasterElement?.querySelector(
      `.${GlobalCSSClass.Toaster}`,
    );
    expect(toasterHolder).toHaveClass('test-class');

    mockToasts.forEach((toast) => {
      const toastElement = screen.getByLabelText(`${toast.status}:`);
      expect(toastElement).toBeInTheDocument();
    });

    mockToasts.forEach((toast) => {
      const toastElement = screen.getByText(toast.content);
      expect(toastElement).toBeInTheDocument();
    });
  });

  describe('props', () => {
    describe('container', () => {
      it('changes where the toaster is rendered', () => {
        const container = document.createElement('div');

        render(<Toaster toasts={mockToasts} container={container} />);

        expect(container).toHaveAttribute('role', 'alert');
        expect(container.innerHTML).toContain('Sample Toast 1');
      });
    });

    describe('position', () => {
      const positions: NonNullable<ToasterProps['position']>[] = [
        'bottom-center',
        'bottom-end',
        'bottom-start',
        'top-center',
        'top-end',
        'top-start',
      ];

      it.each(positions)(
        'applies correct CSS classes for position "%s"',
        (position) => {
          const { container } = render(
            <Toaster toasts={mockToasts} position={position} />,
          );

          const toasterHolder = container.querySelector(
            `.${GlobalCSSClass.Toaster}`,
          );
          const expectedClasses = toasterStyles({ position });

          expect(toasterHolder).toHaveClass(expectedClasses.root!);
        },
      );
    });
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Toaster
        toasts={[{ id: '1', content: 'Sample Toast', status: 'info' }]}
      />,
    );

    await screen.findByText('Sample Toast');

    await act(async () => {
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
