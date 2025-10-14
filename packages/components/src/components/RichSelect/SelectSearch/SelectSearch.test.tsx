import { act, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { selectSearch } from './SelectSearch.styles';
import { IressSelectSearch } from './SelectSearch';
import { IressSelectSearchInput } from '../SelectSearchInput/SelectSearchInput';
import { IressButton, IressPopover, IressMenu, IressMenuItem } from '@/main';
import userEvent from '@testing-library/user-event';

// TODO: For some reason, tabbable does not get the correct tabbable items. So we are mocking it
let tabbableList: HTMLElement[] = [];
vi.mock('tabbable', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@floating-ui/react')>()),
  tabbable: vi.fn(() => tabbableList),
}));

describe('IressSelectSearch', () => {
  it('renders with the appropriate defaults', () => {
    const searchClasses = selectSearch();

    render(
      <IressSelectSearch
        activator={<IressSelectSearchInput aria-label="Search" />}
        data-testid="test-component"
      />,
    );

    const selectSearchElement = screen.getByTestId('test-component');
    if (searchClasses.root) {
      expect(selectSearchElement).toHaveClass(searchClasses.root);
    }

    // The content classes are applied to the popover content element, not a nested child
    const contentElement = screen.getByTestId('test-component__content');
    if (searchClasses.content) {
      expect(contentElement).toHaveClass(searchClasses.content);
    }

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
  });

  it('applies contentStyle className when provided', () => {
    const customClassName = 'custom-content-class';
    const searchClasses = selectSearch();

    render(
      <IressSelectSearch
        activator={<IressSelectSearchInput aria-label="Search" />}
        contentStyle={{ className: customClassName }}
        data-testid="test-component"
      />,
    );

    const contentElement = screen.getByTestId('test-component__content');

    // Verify that the custom className from contentStyle is applied
    expect(contentElement).toHaveClass(customClassName);

    // Also verify other expected classes are still applied
    if (searchClasses.content) {
      expect(contentElement).toHaveClass(searchClasses.content);
    }
  });

  it('calls onKeyDown handler when provided and key is pressed', async () => {
    const mockOnKeyDown = vi.fn();

    render(
      <IressSelectSearch
        activator={<IressSelectSearchInput aria-label="Search" />}
        onKeyDown={mockOnKeyDown}
        data-testid="test-component"
      />,
    );

    const input = screen.getByRole('combobox');

    // Simulate a key press
    await userEvent.type(input, 'a');

    // Verify that the onKeyDown handler was called
    expect(mockOnKeyDown).toHaveBeenCalled();
  });

  describe('inside parent popover (nested - how its used in rich select)', () => {
    // TODO: This works in the browser, but not in the test environment. It seems like the tabbable list is not being set correctly.
    it.skip('closes the parent popover and focuses the next tabbable element when user presses tab on the input', async () => {
      render(
        <>
          <IressPopover activator={<IressButton>Hello</IressButton>}>
            <IressSelectSearch
              activator={<IressSelectSearchInput aria-label="Search" />}
            />
          </IressPopover>
          <IressButton>World</IressButton>
        </>,
      );

      const parentActivator = screen.getByRole('button', { name: 'Hello' });
      expect(parentActivator).toBeInTheDocument();

      const nextFocusableElement = screen.getByRole('button', {
        name: 'World',
      });
      expect(nextFocusableElement).toBeInTheDocument();

      // Faking the tabbable list
      tabbableList = [parentActivator, nextFocusableElement];

      await userEvent.click(parentActivator);

      const input = screen.getByRole('combobox');

      // Input should be focused on open
      await waitFor(() => expect(input).toHaveFocus());

      // Tab away
      await userEvent.tab();

      // Focused on the next tabbable element
      await waitFor(() => expect(nextFocusableElement).toHaveFocus());

      // input should be hidden (popover is closed)
      expect(input).not.toBeVisible();
    });

    it('closes the parent popover and returns focus to the parent popover activator when user presses shift+tab', async () => {
      render(
        <IressPopover activator={<IressButton>Hello</IressButton>}>
          <IressSelectSearch
            activator={<IressSelectSearchInput aria-label="Search" />}
          />
        </IressPopover>,
      );

      const parentActivator = screen.getByRole('button', { name: 'Hello' });
      expect(parentActivator).toBeInTheDocument();

      // Faking the tabbable list
      tabbableList = [parentActivator];

      await userEvent.click(parentActivator);

      const input = screen.getByRole('combobox');

      // Input should be focused on open
      await waitFor(() => expect(input).toHaveFocus());

      // Tab away
      await userEvent.tab({ shift: true });

      // Focus is back on the parent activator
      await waitFor(() => expect(parentActivator).toHaveFocus());

      // input should be hidden (popover is closed)
      expect(input).not.toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressSelectSearch
          activator={<IressSelectSearchInput aria-label="Search" />}
          data-testid="test-component"
        >
          <IressMenu aria-label="Search results">
            <IressMenuItem value="option1">Option 1</IressMenuItem>
            <IressMenuItem value="option2">Option 2</IressMenuItem>
          </IressMenu>
        </IressSelectSearch>,
      );

      // TODO: act warning only shows when running in parallel with other tests. not sure why.
      // Floating UI flushing: https://floating-ui.com/docs/react#testing
      await act(async () => {});

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('has accessible aria-controls relationship', async () => {
      render(
        <IressSelectSearch
          activator={<IressSelectSearchInput aria-label="Search" />}
          data-testid="test-component"
        >
          <IressMenu aria-label="Search results">
            <IressMenuItem value="test">Test option</IressMenuItem>
          </IressMenu>
        </IressSelectSearch>,
      );

      const input = await screen.findByRole('combobox');
      const content = screen.getByTestId('test-component__content');

      // Input should have aria-controls attribute
      expect(input).toHaveAttribute('aria-controls');
      const ariaControlsValue = input.getAttribute('aria-controls');

      // The content element should have an ID that matches the aria-controls
      expect(content).toHaveAttribute('id');
      const contentId = content.getAttribute('id');

      // Verify that the aria-controls value includes the content ID
      expect(ariaControlsValue).toContain(contentId);

      // Input should also have aria-haspopup attribute
      expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    });
  });
});
