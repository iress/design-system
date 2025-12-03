import { type RenderResult, render, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTab, IressTabSet, type IressTabSetProps } from '.';
import styles from './TabSet.module.scss';
import userEvent from '@testing-library/user-event';
import { idsLogger } from '@helpers/utility/idsLogger';

const TEST_ID = 'test-component';

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
      styles.tabSet,
      styles['layout--top-left'],
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

    describe('layout', () => {
      it('changes the layout of the tabs', () => {
        const screen = renderComponent({
          layout: 'top-center',
        });

        const container = screen.getByTestId(TEST_ID);
        expect(container).toHaveClass(styles[`layout--top-center`]);
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
  });

  describe('panels rendering behaviour', () => {
    it('renders all panels (inactive ones hidden) and toggles visibility on tab change', async () => {
      const screen = renderComponentWithPanels({ defaultSelected: 0 });

      // All panels exist in DOM (including hidden ones)
      const allPanels = screen.getAllByRole('tabpanel', { hidden: true });
      expect(allPanels).toHaveLength(TEST_PANELS.length);

      // Only the first should be visible initially
      const visibleInitially = allPanels.filter(
        (panel) => !panel.hasAttribute('hidden'),
      );
      expect(visibleInitially).toHaveLength(1);
      expect(visibleInitially[0]).toHaveTextContent('Tab panel 1');

      // Switch to second tab
      const tabs = screen.getAllByRole('tab');
      await userEvent.click(tabs[1]);

      const allPanelsAfter = screen.getAllByRole('tabpanel', { hidden: true });
      const visibleAfter = allPanelsAfter.filter(
        (panel) => !panel.hasAttribute('hidden'),
      );
      expect(visibleAfter).toHaveLength(1);
      expect(visibleAfter[0]).toHaveTextContent('Tab panel 2');

      // Previously active panel should now be hidden
      const previouslyActive = allPanelsAfter.find((p) =>
        p.textContent?.includes('Tab panel 1'),
      );
      expect(previouslyActive).toBeDefined();
      expect(previouslyActive).not.toBeVisible();
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
});
