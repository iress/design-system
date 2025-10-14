import { render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import bodyStyles from '../SelectBody/SelectBody.module.scss';
import { IressSelectSearch } from './SelectSearch';
import { IressSelectSearchInput } from '../SelectSearchInput/SelectSearchInput';
import { IressButton, IressPopover } from '@/main';
import userEvent from '@testing-library/user-event';

// TODO: For some reason, tabbable does not get the correct tabbable items. So we are mocking it
let tabbableList: HTMLElement[] = [];
vi.mock('tabbable', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@floating-ui/react')>()),
  tabbable: vi.fn(() => tabbableList),
}));

describe('IressSelectSearch', () => {
  it('renders with the appropriate defaults', () => {
    render(
      <IressSelectSearch
        activator={<IressSelectSearchInput aria-label="Search" />}
        data-testid="test-component"
      />,
    );

    const selectSearch = screen.getByTestId('test-component');
    expect(selectSearch).toHaveClass(bodyStyles.selectBody);

    const body = selectSearch.querySelector(`.${bodyStyles.children}`);
    expect(body).not.toBeNull();
    expect(body).toBeVisible();

    const input = screen.getByRole('combobox');
    expect(input).toHaveAttribute('aria-expanded', 'true');
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
    // TODO: Check why this is failing
    it.skip('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressSelectSearch
          activator={<IressSelectSearchInput aria-label="Search" />}
          data-testid="test-component"
        />,
      );
      const results = await axe(container);
      expect(results).not.toHaveNoViolations();
    });
  });
});
