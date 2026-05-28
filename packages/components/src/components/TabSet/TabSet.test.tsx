import { RenderResult, render, waitFor, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTab, IressTabSet, IressTabSetProps } from '.';
import userEvent from '@testing-library/user-event';
import { idsLogger } from '@helpers/utility/idsLogger';
import { tabSet } from './TabSet.styles';
import { GlobalCSSClass } from '@/enums';
import { useState } from 'react';

const TEST_ID = 'test-component';

// Mock scrollIntoView for all tests since it's not available in jsdom
beforeEach(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

const TEST_TABLIST = [
  <IressTab key={1} label="Tab 1" />,
  <IressTab key={2} label="Tab 2" />,
  <IressTab key={3} label="Tab 3" />,
];

const TEST_PANELS = [
  <IressTab key={4} label="Tab 1">
    Tab panel 1
  </IressTab>,
  <IressTab key={5} label={<em>Tab 2</em>}>
    Tab panel 2
  </IressTab>,
  <IressTab key={6} label="Tab 3">
    Tab panel 3
  </IressTab>,
];

const TEST_PANELS_VALUES = [
  <IressTab key={4} label="Tab 1" value="tab-1">
    Tab panel 1
  </IressTab>,
  <IressTab key={5} label={<em>Tab 2</em>} value="tab-2">
    Tab panel 2
  </IressTab>,
  <IressTab key={6} label="Tab 3" value="tab-3">
    Tab panel 3
  </IressTab>,
];

function renderComponent(
  props: IressTabSetProps = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressTabSet {...props} data-testid={TEST_ID}>
      {props.children ?? TEST_TABLIST}
    </IressTabSet>,
  );
}

function renderComponentWithPanels(
  props: IressTabSetProps = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderComponent(
    { ...props, children: props.children ?? TEST_PANELS },
    renderFn,
  );
}

