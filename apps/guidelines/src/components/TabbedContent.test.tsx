import { act, fireEvent, render, screen } from '@testing-library/react';
import { TabbedContent } from './TabbedContent';
import { navigateToSection } from '../sectionLinks';

const { scrollToSection } = vi.hoisted(() => ({ scrollToSection: vi.fn() }));

vi.mock('../sectionLinks', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../sectionLinks')>()),
  scrollToSection,
}));

vi.mock('@iress-oss/ids-components', () => ({
  IressTabSet: ({
    children,
    selected,
    onChange,
  }: {
    children: React.ReactElement<{ label: string }>[];
    selected?: number;
    onChange?: (e: { index: number }) => void;
  }) => (
    <div role="tablist">
      {children.map((child, index) => (
        <button
          key={child.props.label}
          role="tab"
          aria-selected={selected === index}
          onClick={() => onChange?.({ index })}
        >
          {child.props.label}
        </button>
      ))}
    </div>
  ),
  IressTab: () => null,
  IressButton: () => null,
  IressIcon: () => null,
}));

function Page() {
  return (
    <TabbedContent>
      <h2>Design</h2>
      <h4 id="avoid-using-disabled">Avoid using disabled</h4>
      <h2>Develop</h2>
      <h4 id="loading">Loading</h4>
    </TabbedContent>
  );
}

async function flushFrames() {
  await act(async () => {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  });
}

describe('TabbedContent', () => {
  beforeEach(() => {
    scrollToSection.mockClear();
  });

  afterEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('shows the tab from the URL', () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    render(<Page />);

    expect(screen.getByRole('tab', { name: 'Develop' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Loading')).toBeVisible();
    expect(screen.getByText('Avoid using disabled')).not.toBeVisible();
  });

  it('opens the tab containing the section from the URL and scrolls to it', async () => {
    window.history.replaceState(
      null,
      '',
      '/#/components/button?tab=develop&section=avoid-using-disabled',
    );
    render(<Page />);
    await flushFrames();

    expect(screen.getByRole('tab', { name: 'Design' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Avoid using disabled')).toBeVisible();
    expect(scrollToSection).toHaveBeenCalledWith('avoid-using-disabled');
  });

  it('switches tab and scrolls for same-page section links', async () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    render(<Page />);
    await flushFrames();
    expect(scrollToSection).not.toHaveBeenCalled();

    act(() => navigateToSection('avoid-using-disabled'));
    await flushFrames();

    expect(screen.getByRole('tab', { name: 'Design' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByText('Avoid using disabled')).toBeVisible();
    expect(scrollToSection).toHaveBeenCalledWith('avoid-using-disabled');
  });

  it('scrolls again when the same section link is clicked twice', async () => {
    window.history.replaceState(null, '', '/#/components/button');
    render(<Page />);

    act(() => navigateToSection('loading'));
    await flushFrames();
    act(() => navigateToSection('loading'));
    await flushFrames();

    expect(scrollToSection).toHaveBeenCalledTimes(2);
  });

  it('does not scroll back to a section after the user changes tab', async () => {
    window.history.replaceState(
      null,
      '',
      '/#/components/button?section=loading',
    );
    render(<Page />);
    await flushFrames();
    expect(scrollToSection).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('tab', { name: 'Design' }));
    await flushFrames();

    expect(scrollToSection).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe('#/components/button?tab=design');
  });

  it('ignores sections that are not on the page', async () => {
    window.history.replaceState(null, '', '/#/components/button?tab=develop');
    render(<Page />);

    act(() => navigateToSection('missing'));
    await flushFrames();

    expect(screen.getByRole('tab', { name: 'Develop' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(scrollToSection).not.toHaveBeenCalled();
  });

  it('scrolls to sections on pages without tabs', async () => {
    window.history.replaceState(
      null,
      '',
      '/#/foundations/principles?section=consistency',
    );
    render(
      <TabbedContent>
        <h2 id="consistency">Consistency</h2>
      </TabbedContent>,
    );
    await flushFrames();

    expect(scrollToSection).toHaveBeenCalledWith('consistency');
  });
});
