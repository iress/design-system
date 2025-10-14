import { render, screen } from '@testing-library/react';
import { lazy } from 'react';
import { IressLoadingSuspense } from './LoadingSuspense';

const LoadingLazyTest = lazy(() => import('./mocks/LoadingLazyTest'));

const fakePromise = () => new Promise((resolve) => setTimeout(resolve, 100));

const PromiseComponent = () => {
  IressLoadingSuspense.use(fakePromise);
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
    const { rerender } = render(
      <IressLoadingSuspense pattern="component">
        <PromiseComponent />
      </IressLoadingSuspense>,
    );

    // Check for the skeleton loading
    await screen.findByText('Loading...');

    // Check for the lazy loaded component
    const loaded = await screen.findByText('Lazy Component');

    // Check that the loading message is no longer visible
    expect(screen.queryByText('Loading...')).toBeNull();

    rerender(
      <IressLoadingSuspense
        pattern="component"
        update="Changing the content..."
      >
        <PromiseComponent />
      </IressLoadingSuspense>,
    );

    // When updating, show the update message
    const update = screen.getByText('Changing the content...');
    expect(update).toBeInTheDocument();
    expect(loaded).toBeInTheDocument();
  });
});