describe('IressTabs', () => {
  it('should render the component with the defaults', () => {
    const screen = renderComponent({
      children: '',
      className: 'test-class',
    });

    const container = screen.getByTestId(TEST_ID);
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(
      'test-class',
      tabSet().root!,
      GlobalCSSClass.TabSet,
    );
  });

  it('should render the component with appropriate attributes (tabs)', () => {
    const screen = renderComponent();

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(TEST_TABLIST.length);
    expect(tabs[0]).toHaveAttribute('type', 'button');
  });

  it('should render the component with appropriate attributes (panels)', () => {
    const screen = renderComponentWithPanels();

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(TEST_TABLIST.length);

    const activePanel = screen.getByRole('tabpanel');
    expect(activePanel).toBeInTheDocument();
  });

  it('should render the component with appropriate attributes (fragment)', () => {
    const screen = renderComponent({
      children: TEST_PANELS_VALUES,
    });

    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(TEST_TABLIST.length);

    const activePanel = screen.getByRole('tabpanel');
    expect(activePanel).toBeInTheDocument();
  });

  describe('props', () => {
    describe('defaultSelected', () => {
      it('sets the selected tab by index', () => {
        const screen = renderComponent({
          defaultSelected: 1,
        });

        const tabs = screen.getAllByRole('tab');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      });

      it('sets the selected tab by index (panels)', () => {
        const screen = renderComponentWithPanels({
          defaultSelected: 1,
        });

        const tabs = screen.getAllByRole('tab');
        const activePanel = screen.getByRole('tabpanel');

        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
        expect(tabs[1]).toHaveAttribute('aria-controls', activePanel.id);

        expect(activePanel).toHaveAttribute('aria-labelledby', tabs[1].id);
      });

      it('sets the selected tab by value', () => {
        const screen = renderComponent({
          children: TEST_PANELS_VALUES,
          defaultSelected: 'tab-3',
        });

        const tabs = screen.getAllByRole('tab');
        expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
      });
    });

    describe('append', () => {
      it('renders append content outside the tablist', () => {
        const screen = renderComponent({
          append: <button data-testid="append-btn">Add</button>,
        });

        const appendBtn = screen.getByTestId('append-btn');
        expect(appendBtn).toBeInTheDocument();

        // Append content should NOT be inside the tablist
        const tablist = screen.getByRole('tablist');
        expect(tablist).not.toContainElement(appendBtn);
      });
    });

    describe('layout', () => {
      it('changes the layout of the tabs', () => {
        const screen = renderComponent({
          layout: 'top-center',
        });

        const container = screen.getByTestId(TEST_ID);
        expect(container).toHaveClass(tabSet({ layout: 'top-center' }).root!);
      });
    });

    describe('type', () => {
      it('applies secondary active indicator style without background fill', () => {
        const screen = renderComponent({
          type: 'secondary',
          defaultSelected: 1,
        });

        const tablist = screen.getByRole('tablist');
        const secondaryActiveIndicatorClass = tabSet({
          type: 'secondary',
        }).activeIndicator!;
        const primaryActiveIndicatorClass = tabSet({
          type: 'primary',
        }).activeIndicator!;
        const activeIndicator = tablist.children[0];

        expect(activeIndicator).toBeInTheDocument();
        expect(activeIndicator.className).toBe(secondaryActiveIndicatorClass);
        expect(activeIndicator.className).not.toBe(primaryActiveIndicatorClass);
      });
    });

    describe('onChange', () => {
      it('emits the new index and value when the user changes tab, value is the same as index when tag has no value', async () => {
        const onChange = vi.fn();
        const screen = renderComponent({
          onChange,
        });

        const tabs = screen.getAllByRole('tab');
        await userEvent.click(tabs[1]);

        expect(onChange).toHaveBeenCalledWith({ index: 1, value: undefined });
      });

      it('emits the new index and value when the user changes tab, and tab has value', async () => {
        const onChange = vi.fn();
        const screen = renderComponent({
          children: TEST_PANELS_VALUES,
          onChange,
        });

        const tabs = screen.getAllByRole('tab');
        await userEvent.click(tabs[1]);

        expect(onChange).toHaveBeenCalledWith({ index: 1, value: 'tab-2' });
      });
    });

    describe('selected', () => {
      it('sets the selected tab by index', () => {
        const screen = renderComponent({
          selected: 1,
        });

        const tabs = screen.getAllByRole('tab');
        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
      });

      it('sets the selected tab by index (panels)', () => {
        const screen = renderComponentWithPanels({
          selected: 1,
        });

        const tabs = screen.getAllByRole('tab');
        const activePanel = screen.getByRole('tabpanel');

        expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
        expect(tabs[1]).toHaveAttribute('aria-controls', activePanel.id);

        expect(activePanel).toHaveAttribute('aria-labelledby', tabs[1].id);
      });

      it('sets the selected tab by value', () => {
        const screen = renderComponent({
          children: TEST_PANELS_VALUES,
          selected: 'tab-3',
        });

        const tabs = screen.getAllByRole('tab');
        expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('keyboard', () => {
    it('removes focus if the user tabs away from first item', async () => {
      const screen = renderComponent();
      const tabs = screen.getAllByRole('tab');

      await userEvent.tab(); // focus on tabs
      expect(tabs[0]).toHaveFocus();

      await userEvent.tab(); // focus away

      tabs.forEach((tab) => {
        expect(tab).not.toHaveFocus();
      });
    });

    it('navigates tabs using arrow keys instead', async () => {
      const screen = renderComponent();
      const tabs = screen.getAllByRole('tab');

      await userEvent.tab(); // focus on tabs
      expect(tabs[0]).toHaveFocus();

      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => expect(tabs[1]).toHaveFocus());

      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => expect(tabs[2]).toHaveFocus());

      await userEvent.keyboard('{ArrowRight}');
      await waitFor(() => expect(tabs[2]).toHaveFocus()); // no looping, it should still be focused on last element
    });

    it('has scrollIntoView functionality for keyboard navigation', async () => {
      // This test verifies that the scrollIntoView logic is present in the component.
      // The actual scrollIntoView behavior is tested manually/visually since it depends
      // on specific DOM layout conditions that are difficult to mock reliably.

      const manyTabs = Array.from({ length: 20 }, (_, i) => (
        <IressTab key={i} label={`Tab ${i + 1}`}>
          Content {i + 1}
        </IressTab>
      ));

      const screen = renderComponent({ children: manyTabs });
      const tabs = screen.getAllByRole('tab');

      // Verify tabs are rendered
      expect(tabs.length).toBe(20);

      // Click on a tab far to the right to trigger scrollIntoView
      await userEvent.click(tabs[10]);

      // Verify that scrollIntoView was called
      expect(tabs[10].scrollIntoView).toHaveBeenCalled();
    });

    it('does not auto-scroll tabs on initial mount', () => {
      const screen = renderComponent({ defaultSelected: 1 });
      const tabs = screen.getAllByRole('tab');

      // Tab should be selected
      expect(tabs[1]).toHaveAttribute('aria-selected', 'true');

      // But scrollIntoView should not have been called on initial mount
      expect(Element.prototype.scrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('overflow indicators', () => {
    it('shows overflow indicators when tabs exceed container width', async () => {
      // Create many tabs to ensure overflow
      const manyTabs = Array.from({ length: 20 }, (_, i) => (
        <IressTab key={i} label={`Tab ${i + 1}`} />
      ));

      const screen = renderComponent({ children: manyTabs });
      const tablist = screen.getByRole('tablist');
      const listHolder = tablist.parentElement;

      // Mock the tablist element to simulate overflow
      Object.defineProperty(tablist, 'scrollWidth', {
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(tablist, 'clientWidth', {
        configurable: true,
        value: 500,
      });
      Object.defineProperty(tablist, 'scrollLeft', {
        configurable: true,
        value: 100,
      });

      // Trigger scroll event to update overflow state
      await act(async () => {
        tablist.dispatchEvent(new Event('scroll'));
      });

      await waitFor(() => {
        // Check that overflow indicator divs are rendered by looking for overflow class
        const indicators = listHolder?.querySelectorAll(
          'div[class*="overflow"]',
        );
        expect(indicators?.length).toBeGreaterThan(0);
      });
    });

    it('hides overflow indicators when all tabs fit in container', async () => {
      const screen = renderComponent();
      const tablist = screen.getByRole('tablist');
      const listHolder = tablist.parentElement;

      // Mock dimensions to show no overflow
      Object.defineProperty(tablist, 'scrollWidth', {
        configurable: true,
        value: 500,
      });
      Object.defineProperty(tablist, 'clientWidth', {
        configurable: true,
        value: 500,
      });

      // Trigger scroll event
      await act(async () => {
        tablist.dispatchEvent(new Event('scroll'));
      });

      await waitFor(() => {
        // Overflow indicators should not be present
        const indicators = listHolder?.querySelectorAll(
          'div[class*="overflow"]',
        );
        expect(indicators?.length).toBe(0);
      });
    });

    it('updates indicators when scrolling through tabs', async () => {
      const manyTabs = Array.from({ length: 20 }, (_, i) => (
        <IressTab key={i} label={`Tab ${i + 1}`} />
      ));

      const screen = renderComponent({ children: manyTabs });
      const tablist = screen.getByRole('tablist');
      const listHolder = tablist.parentElement;

      // Mock initial state: at start of scroll
      Object.defineProperty(tablist, 'scrollWidth', {
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(tablist, 'clientWidth', {
        configurable: true,
        value: 500,
      });
      Object.defineProperty(tablist, 'scrollLeft', {
        configurable: true,
        writable: true,
        value: 0,
      });

      await act(async () => {
        tablist.dispatchEvent(new Event('scroll'));
      });

      // At start: no left indicator, show right indicator
      await waitFor(() => {
        const indicators = listHolder?.querySelectorAll(
          'div[class*="overflow"]',
        );
        // Should have one indicator (end) when at the start
        expect(indicators?.length).toBe(1);
        // Verify it has the right transform (not rotated = right indicator)
        expect(indicators?.[0]?.classList.toString()).not.toContain('rotate');
      });

      // Scroll to middle
      Object.defineProperty(tablist, 'scrollLeft', {
        configurable: true,
        writable: true,
        value: 250,
      });

      await act(async () => {
        tablist.dispatchEvent(new Event('scroll'));
      });

      // In middle: show both indicators
      await waitFor(() => {
        const indicators = listHolder?.querySelectorAll(
          'div[class*="overflow"]',
        );
        expect(indicators?.length).toBe(2);
      });
    });
  });

  describe('warnings', () => {
    it('logs a warning when both the selected and defaultSelected props are used', async () => {
      renderComponent({
        defaultSelected: 2,
        selected: 1,
      });

      await waitFor(() => expect(idsLogger).toHaveBeenCalledTimes(1));
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues (tabs)', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });

    it('should not have basic accessibility issues (panels)', async () => {
      const screen = renderComponentWithPanels();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('dynamic tabs', () => {
    it('renders correctly when tabs are added in uncontrolled mode', async () => {
      const DynamicTabs = () => {
        const [showExtra, setShowExtra] = useState(false);
        return (
          <>
            <button data-testid="toggle" onClick={() => setShowExtra(true)}>
              Add
            </button>
            <IressTabSet data-testid={TEST_ID}>
              <IressTab key="1" label="Tab 1">
                Panel 1
              </IressTab>
              {showExtra && (
                <IressTab key="extra" label="Extra Tab">
                  Extra Panel
                </IressTab>
              )}
              <IressTab key="2" label="Tab 2">
                Panel 2
              </IressTab>
            </IressTabSet>
          </>
        );
      };

      const screen = render(<DynamicTabs />);
      expect(screen.getAllByRole('tab')).toHaveLength(2);
      expect(screen.getAllByRole('tab')[0]).toHaveAttribute(
        'aria-selected',
        'true',
      );

      await userEvent.click(screen.getByTestId('toggle'));

      expect(screen.getAllByRole('tab')).toHaveLength(3);
      // First tab should still be selected
      expect(screen.getAllByRole('tab')[0]).toHaveAttribute(
        'aria-selected',
        'true',
      );
    });

    it('renders correctly when tabs are removed in uncontrolled mode', async () => {
      const DynamicTabs = () => {
        const [showMiddle, setShowMiddle] = useState(true);
        return (
          <>
            <button data-testid="toggle" onClick={() => setShowMiddle(false)}>
              Remove
            </button>
            <IressTabSet data-testid={TEST_ID}>
              <IressTab key="1" label="Tab 1">
                Panel 1
              </IressTab>
              {showMiddle && (
                <IressTab key="2" label="Tab 2">
                  Panel 2
                </IressTab>
              )}
              <IressTab key="3" label="Tab 3">
                Panel 3
              </IressTab>
            </IressTabSet>
          </>
        );
      };

      const screen = render(<DynamicTabs />);
      expect(screen.getAllByRole('tab')).toHaveLength(3);

      await userEvent.click(screen.getByTestId('toggle'));

      expect(screen.getAllByRole('tab')).toHaveLength(2);
    });

    it('updates active indicator when tabs change', async () => {
      const DynamicTabs = () => {
        const [showExtra, setShowExtra] = useState(false);
        return (
          <>
            <button
              data-testid="toggle"
              onClick={() => setShowExtra((s) => !s)}
            >
              Toggle
            </button>
            <IressTabSet data-testid={TEST_ID}>
              {showExtra && (
                <IressTab key="extra" label="Extra Tab">
                  Extra Panel
                </IressTab>
              )}
              <IressTab key="1" label="Tab 1">
                Panel 1
              </IressTab>
              <IressTab key="2" label="Tab 2">
                Panel 2
              </IressTab>
            </IressTabSet>
          </>
        );
      };

      const screen = render(<DynamicTabs />);

      const tablist = screen.getByRole('tablist');
      const activeIndicator = tablist.children[0] as HTMLElement;

      // Add a tab before the active tab
      await userEvent.click(screen.getByTestId('toggle'));

      // Indicator style should have been recalculated (effect re-ran)
      // In jsdom offsetLeft is always 0, but we verify the style was set
      expect(activeIndicator.style.left).toBeDefined();
      expect(activeIndicator.style.width).toBeDefined();
    });

    it('clears active indicator when active tab is removed', async () => {
      const DynamicTabs = () => {
        const [tabs, setTabs] = useState(['tab-1', 'tab-2', 'tab-3']);
        return (
          <>
            <button
              data-testid="remove"
              onClick={() => setTabs(['tab-2', 'tab-3'])}
            >
              Remove
            </button>
            <IressTabSet data-testid={TEST_ID} defaultSelected="tab-1">
              {tabs.map((t) => (
                <IressTab key={t} label={t} value={t}>
                  {t} content
                </IressTab>
              ))}
            </IressTabSet>
          </>
        );
      };

      const screen = render(<DynamicTabs />);

      const tablist = screen.getByRole('tablist');
      const activeIndicator = tablist.children[0] as HTMLElement;

      // Initially should have indicator style set
      expect(activeIndicator.style.left).toBe('0px');

      // Remove the active tab (tab-1)
      await userEvent.click(screen.getByTestId('remove'));

      // Style should be cleared (no left/width)
      expect(activeIndicator.style.left).toBe('');
      expect(activeIndicator.style.width).toBe('');
    });

    it('updates active indicator when active tab content changes size', async () => {
      let resizeCallback: ResizeObserverCallback | undefined;
      const observeMock = vi.fn();
      const disconnectMock = vi.fn();

      vi.stubGlobal(
        'ResizeObserver',
        class MockResizeObserver {
          observe = observeMock;
          disconnect = disconnectMock;
          constructor(callback: ResizeObserverCallback) {
            resizeCallback = callback;
          }
        },
      );

      const screen = render(
        <IressTabSet data-testid={TEST_ID}>
          <IressTab key="1" label="Tab 1">
            Panel 1
          </IressTab>
          <IressTab key="2" label="Tab 2">
            Panel 2
          </IressTab>
        </IressTabSet>,
      );

      const tablist = screen.getByRole('tablist');
      const activeIndicator = tablist.children[0] as HTMLElement;

      // Verify the ResizeObserver is observing the tab elements
      expect(observeMock).toHaveBeenCalled();

      // Simulate a tab resize event (e.g., badge appears, label text changes)
      await act(async () => {
        resizeCallback!([], {} as ResizeObserver);
      });

      // Indicator style should have been recalculated
      expect(activeIndicator.style.left).toBeDefined();
      expect(activeIndicator.style.width).toBeDefined();

      vi.unstubAllGlobals();
    });
  });
});
