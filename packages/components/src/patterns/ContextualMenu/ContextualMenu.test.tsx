import userEvent from '@testing-library/user-event';
import { act, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { css } from '@/styled-system/css';
import { type ContextualMenuItem, IressContextualMenu } from './ContextualMenu';
import { contextualMenu } from './ContextualMenu.styles';
import { GlobalCSSClass } from '@/enums';

const ITEMS: ContextualMenuItem[] = [
  { key: 'edit', label: 'Edit', icon: 'edit' },
  { key: 'lock', label: 'Lock', icon: 'lock' },
];

describe('IressContextualMenu', () => {
  it('renders the trigger with default aria label', () => {
    render(<IressContextualMenu data-testid="menu" items={ITEMS} />);

    expect(
      screen.getByRole('button', {
        name: 'More options',
      }),
    ).toBeInTheDocument();
  });

  it('calls onAction when an item is selected', async () => {
    const onAction = vi.fn();

    render(
      <IressContextualMenu
        data-testid="menu"
        items={ITEMS}
        onAction={onAction}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'More options' }));
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Edit' }),
    );

    expect(onAction).toHaveBeenCalledWith(ITEMS[0]);
  });

  it('applies size and bordered variants', () => {
    const classes = contextualMenu({ size: 'medium', bordered: true });

    render(
      <IressContextualMenu
        bordered
        data-testid="menu"
        items={ITEMS}
        size="medium"
      />,
    );

    const root = screen.getByTestId('menu');
    const trigger = screen.getByTestId('menu__activator');

    expect(root).toHaveClass(GlobalCSSClass.ContextualMenu);
    expect(trigger).toHaveClass(classes.trigger!);
  });

  it('exposes size and theme attributes', () => {
    render(
      <IressContextualMenu
        data-testid="menu"
        items={ITEMS}
        size="medium"
        theme="dark"
      />,
    );

    const root = screen.getByTestId('menu');

    expect(root).toHaveAttribute('data-size', 'medium');
    expect(root).toHaveAttribute('data-theme', 'dark');
  });

  it('does not call onAction for disabled items', async () => {
    const onAction = vi.fn();

    render(
      <IressContextualMenu
        data-testid="menu"
        items={[...ITEMS, { key: 'delete', label: 'Delete', disabled: true }]}
        onAction={onAction}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'More options' }));
    await userEvent.click(
      await screen.findByRole('menuitem', { name: 'Delete' }),
    );

    expect(onAction).not.toHaveBeenCalled();
  });

  it('has no basic accessibility violations', async () => {
    const { container } = render(
      <IressContextualMenu
        ariaLabel="Row actions"
        data-testid="menu"
        items={ITEMS}
      />,
    );

    let results;

    await act(async () => {
      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  it('applies textStyle prop to menu items', async () => {
    const textStyleClass = css({ textStyle: 'typography.heading.1' });

    render(
      <IressContextualMenu
        data-testid="menu"
        items={ITEMS}
        textStyle="typography.heading.1"
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'More options' }));

    const menuItems = await screen.findAllByRole('menuitem');

    for (const item of menuItems) {
      expect(item).toHaveClass(textStyleClass);
    }
  });

  it('uses default typography.body.sm textStyle when no textStyle prop is provided', async () => {
    const defaultTextStyleClass = css({ textStyle: 'typography.body.sm' });

    render(<IressContextualMenu data-testid="menu" items={ITEMS} />);

    await userEvent.click(screen.getByRole('button', { name: 'More options' }));

    const menuItems = await screen.findAllByRole('menuitem');

    for (const item of menuItems) {
      expect(item).toHaveClass(defaultTextStyleClass);
    }
  });

  it('forwards container prop to the popover so content is not clipped by overflow parents', async () => {
    const portalContainer = document.createElement('div');
    document.body.appendChild(portalContainer);

    render(
      <IressContextualMenu
        container={portalContainer}
        data-testid="menu"
        items={ITEMS}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: 'More options' }));
    await screen.findByRole('menuitem', { name: 'Edit' });

    expect(portalContainer.querySelector('[role="menu"]')).toBeInTheDocument();

    document.body.removeChild(portalContainer);
  });
});
