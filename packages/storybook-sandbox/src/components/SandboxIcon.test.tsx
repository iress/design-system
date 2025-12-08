import React from 'react';
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SandboxIcon } from './SandboxIcon';
import { ADDON_ICON } from '../constants';

describe('SandboxIcon', () => {
  it('renders icon span with correct class and content', () => {
    const { container } = render(<SandboxIcon />);

    const iconSpan = container.querySelector('.material-symbols-outlined');
    expect(iconSpan).toBeTruthy();
    expect(iconSpan?.textContent).toBe(ADDON_ICON);
    expect(iconSpan?.getAttribute('aria-hidden')).toBe('true');
  });

  it('applies correct inline styles to icon', () => {
    const { container } = render(<SandboxIcon />);

    const iconSpan = container.querySelector('.material-symbols-outlined');
    expect(iconSpan?.getAttribute('style')).toContain('font-size: 1.4em');
  });

  it('adds Google Fonts link to document head', () => {
    render(<SandboxIcon />);

    const fontLink = document.head.querySelector(
      'link[href*="fonts.googleapis.com"]',
    );
    expect(fontLink).toBeTruthy();
    expect(fontLink?.getAttribute('rel')).toBe('stylesheet');
    expect(fontLink?.getAttribute('href')).toContain(
      'Material+Symbols+Outlined',
    );
  });

  it('adds font variation styles to document head', () => {
    render(<SandboxIcon />);

    const styleElement = document.head.querySelector('style');
    expect(styleElement).toBeTruthy();
    expect(styleElement?.textContent).toContain('.material-symbols-outlined');
    expect(styleElement?.textContent).toContain('font-variation-settings');
  });
});
