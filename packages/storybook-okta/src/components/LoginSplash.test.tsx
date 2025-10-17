import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginSplash } from './LoginSplash';

describe('LoginSplash', () => {
  it('renders with default message when no children provided', () => {
    render(<LoginSplash />);

    expect(screen.getByText('Logging in...')).toBeInTheDocument();
  });

  it('renders with custom message when children provided', () => {
    const customMessage = 'Please wait while we authenticate you';

    render(<LoginSplash>{customMessage}</LoginSplash>);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
    expect(screen.queryByText('Logging in...')).not.toBeInTheDocument();
  });
});
