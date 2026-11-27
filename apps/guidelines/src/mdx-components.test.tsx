import { createElement } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MdxLink, stripLeadingEmoji } from './mdx-components';
import { SECTION_EVENT } from './sectionLinks';

vi.mock('@tanstack/react-router', () => ({
  Link: ({
    to,
    search,
    children,
  }: {
    to: string;
    search?: Record<string, string>;
    children: React.ReactNode;
  }) => (
    <a data-to={to} data-search={search ? JSON.stringify(search) : ''}>
      {children}
    </a>
  ),
}));

describe('stripLeadingEmoji', () => {
  it('returns null when children is empty', () => {
    expect(stripLeadingEmoji([])).toBeNull();
  });

  it('returns null when no ⚠️ prefix is found', () => {
    expect(stripLeadingEmoji('Hello world')).toBeNull();
  });

  it('strips ⚠️ from a direct string child', () => {
    const result = stripLeadingEmoji('⚠️ Warning message');
    expect(result).toEqual(['Warning message']);
  });

  it('strips ⚠️ with extra whitespace', () => {
    const result = stripLeadingEmoji('  ⚠️  Important note');
    expect(result).toEqual(['Important note']);
  });

  it('strips ⚠️ from text inside a <p> element', () => {
    const children = createElement('p', null, '⚠️ Nested warning');
    const result = stripLeadingEmoji(children);
    expect(result).not.toBeNull();
    // The result should be a new <p> with the emoji stripped
    const arr = result as React.ReactElement[];
    expect(
      (arr[0] as React.ReactElement<{ children: unknown }>).props.children,
    ).toEqual(['Nested warning']);
  });

  it('strips ⚠️ from text inside nested elements', () => {
    const children = createElement(
      'p',
      null,
      createElement('strong', null, '⚠️ Deep warning'),
    );
    const result = stripLeadingEmoji(children);
    expect(result).not.toBeNull();
  });

  it('skips whitespace-only text nodes before the emoji', () => {
    const children = ['\n', '⚠️ After whitespace'];
    const result = stripLeadingEmoji(children);
    expect(result).not.toBeNull();
    expect(result).toContain('After whitespace');
  });

  it('returns null when first meaningful child is not a string with emoji', () => {
    const children = createElement('div', null, 'No emoji here');
    const result = stripLeadingEmoji(children);
    expect(result).toBeNull();
  });
});

describe('MdxLink', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
  });

  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('keeps same-page heading links on the current route', () => {
    render(<MdxLink href="#avoid-using-disabled">Avoid</MdxLink>);
    const link = screen.getByRole('link', { name: 'Avoid' });

    expect(link).toHaveAttribute(
      'href',
      '#/components/button?section=avoid-using-disabled',
    );
    expect(link).not.toHaveAttribute('target');
  });

  it('navigates to the section without changing route on click', () => {
    const listener = vi.fn();
    window.addEventListener(SECTION_EVENT, listener);
    render(<MdxLink href="#avoid-using-disabled">Avoid</MdxLink>);

    fireEvent.click(screen.getByRole('link', { name: 'Avoid' }));

    expect(window.location.hash).toBe(
      '#/components/button?section=avoid-using-disabled',
    );
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(SECTION_EVENT, listener);
  });

  it('passes the heading of internal links as a section search param', () => {
    render(
      <MdxLink href="/components/button#avoid-using-disabled">Button</MdxLink>,
    );
    const link = screen.getByText('Button');

    expect(link).toHaveAttribute('data-to', '/components/button');
    expect(link).toHaveAttribute(
      'data-search',
      JSON.stringify({ section: 'avoid-using-disabled' }),
    );
  });

  it('does not add a search param to internal links without a heading', () => {
    render(<MdxLink href="/components/button">Button</MdxLink>);
    const link = screen.getByText('Button');

    expect(link).toHaveAttribute('data-to', '/components/button');
    expect(link).toHaveAttribute('data-search', '');
  });

  it('opens external links in a new tab', () => {
    render(<MdxLink href="https://example.com">External</MdxLink>);
    const link = screen.getByRole('link', { name: 'External' });

    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
