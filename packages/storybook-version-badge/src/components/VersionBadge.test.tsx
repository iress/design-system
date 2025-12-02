import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { VersionBadge } from './VersionBadge';
import { ThemeProvider } from 'storybook/theming';

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
  describe('version handling', () => {
    it('renders with default version when no version provided', () => {
      renderWithTheme(<VersionBadge />);

      expect(screen.getByText('0.0.0')).toBeInTheDocument();
    });

    it('renders with string version', () => {
      renderWithTheme(<VersionBadge version="1.2.3" />);

      expect(screen.getByText('1.2.3')).toBeInTheDocument();
    });

    it('renders with function version that returns string', async () => {
      const versionFunction = vi.fn(() => '2.0.0');
      renderWithTheme(<VersionBadge version={versionFunction} />);

      await waitFor(() => {
        expect(screen.getByText('2.0.0')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('renders with async function version', async () => {
      const versionFunction = vi.fn(async () => '3.0.0-beta');
      renderWithTheme(<VersionBadge version={versionFunction} />);

      await waitFor(() => {
        expect(screen.getByText('3.0.0-beta')).toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render when version function returns empty string', async () => {
      const versionFunction = vi.fn(() => '');
      renderWithTheme(<VersionBadge version={versionFunction} />);

      await waitFor(() => {
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
      });

      expect(versionFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render when version is empty string', () => {
      renderWithTheme(<VersionBadge version="" />);

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('environment handling', () => {
    it('renders without environment badge when no environment provided', () => {
      renderWithTheme(<VersionBadge version="1.0.0" />);

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      // Check that there's only the version text, no environment text
      expect(screen.queryByText('production')).not.toBeInTheDocument();
      expect(screen.queryByText('staging')).not.toBeInTheDocument();
    });

    it('renders with string environment', () => {
      renderWithTheme(
        <VersionBadge version="1.0.0" environment="production" />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('production')).toBeInTheDocument();
    });

    it('renders with function environment that returns string', async () => {
      const environmentFunction = vi.fn(() => 'staging');
      renderWithTheme(
        <VersionBadge version="1.0.0" environment={environmentFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('staging')).toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('renders with async function environment', async () => {
      const environmentFunction = vi.fn(async () => 'development');
      renderWithTheme(
        <VersionBadge version="1.0.0" environment={environmentFunction} />,
      );

      await waitFor(() => {
        expect(screen.getByText('development')).toBeInTheDocument();
      });

      expect(environmentFunction).toHaveBeenCalledTimes(1);
    });

    it('does not render environment badge when environment function returns empty string', async () => {
      const environmentFunction = vi.fn(() => '');
      renderWithTheme(
        <VersionBadge version="1.0.0" environment={environmentFunction} />,
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
      renderWithTheme(<VersionBadge version="1.0.0" environment="" />);

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
        <VersionBadge version="1.0.0" environment="production" />,
      );

      expect(screen.getByText('1.0.0')).toBeInTheDocument();
      expect(screen.getByText('production')).toBeInTheDocument();
    });

    it('renders both version and environment with async functions', async () => {
      const versionFunction = vi.fn(async () => '2.1.0');
      const environmentFunction = vi.fn(async () => 'staging');

      renderWithTheme(
        <VersionBadge
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
        <VersionBadge version="1.5.0" environment={environmentFunction} />,
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
      renderWithTheme(<VersionBadge version="1.0.0" />);

      const container = document.querySelector('.version-badge');
      expect(container).toBeInTheDocument();
    });

    it('renders badge component with correct content', () => {
      renderWithTheme(<VersionBadge version="1.0.0" />);

      // Check that the badge is rendered with the correct version
      expect(screen.getByText('1.0.0')).toBeInTheDocument();
    });

    it('renders environment badge with correct styling when environment provided', () => {
      renderWithTheme(<VersionBadge version="1.0.0" environment="test" />);

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
        <VersionBadge version={versionFunction1} />,
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
          <VersionBadge version={versionFunction2} />
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
        <VersionBadge version="1.0.0" environment={environmentFunction1} />,
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
          <VersionBadge version="1.0.0" environment={environmentFunction2} />
        </ThemeProvider>,
      );

      await waitFor(() => {
        expect(screen.getByText('prod')).toBeInTheDocument();
      });

      expect(environmentFunction1).toHaveBeenCalledTimes(1);
      expect(environmentFunction2).toHaveBeenCalledTimes(1);
    });
  });
});
