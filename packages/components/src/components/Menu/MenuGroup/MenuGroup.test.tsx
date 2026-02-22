import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IressMenuGroup } from './MenuGroup';
import { IressMenuItem } from '../MenuItem/MenuItem';
import { IressMenu } from '../Menu';

describe('IressMenuGroup', () => {
  it('renders with label', () => {
    render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(
      screen.getByRole('heading', { name: 'Group Label', level: 2 }),
    ).toBeInTheDocument();
  });

  it('renders children within the group', () => {
    const { getByText } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
          <IressMenuItem>Item 2</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByText('Item 1')).toBeInTheDocument();
    expect(getByText('Item 2')).toBeInTheDocument();
  });

  it('renders divider when divider prop is true', () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" divider>
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });

  it('does not render divider when divider prop is false', () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" divider={false}>
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const divider = container.querySelector('hr');
    expect(divider).not.toBeInTheDocument();
  });

  it('applies custom data-testid', () => {
    const { getByTestId } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label" data-testid="custom-group">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByTestId('custom-group')).toBeInTheDocument();
  });

  it('renders multiple groups correctly', () => {
    const { getByText } = render(
      <IressMenu>
        <IressMenuGroup label="Group 1">
          <IressMenuItem>Item 1-1</IressMenuItem>
          <IressMenuItem>Item 1-2</IressMenuItem>
        </IressMenuGroup>
        <IressMenuGroup label="Group 2">
          <IressMenuItem>Item 2-1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();
    expect(getByText('Item 1-1')).toBeInTheDocument();
    expect(getByText('Item 1-2')).toBeInTheDocument();
    expect(getByText('Item 2-1')).toBeInTheDocument();
  });

  it('passes accessibility tests', async () => {
    const { container } = render(
      <IressMenu>
        <IressMenuGroup label="Group Label">
          <IressMenuItem>Item 1</IressMenuItem>
          <IressMenuItem>Item 2</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe('IressMenuGroup subdraw variant', () => {
  it('renders as MenuItem trigger with chevron when variant="subdraw"', () => {
    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    // Should render as a menuitem, not a heading
    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    expect(trigger).toBeInTheDocument();

    // Should not render a heading
    expect(
      screen.queryByRole('heading', { name: 'Subdraw Group' }),
    ).not.toBeInTheDocument();
  });

  it('has aria-haspopup="menu" on trigger', () => {
    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('has aria-expanded="false" initially', () => {
    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens popover on trigger click', async () => {
    const user = userEvent.setup();

    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Submenu Item</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    await user.click(trigger);

    // Should show the submenu item
    await waitFor(() => {
      expect(screen.getByText('Submenu Item')).toBeVisible();
    });
  });

  it('updates aria-expanded to "true" when open', async () => {
    const user = userEvent.setup();

    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Submenu Item</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    await user.click(trigger);

    await waitFor(() => {
      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });
  });

  it('closes popover on Escape', async () => {
    const user = userEvent.setup();

    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Submenu Item</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const trigger = screen.getByRole('menuitem', { name: 'Subdraw Group' });
    await user.click(trigger);

    // Wait for popover to open
    await waitFor(() => {
      expect(screen.getByText('Submenu Item')).toBeVisible();
    });

    // Press Escape to close
    await user.keyboard('{Escape}');

    // Popover should close
    await waitFor(() => {
      expect(screen.queryByText('Submenu Item')).not.toBeVisible();
    });
  });

  it('renders divider when divider prop is true', () => {
    const { container } = render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw" divider>
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const divider = container.querySelector('hr');
    expect(divider).toBeInTheDocument();
  });

  it('applies custom data-testid to trigger and subdraw', () => {
    render(
      <IressMenu role="menu">
        <IressMenuGroup
          label="Subdraw Group"
          variant="subdraw"
          data-testid="my-group"
        >
          <IressMenuItem>Item 1</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    expect(
      screen.getByTestId('my-group__subdraw__trigger'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('my-group__subdraw')).toBeInTheDocument();
  });

  it('passes accessibility tests', async () => {
    const { container } = render(
      <IressMenu role="menu">
        <IressMenuGroup label="Subdraw Group" variant="subdraw">
          <IressMenuItem>Item 1</IressMenuItem>
          <IressMenuItem>Item 2</IressMenuItem>
        </IressMenuGroup>
      </IressMenu>,
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('works with nested subdraw groups', async () => {
    const user = userEvent.setup();

    render(
      <IressMenu role="menu">
        <IressMenuGroup label="Level 1" variant="subdraw">
          <IressMenuGroup label="Level 2" variant="subdraw">
            <IressMenuItem>Deep Item</IressMenuItem>
          </IressMenuGroup>
        </IressMenuGroup>
      </IressMenu>,
    );

    // Open first level
    const level1Trigger = screen.getByRole('menuitem', { name: 'Level 1' });
    await user.click(level1Trigger);

    // Wait for first submenu
    await waitFor(() => {
      expect(
        screen.getByRole('menuitem', { name: 'Level 2' }),
      ).toBeInTheDocument();
    });

    // Open second level
    const level2Trigger = screen.getByRole('menuitem', { name: 'Level 2' });
    await user.click(level2Trigger);

    // Wait for nested submenu
    await waitFor(() => {
      expect(screen.getByText('Deep Item')).toBeVisible();
    });
  });
});
