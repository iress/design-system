import '@testing-library/jest-dom/vitest';
import userEvent from '@testing-library/user-event';
import { cleanup } from '@testing-library/react';
import { type ComponentProps, type CSSProperties, forwardRef } from 'react';
import { type StorybookTheme } from 'storybook/internal/theming';

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

interface StylesProps {
  theme: DeepPartial<StorybookTheme>;
}

// Mock Storybook theming to avoid theme context issues in tests
vi.mock('storybook/theming', () => ({
  styled: {
    div: (styles: CSSProperties | ((props: StylesProps) => CSSProperties)) => {
      return forwardRef<HTMLDivElement, ComponentProps<'div'>>((props, ref) => {
        const computedStyles =
          typeof styles === 'function'
            ? styles({
                theme: {
                  background: { app: 'white' },
                  typography: { fonts: { base: 'Inter, sans-serif' } },
                  color: { light: '#6D7278' },
                },
              })
            : styles;

        return <div {...props} ref={ref} style={computedStyles} />;
      });
    },
  },
}));

beforeEach(() => {
  userEvent.setup();
});

afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
