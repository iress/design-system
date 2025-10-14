import { renderHook } from '@testing-library/react';
import { usePushElement } from './usePushElement';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { GlobalCSSClass } from '@/enums';

// Mocking the breakpoint hook to return xl so push element styles are applied
vi.mock('../../../hooks/useBreakpoint', () => ({
  useBreakpoint: vi.fn(() => ({
    breakpoint: 'xl',
  })),
}));

describe('usePushElement', () => {
  let element: HTMLElement;
  const onOpen = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    element = document.createElement('div');
    element.className = 'original-class';
    element.style.transition = 'original-transition';
    document.body.appendChild(element);

    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
    }));

    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.useRealTimers();
  });

  it('should not apply styles when element is null', () => {
    renderHook(() =>
      usePushElement({
        element: null,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'initial',
        onOpen,
        onClose,
      }),
    );

    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should apply push element class but only the default styles when active is false', () => {
    renderHook(() =>
      usePushElement({
        element,
        isActive: false,
        position: 'right',
        size: 'sm',
        status: 'initial',
        onOpen,
        onClose,
      }),
    );

    expect(element).toHaveClass(GlobalCSSClass.SlideoutPushElement);
    expect(element.style.getPropertyValue('transition')).toBeTruthy();
    expect(element.style.getPropertyValue('transition')).not.toBe('none');
    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onOpen when status is open', () => {
    renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'open',
        onOpen,
        onClose,
      }),
    );

    expect(element).toHaveClass(
      'original-class',
      GlobalCSSClass.SlideoutPushElement,
      GlobalCSSClass.SlideoutOpen,
    );

    // Checks if the element is pushed correctly
    expect(element.style.getPropertyValue('margin-inline-end')).toBe(
      'var(--sizes-overlay\\.sm, 375px)',
    );

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should call onClose when status is close', () => {
    renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'close',
        onOpen,
        onClose,
      }),
    );

    expect(element).not.toHaveClass(GlobalCSSClass.SlideoutOpen);

    // Checks if the element is pushed correctly
    expect(element.style.getPropertyValue('margin-inline-end')).toBe('initial');

    expect(onOpen).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should restore element to original state on cleanup', () => {
    const { unmount } = renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'initial',
        onOpen,
        onClose,
      }),
    );

    expect(element).toHaveClass(GlobalCSSClass.SlideoutPushElement);

    unmount();

    expect(element).not.toHaveClass(GlobalCSSClass.SlideoutPushElement);
  });

  it('should call onClose when unmounted with status unmounted', () => {
    const { unmount } = renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'unmounted',
        onOpen,
        onClose,
      }),
    );

    unmount();

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(element.style.transition).toBe('original-transition');
  });

  it('should handle elements with no initial class name', () => {
    element.className = '';

    renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'initial',
        onOpen,
        onClose,
      }),
    );

    expect(element.className).toBe(GlobalCSSClass.SlideoutPushElement);
  });

  it('should use reduced motion settings when preferred', () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: true,
    }));

    renderHook(() =>
      usePushElement({
        element,
        isActive: true,
        position: 'right',
        size: 'sm',
        status: 'initial',
        onOpen,
        onClose,
      }),
    );

    expect(element.style.transition).toBe('none');
  });
});
