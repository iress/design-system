import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ALERT_ICONS, IressAlert } from '.';
import styles from './Alert.module.scss';
import { SYSTEM_VALIDATION_STATUSES } from '@/main';

describe('IressAlert', () => {
  describe('Default rendering', () => {
    it('should render the component with the correct content and classes', () => {
      const { getByTestId, getByText } = render(
        <IressAlert data-testid="test-component" className="test-class">
          Content
        </IressAlert>,
      );

      getByText('Content');
      const component = getByTestId('test-component');
      expect(component).toHaveClass(`test-class ${styles.alert}`);
    });

    it('renders an info alert by default', () => {
      const { getByTestId } = render(
        <IressAlert data-testid="test-component" />,
      );

      const component = getByTestId('test-component');
      expect(component).toHaveClass(styles.info);
    });

    it('renders no heading and no footer by default', () => {
      const { getByTestId } = render(
        <IressAlert data-testid="test-component" />,
      );

      const component = getByTestId('test-component');
      expect(component.querySelector(`.${styles.heading}`)).toBe(null);
      expect(component.querySelector(`.${styles.footer}`)).toBe(null);
    });

    it('renders with the correct data-testids', () => {
      const screen = render(
        <IressAlert
          data-testid="test-component"
          className="test-class"
          heading="Heading"
        >
          Content
        </IressAlert>,
      );

      expect(screen.getByTestId('test-component')).toBeInTheDocument();
      expect(screen.getByTestId('test-component__heading')).toBeInTheDocument();
    });
  });

  describe('footer', () => {
    it('should render the footer content when the footer prop is set', () => {
      const { getByTestId } = render(
        <IressAlert
          data-testid="test-component"
          footer={<span data-testid="footer">Footer content</span>}
        />,
      );

      const component = getByTestId('test-component');
      expect(component.querySelector(`.${styles.footer}`)).toBeInTheDocument();
      getByTestId('footer');
    });
  });

  describe('headings', () => {
    it(`renders the node directly if a node is passed to the heading prop`, () => {
      const screen = render(
        <IressAlert
          heading={<span data-testid="custom-heading">Heading</span>}
        />,
      );

      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByTestId('custom-heading')).toHaveTextContent('Heading');
    });
  });

  describe('status', () => {
    const statusArr = SYSTEM_VALIDATION_STATUSES.map((status) => [
      status,
      status,
    ]);
    it.each(statusArr)(
      'renders a %s alert if the status is set to %s',
      (status) => {
        const { getByTestId, getByRole } = render(
          <IressAlert data-testid="test-component" status={status} />,
        );

        const component = getByTestId('test-component');
        expect(component).toHaveClass(styles[status]);
        const icon = getByRole('img');
        expect(icon).toHaveAttribute('aria-label', `${status}: `);
        expect(icon).toHaveClass(`fa-${ALERT_ICONS[status]}`);
      },
    );
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <>
          <IressAlert>Content</IressAlert>
          <IressAlert heading="This is a heading">With heading</IressAlert>
        </>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
