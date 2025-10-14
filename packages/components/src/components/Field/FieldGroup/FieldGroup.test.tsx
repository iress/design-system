import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { IressFieldGroup, IressFieldGroupProps } from './FieldGroup';
import { GlobalCSSClass, IressField, IressInput } from '@/main';
import { fieldGroup } from './FieldGroup.styles';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Label text';

const renderComponent = ({
  children,
  label,
  ...props
}: Partial<IressFieldGroupProps> = {}) =>
  render(
    <IressFieldGroup
      {...props}
      data-testid={'data-testid' in props ? props['data-testid'] : TEST_ID}
      label={label ?? TEST_LABEL}
    >
      {children ?? [
        <IressField key="firstName" htmlFor="firstName" label="First name">
          <IressInput id="firstName" />
        </IressField>,
        <IressField key="lastName" htmlFor="lastName" label="Last name">
          <IressInput id="lastName" />
        </IressField>,
      ]}
    </IressFieldGroup>,
  );

describe('IressFieldGroup', () => {
  it('renders with defaults and consumer class', () => {
    const screen = renderComponent({
      className: 'hash-brown',
    });

    const field = screen.getByRole('group', { name: TEST_LABEL });
    expect(field).toHaveClass(
      fieldGroup().root!,
      'hash-brown',
      GlobalCSSClass.FieldGroup,
    );

    const legend = screen.getByText(TEST_LABEL);
    expect(legend.closest('legend')).toHaveClass(fieldGroup().legend!);

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
    expect(screen.getByTestId(`${TEST_ID}__legend__text`)).toBeInTheDocument();
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

  describe('props', () => {
    describe('hiddenLabel', () => {
      it('has a label accessible for screen readers', () => {
        const screen = renderComponent({
          hiddenLabel: true,
        });

        const field = screen.getByRole('group', { name: TEST_LABEL });
        expect(field).toBeInTheDocument();
      });
    });

    describe('inline', () => {
      it('adds the inline class', () => {
        const screen = renderComponent({
          inline: true,
        });

        const field = screen.getByRole('group');
        expect(field).toHaveClass(fieldGroup({ inline: true }).root!);
      });
    });

    describe('join', () => {
      it('adds the join class', () => {
        const screen = renderComponent({
          join: true,
        });

        const field = screen.getByRole('group');
        expect(field).toHaveClass(fieldGroup({ join: true }).root!);
      });
    });

    describe('required', () => {
      it('renders the field as required', () => {
        const screen = renderComponent({
          required: true,
        });

        const field = screen.getByRole('group', {
          name: `Required ${TEST_LABEL}`,
        });
        expect(field).toBeInTheDocument();
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
