import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import {
  GlobalCSSClass,
  IressValidationMessage,
  SYSTEM_VALIDATION_STATUSES,
} from '@/main';
import { css } from '@/styled-system/css';
import userEvent from '@testing-library/user-event';

describe('ValidationMessage', () => {
  it('should render the component with the correct text and classes', () => {
    render(
      <IressValidationMessage
        data-testid="test-component"
        className="test-class"
      >
        Test message
      </IressValidationMessage>,
    );

    const component = screen.getByTestId('test-component');
    screen.getByText('Test message');
    expect(component).toHaveClass(
      'test-class',
      css({ color: 'colour.system.danger.text' }),
      GlobalCSSClass.ValidationMessage,
    );
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
    describe('linkToTarget & targetId', () => {
      it('href is set to targetId', () => {
        render(
          <IressValidationMessage linkToTarget="test-id">
            Test message
          </IressValidationMessage>,
        );
        const anchor = screen.getByRole('link', {
          name: 'Error: Test message',
        });
        expect(anchor.getAttribute('href')).toEqual('#test-id');
      });
    });

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
          expect(component).toHaveClass(
            css({ color: `colour.system.${status}.text` }),
          );
        });
      });
    });

    describe('visiblePrefix', () => {
      it('hides prefix when visiblePrefix is false', () => {
        render(<IressValidationMessage>Test message</IressValidationMessage>);
        const prefix = screen.getByText('Error:');
        expect(prefix).toHaveClass(css({ srOnly: true }));
      });

      it('shows prefix when visiblePrefix is true', () => {
        render(
          <IressValidationMessage visiblePrefix>
            Test message
          </IressValidationMessage>,
        );
        const prefix = screen.getByText('Error:');
        expect(prefix).not.toHaveClass(css({ srOnly: true }));
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

  describe('interactions', () => {
    it('focuses on the input it is linked to', async () => {
      render(
        <>
          <IressValidationMessage linkToTarget="test-id">
            Test message
          </IressValidationMessage>
          <input id="test-id" />
        </>,
      );

      await userEvent.click(screen.getByRole('link'));

      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('focuses on the div it is linked to', async () => {
      render(
        <>
          <IressValidationMessage linkToTarget="test-id">
            Test message
          </IressValidationMessage>
          <div id="test-id" role="complementary" />
        </>,
      );

      await userEvent.click(screen.getByRole('link'));

      expect(screen.getByRole('complementary')).toHaveFocus();
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
