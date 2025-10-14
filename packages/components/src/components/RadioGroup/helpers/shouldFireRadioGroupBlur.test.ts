import { describe, it, expect } from 'vitest';
import { shouldFireRadioGroupBlur } from '../RadioGroup';

// Helper to create a mock HTMLElement with minimal API for contains
function createElementWithChildren(children: HTMLElement[] = []): HTMLElement {
  const el = document.createElement('div');
  children.forEach((c) => el.appendChild(c));
  return el;
}

describe('shouldFireRadioGroupBlur', () => {
  it('returns false when new focus target is inside radio group', () => {
    const child = document.createElement('button');
    const group = createElementWithChildren([child]);
    expect(shouldFireRadioGroupBlur(group, child, child)).toBe(false);
  });

  it('returns true when focus moves outside the group', () => {
    const child = document.createElement('button');
    const outside = document.createElement('button');
    const group = createElementWithChildren([child]);
    expect(shouldFireRadioGroupBlur(group, outside, child)).toBe(true);
  });

  it('returns true when relatedTarget is null and event target is the group element', () => {
    const group = createElementWithChildren();
    expect(shouldFireRadioGroupBlur(group, null, group)).toBe(true);
  });

  it('returns false when relatedTarget is null and event target is NOT the group element', () => {
    const group = createElementWithChildren();
    const other = document.createElement('div');
    expect(shouldFireRadioGroupBlur(group, null, other)).toBe(false);
  });

  it('returns true when group element is null (defensive fallback)', () => {
    const outside = document.createElement('div');
    expect(shouldFireRadioGroupBlur(null, outside, outside)).toBe(true);
  });
});
