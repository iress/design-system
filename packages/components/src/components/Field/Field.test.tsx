import { render } from '@testing-library/react';
import {
  GlobalCSSClass,
  IressField,
  IressFieldProps,
  IressInput,
} from '@/main';
import { axe } from 'jest-axe';
import { field } from './Field.styles';

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

    const fieldElement = screen.getByTestId(TEST_ID);
    const label = screen.getByText(TEST_LABEL);
    const input = screen.getByRole('textbox', { name: TEST_LABEL });

    expect(fieldElement).toHaveClass(
      field().root!,
      GlobalCSSClass.Field,
      'hash-brown',
    );
    expect(input).toBeInTheDocument();

    expect(label.closest('label')).toHaveClass(field().label!);

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

    describe('required', () => {
      it('renders the field as required', () => {
        const screen = renderComponent({
          required: true,
        });

        const input = screen.getByRole('textbox', {
          name: `Required${TEST_LABEL}`,
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

    it('renders label with hint icon inline when horizontal and hint are both provided', () => {
      const hintText = 'This is helpful hint text';
      const screen = renderComponent({
        hint: hintText,
        horizontal: true,
      });

      const label = screen.getByText(TEST_LABEL);
      const infoIcon = screen.getByLabelText('More information');

      expect(label).toBeInTheDocument();
      expect(infoIcon).toBeInTheDocument();

      const labelElement = label.closest('label');
      expect(labelElement).toContainElement(infoIcon);
    });

    describe('removeErrorMargin', () => {
      it('applies compact margin when removeErrorMargin is true', () => {
        const screen = renderComponent({
          removeErrorMargin: true,
        });

        const fieldElement = screen.getByTestId(TEST_ID);
        const expectedClasses = field({ removeErrorMargin: true }).root!;

        expect(fieldElement).toHaveClass(expectedClasses);
      });

      it('retains default margin when removeErrorMargin is false or not provided', () => {
        const screen = renderComponent({
          removeErrorMargin: false,
        });

        const fieldElement = screen.getByTestId(TEST_ID);
        const expectedClasses = field({ removeErrorMargin: false }).root!;

        expect(fieldElement).toHaveClass(expectedClasses);
      });
    });
  });

  describe('horizontal layout', () => {
    it('applies horizontal styles when horizontal prop is true', () => {
      const screen = renderComponent({
        horizontal: true,
      });

      const fieldElement = screen.getByTestId(TEST_ID);
      const styles = field({ horizontal: true });
      expect(fieldElement).toHaveClass(styles.root!);
    });

    it('does not apply horizontal styles when horizontal prop is false', () => {
      const screen = renderComponent({
        horizontal: false,
      });

      const fieldElement = screen.getByTestId(TEST_ID);
      const styles = field({ horizontal: false });
      expect(fieldElement).toHaveClass(styles.root!);
    });

    it('applies custom label width when labelWidth prop is provided in horizontal mode', () => {
      const customWidth = '200px';
      const screen = renderComponent({
        horizontal: true,
        labelWidth: customWidth,
      });

      const fieldElement = screen.getByTestId(TEST_ID);

      expect(fieldElement).toHaveStyle({
        gridTemplateColumns: `${customWidth} 1fr`,
      });
    });

    it('uses default grid columns when labelWidth is not provided in horizontal mode', () => {
      const screen = renderComponent({
        horizontal: true,
      });

      const fieldElement = screen.getByTestId(TEST_ID);
      console.log(fieldElement.getAttribute('style'));

      expect(fieldElement).not.toHaveAttribute('style');
    });

    it('does not apply custom label width when not in horizontal mode', () => {
      const customWidth = '200px';
      const screen = renderComponent({
        horizontal: false,
        labelWidth: customWidth,
      });

      const fieldElement = screen.getByTestId(TEST_ID);
      expect(fieldElement).not.toHaveStyle({
        gridTemplateColumns: `${customWidth} 1fr`,
      });
    });

    it('renders label and field containers with correct CSS grid areas in horizontal mode', () => {
      const screen = renderComponent({
        horizontal: true,
      });

      const fieldElement = screen.getByTestId(TEST_ID);
      const styles = field({ horizontal: true });

      expect(fieldElement).toHaveClass(styles.root!);
    });

    it('accepts different CSS units for labelWidth', () => {
      const testCases = ['200px', '20%', '10rem', 'auto', 'max-content'];

      testCases.forEach((width) => {
        const screen = renderComponent({
          horizontal: true,
          labelWidth: width,
          'data-testid': `${TEST_ID}-${width}`,
        });

        const fieldElement = screen.getByTestId(`${TEST_ID}-${width}`);
        expect(fieldElement).toHaveStyle({
          gridTemplateColumns: `${width} 1fr`,
        });
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

  describe('hint functionality', () => {
    it('renders hint text in vertical mode (default)', () => {
      const hintText = 'This is helpful hint text';
      const screen = renderComponent({
        hint: hintText,
      });

      const hint = screen.getByTestId(`${TEST_ID}__hint`);
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent(hintText);

      expect(
        screen.queryByLabelText('More information'),
      ).not.toBeInTheDocument();
    });

    it('renders hint as tooltip with info icon in horizontal mode', () => {
      const hintText = 'This is helpful hint text';
      const screen = renderComponent({
        hint: hintText,
        horizontal: true,
      });

      expect(screen.queryByTestId(`${TEST_ID}__hint`)).not.toBeInTheDocument();

      const infoIcon = screen.getByLabelText('More information');
      expect(infoIcon).toBeInTheDocument();
    });

    it('does not render hint when hint prop is not provided', () => {
      const screen = renderComponent({
        horizontal: true,
      });

      expect(screen.queryByTestId(`${TEST_ID}__hint`)).not.toBeInTheDocument();
      expect(
        screen.queryByLabelText('More information'),
      ).not.toBeInTheDocument();
    });

    it('renders hint text when horizontal is false even if labelWidth is provided', () => {
      const hintText = 'This is helpful hint text';
      const screen = renderComponent({
        hint: hintText,
        horizontal: false,
        labelWidth: '200px',
      });

      const hint = screen.getByTestId(`${TEST_ID}__hint`);
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent(hintText);

      expect(
        screen.queryByLabelText('More information'),
      ).not.toBeInTheDocument();
    });
  });
});
