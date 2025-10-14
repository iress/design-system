import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressAlert, alert as alertStyles } from '.';
import { GlobalCSSClass } from '@/enums';
import { SYSTEM_VALIDATION_STATUSES } from '@/constants';
import { SystemValidationStatuses } from '@/types';
import { IressIconProps } from '../Icon';

const ALERT_ICONS: Record<SystemValidationStatuses, IressIconProps['name']> = {
  danger: 'ban',
  info: 'info-square',
  success: 'check',
  warning: 'exclamation-triangle',
};

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
      expect(component).toHaveClass(
        alertStyles({ status: 'info' }).alert!,
        GlobalCSSClass.Alert,
      );
    });

    it('renders an info alert by default', () => {
      const { getByTestId } = render(
        <IressAlert data-testid="test-component" />,
      );

      const component = getByTestId('test-component');
      expect(component).toHaveClass(
        'bd-c_colour.system.info.fill bg-c_colour.system.info.surface',
      );
    });

    it('renders no heading and no footer by default', () => {
      const screen = render(<IressAlert data-testid="test-component" />);

      expect(
        screen.queryByTestId('test-component__heading'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('test-component__footer'),
      ).not.toBeInTheDocument();
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
    describe('footer', () => {
      it('should not render footer when footer prop is undefined', () => {
        const screen = render(
          <IressAlert data-testid="test-component">Content</IressAlert>,
        );
        expect(
          screen.queryByTestId('test-component__footer'),
        ).not.toBeInTheDocument();
      });

      it('renders footer content with correct classes', () => {
        const screen = render(
          <IressAlert
            data-testid="test-component"
            footer={
              <div data-testid="footer">
                <button>Action</button>
              </div>
            }
          />,
        );

        const { getByTestId, getByRole } = screen;
        const component = getByTestId('test-component');
        expect(component).toHaveClass(
          'bd-c_colour.system.info.fill bg-c_colour.system.info.surface',
        );

        const footer = getByTestId('footer');
        expect(footer).toBeInTheDocument();

        const button = getByRole('button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Action');
      });

      it('supports multiple footer elements', () => {
        const { getByRole } = render(
          <IressAlert
            footer={
              <>
                <button>Action 1</button>
                <button>Action 2</button>
              </>
            }
          />,
        );
        expect(getByRole('button', { name: 'Action 1' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Action 2' })).toBeInTheDocument();
      });
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
        expect(component).toHaveClass(
          `bd-c_colour.system.${status}.fill bg-c_colour.system.${status}.surface`,
        );
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
