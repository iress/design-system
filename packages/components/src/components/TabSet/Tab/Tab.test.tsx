import { RenderResult, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { vi } from 'vitest';
import { IressTab, IressTabProps } from '..';
import styles from './Tab.module.scss';
import userEvent from '@testing-library/user-event';
import { IressTabSet } from '../TabSet';

const TEST_ID = 'test-component';
const LABEL = 'label';

function renderComponent(
  props: Partial<IressTabProps> = {},
  renderFn: typeof render = render,
): RenderResult {
  return renderFn(
    <IressTab {...props} data-testid={TEST_ID} label={props.label ?? LABEL} />,
  );
}

describe('IressTab', () => {
  it('renders the component with the correct text and classes', () => {
    const screen = renderComponent({
      children: 'Label',
      className: 'test-class',
    });

    const button = screen.getByRole('button', { name: LABEL });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(`test-class ${styles.tab}`);
    expect(button).toHaveAttribute('type', 'button');
  });

  it('renders the component with the correct data-testid', () => {
    const screen = renderComponent({
      children: 'Label',
      className: 'test-class',
    });

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
  });

  describe('props', () => {
    describe('active', () => {
      it('sets the tab to active', () => {
        const screen = renderComponent({
          active: true,
        });

        const button = screen.getByRole('button');
        expect(button).toHaveClass(styles.active);
      });
    });
  });

  describe('keyboard navigation with inputs', () => {
    it('should not trigger tab navigation when arrow keys are pressed inside an input', async () => {
      const onChange = vi.fn();
      const screen = render(
        <IressTabSet onChange={onChange}>
          <IressTab label="Tab 1" value="tab-1">
            <input data-testid="input-1" type="text" />
          </IressTab>
          <IressTab label="Tab 2" value="tab-2">
            <input data-testid="input-2" type="text" />
          </IressTab>
        </IressTabSet>,
      );

      const tabs = screen.getAllByRole('tab');
      const input = screen.getByTestId('input-1');

      // Focus on the input inside the first tab
      await userEvent.click(input);
      expect(input).toHaveFocus();

      // Press arrow keys - these should NOT trigger tab navigation
      await userEvent.keyboard('a{ArrowLeft}{ArrowRight}');

      // Verify that onChange was not called (no tab navigation occurred)
      expect(onChange).not.toHaveBeenCalled();

      // Verify the first tab is still selected
      expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
      expect(tabs[1]).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent({
        children: 'Label',
      });
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
