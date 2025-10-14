import { render, screen } from '@testing-library/react';
import { capitalizeFirstLetter } from '@helpers/formatting/capitalizeFirstLetter';
import { IressValidationSummary } from './ValidationSummary';
import { GlobalCSSClass, SYSTEM_VALIDATION_STATUSES } from '@/main';
import { css } from '@/styled-system/css';

describe('IressValidationSummary', () => {
  describe('basic', () => {
    it('should render the component with the correct text and classes', () => {
      const { getByTestId, getByText } = render(
        <IressValidationSummary
          data-testid="test-component"
          className="test-class"
          messages={[
            {
              message: 'Test error message',
              dataTestId: 'test-message',
            },
          ]}
        />,
      );

      const component = getByTestId('test-component');

      getByTestId('test-message');
      getByText('Test error message');

      expect(component).toHaveClass(
        'test-class',
        css({ listStyle: 'none', m: 'spacing.000', p: 'spacing.000' }),
        GlobalCSSClass.ValidationSummary,
      );
    });
  });

  describe('props', () => {
    describe('status', () => {
      SYSTEM_VALIDATION_STATUSES.forEach((status) => {
        it(`renders a ${status} message`, () => {
          const { getByText, getByTestId } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              status={status}
              messages={[
                {
                  message: 'Test error message',
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );

          getByTestId('test-message');
          const statusMessage =
            status === 'danger' ? 'Error' : capitalizeFirstLetter(status);

          const prefix = getByText(`${statusMessage}:`);
          expect(prefix).toBeInTheDocument();
        });
      });
    });
    describe('linkToTarget', () => {
      it('renders a link when linkToTarget is true', () => {
        const { getByRole } = render(
          <IressValidationSummary
            data-testid="test-component"
            linkToTarget="test-target"
            className="test-class"
            messages={[
              {
                message: 'Test error message',
                dataTestId: 'test-message',
              },
            ]}
          />,
        );
        expect(
          getByRole('link', { name: 'Error: Test error message' }),
        ).toBeInTheDocument();
      });
    });

    describe('visiblePrefix', () => {
      it('shows prefix when visiblePrefix is true', () => {
        const { container } = render(
          <IressValidationSummary
            visiblePrefix
            messages={[
              {
                message: 'Test error message',
                dataTestId: 'test-message',
              },
            ]}
          />,
        );
        const prefix = container.querySelectorAll(`.${css({ srOnly: true })}`);
        expect(prefix).toHaveLength(0);
      });
    });

    describe('prefix', () => {
      it('renders supplied string and not the standard prefix', () => {
        const { getByText } = render(
          <IressValidationSummary
            prefix="Test prefix content"
            messages={[
              {
                message: 'Test error message',
                dataTestId: 'test-message',
              },
            ]}
          />,
        );

        getByText('Test prefix content');
        const defaultPrefix = screen.queryByText('Error: ');
        expect(defaultPrefix).toBeNull();
      });

      it('renders supplied JSX and not the standard prefix', () => {
        const { getByText, getByTestId } = render(
          <IressValidationSummary
            prefix={<div data-testid="test-prefix">Test prefix content</div>}
            messages={[
              {
                message: 'Test error message',
                dataTestId: 'test-message',
              },
            ]}
          />,
        );

        getByTestId('test-prefix');
        getByText('Test prefix content');
        const defaultPrefix = screen.queryByText('Error: ');
        expect(defaultPrefix).toBeNull();
      });
    });

    describe('message (array)', () => {
      describe('linkToTarget', () => {
        it('renders a link when linkToTarget is true in message obj', () => {
          const { getByRole } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              messages={[
                {
                  message: 'Test error message',
                  linkToTarget: 'test-target',
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );

          expect(
            getByRole('link', { name: 'Error: Test error message' }),
          ).toBeInTheDocument();
        });
      });

      describe('targetId', () => {
        it('href is set to targetId', () => {
          const { getByRole } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              messages={[
                {
                  message: 'Test error message',
                  linkToTarget: 'test-id',
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );
          const anchor = getByRole('link', {
            name: 'Error: Test error message',
          });
          expect(anchor.getAttribute('href')).toEqual('#test-id');
        });
      });

      describe('status', () => {
        SYSTEM_VALIDATION_STATUSES.forEach((status) => {
          it(`renders a ${status} message`, () => {
            const { getByText, getByTestId } = render(
              <IressValidationSummary
                data-testid="test-component"
                className="test-class"
                messages={[
                  {
                    message: 'Test error message',
                    status,
                    dataTestId: 'test-message',
                  },
                ]}
              />,
            );

            getByTestId('test-message');
            const statusMessage =
              status === 'danger' ? 'Error' : capitalizeFirstLetter(status);
            const message = getByText(`${statusMessage}:`);
            expect(message).toBeInTheDocument();
          });
        });
      });
      describe('visiblePrefix', () => {
        it('shows prefix when visiblePrefix is true', () => {
          const { container } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              messages={[
                {
                  message: 'Test error message',
                  visiblePrefix: true,
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );
          const prefix = container.querySelectorAll(
            `.${css({ srOnly: true })}`,
          );
          expect(prefix).toHaveLength(0);
        });
      });

      describe('prefix', () => {
        it('renders supplied string and not the standard prefix', () => {
          const { getByText } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              messages={[
                {
                  message: 'Test error message',
                  prefix: 'Test prefix content',
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );

          getByText('Test prefix content');
          const defaultPrefix = screen.queryByText('Error: ');
          expect(defaultPrefix).toBeNull();
        });

        it('renders supplied JSX and not the standard prefix', () => {
          const { getByText, getByTestId } = render(
            <IressValidationSummary
              data-testid="test-component"
              className="test-class"
              messages={[
                {
                  message: 'Test error message',
                  prefix: (
                    <div data-testid="test-prefix">Test prefix content</div>
                  ),
                  dataTestId: 'test-message',
                },
              ]}
            />,
          );

          getByTestId('test-prefix');
          getByText('Test prefix content');
          const defaultPrefix = screen.queryByText('Error: ');
          expect(defaultPrefix).toBeNull();
        });
      });
    });
  });
});
