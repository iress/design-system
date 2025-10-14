import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressValidationMessage } from '..';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';

import styles from '../ValidationMessage.module.scss';
import { ValidationBase } from './ValidationBase';
import { GlobalCSSClass, SYSTEM_VALIDATION_STATUSES } from '@/main';

describe('ValidationBase', () => {
  it('should render the component with the correct text and classes', () => {
    render(
      <ValidationBase data-testid="test-component" className="test-class">
        Test message
      </ValidationBase>,
    );

    const component = screen.getByTestId('test-component');
    screen.getByText('Test message');
    expect(component).toHaveClass('test-class');
    expect(component).toHaveClass(styles.validationMessage);
    expect(component).toHaveClass(styles.danger);
    expect(component.tagName).equals('DIV');
  });

  it('should render the component with the correct testids', () => {
    render(
      <IressValidationMessage data-testid="test-component">
        Test message
      </IressValidationMessage>,
    );

    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });

  describe('props', () => {
    describe('status', () => {
      SYSTEM_VALIDATION_STATUSES.forEach((status) => {
        it(`renders a ${status} message`, () => {
          render(
            <IressValidationMessage
              status={status}
              data-testid="test-component"
            >
              Test message
            </IressValidationMessage>,
          );

          const statusMessage =
            status === 'danger' ? 'Error' : capitalizeFirstLetter(status);
          const component = screen.getByTestId('test-component');
          screen.getByText(`${statusMessage}:`);
          expect(component).toHaveClass(styles[status]);
        });
      });
    });

    describe('visiblePrefix', () => {
      it('hides prefix when visiblePrefix is false', () => {
        render(<IressValidationMessage>Test message</IressValidationMessage>);
        const prefix = screen.getByText('Error:');
        expect(prefix).toHaveClass(GlobalCSSClass.SROnly);
      });

      it('shows prefix when visiblePrefix is true', () => {
        render(
          <IressValidationMessage visiblePrefix>
            Test message
          </IressValidationMessage>,
        );
        const prefix = screen.getByText('Error:');
        expect(prefix).not.toHaveClass(GlobalCSSClass.SROnly);
      });
    });

    describe('prefix', () => {
      it('renders supplied string and not the standard prefix', () => {
        const { getByText } = render(
          <IressValidationMessage prefix="Test prefix content">
            Test message
          </IressValidationMessage>,
        );

        getByText('Test prefix content');
        expect(screen.queryByText('Error: ')).not.toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const { container } = render(
        <IressValidationMessage
          data-testid="test-component"
          className="test-class"
        >
          Label content
        </IressValidationMessage>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
