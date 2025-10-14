import { act, render, screen } from '@testing-library/react';

import { ValidateLoading } from './ValidateLoading';
import { loading } from '../Loading.styles';

describe('IressLoading pattern="validate"', () => {
  it('renders the correct defaults', async () => {
    vi.useFakeTimers();

    render(<ValidateLoading pattern="validate" loading data-testid="loader" />);

    // Message delayed by default
    expect(
      screen.queryByText('This is taking longer than expected...'),
    ).not.toBeInTheDocument();

    // Only show the message after the default timeout
    await act(() => vi.advanceTimersByTime(2501));

    const text = screen.getByText('This is taking longer than expected...');

    expect(text).toBeInTheDocument();
    expect(text).toHaveClass(
      loading({
        pattern: 'validate',
        showMessage: true,
      }).message!,
    );

    vi.useRealTimers();
  });
});
