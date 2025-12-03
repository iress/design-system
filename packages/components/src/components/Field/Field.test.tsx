import { render } from '@testing-library/react';
import styles from './Field.module.scss';
import { IressField, type IressFieldProps, IressInput } from '@/main';
import { axe } from 'jest-axe';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Label text';

const renderComponent = ({
  children,
  htmlFor,
  label,
  ...props
}: Partial<IressFieldProps> = {}) =>
  render(
    <IressField
      {...props}
      data-testid={'data-testid' in props ? props['data-testid'] : TEST_ID}
      htmlFor={htmlFor ?? TEST_ID}
      label={label ?? TEST_LABEL}
    >
      {children ?? <IressInput id={htmlFor ?? TEST_ID} />}
    </IressField>,
  );

describe('IressField', () => {
  it('renders with defaults and consumer class', () => {
    const screen = renderComponent({
      className: 'hash-brown',
    });

    const field = screen.getByTestId(TEST_ID);
    const label = screen.getByText(TEST_LABEL);
    const input = screen.getByRole('textbox', { name: TEST_LABEL });

    expect(field).toHaveClass(styles.field, 'hash-brown');
    expect(input).toBeInTheDocument();

    expect(label.closest('label')).toHaveClass(styles.label);

    expect(screen.queryByTestId(`${TEST_ID}__hint`)).not.toBeInTheDocument();
    expect(screen.queryByTestId(`${TEST_ID}__error`)).not.toBeInTheDocument();
  });

  it('renders the correct data-testids', () => {
    const screen = renderComponent({
      hint: 'Hint text',
      errorMessages: [
        {
          message: 'Error with this field',
        },
      ],
    });

    expect(screen.getByTestId(TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__label__text`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__hint`)).toBeInTheDocument();
    expect(screen.getByTestId(`${TEST_ID}__error`)).toBeInTheDocument();
  });

  it('does not render test id if not provided', () => {
    const screen = renderComponent({
      'data-testid': undefined,
      hint: 'Hint text',
      errorMessages: [
        {
          message: 'Error with this field',
        },
      ],
    });

    expect(screen.queryByTestId(TEST_ID)).toBeNull();
    expect(screen.container.querySelectorAll('[data-testid]')).toHaveLength(0);
  });

  it('automatically uses child id for htmlFor prop if provided', () => {
    const screen = render(
      <IressField label="test">
        <IressInput id="test-input" />
      </IressField>,
    );
    expect(screen.getByRole('textbox', { name: 'test' })).toBeInTheDocument();
  });

  describe('props', () => {
    describe('hiddenLabel', () => {
      it('has a label accessible for screen readers', () => {
        const screen = renderComponent({
          hiddenLabel: true,
        });

        const input = screen.getByRole('textbox', { name: TEST_LABEL });
        expect(input).toBeInTheDocument();
      });
    });

    describe('optional', () => {
      it('renders the field as optional', () => {
        const screen = renderComponent({
          optional: true,
        });

        const optional = screen.getByText('(optional)');
        expect(optional).toBeInTheDocument();
      });
    });

    describe('required', () => {
      it('renders the field as required', () => {
        const screen = renderComponent({
          required: true,
        });

        const input = screen.getByRole('textbox', {
          name: `Required ${TEST_LABEL}`,
        });
        expect(input).toBeInTheDocument();
      });

      it('does not show required when readOnly is true', () => {
        const screen = renderComponent({
          required: true,
          readOnly: true,
        });

        const input = screen.getByRole('textbox', { name: TEST_LABEL });
        expect(input).toBeInTheDocument();
        expect(screen.queryByText(/Required/)).not.toBeInTheDocument();
      });
    });
  });

  describe('accessibility', () => {
    it('should not have basic accessibility issues', async () => {
      const screen = renderComponent();
      const results = await axe(screen.container);
      expect(results).toHaveNoViolations();
    });
  });
});
