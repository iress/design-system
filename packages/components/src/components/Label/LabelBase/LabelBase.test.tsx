import { render } from '@testing-library/react';
import { LabelBase } from './LabelBase';
import styles from '../Label.module.scss';
import { LabelBaseProps } from './LabelBase.types';
import { GlobalCSSClass } from '@/main';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Label text';

const renderComponent = ({
  children,
  ...props
}: Partial<LabelBaseProps> = {}) =>
  render(
    <LabelBase {...props} data-testid={TEST_ID}>
      {children ?? TEST_LABEL}
    </LabelBase>,
  );

describe('LabelBase', () => {
  it('renders with defaults and consumer class', () => {
    const screen = renderComponent({
      className: 'hash-brown',
    });

    const label = screen.getByTestId(TEST_ID);
    expect(label).toHaveClass(styles.label, 'hash-brown');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveTextContent(TEST_LABEL);
  });

  it('renders the correct data-testids', () => {
    const screen = renderComponent({
      children: 'Egg',
    });

    const labelText = screen.getByTestId(`${TEST_ID}__text`);
    expect(labelText).toHaveTextContent('Egg');
  });

  describe('props', () => {
    describe('append', () => {
      it('renders the append content', () => {
        const screen = renderComponent({
          append: <span>Append</span>,
        });

        const append = screen.getByText('Append');
        expect(append).toBeInTheDocument();
      });
    });

    describe('as', () => {
      it('renders with a different base tag', () => {
        const screen = renderComponent({
          as: 'aside',
        });

        const label = screen.getByRole('complementary');
        expect(label).toBeInTheDocument();
      });
    });

    describe('hiddenLabel', () => {
      it('hides the element content, but still available to the screen reader (required)', () => {
        const screen = renderComponent({
          hiddenLabel: true,
          required: true,
        });

        const labelText = screen.getByText(TEST_LABEL);
        const label = labelText.closest('label');

        expect(labelText).toBeInTheDocument();

        expect(label).toHaveClass(styles.hidden);
        expect(label?.querySelector(styles.required)).toBeNull();
        expect(labelText).toHaveClass(GlobalCSSClass.SROnly);
      });

      it('hides optional text', () => {
        const screen = renderComponent({
          hiddenLabel: true,
          optional: true,
        });

        const optional = screen.getByText('(optional)');
        expect(optional).toHaveClass(GlobalCSSClass.SROnly);
      });
    });

    describe('optional', () => {
      it('adds optional text', () => {
        const screen = renderComponent({
          optional: true,
        });

        const optional = screen.getByText('(optional)');
        expect(optional).toBeInTheDocument();
      });

      it('adds custom optional text', () => {
        const screen = renderComponent({
          optional: 'Custom optional',
        });

        const optional = screen.getByText('Custom optional');
        expect(optional).toBeInTheDocument();
      });

      it('does not render if the field is required', () => {
        const screen = renderComponent({
          optional: true,
          required: true,
        });

        const optional = screen.queryByText('Custom optional');
        expect(optional).not.toBeInTheDocument();
      });
    });

    describe('required', () => {
      it('prepends required to the label', () => {
        const screen = renderComponent({
          required: true,
        });

        const label = screen.getByTestId(TEST_ID);
        expect(label).toHaveTextContent(`Required ${TEST_LABEL}`);
      });

      it('adds an asterisk', () => {
        const screen = renderComponent({
          required: true,
        });

        const asterisk = screen.getByText('*');
        expect(asterisk).toHaveClass(styles.required);
        expect(asterisk).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
