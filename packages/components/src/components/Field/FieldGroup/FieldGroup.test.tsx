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
    describe('label, hint and input spacing', () => {
      it('uses spacing.2 between legend label and fields when hint is not present', () => {
        const styles = fieldGroup.raw({});

        expect(styles.legend?.mb).toBe('spacing.2');
      });

      it('uses spacing.1 between legend label and hint and between hint and fields when hint is present', () => {
        const styles = fieldGroup.raw({ hasHint: true });

        expect(styles.hint?.mt).toBe('spacing.1');
        expect(styles.legend?.mb).toBe('spacing.1');
      });
    });

    describe('checkbox and radio group spacing', () => {
      it('adds top spacing for direct checkbox/radio controls', () => {
        const styles = fieldGroup.raw({});

        expect(
          styles.fields?.[
            '& > .ids-radio-group:first-child, & > .ids-checkbox-group:first-child, & > .ids-checkbox:first-child'
          ],
        ).toEqual({
          mt: 'spacing.1',
        });
      });
    });

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
          name: `Required${TEST_LABEL}`,
        });
        expect(field).toBeInTheDocument();
      });
    });

    describe('removeErrorMargin', () => {
      it('applies the removeErrorMargin class when true', () => {
        const screen = renderComponent({
          removeErrorMargin: true,
        });

        const field = screen.getByRole('group');
        expect(field).toHaveClass(
          fieldGroup({ removeErrorMargin: true }).root!,
        );
        expect(field).not.toHaveClass(
          fieldGroup({ removeErrorMargin: false }).root!,
        );
      });

      it('applies the default (false) class when removeErrorMargin is not set', () => {
        const screen = renderComponent();

        const field = screen.getByRole('group');
        expect(field).toHaveClass(
          fieldGroup({ removeErrorMargin: false }).root!,
        );
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
