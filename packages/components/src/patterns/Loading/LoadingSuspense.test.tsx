import { render, screen, waitFor } from '@testing-library/react';
import { lazy, use } from 'react';
import { IressLoadingSuspense } from './LoadingSuspense';

const LoadingLazyTest = lazy(() => import('./mocks/LoadingLazyTest'));

const PromiseComponent = ({ promise }: { promise: Promise<unknown> }) => {
  use(promise);
  return <div>Lazy Component</div>;
};

describe('IressLoadingSuspense', () => {
  it('renders a start-up loading pattern with a lazy loaded component', async () => {
    render(
      <IressLoadingSuspense pattern="start-up">
        <LoadingLazyTest />
      </IressLoadingSuspense>,
    );

    // Check for the progress bar
    await screen.findByLabelText('0% loaded');

    // Check for the lazy loaded component
    await screen.findByText('Lazy Component');

    // Check that the progress bar is no longer visible
    expect(screen.queryByLabelText('0% loaded')).toBeNull();
  });

  it('renders a component loading pattern with a promised component', async () => {
    const promise = new Promise((resolve) => setTimeout(resolve, 100));

    render(
      <IressLoadingSuspense pattern="component">
        <PromiseComponent promise={promise} />
      </IressLoadingSuspense>,
    );

    // The component pattern shows a skeleton with screen reader text while loading
    await screen.findByText('Loading...');

    // Wait for the children to resolve and become visible (not inside a hidden container)
    await waitFor(
      () => {
        const elements = screen.getAllByText('Lazy Component');
        const visible = elements.find((el) => !el.closest('[hidden]'));
        expect(visible).toBeTruthy();
      },
      { timeout: 2000 },
    );
  });
});
