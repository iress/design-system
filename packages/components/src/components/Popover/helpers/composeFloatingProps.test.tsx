import { render, screen } from '@testing-library/react';
import { composePopoverFloatingProps } from './composeFloatingProps';
import {
  MOCK_FLOATING_UI_CONTEXT,
  TestPopoverProvider,
} from '../mocks/TestPopoverProvider';
import { usePopover } from '../hooks/usePopover';
import { DisplayModes } from '@/main';

const TEST_ID = 'component-using-hook';

interface HookProps {
  displayMode?: DisplayModes;
  style?: React.CSSProperties;
}

const ComponentWithFloatingProps = ({ displayMode, style }: HookProps) => {
  const popover = usePopover();

  if (!popover) return null;

  return (
    <div
      data-testid={TEST_ID}
      {...composePopoverFloatingProps(popover, displayMode, style)}
    />
  );
};

describe('composeFloatingProps', () => {
  describe('inside popover with no type', () => {
    it('returns no aria-orientation, aria-activedescendant or role by default', () => {
      render(
        <TestPopoverProvider>
          <ComponentWithFloatingProps />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element).not.toHaveAttribute('aria-activedescendant');
      expect(element).not.toHaveAttribute('aria-orientation');
      expect(element).not.toHaveAttribute('role');
    });

    it('uses styles as-is to floating ui styles for inline', () => {
      render(
        <TestPopoverProvider>
          <ComponentWithFloatingProps
            displayMode="inline"
            style={{ color: 'red' }}
          />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element.style.color).toBe('red');
      expect(element.style.position).not.toBe(
        MOCK_FLOATING_UI_CONTEXT.floatingStyles.position,
      );
    });

    it('appends styles to floating ui styles for overlay', () => {
      render(
        <TestPopoverProvider>
          <ComponentWithFloatingProps
            displayMode="overlay"
            style={{ color: 'red' }}
          />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element.style.color).toBe('red');
      expect(element.style.position).toBe(
        MOCK_FLOATING_UI_CONTEXT.floatingStyles.position,
      );
    });
  });

  describe('inside popover type=listbox', () => {
    it('returns aria-orientation and role by default', () => {
      render(
        <TestPopoverProvider type="listbox">
          <ComponentWithFloatingProps
            displayMode="inline"
            style={{ color: 'red' }}
          />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element).toHaveAttribute('aria-orientation', 'vertical');
      expect(element).toHaveAttribute('role', 'listbox');
    });
  });

  describe('inside popover type=menu', () => {
    it('returns aria-orientation and role by default', () => {
      render(
        <TestPopoverProvider type="menu">
          <ComponentWithFloatingProps
            displayMode="inline"
            style={{ color: 'red' }}
          />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element).toHaveAttribute('aria-orientation', 'vertical');
      expect(element).toHaveAttribute('role', 'menu');
    });
  });

  describe('inside popover type=dialog', () => {
    it('returns no aria-orientation and role by default', () => {
      render(
        <TestPopoverProvider type="dialog">
          <ComponentWithFloatingProps
            displayMode="inline"
            style={{ color: 'red' }}
          />
        </TestPopoverProvider>,
      );

      const element = screen.getByTestId(TEST_ID);
      expect(element).not.toHaveAttribute('aria-orientation');
      expect(element).toHaveAttribute('role', 'dialog');
    });
  });

  // onFocus and onKeyDown are tested in Popover.test.tsx, as they are based on interactions.
});
