import { highlightQueryInLabel } from './highlightQueryInLabel';
import { render, screen } from '@testing-library/react';

describe('highlightQueryInLabel', () => {
  it('highlights nothing if query not found', () => {
    const highlighted = highlightQueryInLabel('label', 'not found');
    expect(highlighted).toBe('label');
  });

  it('highlights query with a <b /> if found', () => {
    const highlighted = highlightQueryInLabel('found items', 'found');

    render(highlighted);

    const found = screen.getByText('found');

    expect(found).toBeInTheDocument();
    expect(found.tagName).toBe('B');
  });

  it('highlights query with custom tag name', () => {
    const highlighted = highlightQueryInLabel('found items', 'found', 'mark');

    render(highlighted);

    const found = screen.getByText('found');

    expect(found).toBeInTheDocument();
    expect(found.tagName).toBe('MARK');
  });
});
