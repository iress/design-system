import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressSideNav, type IressSideNavProps } from './SideNav';
import { GlobalCSSClass } from '@/enums';
import {
  MOCK_SIDE_NAV_ITEMS,
  MOCK_RAIL_ONLY_ITEMS,
  MOCK_SIDE_MENU_OVERRIDE,
  MOCK_GROUPED_ITEMS,
} from './mocks/sideNavItems';
import type { SideNavItem } from './SideNav';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const renderSideNav = (props: Partial<IressSideNavProps> = {}) =>
  render(
    <IressSideNav
      {...{
        items: MOCK_SIDE_NAV_ITEMS,
        activeItemKey: 'hubs',
        'data-testid': 'sidenav',
        ...props,
      }}
    />,
  );

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('IressSideNav', () => {
  // -------------------------------------------------------------------------
  // Rendering
  // -------------------------------------------------------------------------

  describe('rendering', () => {
    it('renders a nav element with the correct aria-label', () => {
      renderSideNav();
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveAttribute('aria-label', 'Side navigation');
    });

    it('renders a custom aria-label', () => {
      renderSideNav({ 'aria-label': 'Main navigation' });
      expect(screen.getByRole('navigation')).toHaveAttribute(
        'aria-label',
        'Main navigation',
      );
    });

    it('renders rail items for each item in the items array', () => {
      renderSideNav();
      // Rail items with icons render children as sr-only text;
      // verify each item's data-testid is present instead
      for (const item of MOCK_SIDE_NAV_ITEMS) {
        expect(
          screen.getByTestId(`sidenav__rail-item-${item.key}`),
        ).toBeInTheDocument();
      }
    });

    it('applies the GlobalCSSClass.SideNav class to the root element', () => {
      renderSideNav();
      const nav = screen.getByRole('navigation');
      expect(nav).toHaveClass(GlobalCSSClass.SideNav);
    });

    it('propagates data-testid to nested elements', () => {
      renderSideNav();
      expect(screen.getByTestId('sidenav')).toBeInTheDocument();
      expect(screen.getByTestId('sidenav__rail')).toBeInTheDocument();
      expect(screen.getByTestId('sidenav__panel')).toBeInTheDocument();
      expect(screen.getByTestId('sidenav__toggle')).toBeInTheDocument();
    });

    it('sets --iress-width CSS custom property from the width prop', () => {
      renderSideNav({ width: '300px' });
      const nav = screen.getByRole('navigation');
      expect(nav.style.getPropertyValue('--iress-width')).toBe('300px');
    });

    it('converts numeric width to pixels', () => {
      renderSideNav({ width: 400 });
      const nav = screen.getByRole('navigation');
      expect(nav.style.getPropertyValue('--iress-width')).toBe('400px');
    });
  });

  // -------------------------------------------------------------------------
  // Expand / Collapse
  // -------------------------------------------------------------------------

  describe('expand/collapse', () => {
    it('renders collapsed by default', () => {
      renderSideNav();
      const panel = screen.getByTestId('sidenav__panel');
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    it('renders expanded when defaultExpanded is true', () => {
      renderSideNav({ defaultExpanded: true, activeItemKey: 'hubs' });
      const panel = screen.getByTestId('sidenav__panel');
      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });

    it('toggles expansion when the toggle button is clicked', async () => {
      const user = userEvent.setup();
      renderSideNav({ activeItemKey: 'hubs' });

      const toggleButton = screen.getByTestId('sidenav__toggle');
      const panel = screen.getByTestId('sidenav__panel');

      expect(panel).toHaveAttribute('aria-hidden', 'true');

      await user.click(toggleButton);
      expect(panel).toHaveAttribute('aria-hidden', 'false');

      await user.click(toggleButton);
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });

    it('respects controlled expanded prop', () => {
      const { rerender } = render(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={false}
          data-testid="sidenav"
        />,
      );

      const panel = screen.getByTestId('sidenav__panel');
      expect(panel).toHaveAttribute('aria-hidden', 'true');

      rerender(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={true}
          data-testid="sidenav"
        />,
      );

      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });

    it('calls onExpandedChange when toggled', async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();
      renderSideNav({ onExpandedChange });

      const toggleButton = screen.getByTestId('sidenav__toggle');
      await user.click(toggleButton);

      expect(onExpandedChange).toHaveBeenCalledWith(true);
    });

    it('shows the expand label when collapsed and collapse label when expanded', () => {
      const { rerender } = render(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={false}
          expandLabel="Open menu"
          collapseLabel="Close menu"
          data-testid="sidenav"
        />,
      );

      const toggle = screen.getByTestId('sidenav__toggle');
      expect(toggle).toHaveAttribute('aria-label', 'Open menu');

      rerender(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          expanded={true}
          activeItemKey="hubs"
          expandLabel="Open menu"
          collapseLabel="Close menu"
          data-testid="sidenav"
        />,
      );

      expect(toggle).toHaveAttribute('aria-label', 'Close menu');
    });
  });

  // -------------------------------------------------------------------------
  // Active Item (Simple Mode)
  // -------------------------------------------------------------------------

  describe('active item (simple mode)', () => {
    it('displays children from the active item in the side panel', () => {
      renderSideNav({ activeItemKey: 'hubs', defaultExpanded: true });

      // Hubs children should be in the document
      expect(screen.getByText('Basic Details')).toBeInTheDocument();
      expect(screen.getByText('Dependants')).toBeInTheDocument();
      expect(screen.getByText('Individual')).toBeInTheDocument();
    });

    it('updates side panel content when activeItemKey changes', () => {
      const { rerender } = render(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={true}
          data-testid="sidenav"
        />,
      );

      expect(screen.getByText('Basic Details')).toBeInTheDocument();

      rerender(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="portfolios"
          expanded={true}
          data-testid="sidenav"
        />,
      );

      expect(screen.getByText('Investment Returns')).toBeInTheDocument();
      expect(screen.queryByText('Basic Details')).not.toBeInTheDocument();
    });

    it('shows no panel content when active item has no children', () => {
      renderSideNav({ activeItemKey: 'admin', defaultExpanded: true });

      // Admin has no children — no side-menu should render
      expect(
        screen.queryByTestId('sidenav__side-menu'),
      ).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // sideMenuItems Override
  // -------------------------------------------------------------------------

  describe('sideMenuItems override', () => {
    it('renders sideMenuItems instead of items[activeItemKey].children', () => {
      renderSideNav({
        items: MOCK_RAIL_ONLY_ITEMS,
        activeItemKey: 'hubs',
        sideMenuItems: MOCK_SIDE_MENU_OVERRIDE,
        defaultExpanded: true,
      });

      // MOCK_SIDE_MENU_OVERRIDE has groups 'Client Details' and 'Financial Information'
      expect(screen.getByText('Client Details')).toBeInTheDocument();
      expect(screen.getByText('Financial Information')).toBeInTheDocument();
      // Hubs children from items should NOT be used
      expect(screen.queryByText('Employment')).not.toBeInTheDocument();
    });

    it('uses sideMenuLabel as panel heading when provided', () => {
      renderSideNav({
        items: MOCK_RAIL_ONLY_ITEMS,
        activeItemKey: 'hubs',
        sideMenuItems: MOCK_SIDE_MENU_OVERRIDE,
        sideMenuLabel: 'Custom Label',
        defaultExpanded: true,
      });

      // sideMenuLabel overrides the active item's label as panel heading
      expect(screen.getByText('Custom Label')).toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Header / Footer Slots
  // -------------------------------------------------------------------------

  describe('header and footer slots', () => {
    it('renders header content in the expanded panel', () => {
      renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
        header: <div data-testid="custom-header">Search Bar</div>,
      });

      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      expect(screen.getByText('Search Bar')).toBeInTheDocument();
    });

    it('renders footer content in the expanded panel', () => {
      renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
        footer: <div data-testid="custom-footer">v2.4.1</div>,
      });

      expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
      expect(screen.getByText('v2.4.1')).toBeInTheDocument();
    });

    it('hides header/footer when collapsed via aria-hidden panel', () => {
      renderSideNav({
        activeItemKey: 'hubs',
        expanded: false,
        header: <div data-testid="custom-header">Search</div>,
        footer: <div data-testid="custom-footer">Footer</div>,
      });

      const panel = screen.getByTestId('sidenav__panel');
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });
  });

  // -------------------------------------------------------------------------
  // Numbered
  // -------------------------------------------------------------------------

  describe('numbered', () => {
    it('forwards the numbered prop to the side menu', () => {
      renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
        numbered: true,
      });

      const sideMenu = screen.getByTestId('sidenav__side-menu');
      expect(sideMenu).toBeInTheDocument();
    });

    it('does not render numbered class when numbered is false', () => {
      renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
        numbered: false,
      });

      const sideMenuWithoutNumbered = screen.getByTestId('sidenav__side-menu');
      renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
        numbered: true,
      });

      const sideMenuWithNumbered =
        screen.getAllByTestId('sidenav__side-menu')[1];

      // The class lists should differ when numbered is toggled
      expect(sideMenuWithoutNumbered.className).not.toBe(
        sideMenuWithNumbered.className,
      );
    });
  });

  // -------------------------------------------------------------------------
  // Per-item href and onClick
  // -------------------------------------------------------------------------

  describe('per-item props', () => {
    it('renders items with href as links', () => {
      renderSideNav({ activeItemKey: 'hubs', defaultExpanded: true });

      // Sub-items with href should render as anchors
      const basicDetails = screen.getByText('Basic Details');
      const anchor = basicDetails.closest('a');
      expect(anchor).toHaveAttribute('href', '/hubs/basic-details');
    });

    it('fires onClick handlers on rail items', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test Item',
          onClick,
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          data-testid="sidenav"
        />,
      );

      const railItem = screen.getByTestId('sidenav__rail-item-test');
      await user.click(railItem);
      expect(onClick).toHaveBeenCalled();
    });

    it('fires onClick handlers on sub-items', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test Section',
          children: [{ key: 'child', label: 'Child Item', onClick }],
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          defaultExpanded={true}
          data-testid="sidenav"
        />,
      );

      // Need to find and click the child item inside the expanded group
      const childItem = screen.getByText('Child Item');
      await user.click(childItem);
      expect(onClick).toHaveBeenCalled();
    });

    it('forwards the element prop to rail items for custom routing', () => {
      const CustomLink = vi.fn(({ children, ...props }) => (
        <a {...props}>{children}</a>
      ));

      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test Item',
          href: '/test',
          element: CustomLink,
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          data-testid="sidenav"
        />,
      );

      expect(CustomLink).toHaveBeenCalled();
    });

    it('forwards the element prop to sub-items for custom routing', () => {
      const CustomLink = vi.fn(({ children, ...props }) => (
        <a {...props}>{children}</a>
      ));

      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test Section',
          children: [
            {
              key: 'child',
              label: 'Child Link',
              href: '/test/child',
              element: CustomLink,
            },
          ],
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          defaultExpanded={true}
          data-testid="sidenav"
        />,
      );

      expect(CustomLink).toHaveBeenCalled();
      const childLink = screen.getByText('Child Link').closest('a');
      expect(childLink).toHaveAttribute('href', '/test/child');
    });
  });

  // -------------------------------------------------------------------------
  // Rail click navigation
  // -------------------------------------------------------------------------

  describe('rail click navigation', () => {
    it('switches active item and panel content when a rail item is clicked', async () => {
      const user = userEvent.setup();
      renderSideNav({ activeItemKey: 'hubs', defaultExpanded: true });

      // Initially showing Hubs children
      expect(screen.getByText('Basic Details')).toBeInTheDocument();

      // Click Portfolios rail item
      const portfoliosItem = screen.getByTestId(
        'sidenav__rail-item-portfolios',
      );
      await user.click(portfoliosItem);

      // Now showing Portfolios children
      expect(screen.getByText('Investment Returns')).toBeInTheDocument();
      expect(screen.queryByText('Basic Details')).not.toBeInTheDocument();
    });

    it('auto-expands when clicking a rail item with children', async () => {
      const user = userEvent.setup();
      renderSideNav({ activeItemKey: 'admin' });

      const panel = screen.getByTestId('sidenav__panel');
      expect(panel).toHaveAttribute('aria-hidden', 'true');

      // Click Hubs which has children
      const hubsItem = screen.getByTestId('sidenav__rail-item-hubs');
      await user.click(hubsItem);

      expect(panel).toHaveAttribute('aria-hidden', 'false');
    });

    it('calls onActiveItemKeyChange when a rail item is clicked', async () => {
      const user = userEvent.setup();
      const onActiveItemKeyChange = vi.fn();
      renderSideNav({
        activeItemKey: 'hubs',
        onActiveItemKeyChange,
        defaultExpanded: true,
      });

      const portfoliosItem = screen.getByTestId(
        'sidenav__rail-item-portfolios',
      );
      await user.click(portfoliosItem);

      expect(onActiveItemKeyChange).toHaveBeenCalledWith('portfolios');
    });

    it('syncs internal state when activeItemKey prop changes externally', () => {
      const { rerender } = render(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={true}
          data-testid="sidenav"
        />,
      );

      expect(screen.getByText('Basic Details')).toBeInTheDocument();

      rerender(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="portfolios"
          expanded={true}
          data-testid="sidenav"
        />,
      );

      expect(screen.getByText('Investment Returns')).toBeInTheDocument();
      expect(screen.queryByText('Basic Details')).not.toBeInTheDocument();
    });
  });

  // -------------------------------------------------------------------------
  // Accordion behavior (groups)
  // -------------------------------------------------------------------------

  describe('accordion behavior', () => {
    it('only allows one group open at a time', async () => {
      const user = userEvent.setup();
      renderSideNav({
        items: MOCK_GROUPED_ITEMS,
        activeItemKey: 'hubs',
        defaultExpanded: true,
      });

      // First group starts open (active: true in mock)
      const firstActivator = screen.getByTestId(
        'sidenav__side-group-client-details__activator',
      );
      expect(firstActivator).toHaveAttribute('aria-expanded', 'true');

      // Click the second group activator
      const secondActivator = screen.getByTestId(
        'sidenav__side-group-financial__activator',
      );
      await user.click(secondActivator);

      // Second group is now open, first is closed
      expect(secondActivator).toHaveAttribute('aria-expanded', 'true');
      expect(firstActivator).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes the open group when clicking its activator again', async () => {
      const user = userEvent.setup();
      renderSideNav({
        items: MOCK_GROUPED_ITEMS,
        activeItemKey: 'hubs',
        defaultExpanded: true,
      });

      const firstActivator = screen.getByTestId(
        'sidenav__side-group-client-details__activator',
      );
      expect(firstActivator).toHaveAttribute('aria-expanded', 'true');

      await user.click(firstActivator);
      expect(firstActivator).toHaveAttribute('aria-expanded', 'false');
    });
  });

  // -------------------------------------------------------------------------
  // Group activator href/onClick
  // -------------------------------------------------------------------------

  describe('group activator props', () => {
    it('fires onClick on the group activator', async () => {
      const user = userEvent.setup();
      const onClick = vi.fn();

      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test',
          children: [
            {
              key: 'group1',
              label: 'Group 1',
              onClick,
              children: [{ key: 'child', label: 'Child' }],
            },
          ],
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          defaultExpanded={true}
          data-testid="sidenav"
        />,
      );

      const activator = screen.getByTestId(
        'sidenav__side-group-group1__activator',
      );
      await user.click(activator);
      expect(onClick).toHaveBeenCalled();
    });

    it('renders group activator as a link when href is provided', () => {
      const items: SideNavItem[] = [
        {
          key: 'test',
          icon: 'hub',
          label: 'Test',
          children: [
            {
              key: 'group1',
              label: 'Group 1',
              href: '/group1',
              children: [{ key: 'child', label: 'Child' }],
            },
          ],
        },
      ];

      render(
        <IressSideNav
          items={items}
          activeItemKey="test"
          defaultExpanded={true}
          data-testid="sidenav"
        />,
      );

      const activator = screen.getByTestId(
        'sidenav__side-group-group1__activator',
      );
      const anchor = activator.closest('a');
      expect(anchor).toHaveAttribute('href', '/group1');
    });
  });

  // -------------------------------------------------------------------------
  // Accessibility
  // -------------------------------------------------------------------------

  describe('accessibility', () => {
    it('has no basic accessibility violations when collapsed', async () => {
      const { container } = renderSideNav();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has no basic accessibility violations when expanded', async () => {
      const { container } = renderSideNav({
        activeItemKey: 'hubs',
        defaultExpanded: true,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('sets aria-expanded on the toggle button', () => {
      const { rerender } = render(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          activeItemKey="hubs"
          expanded={false}
          data-testid="sidenav"
        />,
      );

      const toggle = screen.getByTestId('sidenav__toggle');
      expect(toggle).toHaveAttribute('aria-expanded', 'false');

      rerender(
        <IressSideNav
          items={MOCK_SIDE_NAV_ITEMS}
          expanded={true}
          activeItemKey="hubs"
          data-testid="sidenav"
        />,
      );

      expect(toggle).toHaveAttribute('aria-expanded', 'true');
    });
  });
});
