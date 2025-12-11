import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { VersionBadge } from './VersionBadge';
import { ThemeProvider } from 'storybook/theming';
import type { API } from 'storybook/manager-api';

// Mock API for testing
const createMockApi = (
  urlState?: { path: string; viewMode: string },
  refs?: Record<string, { id: string }>,
): Partial<API> => ({
  getUrlState: vi.fn(() => urlState) as never,
  getRefs: vi.fn(() => refs ?? {}) as never,
});

// Test wrapper with ThemeProvider - similar to VersionBadge.stories.tsx
const renderWithTheme = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider
      theme={{
        textMutedColor: '#6f6f6f',
        typography: {
          size: {
            s1: 12,
          } as never,
          weight: {
            bold: 600,
          } as never,
        } as never,
      }}
    >
      {ui}
    </ThemeProvider>,
  );
};

describe('VersionBadge', () => {
  const mockApi = createMockApi() as API;

  describe('version handling', () => {
    it('does not render when no version provided', () => {
      renderWithTheme(<VersionBadge api={mockApi} />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('renders with string version', () => {
      renderWithTheme(<VersionBadge api={mockApi} version="1.2.3" />);

      expect(screen.getByText('1.2.3')).toBeInTheDocument();
    });

    it('renders with function version that returns string', async () => {
      const versionFunction = vi.fn(() => '2.0.0');
      renderWithTheme(<VersionBadge api={mockApi} version={versionFunction} />);

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('renders with async function version', async () => {
      const versionFunction = vi.fn(async () => '3.0.0-beta');
      renderWithTheme(<VersionBadge api={mockApi} version={versionFunction} />);

      await waitFor(() => {
        expect(screen.getByText('3.0.0-beta')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render when version function returns empty string', async () => {
      const versionFunction = vi.fn(() => '');
      renderWithTheme(<VersionBadge api={mockApi} version={versionFunction} />);

      await waitFor(() => {
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render when version is empty string', () => {
      renderWithTheme(<VersionBadge api={mockApi} version="" />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('environment handling', () => {
    it('renders without environment badge when no environment provided', () => {
      renderWithTheme(<VersionBadge api={mockApi} version="1.0.0" />);

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      // Check that there's only the version text, no environment text
      expect(screen.queryByText('production')).not.toBeInTheDocument();
      expect(screen.queryByText('staging')).not.toBeInTheDocument();
    });

    it('renders with string environment', () => {
      renderWithTheme(
        <VersionBadge api={mockApi} version="1.0.0" environment="production" />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('production')).toBeInTheDocument();
    });

    it('renders with function environment that returns string', async () => {
      const environmentFunction = vi.fn(() => 'staging');
      renderWithTheme(
        <VersionBadge
          api={mockApi}
          version="1.0.0"
          environment={environmentFunction}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('staging')).toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('renders with async function environment', async () => {
      const environmentFunction = vi.fn(async () => 'development');
      renderWithTheme(
        <VersionBadge
          api={mockApi}
          version="1.0.0"
          environment={environmentFunction}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('development')).toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render environment badge when environment function returns empty string', async () => {
      const environmentFunction = vi.fn(() => '');
      renderWithTheme(
        <VersionBadge
          api={mockApi}
          version="1.0.0"
          environment={environmentFunction}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('1.0.0')).toBeInTheDocument();
        // Check that there's no common environment text rendered
        expect(screen.queryByText('production')).not.toBeInTheDocument();
        expect(screen.queryByText('staging')).not.toBeInTheDocument();
        expect(screen.queryByText('development')).not.toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render environment badge when environment is empty string', () => {
      renderWithTheme(
        <VersionBadge api={mockApi} version="1.0.0" environment="" />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      // Check that there's no common environment text rendered
      expect(screen.queryByText('production')).not.toBeInTheDocument();
      expect(screen.queryByText('staging')).not.toBeInTheDocument();
      expect(screen.queryByText('development')).not.toBeInTheDocument();
    });
  });

  describe('combined version and environment', () => {
    it('renders both version and environment when provided', () => {
      renderWithTheme(
        <VersionBadge api={mockApi} version="1.0.0" environment="production" />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('production')).toBeInTheDocument();
    });

    it('renders both version and environment with async functions', async () => {
      const versionFunction = vi.fn(async () => '2.1.0');
      const environmentFunction = vi.fn(async () => 'staging');

      renderWithTheme(
        <VersionBadge
          api={mockApi}
          version={versionFunction}
          environment={environmentFunction}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('2.1.0')).toBeInTheDocument();
        expect(screen.getByText('staging')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('handles mixed sync and async props', async () => {
      const environmentFunction = vi.fn(async () => 'qa');

      renderWithTheme(
        <VersionBadge
          api={mockApi}
          version="1.5.0"
          environment={environmentFunction}
        />,
      );

      expect(screen.getByText('1.5.0')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('qa')).toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('component structure', () => {
    it('renders with correct CSS class', () => {
      renderWithTheme(<VersionBadge api={mockApi} version="1.0.0" />);

      const container = document.querySelector('.version-badge');
      expect(container).toBeInTheDocument();
    });

    it('renders badge component with correct content', () => {
      renderWithTheme(<VersionBadge api={mockApi} version="1.0.0" />);

      // Check that the badge is rendered with the correct version
      expect(screen.getByText('1.0.0')).toBeInTheDocument();
    });

    it('renders environment badge with correct styling when environment provided', () => {
      renderWithTheme(
        <VersionBadge api={mockApi} version="1.0.0" environment="test" />,
      );

      // Check that both version and environment are rendered
      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });

  describe('edge cases and prop changes', () => {
    it('re-fetches when version prop changes', async () => {
      const versionFunction1 = vi.fn(() => '1.0.0');
      const versionFunction2 = vi.fn(() => '2.0.0');

      const { rerender } = renderWithTheme(
        <VersionBadge api={mockApi} version={versionFunction1} />,
      );

      await waitFor(() => {
        expect(screen.getByText('1.0.0')).toBeInTheDocument();
      });

      rerender(
        <ThemeProvider
          theme={{
            textMutedColor: '#6f6f6f',
            typography: {
              size: {
                s1: 12,
              } as never,
              weight: {
                bold: 600,
              } as never,
            } as never,
          }}
        >
          <VersionBadge api={mockApi} version={versionFunction2} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });

      expect(versionFunction1).toHaveBeenCalledTimes(1);
      expect(versionFunction2).toHaveBeenCalledTimes(1);
    });

    it('re-fetches when environment prop changes', async () => {
      const environmentFunction1 = vi.fn(() => 'dev');
      const environmentFunction2 = vi.fn(() => 'prod');

      const { rerender } = renderWithTheme(
        <VersionBadge
          api={mockApi}
          version="1.0.0"
          environment={environmentFunction1}
        />,
      );

      await waitFor(() => {
        expect(screen.getByText('dev')).toBeInTheDocument();
      });

      rerender(
        <ThemeProvider
          theme={{
            textMutedColor: '#6f6f6f',
            typography: {
              size: {
                s1: 12,
              } as never,
              weight: {
                bold: 600,
              } as never,
            } as never,
          }}
        >
          <VersionBadge
            api={mockApi}
            version="1.0.0"
            environment={environmentFunction2}
          />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('prod')).toBeInTheDocument();
      });

      expect(environmentFunction1).toHaveBeenCalledTimes(1);
      expect(environmentFunction2).toHaveBeenCalledTimes(1);
    });
  });

  describe('API integration and ref handling', () => {
    it('passes undefined ref when URL state is not available', async () => {
      const versionFunction = vi.fn(() => '1.0.0');
      const apiWithoutUrlState = createMockApi(undefined, {}) as API;

      renderWithTheme(
        <VersionBadge api={apiWithoutUrlState} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(versionFunction).toHaveBeenCalledWith(undefined);
      });
    });

    it('passes undefined ref when no matching ref is found', async () => {
      const versionFunction = vi.fn(() => '1.0.0');
      const apiWithNonMatchingRef = createMockApi(
        { path: '/docs/some-story', viewMode: 'docs' },
        { otherRef: { id: 'other' } },
      ) as API;

      renderWithTheme(
        <VersionBadge api={apiWithNonMatchingRef} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(versionFunction).toHaveBeenCalledWith(undefined);
      });
    });

    it('extracts and passes current ref ID when path matches a ref', async () => {
      const versionFunction = vi.fn((ref?: string) =>
        ref === 'my-ref' ? '2.0.0' : '1.0.0',
      );
      const apiWithMatchingRef = createMockApi(
        { path: '/docs/my-ref_some-story', viewMode: 'docs' },
        { myRef: { id: 'my-ref' } },
      ) as API;

      renderWithTheme(
        <VersionBadge api={apiWithMatchingRef} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledWith('my-ref');
    });

    it('handles multiple refs and matches the correct one', async () => {
      const versionFunction = vi.fn((ref?: string) => {
        if (ref === 'ref-a') return '1.0.0';
        if (ref === 'ref-b') return '2.0.0';
        return '0.0.0';
      });

      const apiWithMultipleRefs = createMockApi(
        { path: '/story/ref-b_some-component', viewMode: 'story' },
        {
          refA: { id: 'ref-a' },
          refB: { id: 'ref-b' },
          refC: { id: 'ref-c' },
        },
      ) as API;

      renderWithTheme(
        <VersionBadge api={apiWithMultipleRefs} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledWith('ref-b');
    });

    it('updates version when ref changes via navigation', async () => {
      const versionFunction = vi.fn((ref?: string) => {
        if (ref === 'ref-a') return '1.0.0';
        if (ref === 'ref-b') return '2.0.0';
        return '0.0.0';
      });

      const refs = {
        refA: { id: 'ref-a' },
        refB: { id: 'ref-b' },
      };

      const apiRefA = createMockApi(
        { path: '/docs/ref-a_story', viewMode: 'docs' },
        refs,
      ) as API;

      const { rerender } = renderWithTheme(
        <VersionBadge api={apiRefA} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('1.0.0')).toBeInTheDocument();
      });

      // Simulate navigation to different ref
      const apiRefB = createMockApi(
        { path: '/docs/ref-b_story', viewMode: 'docs' },
        refs,
      ) as API;

      rerender(
        <ThemeProvider
          theme={{
            textMutedColor: '#6f6f6f',
            typography: {
              size: {
                s1: 12,
              } as never,
              weight: {
                bold: 600,
              } as never,
            } as never,
          }}
        >
          <VersionBadge api={apiRefB} version={versionFunction} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });
    });

    it('handles async version function with ref parameter', async () => {
      const versionFunction = vi.fn(async (ref?: string) => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return ref === 'my-ref' ? '3.0.0-async' : '1.0.0-async';
      });

      const apiWithRef = createMockApi(
        { path: '/story/my-ref_component', viewMode: 'story' },
        { myRef: { id: 'my-ref' } },
      ) as API;

      renderWithTheme(
        <VersionBadge api={apiWithRef} version={versionFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('3.0.0-async')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledWith('my-ref');
    });
  });
});
