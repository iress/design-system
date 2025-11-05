// TODO: Probably needs end-to-end testing
import { type ComponentProps, type ReactNode, type MouseEvent } from 'react';
import { SandboxShare } from './SandboxShare';
import { render, screen } from '@testing-library/react';
import {
  type WithTooltip,
  type IconButton,
  type TooltipLinkList,
} from 'storybook/internal/components';
import userEvent from '@testing-library/user-event';

// We mock the storybook/internal/components package to avoid rendering the actual components,
// as we are not testing the components themselves (and there's some magic going on with their Styled Components)
const iconButtonProps = vi.fn();
const withTooltipProps = vi.fn();
const tooltipLinkListProps = vi.fn();
vi.mock('storybook/internal/components', async (importOriginal) => ({
  ...(await importOriginal<typeof import('storybook/internal/components')>()),
  IconButton: (props: ComponentProps<typeof IconButton>) => {
    iconButtonProps(props);
    return <button onClick={props.onClick}>{props.children}</button>;
  },
  // eslint-disable-next-line sonarjs/function-return-type -- returns a ReactNode
  WithTooltip: (props: ComponentProps<typeof WithTooltip>) => {
    withTooltipProps(props);
    return props.children;
  },
  TooltipLinkList: (props: ComponentProps<typeof TooltipLinkList>) => {
    tooltipLinkListProps(props);
    return props.links.map((link) => {
      if (Array.isArray(link)) {
        return link.map((sublink) => (
          <button
            key={sublink.id}
            onClick={(e) => {
              if ('onClick' in sublink) {
                sublink.onClick?.(e, sublink);
              }
            }}
          >
            {'title' in sublink && sublink.title}
          </button>
        ));
      }

      return (
        <button
          key={link.id}
          onClick={(e) => {
            if ('onClick' in link) {
              link.onClick?.(e, link);
            }
          }}
        >
          {'title' in link && link.title}
        </button>
      );
    });
  },
}));

describe('SandboxShare', () => {
  it('renders a share button with a tooltip menu', () => {
    render(<SandboxShare state={{ code: '' }} />);

    const button = screen.getByRole('button', { name: 'share' });
    expect(button).toBeInTheDocument();

    expect(withTooltipProps).toHaveBeenCalled();
  });

  it('copies the preview url when the button is clicked', async () => {
    // Render the component
    render(<SandboxShare state={{ code: '' }} />);

    // Simulate the opening of the tooltip by rendering it
    const lastCall = withTooltipProps.mock.lastCall?.[0] as ComponentProps<
      typeof WithTooltip
    >;
    render(lastCall.tooltip as ReactNode);

    const copyPreviewButton = screen.getByRole('button', {
      name: 'Share preview only',
    });
    expect(copyPreviewButton).toBeInTheDocument();

    // Simulate clicking on the preview button, which causes a re-render of the tooltip
    await userEvent.click(copyPreviewButton);
    const newLastCall = withTooltipProps.mock.lastCall?.[0] as ComponentProps<
      typeof WithTooltip
    >;
    render(newLastCall.tooltip as ReactNode);

    const copied = screen.getByRole('button', { name: 'Copied!' });
    expect(copied).toBeInTheDocument();

    // Check that the URL was copied to the clipboard
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe(
      'http://localhost:3000/iframe.html?viewMode=story&IDS_Sandbox=N4Igxg9gJgpiBcIQF8g',
    );
  });

  it('copies the preview and code url when the button is clicked', async () => {
    // Render the component
    render(<SandboxShare state={{ code: '' }} />);

    // Simulate the opening of the tooltip by rendering it
    const lastCall = withTooltipProps.mock.lastCall?.[0] as ComponentProps<
      typeof WithTooltip
    >;
    render(lastCall.tooltip as ReactNode);

    const copyPreviewButton = screen.getByRole('button', {
      name: 'Share preview and code',
    });
    expect(copyPreviewButton).toBeInTheDocument();

    // Simulate clicking on the preview button, which causes a re-render of the tooltip
    await userEvent.click(copyPreviewButton);
    const newLastCall = withTooltipProps.mock.lastCall?.[0] as ComponentProps<
      typeof WithTooltip
    >;
    render(newLastCall.tooltip as ReactNode);

    const copied = screen.getByRole('button', { name: 'Copied!' });
    expect(copied).toBeInTheDocument();

    // Check that the URL was copied to the clipboard
    const clipboardText = await navigator.clipboard.readText();
    expect(clipboardText).toBe(
      'http://localhost:3000/?IDS_Sandbox=N4Igxg9gJgpiBcIQF8g',
    );
  });
});
