import { render, act } from '@testing-library/react';
import { IressPopover } from '../Popover';
import { IressButton } from '../../Button';
import { IressText } from '../../Text';

describe('PopoverContent Accessibility', () => {
  beforeEach(() => {
    // Clear any existing focus guards from previous tests
    document
      .querySelectorAll('[data-floating-ui-focus-guard]')
      .forEach((el) => {
        el.remove();
      });
  });

  it('should set tabIndex=-1 on floating-ui focus guards to fix accessibility issue', async () => {
    render(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        defaultShow={true}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    // Floating UI flushing: https://floating-ui.com/docs/react#testing
    await act(async () => {});

    // Wait for the focus guards to be created and our useEffect to run
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    // Check that all floating-ui focus guards with aria-hidden="true" have tabIndex="-1"
    const focusGuards = document.querySelectorAll(
      '[data-floating-ui-focus-guard][aria-hidden="true"]',
    );

    focusGuards.forEach((guard) => {
      expect(guard).toHaveAttribute('tabindex', '-1');
    });
  });

  it('should handle dynamically added focus guards via MutationObserver', async () => {
    render(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        defaultShow={true}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    // Floating UI flushing
    await act(async () => {});

    // Wait for initial focus guards and useEffect
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Simulate dynamically added focus guard
    await act(async () => {
      const dynamicFocusGuard = document.createElement('span');
      dynamicFocusGuard.setAttribute('data-floating-ui-focus-guard', '');
      dynamicFocusGuard.setAttribute('aria-hidden', 'true');
      dynamicFocusGuard.setAttribute('data-type', 'outside');
      dynamicFocusGuard.tabIndex = 0; // Start with focusable state
      document.body.appendChild(dynamicFocusGuard);

      // Wait for MutationObserver to process the change
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Check that the dynamically added guard also has tabIndex="-1"
    const dynamicGuards = document.querySelectorAll(
      '[data-type="outside"][data-floating-ui-focus-guard][aria-hidden="true"]',
    );

    expect(dynamicGuards.length).toBeGreaterThan(0);
    dynamicGuards.forEach((guard) => {
      expect(guard).toHaveAttribute('tabindex', '-1');
    });
  });

  it('should only modify focus guards when popover is shown', async () => {
    const { rerender } = render(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        show={false}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    // Create a focus guard manually when popover is hidden
    const focusGuard = document.createElement('span');
    focusGuard.setAttribute('data-floating-ui-focus-guard', '');
    focusGuard.setAttribute('aria-hidden', 'true');
    focusGuard.tabIndex = 0; // Start focusable
    document.body.appendChild(focusGuard);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Should still be focusable since popover is not shown
    expect(focusGuard.tabIndex).toBe(0);

    // Now show the popover
    rerender(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        show={true}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Now should be non-focusable
    expect(focusGuard.tabIndex).toBe(-1);
  });

  it('should not modify focus guards that do not have aria-hidden="true"', async () => {
    render(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        defaultShow={true}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    // Create a focus guard without aria-hidden
    const focusGuardWithoutAriaHidden = document.createElement('span');
    focusGuardWithoutAriaHidden.setAttribute(
      'data-floating-ui-focus-guard',
      '',
    );
    focusGuardWithoutAriaHidden.tabIndex = 0;
    document.body.appendChild(focusGuardWithoutAriaHidden);

    // Create a focus guard with aria-hidden="false"
    const focusGuardAriaHiddenFalse = document.createElement('span');
    focusGuardAriaHiddenFalse.setAttribute('data-floating-ui-focus-guard', '');
    focusGuardAriaHiddenFalse.setAttribute('aria-hidden', 'false');
    focusGuardAriaHiddenFalse.tabIndex = 0;
    document.body.appendChild(focusGuardAriaHiddenFalse);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // These should remain focusable
    expect(focusGuardWithoutAriaHidden.tabIndex).toBe(0);
    expect(focusGuardAriaHiddenFalse.tabIndex).toBe(0);
  });

  it('should not process focus guards when popover is unmounted', async () => {
    const { unmount } = render(
      <IressPopover
        activator={<IressButton>Click me</IressButton>}
        show={true}
        container={document.body}
      >
        <IressText>Popover content</IressText>
      </IressPopover>,
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Unmount the popover
    unmount();

    // Create a focus guard after unmounting
    const focusGuardAfterUnmount = document.createElement('span');
    focusGuardAfterUnmount.setAttribute('data-floating-ui-focus-guard', '');
    focusGuardAfterUnmount.setAttribute('aria-hidden', 'true');
    focusGuardAfterUnmount.tabIndex = 0;
    document.body.appendChild(focusGuardAfterUnmount);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    // Should still be focusable since the observer was cleaned up
    expect(focusGuardAfterUnmount.tabIndex).toBe(0);
  });
});
