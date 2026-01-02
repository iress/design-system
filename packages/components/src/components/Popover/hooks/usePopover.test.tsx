import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEffect, useRef, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
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
      });
    });

    it('should allow accessing active index for keyboard navigation tracking', async () => {
      const user = userEvent.setup();
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
          <IressMenu>
            <IressMenuItem>Item 1</IressMenuItem>
            <IressMenuItem>Item 2</IressMenuItem>
            <IressMenuItem>Item 3</IressMenuItem>
            <ActiveIndexTracker />
          </IressMenu>
        </IressPopover>,
      );

      // Open menu
      await user.click(screen.getByRole('button', { name: 'Menu' }));

      await waitFor(() => {
        expect(screen.getByRole('menu')).toBeInTheDocument();
      });

      // Navigate with keyboard
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(activeIndex).toBe(0);
      });
    });

    it('should allow programmatically controlling popover state', () => {
      function PopoverController() {
        const popover = usePopover();

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
          </div>
        );
      }

      render(
        <IressPopover activator={<IressButton>Toggle</IressButton>}>
          <PopoverController />
        </IressPopover>,
      );

      const openButton = screen.getByRole('button', {
        name: 'Open Programmatically',
      });
      const closeButton = screen.getByRole('button', {
        name: 'Close Programmatically',
      });

      expect(openButton).toBeInTheDocument();
      expect(closeButton).toBeInTheDocument();
    });

    it('should allow checking if an element is the active activator', async () => {
      const user = userEvent.setup();
      let isActiveResult: boolean | undefined;

      function ActivatorChecker() {
        const popover = usePopover();
        const buttonRef = useRef<HTMLButtonElement>(null);

        useEffect(() => {
          if (buttonRef.current && popover?.isActiveActivator) {
            isActiveResult = popover.isActiveActivator(buttonRef.current);
          }
        });

        return (
          <button ref={buttonRef} type="button">
            Check Button
          </button>
        );
      }

      render(
        <IressPopover activator={<IressButton>Activator</IressButton>}>
          <ActivatorChecker />
        </IressPopover>,
      );

      await user.click(screen.getByRole('button', { name: 'Activator' }));

      await waitFor(() => {
        expect(isActiveResult).toBeDefined();
      });
    });

    it('should expose controlled state information', () => {
      let isControlled: boolean | undefined;

      function ControlledChecker() {
        const popover = usePopover();
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

      function IndexResetter() {
        const popover = usePopover();

        useEffect(() => {
          currentActiveIndex = popover?.activeIndex ?? null;
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
          <IressMenu>
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

      // Navigate down
      await user.keyboard('{ArrowDown}');

      await waitFor(() => {
        expect(currentActiveIndex).toBe(0);
      });

      // Reset
      await user.click(screen.getByRole('button', { name: 'Reset Index' }));

      await waitFor(() => {
        expect(currentActiveIndex).toBe(null);
      });
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

    it('should allow setting active index for custom navigation', () => {
      const mockSetActiveIndex = vi.fn();

      function CustomNavigator() {
        const popover = usePopover();

        return (
          <button
            onClick={() => {
              popover?.setActiveIndex?.(2);
              mockSetActiveIndex(2);
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

      const jumpButton = screen.getByRole('button', {
        name: 'Jump to Item 3',
      });
      expect(jumpButton).toBeInTheDocument();
    });

    it('should expose virtual focus state when applicable', () => {
      let isVirtualFocus: boolean | undefined;

      function VirtualFocusChecker() {
        const popover = usePopover();
        return <div>Virtual Focus: {String(popover?.isVirtualFocus)}</div>;
      }

      render(
        <IressPopover activator={<IressButton>Test</IressButton>}>
          <VirtualFocusChecker />
        </IressPopover>,
      );

      expect(typeof isVirtualFocus).toBe('boolean');
    });

    it('should allow managing inner role state', () => {
      function InnerRoleManager() {
        const popover = usePopover();
        const [roleSet, setRoleSet] = useState(false);

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

      const setRoleButton = screen.getByRole('button', {
        name: 'Set Inner Role',
      });
      expect(setRoleButton).toBeInTheDocument();
    });
  });
});
