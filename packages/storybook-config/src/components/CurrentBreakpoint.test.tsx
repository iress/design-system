import { type BreakpointDetail } from '@iress-oss/ids-components';
import { CurrentBreakpoint } from './CurrentBreakpoint';
import { render, screen } from '@testing-library/react';

const breakpoint = 'xl' as const;
const breakpointDetail: BreakpointDetail = {
  mediaQuery: '(min-width: 1200px) and (max-width: 1499px)',
  screenWidthRange: '1200px - 1499px',
  minScreenWidth: '1200px',
  maxScreenWidth: '1499px',
  containerMaxWidth: '1160px',
  viewportWidth: 1366,
};

vi.mock('@iress-oss/ids-components', async () => {
  const original = await vi.importActual('@iress-oss/ids-components');
  return {
    ...original,
    useBreakpoint: () => ({
      breakpoint,
      detail: breakpointDetail,
    }),
  };
});

describe('CurrentBreakpoint', () => {
  it('renders the current breakpoint in detail', () => {
    render(<CurrentBreakpoint />);

    // The xl part is wrapped in a <strong> tag
    const content = screen.getByText('xl').parentElement?.textContent;

    expect(content).toBe(
      `${breakpoint} breakpoint (${breakpointDetail.screenWidthRange})`,
    );
  });

  it('renders a custom label', () => {
    render(
      <CurrentBreakpoint
        renderLabel={({ breakpoint }) => <>Hello there: {breakpoint}</>}
      />,
    );

    expect(screen.getByText('Hello there: xl')).toBeInTheDocument();
  });

  it('renders a max-width view', () => {
    render(<CurrentBreakpoint renderLabel="max-width" />);

    // The xl part is wrapped in a <strong> tag
    const content = screen.getByText('xl').parentElement?.textContent;

    expect(content).toBe(
      `${breakpoint} (${breakpointDetail.maxScreenWidth} and above)`,
    );
  });

  it('renders a container label', () => {
    render(<CurrentBreakpoint renderLabel="container" />);

    const containerDetails = screen.getByText(
      `Max width: ${breakpointDetail.containerMaxWidth}`,
    );
    expect(containerDetails).toBeInTheDocument();
  });

  it('renders a container-fluid label', () => {
    render(<CurrentBreakpoint renderLabel="container-fluid" />);

    const containerDetails = screen.getByText(`Max width: 100%`);
    expect(containerDetails).toBeInTheDocument();
  });
});
