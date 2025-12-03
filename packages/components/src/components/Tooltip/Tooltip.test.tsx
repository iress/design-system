import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressTooltip, type IressTooltipProps } from '.';
import { IressButton } from '../Button';
import styles from './Tooltip.module.scss';
import { idsLogger } from '@/helpers/utility/idsLogger';

const TEST_ID = 'test-component';
const TEST_TEXT = 'Test text';
const TEST_DIV_CHILD = <div>Div child</div>;

const renderComponent = (
  props: Omit<IressTooltipProps, 'children'> = { tooltipText: TEST_TEXT },
  child: React.ReactNode = <IressButton>Button child</IressButton>,
) => {
  return render(
    <IressTooltip {...props} data-testid={TEST_ID}>
      {child}
    </IressTooltip>,
  );
};

describe('IressTooltip', () => {
  describe('default props', () => {
    it('renders the correct classes', () => {
      const screen = renderComponent();
      expect(screen.getByTestId(TEST_ID)).toHaveClass(styles.tooltip);
    });
  });

  describe('custom props', () => {
    it('renders content passed in the tooltipText prop', () => {
      const screen = renderComponent({
        open: true,
        tooltipText: TEST_TEXT,
      });

      const tooltipContent = screen.getByTestId(`${TEST_ID}__tooltip-text`);
      expect(tooltipContent).toHaveTextContent(TEST_TEXT);
    });

    it('renders tooltipText on a single line if it is passed as a string', () => {
      const screen = renderComponent({
        open: true,
        tooltipText: 'single line text',
      });

      expect(screen.getByTestId(`${TEST_ID}__tooltip-text`)).toHaveTextContent(
        'single line text',
      );
    });

    it('renders tooltipText on multiple lines if is passed as an array', () => {
      const screen = renderComponent({
        open: true,
        tooltipText: ['multi ', ' line ', ' text'],
      });

      expect(screen.getByTestId(`${TEST_ID}__tooltip-text`).innerHTML).toBe(
        'multi <br> line <br> text',
      );
    });

    it('sets the correct data-testids', () => {
      const screen = renderComponent({
        open: true,
        tooltipText: TEST_TEXT,
        'data-testid': TEST_ID,
      });

      expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
      expect(screen.getByTestId(`${TEST_ID}__activator`)).toBeInTheDocument();
      expect(
        screen.getByTestId(`${TEST_ID}__tooltip-text`),
      ).toBeInTheDocument();
    });
  });

  describe('children', () => {
    it('renders a button', () => {
      const screen = renderComponent({
        tooltipText: TEST_TEXT,
      });

      expect(
        screen.getByRole('button', { name: 'Button child' }),
      ).toBeInTheDocument();
    });

    it('renders a div', () => {
      const screen = renderComponent(
        {
          tooltipText: TEST_TEXT,
        },
        TEST_DIV_CHILD,
      );

      const activator = screen.getByTestId(`${TEST_ID}__activator`);
      expect(activator).toHaveTextContent('Div child');
    });
  });

  describe('warnings', () => {
    // We need this warning, for two reasons:
    // 1. It's a good practice to warn the developer when they are not following a best practice for WCAG
    // 2. If they use IressIcon directly, it inherits the text colour from the IressTooltip, which means the icon will be white on white in many cases
    it('logs a warning if a user does not use a focusable element inside the tooltip', () => {
      renderComponent(
        {
          tooltipText: TEST_TEXT,
        },
        'Not a focusable element',
      );

      expect(idsLogger).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = renderComponent({
        tooltipText: TEST_TEXT,
      });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
