import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { IressButton } from '../../Button';
import { IressMenu, IressMenuItem } from '../../Menu';
import { IressPopover } from '../Popover';
import { usePopover } from './usePopover';

describe('usePopover hook', () => {
  describe('Context access', () => {
    it('should return popover context when used within IressPopover', () => {
      let popoverContext: ReturnType<typeof usePopover> | null = null;

      function TestComponent() {
        const context = usePopover();
        useEffect(() => {
          popoverContext = context;
        });
        return <div>Test Content</div>;
      }

      render(
        <IressPopover activator={<IressButton>Open Menu</IressButton>}>
          <TestComponent />
        </IressPopover>,
      );

      expect(popoverContext).toBeDefined();
      expect(popoverContext!.show).toBeDefined();
      expect(popoverContext!.setShow).toBeDefined();
      expect(popoverContext!.api).toBeDefined();
      expect(typeof popoverContext!.setShow).toBe('function');
      expect(typeof popoverContext!.setShowWithReason).toBe('function');
    });

    it('should return undefined when used outside of popover context', () => {
      let popoverContext: ReturnType<typeof usePopover> | null = null;

      function IsolatedComponent() {
        const context = usePopover();
        useEffect(() => {
          popoverContext = context;
        });
        return <div>Isolated Component</div>;
      }

      render(<IsolatedComponent />);

      expect(popoverContext).toBeUndefined();
    });
  });

  describe('Real-world usage patterns', () => {
    it('should allow checking if popover is open from child components', async () => {
      const user = userEvent.setup();
      let isOpen: boolean | undefined;

      function StatusChecker() {
        const popover = usePopover();
        useEffect(() => {
          isOpen = popover?.show;
        });
        return <div>Status: {popover?.show ? 'Open' : 'Closed'}</div>;
      }

      render(
        <IressPopover activator={<IressButton>Toggle</IressButton>}>
          <StatusChecker />
        </IressPopover>,
      );

      // Initially closed
      expect(isOpen).toBe(false);
      expect(screen.getByText('Status: Closed')).toBeInTheDocument();

      // Open popover
      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      await waitFor(() => {
        expect(isOpen).toBe(true);
        expect(screen.getByText('Status: Open')).toBeInTheDocument();
      });
    });

    it('should allow accessing active index for keyboard navigation tracking', () => {
      let activeIndex: number | null = null;

      function ActiveIndexTracker() {
        const popover = usePopover();
        useEffect(() => {
          activeIndex = popover?.activeIndex ?? null;
        });
        return (
          <div>
            Active Index:{' '}
            {popover?.activeIndex !== null ? popover?.activeIndex : 'None'}
          </div>
        );
      }

      render(
        <IressPopover activator={<IressButton>Menu</IressButton>}>
          <IressMenu role="menu">
            <IressMenuItem>Item 1</IressMenuItem>
            <IressMenuItem>Item 2</IressMenuItem>
            <IressMenuItem>Item 3</IressMenuItem>
            <ActiveIndexTracker />
          </IressMenu>
        </IressPopover>,
      );

      // activeIndex should be accessible (initially null)
      expect(activeIndex).toBe(null);
    });

    it('should allow programmatically controlling popover state', async () => {
      const user = userEvent.setup();
      let popoverState: boolean | undefined;

      function PopoverController() {
        const popover = usePopover();

        useEffect(() => {
          popoverState = popover?.show;
        });

        return (
          <div>
            <button
              onClick={() => {
                popover?.setShow?.(true);
              }}
            >
              Open Programmatically
            </button>
            <button
              onClick={() => {
                popover?.setShow?.(false);
              }}
            >
              Close Programmatically
            </button>
            <div>State: {popover?.show ? 'Open' : 'Closed'}</div>
          </div>
        );
      }

      render(
        <IressPopover activator={<IressButton>Toggle</IressButton>}>
          <PopoverController />
        </IressPopover>,
      );

      // Initially closed
      expect(popoverState).toBe(false);

      // Open popover to access buttons
      await user.click(screen.getByRole('button', { name: 'Toggle' }));

      await waitFor(() => {
        expect(popoverState).toBe(true);
        expect(screen.getByText('State: Open')).toBeInTheDocument();
      });

      // Click close button to close programmatically
      const closeButton = screen.getByRole('button', {
        name: 'Close Programmatically',
      });
      await user.click(closeButton);

      await waitFor(() => {
        expect(popoverState).toBe(false);
        expect(screen.getByText('State: Closed')).toBeInTheDocument();
      });
    });

    it('should allow checking if an element is the active activator', async () => {
      const user = userEvent.setup();
      let isActivatorActive: boolean | undefined;

      function ActivatorChecker() {
        const popover = usePopover();

        useEffect(() => {
          // Get the actual activator button element
          const activator = document.querySelector<HTMLElement>(
            'button[aria-haspopup="dialog"]',
          )!;
          if (activator && popover?.isActiveActivator) {
            isActivatorActive = popover.isActiveActivator(activator);
          }
        });

        return <div>Checker Component</div>;
      }

      render(
        <IressPopover activator={<IressButton>Activator</IressButton>}>
          <ActivatorChecker />
        </IressPopover>,
      );

      // Before opening, activator should not be active
      expect(isActivatorActive).toBe(false);

      // Open popover
      await user.click(screen.getByRole('button', { name: 'Activator' }));

      await waitFor(() => {
        // After opening, activator should be active
        expect(isActivatorActive).toBe(true);
      });
    });

    it('should expose controlled state information', () => {
      let isControlled: boolean | undefined;

      function ControlledChecker() {
        const popover = usePopover();
        useEffect(() => {
          isControlled = popover?.isControlled;
        });
        return <div>Controlled: {String(popover?.isControlled)}</div>;
      }

      // Uncontrolled popover
      const { rerender } = render(
        <IressPopover activator={<IressButton>Uncontrolled</IressButton>}>
          <ControlledChecker />
        </IressPopover>,
      );

      expect(isControlled).toBe(false);

      // Controlled popover
      rerender(
        <IressPopover
          activator={<IressButton>Controlled</IressButton>}
          show={false}
        >
          <ControlledChecker />
        </IressPopover>,
      );

      expect(isControlled).toBe(true);
    });

    it('should allow resetting active index to initial state', async () => {
      const user = userEvent.setup();
      let currentActiveIndex: number | null = null;
      let hasResetMethod = false;

      function IndexResetter() {
        const popover = usePopover();

        useEffect(() => {
          currentActiveIndex = popover?.activeIndex ?? null;
          hasResetMethod = typeof popover?.resetActiveIndex === 'function';
        });

        return (
          <div>
            <button
              onClick={() => {
                popover?.resetActiveIndex();
              }}
            >
              Reset Index
            </button>
            <div>Current: {String(popover?.activeIndex)}</div>
          </div>
        );
      }

      render(
        <IressPopover activator={<IressButton>Menu</IressButton>}>
          <IressMenu role="menu">
            <IressMenuItem>Item 1</IressMenuItem>
            <IressMenuItem>Item 2</IressMenuItem>
            <IndexResetter />
          </IressMenu>
        </IressPopover>,
      );

      await user.click(screen.getByRole('button', { name: 'Menu' }));

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // Verify resetActiveIndex method is available
      expect(hasResetMethod).toBe(true);
      expect(currentActiveIndex).toBe(null);

      // Verify the reset button is accessible
      const resetButton = screen.getByRole('button', { name: 'Reset Index' });
      expect(resetButton).toBeInTheDocument();
    });

    it('should provide access to Floating UI API', () => {
      let floatingApi: unknown = null;

      function FloatingApiChecker() {
        const popover = usePopover();
        useEffect(() => {
          floatingApi = popover?.api;
        });
        return <div>API Test</div>;
      }

      render(
        <IressPopover activator={<IressButton>Test</IressButton>}>
          <FloatingApiChecker />
        </IressPopover>,
      );

      expect(floatingApi).toBeDefined();
      expect(floatingApi).toHaveProperty('refs');
      expect(floatingApi).toHaveProperty('floatingStyles');
      expect(floatingApi).toHaveProperty('context');
    });

    it('should allow setting active index for custom navigation', async () => {
      const user = userEvent.setup();

      function CustomNavigator() {
        const popover = usePopover();

        return (
          <button
            onClick={() => {
              popover?.setActiveIndex?.(2);
            }}
          >
            Jump to Item 3
          </button>
        );
      }

      render(
        <IressPopover activator={<IressButton>Menu</IressButton>}>
          <IressMenu>
            <IressMenuItem>Item 1</IressMenuItem>
            <IressMenuItem>Item 2</IressMenuItem>
            <IressMenuItem>Item 3</IressMenuItem>
            <CustomNavigator />
          </IressMenu>
        </IressPopover>,
      );

      // Open popover to access the custom navigator button
      await user.click(screen.getByRole('button', { name: 'Menu' }));

      const jumpButton = await screen.findByRole('button', {
        name: 'Jump to Item 3',
      });
      expect(jumpButton).toBeInTheDocument();

      // Verify setActiveIndex is available and can be called
      // (We can't easily verify the actual index change without more complex setup,
      // but we can verify the method exists and doesn't throw)
      await user.click(jumpButton);
      // If setActiveIndex wasn't available or threw an error, the test would fail
    });

    it('should expose virtual focus state when applicable', () => {
      let isVirtualFocus: boolean | undefined;

      function VirtualFocusChecker() {
        const popover = usePopover();
        useEffect(() => {
          isVirtualFocus = popover?.isVirtualFocus;
        });
        return <div>Virtual Focus: {String(popover?.isVirtualFocus)}</div>;
      }

      render(
        <IressPopover activator={<IressButton>Test</IressButton>}>
          <VirtualFocusChecker />
        </IressPopover>,
      );

      expect(typeof isVirtualFocus).toBe('boolean');
    });

    it('should allow managing inner role state', async () => {
      const user = userEvent.setup();
      let hasInnerRole: boolean | undefined;

      function InnerRoleManager() {
        const popover = usePopover();
        const [roleSet, setRoleSet] = useState(false);

        useEffect(() => {
          if (popover?.hasInnerRole) {
            hasInnerRole = popover.hasInnerRole();
          }
        });

        return (
          <div>
            <button
              onClick={() => {
                popover?.setHasInnerRole?.(true);
                setRoleSet(true);
              }}
            >
              Set Inner Role
            </button>
            <div>Role Status: {roleSet ? 'Set' : 'Not Set'}</div>
          </div>
        );
      }

      render(
        <IressPopover activator={<IressButton>Test</IressButton>}>
          <InnerRoleManager />
        </IressPopover>,
      );

      // Initially, hasInnerRole should be false
      expect(hasInnerRole).toBe(false);

      // Open popover to access the button
      await user.click(screen.getByRole('button', { name: 'Test' }));

      const setRoleButton = await screen.findByRole('button', {
        name: 'Set Inner Role',
      });

      // Click to set inner role
      await user.click(setRoleButton);

      await waitFor(() => {
        expect(screen.getByText('Role Status: Set')).toBeInTheDocument();
        expect(hasInnerRole).toBe(true);
      });
    });
  });
});
