import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { IressToaster } from './Toaster';
import { IressToasterProps, ToastItem } from './Toaster.types';
import { IressToasterProvider } from './ToasterProvider';
import styles from './Toaster.module.scss';

const renderComponent = (props?: Partial<IressToasterProps>) => {
  return render(
    <IressToasterProvider>
      <IressToaster {...props} />
    </IressToasterProvider>,
  );
};

const mockToasts = [
  { id: '1', status: 'error', content: 'Sample Toast 1' },
  { id: '2', status: 'info', content: 'Sample Toast 2' },
  { id: '3', status: 'success', content: 'Sample Toast 3' },
];

describe('IressToaster', () => {
  it('renders with defaults', () => {
    const screen = render(<IressToasterProvider />);

    const toaster = screen.getByRole('alert');
    expect(toaster).toBeInTheDocument();

    expect(toaster).toHaveAttribute('aria-live', 'assertive');
    expect(toaster).toHaveAttribute('aria-relevant', 'additions');
  });

  it('renders toasts', () => {
    const { container } = render(
      <IressToasterProvider>
        <IressToaster toasts={mockToasts as ToastItem[]} />
      </IressToasterProvider>,
    );

    expect(container.querySelector(`.${styles.toaster}`)).not.toBeNull();

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

        render(
          <IressToasterProvider>
            <IressToaster
              toasts={mockToasts as ToastItem[]}
              container={container}
            />
          </IressToasterProvider>,
        );

        expect(container).toHaveAttribute('role', 'alert');
        expect(container.innerHTML).toContain('Sample Toast 1');
      });
    });
  });

  it('should have no accessibility violations', async () => {
    const screen = renderComponent({
      toasts: [{ id: '1', content: 'Sample Toast' }] as ToastItem[],
    });

    await screen.findByText('Sample Toast');

    await act(async () => {
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
