import { render, waitFor } from '@testing-library/react';
import { IressTooltip, IressTooltipProvider } from '.';
import { IressButton } from '../Button';

const TEST_ID = 'test-component';

describe('IressTooltipProvider', () => {
  it('renders tooltip content into the provider container', async () => {
    const providerContainer = document.createElement('div');
    document.body.appendChild(providerContainer);

    render(
      <IressTooltipProvider container={providerContainer}>
        <IressTooltip open tooltipText="Provider tooltip" data-testid={TEST_ID}>
          <IressButton>Hover me</IressButton>
        </IressTooltip>
      </IressTooltipProvider>,
    );

    await waitFor(() => expect(providerContainer.children).toHaveLength(1));
    expect(providerContainer).toHaveTextContent('Provider tooltip');

    document.body.removeChild(providerContainer);
  });

  it('allows the tooltip container prop to override the provider container', async () => {
    const providerContainer = document.createElement('div');
    const tooltipContainer = document.createElement('div');
    document.body.appendChild(providerContainer);
    document.body.appendChild(tooltipContainer);

    render(
      <IressTooltipProvider container={providerContainer}>
        <IressTooltip
          open
          container={tooltipContainer}
          tooltipText="Override tooltip"
          data-testid={TEST_ID}
        >
          <IressButton>Hover me</IressButton>
        </IressTooltip>
      </IressTooltipProvider>,
    );

    await waitFor(() => expect(tooltipContainer.children).toHaveLength(1));
    expect(tooltipContainer).toHaveTextContent('Override tooltip');
    expect(providerContainer.children).toHaveLength(0);

    document.body.removeChild(providerContainer);
    document.body.removeChild(tooltipContainer);
  });

  it('renders inline when container={null} even with provider container', () => {
    const providerContainer = document.createElement('div');
    document.body.appendChild(providerContainer);

    const { getByTestId } = render(
      <IressTooltipProvider container={providerContainer}>
        <IressTooltip
          open
          container={null}
          tooltipText="Inline tooltip"
          data-testid={TEST_ID}
        >
          <IressButton>Hover me</IressButton>
        </IressTooltip>
      </IressTooltipProvider>,
    );

    expect(getByTestId(`${TEST_ID}__tooltip-text`)).toHaveTextContent(
      'Inline tooltip',
    );
    expect(providerContainer.children).toHaveLength(0);

    document.body.removeChild(providerContainer);
  });
});
