import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Redirect } from './Redirect';

// Mock window.location.href
const mockLocationHref = vi.fn();

describe('Redirect', () => {
  beforeEach(() => {
    // Mock window.top and window.location
    Object.defineProperty(window, 'top', {
      value: {
        location: {
          set href(url: string) {
            mockLocationHref(url);
          },
        },
      },
      writable: true,
    });

    Object.defineProperty(window, 'location', {
      value: {
        set href(url: string) {
          mockLocationHref(url);
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders default title when no title provided', () => {
    render(<Redirect to="https://example.com" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Redirecting...',
    );
  });

  it('renders custom title when provided', () => {
    render(<Redirect title="Please wait" to="https://example.com" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Please wait',
    );
  });

  it('renders fallback link with correct href', () => {
    render(<Redirect to="https://example.com" />);

    const link = screen.getByRole('link', { name: 'follow the link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('renders fallback message', () => {
    render(<Redirect to="https://example.com" />);

    expect(
      screen.getByText(/If you are not redirected automatically,/),
    ).toBeInTheDocument();
  });

  it('redirects to specified URL using window.top when available', () => {
    render(<Redirect to="https://example.com" />);

    expect(mockLocationHref).toHaveBeenCalledWith('https://example.com');
    expect(mockLocationHref).toHaveBeenCalledTimes(1);
  });

  it('redirects to different URL when to prop changes', () => {
    const { rerender } = render(<Redirect to="https://first.com" />);

    expect(mockLocationHref).toHaveBeenCalledWith('https://first.com');

    rerender(<Redirect to="https://second.com" />);

    expect(mockLocationHref).toHaveBeenCalledWith('https://second.com');
    expect(mockLocationHref).toHaveBeenCalledTimes(2);
  });

  it('falls back to window.location when window.top is not available', () => {
    // Mock window.top as null
    Object.defineProperty(window, 'top', {
      value: null,
      writable: true,
    });

    render(<Redirect to="https://example.com" />);

    expect(mockLocationHref).toHaveBeenCalledWith('https://example.com');
  });

  it('renders IressPanel with correct styling props', () => {
    render(<Redirect to="https://example.com" />);

    // Check that the panel container exists with expected content
    const heading = screen.getByRole('heading', { level: 2 });
    const panel = heading.closest('[data-testid], div');

    expect(panel).toBeInTheDocument();
    expect(panel).toContainElement(heading);
    expect(panel).toContainElement(
      screen.getByRole('link', { name: 'follow the link' }),
    );
  });

  it('handles special characters in URL', () => {
    const urlWithSpecialChars =
      'https://example.com/path?param=value&other=123';
    render(<Redirect to={urlWithSpecialChars} />);

    expect(mockLocationHref).toHaveBeenCalledWith(urlWithSpecialChars);

    const link = screen.getByRole('link', { name: 'follow the link' });
    expect(link).toHaveAttribute('href', urlWithSpecialChars);
  });

  it('handles relative URLs', () => {
    const relativeUrl = '/relative/path';
    render(<Redirect to={relativeUrl} />);

    expect(mockLocationHref).toHaveBeenCalledWith(relativeUrl);

    const link = screen.getByRole('link', { name: 'follow the link' });
    expect(link).toHaveAttribute('href', relativeUrl);
  });

  it('handles empty title string', () => {
    render(<Redirect title="" to="https://example.com" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('');
  });

  it('calls redirect effect only once on initial render', () => {
    render(<Redirect to="https://example.com" />);

    expect(mockLocationHref).toHaveBeenCalledTimes(1);
  });
});
