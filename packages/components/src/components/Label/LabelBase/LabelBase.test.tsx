import { render } from '@testing-library/react';
import { LabelBase } from './LabelBase';
import { label as labelStyles } from '../Label.styles';
import { css } from '@/styled-system/css';
import { GlobalCSSClass } from '@/enums';

const TEST_ID = 'test-component';
const TEST_LABEL = 'Label text';

describe('LabelBase', () => {
  it('renders with defaults and consumer class', () => {
    const screen = render(
      <LabelBase className="hash-brown" data-testid={TEST_ID}>
        {TEST_LABEL}
      </LabelBase>,
    );

    const label = screen.getByTestId(TEST_ID);
    expect(label).toHaveClass(
      labelStyles().root!,
      'hash-brown',
      GlobalCSSClass.Label,
      GlobalCSSClass.FormLabel,
    );
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveTextContent(TEST_LABEL);
  });

  it('renders the correct data-testids', () => {
    const screen = render(<LabelBase data-testid={TEST_ID}>Egg</LabelBase>);

    const labelText = screen.getByTestId(`${TEST_ID}__text`);
    expect(labelText).toHaveTextContent('Egg');
  });

  describe('props', () => {
    describe('append', () => {
      it('renders the append content', () => {
        const screen = render(
          <LabelBase append={<span>Append</span>} data-testid={TEST_ID}>
            {TEST_LABEL}
          </LabelBase>,
        );

        const append = screen.getByText('Append');
        expect(append).toBeInTheDocument();
      });
    });

    describe('element', () => {
      it('renders with a different base tag', () => {
        const screen = render(
          <LabelBase element="strong" data-testid={TEST_ID}>
            {TEST_LABEL}
          </LabelBase>,
        );

        const label = screen.getByTestId(TEST_ID);
        expect(label.tagName).toBe('STRONG');
      });
    });

    describe('hiddenLabel', () => {
      it('hides the element content, but still available to the screen reader (required)', () => {
        const screen = render(
          <LabelBase hiddenLabel required data-testid={TEST_ID}>
            {TEST_LABEL}
          </LabelBase>,
        );

        const labelText = screen.getByText(TEST_LABEL);
        const label = labelText.closest('label');

        expect(labelText).toBeInTheDocument();

        expect(label).toHaveClass(labelStyles({ hiddenLabel: true }).root!);
        expect(screen.queryByText('*')).not.toBeInTheDocument();
        expect(labelText).toHaveClass(css({ srOnly: true }));
      });
    });

    describe('required', () => {
      it('prepends required to the label', () => {
        const screen = render(
          <LabelBase required data-testid={TEST_ID}>
            {TEST_LABEL}
          </LabelBase>,
        );

        const label = screen.getByTestId(TEST_ID);
        expect(label).toHaveTextContent(`*Required${TEST_LABEL}`);
      });

      it('adds an asterisk', () => {
        const screen = render(
          <LabelBase required data-testid={TEST_ID}>
            {TEST_LABEL}
          </LabelBase>,
        );

        const asterisk = screen.getByText('*');
        expect(asterisk).toHaveClass(labelStyles().required!);
        expect(asterisk).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
