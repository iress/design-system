import { createElement } from 'react';
import { stripLeadingEmoji } from './mdx-components';

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
    expect(arr[0].props.children).toEqual(['Nested warning']);
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
